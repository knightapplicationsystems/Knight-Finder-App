/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var alertMessage;
var failureMessage;
var lblInfoSummary;
var lblSummary;
var lblInfoDetails;
var lblDetails;
var lblInfoExpDate;
var lblExpDate;
var expiryDate;
var btnSave;
var lblKFVoucher;
var voucherID;
var dateString;
var getTheVoucher;
var dbDetails;
var dbSummary;
var dbExpiry;
var dbVenueName;
var db;

//Window Loading section
win = Titanium.UI.currentWindow;

//Open the db
db = Titanium.Database.open('knightfinder');


if (win.voucherType == 'Saved Venue Deal') {
	win.title = win.voucherType + ' voucher';
	getTheVoucher = db.execute('SELECT * FROM vouchers WHERE voucherID =' + win.voucherID);
	dbDetails = getTheVoucher.field(1);
	dbSummary = getTheVoucher.field(2);
	dbExpiry = getTheVoucher.field(4);
	dbVenueName = getTheVoucher.field(6);
} else {
	win.title = win.voucherType + ' voucher';
}
win.backgroundColor = 'stripped';
//Knight Finder standard Alert Messages
alertMessage = Titanium.UI.createAlertDialog({
	title: 'Knight Finder',
	message: 'Alert Message'
});
failureMessage = Titanium.UI.createAlertDialog({
	title: 'Knight Finder',
	message: 'Failure Message'
});
db = Titanium.Database.open('knightfinder');
lblKFVoucher = Titanium.UI.createLabel({
	text: 'Knight Finder Voucher',
	height:'auto',
	top:10,
	left:5,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:20,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});

lblInfoSummary = Titanium.UI.createLabel({
	text: 'Summary:',
	height:'auto',
	top:50,
	left:5,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:13,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});

lblSummary = Titanium.UI.createLabel({
	text: win.voucherSummary + ' @ ' + win.venueName,
	height:'auto',
	top:70,
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
if (win.voucherType == 'Saved Venue Deal') {
	lblSummary.text = dbSummary + ' @ ' + dbVenueName;
}

lblInfoDetails = Titanium.UI.createLabel({
	text: 'Details of deal:',
	height:'auto',
	top:100,
	left:5,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:13,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});

lblDetails = Titanium.UI.createLabel({
	text: win.voucherDetails,
	height:'auto',
	top:120,
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

if (win.voucherType == 'Saved Venue Deal') {
	lblDetails.text = dbDetails;
}

lblInfoExpDate = Titanium.UI.createLabel({
	text: 'Expires:',
	height:'auto',
	top:170,
	left:5,
	width:'auto',
	colour: '#000000',
	font: {
		fontSize:13,
		fontStyle:'Arial',
		fontWeight:'bold'
	},
	textAlign:'left'
});
if (win.voucherType == 'Saved Venue Deal') {

} else {

	var voucherDate = win.voucherExpDate;
	var temp = voucherDate.split("T");
	
	Ti.API.info("Event Date:" + temp[0] + ". Event Time:" + temp[1]);
	
	voucherDate = temp[0].split("-");
	voucherDate = voucherDate[1] + "/" + voucherDate[2] + "/" + voucherDate[0];
	
	var eventTime = temp[1].split("+");
	eventTime = eventTime[0].split(":");
	
	var theDate = new Date(voucherDate);
	theDate.setHours(eventTime[0], eventTime[1], 0, 0);
	
	dateString = padwithZero(theDate.getDate()) + "/" + padwithZero(theDate.getMonth() + 1) + "/" + padwithZero(theDate.getFullYear()) + " " + padwithZero(theDate.getHours()) + ":" + padwithZero(theDate.getMinutes());
	Ti.API.info("Parsed date: " + theDate + ". Date String: " + dateString);
}

lblExpDate = Titanium.UI.createLabel({
	text: dateString,
	height:'auto',
	top:200,
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

if (win.voucherType == 'Saved Venue Deal') {
	lblExpDate.text = dbExpiry;
}

btnSave = Titanium.UI.createButtonBar({
	top:250,
	left:9,
	width:300,
	height:40,
	labels:['Save'],
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	font: {
		fontSize:15,
		fontFamily:'Arial',
		fontWeight:'bold'
	}

});

if (win.voucherType == 'Saved Venue Deal') {
	btnSave.visible = false;
}

btnSave.addEventListener('click', function(e) {

	var row = db.execute('SELECT * FROM vouchers ORDER BY voucherID DESC');

	if (row.field(0) == null) {
		voucherID = 1;
		Ti.API.info('First ' + voucherID);
	} else {
		Ti.API.info('Second ' + voucherID);
		voucherID = row.field(0);
		Ti.API.info('Third ' + voucherID);
		voucherID = voucherID + 1;
		Ti.API.info('Fourth ' + voucherID);

	}

	db.execute("INSERT INTO vouchers (voucherID, details, summary,expiry_date,venueName) VALUES (" + voucherID + ",'" + win.voucherDetails + "','" + win.voucherSummary + "','" + dateString + "','" + win.venueName + "')");
	alertMessage.message = 'Your Voucher has been saved';
	alertMessage.show();
	win.close();
});
//This is part of the date adjustment
function padwithZero(number) {

	var testedNumber = number + "";

	if (testedNumber.length == 1) {
		return "0" + testedNumber;
	}

	return testedNumber;
}

win.add(lblKFVoucher,lblSummary,lblDetails,lblInfoSummary,lblInfoDetails,btnSave,lblInfoExpDate,lblExpDate);