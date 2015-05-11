
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
