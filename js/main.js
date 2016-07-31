/// <reference path="typings/jquery.d.ts" />
var AUTOCOMPLETE = {
    'PFR': 'preflop raiser',
    'BTN': 'button'
};
var TAB_KEY = 9;
var input = $('#read');
function createNewString(input, position) {
    var firstHalf = input.substring(0, position);
    var secondHalf = input.substring(position);
    var arrOfWords = firstHalf.split(' ');
    var word = arrOfWords.pop();
    firstHalf = arrOfWords.join(' ');
    word = (AUTOCOMPLETE[word] === undefined) ? word : AUTOCOMPLETE[word];
    return firstHalf + ' ' + word + secondHalf;
}
function handleInput(e) {
    if (e.which == TAB_KEY) {
        e.preventDefault();
        e.stopPropagation();
        var inputString = input.val();
        var inputElement = document.getElementById("read");
        var cursorPosition = inputElement.selectionStart;
        var result = createNewString(inputString, cursorPosition);
        result = result.trim();
        input.val(result);
        input.select();
        inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }
}
$('#read').val('Lorem pfr dolor sit amet');
input.on('keydown', handleInput);
//# sourceMappingURL=main.js.map