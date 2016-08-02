define(["require", "exports"], function (require, exports) {
    "use strict";
    var Autocomplete = (function () {
        function Autocomplete(obj) {
            this._snippets = {
                'pfr': 'preflop raiser',
                'bbb': 'bet {{50}}% bet {{75}} bet {{100}}%'
            };
            this._position = obj.position;
            this._input = obj.input;
            this.mergeSnippets(obj.customSnippets);
            this.getNewString();
        }
        Object.defineProperty(Autocomplete.prototype, "includesSelection", {
            get: function () {
                return this._includesSelection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Autocomplete.prototype, "resultString", {
            get: function () {
                return this._resultString;
            },
            enumerable: true,
            configurable: true
        });
        Autocomplete.prototype.mergeSnippets = function (customSnippets) {
            this._snippets = customSnippets ? Object.assign(this._snippets, customSnippets) : this._snippets;
        };
        Autocomplete.prototype.getNewString = function () {
            var firstHalf = this._input.substring(0, this._position);
            var secondHalf = this._input.substring(this._position);
            var arrOfWords = firstHalf.split(' ');
            var word = arrOfWords.pop();
            firstHalf = arrOfWords.join(' ');
            word = this.checkForSnippet(word);
            this._resultString = (firstHalf + ' ' + word + secondHalf).trim();
        };
        Autocomplete.prototype.isAvailable = function (word) {
            return this._snippets[word] !== undefined;
        };
        Autocomplete.prototype.checkForSelection = function (snippet) {
            var regEx = /\{\{.+?(?=\})\}\}/;
            this._includesSelection = regEx.test(snippet);
        };
        Autocomplete.prototype.checkForSnippet = function (word) {
            if (this.isAvailable(word)) {
                word = this._snippets[word];
                this.checkForSelection(word);
            }
            return word;
        };
        return Autocomplete;
    }());
    exports.Autocomplete = Autocomplete;
});
//# sourceMappingURL=autocomplete.js.map