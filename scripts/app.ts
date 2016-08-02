/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./classes/autocomplete.ts" />
/// <reference path="./modules/autocomplete.ts" />

import syntax = require('./modules/syntaxHighlighting')
import a = require('./modules/autocomplete')
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
      selectionModeIndexes;



function autocompleteMode {
  // geting values from the DOM
    let 
        inputStr: string = $input.val(),
        inputEl: HTMLInputElement = <HTMLInputElement>document.getElementById("read"),
        cursorPosition: number = inputEl.selectionStart

        let autocomplete = a.tryAutocomplete({position: cursorPosition, customSnippets: customSnippets, input: inputStr});
        let snippetIncludesSelection = autocomplete.selectionIndexes !== []

        // filling value
        $input.val(autocomplete.result);

        // selecting marker or placing cursor
        if (snippetIncludesSelection) {
          // selecting first marker
          let selection = autocomplete.selectionIndexes.shift()
          inputEl.setSelectionRange(selection.start, selection.end)

          // if there are indexes left, go into selection mode in which tab doesn't look for snippets, but instead jumps to next index
          if (snippetIncludesSelection)  {
            selectionModeOn = true;
            selectionModeIndexes = autocomplete.selectionIndexes;
          }
        } else {
          // placing cursor
          inputEl.setSelectionRange(autocomplete.cursorPosition, autocomplete.cursorPosition)
        }

        console.log(selectionModeOn)
}

function selectionMode() {

}

function handleInput(e) {
    if(e.which == TAB_KEY) {
        e.preventDefault(); 
        e.stopPropagation();

    !selectionModeOn ? autocompleteMode() : selectionMode()
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
  $('button').on('click', function (e) {
    let input  = <HTMLInputElement>document.getElementById('read'),
        start = 0,
        end = 5;

    input.focus()
    input.setSelectionRange(start, end);
    input.setSelectionRange(7, 7);

  });
}






