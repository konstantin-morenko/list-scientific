// Working with GET string
function get_clean() {
    var href = window.location.href;
    href = href.replace("&&", "&");
    href = href.replace(/&$/, '');
    href = href.replace(/\?&/, '?');
    href = href.replace(/\?$/, '');
    window.history.pushState({"pageTitle":"Title"},"", href);
}
function get_rm(par) {
    // remove par from GET string
    var href = window.location.href;
    var regex = new RegExp(par + "=[^&]*");
    href = href.replace(regex, '');
    window.history.pushState({"pageTitle":"Title"},"", href);
    get_clean();
}
function get_set(par, val) {
    // set/update par in GET string
    get_rm(par);
    var href = window.location.href;
    delim = "?";
    if(href.match(/\?/)) {
	delim = "&";
    }
    href += delim + par + "=" + val;
    window.history.pushState({"pageTitle":"Title"},"", href);
}
function get_get(par) {
    // get par from GET string
    var href = window.location.href;
    var str = href.match(new RegExp(par + "=[^&]*"));
    if(str) {
	return str[0].replace(/^.*=/, '');
    }
    else {
	return false;
    }
}
