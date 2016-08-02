define(["require", "exports"], function (require, exports) {
    "use strict";
    function shouldNotBeHighlighted(word, syntaxObj) {
        syntaxObj[word] === undefined;
    }
    function syntaxHighlight(previewString, syntaxObj) {
        var previewStringArray = previewString.split(' ');
        return previewStringArray
            .map(function (word) {
            if (shouldNotBeHighlighted(word, syntaxObj)) {
                return word;
            }
            else {
                return '<span class="' + syntaxObj[word] + '">' + word + '</span>';
            }
        })
            .join(' ');
    }
    exports.syntaxHighlight = syntaxHighlight;
});
//# sourceMappingURL=syntaxHighlighting.js.map