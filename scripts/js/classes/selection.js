define(["require", "exports"], function (require, exports) {
    "use strict";
    class Selection {
        constructor(_input) {
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
        get hasSelectionMarkers() {
            return this._hasSelectionMarkers;
        }
        get resultString() {
            return this._resultString;
        }
        get selectionIndexes() {
            return this._indexes;
        }
        collectSelectionIndexes() {
            const selectionRegEx = /\{\{.+?(?=\})\}\}/g;
            let startIndexOffset = 0, endIndexOffset = 4, result, start, end;
            while (result = selectionRegEx.exec(this._input)) {
                let obj = {
                    start: result.index - startIndexOffset,
                    end: selectionRegEx.lastIndex - endIndexOffset,
                };
                this._indexes.push(obj);
                startIndexOffset += 4;
                endIndexOffset += 4;
            }
            if (this._indexes !== [])
                this._hasSelectionMarkers = true;
        }
        removeSelectionMarkers() {
            const replaceRegEx = /\{\{|\}\}/g;
            this._resultString = this._input.replace(replaceRegEx, '');
        }
        addIndexAtTheEndOfTheLine() {
            this._indexes.push({
                start: this._resultString.length,
                end: this._resultString.length,
            });
        }
    }
    exports.Selection = Selection;
    class SelectionIndex {
        constructor(_indexes) {
            this._indexes = _indexes;
            this._totalKeyPressCounter = 0;
            this._curentKeyPressCounter = 0;
            this._firstKeyPress = true;
        }
        get getIndexPair() {
            if (!this._firstKeyPress)
                this.correctIndexesForNumberOfClicks();
            this.resetCounters();
            return this._indexes.shift();
        }
        isEmpty() {
            return this._indexes.length === 0;
        }
        KeyPressCounter(changeType) {
            if (changeType === 'increment') {
                if (this._firstKeyPress) {
                    this._curentKeyPressCounter -= this.currentWordLength();
                }
                this._curentKeyPressCounter++;
            }
            if (changeType === 'decrement') {
                if (this._firstKeyPress) {
                    this._curentKeyPressCounter -= this.currentWordLength();
                }
                else {
                    this._curentKeyPressCounter--;
                }
            }
            this._firstKeyPress = false;
        }
        correctIndexesForNumberOfClicks() {
            let idx = this.currentIndexPair(), offset = this.calculateOffSet();
            idx.start += offset;
            idx.end += offset;
        }
        calculateOffSet() {
            return this._curentKeyPressCounter + this._totalKeyPressCounter;
        }
        currentIndexPair() {
            return this._indexes[0];
        }
        currentWordLength() {
            return this._indexes[0].end - this._indexes[0].start;
        }
        resetCounters() {
            this._totalKeyPressCounter += this._curentKeyPressCounter;
            this._curentKeyPressCounter = 0;
            this._firstKeyPress = true;
        }
    }
    exports.SelectionIndex = SelectionIndex;
});
//# sourceMappingURL=selection.js.map