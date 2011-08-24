/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var url;
var lblNames;
var txtNames;
var btnPublish;
var fbLogin;
var fbEventID;
var btnDone;
var btnAddToWall;
win = Titanium.UI.currentWindow;
win.backgroundColor = 'stripped';

fbEventID = win.eventID;

fbLogin = Titanium.Facebook.createLoginButton({
	'style':'wide',
	'apikey':'149e793a30b220f5466bbc4282b4e9b6',
	'secret':'f754ce3d1e6450ade6dd5fd6a42091b5',
	top:10,
	left:10
});
Titanium.Facebook.appid = '201157783235797';

lblNames = Ti.UI.createLabel({
	text: 'Add Names below:',
	color: 'Black',
	textAlign:'left',
	left:10,
	top:50,
	height:'auto',
	font: {
		fontWeight:'bold',
		fontSize:13
	}
});

txtNames = Ti.UI.createTextArea({
	height:100,
	top:90,
	left:10,
	width:200,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	font: {
		fontSize:15,
		fontStyle:'Arial'
	},
	suppressReturn:false,
	borderWidth:2,
	borderColor:'#bbb',
	borderRadius:5

});

txtNames.addEventListener('focus', function(e) {
	btnDone.visible = true;
});
btnDone = Titanium.UI.createButtonBar({
	top:90,
	right:30,
	width:60,
	height:40,
	labels:['Done'],
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	font: {
		fontSize:15,
		fontFamily:'Arial',
		fontWeight:'bold'
	}

});

btnDone.addEventListener('click', function(e) {
	txtNames.blur();
	btnDone.visible = false;
});
btnAddToWall = Titanium.UI.createButtonBar({
	top:200,
	left:10,
	width:200,
	height:40,
	labels:['Add Names'],
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	font: {
		fontSize:15,
		fontFamily:'Arial',
		fontWeight:'bold'
	}

});

btnAddToWall.addEventListener('click', function(e) {
	if (txtNames.value == null) {
		alertMessage.message = 'You must add some names';
	} else {
		if (Titanium.Facebook.loggedIn) {
			fbStuff();
		} else {
			alert("You must be logged into Facebook!");
		}
	}
});
function fbStuff() {

	Titanium.Facebook.permissions = ['publish_stream'];
	Titanium.Facebook.authorize();
	Titanium.Facebook.requestWithGraphPath(fbEventID+'/feed', {
		message: txtNames.value + ' Added by KnightFinder for iPhone',
		caption:"Knight Finder for iPhone" ,
		link:"http://itunes.apple.com/gb/app/knight-finder/id408243712?mt=8m"
	}, "POST", function(e) {
		if (e.success) {
			alert("Your names have been added to the Event Wall");
			win.close();
		} else {
			if (e.error) {
				alert("A problem has occured uploading to Facebook");
			} else {
				alert("Unkown result");
			}
		}
	});
}

btnDone.visible = false;
win.add(fbLogin,lblNames,txtNames,btnDone,btnAddToWall);