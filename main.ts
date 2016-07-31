interface autocompleteParams {
  input: string,
  position: number,
  customSnippets?: {}
}


class Autocomplete  {
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

function handleInput(e) {
    let TAB_KEY = 9;
    if(e.which == TAB_KEY) {
        e.preventDefault(); 
        e.stopPropagation();

        // geting values from the DOM
        let input = $('#read');
        let inputString: string = input.val();
        let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("read")
        let cursorPosition: number = inputElement.selectionStart

        let customSnippets = {
          'btn' : 'button'
        }

        // autocomplete class searches for snippets
        let ac = new Autocomplete( {input: inputString, position: cursorPosition, customSnippets: customSnippets  })
        let result:string = ac.getNewString();
        let newCursorPosition:number = ac.cursorPlacement;

        // printing results and placing the cursor
        input.val(result);
        input.select();
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);

    }
}

$('#read').val('Lorem pfr btn sit amet');
$('#read').on('keydown', handleInput);
