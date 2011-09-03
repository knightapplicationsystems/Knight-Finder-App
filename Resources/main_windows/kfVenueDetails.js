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

//Load the venue Header view

scrollView = Titanium.UI.createScrollView({
	height:'auto',
	width:'auto',
	top:0,
	left:0
});

viewHeader = Titanium.UI.createView ({
	height:'auto',
	width:'auto',
	top:10,
	left:10
});
//Venue Name
lblVenueName = Titanium.UI.createLabel({
	text: win.venueName,
	height:'auto',
	top:10,
	left:5,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:18,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});
//Venue Phone Number
lblPhone = Titanium.UI.createLabel({
	text: 'phone',
	height:'auto',
	top:10,
	left:19,
	width:'50',
	color: '#1E4F78',
	font: {
		fontSize:12,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'right'
});
lblPhoneNumber = Titanium.UI.createLabel({
	text:'+' + win.venuePhone,
	height:'auto',
	top:10,
	left:90,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:14,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});
btnPhoneNumber = Titanium.UI.createButton({
	color: '#000000',
	height:40,
	width:290,
	top:60,
	left:5,
	font: {
		fontSize:14,
		fontFamily:'Arial',
		fontWeight:'bold'
	}
});
btnPhoneNumber.add(lblPhone,lblPhoneNumber);

btnPhoneNumber.addEventListener('click', function(e) {
	Ti.Platform.openURL ('tel:' + win.venuePhone);
});
//Venue Address
lblAddress = Titanium.UI.createLabel({

	text: 'address',
	height:'auto',
	top:10,
	left:19,
	width: 50,
	color: '#1E4F78',
	font: {
		fontSize:12,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'right'
});

lblAddress1 = Titanium.UI.createLabel({
	text:win.venueAddress1,
	height:'auto',
	top:10,
	left:90,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:14,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});

if (win.venueAddress2 == null) {

} else {
	lblAddress2 = Titanium.UI.createLabel({
		text:win.venueAddress2,
		height:'auto',
		top:60,
		left:90,
		width:'auto',
		colour: '#000000',
		font: {
			fontSize:14,
			fontStyle:'Arial',
			fontWeight:'bold'
		},
		textAlign:'left'
	});
	btnAddress.add(lblAddress2);
}

lblCity = Titanium.UI.createLabel({
	text:win.venueCity,
	height:'auto',
	top:120,
	left:90,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:14,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});

if (win.venueAddress2 == null) {
	lblCity.top = 60;
} else {
	lblAddress2 = Titanium.UI.createLabel({
		text:win.venueAddress2,
		height:'auto',
		top:90,
		left:90,
		width:'auto',
		colour: '#000000',
		font: {
			fontSize:14,
			fontStyle:'Arial',
			fontWeight:'bold'
		},
		textAlign:'left'
	});
	btnAddress.add(lblAddress2);
}

lblPostcode = Titanium.UI.createLabel({
	text:win.venuePostCode,
	height:'auto',
	top:120,
	left:90,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:14,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});
if (win.venueAddress2 == null) {
	lblPostcode.top = 90;
}

btnAddress = Titanium.UI.createButton({
	height:120,
	width:290,
	top:120,
	left:5,
	font: {
		fontSize:14,
		fontFamily:'Arial',
		fontWeight:'bold'
	}
});


btnWhatsOn = Titanium.UI.createButton({
	title:'Whats On',
	height:45,
	width:137,
	top:260,
	left:5,
	font: {
		fontSize:16,
		fontFamily:'Arial',
		fontWeight:'bold'
	}
});

btnDeals = Titanium.UI.createButton({
	title:'See Deals',
	height:45,
	width:137,
	color:'#fff',
	backgroundColor: 'D94123', //'#C4E8FF',  //'#D94123',
	backgroundImage: 'none',
	borderRadius: 10,
	borderColor: '#555555',
	borderWidth: '1',
	top:260,
	left:158,
	font: {
		fontSize:16,
		fontFamily:'Arial',
		fontWeight:'bold'
	}
});

btnAddress.add(lblAddress,lblAddress1,lblCity,lblPostcode);
viewHeader.add(lblVenueName,btnPhoneNumber,btnAddress,btnWhatsOn,btnDeals);

//scrollView.add(viewHeader);
win.add(viewHeader);

btnAddress.addEventListener('click',function(e)
{
	var mapWin = Titanium.UI.createWindow({
		url:'kfMaps.js'
	});
	var venueName = win.venueName;
	var venueLat = win.venueLat;
	var venueLong = win.venueLong;
	
	mapWin.venueLat = venueLat;
	mapWin.venueLong = venueLong;
	mapWin.venueName = venueName;
	
	Titanium.UI.currentTab.open(mapWin, {
		animated:true
	});
});

btnWhatsOn.addEventListener('click', function(e) {
	var whatsOn = Titanium.UI.createWindow({
		url:'kfEvents.js'
	});
	var venueName = win.venueName;
	var venueCity = win.venueCity

	whatsOn.venueName = venueName;
	whatsOn.venueCity = venueCity;

	Titanium.UI.currentTab.open(whatsOn, {
		animated:true
	});
});
btnDeals.addEventListener('click', function(e) {
	var drinksDeals =  Titanium.UI.createWindow({
		url:'kfDeals.js'
	});
	var venueName = win.venueName;
	var venueID = win.venueID;

	drinksDeals.venueName = venueName;
	drinksDeals.venueID = venueID;

	Titanium.UI.currentTab.open(drinksDeals, {
		animated:true
	});
});