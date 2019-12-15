/* Magic Mirror
 * Module: MMM-Insults
 *
 * By Mykle1
 * MIT Licensed.
 */

Module.register("MMM-Insults", {
	// Default module config.
	defaults: {
		static: "", // set in config.js
		newInsult: 8000, // ms
		updateInterval: 60 * 60 * 1000, // set in config.js
		animationSpeed: 0,
	},

	wrapper: null,
	currentWord :0,
	timer:null,
	words:null,
	first:true,
	htmlTemplate1:"<div class=\"text\">",
	htmlTemplate2: 	"<p> "+
				"<span class=\"word wisteria\"> a world class moron.</span>"+
				"<span class=\"word belize\"> a bumbling idiot.</span>"+
				"<span class=\"word pomegranate\"> a dirty mutant.</span>"+
				"<span class=\"word green\"> a drooling retard.</span>"+
				"<span class=\"word midnight\"> so fucking cheap.</span>"+
			"</p>"+
		"</div>",

		start: function() {
				Log.info("Starting module: " + this.name);
        this.getInsults();
				// Set locale.
				this.Insults = {};
				this.activeItem = 0;
				this.rotateInterval = null;

		},

	getStyles: function() {
		return ["MMM-Insults.css"];
	},

	// Override dom generator.
	getDom: function() {

console.log(this.Insults);
		// only create wrapper once
		if(this.wrapper==null){
			this.wrapper = document.createElement("div");
			this.wrapper.id="wrapper";
			for ( var i = 0; i < this.Insults.length; i++) {
			this.wrapper.innerHTML=this.htmlTemplate1 + "<p>" + this.config.static + "</p><p>"+ this.Insults[i] + "</p></div>";
console.log(this.wrapper.innerHTML=this.htmlTemplate1 + "<p>" + this.config.static + "</p><p>"+ this.Insults[i] + "</p></div>");
		 }
			// get all the 'word' class elements from  our content template
			this.words = this.wrapper.getElementsByClassName("word");
			// break them into letters (better than hand coding app the spans!,
			// change the word text in the template and all else works the same)
			for (let word of  this.words) {
				this.splitLetters(word);
			}
			// override the class stype for the 1st word so it will be visible
			this.words[this.currentWord].style.opacity = 1;
			// start the word change timer
			this.timer=setInterval(()=>{this.changeWord(this.words.length>0)}, this.config.newInsult); //4000);
		}

		return this.wrapper;
	},

	changeWord: function (haveWords) {
		// be careful until the html is inserted in the dom
		if(haveWords){
			// get the current 'word' element
			var cw = this.words[this.currentWord];
			// and the next one (could wrap around to the start
			var nw = (this.currentWord == this.words.length-1 )? this.words[0] : this.words[this.currentWord+1];
			// loop thru the letters (words 'children' now)
			for (var i = 0; i < cw.childElementCount; i++) {
				// moving them out of display
				this.animateLetterOut(cw, i);
			}

			// make the letters parent, the 'word',  object visible, altho it has no conetnt of its own
			nw.childNodes[0].parentElement.style.opacity = 1;
			// loop thru the next word letters
			for (var i = 0; i < nw.childElementCount; i++) {
				// make them visible
				nw.childNodes[i].className = "letter behind";
				this.animateLetterIn(nw, i);
			}
			// adjust the current word index, for next cycle
			this.currentWord = (this.currentWord == this.words.length-1) ? 0 : this.currentWord+1;
		}
	},

	// change the class for a letter, to move it out of view
	animateLetterOut: function (cw, i) {
		setTimeout(() => {
			cw.childNodes[i].className = "letter out";
		}, i*80);
	},
	// change the class for a letter, to move it into view
	animateLetterIn: function (nw, i) {
		setTimeout(function() {
			nw.childNodes[i].className = "letter in";
		}, 340+(i*80));
	},

	// create individual span elements for each character of the word,
	// so we can manage each separately
	splitLetters: function (word) {
		// get the text of the word (only there 1st time)
		var content = word.innerHTML;
		// clear the hard coded text
		word.innerHTML = "";
		// loop thru the letters
		for (var i = 0; i < content.length; i++) {
			// make a span for each
			var letter = document.createElement("span");
			letter.className = "letter";
			// save the character for the span
			letter.innerHTML = content.charAt(i)==' '?'&nbsp':content.charAt(i) ;
			// add the span to the word element
			word.appendChild(letter);
		}
	},

	processInsults: function(data) {
			this.Insults = data;
			this.loaded = true;
      console.log(this.Insults)
	},

	// scheduleCarousel: function() {
	// 		console.log("Carousel turning!");
	// 		this.rotateInterval = setInterval(() => {
	// 				this.activeItem++;
	// 				this.updateDom(this.config.animationSpeed);
	// 		}, this.config.rotateInterval);
	// },

	getInsults: function() {
			this.sendSocketNotification('GET_INSULTS');
	},

	socketNotificationReceived: function(notification, payload) {
			if (notification === "INSULTS_RESULT") {
					this.processInsults(payload);
				//	if (this.rotateInterval == null) {
				//			this.scheduleCarousel();
				//	}
					this.updateDom(this.config.animationSpeed);
			}
			this.updateDom(this.config.initialLoadDelay);
	}

});
