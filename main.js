//Text Effect Libraries
$.getScript("http://jschr.github.io/textillate/jquery.textillate.js");
$.getScript("http://www.crayola.com/application/javascript/libraries/jquery.lettering-0.6.1.min.js");

//Random Includes
//TODO: Cleanup
require("./libs/embed-utils.js");
require("./libs/misc.js");

//UI Modifications
require("./libs/ui/mod-console.js");
require("./libs/ui/trivia-toggle.js");

//Chat Handlers
require("./libs/chat_handlers/drink-flair.js");
require("./libs/chat_handlers/audio-speakz.js");

//Redirect synchtube.me users to the new cytu.be site
if (location.host == "synchtube.me" || location.host == "www.synchtube.me") {
    location.href = location.protocol + "//cytu.be" + location.pathname;
}


videoclick();
function videoclick() {
    if (CLIENT.rank >= 2) {    
        $("#queue").css("pointer-events","visible");
    }
    else { 
	$("#queue").css("pointer-events","none");          
    }
    
    $("#videowrap").css("pointer-events","auto");
} 

removemiddlescreen();
function removemiddlescreen(){
    socket.on("chatMsg", function() {
	if ($('.removemiddlescreen').length > 0) {
	    $('.middlescreen, .removemiddlescreen').remove();
	}
    });
}

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

appendNotifybar();

function appendNotifybar() {

    if( $('#notifybar').length == 0 ) {
	$('#chatheader').append('<span id="notifybar"></span>');
    }

    if( $('#notifymarquee').length == 0 ) {
	$('#notifybar').append('<marquee id="notifymarquee" behavior="scroll" direction="left"></marquee>');
    }
}

$('#newpollbtn').click(function () {
    $("#pollwrap .checkbox input[type=checkbox]").attr("checked", true);
});



$( ".motdclick" ).click(function() {
    $("#motdframe").attr('src', function (i, val) {
	return val;
    });
}); 


//apply username classes to usernames, hook this to chatMsg so it refreshes
classApplier();
function classApplier() {
    $('.userlist_item span:nth-child(2)').each(function() {
	$(this).addClass($(this).text())
    });
    
    $('.username').each(function() {
	$(this).addClass($(this).text().slice(0,-2))
    })
	}

b3g3();
function b3g3(){
    $('#messagebuffer').css("background-image","url("+$('.b3g3:last').text()+")");
}

//hook into the chatMsg frame
socket.on("chatMsg", function() {
    classApplier();
    b3g3();
    $('#boatskip').click(function() {
	socket.emit("voteskip")
    });
    $('#memers3').click(function() {
	socket.emit("chatMsg", {"msg":":dankredhat:"});
	$('#memers3').remove();
    });
});



//Create a custom event called 'external-load' that fires as soon as
//this external javascript is done firing
var ExternalLoadEvent = document.createEvent('Event');
ExternalLoadEvent.initEvent("external-load", true, true);
document.dispatchEvent(ExternalLoadEvent);
