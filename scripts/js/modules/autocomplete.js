define(["require", "exports", '../classes/autocomplete', '../classes/selection'], function (require, exports, a, s) {
    "use strict";
    function tryAutocomplete(params) {
        var autocomplete = new a.Autocomplete(params);
        var resultString = autocomplete.resultString;
        var includesSelection = autocomplete.includesSelection;
        var result, selectionIndexes, finalCursorPosition;
        if (!includesSelection) {
            selectionIndexes = [];
            finalCursorPosition = params.position + resultString.length - params.input.length;
            result = resultString;
        }
        else {
            var selection = new s.Selection(resultString);
            selectionIndexes = selection.selectionIndexes;
            finalCursorPosition = selectionIndexes[0].end;
            result = selection.stringWithoutMarkers;
        }
        return {
            result: result,
            selectionIndexes: selectionIndexes,
            cursorPosition: finalCursorPosition
        };
    }
    exports.tryAutocomplete = tryAutocomplete;
});
//# sourceMappingURL=autocomplete.js.map