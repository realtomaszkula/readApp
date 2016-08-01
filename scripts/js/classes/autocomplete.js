define(["require", "exports"], function (require, exports) {
    "use strict";
    var Autocomplete = (function () {
        function Autocomplete(obj) {
            this._snippets = {
                'pfr': 'preflop raiser'
            };
            this._cursorPlacement = obj.position;
            this._position = obj.position;
            this._input = obj.input;
            this.mergeSnippets(obj.customSnippets);
        }
        Object.defineProperty(Autocomplete.prototype, "snippets", {
            get: function () {
                return this._snippets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Autocomplete.prototype, "cursorPlacement", {
            get: function () {
                return this._cursorPlacement;
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
            return (firstHalf + ' ' + word + secondHalf).trim();
            ;
        };
        Autocomplete.prototype.checkForSnippet = function (word) {
            if (this._snippets[word] !== undefined) {
                var oldWordLength = word.length;
                word = this._snippets[word];
                var newWordLength = word.length;
                this._cursorPlacement += newWordLength - oldWordLength;
            }
            return word;
        };
        return Autocomplete;
    }());
    exports.Autocomplete = Autocomplete;
});
//# sourceMappingURL=autocomplete.js.map