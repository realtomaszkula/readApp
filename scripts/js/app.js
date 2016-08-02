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
    var selectionModeOn = false, selectionModeIndexes, inputStr, inputEl = document.getElementById("read"), cursorPosition;
    function autocompleteMode() {
        inputStr = $input.val(),
            cursorPosition = inputEl.selectionStart;
        var autocomplete = a.tryAutocomplete({ position: cursorPosition, customSnippets: customSnippets, input: inputStr });
        var snippetIncludesSelection = !!autocomplete.selectionIndexes.length;
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
    function turnOffSelectionMode() {
        selectionModeOn = false;
        console.log('selection mode off');
    }
    function selectionMode() {
        var selection = selectionModeIndexes.shift();
        inputEl.setSelectionRange(selection.start, selection.end);
        console.log(JSON.stringify(selectionModeIndexes));
        if (!selectionModeIndexes.length)
            turnOffSelectionMode();
    }
    function handleInput(e) {
        if (e.which == ESC && selectionModeOn)
            turnOffSelectionMode();
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
        $(document).click(function (e) {
            if (selectionModeOn)
                turnOffSelectionMode();
        });
    }
    exports.run = run;
});
//# sourceMappingURL=app.js.map