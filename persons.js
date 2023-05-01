
function make_person(id, fmt, lang = "ru") {
    var person = false;
    for(var i = 0; i < persons.length; i++) {
	if(persons[i].id == id) {
	    var pers = persons[i];
	    for(var j = 0; j < pers.name.length; j++) {
		if(pers.name[j].lang == lang) {
		    person = pers.name[j]
		}
	    }
	}
    }
    if(fmt == "si") { // surname + initials
	return person.surname + "&nbsp;" + person.initials;
    }
    else if(fmt == "is") { // surname + initials
	return person.initials + "&nbsp;" + person.surname;
    }
}

function make_person_lst(lst, fmt, lang) {
    var ps = [];
    for(var i = 0; i < lst.length; i++) {
      	ps.push(make_person(lst[i], fmt, lang));
    }
    return ps.join(", ");
};
