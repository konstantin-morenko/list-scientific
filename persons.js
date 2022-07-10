var persons = [
    {
	id: "self",
	name: [
	    {
		lang: "ru",
		surname: "Моренко",
		initials: "К.&nbspС."
	    },
	    {
		lang: "en",
		surname: "Morenko",
		initials: "K.&nbsp;S."
	    }
	]
    },
    {
	id: "step",
	name: [
	    {
		lang: "ru",
		surname: "Степанчук",
		initials: "Г.&nbsp;В."
	    }
	]
    },
    {
	id: "brag",
	name: [
	    {
		lang: "ru",
		surname: "Брагинец",
		initials: "А.&nbsp;В."
	    }
	]
    },
    {
	id: "gazal",
	name: [
	    {
		lang: "ru",
		surname: "Газалов",
		initials: "В.&nbsp;С."
	    }
	]
    },
    {
	id: "belen",
	name: [
	    {
		lang: "ru",
		surname: "Беленов",
		initials: "В.&nbsp;Н."
	    }
	]
    },
    {
	id: "serg",
	name: [
	    {
		lang: "ru",
		surname: "Моренко",
		initials: "С.&nbsp;А."
	    }
	]
    },
    {
	id: "dorzh",
	name: [
	    {
		lang: "ru",
		surname: "Доржиев",
		initials: "С.&nbsp;С."
	    },
	    {
		lang: "en",
		surname: "Dorzhiev",
		initials: "S.&nbsp;S.",
	    }
	]
    },
    {
	id: "bazar",
	name: [
	    {
		lang: "ru",
		surname: "Базарова",
		initials: "Е.&nbsp;Г."
	    },
	    {
		lang: "en",
		surname: "Bazarova",
		initials: "E.&nbsp;G."
	    }
	]
    },
    {
	id: "serebr",
	name: [
	    {
		lang: "ru",
		surname: "Серебряков",
		initials: "Р.&nbsp;А."
	    }
	]
    },
    {
	id: "tikh",
	name: [
	    {
		lang: "ru",
		surname: "Тихонов",
		initials: "П.&nbsp;В."
	    }
	]
    },
    {
	id: "harch",
	name: [
	    {
		lang: "ru",
		surname: "Харченко",
		initials: "В.&nbsp;В."
	    }
	]
    },
    {
	id: "komiss",
	name: [
	    {
		lang: "ru",
		surname: "Комиссаров",
		initials: "Н.&nbsp;С."
	    }
	]
    },
    {
	id: "sych",
	name: [
	    {
		lang: "ru",
		surname: "Сычев",
		initials: "А.&nbsp;О."
	    }
	]
    },
    {
	id: "bugr",
	name: [
	    {
		lang: "ru",
		surname: "Бугреев",
		initials: "В.&nbsp;А."
	    }
	]
    },
    {
	id: "rozen",
	name: [
	    {
		lang: "ru",
		surname: "Розенблюм",
		initials: "М.&nbsp;И."
	    },
	    {
		lang: "en",
		surname: "Rozenblum",
		initials: "M.&nbsp;I."
	    }
	]
    }
];

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
}

function make_person_lst(lst, fmt, lang) {
    var ps = [];
    for(var i = 0; i < lst.length; i++) {
      	ps.push(make_person(lst[i], fmt, lang));
    }
    return ps.join(", ");
};
