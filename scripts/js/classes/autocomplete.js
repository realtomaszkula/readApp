define(["require", "exports"], function (require, exports) {
    "use strict";
    class Autocomplete {
        constructor(obj) {
            this._snippets = {
                'pfr': 'preflop raiser',
                'xrb': 'checkraise flop {{pot}} to bet the turn {{size}}',
                'bbb1': 'bet {{1}}% bet {{25}}% bet {{64}}%',
                'bbb2': 'bet {{12}}% bet {{25}}% bet {{64}}%',
                'bbb3': 'bet {{123}}% bet {{25}}% bet {{64}}%',
                'bbb4': 'bet {{1234}}% bet {{25}}% bet {{64}}%',
                'bxb': 'bet {{25}}% bet {{25}}% bet {{64}}%'
            };
            this._position = obj.position;
            this._input = obj.input;
            this.mergeSnippets(obj.customSnippets);
            this.getNewString();
        }
        get resultString() {
            return this._resultString;
        }
        mergeSnippets(customSnippets) {
            this._snippets = customSnippets ? Object.assign(this._snippets, customSnippets) : this._snippets;
        }
        getNewString() {
            let firstHalf = this._input.substring(0, this._position);
            let secondHalf = this._input.substring(this._position);
            let arrOfWords = firstHalf.split(' ');
            let word = arrOfWords.pop();
            firstHalf = arrOfWords.join(' ');
            word = this.checkForSnippet(word);
            this._resultString = (firstHalf + ' ' + word + secondHalf).trim();
        }
        isAvailable(word) {
            return this._snippets[word] !== undefined;
        }
        checkForSnippet(word) {
            if (this.isAvailable(word)) {
                word = this._snippets[word];
            }
            return word;
        }
    }
    exports.Autocomplete = Autocomplete;
});
//# sourceMappingURL=autocomplete.js.map