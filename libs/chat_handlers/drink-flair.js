/*
  Drink Flair and chatMsg fixes
 */
var DOM = require("../DOM.Barf.js").DOM;
var _s = DOM.Barf;
_s.span = _s.toSpit("span");

var __drinkCount = 0;

socket.on("drinkCount", function(count) {
    __drinkCount = count;
    /*
      $('#drinkbar h1 span').remove();
      lelcat = $('#drinkbar h1').text().replace('drinks','');
      $('#drinkbar h1').text(lelcat);
      lelcat = $('#drinkbar h1').text().replace('drink','');
      $('#drinkbar h1').text(lelcat);
      $('#drinkbar h1').append($('.drink span').last().clone());
      $('#drinkbar h1 span').append("<img src='http://i.imgur.com/gFQutcV.gif' />");
    */
});

var __timeoutHandler = null;
var handler = function(data) {
    var div = data.div;
    if ($(div).hasClass("drink")) {
	//correct the inner text
	var msg = "D" + data.msg;
	
	var spanText = div.querySelectorAll("span")[2];
	spanText.innerHTML = msg;

	//apply to header
	var drinkBar = document.querySelector("#drinkcount");
	var innerContent = _s.ToRaw([
	    _s.span({"class": "drink"}, [
		__drinkCount.toString() + " ",
		msg,
		_s.img({src: "http://i.imgur.com/gFQutcV.gif"})
	    ]),
	]);
	drinkBar.innerHTML = innerContent;
    }
}


module.exports = {
    handler: handler,
};
