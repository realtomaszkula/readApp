define(["require", "exports"], function (require, exports) {
    "use strict";
    var Selection = (function () {
        function Selection(_input) {
            this._input = _input;
            this._indexes = [];
            this._hasSelectionMarkers = false;
            this.collectSelectionIndexes();
            if (this._hasSelectionMarkers) {
                this.removeSelectionMarkers();
                this.addIndexAtTheEndOfTheLine();
            }
            else {
                this._resultString = this._input;
            }
        }
        Object.defineProperty(Selection.prototype, "hasSelectionMarkers", {
            get: function () {
                return this._hasSelectionMarkers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "resultString", {
            get: function () {
                return this._resultString;
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
            if (this._indexes !== [])
                this._hasSelectionMarkers = true;
        };
        Selection.prototype.removeSelectionMarkers = function () {
            var replaceRegEx = /\{\{|\}\}/g;
            this._resultString = this._input.replace(replaceRegEx, '');
        };
        Selection.prototype.addIndexAtTheEndOfTheLine = function () {
            this._indexes.push({
                start: this._resultString.length,
                end: this._resultString.length,
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
        SelectionIndex.prototype.KeyPressCounter = function (changeType) {
            if (changeType === 'increment') {
                console.log('incrementing');
            }
            if (changeType === 'decrement') {
                console.log('decrementing');
            }
        };
        SelectionIndex.prototype.correctIndexesForNumberOfClicks = function () {
            debugger;
            var idx = this.currentIndexPair(), offset = this.calculateOffSet();
            idx.start += offset;
            idx.end += offset;
        };
        SelectionIndex.prototype.calculateOffSet = function () {
            return this._curentKeyPressCounter + this._totalKeyPressCounter;
        };
        SelectionIndex.prototype.currentIndexPair = function () {
            return this._indexes[0];
        };
        SelectionIndex.prototype.currentWordLength = function () {
            return this._indexes[0].end - this._indexes[0].start;
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