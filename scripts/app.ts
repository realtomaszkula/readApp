/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./classes/autocomplete.ts" />
/// <reference path="./classes/selection.ts" />

import syntax = require('./modules/syntaxHighlighting')
import a = require('./classes/autocomplete')
import s = require('./classes/selection')
import inteli = require('./classes/intelisense')
import * as $ from 'jquery'

const customSnippets  = {
  'btn' : 'button',
  'pfr' : 'preflop raiser',
  'xrb' : 'checkraise flop {{pot}} to bet the turn {{size}}',
  'bbb' : 'bet {{25}}% bet {{25}}% bet {{64}}%',
  'bxb' : 'bet {{25}}% bet {{25}}% bet {{64}}%'
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
      SPACE = 32,
      $input = $('#read'),
      $preview = $('#preview');

let 
      selectionModeOn = false,
      intelisenseModeOn = false,
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
          console.log(selectionModeIndexes)

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

    let idxPair = selectionModeIndexes.getIndexPair
    selectInputRange(idxPair)

    if (selectionModeIndexes.isEmpty()) {
      turnOffSelectionMode();
    }
}

function handleInput(e) {
    let currentKey = e.which;

    if (e.ctrlKey && currentKey == SPACE ) {
        inputStr = $input.val(),
        cursorPosition = inputEl.selectionStart
        let intelisense = new inteli.intelisense({input:inputStr, position: cursorPosition, customSnippets: customSnippets})
        let suggestions = intelisense.suggestions

        console.log(suggestions)
    }

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
        selectionModeIndexes.KeyPressCounter('decrement');
       } else {
        // each regular keypress increments keypress counter 
        selectionModeIndexes.KeyPressCounter('increment');
       }
    

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
     if (selectionModeOn) turnOffSelectionMode()
  })

}






