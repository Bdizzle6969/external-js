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
