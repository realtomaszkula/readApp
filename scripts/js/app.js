define(["require", "exports", './modules/syntaxHighlighting', './modules/autocomplete', './classes/selection', 'jquery'], function (require, exports, syntax, a, s, $) {
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
                var indexes = autocomplete.selectionIndexes;
                selectionModeIndexes = new s.SelectionIndex(indexes);
            }
        }
        else {
            inputEl.setSelectionRange(autocomplete.cursorPosition, autocomplete.cursorPosition);
        }
    }
    function turnOffSelectionMode() {
        selectionModeOn = false;
        console.log('selection mode off');
    }
    function selectionMode() {
        if (selectionModeIndexes.isEmpty()) {
            turnOffSelectionMode();
        }
        var selection = selectionModeIndexes.getIndexPair;
        console.log(selection);
        inputEl.setSelectionRange(selection.start, selection.end);
    }
    function handleInput(e) {
        var currentKey = e.which;
        if (currentKey == ESC && selectionModeOn)
            turnOffSelectionMode();
        if (currentKey == TAB_KEY) {
            e.preventDefault();
            e.stopPropagation();
            !selectionModeOn ? autocompleteMode() : selectionMode();
        }
        if (selectionModeOn && currentKey != TAB_KEY) {
            selectionModeIndexes;
            if (currentKey === BACKSPACE) {
                selectionModeIndexes.decrementKeyPressCounter();
            }
            else {
                selectionModeIndexes.incrementKeyPressCounter();
            }
        }
        console.log(selectionModeIndexes);
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