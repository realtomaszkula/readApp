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

const customSnippets  = {
  'xrb' : 'checkraise flop {{pot}} to bet the turn {{size}}',
  'bbb' : 'bet {{123}}% bet {{25}}% bet {{64}}%',
  'bxb' : 'bet {{25}}% bet {{25}}% bet {{64}}%'
  };

const syntaxObj = {
    'aggressive' : 'red',
    'passive' : 'blue'
  };

const 
      UP = 38,
      DOWN = 40,
      ENTER = 13,
      BACKSPACE = 8,
      DELETE = 46,
      ESC = 27,
      TAB = 9,
      SPACE = 32,
      $input = $('#read'),
      $preview = $('#preview'),
      $suggestionslist = $('#suggestions-list'),
      suggestionslist: HTMLInputElement = <HTMLInputElement>document.getElementById("suggestions-list");

let 
      selectionModeOn = false,
      intelisenseModeOn = false,
      selectionModeIndexes: s.SelectionIndex,
      listControl: inteli.ListControl;



function autocompleteMode () {
    setCurrentInputValues();
    let autocomplete = new a.Autocomplete
        ({customSnippets: customSnippets, input: inputStr, position: cursorPosition})
        .resultString
        
    let selection = new s.Selection(autocomplete);

    // filling value
    $input.val(selection.resultString);

    // entering selection mode or finishing with placing cursor at EOL
    if (selection.hasSelectionMarkers) {
      selectionModeIndexes = new s.SelectionIndex(selection.selectionIndexes)

      let idxPair = selectionModeIndexes.getIndexPair
      selectInputRange(idxPair)

      selectionModeOn = true;
    } else {
      // placing cursor at the end of the line
      let inputLength = $input.val().length
      inputEl.setSelectionRange(inputLength, inputLength)
    }
}

function turnOffSelectionMode() {
    selectionModeOn = false;
    console.log('selection mode off')
}

function selectionMode() {
    let idxPair = selectionModeIndexes.getIndexPair
    selectInputRange(idxPair)

    if (selectionModeIndexes.isEmpty()) {
      turnOffSelectionMode();
    }
}


function turnOffIntelisenseMode() {
    intelisenseModeOn = false;
    listControl.clearSuggestionList()
    listControl = null;
    console.log('inteli mode off')
}

function initializeIntelisenseMode() {
    intelisenseModeOn = true;
    setCurrentInputValues()
    let intelisense = new inteli.Sense({input:inputStr, position: cursorPosition, customSnippets: customSnippets})
    listControl = new inteli.ListControl(
      {
        parent: suggestionslist,
        suggestions: intelisense.suggestions
      })
    listControl.createSuggetstionList()
}

function paseSuggetionWordIntoInput() {
  let suggestion = listControl.suggestion;
  let inputControl = new input.Control($input);
  inputControl.replaceLastWord(suggestion);
} 
 
function triggerCurrentSnippet() {
  paseSuggetionWordIntoInput();
  turnOffIntelisenseMode();
  autocompleteMode();
}

function handleInput(e) {
    let currentKey = e.which;

    if (currentKey == ESC ) {
      turnOffSelectionMode()
      turnOffIntelisenseMode()
    }

    if (e.ctrlKey && currentKey == SPACE ) {
        initializeIntelisenseMode()
    }

    // INTELISENSE
    if(intelisenseModeOn) {

      if (currentKey == UP ) {
        listControl.selectPrevInTheList()
      }

      if ( currentKey == DOWN) {
        listControl.selectNextInTheList()
      }

      if (currentKey == BACKSPACE) {
        turnOffIntelisenseMode();
      }

      if (currentKey == TAB || currentKey == ENTER) {
        e.preventDefault();
        triggerCurrentSnippet()
      }

    }

    // SELECTION MODE
   else if(selectionModeOn) {
      if (currentKey == TAB) {
        e.preventDefault();
        selectionMode()
      }
      // calculate offset for selection indexes
      else if (currentKey === BACKSPACE)  {
        selectionModeIndexes.KeyPressCounter('decrement');
      } 
      else {
        selectionModeIndexes.KeyPressCounter('increment');
      }
  
    }

    else if (currentKey == TAB) {
          e.preventDefault();
          autocompleteMode()
      }


    
}

function handlePreview(e) {
  let previewString: string = $input.val();
  let resultString: string = syntax.syntaxHighlight(previewString, syntaxObj);
  $preview.html(resultString);
}

export function run() {
  $input.val('bbb');
  $input.on('keydown', handleInput);

  $(document).click( function (e) {
     if (selectionModeOn) {
      turnOffSelectionMode();
      turnOffIntelisenseMode();
     }
  })

}






