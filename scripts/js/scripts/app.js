define(["require", "exports", './modules/syntaxHighlighting', './classes/autocomplete', './classes/selection', './classes/intelisense', 'jquery'], function (require, exports, syntax, a, s, inteli, $) {
    "use strict";
    const customSnippets = {
        'xrb': 'checkraise flop {{pot}} to bet the turn {{size}}',
        'bbb': 'bet {{123}}% bet {{25}}% bet {{64}}%',
        'bxb': 'bet {{25}}% bet {{25}}% bet {{64}}%'
    };
    const syntaxObj = {
        'aggressive': 'red',
        'passive': 'blue'
    };
    const UP = 38, DOWN = 40, ENTER = 13, BACKSPACE = 8, DELETE = 46, ESC = 27, TAB = 9, SPACE = 32, $input = $('#read'), $preview = $('#preview'), $suggestionslist = $('#suggestions-list'), suggestionslist = document.getElementById("suggestions-list");
    let selectionModeOn = false, intelisenseModeOn = false, selectionModeIndexes, inputStr, inputEl = document.getElementById("read"), cursorPosition, listControl;
    function selectInputRange(selection) {
        inputEl.setSelectionRange(selection.start, selection.end);
    }
    function setCurrentInputValues() {
        inputStr = $input.val(),
            cursorPosition = inputEl.selectionStart;
    }
    function autocompleteMode() {
        setCurrentInputValues();
        let autocomplete = new a.Autocomplete({ customSnippets: customSnippets, input: inputStr, position: cursorPosition })
            .resultString;
        let selection = new s.Selection(autocomplete);
        $input.val(selection.resultString);
        if (selection.hasSelectionMarkers) {
            selectionModeIndexes = new s.SelectionIndex(selection.selectionIndexes);
            let idxPair = selectionModeIndexes.getIndexPair;
            selectInputRange(idxPair);
            selectionModeOn = true;
        }
        else {
            let inputLength = $input.val().length;
            inputEl.setSelectionRange(inputLength, inputLength);
        }
    }
    function turnOffSelectionMode() {
        selectionModeOn = false;
        console.log('selection mode off');
    }
    function selectionMode() {
        let idxPair = selectionModeIndexes.getIndexPair;
        selectInputRange(idxPair);
        if (selectionModeIndexes.isEmpty()) {
            turnOffSelectionMode();
        }
    }
    function turnOffIntelisenseMode() {
        intelisenseModeOn = false;
        listControl.clearSuggestionList();
        listControl = null;
        console.log('inteli mode off');
    }
    function initializeIntelisenseMode() {
        intelisenseModeOn = true;
        setCurrentInputValues();
        let intelisense = new inteli.Sense({ input: inputStr, position: cursorPosition, customSnippets: customSnippets });
        listControl = new inteli.ListControl({
            parent: suggestionslist,
            suggestions: intelisense.suggestions
        });
        listControl.createSuggetstionList();
    }
    function replaceLastWord(input, replacement) {
        let arrOfWords = input.split(' ');
        arrOfWords.pop();
        arrOfWords.push(replacement);
        return arrOfWords.join(' ');
    }
    function paseSuggetionWordIntoInput() {
        let suggestion = listControl.suggestion;
        setCurrentInputValues();
        let result = replaceLastWord(inputStr, suggestion);
        $input.val(result);
    }
    0;
    function triggerCurrentSnippet() {
        paseSuggetionWordIntoInput();
        turnOffIntelisenseMode();
        autocompleteMode();
    }
    function handleInput(e) {
        let currentKey = e.which;
        if (currentKey == ESC) {
            turnOffSelectionMode();
            turnOffIntelisenseMode();
        }
        if (e.ctrlKey && currentKey == SPACE) {
            initializeIntelisenseMode();
        }
        if (intelisenseModeOn) {
            if (currentKey == UP) {
                listControl.selectPrevInTheList();
            }
            if (currentKey == DOWN) {
                listControl.selectNextInTheList();
            }
            if (currentKey == BACKSPACE) {
                turnOffIntelisenseMode();
            }
            if (currentKey == TAB || currentKey == ENTER) {
                e.preventDefault();
                triggerCurrentSnippet();
            }
        }
        else if (selectionModeOn) {
            if (currentKey == TAB) {
                e.preventDefault();
                selectionMode();
            }
            else if (currentKey === BACKSPACE) {
                selectionModeIndexes.KeyPressCounter('decrement');
            }
            else {
                selectionModeIndexes.KeyPressCounter('increment');
            }
        }
        else if (currentKey == TAB) {
            e.preventDefault();
            autocompleteMode();
        }
    }
    function handlePreview(e) {
        let previewString = $input.val();
        let resultString = syntax.syntaxHighlight(previewString, syntaxObj);
        $preview.html(resultString);
    }
    function run() {
        $input.val('bbb');
        $input.on('keydown', handleInput);
        $(document).click(function (e) {
            if (selectionModeOn) {
                turnOffSelectionMode();
                turnOffIntelisenseMode();
            }
        });
    }
    exports.run = run;
});
//# sourceMappingURL=app.js.map