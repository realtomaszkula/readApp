define(["require", "exports", './classes/autocomplete', 'jquery'], function (require, exports, auto, $) {
    "use strict";
    function tryAutocomplete() {
        var inputString = $input.val();
        var inputElement = document.getElementById("read");
        var cursorPosition = inputElement.selectionStart;
        var customSnippets = {
            'btn': 'button'
        };
        var ac = new auto.Autocomplete({ input: inputString, position: cursorPosition, customSnippets: customSnippets });
        var result = ac.getNewString();
        var newCursorPosition = ac.cursorPlacement;
        $input.val(result);
        $input.select();
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }
    function previewMessage(e) {
        var previewString = $preview.text();
        if (e.which == BACKSPACE) {
            previewString = previewString.slice(0, -1);
        }
        else if (e.which == DELETE) {
        }
        else {
            var pressedKey = String.fromCharCode(e.which);
            var isShiftPressed = e.shiftKey;
            pressedKey = (!isShiftPressed) ? pressedKey.toLowerCase() : pressedKey;
            previewString += pressedKey;
        }
        $preview.text(previewString);
    }
    function handleInput(e) {
        if (e.which == TAB_KEY) {
            e.preventDefault();
            e.stopPropagation();
            tryAutocomplete();
        }
        previewMessage(e);
    }
    var BACKSPACE = 8;
    var DELETE = 46;
    var TAB_KEY = 9;
    var $input = $('#read');
    var $preview = $('#preview');
    function run() {
        $input.val('Lorem pfr btn sit amet');
        $input.on('keydown', handleInput);
    }
    exports.run = run;
});
//# sourceMappingURL=app.js.map