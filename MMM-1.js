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
        this.url = 'https://media.giphy.com/media/l9eTgC1GpyEZq/giphy.gif';


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
        var wrapper = document.createElement("div");
        var image = document.createElement("img");
            image.src = this.url;
        wrapper.appendChild(image);

        return wrapper;
    },

});
