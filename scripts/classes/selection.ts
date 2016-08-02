export interface indexes {
  start: number,
  end: number
}

export class Selection {

  private _input;
  private _indexes: indexes[] = [];
  private _stringWithoutMarkers: string;

  constructor(input:string) {
    this._input = input;
    this.collectSelectionIndexes();
    this.removeSelectionMarkers();
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
      this._indexes.push ({
        start :  result.index - startIndexOffset,
        end : selectionRegEx.lastIndex - endIndexOffset
      })

      startIndexOffset += 4;
      endIndexOffset += 4;
    }

  }

  private removeSelectionMarkers () {
    const replaceRegEx: RegExp = /\{\{|\}\}/g;
    this._stringWithoutMarkers = this._input.replace(replaceRegEx, '');

    // remove markers and add one more selection at the end of the string
    this._indexes.push ({
      start : this._stringWithoutMarkers.length,
      end : this._stringWithoutMarkers.length
    })
  }



}