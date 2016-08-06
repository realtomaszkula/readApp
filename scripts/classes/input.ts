/// <reference path="../../typings/jquery.d.ts" />
import i = require('../interfaces/interfaces')

export class Control {
  private _$el: JQuery;
  private _el: HTMLInputElement;
  private _cursorPosition: number;

  constructor(input: JQuery){
    this._$el = input;
    this._el = <HTMLInputElement> input[0];
    this._cursorPosition = this._el.selectionStart;
  }

  set value (value) {
    this._$el.val(value);
  }

  get value() {
    return this._$el.val();
  }

  get cursorPosition() {
    return this._cursorPosition;
  }

  selectRange(selection: i.indexes){
    this._el.setSelectionRange(selection.start, selection.end)
  }

  replaceLastWord(replacement: string) {
    let val = this.value.trim();
    let lastSpace = val.lastIndexOf(" ");
    let withoutLastWord = val.substring(0, lastSpace);

    this.value(withoutLastWord + replacement);
  }

}

