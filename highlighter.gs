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
  var background = background || '#F3E2A9';  // default color is light orangish.
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

function hlLowFreqWords() {
  generateList()
  for (var alphabetical of wordlist) {
    if (!beginner.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3) {
        highlightText(alphabetical)
    }
  }
}

function unLowFreqWords() {
  generateList()
  for (var alphabetical of wordlist) {
    if (!beginner.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3) {
        highlightText(alphabetical,'#FFFFFF')
    }
  }
}