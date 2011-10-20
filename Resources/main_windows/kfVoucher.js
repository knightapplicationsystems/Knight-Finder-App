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
var env = "http://knightfinder-prod.heroku.com";
var db;

//Window Loading section
win = Titanium.UI.currentWindow;

//Open the db
db = Titanium.Database.open('knightfinder');

String.prototype.truncate = function(length) {

	if(this.length > length) {

		return this.slice(0, length - 3) + "...";

	} else {

		return this.slice(0, this.length);

	}
};
if(win.voucherType == 'Saved Venue Deal') {
	win.title = win.voucherType;
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
	title : 'Knight Finder',
	message : 'Alert Message'
});
failureMessage = Titanium.UI.createAlertDialog({
	title : 'Knight Finder',
	message : 'Failure Message'
});
db = Titanium.Database.open('knightfinder');
lblKFVoucher = Titanium.UI.createLabel({
	text : 'Knight Finder Voucher',
	height : 'auto',
	top : 10,
	left : 30,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 23,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});
lblInfoDetails = Titanium.UI.createLabel({
	text : 'Details of deal:',
	height : 'auto',
	top : 45,
	left : 5,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 13,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});
lblDetails = Titanium.UI.createLabel({
	text : win.voucherDetails,
	height : 'auto',
	top : 60,
	left : 5,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 15,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});

if(win.voucherType == 'Saved Venue Deal') {
	lblDetails.text = unescape(dbDetails);
}
lblInfoExpDate = Titanium.UI.createLabel({
	text : 'Expires:',
	height : 'auto',
	top : 250,
	left : 5,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 13,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});
if(win.voucherType == 'Saved Venue Deal') {

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
	text : dateString,
	height : 'auto',
	top : 270,
	left : 5,
	width : 'auto',
	colour : '#000000',
	font : {
		fontSize : 15,
		fontStyle : 'Arial',
		fontWeight : 'bold'
	},
	textAlign : 'left'
});

if(win.voucherType == 'Saved Venue Deal') {

	var voucherDate = dbExpiry;
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

	lblExpDate.text = dateString;

}
btnSave = Titanium.UI.createButtonBar({
	top : 310,
	left : 10,
	width : 300,
	height : 40,
	labels : ['Save'],
	style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
	font : {
		fontSize : 15,
		fontFamily : 'Arial',
		fontWeight : 'bold'
	}

});

if(win.voucherType == 'Saved Venue Deal') {
	btnSave.visible = false;
}

btnSave.addEventListener('click', function(e) {



		var checkSaved = db.execute("SELECT * FROM vouchers WHERE venueID = " + win.dealID + " AND expiry_date = '" + win.voucherExpDate + "'");
		if(checkSaved.field(0) == null) {

			var row = db.execute('SELECT * FROM vouchers ORDER BY voucherID DESC');

			if(row.field(0) == null) {
				voucherID = 1;

			} else {
				voucherID = row.field(0);
				voucherID = voucherID + 1;

			}
			
			var acceptKFConditions = Titanium.UI.createAlertDialog({
				title : 'Knight Finder',
				message : 'By clicking accept you are agreeing to the following conditions: \n This deal can be withdrawn by Knight Finder or ' + win.venueName + ' at any time without prior notice',
				buttonNames : ['Accept', 'No']
			});
			acceptKFConditions.show();

			acceptKFConditions.addEventListener('click', function(e) {
				if(e.index == 0) {
					db.close();

					try {
						var xhr = Titanium.Network.createHTTPClient();
						url = env + "/api/venue/" + win.venueID + "/deals/" + win.dealID + "/log";
						Ti.API.warn(url);
						xhr.open("GET", url);
						xhr.send();

					} catch(e) {
						Ti.API.warn(e);
					}
					//var sql = ("INSERT INTO vouchers (voucherID, details, summary,expiry_date,venueName) VALUES (" + voucherID + ",'" + escape(win.voucherDetails) + "','" + escape(win.voucherSummary) + "','" + win.voucherExpDate + "','" + win.venueName + "')");
					//alertMessage.message = sql;
					//alertMessage.show();

						db = Titanium.Database.open('knightfinder');
						db.execute("INSERT INTO vouchers (voucherID, details, summary,expiry_date,venueID,venueName) VALUES (" + voucherID + ",'" + escape(win.voucherDetails) + "','" + escape(win.voucherSummary) + "','" + win.voucherExpDate + "'," + win.dealID + ",'" + win.venueName + "')");

					alertMessage.message = 'Your Voucher has been saved';
					alertMessage.show();
					win.close();
				}
			});
		} else {
			var alreadySaved = Titanium.UI.createAlertDialog({
				title : 'Knight Finder',
				message : 'You have already Saved this voucher'
			});
			alreadySaved.show();
			win.close();
		}
	 

});
//This is part of the date adjustment
function padwithZero(number) {

	var testedNumber = number + "";

	if(testedNumber.length == 1) {
		return "0" + testedNumber;
	}

	return testedNumber;
}

win.add(lblKFVoucher, lblDetails, lblInfoDetails, btnSave, lblInfoExpDate, lblExpDate);
