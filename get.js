// Working with GET string

var cfg = {
    _defaults: {
	"show_dbs": "true",
	"keyword": "all",
	"sort": "age",
	"types": "all",
	"view": "biblio",
	"keyword": "all",
	"show_sections": "false",
	"start": 2011,
	"end": 2022,
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
    set: function(par, val) {
	this._vals[par] = val;
	this._set_get_string();
	update_form();
    },
    _set_get_string: function() {
	var href = window.location.href;
	href = href.replace(/\?.*$/, ''); // remove GET string
	var par_strings = [];
	for([par, val] of Object.entries(this._vals)) {
	    if(this._vals[par] != this._defaults[par]) {
		par_strings.push(par + "=" + val);
	    }
	}
	var str = par_strings.join("&");
	if(str) href += "?" + str;
	window.history.pushState({"pageTitle":"Title"},"", href);
    }
}
