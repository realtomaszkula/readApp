define(["require", "exports"], function (require, exports) {
    "use strict";
    class Control {
        constructor(input) {
            this._$el = input;
            this._el = input[0];
            this._cursorPosition = this._el.selectionStart;
        }
        set value(value) {
            this._$el.val(value);
        }
        get value() {
            return this._$el.val();
        }
        get cursorPosition() {
            return this._cursorPosition;
        }
        selectEndOfLine() {
            let inputLength = this.value.length;
            this._el.setSelectionRange(inputLength, inputLength);
        }
        selectRange(selection) {
            this._el.setSelectionRange(selection.start, selection.end);
        }
        replaceLastWord(replacement) {
            let val = this.value.trim();
            let lastSpace = val.lastIndexOf(" ");
            if (lastSpace == -1) {
                this.value = replacement;
            }
            else {
                let withoutLastWord = val.substring(0, lastSpace);
                this.value = withoutLastWord + replacement;
            }
        }
        isCtrlAed() {
            return this._el.selectionStart == 0 && this._el.selectionEnd == this._el.value.length;
        }
    }
    exports.Control = Control;
});
//# sourceMappingURL=input.js.map