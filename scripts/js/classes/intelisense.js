define(["require", "exports"], function (require, exports) {
    "use strict";
    class intelisense {
        constructor(obj) {
            this._position = obj.position;
            this._input = obj.input;
            this._snippets = obj.customSnippets;
            this.findSuggestions();
        }
        get suggestions() {
            return this._results;
        }
        getFirstWord() {
            let substr = this._input.substring(0, this._position);
            let arrOfWords = substr.split(' ');
            return arrOfWords.pop();
        }
        getSnippetsKeys() {
            return Object.keys(this._snippets);
        }
        findSuggestions() {
            let keys = this.getSnippetsKeys();
            let word = this.getFirstWord();
            this._results = keys.filter(k => k.startsWith(word));
        }
    }
    exports.intelisense = intelisense;
});
//# sourceMappingURL=intelisense.js.map