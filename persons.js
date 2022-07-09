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
    },
    {
	id: "brag",
	surname: "Брагинец",
	initials: "А.&nbsp;В."
    },
    {
	id: "gazal",
	surname: "Газалов",
	initials: "В.&nbsp;С."
    },
    {
	id: "belen",
	surname: "Беленов",
	initials: "В.&nbsp;Н."
    },
    {
	id: "serg",
	surname: "Моренко",
	initials: "С.&nbsp;А."
    },
    {
	id: "dorzh",
	surname: "Доржиев",
	initials: "С.&nbsp;С."
    },
    {
	id: "bazar",
	surname: "Базарова",
	initials: "Е.&nbsp;Г."
    },
    {
	id: "serebr",
	surname: "Серебряков",
	initials: "Р.&nbsp;А."
    },
    {
	id: "tikh",
	surname: "Тихонов",
	initials: "П.&nbsp;В."
    },
    {
	id: "harch",
	surname: "Харченко",
	initials: "В.&nbsp;В."
    },
    {
	id: "komiss",
	surname: "Комиссаров",
	initials: "Н.&nbsp;С."
    },
    {
	id: "sych",
	surname: "Сычев",
	initials: "А.&nbsp;О."
    },
    {
	id: "bugr",
	surname: "Бугреев",
	initials: "В.&nbsp;А."
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
