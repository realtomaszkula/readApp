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
        selectRange(selection) {
            this._el.setSelectionRange(selection.start, selection.end);
        }
        replaceLastWord(replacement) {
            let val = this.value.trim();
            let lastSpace = val.lastIndexOf(" ");
            let withoutLastWord = val.substring(0, lastSpace);
            this.value(withoutLastWord + replacement);
        }
    }
    exports.Control = Control;
});
//# sourceMappingURL=input.js.map