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
