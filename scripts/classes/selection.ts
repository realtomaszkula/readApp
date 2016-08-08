import i = require('../interfaces/interfaces')

export class Selection {

  private _indexes: i.indexes[] = [];
  private _resultString: string;
  private _hasSelectionMarkers: boolean = false;

  constructor(private _input:string) {
    this.collectSelectionIndexes();
    if (this._hasSelectionMarkers) {
      this.removeSelectionMarkers();
      this.addIndexAtTheEndOfTheLine();
    } else {
      this._resultString = this._input
    }
  }

  get hasSelectionMarkers () {
    return this._hasSelectionMarkers;
  }

  get resultString () {
    return this._resultString;
  }

  get selectionIndexes() {
    return this._indexes;
  }

  private collectSelectionIndexes () {
    const selectionRegEx = /\{\{.+?(?=\})\}\}/g;
    let 
        startIndexOffset = 0,
        endIndexOffset = 4,
        result;
    
    while ( result = selectionRegEx.exec(this._input) ) {
      let start = result.index - startIndexOffset;
      let end = selectionRegEx.lastIndex - endIndexOffset;

      let obj = {
        start :  start,
        end : end,
        length: end - start
      }
      
      this._indexes.push(obj)

      startIndexOffset += 4;
      endIndexOffset += 4;
    }

    if (this._indexes !== [] ) this._hasSelectionMarkers = true
  }

  private removeSelectionMarkers () : void {
    const replaceRegEx: RegExp = /\{\{|\}\}/g;
    this._resultString = this._input.replace(replaceRegEx, '');
  }

  private addIndexAtTheEndOfTheLine () : void {
    this._indexes.push ({
      start : this._resultString.length,
      end : this._resultString.length,
      length: 0
    })
  }
}

export class SelectionIndex {
  private _totalKeyPressCounter: number = 0;
  private _curentKeyPressCounter: number = 0;
  private _firstKeyPress = true;
  private _lastIndexPairLength: number;

  constructor ( private _indexes: i.indexes[] ) {}

  get getIndexPair (): i.indexes  {
    if (!this._firstKeyPress) this.correctIndexesForNumberOfClicks();
    this._lastIndexPairLength = this._indexes[0].length;
    this.resetCounters()
    return this._indexes.shift();
  }

  isEmpty(): boolean {
    return this._indexes.length === 0
  }

  KeyPressCounter(changeType: 'increment' | 'decrement' ) {
    if (changeType === 'increment') {
      if (this._firstKeyPress) {
        this._curentKeyPressCounter -= this._lastIndexPairLength;
      }
      this._curentKeyPressCounter++
    }     
    if (changeType === 'decrement') {
      if (this._firstKeyPress) {
        this._curentKeyPressCounter -= this._lastIndexPairLength;
      } else {
        this._curentKeyPressCounter--
      }
    }
    this._firstKeyPress = false;
    console.log(this._curentKeyPressCounter)
  }

  private correctIndexesForNumberOfClicks() : void {
    let  
      idx = this.currentIndexPair(),
      offset = this.calculateOffSet();

    idx.start += offset
    idx.end += offset

  }

  private calculateOffSet():number {
     return this._curentKeyPressCounter + this._totalKeyPressCounter
     
  }
  private currentIndexPair () : i.indexes {
    return this._indexes[0];
  }

  private resetCounters(): void {
    this._totalKeyPressCounter += this._curentKeyPressCounter;
    this._curentKeyPressCounter = 0;
    this._firstKeyPress = true;
  }


  
}

