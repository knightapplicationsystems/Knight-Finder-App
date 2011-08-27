/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var venues;
var url;
var appTitle = 'Knight Finder';
var initialGeoReceived = false;
var alertMessage;
var failureMessage;
var mapView;
var geoLong;
var geoLat;
var env = "http://knightfinder.heroku.com";
var initialResultsReceived = false;
var actInd;
var activityWindow;
var activityBg;

//Window Loading section
win = Titanium.UI.currentWindow;
win.title = appTitle;

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
//Knight Finder standard Alert Messages
alertMessage = Titanium.UI.createAlertDialog({
	title: appTitle,
	message: 'Alert Message'
});
failureMessage = Titanium.UI.createAlertDialog({
	title: appTitle,
	message: 'Failure Message'
});

if (!win.venueLong)
{
	prepareGeo();
}
else
{
	showMap();
	
	
}
//This function prepares geolocation within Knight Finder
function prepareGeo() {
showIndicator();
	Ti.Geolocation.purpose = "Determine your location";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	// Event listener for GeoLocation
	Titanium.Geolocation.addEventListener('location', geoResp);
}

//This function reveals the map to the user
function showMap() {
	mapView = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {
			latitude:geoLat,
			longitude:geoLong,
			latitudeDelta:0.04,
			longitudeDelta:0.04
		},
		animate:true,
		regionFit:true,
		userLocation:true
		//top:45
	});
	
	//Annotation click - show the clicked venue
	if (!win.venueLong)
	{
	mapView.addEventListener('click',function(evt)
			{
				if (evt.clicksource == 'rightButton')
				{
					var venueWin = Titanium.UI.createWindow(
							{	
								url:'kfVenueDetails.js'
							});
					
					var venueName = venues[evt.annotation.myid].venue.name;
					var venueAddress1 = venues[evt.annotation.myid].venue.address1;
					var venueCity = venues[evt.annotation.myid].venue.city;
					var venuePostCode = venues[evt.annotation.myid].venue.postcode;
					var venuePhone = venues[evt.annotation.myid].venue.phone;
					var venueEmail = venues[evt.annotation.myid].venue.email;
					var venueID = venues[evt.annotation.myid].venue.id
					
					venueWin.venueName = venueName;
					venueWin.venueAddress1 = venueAddress1;
					venueWin.venueCity = venueCity;
					venueWin.venuePostCode = venuePostCode;
					venueWin.venuePhone = venuePhone;
					venueWin.venueEmail = venueEmail;
					venueWin.venueID = venueID;

					Titanium.UI.currentTab.open(venueWin,{animated:true});
				}
			});
	}
	else
	{
		//hideIndicator();
	mapView.removeAllAnnotations();
	mapView.region.latitudeDelta = 0.04;
	mapView.region.longitudeDelta = 0.04;
	mapView.addAnnotation(Titanium.Map.createAnnotation({
			latitude:win.venueLat,
			longitude:win.venueLong,
			title:win.venueName,
			pincolor:Titanium.Map.ANNOTATION_GREEN,
			animate:true,
			rightButton:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			font: {
				fontSize:10
			}
			
		}));
			mapView.addEventListener('click',function(evt)
			{
				if (evt.clicksource == 'rightButton')
				{
					win.close();
				}
			});
	}
	
	win.add(mapView);
}

//This function is called when the GeoResponse is returned
function geoResp(e) {
	Ti.API.info('GeoLocation Response received');

	if (!e.success) {
		hideIndicator();
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
		showMap();
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
		Ti.API.info("Error in webserver");

		failureMessage.message = "Unable to connect to Webservice, please try again later";
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
		Ti.API.info("JSON parse failed");
		failureMessage.message = "Fatal error, please close the application and try again later";
		failureMessage.show();
	}

	Ti.API.info(venues);

	if (!venues) {
		Ti.API.info('Response status false');
		actInd.hide();
		failureMessage.message = "Sorry there are no venues in this area";
		failureMessage.show();

		return;
	}
hideIndicator();
	mapView.removeAllAnnotations();
	venues = venues;
	Ti.API.info(venues);
	for (var i in venues) {
		Ti.API.info("Parsing Venue");

		mapView.addAnnotation(Titanium.Map.createAnnotation({
			latitude:venues[i].venue.latitude,
			longitude:venues[i].venue.longitude,
			title:venues[i].venue.name,
			pincolor:Titanium.Map.ANNOTATION_GREEN,
			animate:true,
			rightButton:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			font: {
				fontSize:10
			},
			myid:i // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		}));
	}
}