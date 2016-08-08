/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./classes/autocomplete.ts" />
/// <reference path="./classes/selection.ts" />

import syntax = require('./modules/syntaxHighlighting')
import a = require('./classes/autocomplete')
import s = require('./classes/selection')
import input = require('./classes/input')
import inteli = require('./classes/intelisense')
import i = require('./interfaces/interfaces')
import * as $ from 'jquery'
import config = require('./constants/basic_config');
import keys = require('./constants/keys');


const
      $input = $('#read'),
      $preview = $('#preview'),
      $suggestionslist = $('#suggestions-list');
let 
      selectionModeOn = false,
      intelisenseModeOn = false,
      selectionModeIndexes: s.SelectionIndex,
      listControl: inteli.ListControl,
      inteliInterval: number;

// AUTOCOMPLETE
function autocompleteMode () {
    let inputControl = new input.Control($input);
    let autocomplete = new a.Autocomplete
        ({customSnippets: config.customSnippets, input: inputControl.value, position: inputControl.cursorPosition})
        .resultString
        
    let selection = new s.Selection(autocomplete);
    inputControl.value = selection.resultString

    // entering selection mode or finishing with placing cursor at EOL
    if (selection.hasSelectionMarkers) {
      selectionModeIndexes = new s.SelectionIndex(selection.selectionIndexes)

      let idxPair = selectionModeIndexes.getIndexPair
      inputControl.selectRange(idxPair)

      selectionModeOn = true;
    } else {
      // placing cursor at the end of the line
      inputControl.selectEndOfLine()
    }
}

// SELECTION MODE
function selectionMode() {
    let inputControl = new input.Control($input);
    let idxPair = selectionModeIndexes.getIndexPair
    inputControl.selectRange(idxPair)

    if (selectionModeIndexes.isEmpty()) {
      turnOffSelectionMode();
    }
}

function turnOffSelectionMode() {
    selectionModeOn = false;
    console.log('selection mode off')
}


// INTELISENSE
function initializeIntelisenseMode() {
    intelisenseModeOn = true;
    let inputControl = new input.Control($input);
    if (listControl) listControl.clearSuggestionList()
    let intelisense = new inteli.Sense({input:inputControl.value, position: inputControl.cursorPosition, customSnippets: config.customSnippets})
    listControl = new inteli.ListControl(
      {
        parent: $suggestionslist,
        suggestions: intelisense.suggestions
      })
    listControl.createSuggetstionList()
}

function turnOffIntelisenseMode() {
    intelisenseModeOn = false;
    listControl.clearSuggestionList()
    listControl = null;
    console.log('inteli mode off')
}
function triggerCurrentSnippet() {
  let inputControl = new input.Control($input);
  // pasting suggestion inside input box
  let suggestion = listControl.suggestion;
  inputControl.replaceLastWord(suggestion);
  
  autocompleteMode();
  turnOffIntelisenseMode();
}

// INPUT
function handleInput(e) {
    let currentKey = e.which;

    if (currentKey == keys.ESC ) {
      turnOffSelectionMode();
      turnOffIntelisenseMode();
    }

    if (e.ctrlKey && currentKey == keys.SPACE) initializeIntelisenseMode()

    if (currentKey == keys.BACKSPACE) {
      if (listControl) listControl.clearSuggestionList()
    }

    // INTELISENSE
    if(intelisenseModeOn) {

      if (currentKey == keys.UP ) {
        listControl.selectPrevInTheList()
      }

      if ( currentKey == keys.DOWN) {
        listControl.selectNextInTheList()
      }

      if (currentKey == keys.BACKSPACE) {
      }

      if (currentKey == keys.TAB || currentKey == keys.ENTER) {
        e.preventDefault();
        triggerCurrentSnippet()
      }

    }

    // SELECTION MODE
   else if(selectionModeOn) {
      if( currentKey == keys.A && e.ctrlKey) turnOffSelectionMode()

      if (currentKey == keys.TAB) {
        e.preventDefault();
        selectionMode()
      }
      // calculate offset for selection indexes
      if (currentKey === keys.BACKSPACE)  {
        selectionModeIndexes.KeyPressCounter('decrement');
      } 
    }

    else if (currentKey == keys.TAB) {
          e.preventDefault();
          autocompleteMode()
      }    
}


function handleSelection(e) {
  // keypress handles only normal keys
  // console.log(`triggered: ${e.which}`);
   if(selectionModeOn) {
        selectionModeIndexes.KeyPressCounter('increment');
    }
}

function handlePreview(e) {
  let previewString: string = $input.val();
  let resultString: string = syntax.syntaxHighlight(previewString, config.syntaxObj);
  $preview.html(resultString);
}


function manageInteliSenseIntervals(e){
    let inputControl = new input.Control($input);
    let inputIsNotEmpty = inputControl.value != '';
    let entireInputIsNotSelected = !inputControl.isCtrlAed()
    if ( inputIsNotEmpty && entireInputIsNotSelected && !selectionModeOn) initializeIntelisenseMode();
}

export function run() {
  $input.val('bbb');


  $input.on('keypress', function(e) {
    handleSelection(e);
  });

  $input.on('keydown', function(e){
    handleInput(e);
  });

  $input.on('keyup', function(e) {
    manageInteliSenseIntervals(e)
  });

  $(document).click( function (e) {
     if (selectionModeOn) {
      turnOffSelectionMode();
     }

     if (intelisenseModeOn) {
      // turnOffIntelisenseMode();
     }
  })

}






