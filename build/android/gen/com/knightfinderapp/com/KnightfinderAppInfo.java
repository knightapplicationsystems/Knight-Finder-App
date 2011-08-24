package com.knightfinderapp.com;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.titanium.util.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class KnightfinderAppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";
	
	public KnightfinderAppInfo(TiApplication app) {
		TiProperties properties = app.getSystemProperties();
					
					properties.setString("ti.deploytype", "development");
	}
	
	public String getId() {
		return "com.knightfinderapp.com";
	}
	
	public String getName() {
		return "KnightFinder";
	}
	
	public String getVersion() {
		return "1.0";
	}
	
	public String getPublisher() {
		return "Knight Application Systems";
	}
	
	public String getUrl() {
		return "http://www.knightfinderapp.com";
	}
	
	public String getCopyright() {
		return "2011 by Knight Application Systems";
	}
	
	public String getDescription() {
		return "Knight Finder for Android and iPhone";
	}
	
	public String getIcon() {
		return "appicon.png";
	}
	
	public boolean isAnalyticsEnabled() {
		return true;
	}
	
	public String getGUID() {
		return "76f1037c-f371-4982-925c-514695f2e21d";
	}
	
	public boolean isFullscreen() {
		return false;
	}
	
	public boolean isNavBarHidden() {
		return false;
	}
}
