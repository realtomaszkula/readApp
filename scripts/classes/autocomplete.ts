export interface autocompleteParams {
  input: string,
  position: number,
  customSnippets?: {}
}


export class Autocomplete  {
  private _snippets: {} = {
      'pfr' : 'preflop raiser',
      'bbb' : 'bet {{50}}% bet {{75}} bet {{100}}%'
  }

  private _includesSelection: boolean;
  private _cursorPlacement: number;
  private _input: string;
  private _position: number;

  constructor(obj: autocompleteParams ) {
    this._cursorPlacement = obj.position;
    this._position = obj.position;
    this._input = obj.input;
    this.mergeSnippets(obj.customSnippets);
  }

  get includesSelection () { 
    return this._includesSelection; 
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

    return (firstHalf + ' ' +  word + secondHalf).trim();
  }

  isAvailable(word): boolean {
    return this._snippets[word] !== undefined
  }

  checkForSelection(snippet): void {
    const regEx = /\{\{.+?(?=\})\}\}/
    this._includesSelection = regEx.test(snippet);
  }
    
  // if found calculating new cursor position and assigning new word
  checkForSnippet(word: string) {
    
    if (this.isAvailable(word)) {

      // replace word with snippet
      word =  this._snippets[word]

      // check for selection markers
      this.checkForSelection(word);

    }
    return word;
  }

}


