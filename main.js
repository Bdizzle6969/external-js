//Text Effect Libraries
$.getScript("http://jschr.github.io/textillate/jquery.textillate.js");
$.getScript("http://www.crayola.com/application/javascript/libraries/jquery.lettering-0.6.1.min.js");

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


//
//Chat Handlers
//
var ChatHandler = require("./libs/utils/chat.js").ChatHandler;
require("./libs/chat_handlers/drink-flair.js");
require("./libs/chat_handlers/audio-speakz.js");
require("./libs/chat_handlers/hover-sound.js");
require("./libs/chat_handlers/boatskip.js");
require("./libs/chat_handlers/background-changer.js");
require("./libs/chat_handlers/nick-class-applier.js");

//Miscellaneous Handlers
// - VideoClick Playlist
// - Middlescreen Removal
require("./libs/chat_handlers/misc-handlers.js");

/* Intialization */
FMOYT = {};

//Chat Handler Initialization
FMOYT.chatHandler = new ChatHandler();
FMOYT.chatHandler.init();
FMOYT.chatHandler.add("echo", function(data) {
    console.log("data", data);
});


//Redirect synchtube.me users to the new cytu.be site
if (location.host == "synchtube.me" || location.host == "www.synchtube.me") {
    location.href = location.protocol + "//cytu.be" + location.pathname;
}

//Create a custom event called 'external-load' that fires as soon as
//this external javascript is done firing
var ExternalLoadEvent = document.createEvent('Event');
ExternalLoadEvent.initEvent("external-load", true, true);
document.dispatchEvent(ExternalLoadEvent);
