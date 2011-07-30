/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var webViewAppMain;
var appTitle = 'Knight Finder';
var url;
var xhr = Titanium.Network.createHTTPClient();;


//Window Loading section
win = Titanium.UI.currentWindow;
win.title = appTitle;
url = "http://10.0.2.2:8888/KnightFinderApp";
Titanium.Geolocation.locationServicesEnabled==true;


webview = Ti.UI.createWebView({height:'100%',width:'100%'});
webview.url = url;
xhr.open('GET', url);
xhr.send();
win.add(webview);
