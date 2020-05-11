var syllable_total = 0
var word_count = 0
var fullstops = ""
var flesch = 0
var cchar = 0
var cbeginner = 0
var celementary = 0
var cintermediate = 0
var cupperint = 0
var cdifficult = 0
var diffwords = []

function new_count() {
  word = word.toLowerCase();                                     //word.downcase!
  if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')  
  // Logger.log(word.match(/[aeiouy]{1,2}/g))  // Logs the vowels to check it is working
  if(word.match(/[aeiouy]{1,2}/g)){  
    return word.match(/[aeiouy]{1,2}/g).length; }
   else { return 1;}
}

function wordAnalysis() {

for (var i=0; i<paragraphs.length;i++)
  {
    var para = paragraphs[i].getText()
    cchar+=para.length
    fullstops += para.replace(/[^\.]/gi,'')
    para = para.replace(/[^a-z\s\-]/gi, '') // Gets rid of non-alphanumeric characters
    
    var words = para.split(" ") // splits by space character
    for (var myword of words) {  // like in in Python
      word = myword.replace(/[^a-z\-]/gi,'')
      if (beginner.includes(word)){
      cbeginner +=1 }
    else if (elementary.includes(word)){
      celementary +=1
    }
    else if (intermediate.includes(word)){
      cintermediate +=1
    }
    else if (upper.includes(word)){
      cupperint+=1
    }
    else if(word.length>3) {
    cdifficult+=1
    diffwords.push(word)
      //Logger.log(new_count()) // logs difficult words
    }      
      syllable_total+=new_count()
      word_count+=1
     }
   }
}

function gen_stats(){  // Currently an orphan, does nobody love stats?
var stats = HtmlService.createHtmlOutput('<p><b>Reading Difficulty Stats</b></p>');
stats.setTitle('Reading Difficulty Stats')
wordAnalysis()

  flesch = 206.835 - (1.015*(word_count/fullstops.length)) - (84.6 * word_count/syllable_total)
  flesch = Math.round(flesch)

  stats.append("<p><strong>Length difficulty</strong>")
  stats.append("<br>words: "+word_count)
  stats.append("<br>sentences: "+fullstops.length)
  stats.append("<br>Characters: "+cchar)
  stats.append("<br>Average sentence length: "+Math.round(word_count/fullstops.length))  
  stats.append("<br>Average word length: "+Math.round(cchar/word_count))
  stats.append("<br>Flesch score: "+Math.round(flesch))
  if(flesch>100){stats.append('<br>Flesch score:<strong style="color:green"> Good</strong></p>')}
  else if (flesch>75){stats.append('<br>Flesch score:<span style="color:orange"> Challenging<span></p>')}
  else {stats.append('<br>Flesch score:<span style="color:red"> Difficult<span></p>')}
  
  
  stats.append("<p><strong>Vocabulary difficulty</strong>")
  stats.append("<br>beginner: "+cbeginner)
  stats.append("<br>elementary: "+celementary)
  stats.append("<br>intermediate: "+cintermediate)
  stats.append("<br>upper intermediate: "+cupperint)
  stats.append("<br>Difficult words: "+cdifficult)

  stats.append("<p><strong>Reading Time</strong>")
  stats.append("<br>Grd 4 child(Y5 UK): "+(Math.round((cchar/5)/150))+'mins')
  stats.append("<br>adult: "+(Math.round((cchar/5)/180))+'mins</p>')
  // grade 4 reading level 150wpm = 2.5 per second
  // adult reading level 180wpm = 3 per second
  
  DocumentApp.getUi().showSidebar(stats);
  
}

