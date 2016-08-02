define(["require", "exports", './modules/syntaxHighlighting', './modules/autocomplete', 'jquery'], function (require, exports, syntax, a, $) {
    "use strict";
    var customSnippets = {
        'btn': 'button',
    };
    var syntaxObj = {
        'aggressive': 'red',
        'passive': 'blue'
    };
    var BACKSPACE = 8, DELETE = 46, ESC = 27, TAB_KEY = 9, $input = $('#read'), $preview = $('#preview');
    var selectionModeOn = false, selectionModeIndexes;
    function autocompleteMode() {
        var inputStr = $input.val(), inputEl = document.getElementById("read"), cursorPosition = inputEl.selectionStart;
        var autocomplete = a.tryAutocomplete({ position: cursorPosition, customSnippets: customSnippets, input: inputStr });
        var snippetIncludesSelection = autocomplete.selectionIndexes !== [];
        $input.val(autocomplete.result);
        if (snippetIncludesSelection) {
            var selection = autocomplete.selectionIndexes.shift();
            inputEl.setSelectionRange(selection.start, selection.end);
            if (snippetIncludesSelection) {
                selectionModeOn = true;
                selectionModeIndexes = autocomplete.selectionIndexes;
            }
        }
        else {
            inputEl.setSelectionRange(autocomplete.cursorPosition, autocomplete.cursorPosition);
        }
        console.log(selectionModeOn);
    }
    function selectionMode() {
    }
    function handleInput(e) {
        if (e.which == TAB_KEY) {
            e.preventDefault();
            e.stopPropagation();
            !selectionModeOn ? autocompleteMode() : selectionMode();
        }
    }
    function handlePreview(e) {
        var previewString = $input.val();
        var resultString = syntax.syntaxHighlight(previewString, syntaxObj);
        $preview.html(resultString);
    }
    function run() {
        $input.val('bbb');
        $input.on('keydown', handleInput);
        $('button').on('click', function (e) {
            var input = document.getElementById('read'), start = 0, end = 5;
            input.focus();
            input.setSelectionRange(start, end);
            input.setSelectionRange(7, 7);
        });
    }
    exports.run = run;
});
//# sourceMappingURL=app.js.map