/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

var isAndroid = false;

//create tab group
var tabGroup = Titanium.UI.createTabGroup({

});
//Is this Android?

if (Titanium.Platform.name == 'android') {
	isAndroid = true;
	Ti.API.info('Is this cheese?');
}

//create Main Menu UI

//Check for internet connection
if (!Ti.Network.online) {
	var networkError = Titanium.UI.createAlertDialog({
		title: 'Knight Finder',
		message: 'You must have a WiFi or Celluar Network Connection to use this application'

	});
	networkError.show();
} else {

	if (isAndroid == true) {
		Ti.API.info('Is this cheese? Yeeeeees');
		var findNearestVenue = Titanium.UI.createWindow ({
			url:'main_windows/kfAndroid.js'

		});
	} else {
		var findNearestVenue = Titanium.UI.createWindow ({
			url:'main_windows/kfList.js'

		});
		var summaryWin = Titanium.UI.createWindow ({
			url:'main_windows/kfFeaturedandVouchers.js'

		});
	}

	var tab2 = Titanium.UI.createTab({
		title:'Knight Finder',
		window:findNearestVenue,
		icon:'images/74-location.png'
	});
	
		var tab1 = Titanium.UI.createTab({
		title:'Vouchers and Featured',
		window:summaryWin,
		icon:'images/53-house.png'
	});
	


	tabGroup.addTab(tab2);
	tabGroup.addTab(tab1);

	tabGroup.open();
}