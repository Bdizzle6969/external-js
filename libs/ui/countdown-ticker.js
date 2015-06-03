/*
  countdown ticker to countdown to theme nights
*/
moment = require("moment-timezone");


CountdownTicker = function(dom, options) {
    var options = options || {};
    this.dom = dom;
    this._handle_tick = null;
}

CountdownTicker.prototype.init = function(options) {
    var options = options || {};
    this.label = options.label || "Time till theme: ";
    this.hour = options.hour || 20;
    
    //create our dom element
    this.domCountdown = document.createElement("div");
    this.dom.appendChild(this.domCountdown);

    //style the ticker into the bottom right corner
    this.domCountdown.style.position = "absolute";
    this.domCountdown.style.right = "10px";
    this.domCountdown.style.bottom = "20px";
    this.domCountdown.style.color = "rgba(240,240,240, 0.5)";
    this.domCountdown.style.fontSize = "16px";

    //start tick
    this.tick();
}
    
CountdownTicker.prototype.tick = function() {    
    this.domCountdown.innerHTML = this.getCountdown();
    
    this._handle_tick = setTimeout(this.tick.bind(this), 250);
}

CountdownTicker.prototype.getCountdown = function() {
    var thisMoment = moment.tz("America/Thunder_Bay");
    var toCountdownString = thisMoment.to(
	moment()
	    .tz("America/Thunder_Bay")
	    .hours(this.hour-1)
    );
    
    return this.label + toCountdownString;
}

module.exports = {
    CountdownTicker: CountdownTicker,
}
