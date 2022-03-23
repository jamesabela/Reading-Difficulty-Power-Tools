function addTable() {
var rowsData = [['Word', 'Notes']];

  generateList()
  for (var alphabetical of wordlist) {
    if (!beginner.includes(alphabetical)&&!withquotation.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3) {
        const result = mydict.find(word => word.word == alphabetical)
        if (typeof result !== 'undefined'){definition = '['+(result.speech_part)+'] '+(result.definition)}

        else if(verblist.includes(alphabetical)){ //Handles verbs from the verb list. Each verb has 5 forms.
                  verb_pos = verblist.indexOf(alphabetical)
                  select_pos = verb_pos - verb_pos%5
                  const result = mydict.find(word => word.word == verblist[select_pos])
                  if (typeof result !== 'undefined'){definition = '['+(result.speech_part)+'] '+(result.definition)}
                    else{definition = '['+(result.speech_part)+'] '}}
        
        else if(alphabetical.substring(alphabetical.length - 1, alphabetical.length)=="s"){ //handle regular plurals or third person
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 1))
          if (typeof result !== 'undefined'){definition = '['+(result.speech_part)+'] '+(result.definition)}
          else{definition =''}}
        
        else if(alphabetical.substring(alphabetical.length - 3, alphabetical.length)=="ing"){ //handle ing forms
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 3))
          if (typeof result !== 'undefined'){definition = '['+(result.speech_part)+'] '+(result.definition)}
          else{definition =''}}

        else if(alphabetical.substring(alphabetical.length - 2, alphabetical.length)=="ed"){ //handle ed forms
          const result = mydict.find(word => word.word == alphabetical.substring(0, alphabetical.length - 2))
          if (typeof result !== 'undefined'){definition = '['+(result.speech_part)+'] '+(result.definition)}
          else{definition =''}}

        else{definition =''}
        rowsData.push([alphabetical,definition])        
        }
  }
  table = body.appendTable(rowsData);
  table.getRow(0).editAsText().setBold(true);

  for (var i=1; i<rowsData.length;i++){
  table.getCell(i,0).editAsText().setLinkUrl('https://www.dictionary.com/browse/'+rowsData[i][0])
  }
  

}
