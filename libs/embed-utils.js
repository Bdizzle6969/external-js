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
