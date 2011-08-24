/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var fbID;
var eventName;
//Scroll view
var scrollView;
var enbedView;
var moreInfo;
var imageView;
//Facebook contact add to guest list
var winAddToGlist;
var btnAddToGuestList;

//Activity Indicators
var actInd;
var activityWindow
var activityBg;

//Window Loading section
win = Titanium.UI.currentWindow;
win.title = eventName;
win.backgroundColor = 'stripped';
fbID = win.eventFBID;
eventName = win.eventName;

scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});

enbedView = Titanium.UI.createView({
	height:'auto',
	width:300,
	top:10
});

//Knight Finder standard Alert Messages
alertMessage = Titanium.UI.createAlertDialog({
	title: 'Knight Finder',
	message: 'Alert Message'
});
failureMessage = Titanium.UI.createAlertDialog({
	title: 'Knight Finder',
	message: 'Failure Message'
});


//These are functions for the cool activity indicator
function showIndicator() {
	actInd = Ti.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		message:'Getting Info....',
		color: 'white',
		height:60,
		width:60
	});

	activityWindow = Ti.UI.createWindow({
		width: 300,
		height: 100
	});

	activityBg = Ti.UI.createView({
		backgroundColor: "#000000",
		opacity: 0.5,
		borderRadius: 10
	});

	activityWindow.add(activityBg);
	activityWindow.add(actInd);
	activityWindow.open();
	actInd.show();
}

function hideIndicator() {
	activityWindow.close();
}

//This is part of the date adjustment
function padwithZero(number) {

	var testedNumber = number + "";

	if (testedNumber.length == 1) {
		return "0" + testedNumber;
	}

	return testedNumber;
}

function eventsResponse() {
	Ti.API.info(this.responseText);

	try {
		events = JSON.parse(this.responseText);
	} catch (e) {
	}

	Ti.API.info(events);

	var eventDate = events.start_time;
	var temp = eventDate.split("T");

	Ti.API.info("Event Date:" + temp[0] + ". Event Time:" + temp[1]);

	eventDate = temp[0].split("-");
	eventDate = eventDate[1] + "/" + eventDate[2] + "/" + eventDate[0];

	var eventTime = temp[1].split("+");
	eventTime = eventTime[0].split(":");

	var theDate = new Date(eventDate);
	theDate.setHours(eventTime[0], eventTime[1], 0, 0);

	dateString = padwithZero(theDate.getDate()) + "/" + padwithZero(theDate.getMonth() + 1) + "/" + padwithZero(theDate.getFullYear()) + " " + padwithZero(theDate.getHours()) + ":" + padwithZero(theDate.getMinutes());

	Ti.API.info("Parsed date: " + theDate + ". Date String: " + dateString);

	eventTime = Titanium.UI.createLabel({
		text:dateString,
		height:'auto',
		top: 80,
		left:6,
		width:300,
		color:'Black',
		font: {
			fontSize:15,
			fontStyle:'normal',
			fontWeight:'bold'
		},
		textAlign:'left'

	});

	imageView = Ti.UI.createWebView({
		html:'<body topmargin=0 leftmargin=0><img src="' + "http://graph.facebook.com/"+fbID+"/picture" + '" width=57 height=57></body>',
		left:6,
		top:10,
		width:57,
		height:57
	});

	moreInfo = Titanium.UI.createLabel({
		text:events.description,
		height:'auto',
		top: 120,
		left:6,
		width:290,
		color:'Black',
		font: {
			fontSize:13,
			fontStyle:'normal',
			fontWeight:'bold'
		},
		textAlign:'left'

	});

	btnAddToGuestList = Titanium.UI.createButtonBar({
		top:10,
		right:10,
		width:160,
		height:40,
		labels:['Request Guestlist'],
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		font: {
			fontSize:15,
			fontFamily:'Arial',
			fontWeight:'bold'
		}

	});
	
	btnAddToGuestList.addEventListener('click', function(e)
	{
		alertMessage.message = 'NOTE: This will simply allow you to add names to an event wall, Knight Finder cannot guarantee guest list for this event';
		alertMessage.show();
		winAddToGlist = Titanium.UI.createWindow({	
							url:'kfGuestListRequest.js'
						});
			winAddToGlist.eventID = fbID;			
						
			Titanium.UI.currentTab.open(winAddToGlist,{animated:true});			
	});

	Ti.API.info('What the fuck');

	enbedView.add(eventTime,moreInfo,imageView,btnAddToGuestList);
	scrollView.add(enbedView);
	win.add(scrollView);
	hideIndicator();
}

function callService() {
	showIndicator();
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = eventsResponse;
	xhr.onerror = function() {
		hideIndicator();
		failureMessage.message = 'Unable to get Event Info from Facebook, please try later';
		failureMessage.show();
	};
	//failureMessage.message = fbID;
	//failureMessage.show();
	var url = "http://graph.facebook.com/"+fbID;
	Ti.API.info(url);

	xhr.open("GET",url);

	xhr.send();
}

callService();