/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var url;
var alertMessage;
var failureMessage;
//Table views use a data object
var tableData = [];
var tableDataRowIds = [];

//Activity Indicators
var actInd;
var activityWindow
var activityBg;

//Window Loading section
win = Titanium.UI.currentWindow;
win.title = "Whats on @ " + win.venueName;
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

//These are functions for the cool activity indicator
function showIndicator() {
	actInd = Ti.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		message:'Getting Events...',
		color: 'white',
		height:60,
		width:60,
		left:100
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

function eventsResponse()
{
	Ti.API.info(this.responseText);

				try 
				{
					events = JSON.parse(this.responseText);
				}
				catch (e)
				{
				}
				
				Ti.API.info(events);
				Ti.API.info(events.data.length);
				
				if (events.data == "" || events.data.length == 0)
				{
					hideIndicator();
					var noEventLabel = Titanium.UI.createLabel(
					{
						text:"There are no events currently listed for " + win.venueName,
						height:50,
						top: 10,
						left:10,
						width:250,
						color:'Black',
						font:{fontSize:15, fontStyle:'normal',fontWeight:'bold'},
						textAlign:'left'
					});
					
					actInd.hide();
					win.add(noEventLabel);	
				}
				else
				{	
					hideIndicator();
					events = events.data;
					
					var top = 10;
					
					for (var i = 0, ilen=events.length;i<ilen; i++)
					{	
						var singleEvent = events[i];
						
							//var alteredName = singleEvent.name.replace("@ " + singleEvent.location, "");
							
							row = Ti.UI.createTableViewRow({height:45,backgroundColor:'#FFFFFF',selectedBackgroundColor:'#dddddd'}); 
							
							var eventName = Ti.UI.createLabel({
								text: singleEvent.name,
								color: 'Black',
								textAlign:'left',
								left:10,
								top:2,
								height:'auto',
								//fbId: events[i].id,
								fbName: events[i].name,
								font:{fontWeight:'bold',fontSize:13}
							});
							
							var facebookID = Ti.UI.createLabel({
								text: singleEvent.id,
								color: 'Black',
								textAlign:'left',
								left:10,
								top:2,
								height:'auto',
								fbId: events[i].id,
								fbName: events[i].name,
								font:{fontWeight:'bold',fontSize:13}
							});

							row.add(eventName);
						
							tableData[i] = row;
							
					}
					var tableview = Titanium.UI.createTableView({
						data:tableData,
						style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
						headerTitle:'Events listed on Facebook for \n' + win.venueName,
						left:-5,
						footerTitle:'Please note, Knight Finder uses the Facebook Graph API, and thus is not liable for the accuracy of the data shown above' 
						
					});	
					win.add(tableview);
					tableview.addEventListener('click', function(e) {
						var eventDetailWin = Titanium.UI.createWindow({	
							url:'kfNightZoom.js'
						});
						Ti.API.info(e.source.fbId);
									var index = e.index;
									
									var eventFBID = events[e.index].id;
									Ti.API.info(eventFBID);
									var eventName = e.source.fbName;
									
									eventDetailWin.eventName = eventName;
									eventDetailWin.eventFBID = eventFBID;
									Ti.API.info(eventFBID);
									eventDetailWin.venueName = win.venueNamepass;
									
						Titanium.UI.currentTab.open(eventDetailWin,{animated:true});
					});
				}
				
		

}

function callService() {
	showIndicator();
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = eventsResponse;
	xhr.onerror = function() {
		hideIndicator();
		Ti.API.info("Error in webserver");
		failureMessage.message = "Unable to connect to Facebook, please try again later";
		failureMessage.show();
		win.close();
	};
	var url = "http://graph.facebook.com/search?q=" + escape(win.venueName + " " + win.venueCity) + "&type=event&limit=50";

	Ti.API.info(url);

	xhr.open("GET",url);

	xhr.send();

}

callService();
