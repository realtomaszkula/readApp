define(["require", "exports", './modules/syntaxHighlighting', './modules/autocomplete', 'jquery'], function (require, exports, syntax, ac, $) {
    "use strict";
    function handleInput(e) {
        if (e.which == TAB_KEY) {
            e.preventDefault();
            e.stopPropagation();
            ac.tryAutocomplete($input, customSnippets);
        }
    }
    function handlePreview(e) {
        var previewString = $input.val();
        var resultString = syntax.syntaxHighlight(previewString, syntaxObj);
        $preview.html(resultString);
    }
    var customSnippets = {
        'btn': 'button'
    };
    var syntaxObj = {
        'aggressive': 'red',
        'passive': 'blue'
    };
    var BACKSPACE = 8;
    var DELETE = 46;
    var TAB_KEY = 9;
    var $input = $('#read');
    var $preview = $('#preview');
    function run() {
        $input.on('keydown', handleInput);
        $input.on('keyup', handlePreview);
    }
    exports.run = run;
});
//# sourceMappingURL=app.js.map