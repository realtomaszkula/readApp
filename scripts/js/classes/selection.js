define(["require", "exports"], function (require, exports) {
    "use strict";
    var Selection = (function () {
        function Selection(input) {
            this._indexes = [];
            this._input = input;
            this.collectSelectionIndexes();
            this.removeSelectionMarkers();
            this.addIndexAtTheEndOfTheLine();
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
        Selection.prototype.addIndexAtTheEndOfTheLine = function () {
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
            this._totalKeyPressCounter = 0;
            this._curentKeyPressCounter = 0;
            this._firstKeyPress = true;
        }
        Object.defineProperty(SelectionIndex.prototype, "getIndexPair", {
            get: function () {
                if (!this._firstKeyPress)
                    this.correctIndexesForNumberOfClicks();
                this.resetCounters();
                return this._indexes.shift();
            },
            enumerable: true,
            configurable: true
        });
        SelectionIndex.prototype.isEmpty = function () {
            return this._indexes.length === 0;
        };
        SelectionIndex.prototype.incrementKeyPressCounter = function () {
            this._curentKeyPressCounter++;
            this._firstKeyPress = false;
        };
        SelectionIndex.prototype.decrementKeyPressCounter = function () {
            if (this._firstKeyPress) {
                this._firstKeyPress = false;
                this._curentKeyPressCounter -= this.currentWordLength();
            }
            else {
                this._curentKeyPressCounter--;
            }
        };
        SelectionIndex.prototype.correctIndexesForNumberOfClicks = function () {
            var idx = this.currentIndexPair(), offset = this.calculateOffSet();
            idx.start += offset;
            idx.end += offset;
        };
        SelectionIndex.prototype.calculateOffSet = function () {
            return (this._curentKeyPressCounter + this._totalKeyPressCounter);
        };
        SelectionIndex.prototype.currentIndexPair = function () {
            return this._indexes[1];
        };
        SelectionIndex.prototype.currentWordLength = function () {
            return this._indexes[1].end - this._indexes[1].start;
        };
        SelectionIndex.prototype.resetCounters = function () {
            this._totalKeyPressCounter += this._curentKeyPressCounter;
            this._curentKeyPressCounter = 0;
            this._firstKeyPress = true;
        };
        return SelectionIndex;
    }());
    exports.SelectionIndex = SelectionIndex;
});
//# sourceMappingURL=selection.js.map