
var iosHelper = require("./lib/ios-helper");
var utilities = require("./lib/utilities");

module.exports = function(context) {

    var platforms = context.opts.cordova.platforms;

    // Modify the Gradle build file to add a task that will upload the debug symbols
    // at build time.
    if (platforms.indexOf("android") !== -1) {
    	return;
    }

    console.log("run add script.");
    // Add a build phase which runs a shell script that executes the Crashlytics
    // run command line tool which uploads the debug symbols at build time.
    if (platforms.indexOf("ios") !== -1) {
        var xcodeProjectPath = utilities.getXcodeProjectPath(context);
    	console.log("xcodeProjectPath=" + xcodeProjectPath);
        iosHelper.removeShellScriptBuildPhase(context, xcodeProjectPath);
        iosHelper.addShellScriptBuildPhase(context, xcodeProjectPath);
    }
};