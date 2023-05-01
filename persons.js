
var persons = {
    _data: {},			// data loaded in data.js
    _make: function(id, fmt, lang = "ru") {
	var person = this._data[id].name[lang];
	if(fmt == "si") { // surname + initials
	    return person.surname + "&nbsp;" + person.initials;
	}
	else if(fmt == "is") { // surname + initials
	    return person.initials + "&nbsp;" + person.surname;
	}
    },
    lst: function(lst, fmt, lang) {
	var plist = [];
	for(var i = 0; i < lst.length; i++) {
            plist.push(this._make(lst[i], fmt, lang));
	}
	return plist.join(", ");
    }
};
