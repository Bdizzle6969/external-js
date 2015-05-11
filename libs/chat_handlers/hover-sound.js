hoverSound();
function hoverSound() {
    socket.on("chatMsg", function(args) {
	var sucko = $('.hoversound7').last().text();
	var soundlink = 'http://' + sucko;
	$('.hoversound7').last().parent().append('<audio id="gifaudio"><source src="'+soundlink+'" type="audio/mpeg">');

	$('#gifaudio').parent().append('<img src="http://i.imgur.com/4XgmiHM.png" height="20px"/>');
	$('#gifaudio').parent().on('click', function() {
	    var boobs = $(this).find('audio');
	    boobs[0].volume=.4;
	    boobs[0].play();
	});
	$('.hoversound7').remove();
	$('#gifaudio').attr('id','giffedaudio');

    });
}

module.exports = {

};
