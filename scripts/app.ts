/// <reference path="../typings/jquery.d.ts" />

import auto = require('./classes/autocomplete')
import * as $ from 'jquery'

function tryAutocomplete():void {
    // geting values from the DOM
  
  let inputString: string = $input.val();
  let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("read")
  let cursorPosition: number = inputElement.selectionStart

  // autocomplete class searches for snippets
  let ac = new auto.Autocomplete( {input: inputString, position: cursorPosition, customSnippets: customSnippets  })
  let result: string = ac.getNewString();
  let newCursorPosition: number = ac.cursorPlacement;

  // printing results and placing the cursor
  $input.val(result);
  $input.select();
  inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
}

function shouldNotBeHighlighted(word) {
  syntaxObj[word] === undefined
}

function syntaxHighlight(previewString) {
  let previewStringArray: string[] = previewString.split(' ');
   return previewStringArray
      .map( word => {
        if ( shouldNotBeHighlighted(word) ) {
          return word
        } else {
          return '<span class="' + syntaxObj[word] + '">' + word + '</span>'
        } })
      .join(' ');
}

function handleInput(e) {
    if(e.which == TAB_KEY) {
        e.preventDefault(); 
        e.stopPropagation();
        tryAutocomplete();
    }
}

function handlePreview(e) {
  let previewString: string = $input.val();
  let resultString: string = syntaxHighlight(previewString);
  $preview.html(resultString);
}

const customSnippets  = {
    'btn' : 'button'
  };

const syntaxObj = {
    'aggressive' : 'red',
    'passive' : 'blue'
  };

const BACKSPACE = 8;
const DELETE = 46;
const TAB_KEY = 9;
const $input = $('#read');
const $preview = $('#preview');

export function run() {
  // $input.val('Lorem pfr btn sit amet');
  $input.on('keydown', handleInput);
  $input.on('keyup', handlePreview);
}






