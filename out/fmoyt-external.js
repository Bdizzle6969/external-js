(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Text Effect Libraries
$.getScript("http://jschr.github.io/textillate/jquery.textillate.js");
$.getScript("http://www.crayola.com/application/javascript/libraries/jquery.lettering-0.6.1.min.js");

//Text HTML Manipulation Library
$.getScript("http://benzap.github.io/DOM.Barf/DOM.Barf.js");

//Random Includes
//TODO: Cleanup
require("./libs/embed-utils.js");
require("./libs/misc.js");

//
//UI Modifications
//
require("./libs/ui/mod-console.js");
require("./libs/ui/trivia-toggle.js");

//Miscellaneous UI Handlers
// - NotifyBar
require("./libs/ui/misc-ui.js");


var ChatHandler = require("./libs/utils/chat.js").ChatHandler;
//
//Chat Handlers
//
var DrinkFlair = require("./libs/chat_handlers/drink-flair.js");
require("./libs/chat_handlers/audio-speakz.js");
require("./libs/chat_handlers/hover-sound.js");
require("./libs/chat_handlers/boatskip.js");
require("./libs/chat_handlers/background-changer.js");
require("./libs/chat_handlers/nick-class-applier.js");

//Miscellaneous Handlers
// - VideoClick Playlist
// - Middlescreen Removal
require("./libs/chat_handlers/misc-handlers.js");


/**** Initialization and Global Variables ****/
FMOYT = {};
DOM = require("./libs/DOM.Barf.js").DOM;

//Chat Handler Initialization
FMOYT.chatHandler = new ChatHandler();
FMOYT.chatHandler.init();

//Handlers
FMOYT.chatHandler.add("drink-flair", DrinkFlair.handler);


//Redirect synchtube.me users to the new cytu.be site
if (location.host == "synchtube.me" || location.host == "www.synchtube.me") {
    location.href = location.protocol + "//cytu.be" + location.pathname;
}

//Create a custom event called 'external-load' that fires as soon as
//this external javascript is done firing
var ExternalLoadEvent = document.createEvent('Event');
ExternalLoadEvent.initEvent("external-load", true, true);
document.dispatchEvent(ExternalLoadEvent);

},{"./libs/DOM.Barf.js":2,"./libs/chat_handlers/audio-speakz.js":3,"./libs/chat_handlers/background-changer.js":4,"./libs/chat_handlers/boatskip.js":5,"./libs/chat_handlers/drink-flair.js":6,"./libs/chat_handlers/hover-sound.js":7,"./libs/chat_handlers/misc-handlers.js":8,"./libs/chat_handlers/nick-class-applier.js":9,"./libs/embed-utils.js":10,"./libs/misc.js":11,"./libs/ui/misc-ui.js":12,"./libs/ui/mod-console.js":13,"./libs/ui/trivia-toggle.js":14,"./libs/utils/chat.js":15}],2:[function(require,module,exports){
/*
  Despite the name, this is a useful and straightforward library for
  generating a string representation from a composition of Barf functions

  Example:

  var _s = DOM.Barf;

  //Standard barf, without shortcuts
  var output = _s.SpitOut("div", {}, [
    _s.SpitOut("a", {href: "http://www.example.com"}, [
          _s.SpitOut("p", {style: {fontSize: "12px"}}, [
            "Hello World!"
          ])
    ])
  ]);
  console.log(output);

  //example with shortcuts
  var output = _s.div({}, [
    _s.a({href: "http://www.example.com"}, [
          _s.p({style: {fontSize: "12px"}}, [
            "Hello World!"
          ]),
          _s.p({}, "More hellos!"),
    ])
  ]);
  console.log(output);

  //Example of injecting a style sheet into the head

  document.head.innerHTML += _s.style(null, [
    ToCss("body", {
      backgroundColor: "#1d1d1d",
      position: "relative",
      width: "100%",
      height: "100%",
    })
  ])

  Dependencies:

  - es5shim (IE9+ support)
  - console shims

*/

var DOM = DOM || {};
DOM.Barf = DOM.Barf || {};

(function(context) {
    context.VERSION = "0.2.1";
    
    /*
      This is the raw input method to barf / spit out a string
      representation of XML. This forms the representation: 
      <tagName {parseTagAttributes()}>{parseTagChildren()}</tagName>

      Keyword Arguments:

      tagName -- the tag of our XML element
      
      tagAttributes -- a dictionary listing of XML attributes for the current tag

      tagChildren -- a list of other DOM.Barf functions which are
      concatenated to fill this current DOM string.

      Optional Arguments:

      bSingular -- whether the given XML element is singular. Namely,
      it has a forward flash, and no children. ex. meta tags --> <meta /> 
      [default: false]

      bConvertCamelCase -- determines whether attributes, and listed
      attribute style's names are converted from camelcase is
      converted to the equivalent dash-named, which is common in html
      attributes. ex. EquivHtmlTerm --> equiv-html-term.
      [default: true]

    */
    context.SpitOut = function(tagName, tagAttributes, tagChildren, options) {
        //defaults for tag attributes
        if (tagAttributes === undefined || tagAttributes === null) {
            tagAttributes = {};
        }
        else if (typeof tagAttributes !== "object") {
            console.warn("tag attributes does not form a dictionary: ", tagAttributes);
            console.warn("removing attributes");
            tagAttributes = {};
        }
        
        //defaults for tag children
        if (tagChildren === undefined || tagChildren === null) {
            tagChildren = "";
        }
        else if (typeof tagChildren !== "object" && typeof tagChildren !== "string") {
            console.warn("tag children must be a list object: ", tagChildren);
            console.warn("removing children");
            tagChildren = "";
        }
        
        if (options === undefined) {
            options = {};
        }

	//determines if we treat the current element as a singular element.
	//this means we ignore the children, and put a forwards slash
	//example meta tags --> <meta />
	options.bConvertCamelCase = (options.bConvertCamelCase !== undefined) ? (options.bConvertCamelCase) : true;
	options.bSingular = (options.bSingular !== undefined) ? (options.bSingular) : false;
	
        var attributesString = parseTagAttributes(tagAttributes, options);
        var childrenString = parseTagChildren(tagChildren, options);

	if (options.bSingular) {
	    var startingTag = "<" + tagName + attributesString + ">";
	    return startingTag;
	}
	else {
	    var startingTag = "<" + tagName + attributesString + ">";
	    var endingTag = "</" + tagName + ">";
            return  startingTag + childrenString + endingTag;
	}
    }
    
    /*
      
     */
    var parseTagAttributes = function(attrs, options) {
        var outputString = "";
        for (var key in attrs) {
            if (!attrs.hasOwnProperty(key)) continue;
            
            var value = attrs[key];
            //if the value is a string, just concatenate
            if (typeof value === "string") {
		key = (options.bConvertCamelCase) ? convertCamelCaseToDashed(key) : key;
                outputString += " " + key + "=" + "\"" + value + "\"";
                continue;
            }
            //we treat an object as a css separated set of values for convenience
            else if (typeof value === "object") {
                cssOutput = parseCssOutput(value, options);
                outputString += " " + key + "=" + "\"" + cssOutput + "\"";
		continue;
            }
	    else if (value === null) {
		outputString += " " + key;
	    }
	    
        }
        
        return outputString;
    }

    var parseCssOutput = function(attrs, options) {
        var cssOutput = "";
        for (var cssKey in attrs) {
            if (!attrs.hasOwnProperty(cssKey)) continue;
            
            var cssValue = attrs[cssKey];
	    cssKey = (options.bConvertCamelCase) ? convertCamelCaseToDashed(cssKey) : cssKey;
            cssOutput += cssKey + ":" + cssValue + ";";
        }
        return cssOutput;
    }
    
    var parseTagChildren = function(children, options) {
        if (typeof children === "string") {
            return children;
        }
	
        //concatenate the children, assuming they're children
        return children.reduce(function(a,b) {
            return a + b;
        }, "");
    }

    var convertCamelCaseToDashed = function(s) {
        return s.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    var toSpit = function(tag, passedOptions) {
	passedOptions = passedOptions || {};
        return function(attrs, children, options) {
	    options = options || {};
	    for (key in passedOptions) {
		if (!passedOptions.hasOwnProperty(key)) continue;
		if (!options.hasOwnProperty(key)) {
		    options[key] = passedOptions[key];
		}
	    }
            return context.SpitOut(tag, attrs, children, options);
        };
    }
    context.toSpit = toSpit;
    
    /* bunch of DOM shortcut functions */
    context.html = toSpit("html");
    context.head = toSpit("head");
    context.title = toSpit("title");
    context.body = toSpit("body");
    context.div = toSpit("div");
    context.h1 = toSpit("h1");
    context.h2 = toSpit("h2");
    context.h3 = toSpit("h3");
    context.h4 = toSpit("h4");
    context.h5 = toSpit("h5");
    context.img = toSpit("img", {bSingular:true});
    context.a = toSpit("a");
    context.b = toSpit("b");
    context.span = toSpit("span");
    context.p = toSpit("p");
    context.input = toSpit("input");
    context.button = toSpit("button");
    context.table = toSpit("table");
    context.tr = toSpit("tr");
    context.td = toSpit("td");
    context.li = toSpit("li");
    context.ul = toSpit("ul");
    context.style = toSpit("style");
    context.script = toSpit("script");
    context.meta = toSpit("meta", {bSingular:true});

    /* Small Function for performing the stylesheet output */
    context.ToCss = function(name, attrs) {
	var options = { bConvertCamelCase: true };
        return name + " {" + parseCssOutput(attrs, options) + "} ";
    }

    /*
      simply concatenates the list of children
     */
    context.ToRaw = function(children) {
	return parseTagChildren(children);
    }

    /*
      Merges the object attributes from b into a
     */
    context.Merge = function(a, b) {
        for (key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof a[key] == "object" && typeof b[key] == "object") {
                    a[key] = context.Merge(a[key], b[key]);
                }
                else {
                    a[key] = b[key];
                }
            }
        }
	return a;
    }

    context.ToDOMNode = function(s) {
	var wrapper = document.createElement("div");
	wrapper.innerHTML = s;
	return wrapper.firstChild;
    }
    
})(DOM.Barf);

module.exports = {
    DOM: DOM
};

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){
b3g3();
function b3g3(){
    $('#messagebuffer').css("background-image","url("+$('.b3g3:last').text()+")");
}

socket.on("chatMsg", function() {
    b3g3();
});

},{}],5:[function(require,module,exports){


socket.on("chatMsg", function() {
    $('#boatskip').click(function() {
	socket.emit("voteskip")
    });
});

module.exports = {

};

},{}],6:[function(require,module,exports){
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
	var msg = data.msg || "";

	//more specific case when using /drink. This corrects it to act like /d
	var re_drink = /^(rink|drink) (.*)$/
	if (msg.match(re_drink)) {
	    var m = msg.match(re_drink);

	    msg = m[2];
	}

	var spanText = div.querySelectorAll("span")[2];
	spanText.innerHTML = msg;

	//apply to header
	var drinkBar = document.querySelector("#drinkcount");
	var innerContent = _s.ToRaw([
	    _s.span({"class": "drink"}, [
		__drinkCount.toString() + " 🍺 ",
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

},{"../DOM.Barf.js":2}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){

//Prevent Users from clicking on video URLs in the playlist
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

//Remove some middle screen thing... IDK
removemiddlescreen();
function removemiddlescreen(){
    socket.on("chatMsg", function() {
	if ($('.removemiddlescreen').length > 0) {
	    $('.middlescreen, .removemiddlescreen').remove();
	}
    });
}

socket.on("chatMsg", function() {
    $('#memers3').click(function() {
	socket.emit("chatMsg", {"msg":":dankredhat:"});
	$('#memers3').remove();
    });
});


module.exports = {
    
};

},{}],9:[function(require,module,exports){
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

//hook into the chatMsg frame
socket.on("chatMsg", function() {
    classApplier();
});

module.exports = {

};

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
//Adds Notify Bar area for scrolling text
appendNotifybar();
function appendNotifybar() {
    if( $('#notifybar').length == 0 ) {
	$('#chatheader').append('<span id="notifybar"></span>');
    }

    if( $('#notifymarquee').length == 0 ) {
	$('#notifybar').append('<marquee id="notifymarquee" behavior="scroll" direction="left"></marquee>');
    }
}

//IDK what this does...
$('#newpollbtn').click(function () {
    $("#pollwrap .checkbox input[type=checkbox]").attr("checked", true);
});

module.exports = {

};

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
/*
  Includes a set of utility functions for manipulating and handling
  chat
*/

//Maintain a reference to the old chat handler
var _oldChatHandler = Callbacks.chatMsg;

var ChatHandler = function(options) {
    this.handlers = [];
}

/*
  ChatHandler wraps the main socket.on("chatMsg", ...) callback so
  that there is finer control over chat messages being placed in the
  message buffer.
 */
ChatHandler.prototype.init = function(options) {
    //Replacing old chat handler with a modified one, so we can grab
    //the latest dom element with full assurance
    Callbacks.chatMsg = function(data) {
	_oldChatHandler(data);

	//grab the latest element placed on the message buffer
	var messageBuffer = document.getElementById("messagebuffer");
	var divChatList = messageBuffer.querySelectorAll("div")
	var divChat = divChatList[divChatList.length-1];

	//place the div in the data
	data.div = divChat;
	
	//only call stuff on enabled handlers
	var enabledHandlers = this.handlers.filter(function(handler) {
	    return handler.enabled;
	});
	
	enabledHandlers.forEach(function(handler) {
	    handler.func(data);
	});
    }.bind(this);
}

/*
  Add a handler to the list of chat handlers

  Keyword Arguments:
  
  handlerName -- The name you wish to give the chat handler.

  handlerFunction -- a function of the form function(data), where data
  is an object containing the key-values:

    div - the div object for this particular chat message
    meta - contains the key-val 'modflair', which is a users rank
    msg - the text message contained in the chat message
    time - time at which the chat message was made
    username - the user who made the chat message

  Optional Arguments:

  bEnabled -- if set to false, will add the handler and disable it
  [default: true]

  Remarks: 

  - Handlers are stored in a list so you can maintain order
  
  Gotchas:

  - removing the div from the dom while several handlers are
    manipulating the dom could lead to some strange results.
*/
ChatHandler.prototype.add = function(handlerName, handlerFunction, options) {
    var options = options || {};
    var bEnabled = (options.bEnabled == false) ? false : true;
    
    this.handlers.push({
	name: handlerName,
	func: handlerFunction,
	enabled: true,
    });
}

/*
  Removes all handlers by the given name
 */
ChatHandler.prototype.removeByName = function(handlerName) {
    this.handlers = this.handlers.filter(function(handler) {
	return handler.name !== handlerName;
    });
}

/*
  Enable a handler, so it will be executed on the 'chatMsg' 
*/
ChatHandler.prototype.enable = function(handlerName) {
    this.handlers.forEach(function(handler) {
	if (handlerName == handler.name) {
	    handler.enabled = true;
	}
    });
}

/*
  Disable a handler, so it will be executed on the 'chatMsg'
*/
ChatHandler.prototype.disable = function(handlerName) {
    this.handlers.forEach(function(handler) {
	if (handlerName == handler.name) {
	    handler.enabled = false;
	}
    });
}

module.exports = {
    ChatHandler: ChatHandler,
}

},{}]},{},[1])


//# sourceMappingURL=fmoyt-external.js.map