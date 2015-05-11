
if ($('#stopaudiobutton').length != 0){
    return;
}
else {
    $('#leftcontrols').prepend('<span class="btn btn-sm btn-default" style="float: right;" id="stopaudiobutton">Stop Audio</span>');
    $( "#stopaudiobutton" ).click(function() {
	var audioElements = document.getElementsByTagName('audio');
	for(var i = 0; i < audioElements.length; ++i){
	    audioElements[i].pause();
	}
    }); 
}

function speakz2() {
    if (!$('.speakz2').length){
	return;
    }
    if (!$('.spenabled2').length) {
	return;
    }

    var moobs=new Audio("http://webanywhere.cs.washington.edu/cgi-bin/espeak/getsound.pl?lang=english&text="+encodeURI($(".speakz2").last().text()));
    moobs.volume=.4;
    moobs.play();
    $(".speakz2").removeClass();
}

addsptoggle();
function addsptoggle() {
    if ($('#sptoggle2').length) {
	return;
    }
    $('#leftcontrols').prepend('<span class="btn btn-sm btn-default" style="float: right;" id="sptoggle2">ENABLE SPEAK</span>');
    $( "#sptoggle2" ).click(function() {
	$(this).toggleClass("spenabled2");
    });
}

socket.on("chatMsg", function() {
    speakz2(); 
})

module.exports = {
    
}
