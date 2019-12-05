/* Magic Mirror
 * Module: MMM-1
 *
 * By Mykle1
 * MIT Licensed.
 */
Module.register("MMM-1", {
    // Default module config.
    defaults: {
        updateInterval: 5 * 60 * 1000, // set in config.js
        animationSpeed: 3000,
    },

    start: function() {
        self = this;

        // ADDED: Schedule update timer
        var self = this;
        setInterval(function() {
            self.updateDom(self.config.animationSpeed || 0);
        }, this.config.updateInterval);

    },

    getStyles: function() {
        return ["MMM-1.css"]
    },

    // Override dom generator.
    getDom: function() {
         var wrapper = document.getElementsByClassName("div");
         wrapper.className = "wrapper";
         wrapper.innerHTML = '<div class="text">' +
           '<p>Nachos are</p>' +
           '<p>' +
             '<span class="word wisteria">tasty.</span>' +
             '<span class="word belize">wonderful.</span>' +
             '<span class="word pomegranate">fancy.</span>' +
             '<span class="word green">beautiful.</span>' +
             '<span class="word midnight">cheap.</span>' +
           '</p>' +
         '</div>';

         // Insert into Dom. Move functions out of the Dom

         var words = document.getElementsByClassName('word');
         var wordArray = [];
         var currentWord = 0;

         words[currentWord].style.opacity = 1; // error in console "style"
         for (var i = 0; i < words.length; i++) {
           splitLetters(words[i]);
         }


         documentdocument
         this.animateLetterOut(); // moved below the close of the Dom

         this.animateLetterIn(); // moved below the close of the Dom

         this.splitLetters(); // moved below the close of the Dom

         this.changeWord(); // moved below the close of the Dom

         setInterval(changeWord, 4000);

         // setTimeout

         this.updateDom(); // Don't know how to update just once :-(

        return wrapper;
    },


    changeWord: function() {
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
    },

    animateLetterOut: function(cw, i) {
      setTimeout(function() {
            cw[i].className = 'letter out';
      }, i*80);
    },

    animateLetterIn: function(nw, i) {
      setTimeout(function() {
            nw[i].className = 'letter in';
      }, 340+(i*80));
    },

    splitLetters: function(word) {
      var content = word.innerHTML;
      word.innerHTML = '';
      var letters = [];document
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArray.push(letters);
    },

});
