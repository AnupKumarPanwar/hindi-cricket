cordova.define("com.guinatal.refreshgallery.pluginRefreshGallery", function(require, exports, module) {
var exec = require("cordova/exec");

// Plugin Refresh Gallery - Android
var RefreshMedia = function() {
};

RefreshMedia.prototype.refresh = function(url) {
	exec(success, error, "PluginRefreshGallery", "refresh", [url]);
};

var success = function(success){
	//alert("Success");
},

error = function(error){
	//alert("Error");
};

window.refreshMedia = new RefreshMedia();
module.exports = refreshMedia;

});
