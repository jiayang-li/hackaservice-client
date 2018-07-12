CORDOVA SETUP
--------------------------------------------------------------------------------------------------------------------------
It is recommended to do all the installation and setup steps while in the administrator CMD prompt!

Download and install Node (includes NPM)   
    8.9.1 was used for this
Download and install the stable Java SDK
	1.8.1_171 was used for this
Download latest stable Android SDK: (https://developer.android.com/studio/index.html#win-bundle)
	Include Android 8.0 (Oreo), API Level 26 for the current version of Cordova

--------------------------------------------------------------------------------------------------------------------------

Setup NPM Proxy connections (This must be completed each time you open the command line if you need to download or install packages)
> npm config set proxy "http://##ADID##:##PASSWORD##@proxy.njc.ups.com:8080/"
> npm config set https-proxy http://##ADID##:##PASSWORD##@proxy.njc.ups.com:8080/

--------------------------------------------------------------------------------------------------------------------------

Install Cordova:
> npm install -g cordova

--------------------------------------------------------------------------------------------------------------------------

Install Ionic:
> npm install -g Ionic

--------------------------------------------------------------------------------------------------------------------------

Create a new Ionic Project:
> ionic start myTestApp tabs
	Update config.xml as needed (Don’t break it!)

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
-- ANYTHING BELOW THIS POINT HAS YET TO BE UPDATED BY JOE
--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
Configure target (Android and iOS) deployments:
cd into project directory (i.e.: cd grid <enter>)
>cordova platform add android
>cordova platform add ios
 
Add packages to access device features/sensors:
(Yellow warnings are normal, and will display when compatibility packages are skipped for older versions)

Device Information
 	>cordova plugin add cordova-plugin-device
 	Allows for the polling of device and platform information

Flashlight
	>cordova plugin add cordova-plugin-flashlight
	Allows the application to toggle on/off the phone’s camera flash as a flashlight
Camera (returns exif information as well)
	>cordova plugin add cordova-plugin-camera-with-exif
	Allows the application to open the device’s camera to take a picture that also returns the geo     
               location data (if available)
Barcode Scanner
 	>cordova plugin add phonegap-plugin-barcodescanner	
 	Allows application to open the camera, scan a barcode, and return the value as a string	
Geo Location
	>cordova plugin add cordova-plugin-geolocation
	Allows access to the device’s latitude and longitute
Notifications
	> cordova plugin add phonegap-plugin-local-notification
	Allows the application to access the notification bar from the background
Stop watch / Clock timer 
Check Prerequisites and requirements for target platforms:
>cordova requirements
At this step, if there are any warnings (such as android version), they will have to be addressed in the relevant SDK.
For example:

 
 
 
It’s also possible to run into an “Android Target: Not Installed” error. In this case, Cordova is not able to see the proper Android SDK version. First, confirm that the correct SDK version is installed. If that is not the issue, attempt to reboot and confirm your Path directories (ANDROID_HOME and PATH) in Environment Variables. PATH should include 
Environment Variables
•	JAVA_HOME -> Java SDK
o	i.e. C:\Program Files\Java\jdk1.8.0_131
•	ANDROID_HOME -> Android SDK
o	i.e. C:\Users\{{ADID}}\AppData\Local\Android\Sdk
•	PATH -> Key runtimes
o	JAVA SDK
	i.e. C:\Program Files\Java\jdk1.8.0_131\bin
o	npm & gradle (may be automatically added during installation)
	i.e. C:\Users\{{ADID}}\AppData\Roaming\npm
	i.e. C:\gradle\bin
o	Android Tools/Platform Tools
	i.e. C:\Users\YDX8VSG\AppData\Local\Android\Sdk\tools
	i.e. C:\Users\YDX8VSG\AppData\Local\Android\Sdk\platform-tools
		
Assemble your application
Test via emulator:
> cordova emulate android

--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
ERRORS ENCOUNTERED!
--------------------------------------------------------------------------------------------------------------------------
So…. Install Gradle zip by going of network.. and it will give you the dots . . . . . . . 
Then it will run into an issue (I can’t remember what exactly it was)
And then you have to back on network and rebuild the solution 

UNABLE TO START THE DAEMON PROCESS….
---- "GOD FIX" (https://stackoverflow.com/questions/40385165/ionic-android-build-failed-unable-to-start-the-daemon-process)

Package name: io.ionic.starter
(node:13428) UnhandledPromiseRejectionWarning: CordovaError: Failed to install apk to device: [  0%] /data/local/tmp/app-debug.apk
[INSTALL_FAILED_UPDATE_INCOMPATIBLE]
---- Uninstall the app and then just rebuild