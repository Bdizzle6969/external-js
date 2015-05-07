//Text Effect Libraries
$.getScript("http://jschr.github.io/textillate/jquery.textillate.js");
$.getScript("http://www.crayola.com/application/javascript/libraries/jquery.lettering-0.6.1.min.js");

//Additional Includes
$.getScript("http://fmoyt.github.io/external-js/parseEmbeds.js");
//$.getScript("http://fmoyt.github.io/external-js/libs.js");
require("./libs.js");

addModconsole();
function addModconsole() {
    if (CLIENT.rank >= 2 && $('#modconsole').length == 0) {
	var unamed = CLIENT.name;
	var moddiv = "<div id='modconsole'><div id='modopentab'><img src='http://i.imgur.com/ln3Ser1.png' style='vertical-align: -2px;opacity: 0.8;'> FMOYT Mod Console<iframe src='http://192.241.120.73/con/lastmsg/lastmsg.php' style='height:20px; width:40%;float:right;border:none;' scrolling='no'></iframe></div><div id='modtabs'><ul><li><a href='#a'><img src='http://i.imgur.com/CPxO4hE.png' style='vertical-align: -2px;opacity: 0.4;height: 14px;'> Mod Notes</a></li><li><a href='#b' class='logclick'><img src='http://i.imgur.com/goTiGiB.png' style='height: 14px;vertical-align: -2px;opacity: 0.5;'> Movie Log</a></li><li><a href='#c' class='linkclick'><img src='http://i.imgur.com/8ww6lKl.png' style='height: 16px;vertical-align: -5px;'> Movie Links</a></li><li><a href='#d' class='motdclick'><img src='http://i.imgur.com/Qp54UA7.png' style='height: 14px;vertical-align: -3px;opacity: 1;'> MOTD</a></li><li><a href='#e' class='imdbclick'><img src='https://cdn1.iconfinder.com/data/icons/jigsoar-icons/16/_search.png' style='height: 14px;vertical-align: -3px;opacity: 1;'> IMDB</a></li><li><a href='#f' class='guideclick'><img src='https://cdn3.iconfinder.com/data/icons/iconic-1/32/info-16.png' style='height: 14px;vertical-align: -2px;opacity: 1;'> Secret Bot Commands</a></li><li><a href='#g' class='guideclick' class='calendarclick'><img src='https://cdn3.iconfinder.com/data/icons/iconic-1/32/info-16.png' style='height: 14px;vertical-align: -2px;opacity: 1;'> Movie Night Calendar</a></li></ul><div id='a'><iframe height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/chat/chat.php?uname=" + unamed + "'style='border:none;' scrolling='no'></iframe></div><div id='b'><iframe id='logframe' height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/movielog/update.php?uname=" + unamed + "'style='border:none;'></iframe></div><div id='c'><iframe id='linkframe' height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/linklist/update.php?uname=" + unamed + "'style='border:none;'></iframe></div><div id='d'><iframe id='motdframe' height='100%' width='100%' frameborder='0' src='https://dl.dropboxusercontent.com/s/36o7pblbxifofm6/banner.html' style='border:none;'></iframe></div><div id='e'><iframe id='imdbframe' height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/imdbsearch/index.html' style='border:none;'></iframe></div><div id='f'><iframe height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/guidelines/index.html'style='border:none;' scrolling='no'></iframe></div><div id='g'><iframe id='calendarframe' height='100%' width='100%' frameborder='0' src='http://teamup.com/ksf2883bd29e015cbc'style='border:none;' scrolling='yes'></iframe></div></div></div>";
	$( "#pmbar" ).after(moddiv);
	$("#pmbar").addClass("modpmbar");
	$("#modtabs").tabs();
	$( "#modopentab" ).click(function() {
	    var modtabs = $( "#modtabs" );
	    if (modtabs.is( ":visible" )){
		
		modtabs.slideUp( 200 );
                
		
	    } else {
		modtabs.slideDown( 200 );
	    }
	});

	$( ".logclick" ).click(function() {
	    $( "#logframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 

	$( ".linkclick" ).click(function() {
	    $( "#linkframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 

	$( ".motdclick" ).click(function() {
	    $( "#motdframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 

	$( ".calendarclick" ).click(function() {
	    $( "#calendarframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 
    }
}  

function videoclick() {
    if (CLIENT.rank >= 2) {    
        $("#queue").css("pointer-events","visible");   
    }
    else { 
	$("#queue").css("pointer-events","none");             
    }
    
    $("#videowrap").css("pointer-events","auto");      
} 

videoclick();

HideShadowMute();
function HideShadowMute() {
    var objTo = document.getElementById('leftcontrols')
    var modspan = document.createElement("span");
    modspan.innerHTML = "<button id='trivtog' class='btn btn-sm btn-default'>  Trivia/Jumble: On</button>"
    objTo.appendChild(modspan);
}


$("#trivtog").click((function() {
    var interId = null;
    var $ul = $("#timet ul");
    return function(e) {
        if (interId) {
            $(this).text("Trivia/Jumble: On");
            clearInterval(interId);
            interId = null;
	    $(".hiddenbotchat").attr('class', 'shownbotchat');
        }
	else {
            $(this).text("Trivia/Jumble: Off");
            interId = setInterval(function() {
		$('.botchat').parent().parent('div').attr('class', 'hiddenbotchat');
            }, 1);        
        }
    };
}()));

drinkflair();
function drinkflair(){
    socket.on("drinkCount", function() {
	setTimeout(function() {
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


if (location.host == "synchtube.me" || location.host == "www.synchtube.me") {
    location.href = location.protocol + "//cytu.be" + location.pathname;
}


removemiddlescreen();
function removemiddlescreen(){
    socket.on("chatMsg", function() {
	if ($('.removemiddlescreen').length > 0) {
	    $('.middlescreen, .removemiddlescreen').remove();
	}
    });
}

function sucko() {
    var fek = $('.b3g3:last').text();
    if (fek.length > 1) {
	fek2 = "url('" + fek +"')";
    }
    else {
	fek2 = "none"
    }
    $("#messagebuffer").css("background-image",fek2);
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

function webmVideo() {
    var widgetHTML = $('span.vid').text();
    $('span.vid').html('<video src="'+widgetHTML+'" controls></video>');
    $('span.vid').addClass('convertedvid').removeClass('vid');
}

$('#newpollbtn').click(function () {
    $("#pollwrap .checkbox input[type=checkbox]").prop("checked", true);
});

$(document).ready(function() {
    videoclick();
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
});

$( ".motdclick" ).click(function() {
    $("#motdframe").attr('src', function (i, val) {
	return val;
    });
}); 


//Cleaned here too. Note that Mod console will not load when added in external.

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
    speakz2();
    $('#boatskip').click(function() {
	socket.emit("voteskip")
    });
    $('#memers3').click(function() {
	socket.emit("chatMsg", {"msg":":dankredhat:"});
	$('#memers3').remove();
    });
});

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

//Create a custom event called 'external-load' that fires as soon as
//the external javascript is done firing
var ExternalLoadEvent = document.createEvent('Event');
ExternalLoadEvent.initEvent("external-load", true, true);
document.dispatchEvent(ExternalLoadEvent);
