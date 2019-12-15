/* Magic Mirror
    * Module: MMM-Insults
    *
    * By Mykle1
    * MIT Licensed.
    */
const NodeHelper = require('node_helper');
const fs = require('fs');

module.exports = NodeHelper.create({

    start: function() {
        this.Insults = {
            data: null
        },

        this.path = "modules/MMM-Insults/insults.json";
        if (fs.existsSync(this.path)) {
            var temp = JSON.parse(fs.readFileSync(this.path, 'utf8'));
                this.Insults = temp;
                // send data to module
                this.sendSocketNotification('INSULTS_RESULT', temp);
        }
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_INSULTS') {
            if (this.Insults !== null) {
                this.sendSocketNotification('INSULTS_RESULT', this.Insults);
            }
        }
    }

});
