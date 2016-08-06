define(["require", "exports"], function (require, exports) {
    "use strict";
    class Sense {
        constructor(obj) {
            this._position = obj.position;
            this._input = obj.input;
            this._snippets = obj.customSnippets;
            this.findSuggestions();
        }
        get suggestions() {
            return this._results;
        }
        getLastWord() {
            let substr = this._input.substring(0, this._position);
            let arrOfWords = substr.split(' ');
            return arrOfWords.pop();
        }
        getSnippetsKeys() {
            return Object.keys(this._snippets);
        }
        findSuggestions() {
            let keys = this.getSnippetsKeys();
            let word = this.getLastWord();
            this._results = keys.filter(k => k.startsWith(word));
        }
    }
    exports.Sense = Sense;
    class ListControl {
        constructor(obj) {
            this._parent = obj.parent[0];
            this._$parent = obj.parent;
            this._suggestions = obj.suggestions;
        }
        get suggestion() {
            return $('.suggestion.active').data('suggestion');
        }
        createSuggetstionList() {
            this._suggestions.forEach(suggestion => {
                let el = this.createEl(suggestion);
                this._parent.appendChild(el);
                this._$parent.children().first().addClass('active');
            });
        }
        clearSuggestionList() {
            while (this._parent.firstChild) {
                this._parent.removeChild(this._parent.firstChild);
            }
        }
        selectNextInTheList() {
            $('.suggestion.active').removeClass('active').next().addClass('active');
            if ($('.suggestion.active').length === 0)
                this._$parent.children().last().addClass('active');
        }
        selectPrevInTheList() {
            $('.suggestion.active').removeClass('active').prev().addClass('active');
            if ($('.suggestion.active').length === 0)
                this._$parent.children().first().addClass('active');
        }
        createEl(suggestion) {
            let el = document.createElement("li");
            el.setAttribute('data-suggestion', suggestion);
            el.className = 'suggestion';
            el.textContent = suggestion;
            return el;
        }
    }
    exports.ListControl = ListControl;
});
//# sourceMappingURL=intelisense.js.map