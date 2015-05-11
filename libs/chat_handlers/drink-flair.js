
var __drink_timeout_handler = null;

drinkflair();

function drinkflair(){
    socket.on("drinkCount", function() {
	clearTimeout(__drink_timeout_handler);
	__drink_timeout_handler = setTimeout(function() {
	    $('#drinkbar h1 span').remove();
	    lelcat = $('#drinkbar h1').text().replace('drinks','');
	    $('#drinkbar h1').text(lelcat);
	    lelcat = $('#drinkbar h1').text().replace('drink','');
	    $('#drinkbar h1').text(lelcat);
	    $('#drinkbar h1').append($('.drink span').last().clone());
	    $('#drinkbar h1 span').append("<img src='http://i.imgur.com/gFQutcV.gif' />");
	}, 2000);
    });
}

module.exports = {
    
};