function gen_summary(){
var stats = HtmlService.createHtmlOutput('<p style="font-family:verdana;"><b>Reading Difficulty Guide</b></p>');
stats.setTitle('Reading Difficulty Guide')
wordAnalysis()

  flesch = 206.835 - (1.015*(word_count/fullstops.length)) - (84.6 * word_count/syllable_total)
  flesch = Math.round(flesch)
  stats.append("<details><summary>")
  if(flesch>100){stats.append('Flesch score:<strong style="color:green"> Good</strong></p>')}
  else if (flesch>75){stats.append('Flesch score:<span style="color:orange"> Challenging</span></p>')}
  else {stats.append('Flesch score:<span style="color:red"> Difficult</span></p>')}
  
  
  //stats.append("<details><summary>More Details</summary>")
  stats.append("</summary>")
  stats.append("<p><strong>Length difficulty</strong>")
  stats.append("<br>words: "+word_count)
  stats.append("<br>sentences: "+fullstops.length)
  stats.append("<br>Characters: "+cchar)
  stats.append("<br>Average sentence length: "+Math.round(word_count/fullstops.length))  
  stats.append("<br>Average word length: "+Math.round(cchar/word_count))
  stats.append('</details></p>')
  if(Math.round(word_count/fullstops.length)>25){stats.append('<strong>Long sentences</strong><br> Please check sentence complexity.')}
  
  stats.append('<p style="font-family:verdana;"><strong>Vocabulary difficulty</strong>')
  var totalWords = cbeginner + celementary + cintermediate + cupperint + cdifficult
  
  var percentBeg = (cbeginner/totalWords)*100
  var percentEle = (celementary/totalWords)*100
  var percentInt = (cintermediate/totalWords)*100
  var percentUpp = (cupperint/totalWords)*100
  var percentDif = (cdifficult/totalWords)*100
  stats.append("<table><tr><td>Beginner: </td><td>")
  stats.append('<svg width="100" height="17"><rect width="'+percentBeg+'" height="15" style="fill:rgb(40, 189, 47);stroke-width:1;stroke:rgb(0,0,0)" /></svg></tr>')
  stats.append("<tr><td>Elementary: </td><td>")
  stats.append('<svg width="100" height="17"><rect width="'+percentEle+'" height="15" style="fill:rgb(186, 230, 168);stroke-width:1;stroke:rgb(0,0,0)" /></svg></tr>')
  stats.append("<tr><td>Intermediate: </td><td>")
  stats.append('<svg width="100" height="17"><rect width="'+percentInt+'" height="15" style="fill:rgb(255, 196, 0);stroke-width:1;stroke:rgb(0,0,0)" /></svg></tr>')
  stats.append("<tr><td>Upper intermediate: </td><td>")
  stats.append('<svg width="100" height="17"><rect width="'+percentUpp+'" height="15" style="fill:rgb(247, 244, 52);stroke-width:1;stroke:rgb(0,0,0)" /></svg></tr>')
  stats.append("<tr><td>Difficult words: </td><td>")
  stats.append('<svg width="100" height="17"><rect width="'+percentDif+'" height="15" style="fill:rgb(255, 0, 0);stroke-width:1;stroke:rgb(0,0,0)" /></svg></tr></table>')

  stats.append('<p style="font-family:verdana;"><strong>Reading Time</strong></p>')  
  // 150*60*5 means you can ready 45,000 characters per hour. The full circle is 31.4 so 0.00069777777
  stats.append('<svg height="100" width="100" viewBox="0 0 20 20"><circle r="10" cx="10" cy="10" fill="gray" /><circle r="5" cx="10" cy="10" fill="transparent" stroke="tomato" stroke-width="10" stroke-dasharray="calc('+cchar*0.00069777777+') 31.4" transform="rotate(-90) translate(-20)" /></svg>')
  stats.append("<br>Grade 4 child (Y5 UK): "+(Math.round((cchar/5)/150))+'mins')
  stats.append("<br>Adult: "+(Math.round((cchar/5)/180))+'mins</p>')
  
  // grade 4 reading level 150wpm = 2.5 per second
  // adult reading level 180wpm = 3 per second
  
  if(diffwords.length>0){
  stats.append('<p style="font-family:verdana;"><strong>Challenging Vocab highlights</strong>')}
  
  diffwords.sort((a, b) => b.length - a.length);
  var counter = 0
  for (var word of diffwords) {
  stats.append('<li>'+word)
  if(counter>5){break}
  counter+=1
  }
  
  DocumentApp.getUi().showSidebar(stats);
  
}