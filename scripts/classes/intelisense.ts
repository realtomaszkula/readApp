import i = require('../interfaces/interfaces')

export class Sense {
  private _position;
  private _input;
  private _snippets;
  private _results: string [];

  constructor(obj: i.inputProperties){
    this._position = obj.position;
    this._input = obj.input;
    this._snippets = obj.customSnippets

    this.findSuggestions();
  }

  get suggestions() {
    return this._results;
  }

  getLastWord():string {
    let substr = this._input.substring(0, this._position);
    let arrOfWords: string[] = substr.split(' ');
    return arrOfWords.pop();
  }

  getSnippetsKeys(): string[] {
    return Object.keys(this._snippets);
  }

  findSuggestions(): void {
    let keys = this.getSnippetsKeys();
    let word = this.getLastWord();

    this._results = keys.filter( k => k.startsWith(word) );
  }
}


export class ListControl {
  
  private _parent: HTMLElement;
  private _$parent: JQuery;
  private _suggestions: string[];
  private _active;
  private _liClassName = 'suggestion'

    constructor(obj: i.listParams){
      console.log('new list')
      this._parent = obj.parent[0];
      this._$parent = obj.parent;
      this._suggestions = obj.suggestions;
    }

  get suggestion ():string {
    return $(`.${this._liClassName}.active`).data('suggestion');
  }

  createSuggetstionList() {
    this._suggestions.forEach( suggestion => {
        let el = this.createEl(suggestion)
        this._parent.appendChild(el);   
    this._$parent.children().first().addClass('active')
    })
  }

  clearSuggestionList() {
    while (this._parent.firstChild) {
      this._parent.removeChild(this._parent.firstChild);
    }
  }

  selectNextInTheList() {
    $(`.${this._liClassName}.active`).removeClass('active').next().addClass('active')
    if ( $(`.${this._liClassName}.active`).length === 0 ) this._$parent.children().last().addClass('active')
  }

  selectPrevInTheList() {
    $(`.${this._liClassName}.active`).removeClass('active').prev().addClass('active')
    if ( $(`.${this._liClassName}.active`).length === 0 ) this._$parent.children().first().addClass('active')
  }

  private createEl(suggestion): HTMLElement {
      let el = document.createElement("li");
      el.setAttribute('data-suggestion', suggestion);
      el.className = this._liClassName;
      el.textContent = suggestion
      return el
  }
}


    
}