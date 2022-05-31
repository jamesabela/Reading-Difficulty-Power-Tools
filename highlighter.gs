function highlightText(target,background) {
  // If no search parameter was provided, ask for one
  if (arguments.length == 0) {
    var ui = DocumentApp.getUi();
    var result = ui.prompt('Text Highlighter',
      'Enter text to highlight:', ui.ButtonSet.OK_CANCEL);
    // Exit if user hit Cancel.
    if (result.getSelectedButton() !== ui.Button.OK) return;
    // else
    target = result.getResponseText();
  }
  var background = background || '#f5f5f5';  // unknown is grey and the default
  var doc = DocumentApp.getActiveDocument();
  var bodyElement = DocumentApp.getActiveDocument().getBody();
  var searchResult = bodyElement.findText(target);

  while (searchResult !== null) {
    var thisElement = searchResult.getElement();
    var thisElementText = thisElement.asText();

    //Logger.log(url);
    thisElementText.setBackgroundColor(searchResult.getStartOffset(), searchResult.getEndOffsetInclusive(),background);

    // search for next match
    searchResult = bodyElement.findText(target, searchResult);
  }
}

// green=nouns #a6d871
// orange = conjunctions #f7aa50
// red = verbs #ff4946
// yellow = adverbs #fdff83
// blue = adjective #2584c9 lighter blue #2584ff
// purple = pronouns #c084c0
// grey = unknown 	#BEBEBE

function hlnouns() {
  generateList()
  for (var alphabetical of wordlist) {
    const result = mydict.find(word => word.word == alphabetical)
        if (typeof result !== 'undefined'&& alphabetical.length>3){ // Must check undefined first otherwise object error
          if (result.speech_part=='noun'){highlightText(alphabetical,'#a6d871')}      
        }
        else if(alphabetical.substring(alphabetical.length - 1, alphabetical.length)=="s"){ //handle regular plurals
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 1))
          if (typeof result !== 'undefined'&& alphabetical.length>3){ // Must check undefined first otherwise       object error
            if (result.speech_part=='noun'){highlightText(alphabetical,'#a6d871')}

          }
        }
  }
}

// how to get everything but last char alphabetical.substring(0, alphabetical.length - 1)

function hlverbs() {
  generateList()
  for (var alphabetical of wordlist) {
    verbreplace = ' '+alphabetical+' ' // Makes sure it is a complete word.
    if (verblist.includes(alphabetical)) {highlightText(verbreplace,'#ff4946')} 
  }
}

function hladj() {
  generateList()
  for (var alphabetical of wordlist) {
    const result = mydict.find(word => word.word == alphabetical)
        if (typeof result !== 'undefined' && alphabetical.length>3){ // Must check undefined first otherwise object error
        if (result.speech_part=='adjective'){highlightText(alphabetical,'#2584ff')}      
        }

  }
}

function hladv() {
  generateList()
  for (var alphabetical of wordlist) {
    const result = mydict.find(word => word.word == alphabetical)
        if (typeof result !== 'undefined'){ // Must check undefined first otherwise object error
        if (result.speech_part=='adverb'){highlightText(alphabetical,'#fdff83')}      
        }

  }
}

function hlLowFreqWords() {
  generateList()
  for (var alphabetical of wordlist) {
    if (!beginner.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3) {
      const result = mydict.find(word => word.word == alphabetical)
        if (typeof result !== 'undefined'){
        if (result.speech_part=='noun'){background ='#a6d871'}
        else if (result.speech_part=='verb'){background ='#ff4946'}
        else if (result.speech_part=='adverb'){background ='#fdff83'}
        else if (result.speech_part=='adjective'){background ='#2584ff'}
        }
        else if(verblist.includes(alphabetical)){background ='#ff4946'} // handles verb variations

        else if (alphabetical.substring(alphabetical.length - 1, alphabetical.length)=="s"){ //handle noun regular plurals
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 1))
          if (typeof result !== 'undefined'&& alphabetical.length>3){ // Must check undefined first otherwise       object error
            if (result.speech_part=='noun'){background ='#a6d871'}
            else if (result.speech_part=='adjective'){background ='#2584ff'} // couuld be an adjective
            else{background ='#BEBEBE'} 
            }
            else{background ='#BEBEBE'} // Must highlight anything else grey otherwise background error.
            }

        else{background ='#BEBEBE'}
        highlightText(alphabetical,background)

  }
}
}
