(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./libs/chat_handlers/audio-speakz.js":2,"./libs/chat_handlers/drink-flair.js":3,"./libs/embed-utils.js":4,"./libs/misc.js":5,"./libs/ui/mod-console.js":6,"./libs/ui/trivia-toggle.js":7}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){
function parse_VideoEmbeds() {
    $("img.webm").each(function(index) {
        var img2vid = this;
        var newElement = $("<video>")
	    .attr("preload", "")
	    .attr("controls", "")
	    .attr("muted", "")
	    .attr("webkit-playsinline", "")
	    .text("Your browser does not support the video tag.");
	
        var source = $(this).attr("src");
        if ($(this).hasClass("imgur")) {
            $(this).removeAttr("src");
            source = source.split(".").reverse().splice(1).reverse().join(".");
            newElement.append('<source src="' + source + ".mp4" + '" type="video/mp4">')
		.append('<source src="' + source + ".webm" + '" type="video/webm">')
        }
	
        if (typeof $(this).attr("data-autoplay") == "string") {
            newElement.attr("autoplay");
            newElement[0].autoplay = true;
            $(this).removeAttr("data-autoplay")
        }
	
        if (typeof $(this).attr("data-loop") == "string") {
            newElement.attr("loop");
            newElement[0].loop = true;
            $(this).removeAttr("data-loop")
        }
	
        attrs = null;
        $.each(this.attributes, function(index) {
            $(newElement).attr(img2vid.attributes[index].name, img2vid.attributes[index].value)
        });
        $(this).after(newElement).remove()
    })
}

function parse_SoundEmbeds(args) {
    $(".sound-embed:not(.parsed)").each(function(index) {
        var self = $(this);
        var path = self.attr("data-path");
        var proto = self.attr("data-proto");
        self.addClass("parsed").append($("<audio>").append($("<source>").attr("src", proto + path).attr("type", "audio/mpeg")).prop("volume", .4).on("play", function() {
            $(this).siblings("button").addClass("btn-success").removeClass("btn-default btn-warning").html('<span class="glyphicon glyphicon-pause"></span>').attr("title", "Click to pause")
        }).on("pause", function() {
            $(this).siblings("button").addClass("btn-warning").removeClass("btn-default btn-success").html('<span class="glyphicon glyphicon-play"></span>').attr("title", "Click to resume")
        }).on("ended", function() {
            $(this).siblings("button").addClass("btn-default").removeClass("btn-success btn-warning").html('<span class="glyphicon glyphicon-play"></span>').attr("title", "Click to play")
        })).append($("<button>").addClass("btn btn-sm btn-default playsound").attr("title", "Click to play").html('<span class="glyphicon glyphicon-play"></span>').on("click", function() {
            var sound = $(this).siblings("audio")[0];
            if (sound.paused) {
                sound.play()
            } else {
                sound.pause()
            }
        })).show();
        if (self.hasClass("autoplay")) {
            self.children("audio").attr("autoplay", true)
        }
    })
}
if (!CHANNEL.mediaListeners) {
    CHANNEL.mediaListeners = socket.on("chatMsg", function() {
        parse_SoundEmbeds();
        parse_VideoEmbeds()
    });
    parse_SoundEmbeds();
    parse_VideoEmbeds()
}

module.exports = {

}

},{}],5:[function(require,module,exports){
$(".navbar-brand").text("Full Movies");

var movieLengthSeconds = 6545; //length of the movie in seconds
var startTime = 1379961181053; //paste the time you get from the time now button

if (document.getElementById("countdown")) {
    var element = document.getElementById("countdown");
    element.parentNode.removeChild(element);
    element = document.getElementById("timebutton");
    element.parentNode.removeChild(element);
}

var countdown = $("<div/>")
    .addClass("hasCountdown")
    .attr("id", "countdown")
    .appendTo("#videowrap");

var getTimeButton = $("<button/>").attr("id", "timebutton")
    .addClass("btn btn-small")
    .click(function () {
        alert(new Date().getTime() + 10000);
    })
    .text("Get system time")
    .appendTo("#qualitywrap");

hideStuff();
function hideStuff() {
    socket.on("channelOpts", function() {
	if (CLIENT.rank >= 2) {
            $("#librarytoggle").css("display","inherit");
            getTimeButton.css("display","inline");
	}
	else { 
	    $(".qe_title").contents().unwrap();
	    $("A.qe_title").contents().unwrap();
	    $("#librarytoggle").css("display","none");
	    getTimeButton.css("display", "none");
	}
    });
}

var endTime = startTime + (movieLengthSeconds * 1000);

var t = setInterval(timer, 1000);
function timer() {
    if (movieLengthSeconds <= 0 || new Date().getTime() >= endTime) {
        clearInterval(t);
        countdown.text("Not set");
        return;
    }
    time = new Date();
    var timeNow = time.getTime();
    var newTime = Math.abs(Math.round((startTime - timeNow) / 1000));
    movieLengthSeconds = newTime - 1;
    var hours = Math.floor(newTime / 3600);
    var minutes = Math.floor(newTime / 60);
    var seconds = newTime - minutes * 60;
    if (movieLengthSeconds >= 3600) {
        var minusHours = newTime - hours * 3600;
        minutes = Math.floor(minusHours / 60);
        seconds = minusHours - minutes * 60;
        countdown.text("Current time: " + hours + " hours " + minutes +" minutes " + seconds + " seconds");
    }
    else if (movieLengthSeconds >= 60) {
        countdown.text("Current time: " + minutes + " minutes  " + seconds + " seconds");
    }
    else {
        countdown.text("Current time: " + movieLengthSeconds + " seconds");
    }
}


(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
	(i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a,m)
})(window,document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-39666007-2', 'cytu.be');
ga('send', 'pageview');


addWallet();
function addWallet() {
    if ($('.perdclick').length == 0) { // if element not there, bitch
        var objTo = document.getElementById('leftcontrols')
        var modspan = document.createElement("span");
        var uname = CLIENT.name;
        modspan.innerHTML = "<a href='#openModal' class='perdclick btn btn-sm btn-default'>Leaderboard</a><div id='openModal' class='modalDialog'><div> <a href='#_' class='perdclose'></a> <iframe id='perdframe' src='http://192.241.120.73/perdcoins/perdcoins.php?uname=" + uname + "' width='349' height='508' scrolling='no' resizeable='0' frameborder='0' ></iframe><img class='perd' src='http://i.imgur.com/n1DGiyL.png' alt='' width='120' height='120'><img class='perd2' src='http://i.imgur.com/n1DGiyL.png' alt='' width='120' height='120'></div></div>"
        objTo.appendChild(modspan);
    }
}  

$(".perdclick").click(function() {
    $('#perdframe').attr('src', function (i, val) {
	return val;
    });
});

//wzrd I changed this to do opposite because it was F'ing up  
displayShowSearch();
function displayShowSearch() {
    socket.on("channelOpts", function() {
	if (CLIENT.rank < 2) {    
	    $("#showsearch").hide();
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

function webmVideo() {
    var widgetHTML = $('span.vid').text();
    $('span.vid').html('<video src="'+widgetHTML+'" controls></video>');
    $('span.vid').addClass('convertedvid').removeClass('vid');
}

dizzflair();
function dizzflair() {
    socket.on("chatMsg", function() {
	sucko();
	webmVideo();
	$('.channel-emote').prop('title', '');
	$('.userlist_owner:contains("wzrd")').addClass('wizz');
	$('.username:contains("wzrd")').addClass('wizz');
	$('.imp').parent().parent().find('.wizz').remove();
	$('.username:contains("blankoid")').remove();
	$('.userlist_owner:contains("csagan")').addClass('csagan');
	$('.username:contains("csagan")').addClass('csagan');
	$('.userlist_op:contains("mikmik")').addClass('mikmik');
	$('.username:contains("mikmik")').addClass('mikmik');	
    });
}

// Close Drink Start

$(document).ready(function(){
    $('#drinkbar').prepend('<button id="drinkclosebtn">X</button>');
});

//
var button = document.getElementById('drinkclosebtn');
button.onclick = function() {
    var div = document.getElementById('drinkbarwrap');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
};

// Close Drink End

module.exports = {
    
};

},{}],6:[function(require,module,exports){
/*
  Includes all of the code for setting up the mod console
*/

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

module.exports = {
    
};

},{}],7:[function(require,module,exports){
/*
  Trivia Toggle Button
 */

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

},{}]},{},[1])


//# sourceMappingURL=fmoyt-external.js.map