function addTable() {
var rowsData = [["Word", 'Notes']];

  generateList()
  for (var alphabetical of wordlist) {
    if (!beginner.includes(alphabetical)&&!withquotation.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3) {
        rowsData.push([alphabetical," "])
        //output.append('<tr><td>'+alphabetical+definition+thesaurus+nounproject+'</td> <td>') 
    }
  }
//body.insertParagraph(0, doc.getName())
//    .setHeading(DocumentApp.ParagraphHeading.HEADING1);
  table = body.appendTable(rowsData);
  table.getRow(0).editAsText().setBold(true);
  
  for (var i=1; i<rowsData.length;i++){
  table.getCell(i,0).editAsText().setLinkUrl('https://www.dictionary.com/browse/'+rowsData[i][0])
  }
  
}


//insertText(0, "link text").setLinkUrl("www.google.com");