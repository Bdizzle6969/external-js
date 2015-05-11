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

module.exports = {

};
