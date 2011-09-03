/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var appTitle = 'Knight Finder';
var url;
var env = "http://knightfinder.heroku.com";
var actInd;
var activityWindow;
var alertMessage;
var failureMessage;
var activityBg;
var deals;
var voucherWin;
var voucherType;
var voucherSummary;
var voucherDetails;
var voucherExpDate;
var venueName;
var tableData = [];

//Window Loading section
win = Titanium.UI.currentWindow;
win.title = 'Deals @ ' + win.venueName;
win.backgroundColor = 'stripped';
//Knight Finder standard Alert Messages
alertMessage = Titanium.UI.createAlertDialog({
	title : appTitle,
	message : 'Alert Message'
});
failureMessage = Titanium.UI.createAlertDialog({
	title : appTitle,
	message : 'Failure Message'
});
//These are functions for the cool activity indicator
function showIndicator() {
	actInd = Ti.UI.createActivityIndicator({
		style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		message : 'Getting Deals....',
		color : 'white',
		height : 60,
		width : 60
	});
	activityWindow = Ti.UI.createWindow({
		width : 200,
		height : 100
	});
	activityBg = Ti.UI.createView({
		backgroundColor : "#000000",
		opacity : 0.5,
		borderRadius : 10
	});

	activityWindow.add(activityBg);
	activityWindow.add(actInd);
	activityWindow.open();
	actInd.show();
}

function hideIndicator() {
	activityWindow.close();
}

function serviceResponse() {
	
	Ti.API.info(this.responseText);

	//Parse the JSON
	try {
		Ti.API.info("JSON parse ok");
		deals = JSON.parse(this.responseText);
	} catch (e) {

		if(!deals) {
			
			Ti.API.info('Response status false');
			failureMessage.message = "Sorry there are no Deals for this venue";
			failureMessage.show();

			var lblNoDeals = Titanium.UI.createLabel({
				text : 'There are no deals currently available for ' + win.venueName + ' please check back as we are constantly adding more deals to our Database',
				height : 50,
				top : 140,
				left : 15,
				width : 300,
				color : '#3D3D3D',
				textAlign : 'center',
				font : {
					fontSize : 14,
					fontStyle : 'Arial',
					fontWeight : 'normal'
				},
				textAlign : 'left'

			});
			win.add(lblNoDeals);
				hideIndicator();
			return;

		}
	}
	
	alertMessage.message = win.venueName + ' reserves the right to remove these deals at any time'
	alertMessage.show();

	for(var i in deals) {
		Ti.API.info("Parsing Deals");
		row = Ti.UI.createTableViewRow({
			height : 35,
			backgroundColor : '#FFFFFF',
			selectedBackgroundColor : '#dddddd',
			hasChild:true
		});

		var dealName = Ti.UI.createLabel({
			text : deals[i].deal.summary,
			color : '#000000',
			textAlign : 'left',
			left : 10,
			top : 7,
			height : 18,
			font : {
				fontWeight : 'bold',
				fontSize : 13
			}
		});

		row.add(dealName);

		tableData[i] = row;

		var tableview = Titanium.UI.createTableView({
			data : tableData,
			left : -5,
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
			headerTitle : 'Click Deal to get voucher'
		});

		Titanium.UI.currentWindow.add(tableview);

		tableview.addEventListener('click', function(e) {
			var index = e.index;
			var section = e.section;
			var row = e.row;
			var rowdata = e.rowData;
			voucherWin = Titanium.UI.createWindow({
				url : 'kfVoucher.js'
			});
			voucherType = 'Venue Deal';
			voucherSummary = deals[e.index].deal.summary;
			voucherDetails = deals[e.index].deal.details;
			voucherExpDate = deals[e.index].deal.expires;
			venueName = win.venueName;
			var venueID = win.venueID;
			var dealID = deals[e.index].deal.id;
			Ti.API.warn(dealID);
			voucherWin.voucherType = voucherType;
			voucherWin.voucherSummary = voucherSummary;
			voucherWin.voucherDetails = voucherDetails;
			voucherWin.voucherExpDate = voucherExpDate;
			voucherWin.venueName = win.venueName;
			voucherWin.venueID = venueID;
			voucherWin.dealID = dealID;

			Titanium.UI.currentTab.open(voucherWin, {
				animated : true
			});
		});
	}
	hideIndicator();
}

function callService() {

	// Call the webservice using a web request
	showIndicator();
	url = env + "/api/venue/" + win.venueID + "/deals";

	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = serviceResponse;

	xhr.onerror = function() {
		hideIndicator();
		callService();
		showIndicator();
		Ti.API.info("Error in webserver");

		failureMessage.message = "Unable to connect to Webservice, Retrying...";
		failureMessage.show();
	};

	Titanium.API.info(url);

	xhr.open("GET", url);
	xhr.send();
}

callService();
