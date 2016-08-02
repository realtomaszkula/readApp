import a = require('../classes/autocomplete');
import s = require ('../classes/selection');

interface autocompleteReturn {
  result: string;
  selectionIndexes: s.indexes[],
  cursorPosition: number
}

export function tryAutocomplete(params: a.autocompleteParams): autocompleteReturn {

  // autocomplete class searches for snippets and replaces the word with snippet if found
  let autocomplete = new a.Autocomplete(params)

  let resultString = autocomplete.resultString;
  let includesSelection: boolean = autocomplete.includesSelection;

  let 
    result: string,
    selectionIndexes: s.indexes[],
    finalCursorPosition: number;

  if (!includesSelection) {

    // stays empty, no selections
    selectionIndexes = [];

    // place cursor at the end of snippet
    finalCursorPosition = params.position + params.input.length - resultString.length;

    result = resultString;

  } else {

    // collect selection indexes
    let selection = new s.Selection(resultString);
    selectionIndexes = selection.selectionIndexes;

    // place cursor after first selection
    finalCursorPosition = selectionIndexes[0].end;

    result = selection.stringWithoutMarkers;
  } 



 return { 
    result: result ,
    selectionIndexes: selectionIndexes, 
    cursorPosition: finalCursorPosition
  }
}




