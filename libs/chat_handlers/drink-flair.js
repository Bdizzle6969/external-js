/*
  Drink Flair and chatMsg fixes
 */

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

var handler = function(data) {
    var div = data.div;
    if ($(div).hasClass("drink")) {
	//correct the inner text
	var msg = "D" + data.msg;
	
	var spanText = div.querySelectorAll("span")[2];
	spanText.innerHTML = msg;

	//apply to header
	var drinkBar = document.querySelector("#drinkbar h1");
	console.log("drinkbar", drinkBar);
	
    }
}


module.exports = {
    handler: handler,
};
