var wordlist = []
var doc = DocumentApp.getActiveDocument()
var body = doc.getBody()
var paragraphs = body.getParagraphs()
var MyTitle = doc.getName()
var output = HtmlService.createHtmlOutputFromFile('tablegen')
var word =""
output.setTitle('Word List')

function onOpen() {
  var ui = DocumentApp.getUi();
      ui.createMenu('Reading Power Tools')
        .addItem('About RDPT', 'aboutPage')
        .addItem('Doc Wordlist', 'showWordList')
        .addItem('Doc Low Freq Words','lowFreqWords')        
        .addItem('◫Add Low Freq Word Table', 'addTable')
        .addSeparator()
        .addItem('🔍Difficulty Guide', 'gen_summary')
        .addItem('High Frequency Word List','allHighFreq')
        .addItem('☁ Word Cloud', 'wordcloud')
        .addSeparator()
        .addItem('▦Create Sheet (low freq)', 'genLowFreqSheet')
        .addItem('▦Create Sheet (full)', 'generateSheet')
        .addSeparator()        
        .addSubMenu(ui.createMenu('Highlighting')
          .addItem('low frequency words', 'hlLowFreqWords')
          .addItem('unhighlight low freq', 'unLowFreqWords')
          )
          .addSeparator() 
          .addItem('Give Feedback', 'FeedbackUrl')
          
      
//      .addSubMenu(('Highlighting').addItem('Highlight low frequency words','hlLowFreqWords'))
      .addToUi();
}

function generateList() {
//Output html text  
  for (var i=0; i<paragraphs.length;i++)
  {
    var para = paragraphs[i].getText()
    para = para.replace(/[^\w\s\-]/gi, '') // Gets rid of non-alphanumeric characters
    var words = para.split(" ") // splits by space character
    for (var word of words) {  // like in in Python
      var noSpace = word.replace(/[^a-z\-]/gi,'')
      var noSpace = noSpace.toLowerCase()
      if (!wordlist.includes(noSpace)){
        if (contracted.includes(noSpace)) {noSpace=fixContraction(noSpace)}
        wordlist.push(noSpace)        
      }
     }
   }
  wordlist=wordlist.sort()
  wordlist.shift()
  //Logger.log(wordlist)
}

function showWordList() {
// Display a sidebar with custom HtmlService content.
generateList()

  for (var alphabetical of wordlist) {
    var definition =' - <a href="https://www.dictionary.com/browse/'+alphabetical+'"target="_blank">def</a>'
    var thesaurus =' <a href="https://www.thesaurus.com/browse/'+alphabetical+'"target="_blank">syn</a>'
    var nounproject =' <a href="https://thenounproject.com/search/?q='+alphabetical+'"target="_blank">img</a>'
    output.append('<tr><td>'+alphabetical+definition+thesaurus+nounproject+'</td> <td>') 
    if (beginner.includes(alphabetical)){
      output.append(' B') }
    else if (elementary.includes(alphabetical)){
      output.append(' E')
    }
    else if (intermediate.includes(alphabetical)){
      output.append(' I')
    }
    else if (upper.includes(alphabetical)){
      output.append(' U')
    }
    else if (withquotation.includes(alphabetical)){
      output.append(' C')
    }
    else if(alphabetical.length>3) {
      output.append(' L')}
    output.append('</td></tr>')
                  }
  output.append('</table>')

  output.append('</body></html>')
 DocumentApp.getUi().showSidebar(output);

}

function lowFreqWords() {
  generateList()
  for (var alphabetical of wordlist) {
    if (!beginner.includes(alphabetical)&&!withquotation.includes(alphabetical)&&!elementary.includes(alphabetical)&&!intermediate.includes(alphabetical)&&!upper.includes(alphabetical)&&alphabetical.length>3) {
        var definition ='<br><a href="https://www.dictionary.com/browse/'+alphabetical+'"target="_blank">def</a>'
        var thesaurus =' <a href="https://www.thesaurus.com/browse/'+alphabetical+'"target="_blank">syn</a>'
        var nounproject =' <a href="https://thenounproject.com/search/?q='+alphabetical+'"target="_blank">img</a>'
        var ngram =' <a href="https://books.google.com/ngrams/graph?content='+alphabetical+'"target="_blank">ngram</a>'
        output.append('<tr><td>'+alphabetical+definition+thesaurus+nounproject+ngram+'</td> <td>') 
        output.append(' L')
        output.append('</td></tr>')
    }
  }
  output.append('</table>')
  output.append('</body></html>')
  DocumentApp.getUi().showSidebar(output);
}
