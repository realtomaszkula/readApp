
/// <reference path="typings/jquery.d.ts" />
let AUTOCOMPLETE = {
    'PFR' : 'preflop raiser',
    'BTN' : 'button'
}

let TAB_KEY = 9;
let input = $('#read');

function createNewString(input:string, position: number): string{
    let firstHalf = input.substring(0, position);
    let secondHalf = input.substring(position);

    let arrOfWords: string[] = firstHalf.split(' ');
    let word = arrOfWords.pop();
    firstHalf = arrOfWords.join(' ');

    word = (AUTOCOMPLETE[word] === undefined) ? word : AUTOCOMPLETE[word];

    return firstHalf + ' ' +  word + secondHalf;
}

function handleInput(e) {
    if(e.which == TAB_KEY) {
        e.preventDefault(); 
        e.stopPropagation();

        let inputString: string = input.val();
        let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("read")
        let cursorPosition: number = inputElement.selectionStart

        let result = createNewString(inputString, cursorPosition);
        result = result.trim();
        
        input.val(result);
        input.select();
        inputElement.setSelectionRange(cursorPosition, cursorPosition);

    }
}
$('#read').val('Lorem pfr dolor sit amet');
 input.on('keydown', handleInput);
