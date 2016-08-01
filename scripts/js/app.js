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
    function previewMessage() {
    }
    function handleInput(e) {
        if (e.which == TAB_KEY) {
            e.preventDefault();
            e.stopPropagation();
            tryAutocomplete();
        }
        previewMessage();
    }
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