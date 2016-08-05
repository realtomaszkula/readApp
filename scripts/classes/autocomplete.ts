import i = require('../interfaces/interfaces')

export class Autocomplete  {
  private _snippets: {} = {
      'pfr' : 'preflop raiser',
      'xrb' : 'checkraise flop {{pot}} to bet the turn {{size}}',
      'bbb' : 'bet {{25}}% bet {{25}}% bet {{64}}%',
      'bxb' : 'bet {{25}}% bet {{25}}% bet {{64}}%'
  }

  private _input: string;
  private _position: number;
  private _resultString: string;

  constructor(obj: i.inputPropertiesWithSnippets ) {
    this._position = obj.position;
    this._input = obj.input;
    this.mergeSnippets(obj.customSnippets);
    this.getNewString();
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
   
  // if found calculating new cursor position and assigning new word
   private checkForSnippet(word: string) {
    if (this.isAvailable(word)) {

      // replace word with snippet
      word =  this._snippets[word]

    }
    return word;
  }

}


