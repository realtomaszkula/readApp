/// <reference path="../../typings/jquery.d.ts" />
import i = require('../interfaces/interfaces')

export class Control {
  private _$el: JQuery;
  private _el: HTMLInputElement;
  private _cursorPosition: number;

  constructor(input: JQuery){
    this._$el = input;
    this._el = <HTMLInputElement>input[0];
    this._cursorPosition = this._el.selectionStart;
  }

  set value (value:string) {
    this._$el.val(value);
  }

  get value() {
    return this._$el.val();
  }

  get cursorPosition() {
    return this._cursorPosition;
  }

  selectEndOfLine() {
    let inputLength: number = this.value.length
    this._el.setSelectionRange(inputLength, inputLength)
  }

  selectRange(selection: i.indexes){
    this._el.setSelectionRange(selection.start, selection.end)
  }

  replaceLastWord(replacement: string) {
    let val = this.value.trim();
    let lastSpace = val.lastIndexOf(" ");

    if (lastSpace == -1) {
      // -1 means no spaces in the string
      this.value = replacement
    } else {
      let withoutLastWord = val.substring(0, lastSpace);
      this.value = withoutLastWord + replacement
    }
  }

  isCtrlAed (): boolean {
    return this._el.selectionStart == 0 && this._el.selectionEnd == this._el.value.length
  }

}