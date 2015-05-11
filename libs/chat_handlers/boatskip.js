

socket.on("chatMsg", function() {
    $('#boatskip').click(function() {
	socket.emit("voteskip")
    });
});

module.exports = {

};
