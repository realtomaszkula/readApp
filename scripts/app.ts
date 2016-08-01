/// <reference path="../typings/jquery.d.ts" />

import auto = require('./classes/autocomplete')
import * as $ from 'jquery'

function tryAutocomplete():void {
    // geting values from the DOM
  
  let inputString: string = $input.val();
  let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("read")
  let cursorPosition: number = inputElement.selectionStart

  let customSnippets = {
    'btn' : 'button'
  }

  // autocomplete class searches for snippets
  let ac = new auto.Autocomplete( {input: inputString, position: cursorPosition, customSnippets: customSnippets  })
  let result: string = ac.getNewString();
  let newCursorPosition: number = ac.cursorPlacement;

  // printing results and placing the cursor
  $input.val(result);
  $input.select();
  inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
}


function previewMessage():void {
  // $preview.text()
}

function handleInput(e) {

    if(e.which == TAB_KEY) {
        e.preventDefault(); 
        e.stopPropagation();
        tryAutocomplete();
    }
    
    previewMessage();
}

const TAB_KEY = 9;
const $input = $('#read');
const $preview = $('#preview');

export function run() {
  $input.val('Lorem pfr btn sit amet');
  $input.on('keydown', handleInput);
}






