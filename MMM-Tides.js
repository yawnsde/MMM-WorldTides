/* global Module */

/* Magic Mirror
 * Module: MMM-Tides
 *
 * By Stefan Krause http://yawns.de
 * MIT Licensed.
 */

Module.register('MMM-Tides',{
	
	defaults: {
		longitude: "",
		latitude: "",
		displayName: "",
		length: "",
		appid: "",
		units: config.units,
		animationSpeed: 1000,
		updateInterval: 1000 * 3600 * 24, //update every 24 hours
		timeFormat: config.timeFormat,
		lang: config.language,

		initialLoadDelay: 0, // 0 seconds delay
		retryDelay: 2500,

		apiBase: "http://www.worldtides.info/api",				
	},
	
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	start: function() {
		Log.info('Starting module: ' + this.name);
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;		

		var self = this;
		setInterval(function() {
			self.updateDom();
		}, this.config.animationSpeed);

	},

	getDom: function() {
		var wrapper = document.createElement("div");

		if (this.config.appid === "") {
			wrapper.innerHTML = "Please set the correct worldtides.info <i>appid</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (this.config.longitude === "" || this.config.latitude === "") {
			wrapper.innerHTML = "Please set the worldtides.info <i>longitude/latitude</i> in the config for module: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = "dimmed light small";
			return wrapper;
		}		

		wrapper.className = "small";

		var platzhalter = document.createElement("span");
		platzhalter.style.backgroundColor = '#FF0000';
		
		for (var i in this.tides) {
			platzhalter.innerHTML += this.tides[i].type + "&nbsp;";
		}

		wrapper.appendChild(platzhalter);

/*
		var spacer = document.createElement("span");
		spacer.innerHTML = "&nbsp;";
		var temperature_symbol =  document.createElement("span");
		temperature_symbol.className = "fa fa-home";
		var humidity_symbol =  document.createElement("span");
		humidity_symbol.className = "fa fa-tint";

		var temperature = Math.random().toFixed(2);
		var humidity = Math.random().toFixed(2);

		wrapper.appendChild(temperature_symbol);
		var temperature_text = document.createElement("span");
		temperature_text.innerHTML = " " + temperature + "&deg;";
		wrapper.appendChild(temperature_text);

		wrapper.appendChild(spacer);

		wrapper.appendChild(humidity_symbol);
		var humidity_text = document.createElement("span");
		humidity_text.innerHTML = " " + humidity + "%";
		wrapper.appendChild(humidity_text);
*/
		return wrapper;
	},

	/* updateTides(compliments)
	 * Requests new data from worldtides.info
	 * Calls processTides on succesfull response.
	 */
	updateTides: function() {
		var url = this.config.apiBase + this.getParams();
		var self = this;
		var retry = true;

		var tidesRequest = new XMLHttpRequest();
		tidesRequest.open("GET", url, true);
		tidesRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processTides(JSON.parse(this.response));
				} else if (this.status === 400) {
					self.config.appid = "";
					self.updateDom(self.config.animationSpeed);

					Log.error(self.name + ": Incorrect APPID.");
					retry = false;
				} else {
					Log.error(self.name + ": Could not load tides.");
				}

				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};
		tidesRequest.send();
	},

	/* getParams
	 * Generates an url with api parameters based on the config.
	 *
	 * return String - URL params.
	 */
	getParams: function() {
		var params = "?extremes";
		params += "&lat=" + this.config.latitude;
		params += "&lon=" + this.config.longitude;
		if(this.config.length !== "") {
			params += "&length=" + this.config.length;
		} 		
		params += "&key=" + this.config.appid;

		return params;
	},

	/* processTides(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - tide information received form worldtides.info
	 */
	processTides: function(data) {

		if (!data.extremes) {
			// Did not receive usable new data.
			// Maybe this needs a better check?
			return;
		}

		this.tides = [];

		for (var i in data.extremes) {
			var t = data.extremes[i];
			this.tides.push({

				dt: t.dt,
				time: ((this.config.timeFormat === 24) ? moment(t.dt, "X").format("HH:mm") : moment(t.dt, "X").format("hh:mm")), 
				type: t.type
			});
		}
		Log.error(this.tides);

		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function() {
			self.updateTides();
		}, nextLoad);
	},

});