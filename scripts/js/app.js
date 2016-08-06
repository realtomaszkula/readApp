define(["require", "exports", './modules/syntaxHighlighting', './classes/autocomplete', './classes/selection', './classes/input', './classes/intelisense', 'jquery', './constants/basic_config', './constants/keys'], function (require, exports, syntax, a, s, input, inteli, $, config, keys) {
    "use strict";
    const $input = $('#read'), $preview = $('#preview'), $suggestionslist = $('#suggestions-list');
    let selectionModeOn = false, intelisenseModeOn = false, selectionModeIndexes, listControl;
    function autocompleteMode() {
        let inputControl = new input.Control($input);
        let autocomplete = new a.Autocomplete({ customSnippets: config.customSnippets, input: inputControl.value, position: inputControl.cursorPosition })
            .resultString;
        let selection = new s.Selection(autocomplete);
        inputControl.value = selection.resultString;
        if (selection.hasSelectionMarkers) {
            selectionModeIndexes = new s.SelectionIndex(selection.selectionIndexes);
            let idxPair = selectionModeIndexes.getIndexPair;
            inputControl.selectRange(idxPair);
            selectionModeOn = true;
        }
        else {
            inputControl.selectEndOfLine();
        }
    }
    function turnOffSelectionMode() {
        selectionModeOn = false;
        console.log('selection mode off');
    }
    function selectionMode() {
        let inputControl = new input.Control($input);
        let idxPair = selectionModeIndexes.getIndexPair;
        inputControl.selectRange(idxPair);
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
        let inputControl = new input.Control($input);
        let intelisense = new inteli.Sense({ input: inputControl.value, position: inputControl.cursorPosition, customSnippets: config.customSnippets });
        listControl = new inteli.ListControl({
            parent: $suggestionslist,
            suggestions: intelisense.suggestions
        });
        listControl.createSuggetstionList();
    }
    function triggerCurrentSnippet() {
        let inputControl = new input.Control($input);
        let suggestion = listControl.suggestion;
        debugger;
        inputControl.replaceLastWord(suggestion);
        turnOffIntelisenseMode();
        autocompleteMode();
    }
    function handleInput(e) {
        let currentKey = e.which;
        if (currentKey == keys.ESC) {
            turnOffSelectionMode();
            turnOffIntelisenseMode();
        }
        if (e.ctrlKey && currentKey == keys.SPACE) {
            initializeIntelisenseMode();
        }
        if (intelisenseModeOn) {
            if (currentKey == keys.UP) {
                listControl.selectPrevInTheList();
            }
            if (currentKey == keys.DOWN) {
                listControl.selectNextInTheList();
            }
            if (currentKey == keys.BACKSPACE) {
                turnOffIntelisenseMode();
            }
            if (currentKey == keys.TAB || currentKey == keys.ENTER) {
                e.preventDefault();
                triggerCurrentSnippet();
            }
        }
        else if (selectionModeOn) {
            if (currentKey == keys.TAB) {
                e.preventDefault();
                selectionMode();
            }
            else if (currentKey === keys.BACKSPACE) {
                selectionModeIndexes.KeyPressCounter('decrement');
            }
            else {
                selectionModeIndexes.KeyPressCounter('increment');
            }
        }
        else if (currentKey == keys.TAB) {
            e.preventDefault();
            autocompleteMode();
        }
    }
    function handlePreview(e) {
        let previewString = $input.val();
        let resultString = syntax.syntaxHighlight(previewString, config.syntaxObj);
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