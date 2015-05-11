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
