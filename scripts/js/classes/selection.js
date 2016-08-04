define(["require", "exports"], function (require, exports) {
    "use strict";
    var Selection = (function () {
        function Selection(input) {
            this._indexes = [];
            this._input = input;
            this.collectSelectionIndexes();
            this.removeSelectionMarkers();
            this.addMarkerAtEndOfLine();
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
                var obj = {
                    start: result.index - startIndexOffset,
                    end: selectionRegEx.lastIndex - endIndexOffset,
                };
                this._indexes.push(obj);
                startIndexOffset += 4;
                endIndexOffset += 4;
            }
        };
        Selection.prototype.removeSelectionMarkers = function () {
            var replaceRegEx = /\{\{|\}\}/g;
            this._stringWithoutMarkers = this._input.replace(replaceRegEx, '');
        };
        Selection.prototype.addMarkerAtEndOfLine = function () {
            this._indexes.push({
                start: this._stringWithoutMarkers.length,
                end: this._stringWithoutMarkers.length,
            });
        };
        return Selection;
    }());
    exports.Selection = Selection;
    var SelectionIndex = (function () {
        function SelectionIndex(_indexes) {
            this._indexes = _indexes;
            this._keyPressCounter = 0;
        }
        Object.defineProperty(SelectionIndex.prototype, "getIndexPair", {
            get: function () {
                this.correctIndexesForNumberOfClicks();
                this.resetKeyPressCounter();
                return this._indexes.shift();
            },
            enumerable: true,
            configurable: true
        });
        SelectionIndex.prototype.isEmpty = function () {
            return this._indexes.length === 0;
        };
        SelectionIndex.prototype.incrementCounter = function () {
            this._keyPressCounter++;
            console.log("key counter:" + this._keyPressCounter);
        };
        SelectionIndex.prototype.decrementCounter = function () {
            this._keyPressCounter--;
        };
        SelectionIndex.prototype.correctIndexesForNumberOfClicks = function () {
            var idx = this.currentIndexPair(), offset = this.calculateOffSet();
            idx.start += offset;
            idx.end += offset;
        };
        SelectionIndex.prototype.calculateOffSet = function () {
            return (this.currentWordLength() - this._keyPressCounter) * -1;
        };
        SelectionIndex.prototype.currentIndexPair = function () {
            return this._indexes[0];
        };
        SelectionIndex.prototype.currentWordLength = function () {
            return this._indexes[0].end - this._indexes[0].start;
        };
        SelectionIndex.prototype.resetKeyPressCounter = function () {
            this._keyPressCounter = 0;
        };
        return SelectionIndex;
    }());
    exports.SelectionIndex = SelectionIndex;
});
//# sourceMappingURL=selection.js.map