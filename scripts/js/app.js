define(["require", "exports", './modules/syntaxHighlighting', './classes/autocomplete', './classes/selection', './classes/intelisense', 'jquery'], function (require, exports, syntax, a, s, inteli, $) {
    "use strict";
    const customSnippets = {
        'btn': 'button',
        'pfr': 'preflop raiser',
        'xrb': 'checkraise flop {{pot}} to bet the turn {{size}}',
        'bbb': 'bet {{25}}% bet {{25}}% bet {{64}}%',
        'bxb': 'bet {{25}}% bet {{25}}% bet {{64}}%'
    };
    const syntaxObj = {
        'aggressive': 'red',
        'passive': 'blue'
    };
    const BACKSPACE = 8, DELETE = 46, ESC = 27, TAB_KEY = 9, SPACE = 32, $input = $('#read'), $preview = $('#preview');
    let selectionModeOn = false, intelisenseModeOn = false, selectionModeIndexes, inputStr, inputEl = document.getElementById("read"), cursorPosition;
    function createSuggetstionList(suggestions) {
        let parent = document.getElementById("suggestions-list");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        suggestions.forEach(suggestion => {
            let el = document.createElement("li");
            el.setAttribute('data-suggestion', suggestion);
            el.textContent = suggestion;
            parent.appendChild(el);
        });
        $(parent).children().first().addClass('active');
    }
    function selectNextInTheList(suggestions) {
        $('li.active').removeClass('active').next().addClass('active');
        if ($('li.active').length === 0)
            $("#suggestions-list").children().first().addClass('active');
    }
    function turnOffSelectionMode() {
        selectionModeOn = false;
        console.log('selection mode off');
    }
    function turnOffIntelisenseMode() {
        intelisenseModeOn = false;
        console.log('inteli mode off');
    }
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
    function selectionMode() {
        let idxPair = selectionModeIndexes.getIndexPair;
        selectInputRange(idxPair);
        if (selectionModeIndexes.isEmpty()) {
            turnOffSelectionMode();
        }
    }
    function initializeIntelisenseMode() {
        setCurrentInputValues();
        let intelisense = new inteli.intelisense({ input: inputStr, position: cursorPosition, customSnippets: customSnippets });
        let suggestions = intelisense.suggestions;
        createSuggetstionList(suggestions);
    }
    function intelisenseMode() {
        selectNextInTheList();
    }
    function handleInput(e) {
        let currentKey = e.which;
        if (currentKey == ESC) {
            turnOffSelectionMode();
            turnOffintelisenseMode();
        }
        if (e.ctrlKey && currentKey == SPACE) {
            intelisenseModeOn = true;
            initializeIntelisenseMode();
        }
        if (currentKey == TAB_KEY) {
            e.preventDefault();
            e.stopPropagation();
            if (selectionModeOn) {
                selectionMode();
            }
            else if (intelisenseModeOn) {
                intelisenseMode();
            }
            else {
                autocompleteMode();
            }
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