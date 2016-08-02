define(["require", "exports"], function (require, exports) {
    "use strict";
    var Selection = (function () {
        function Selection(input) {
            this._indexes = [];
            this._input = input;
            this.collectSelectionIndexes();
            this.removeSelectionMarkers();
        }
        Object.defineProperty(Selection.prototype, "stringWithoutMarkers", {
            get: function () {
                return this._stringWithoutMarkers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "selectionIndexes", {
            get: function () {
                return this._indexes;
            },
            enumerable: true,
            configurable: true
        });
        Selection.prototype.collectSelectionIndexes = function () {
            var selectionRegEx = /\{\{.+?(?=\})\}\}/g;
            var startIndexOffset = 0, endIndexOffset = 4, result, start, end;
            while (result = selectionRegEx.exec(this._input)) {
                this._indexes.push({
                    start: result.index - startIndexOffset,
                    end: selectionRegEx.lastIndex - endIndexOffset
                });
                startIndexOffset += 4;
                endIndexOffset += 4;
            }
        };
        Selection.prototype.removeSelectionMarkers = function () {
            var replaceRegEx = /\{\{|\}\}/g;
            this._stringWithoutMarkers = this._input.replace(replaceRegEx, '');
        };
        return Selection;
    }());
    exports.Selection = Selection;
});
//# sourceMappingURL=selection.js.map