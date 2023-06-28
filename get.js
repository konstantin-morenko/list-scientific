// Working with GET string

var cfg = {
    _defaults: {
	"show_dbs": "true",
	"keyword": "all",
	"sort": "age",
	"types": "all",
	"view": "biblio",
	"show_sections": "false",
	"start": 2011,
	"end": 2023, // Initiated with init() into index
	"show_dbs": "true"
    },
    _vals: {
    },
    _get: function(par) {
	var href = window.location.href;
	var str = href.match(new RegExp(par + "=[^&]*"));
	if(str) return str[0].replace(/^.*=/, '');
	else return null;
    },
    parse: function() {
	for([par,val] of Object.entries(this._defaults)) {
	    get_v = this._get(par);
	    this._vals[par] = get_v || this._defaults[par];
	}
    },
    get: function(par) {
	return this._vals[par];
    },
    _set: function(par, val) {
	this._vals[par] = val;
    },
    set: function(par, val) {
	this._set(par, val);
	this._update();
	update();
    },
    _set_title_string: function() {
	var href = window.location.href;
	href = href.replace(/\?.*$/, ''); // remove GET string
	var par_strings = [];
	for([par, val] of Object.entries(this._vals)) {
	    if(!this._isdefault(par)) {
		par_strings.push(par + "=" + val);
	    }
	}
	if(par_strings.length) href += "?" + par_strings.join("&");
	window.history.replaceState({"pageTitle":this._header_string()},
				    "",
				    href);
	document.title = this._header_string();
    },
    _isdefault: function(par) {
	return this._vals[par] == this._defaults[par];
    },
    reset: function(par) {
	self.set(par, this._defaults[par]);
    },
    _header_string: function() {
	meta = ["Научные_труды_Моренко"];
	if(!this._isdefault("start") || !this._isdefault("end")) {
	    meta.push((this._isdefault("start") ? "" : this.get("start"))
		      + "-"
		      + (this._isdefault("end") ? "нв" : this.get("end")));
	}
	if(!this._isdefault("keyword")) {
	    meta.push(keywords[this.get("keyword")].name);
	}
	if(!this._isdefault("types")) {
	    meta.push(this.get("types"));
	}
	if(!this._isdefault("view")) {
	    meta.push(this.get("view"));
	}
	var date = new Date();
	meta.push([String(date.getDate()).padStart(2, "0"),
		   String(date.getMonth() + 1).padStart(2, "0"),
		   date.getFullYear()].join("_"));
	return meta.join("_");
    },
    _update: function() {
	if(cfg.get("view") == "table") {
	    cfg._set("types", "all");
	    cfg._set("sort", "vak");
	    cfg._set("show_sections", "true");
	    cfg._set("keyword", "all");
	    cfg._set("show_dbs", "false");
	}
	this._set_title_string();
    }
}
