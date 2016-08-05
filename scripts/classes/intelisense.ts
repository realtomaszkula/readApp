import i = require('../interfaces/interfaces')

export class intelisense {
  private _position;
  private _input;
  private _snippets;
  private _results: string [];

  constructor(obj: i.inputProperties){
    this._position = obj.position;
    this._input = obj.input;
    this._snippets = obj.customSnippets

    this.findSuggestions();
  }

  get suggestions() {
    return this._results;
  }

  getLastWord():string {
    let substr = this._input.substring(0, this._position);
    let arrOfWords: string[] = substr.split(' ');
    return arrOfWords.pop();
  }

  getSnippetsKeys(): string[] {
    return Object.keys(this._snippets);
  }

  findSuggestions(): void {
    let keys = this.getSnippetsKeys();
    let word = this.getLastWord();

    this._results = keys.filter( k => k.startsWith(word) );
    // debugger
  }
}