define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.customSnippets = {
        'xrb': 'checkraise flop {{pot}} to bet the turn {{size}}',
        'bbb': 'bet {{123}}% bet {{25}}% bet {{64}}%',
        'bbb1': 'bet {{1}}% bet {{25}}% bet {{64}}%',
        'bbb2': 'bet {{12}}% bet {{25}}% bet {{64}}%',
        'bbb3': 'bet {{123}}% bet {{25}}% bet {{64}}%',
        'bbb4': 'bet {{1234}}% bet {{25}}% bet {{64}}%',
        'bxb': 'bet {{25}}% bet {{25}}% bet {{64}}%'
    };
    exports.syntaxObj = {
        'aggressive': 'red',
        'passive': 'blue'
    };
    exports.autoInteliSuggestions = true;
});
//# sourceMappingURL=basic_config.js.map