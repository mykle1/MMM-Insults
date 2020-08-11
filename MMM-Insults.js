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
	activeInsult:0,
	Insults:null,
	wrapper: null,
	currentphrase :0,
	timer:null,
	phrases:null,
	first:true,
	htmlTemplate1:"<div class=\"static\">",
	htmlTemplate2: 	"<p> "+
				"<span class=\"phrase wisteria\"> a world class moron.</span>"+
				"<span class=\"phrase belize\"> a bumbling idiot.</span>"+
				"<span class=\"phrase pomegranate\"> a dirty mutant.</span>"+
				"<span class=\"phrase green\"> a drooling retard.</span>"+
				"<span class=\"phrase midnight\"> so fucking cheap.</span>"+
			"</p>"+
		"</div>",

		start: function() {
				Log.info("Starting module: " + this.name);
        this.getInsults();
				// Set locale.
				//this.Insults = null;
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
		}
		if(this.Insults){
			let temp = this.htmlTemplate1;
			// add the static text
			temp+=this.config.static   // set initial part of output, "john is"
			// loop thru the insult file data
		//	temp+=this.Insults[this.activeInsult++]
			for ( let each_insult of this.Insults) {
		           // append each insult to the div innerHtml
			   temp+= each_insult;   // note += (add value to existing value) vs = (set to this value)

				   	//in the json file u have "insult": "the text", that is name:value, u have to use the name
				   	// "insult": "<span class=\"phrase wisteria\"> a world class moron.</span>"

		  }
			temp+="</div></div>";  // close the P and div started with the tempplate and static text, only once
			if( this.activeInsult>=this.Insults.length)
				this.activeInsult=0
			console.log("new wrapper text="+temp);
			this.wrapper.innerHTML=temp;

			// get all the 'phrase' class elements from  our content template
			this.phrases = this.wrapper.getElementsByClassName("word");
			// break them into letters (better than hand coding app the spans!,
			// change the phrase text in the template and all else works the same)
			for (let phrase of  this.phrases) {
				this.splitLetters(phrase);
			}
			// override the class stype for the 1st phrase so it will be visible
			this.phrases[this.currentphrase].style.opacity = 1;
			this.phrases[this.currentphrase].style.display="inline-block"
			// start the phrase change timer
			this.timer=setInterval(()=>{this.changephrase(this.phrases.length>0)}, this.config.newInsult); //4000);
		}

		return this.wrapper;
	},

	changephrase: function (havephrases) {
		// be careful until the html is inserted in the dom
		if(havephrases){
			// get the current 'phrase' element
			var cp = this.phrases[this.currentphrase];
			// and the next one (could wrap around to the start
			var np = (this.currentphrase == this.phrases.length-1 )? this.phrases[0] : this.phrases[this.currentphrase+1];
			// loop thru the letters (phrases 'children' now)
			for (var i = 0; i < cp.childElementCount; i++) {
				// moving them out of display
				this.animateLetterOut(cp, i);
			}

			np.style.display="inline-block";

			// make the letters parent, the 'phrase',  object visible, altho it has no conetnt of its own
			np.childNodes[0].parentElement.style.opacity = 1;
			// loop thru the next phrase letters
			for (var i = 0; i < np.childElementCount; i++) {
				// make them visible
				np.childNodes[i].className = "letter behind";
				this.animateLetterIn(np, i);
			}
			if(cp!=np)
			cp.style.display="none";
			// adjust the current phrase index, for next cycle
			this.currentphrase = (this.currentphrase == this.phrases.length-1) ? 0 : this.currentphrase+1;
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

	// create individual span elements for each character of the phrase,
	// so we can manage each separately
	splitLetters: function (phrase) {
		// get the text of the phrase (only there 1st time)
		var content = phrase.innerHTML;
		// clear the hard coded text
		phrase.innerHTML = "";
		// loop thru the letters
		for (var i = 0; i < content.length; i++) {
			// make a span for each
			var letter = document.createElement("span");
			letter.className = "letter";
			// save the character for the span
			letter.innerHTML = content.charAt(i)==' '?'&nbsp':content.charAt(i) ;
			// add the span to the phrase element
			phrase.appendChild(letter);
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
			else
			 this.updateDom(this.config.initialLoadDelay);
	}

});
