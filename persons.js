var persons = [
    {
	id: "self",
	surname: "Моренко",
	initials: "К.&nbspС."
    },
    {
	id: "step",
	surname: "Степанчук",
	initials: "Г.&nbsp;В."
    }
];

function make_person(id, fmt) {
    for(var i = 0; i < persons.length; i++) {
	if(persons[i].id == id) {
	    var person = persons[i];
	}
    }
    if(fmt == "si") { // surname + initials
	return person.surname + "&nbsp;" + person.initials;
    }
}

function make_person_lst(lst, fmt) {
    var ps = [];
    for(var i = 0; i < lst.length; i++) {
      	ps.push(make_person(lst[i], fmt));
    }
    return ps.join(", ");
};
