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

  private _includesSelection: boolean = false;
  private _input: string;
  private _position: number;
  private _resultString: string;

  constructor(obj: autocompleteParams ) {
    this._position = obj.position;
    this._input = obj.input;


    this.mergeSnippets(obj.customSnippets);
    this.getNewString();
  }

  get includesSelection () { 
    return this._includesSelection; 
  }

  get resultString () {
    return this._resultString;
  }

  private mergeSnippets(customSnippets: {} ): void{
    this._snippets = customSnippets ? Object.assign(this._snippets, customSnippets) : this._snippets;
  }

  private getNewString(): void {
    let firstHalf = this._input.substring(0, this._position);
    let secondHalf = this._input.substring(this._position);

    // removing last word from first half
    let arrOfWords: string[] = firstHalf.split(' ');
    let word = arrOfWords.pop();
    firstHalf = arrOfWords.join(' ');

    // checking for snippet
    word = this.checkForSnippet(word);

    this._resultString =  (firstHalf + ' ' +  word + secondHalf).trim();
  }

  private isAvailable(word): boolean {
    return this._snippets[word] !== undefined
  }

  private checkForSelection(snippet): void {
    const regEx = /\{\{.+?(?=\})\}\}/
    this._includesSelection = regEx.test(snippet);
  }
    
  // if found calculating new cursor position and assigning new word
   private checkForSnippet(word: string) {
    if (this.isAvailable(word)) {

      // replace word with snippet
      word =  this._snippets[word]

      // check for selection markers
      this.checkForSelection(word);

    }
    return word;
  }

}


