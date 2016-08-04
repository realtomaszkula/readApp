define(["require", "exports", './modules/syntaxHighlighting', './classes/autocomplete', './classes/selection', 'jquery'], function (require, exports, syntax, a, s, $) {
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
        var autocomplete = new a.Autocomplete({ customSnippets: customSnippets, input: inputStr, position: cursorPosition })
            .resultString;
        var selection = new s.Selection(autocomplete);
        $input.val(selection.resultString);
        if (selection.hasSelectionMarkers) {
            selectionModeIndexes = new s.SelectionIndex(selection.selectionIndexes);
            console.log(selectionModeIndexes);
            var idxPair = selectionModeIndexes.getIndexPair;
            selectInputRange(idxPair);
            selectionModeOn = true;
        }
        else {
            var inputLength = $input.val().length;
            inputEl.setSelectionRange(inputLength, inputLength);
        }
    }
    function turnOffSelectionMode() {
        selectionModeOn = false;
        console.log('selection mode off');
    }
    function selectInputRange(selection) {
        inputEl.setSelectionRange(selection.start, selection.end);
    }
    function selectionMode() {
        var idxPair = selectionModeIndexes.getIndexPair;
        selectInputRange(idxPair);
        if (selectionModeIndexes.isEmpty()) {
            turnOffSelectionMode();
        }
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
                selectionModeIndexes.KeyPressCounter('decrement');
            }
            else {
                selectionModeIndexes.KeyPressCounter('increment');
            }
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