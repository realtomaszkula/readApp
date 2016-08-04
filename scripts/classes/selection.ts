export interface indexes {
  start: number,
  end: number,
}

export class Selection {

  private _indexes: indexes[] = [];
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
        result,
        start: number,
        end: number;
    
    while ( result = selectionRegEx.exec(this._input) ) {
      let obj = {
        start :  result.index - startIndexOffset,
        end : selectionRegEx.lastIndex - endIndexOffset,
      }
      
      this._indexes.push (obj)

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
    })
  }
}



export class SelectionIndex {
  private _totalKeyPressCounter: number = 0;
  private _curentKeyPressCounter: number = 0
  private _firstKeyPress = true;

  constructor ( private _indexes: indexes[] ) {}

  get getIndexPair (): indexes  {
    if (!this._firstKeyPress) this.correctIndexesForNumberOfClicks();
    this.resetCounters()
    return this._indexes.shift();
  }

  isEmpty(): boolean {
    return this._indexes.length === 0
  }

  KeyPressCounter(changeType: 'increment' | 'decrement' ) {
    if (changeType === 'increment') {
      console.log('incrementing');
    } 
    
    if (changeType === 'decrement') {
      console.log('decrementing');
    }


  }

  private correctIndexesForNumberOfClicks() : void {

    debugger
    let  
      idx = this.currentIndexPair(),
      offset = this.calculateOffSet();

    idx.start += offset
    idx.end += offset

  }

  private calculateOffSet():number {
     return this._curentKeyPressCounter + this._totalKeyPressCounter
     
  }
  private currentIndexPair () : indexes {
    return this._indexes[0];
  }

  private currentWordLength(): number {
    return this._indexes[0].end - this._indexes[0].start;
  }

  private resetCounters(): void {
    this._totalKeyPressCounter += this._curentKeyPressCounter;
    this._curentKeyPressCounter = 0;
    this._firstKeyPress = true;
  }


  
}

