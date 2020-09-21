function generateSheet() {   // The code below creates a new spreadsheet 
var ssNew = SpreadsheetApp.create("Word List "+MyTitle)
var linkready = HtmlService.createHtmlOutput('<b>Spreadsheet ready</b>');
linkready.setTitle('Spreadsheet generated')
var level = ""
// Logger.log(ssNew.getUrl());
ssNew.appendRow(['Word List','Definition','Synonym','images','word frequency']);
ssNew.setFrozenRows(1)
ssNew.getRange('A1:E').activate();
ssNew.getRange('A1:E').createFilter();

generateList()
  const rowsForSS = [];
  for (const alphabetical of wordlist) {
    const definition = '=hyperlink("https://www.dictionary.com/browse/'+alphabetical+'","definition")'
    const synonyms = '=hyperlink("https://www.thesaurus.com/browse/'+alphabetical+'","synonyms")'
    const visual_image = '=hyperlink("https://thenounproject.com/search/?q='+alphabetical+'","image")'// https://thenounproject.com/search/?q=abandon
    if (beginner.includes(alphabetical)){
      level='Beginner' }
    else if (elementary.includes(alphabetical)){
      level='Elementary'
    }
    else if (intermediate.includes(alphabetical)){
      level='Intermediate'
    }
    else if (upper.includes(alphabetical)){
      level='Upper Intermediate'
    }
    else if(alphabetical.length>3) {
      level='low frequency word'
    }
    rowsForSS.push([alphabetical,definition,synonyms,visual_image,level]);  // Thanks to Adam Morris for using push to an array rather than adding indiv rows to ss
  }
  ssNew.getSheetByName('Sheet1').getRange(2, 1, rowsForSS.length, 5).setValues(rowsForSS); // This writes to the Spreadsheet at once.
  
  const myurl = ssNew.getUrl()
  linkready.append('<p><a href="'+myurl+'" target="_blank">Your Google Sheet</a></p>')
  DocumentApp.getUi().showSidebar(linkready);
}


function genLowFreqSheet() {   // The code below creates a new spreadsheet 
var ssNew = SpreadsheetApp.create("Low frequency Word List "+MyTitle)
var linkready = HtmlService.createHtmlOutput('<b>Spreadsheet ready</b>');
linkready.setTitle('Spreadsheet generated')
var level = ""
// Logger.log(ssNew.getUrl());
ssNew.appendRow(['Word List','Definition','Synonym','images']);
ssNew.setFrozenRows(1)
ssNew.getRange('A1:D').activate();
ssNew.getRange('A1:D').createFilter();


generateList()
  var rowsForSS = [];
  for (var alphabetical of wordlist) {
    if(!withquotation.includes(alphabetical)&&!beginner.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3){
    var definition = '=hyperlink("https://www.dictionary.com/browse/'+alphabetical+'","definition")'
    var synonyms = '=hyperlink("https://www.thesaurus.com/browse/'+alphabetical+'","synonyms")'
    var visual_image = '=hyperlink("https://thenounproject.com/search/?q='+alphabetical+'","image")'// https://thenounproject.com/search/?q=abandon
//    ssNew.appendRow([alphabetical,definition,synonyms,visual_image]); // Could make more efficient by using an array and writing once
    rowsForSS.push([alphabetical,definition,synonyms,visual_image]);
  }
  }
  ssNew.getSheetByName('Sheet1').getRange(2, 1, rowsForSS.length, 4).setValues(rowsForSS);
var myurl = ssNew.getUrl()
// var myurl2 = 'Word List '+MyTitle+'is ready for you at: '+myurl     // Alert not needed. if making sidebar
// DocumentApp.getUi().alert(myurl2);  
 linkready.append('<p><a href="'+myurl+'" target="_blank">Your Google Sheet</a></p>')
 DocumentApp.getUi().showSidebar(linkready);
}
