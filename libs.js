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
