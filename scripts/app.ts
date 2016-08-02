/// <reference path="../typings/jquery.d.ts" />

import syntax = require('./modules/syntaxHighlighting')
import ac = require('./modules/autocomplete')
import * as $ from 'jquery'

function handleInput(e) {
    if(e.which == TAB_KEY) {
        e.preventDefault(); 
        e.stopPropagation();
        ac.tryAutocomplete($input, customSnippets);
    }
}

function handlePreview(e) {
  let previewString: string = $input.val();
  let resultString: string = syntax.syntaxHighlight(previewString, syntaxObj);
  $preview.html(resultString);
}

const customSnippets  = {
    'btn' : 'button',
  };

const syntaxObj = {
    'aggressive' : 'red',
    'passive' : 'blue'
  };

const BACKSPACE = 8,
	     DELETE = 46,
	     TAB_KEY = 9,
	     $input = $('#read'),
	     $preview = $('#preview');

export function run() {
  $input.val('Lorem pfr btn sit amet');
  $input.on('keydown', handleInput);
  $('button').on('click', function (e) {
    let input  = <HTMLInputElement>document.getElementById('read'),
        start = 0,
        end = 5;

    input.focus()
    input.setSelectionRange(start, end);
  });
}






