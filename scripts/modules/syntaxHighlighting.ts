function shouldNotBeHighlighted(word, syntaxObj) {
  syntaxObj[word] === undefined
}

export function syntaxHighlight(previewString, syntaxObj) {
  let previewStringArray: string[] = previewString.split(' ');
  return previewStringArray
      .map( word => {
        if ( shouldNotBeHighlighted(word, syntaxObj) ) {
          return word
        } else {
          return '<span class="' + syntaxObj[word] + '">' + word + '</span>'
        } })
      .join(' ');
}

