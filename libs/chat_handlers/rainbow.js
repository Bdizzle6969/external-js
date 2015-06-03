/*
  add rainbow colors to text on screen
*/
var DOM = require("../DOM.Barf.js").DOM;
var _s = DOM.Barf;
_s.span = _s.toSpit("span");

var rainbow_colors = [
    "#EE4035",
    "#F37737",
    "#F9E97A",
    "#7AC043",
    "#9ED9F7",
];

var rainbow_index = 0;
function get_next_color() {
    var color = rainbow_colors[rainbow_index];
    rainbow_index = (rainbow_index + 1) % rainbow_colors.length;
    return color;
}

function create_rainbow(msg) {
    var output = "";
    for (var i = 0; i < msg.length; i++) {
	var letter = msg[i];
	output += _s.span({style: {color: get_next_color()}}, letter);
    }
    return output;
}

var handler = function(data) {
    var div = data.div;
    var msg = data.msg || "";

    var re_rainbow = /^(.*):rainbow: ?(.*)$/;
    if (msg.match(re_rainbow)) {
	var m = msg.match(re_rainbow);
	msg = m[1] + create_rainbow(m[2])
	
	var spanText = div.querySelectorAll("span")[1];
	spanText.innerHTML = msg;
    }
}

module.exports = {
    handler: handler,
}
