/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var venues;
var url;
var appTitle = 'Knight Finder';
var env = "http://knightfinder.heroku.com";
var initialResultsReceived = false;
var geoLong;
var geoLat;
var alertMessage;
var failureMessage;
var initialGeoReceived = false;
var btnViewMap;
var viewMap;
//Table views use a data object
var tableData = [];
var tableDataRowIds = [];
var row;
var singleVenue;
var actInd;
var activityWindow
var activityBg;

//Window Loading section
win = Titanium.UI.currentWindow;
win.title = appTitle;
win.backgroundColor = 'stripped';

//Create DB
var db;
//DB Load Events
db = Titanium.Database.open('knightfinder');

db.execute('CREATE TABLE IF NOT EXISTS dbVersion (versionID)');
db.execute('CREATE TABLE IF NOT EXISTS review (response)');
db.execute('CREATE TABLE IF NOT EXISTS vouchers (voucherID, details, summary, date_added, expiry_date, venueID)');

db.execute("INSERT INTO review (response) VALUES ('yes')");


function willYouReview()
{
	var rows = db.execute('SELECT * FROM review');
	Titanium.API.info(rows.field(0));
	if (rows.field(0) == 'yes')
	{
		var reviewKF = Titanium.UI.createAlertDialog({
	title: 'Knight Finder',
	message: 'Do you like Knight Finder? Then please add a review and help us improve the app further',
	buttonNames: ['Review Now', 'Never']
	});
	reviewKF.show();
	}
	reviewKF.addEventListener('click',function (e)
	{
		if (e.index == 0)
		{
			 Titanium.Platform.openURL('http://itunes.apple.com/gb/app/knight-finder/id408243712?mt=8');
		}
		else
		{
			db.execute("UPDATE review SET response = 'no'");
		}
	});

}



//These are functions for the cool activity indicator 
function showIndicator()
{
    	actInd = Ti.UI.createActivityIndicator({
        style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
        message:'Getting Venues....',
        color: 'white',
        height:60,
        width:60
    });
 
     activityWindow = Ti.UI.createWindow({
        width: 200,
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
 
function hideIndicator()
{
    activityWindow.close();
}

//Deal with multitasking
Ti.App.addEventListener('resume', function() {
	prepareGeo();
});

//Right Nav Button to view map instead
btnViewMap = Titanium.UI.createButton(
		{
			title:'View On Map',
			height:40,
			top:160,
			right:10
		});
		
btnViewMap.addEventListener('click', function(e)
		{
			viewMap = Titanium.UI.createWindow(
			{
				url:'kfMaps.js'
			});
			Titanium.UI.currentTab.open(viewMap,{animated:true});
		});
win.rightNavButton = btnViewMap;
//Knight Finder standard Alert Messages
alertMessage = Titanium.UI.createAlertDialog({
	title: appTitle,
	message: 'Alert Message'
});
failureMessage = Titanium.UI.createAlertDialog({
	title: appTitle,
	message: 'Failure Message'
});


prepareGeo();


//This function prepares geolocation within Knight Finder
function prepareGeo() {
	showIndicator();
	Ti.Geolocation.purpose = "Determine your location";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	// Event listener for GeoLocation
	Titanium.Geolocation.addEventListener('location', geoResp);
}


//Function is executed when succesful geo reponse comes back
function geoResp(e) {
	
	Ti.API.info('GeoLocation Response received');

	if (!e.success) {
		failureMessage.message = "An Error has occured whilst trying to determine your location, please try and refresh, and make sure you have sufficient mobile signal";
		failureMessage.show();
		return;
	}

	Ti.API.info("Geo Success");

	// Set the global long/lat
	geoLong = e.coords.longitude;
	geoLat = e.coords.latitude;

	// Show the map, as we now have lat/long
	if (!initialGeoReceived) {
		
	}
	//Keep trying to get a location
	if (initialGeoReceived) {
		Titanium.Geolocation.removeEventListener('location',geoResp);
		return;
	}

	initialGeoReceived = true;


		url = env + "/api/venues?loc=" + geoLat + "," + geoLong + "&limit=" + 50;
		Ti.API.info(url);
		// Call the webservice
		callService();
}

function callService() {

	// Call the webservice using a web request
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

function serviceResponse() {
	
	Ti.API.info(this.responseText);

	//Parse the JSON
	try {
		Ti.API.info("JSON parse ok");
		venues = JSON.parse(this.responseText);
	} catch (e) {
		hideIndicator();
		Ti.API.info("JSON parse failed");
		failureMessage.message = "Fatal error, please close the application and try again later";
		failureMessage.show();
	}


	if (!venues) {
		hideIndicator();
		Ti.API.info('Response status false');
		actInd.hide();
		failureMessage.message = "Sorry there are no venues in this area";
		failureMessage.show();

		return;
	}
	

	
	
	for (var i in venues) {
		Ti.API.info("Parsing Venue");
	
		
		row = Ti.UI.createTableViewRow({height:35,backgroundColor:'#FFFFFF', selectedBackgroundColor:'#dddddd'});
		
		var venueName = Ti.UI.createLabel({
			text: venues[i].venue.name,
			color: '#000000',
			textAlign:'left',
			left:10,
			top:2,
			height:18,
			font:{fontWeight:'bold',fontSize:13}
		});
		Ti.API.info(venues[i].venue.name);
		row.add(venueName);
		
		tableData[i] = row;
		
		var tableview = Titanium.UI.createTableView({
		data:tableData,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		headerTitle:'Venues Near You'
	});
	
	Titanium.UI.currentWindow.add(tableview);
	
	tableview.addEventListener('click',function(e)
			{
					var index = e.index;
					var section = e.section;
					var row = e.row;
					var rowdata = e.rowData;
					

				var venueDetails = Titanium.UI.createWindow(
						{
							url:'kfVenueDetails.js'
						});
					var venueName = venues[e.index].venue.name;
					var venueAddress1 = venues[e.index].venue.address1;
					var venueCity = venues[e.index].venue.city;
					var venuePostCode = venues[e.index].venue.postcode;
					var venuePhone = venues[e.index].venue.phone;
					var venueEmail = venues[e.index].venue.email;
					var venueID = venues[e.index].venue.id
					
					venueDetails.venueName = venueName;
					venueDetails.venueAddress1 = venueAddress1;
					venueDetails.venueCity = venueCity;
					venueDetails.venuePostCode = venuePostCode;
					venueDetails.venuePhone = venuePhone;
					venueDetails.venueEmail = venueEmail;
					venueDetails.venueID = venueID;
				Titanium.UI.currentTab.open(venueDetails,{animated:true});
			});
		
		
	}
	hideIndicator();
	willYouReview();
}





