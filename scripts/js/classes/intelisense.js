define(["require", "exports"], function (require, exports) {
    "use strict";
    var intelisense = (function () {
        function intelisense(obj) {
            this._position = obj.position;
            this._input = obj.input;
            this._snippets = obj.customSnippets;
            this.findSuggestions();
        }
        Object.defineProperty(intelisense.prototype, "suggestions", {
            get: function () {
                return this._results;
            },
            enumerable: true,
            configurable: true
        });
        intelisense.prototype.getFirstWord = function () {
            var substr = this._input.substring(0, this._position);
            var arrOfWords = substr.split(' ');
            return arrOfWords.pop();
        };
        intelisense.prototype.getSnippetsKeys = function () {
            return Object.keys(this._snippets);
        };
        intelisense.prototype.findSuggestions = function () {
            var keys = this.getSnippetsKeys();
            var word = this.getFirstWord();
            this._results = keys.filter(function (k) { return k.startsWith(word); });
        };
        return intelisense;
    }());
    exports.intelisense = intelisense;
});
//# sourceMappingURL=intelisense.js.map