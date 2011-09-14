/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var appTitle = "Info";
var scrollView;
//Header Variables
var viewHeader;
var lblVenueName;
//Web and email details
var lblEmail;
var lblEmailAddress;
var btnEmail;
var lblWeb;
var lblWebAddress;
var btnWebAddress;
//Company Logo variables
var imgLogo;
//Phone Number Variables
var lblPhone;
var lblPhoneNumber;
var btnPhoneNumber;
//Address Variables
var lblAddress;
var lblAddress1;
var lblAddress2;
var lblPostcode;
var lblCity;
var btnAddress;
//Deals and Whats On
var btnWhatsOn;
var btnDeals;
//Window Loading section
win = Titanium.UI.currentWindow;
win.title = appTitle;
win.backgroundColor = 'stripped';

String.prototype.truncate = function(length) {

  if (this.length > length) {

    return this.slice(0, length - 3) + "...";

  } else {

    return this.slice(0, this.length);

  }
};


//Load the venue Header view

scrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true
});
viewHeader = Titanium.UI.createView({
	height : 'auto',
	width : 'auto',
	top : 10,
	left : 10
});

//Venue Logo
imgLogo = Titanium.UI.createImageView({
	top : 6,
	left : 5,
	image : '/images/cubleogo.png',
	canScale : true,
	height : 'auto',
	width : 'auto'
});

//Venue Name
lblVenueName = Titanium.UI.createLabel({
	text : win.venueName,
	height : 'auto',
	top : 10,
	left : 110,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 20,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});

if (win.venueName == 'Cube Bar')
{
	
}
else
{
	imgLogo.image = '/images/kflogo.png';
	imgLogo.opacity = 0.3;
	imgLogo.left = 15;
	lblVenueName.left = 80;
	lblVenueName.top = 14;
	
}

