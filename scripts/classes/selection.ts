export interface indexes {
  start: number,
  end: number,
}

export class Selection {

  private _input;
  private _indexes: indexes[] = [];
  private _stringWithoutMarkers: string;

  constructor(input:string) {
    this._input = input;
    this.collectSelectionIndexes();
    this.removeSelectionMarkers();
    this.addMarkerAtEndOfLine();
  }

  get stringWithoutMarkers () {
    return this._stringWithoutMarkers;
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

  }

  private removeSelectionMarkers () : void {
    const replaceRegEx: RegExp = /\{\{|\}\}/g;
    this._stringWithoutMarkers = this._input.replace(replaceRegEx, '');
  }

  private addMarkerAtEndOfLine () : void {
    this._indexes.push ({
      start : this._stringWithoutMarkers.length,
      end : this._stringWithoutMarkers.length,
    })
  }
}


export class SelectionIndex {
  private _keyPressCounter:number = 0

  constructor ( private _indexes: indexes[] ) {}

  get getIndexPair (): indexes  {
    this.correctIndexesForNumberOfClicks();
    this.resetKeyPressCounter()
    return this._indexes.shift();
  }

  isEmpty(): boolean {
    return this._indexes.length === 0
  }

  incrementCounter(): void {
    this._keyPressCounter++;
    console.log(`key counter:${this._keyPressCounter}`)
  }

  decrementCounter(): void {
    this._keyPressCounter--;
  }

  private correctIndexesForNumberOfClicks() : void {
    let  
      idx = this.currentIndexPair(),
      offset = this.calculateOffSet();

    idx.start += offset
    idx.end += offset
    
    
  }

  private calculateOffSet():number {
     return (this.currentWordLength() - this._keyPressCounter) * -1
     
  }
  private currentIndexPair () : indexes {
    return this._indexes[0];
  }

  private currentWordLength(): number {
    return this._indexes[0].end - this._indexes[0].start;
  }

  private resetKeyPressCounter(): void {
    this._keyPressCounter = 0;
  }

  
}

