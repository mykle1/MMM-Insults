// Got this code from codepen.io

// I know what the following HTML is doing but I don't understand HTML formatting
// I'm confident that I could make this work if I knew how to use/convert the HTML
// to something I am familiar with or knew how to use it inside a module.js.

<div class="text">
  <p>Nachos are</p> // I think this would be a simple div with text output
  <p>
    <span class="word wisteria">tasty.</span>
    <span class="word belize">wonderful.</span>
    <span class="word pomegranate">fancy.</span>
    <span class="word green">beautiful.</span>
    <span class="word midnight">cheap.</span>
  </p>
</div>
////////////////////// END OF HTML /////////////////////////////

// I am not familiar (at all) with HTML above. I've only dealt with innerHTML of MM.
// I'm fairly sure that the JS code below goes in the getDom of an MM module
// Do I just create my div followed by this JS code?

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
        cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
        nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);
