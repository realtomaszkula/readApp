import auto = require('../classes/autocomplete')

export function tryAutocomplete(input, snippets):void {
    // geting values from the DOM
  
  let inputString: string = input.val();
  let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("read")
  let cursorPosition: number = inputElement.selectionStart

  // autocomplete class searches for snippets
  let ac = new auto.Autocomplete( {input: inputString, position: cursorPosition, customSnippets: snippets  })
  let result: string = ac.getNewString();
  let newCursorPosition: number = ac.cursorPlacement;

  // printing results and placing the cursor
  input.val(result);
  input.select();
  inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
}