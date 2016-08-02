define(["require", "exports", '../classes/autocomplete'], function (require, exports, auto) {
    "use strict";
    function tryAutocomplete(input, snippets) {
        var inputString = input.val();
        var inputElement = document.getElementById("read");
        var cursorPosition = inputElement.selectionStart;
        var ac = new auto.Autocomplete({ input: inputString, position: cursorPosition, customSnippets: snippets });
        var result = ac.getNewString();
        input.val(result);
        console.log(ac.includesSelection);
    }
    exports.tryAutocomplete = tryAutocomplete;
});
//# sourceMappingURL=autocomplete.js.map