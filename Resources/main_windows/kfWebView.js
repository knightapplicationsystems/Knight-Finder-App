/**
 * @author Justin Howard - Knight Finder Version 1.3 01/July/2011 - Knight Application Systems
 */

//Local Variables
var win;
var webView;





win = Titanium.UI.currentWindow;


 
 
webView = Titanium.UI.createWebView({url:win.venueWeb});

webView.addEventListener('load',function(e)
{
    var pageTitle = webView.evalJS("document.title"); 
    win.title = pageTitle;
 
});

win.add(webView);









