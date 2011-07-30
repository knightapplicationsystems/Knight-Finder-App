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
var lblInfoDateAdded;
var lblDateAdded;
var expiryDate;
var btnSave;
var lblKFVoucher;
var db;

//Window Loading section
win = Titanium.UI.currentWindow;
win.title = win.voucherType + ' voucher';
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

btnSave = Titanium.UI.createButtonBar({
	top:170,
	left:5,
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

btnSave.addEventListener('click', function(e)
{
	db.execute("INSERT INTO vouchers (voucherID, details, summary) VALUES (1,'" + win.voucherDetails + "','" + win.voucherSummary +"')");
	alertMessage.message = 'Your Voucher has been saved';
	alertMessage.show();
	win.close();
});

win.add(lblKFVoucher,lblSummary,lblDetails,lblInfoSummary,lblInfoDetails,btnSave);
