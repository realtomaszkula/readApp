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
        'btn': 'button',
    };
    var syntaxObj = {
        'aggressive': 'red',
        'passive': 'blue'
    };
    var BACKSPACE = 8, DELETE = 46, TAB_KEY = 9, $input = $('#read'), $preview = $('#preview');
    function run() {
        $input.val('Lorem pfr btn sit amet');
        $input.on('keydown', handleInput);
        $('button').on('click', function (e) {
            var input = document.getElementById('read'), start = 0, end = 5;
            input.focus();
            input.setSelectionRange(start, end);
        });
    }
    exports.run = run;
});
//# sourceMappingURL=app.js.map