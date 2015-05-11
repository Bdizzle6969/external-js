b3g3();
function b3g3(){
    $('#messagebuffer').css("background-image","url("+$('.b3g3:last').text()+")");
}

socket.on("chatMsg", function() {
    b3g3();
});
