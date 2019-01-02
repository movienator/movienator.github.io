let abstract; let searchurl="https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&search=";
let phrase;let wikiRes;let waitvar;
function setup() { 
}
function search(searchterm){
  this.searchterm=searchterm;
  let url=searchurl+searchterm;
  loadJSON(url,gotData,'jsonp');
}
function gotData(data){
  console.log(data[2][0]);
  wikiRes=data[2][0];
  console.log(wikiRes);
}
function wait() {
  setTimeout(function(){ 
    phrase="Acording to Wikipedia "+wikiRes;
    document.getElementById("message").value=phrase;
   speech();
   }, 2000);
}
$(function(){
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = function() {
      var $voicelist = $('#voices');

      if($voicelist.find('option').length == 0) {
        speechSynthesis.getVoices().forEach(function(voice, index) {
          var $option = $('<option>')
          .val(index)
          .html(voice.name + (voice.default ? ' (default)' :''));

          $voicelist.append($option);
        });

        $voicelist.material_select();
      }
    }

    $('#speak').click(function(){
      var text = $('#message').val();
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[$('#voices').val()];
      msg.rate = $('#rate').val() / 10;
      msg.pitch = $('#pitch').val();
      msg.text = text;

      msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
      };

      speechSynthesis.speak(msg);
    })
  } else {
    $('#modal1').openModal();
  }
});
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = ["Tap"];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click .';

document.body.onclick = function() {
  document.getElementById("tap").src="effect.gif";
  recognition.start();
  console.log('Ready to receive a color command.');
}

function speech(){
  
  $(document).ready(function(){
    
    var text = $('#message').val();
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[$('#voices').val()];
    msg.rate = $('#rate').val() / 10;
    msg.pitch = $('#pitch').val();
    msg.text = text;

    msg.onend = function(e) {
      document.getElementById("tap").src="mic.png";
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(msg);
  })
}
recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var phrase = event.results[last][0].transcript;
    if(phrase=="boss"||phrase=="who is your boss"||phrase=="who made you"||phrase=="who created you"||phrase=="who is your developer"||phrase=="who is your daddy"){
      phrase = "Franko Prifti";
      document.getElementById("message").value=phrase;
     speech();
      document.getElementById("activity").src="https://www.prifti.ml";
    }
    else if(phrase=="who are you"){
      phrase = "I am Franko's Assistant";
      document.getElementById("message").value=phrase;
     speech();
    }
    else if(phrase=="call my girlfriend"){
      phrase = "Which One ";
      document.getElementById("message").value=phrase;
     speech();
    }
    else if(phrase=="where am i"||phrase=="where am I"||phrase=="what is my location"||phrase=="what's my location")
    {
      $.get("https://api.ipdata.co?api-key=test", function (response) {
    document.getElementById("message").value=response.city + ", " + response.region;
}, "jsonp");

     speech();
    }
    else if(phrase=="what's the time"||phrase=="what is the time"||phrase=="what time is it"){
      var h = new Date(); 
      phrase = h.getHours()+":"+h.getMinutes();
      document.getElementById("message").value=phrase;
     speech();
    }
    else if(phrase=="what's the date"||phrase=="what is the date"||phrase=="what date is it"){
      var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    var mon = month[d.getMonth()];
      phrase = mon+" "+d.getDate()+" "+d.getFullYear();
      document.getElementById("message").value=phrase;
     speech();
    }
    else if (phrase=="how old are you"){
       phrase="I am really young. I can't say in years but definitely I'm younger than you!";
document.getElementById("message").value=phrase;
     speech();
}
else if (phrase=="tell me a joke"){
       phrase="A ham sandwich walks into a bar and orders a beer. Bartender says: sorry, we do not serve food here.";
document.getElementById("message").value=phrase;
     speech();
}
    else if(phrase=="what's the weather like"||phrase=="what is the weather like"){
      
      phrase = "Check It Out";
      document.getElementById("message").value=phrase;
     speech();
     document.getElementById("activity").src="weather/index.html";

    }
    else{
      
      search(phrase);
      wait();
      
    }



    
  diagnostic.textContent = 'Result received: ' + phrase + '.';
  bg.style.backgroundColor = phrase;
  console.log('Confidence: ' + event.results[0][0].confidence);

}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  phrase = "Please Try Again";
      document.getElementById("message").value=phrase;
     speech();
  diagnostic.textContent = "Please Try Again";
}

recognition.onerror = function(event) {
  phrase = "Please Try Again";
      document.getElementById("message").value=phrase;
     speech();
  diagnostic.textContent = 'Please Try Again: ' + event.error;
}
