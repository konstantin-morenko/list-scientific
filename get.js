// Working with GET string
var get = {
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
    set: function(par, val) {
	// set/update par in GET string
	get.rm(par);
	var href = window.location.href;
	delim = "?";
	if(href.match(/\?/)) {
	    delim = "&";
	}
	href += delim + par + "=" + val;
	window.history.pushState({"pageTitle":"Title"},"", href);
    },
    get: function(par) {
	// get par from GET string
	var href = window.location.href;
	var str = href.match(new RegExp(par + "=[^&]*"));
	if(str) {
	    return str[0].replace(/^.*=/, '');
	}
	else {
	    return null;
	}
    }
}