//Web URL
btnWebAddress = Titanium.UI.createButton({
	color : '#000000',
	height : 40,
	width : 290,
	top : 110,
	left : 5,
	font : {
		fontSize : 14,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	}
});
lblWeb = Titanium.UI.createLabel({
	text : 'web',
	height : 'auto',
	top : 10,
	left : 19,
	width : '50',
	color : '#1E4F78',
	font : {
		fontSize : 12,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'right'
});
lblWebAddress = Titanium.UI.createLabel({
	text : win.venueWeb.truncate(28),
	height : 'auto',
	top : 10,
	left : 90,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 14,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});
btnWebAddress.add(lblWeb, lblWebAddress);

if(lblWebAddress.text == 'None') {
	lblWebAddress.text = 'None';
} else {
	btnWebAddress.addEventListener('click', function(e) {
		var webView = Titanium.UI.createWindow({
			url : 'kfWebView.js'
		});

		var venueWeb = win.venueWeb;
		webView.venueWeb = venueWeb;

		Titanium.UI.currentTab.open(webView, {
			animated : true
		});

	});
}
//Email
btnEmail = Titanium.UI.createButton({
	color : '#000000',
	height : 40,
	width : 290,
	top : 60,
	left : 5,
	font : {
		fontSize : 14,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	}
});
lblEmail = Titanium.UI.createLabel({
	text : 'email',
	height : 'auto',
	top : 10,
	left : 19,
	width : '50',
	color : '#1E4F78',
	font : {
		fontSize : 12,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'right'
});
lblEmailAddress = Titanium.UI.createLabel({
	text : win.venueEmail.truncate(28),
	height : 'auto',
	top : 10,
	left : 90,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 14,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});

btnEmail.add(lblEmail, lblEmailAddress);
if(lblEmailAddress.text == 'None') {
	lblEmailAddress.text = 'None';
} else {
	btnEmail.addEventListener('click', function(e) {
		var emailDialog = Titanium.UI.createEmailDialog();
		emailDialog.toRecipients = [win.venueEmail];
		emailDialog.open();
	});
}

//Venue Phone Number
lblPhone = Titanium.UI.createLabel({
	text : 'phone',
	height : 'auto',
	top : 10,
	left : 19,
	width : '50',
	color : '#1E4F78',
	font : {
		fontSize : 12,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'right'
});
lblPhoneNumber = Titanium.UI.createLabel({
	text : '+' + win.venuePhone,
	height : 'auto',
	top : 10,
	left : 90,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 14,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});
btnPhoneNumber = Titanium.UI.createButton({
	color : '#000000',
	height : 40,
	width : 290,
	top : 160,
	left : 5,
	font : {
		fontSize : 14,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	}
});
btnPhoneNumber.add(lblPhone, lblPhoneNumber);

btnPhoneNumber.addEventListener('click', function(e) {
	Ti.Platform.openURL('tel:' + win.venuePhone);
});
//Venue Address
lblAddress = Titanium.UI.createLabel({

	text : 'address',
	height : 'auto',
	top : 10,
	left : 19,
	width : 50,
	color : '#1E4F78',
	font : {
		fontSize : 12,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'right'
});
lblAddress1 = Titanium.UI.createLabel({
	text : win.venueAddress1.truncate(28),
	height : 'auto',
	top : 10,
	left : 90,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 14,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});

if(win.venueAddress2 == null) {

} else {
	lblAddress2 = Titanium.UI.createLabel({
		text : win.venueAddress2.truncate(28),
		height : 'auto',
		top : 60,
		left : 90,
		width : 'auto',
		colour : '#000000',
		font : {
			fontSize : 14,
			fontStyle : 'Arial',
			fontWeight : 'bold'
		},
		textAlign : 'left'
	});
	btnAddress.add(lblAddress2);
}
lblCity = Titanium.UI.createLabel({
	text : win.venueCity.truncate(28),
	height : 'auto',
	top : 120,
	left : 90,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 14,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});

if(win.venueAddress2 == null) {
	lblCity.top = 60;
} else {
	lblAddress2 = Titanium.UI.createLabel({
		text : win.venueAddress2.truncate(28),
		height : 'auto',
		top : 90,
		left : 90,
		width : 'auto',
		colour : '#000000',
		font : {
			fontSize : 14,
			fontStyle : 'Arial',
			fontWeight : 'bold'
		},
		textAlign : 'left'
	});
	btnAddress.add(lblAddress2);
}
lblPostcode = Titanium.UI.createLabel({
	text : win.venuePostCode.truncate(28),
	height : 'auto',
	top : 120,
	left : 90,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 14,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});
if(win.venueAddress2 == null) {
	lblPostcode.top = 90;
}
btnAddress = Titanium.UI.createButton({
	height : 120,
	width : 290,
	top : 210,
	left : 5,
	font : {
		fontSize : 14,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	}
});
btnWhatsOn = Titanium.UI.createButton({
	title : 'Whats On',
	height : 45,
	width : 137,
	top : 340,
	left : 5,
	font : {
		fontSize : 16,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	}
});
btnDeals = Titanium.UI.createButton({
	title : 'See Deals',
	height : 45,
	width : 137,
	color : '#fff',
	backgroundColor : 'D94123', //'#C4E8FF',  //'#D94123',
	backgroundImage : 'none',
	borderRadius : 10,
	borderColor : '#555555',
	borderWidth : '1',
	top : 340,
	left : 158,
	font : {
		fontSize : 16,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	}
});

btnAddress.add(lblAddress, lblAddress1, lblCity, lblPostcode);
viewHeader.add(imgLogo, lblVenueName, btnPhoneNumber, btnAddress, btnWhatsOn, btnDeals, btnWebAddress, btnEmail);
scrollView.add(viewHeader);

//scrollView.add(viewHeader);
win.add(scrollView);

btnAddress.addEventListener('click', function(e) {
	var mapWin = Titanium.UI.createWindow({
		url : 'kfMaps.js'
	});
	var venueName = win.venueName;
	var venueLat = win.venueLat;
	var venueLong = win.venueLong;

	mapWin.venueLat = venueLat;
	mapWin.venueLong = venueLong;
	mapWin.venueName = venueName;

	Titanium.UI.currentTab.open(mapWin, {
		animated : true
	});
});

btnWhatsOn.addEventListener('click', function(e) {
	var whatsOn = Titanium.UI.createWindow({
		url : 'kfEvents.js'
	});
	var venueName = win.venueName;
	var venueCity = win.venueCity

	whatsOn.venueName = venueName;
	whatsOn.venueCity = venueCity;

	Titanium.UI.currentTab.open(whatsOn, {
		animated : true
	});
});
btnDeals.addEventListener('click', function(e) {
	var drinksDeals = Titanium.UI.createWindow({
		url : 'kfDeals.js'
	});
	var venueName = win.venueName;
	var venueID = win.venueID;

	drinksDeals.venueName = venueName;
	drinksDeals.venueID = venueID;

	Titanium.UI.currentTab.open(drinksDeals, {
		animated : true
	});
});
