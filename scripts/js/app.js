define(["require", "exports", './classes/autocomplete', 'jquery'], function (require, exports, auto, $) {
    "use strict";
    function tryAutocomplete() {
        var inputString = $input.val();
        var inputElement = document.getElementById("read");
        var cursorPosition = inputElement.selectionStart;
        var ac = new auto.Autocomplete({ input: inputString, position: cursorPosition, customSnippets: customSnippets });
        var result = ac.getNewString();
        var newCursorPosition = ac.cursorPlacement;
        $input.val(result);
        $input.select();
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }
    function shouldNotBeHighlighted(word) {
        syntaxObj[word] === undefined;
    }
    function syntaxHighlight(previewString) {
        var previewStringArray = previewString.split(' ');
        return previewStringArray
            .map(function (word) {
            if (shouldNotBeHighlighted(word)) {
                return word;
            }
            else {
                return '<span class="' + syntaxObj[word] + '">' + word + '</span>';
            }
        })
            .join(' ');
    }
    function handleInput(e) {
        if (e.which == TAB_KEY) {
            e.preventDefault();
            e.stopPropagation();
            tryAutocomplete();
        }
    }
    function handlePreview(e) {
        var previewString = $input.val();
        var resultString = syntaxHighlight(previewString);
        $preview.html(resultString);
    }
    var customSnippets = {
        'btn': 'button'
    };
    var syntaxObj = {
        'aggressive': 'red',
        'passive': 'blue'
    };
    var BACKSPACE = 8;
    var DELETE = 46;
    var TAB_KEY = 9;
    var $input = $('#read');
    var $preview = $('#preview');
    function run() {
        $input.on('keydown', handleInput);
        $input.on('keyup', handlePreview);
    }
    exports.run = run;
});
//# sourceMappingURL=app.js.map