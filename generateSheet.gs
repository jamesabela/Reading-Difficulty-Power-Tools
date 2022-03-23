function generateSheet() {   // The code below creates a new spreadsheet 
var ssNew = SpreadsheetApp.create("Word List "+MyTitle)
var linkready = HtmlService.createHtmlOutput('<b>Spreadsheet ready</b>');
linkready.setTitle('Spreadsheet generated')
var level = ""
// Logger.log(ssNew.getUrl());
ssNew.appendRow(['Word List','Part of speech','Definition','Synonym','images','Ngram','word frequency']);
ssNew.setFrozenRows(1)
ssNew.getRange('A1:G').activate();
ssNew.getRange('A1:G').createFilter();

generateList()
  const rowsForSS = [];
  for (const alphabetical of wordlist) {
    const result = mydict.find(word => word.word == alphabetical)
        if (typeof result !== 'undefined')
        {speech_part = result.speech_part
          definition = result.definition
        }
        else if(verblist.includes(alphabetical)){ //Handles verbs from the verb list. Each verb has 5 forms.
                  verb_pos = verblist.indexOf(alphabetical)
                  select_pos = verb_pos - verb_pos%5
                  const result = mydict.find(word => word.word == verblist[select_pos])
                  if (typeof result !== 'undefined'){
                    speech_part = result.speech_part
                    definition = result.definition}
                    else{
                  speech_part = ''
                  definition =''
                }}
        else if(alphabetical.substring(alphabetical.length - 1, alphabetical.length)=="s"){ //handle regular plurals
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 1))
          if (typeof result !== 'undefined'){
            speech_part = result.speech_part
            definition = result.definition}
          else{
          speech_part = ''
          definition =''
        }  
            }
        
        else if(alphabetical.substring(alphabetical.length - 3, alphabetical.length)=="ing"){ //handle ing forms
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 3))
          if (typeof result !== 'undefined'){
            speech_part = result.speech_part
            definition = result.definition}
          else{
          speech_part = ''
          definition =''
        }  
            }

        else if(alphabetical.substring(alphabetical.length - 2, alphabetical.length)=="ed"){ //handle ed forms
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 2))
          if (typeof result !== 'undefined'){
            speech_part = result.speech_part
            definition = result.definition}
          else{
          speech_part = ''
          definition =''
        }  
            }

        

        else{
          speech_part = ''
          definition =''
        }
    //const definition = '=hyperlink("https://www.dictionary.com/browse/'+alphabetical+'","definition")'
    const synonyms = '=hyperlink("https://www.thesaurus.com/browse/'+alphabetical+'","synonyms")'
    const visual_image = '=hyperlink("https://thenounproject.com/search/?q='+alphabetical+'","image")'// https://thenounproject.com/search/?q=abandon
    const ngram = '=hyperlink("https://books.google.com/ngrams/graph?content='+alphabetical+'","Ngram")' // Thanks Eric for this useful site
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
    rowsForSS.push([alphabetical,speech_part,definition,synonyms,visual_image,ngram,level]);  // Thanks to Adam Morris for using push to an array rather than adding indiv rows to ss
  }
  ssNew.getSheetByName('Sheet1').getRange(2, 1, rowsForSS.length, 7).setValues(rowsForSS); // This writes to the Spreadsheet at once. Must match number of columns in array.
  
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
ssNew.appendRow(['Word List','Part of speech','Definition','Synonym','images','Ngram']);
ssNew.setFrozenRows(1)
ssNew.getRange('A1:F').activate();
ssNew.getRange('A1:F').createFilter();


generateList()
  var rowsForSS = [];
  for (var alphabetical of wordlist) {
    if(!withquotation.includes(alphabetical)&&!beginner.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3){
      const result = mydict.find(word => word.word == alphabetical)
        if (typeof result !== 'undefined')
        {speech_part = result.speech_part
          definition = result.definition
        }
        else if(verblist.includes(alphabetical)){ //Handles verbs from the verb list. Each verb has 5 forms.
                  verb_pos = verblist.indexOf(alphabetical)
                  select_pos = verb_pos - verb_pos%5
                  const result = mydict.find(word => word.word == verblist[select_pos])
                  if (typeof result !== 'undefined'){
                    speech_part = result.speech_part
                    definition = result.definition}
                    else{
                  speech_part = ''
                  definition =''
                }}
        else if(alphabetical.substring(alphabetical.length - 1, alphabetical.length)=="s"){ //handle regular plurals
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 1))
          if (typeof result !== 'undefined'){
            speech_part = result.speech_part
            definition = result.definition}
          else{
          speech_part = ''
          definition =''
        }  
            }
        
        else if(alphabetical.substring(alphabetical.length - 3, alphabetical.length)=="ing"){ //handle ing forms
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 3))
          if (typeof result !== 'undefined'){
            speech_part = result.speech_part
            definition = result.definition}
          else{
          speech_part = ''
          definition =''
        }  
            }

        else if(alphabetical.substring(alphabetical.length - 2, alphabetical.length)=="ed"){ //handle ed forms
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 2))
          if (typeof result !== 'undefined'){
            speech_part = result.speech_part
            definition = result.definition}
          else{
          speech_part = ''
          definition =''
        }  
            }

        

        else{
          speech_part = ''
          definition =''
        }

    //var definition = '=hyperlink("https://www.dictionary.com/browse/'+alphabetical+'","definition")'
    var synonyms = '=hyperlink("https://www.thesaurus.com/browse/'+alphabetical+'","synonyms")'
    var visual_image = '=hyperlink("https://thenounproject.com/search/?q='+alphabetical+'","image")'// https://thenounproject.com/search/?q=abandon
    var ngram = '=hyperlink("https://books.google.com/ngrams/graph?content='+alphabetical+'","Ngram")' // Thanks Eric for this useful site
    rowsForSS.push([alphabetical,speech_part,definition,synonyms,visual_image,ngram]);
  }
  }
  ssNew.getSheetByName('Sheet1').getRange(2, 1, rowsForSS.length, 6).setValues(rowsForSS);
var myurl = ssNew.getUrl()
 linkready.append('<p><a href="'+myurl+'" target="_blank">Your Google Sheet</a></p>')
 DocumentApp.getUi().showSidebar(linkready);
}
