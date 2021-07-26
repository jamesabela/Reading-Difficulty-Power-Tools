function allHighFreq() {
  var outputHighFreq = HtmlService.createHtmlOutputFromFile('wordlist')
  outputHighFreq.setTitle('Word List')
  DocumentApp.getUi().showSidebar(outputHighFreq);
}

function aboutPage() {
  var outputAbout = HtmlService.createHtmlOutputFromFile('about')
  outputAbout.setTitle('About the App')
  DocumentApp.getUi().showSidebar(outputAbout);
}
function feedbackPage() {
  var outputFeedback = HtmlService.createHtmlOutputFromFile('Feedback')
  outputFeedback.setTitle('App Feedback')
  DocumentApp.getUi().showSidebar(outputFeedback);
}

function FeedbackUrl(){
var htmlOutput = HtmlService
    .createHtmlOutputFromFile('Feedback')
    .setWidth(650)
    .setHeight(500);
DocumentApp.getUi().showModalDialog(htmlOutput, 'Feedback');
}

function wordcloud() {
    var wordy = HtmlService
      .createTemplateFromFile('wc')
      .evaluate();
  
  wordy.setWidth(650)
  wordy.setHeight(500)

  //DocumentApp.getUi().showSidebar(wordy);
  DocumentApp.getUi().showModalDialog(wordy, 'Word Cloud');
  }    
