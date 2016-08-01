export interface autocompleteParams {
  input: string,
  position: number,
  customSnippets?: {}
}


export class Autocomplete  {
  private _snippets: {} = {
      'pfr' : 'preflop raiser'
  }

  private _cursorPlacement: number;
  private _input: string;
  private _position: number;

  constructor(obj: autocompleteParams ) {
    this._cursorPlacement = obj.position;
    this._position = obj.position;
    this._input = obj.input;
    this.mergeSnippets(obj.customSnippets);
  }

  get snippets () {
      return this._snippets;
  }

  get cursorPlacement() {
    return this._cursorPlacement;
  }

  mergeSnippets(customSnippets: {} ): void{
    this._snippets = customSnippets ? Object.assign(this._snippets, customSnippets) : this._snippets;
  }

  getNewString(): string {
    let firstHalf = this._input.substring(0, this._position);
    let secondHalf = this._input.substring(this._position);

    // removing last word from first half
    let arrOfWords: string[] = firstHalf.split(' ');
    let word = arrOfWords.pop();
    firstHalf = arrOfWords.join(' ');

    // checking for snippet
    word = this.checkForSnippet(word);

    return (firstHalf + ' ' +  word + secondHalf).trim();;
  }


  // if found calculating new cursor position and assigning new word
  checkForSnippet(word: string) {
    if (this._snippets[word] !== undefined) {
      let oldWordLength = word.length;
      word =  this._snippets[word]
      let newWordLength = word.length;
      this._cursorPlacement += newWordLength - oldWordLength;
    }
    return word;
  }

}


