// Working with GET string

var get = {
    defaults: {
	"show_dbs": "true",
	"keyword": "all"
    },
    clean: function() {
	var href = window.location.href;
	href = href.replace("&&", "&");
	href = href.replace(/&$/, '');
	href = href.replace(/\?&/, '?');
	href = href.replace(/\?$/, '');
	window.history.pushState({"pageTitle":"Title"},"", href);
    },
    rm: function(par) {
	// remove par from GET string
	var href = window.location.href;
	var regex = new RegExp(par + "=[^&]*");
	href = href.replace(regex, '');
	window.history.pushState({"pageTitle":"Title"},"", href);
	get.clean();
    },
    _set: function(par, val) {
	get.rm(par);
	var href = window.location.href;
	delim = "?";
	if(href.match(/\?/)) {
	    delim = "&";
	}
	href += delim + par + "=" + val;
	window.history.pushState({"pageTitle":"Title"},"", href);
    },
    set: function(par, val) {
	if(par in this.defaults && val == this.defaults[par]) this.rm(par);
	else this._set(par, val);
    },
    _get: function(par) {
	// get par from GET string
	var href = window.location.href;
	var str = href.match(new RegExp(par + "=[^&]*"));
	if(str) {
	    return str[0].replace(/^.*=/, '');
	}
	else {
	    return null;
	}
    },
    get: function(par) {
	var g = this._get(par);
	if(g) return g;
	else return this.defaults[par];
    }
}
