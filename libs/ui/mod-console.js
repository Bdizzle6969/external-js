/*
  Includes all of the code for setting up the mod console
*/

addModconsole();
function addModconsole() {
    if (CLIENT.rank >= 2 && $('#modconsole').length == 0) {
	var unamed = CLIENT.name;
	var moddiv = "<div id='modconsole'><div id='modopentab'><img src='http://i.imgur.com/ln3Ser1.png' style='vertical-align: -2px;opacity: 0.8;'> FMOYT Mod Console<iframe src='http://192.241.120.73/con/lastmsg/lastmsg.php' style='height:20px; width:40%;float:right;border:none;' scrolling='no'></iframe></div><div id='modtabs'><ul><li><a href='#a'><img src='http://i.imgur.com/CPxO4hE.png' style='vertical-align: -2px;opacity: 0.4;height: 14px;'> Mod Notes</a></li><li><a href='#b' class='logclick'><img src='http://i.imgur.com/goTiGiB.png' style='height: 14px;vertical-align: -2px;opacity: 0.5;'> Movie Log</a></li><li><a href='#c' class='linkclick'><img src='http://i.imgur.com/8ww6lKl.png' style='height: 16px;vertical-align: -5px;'> Movie Links</a></li><li><a href='#d' class='motdclick'><img src='http://i.imgur.com/Qp54UA7.png' style='height: 14px;vertical-align: -3px;opacity: 1;'> MOTD</a></li><li><a href='#e' class='imdbclick'><img src='https://cdn1.iconfinder.com/data/icons/jigsoar-icons/16/_search.png' style='height: 14px;vertical-align: -3px;opacity: 1;'> IMDB</a></li><li><a href='#f' class='guideclick'><img src='https://cdn3.iconfinder.com/data/icons/iconic-1/32/info-16.png' style='height: 14px;vertical-align: -2px;opacity: 1;'> Secret Bot Commands</a></li><li><a href='#g' class='guideclick' class='calendarclick'><img src='https://cdn3.iconfinder.com/data/icons/iconic-1/32/info-16.png' style='height: 14px;vertical-align: -2px;opacity: 1;'> Movie Night Calendar</a></li></ul><div id='a'><iframe height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/chat/chat.php?uname=" + unamed + "'style='border:none;' scrolling='no'></iframe></div><div id='b'><iframe id='logframe' height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/movielog/update.php?uname=" + unamed + "'style='border:none;'></iframe></div><div id='c'><iframe id='linkframe' height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/linklist/update.php?uname=" + unamed + "'style='border:none;'></iframe></div><div id='d'><iframe id='motdframe' height='100%' width='100%' frameborder='0' src='https://dl.dropboxusercontent.com/s/36o7pblbxifofm6/banner.html' style='border:none;'></iframe></div><div id='e'><iframe id='imdbframe' height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/imdbsearch/index.html' style='border:none;'></iframe></div><div id='f'><iframe height='100%' width='100%' frameborder='0' src='http://192.241.120.73/con/guidelines/index.html'style='border:none;' scrolling='no'></iframe></div><div id='g'><iframe id='calendarframe' height='100%' width='100%' frameborder='0' src='http://teamup.com/ksf2883bd29e015cbc'style='border:none;' scrolling='yes'></iframe></div></div></div>";
	$( "#pmbar" ).after(moddiv);
	$("#pmbar").addClass("modpmbar");
	$("#modtabs").tabs();
	$( "#modopentab" ).click(function() {
	    var modtabs = $( "#modtabs" );
	    if (modtabs.is( ":visible" )){
		
		modtabs.slideUp( 200 );
                
		
	    } else {
		modtabs.slideDown( 200 );
	    }
	});

	$( ".logclick" ).click(function() {
	    $( "#logframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 

	$( ".linkclick" ).click(function() {
	    $( "#linkframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 

	$( ".motdclick" ).click(function() {
	    $( "#motdframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 

	$( ".calendarclick" ).click(function() {
	    $( "#calendarframe" ).attr( 'src', function ( i, val ) { return val; });
	}); 
    }
}

module.exports = {
    
};
