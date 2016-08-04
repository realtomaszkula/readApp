/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./classes/autocomplete.ts" />
/// <reference path="./classes/selection.ts" />
/// <reference path="./modules/autocomplete.ts" />

import syntax = require('./modules/syntaxHighlighting')
import a = require('./classes/autocomplete')
import s = require('./classes/selection')
import * as $ from 'jquery'

const customSnippets  = {
    'btn' : 'button',
  };

const syntaxObj = {
    'aggressive' : 'red',
    'passive' : 'blue'
  };

const 
      BACKSPACE = 8,
      DELETE = 46,
      ESC = 27,
      TAB_KEY = 9,
      $input = $('#read'),
      $preview = $('#preview');

let 
      selectionModeOn = false,
      selectionModeIndexes: s.SelectionIndex,
      inputStr: string,
      inputEl: HTMLInputElement = <HTMLInputElement>document.getElementById("read"),
      cursorPosition: number;


function autocompleteMode () {
  // geting values from the DOM
        inputStr = $input.val(),
        cursorPosition = inputEl.selectionStart

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

function selectInputRange(selection: s.indexes) {
  inputEl.setSelectionRange(selection.start, selection.end)
}

function selectionMode() {
    if (selectionModeIndexes.isEmpty()) {
      turnOffSelectionMode();
    }

    let idxPair = selectionModeIndexes.getIndexPair
    selectInputRange(idxPair)
}

function handleInput(e) {
    let currentKey = e.which;

    if (currentKey == ESC && selectionModeOn) turnOffSelectionMode()
    if (currentKey == TAB_KEY) {
      e.preventDefault(); 
      e.stopPropagation();
      !selectionModeOn ? autocompleteMode() : selectionMode()
    }

    if (selectionModeOn && currentKey != TAB_KEY) {
      selectionModeIndexes

      // calculate offset for selection indexes
       if (currentKey === BACKSPACE)  {
        // each backspace keypress decrements keypress counter
        selectionModeIndexes.decrementKeyPressCounter();
       } else {
        // each regular keypress increments keypress counter 
        selectionModeIndexes.incrementKeyPressCounter();
       }
    }
    console.log(selectionModeIndexes)

    
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
     if (selectionModeOn) turnOffSelectionMode()
  })

}






