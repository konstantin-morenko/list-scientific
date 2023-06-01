// Make bibliographic view

var biblio = {
    make: function() {
	this.assign_vak_types();
	if(cfg.get("view") == "biblio") {
	    var list = this.biblio_list();
	    document.getElementById("content").innerHTML = "";
	    for(var i = 0; i < list.length; i++) {
		document.getElementById("content").appendChild(list[i]);
	    }
	}
	else if(cfg.get("view") == "table") {
	    document.getElementById("content").innerHTML = "";
	    table = document.createElement("table");
	    th = document.createElement("tr");

	    r1 = document.createElement("th");
	    r1.innerHTML = "№";
	    th.appendChild(r1);

	    r2 = document.createElement("th");
	    r2.innerHTML = "Наименование";
	    th.appendChild(r2);

	    r3 = document.createElement("th");
	    r3.innerHTML = "Рукопись или печатное";
	    th.appendChild(r3);

	    r4 = document.createElement("th");
	    r4.innerHTML = "Название издательства, журнала (номер, год) или номер авторского свидетельства";
	    th.appendChild(r4);

	    r5 = document.createElement("th");
	    r5.innerHTML = "Кол-во печатных листов или страниц";
	    th.appendChild(r5);

	    r6 = document.createElement("th");
	    r6.innerHTML = "Фамилия соавторов";
	    th.appendChild(r6);

	    thead = document.createElement("thead");
	    thead.appendChild(th);
	    table.appendChild(thead);

	    tbody = document.createElement("tbody");

	    var rows = this.biblio_table();
	    for(var i = 0; i < rows.length; i++) {
		tbody.appendChild(rows[i]);
	    }
	    table.appendChild(tbody);
	    document.getElementById("content").appendChild(table);
	}
    },
    assign_vak_types: function() {
	for(var i = 0; i < papers.length; i++) {
	    if(!Object.hasOwn(papers[i], "vak_type")) {
		var vak_type = "other";
		switch(papers[i].type) {
		case "jart":
		case "cart":
		case "book":
		case "chap":
		case "phd-thes":
		case "phd-aref": vak_type = "scientific"; break;
		case "pat": vak_type = "patent"; break;
		default: vak_type = "other"; break;
		}
		papers[i].vak_type = vak_type;
	    }
	}
    },
    biblio_list: function() {
	var list = [];
	for(var i = 0; i < papers.length; i++) {
	    list.push(record.make(papers[i]));
	}
	switch(cfg.get("sort")) {
	case "age": return this.sort_age(list);
	case "type": return this.sort_types(list);
	case "vak": return this.sort_vak_types(list);
	default: return this.sort_types(list);
	}
    },
    biblio_table: function() {
	var list = [];
	for(var i = 0; i < papers.length; i++) {
	    list.push(table_row.make(papers[i]));
	}
	return this.sort_vak_types(list);
    },
    sort_types: function(list) {
	list.sort(this._sort_types);
	section = "";
	for(var i = 0; i < list.length; i++) {
	    if(section != list[i].getAttribute("data-type")) {
		section = list[i].getAttribute("data-type");
		var sect = document.createElement("p");
		sect.classList.add("section");
		sect.classList.add("hidden");
		sect.setAttribute("data-type", section);
		sect.innerHTML = data_types[section].sect_name;
		list.splice(i, 0, sect);
	    }
	}
	return list;
    },
    _sort_types: function(a, b) {
	function typew(obj) {
	    switch(obj.getAttribute("type")) {
	    case "jart": return 1; break;
	    case "cart": return 2; break;
	    case "book": return 3; break;
	    case "chap": return 4; break;
	    case "phd-thes": return 5; break;
	    case "phd-aref": return 5; break;
	    case "pat": return 6; break;
	    default: return 99; break;
	    }
	}
	return typew(a) - typew(b);
    },
    sort_vak_types: function(list) {
	function make_el(inner) {
	    if(cfg.get("view") == "table") {
		el = document.createElement("tr");
		td = document.createElement("td");
		td.setAttribute("colspan", 6);
		td.innerHTML = inner;
		el.appendChild(td);
	    }
	    else {
		el = document.createElement("p");
		el.innerHTML = inner;
	    }
	    return el;
	}

	list.sort(this._sort_vak_types);
	section = "";
	for(var i = 0; i < list.length; i++) {
	    if(section != list[i].getAttribute("data-vak-type")) {
		section = list[i].getAttribute("data-vak-type");
		switch(section) {
		case "scientific": inner = "Научные труды"; break;
		case "education": inner = "Учебные и учебно-методические труды"; break;
		case "patent": inner = "Патенты"; break;
		case "other": inner = "Прочие труды"; break;
		default: inner = "Прочие"; break;
		}
		var sect = make_el(inner);
		sect.classList.add("section");
		sect.classList.add("hidden");
		sect.setAttribute("data-vak-type", section);
		list.splice(i, 0, sect);
	    }
	}
	return list;
    },
    _sort_vak_types: function(a, b) {
	function typew(obj) {
	    switch(obj.getAttribute("data-vak-type")) {
	    case "scientific": return 1; break;
	    case "education": return 2; break;
	    case "patent": return 3; break;
	    case "other": return 4; break;
	    default: return 99; break;
	    }
	}
	if(typew(a) != typew(b)) return typew(a) - typew(b);
	else return a.getAttribute("data-year") - b.getAttribute("data-year");
    },
    sort_age: function(list) {
	list.sort(this._sort_age);
	var year = 0;
	for(i = 0; i < list.length; i++) {
	    if(year != list[i].getAttribute("data-year")) {
		year = list[i].getAttribute("data-year");
		var sect = document.createElement("p");
		sect.classList.add("section");
		sect.classList.add("hidden");
		sect.setAttribute("data-year", year);
		sect.innerHTML = year;
		list.splice(i, 0, sect);
	    }		
	}
	return list;
    },    
    _sort_age: function(a, b) {
	return a.getAttribute("data-year") - b.getAttribute("data-year");
    },
    _sort_vak: function(a, b) {
	function typew(obj) {
	    switch(obj.getAttribute("type")) {
	    case "jart":
	    case "cart":
	    case "book":
	    case "chap":
	    case "phd-thes":
	    case "phd-aref": return 1; break;
	    case "pat": return 3; break;
	    default: return 99; break;
	    }
	}
	return typew(a) - typew(b);
    }
}

var table_row = {
    make: function(paper) {
	return this.wrap(paper);
    },
    wrap: function(paper) {
	var row = document.createElement("tr");
	row.classList.add("record");
	row.setAttribute("data-year", paper.year);
	row.setAttribute("data-pages", paper.value.total);
	row.setAttribute("data-type", paper.type);
	row.setAttribute("data-vak-type", paper.vak_type);
	row.innerHTML = this.string(paper);
	return row;
    },
    string: function(paper) {
	return "<td></td>"
	    + "<td>" + paper.title + "</td>"
	    + "<td>печ.</td>"
	    + "<td>" + paper.printed + "</td>"
	    + "<td>" + paper.value.total + "&nbspс.</td>"
	    + "<td>" + persons.lst(paper.coauthors, "si", paper.lang) + "</td>";
    }
}

var record = {
    make: function(paper) {
	return this.wrap(paper);
    },
    wrap: function(paper) {
	// Wrap preserving data-
	var para = document.createElement("p");
	para.classList.add("record");
	para.setAttribute("data-year", paper.year);
	para.setAttribute("data-pages", paper.value.total);
	para.setAttribute("data-type", paper.type);
	para.setAttribute("data-vak-type", paper.vak_type);
	if("keywords" in paper) {
	    para.setAttribute("data-keywords", paper.keywords.join());
	}
	var text = document.createElement("span");
	text.classList.add("reference");
	text.addEventListener("dblclick", copy_content, true); 
	text.innerHTML = this.string(paper);
	para.appendChild(text);
	if(paper.keywords) {
	    for(i = 0; i < paper.keywords.length; i++) {
		kw = document.createElement("span");
		kw.classList.add("keyword");
		kw.classList.add("screen-only");
		kw.setAttribute("data-keyword", paper.keywords[i]);
		kw.addEventListener("click", filter_kw);
		kw.innerHTML = this.keyword(paper.keywords[i]);
		para.appendChild(kw);
	    }
	}
	if(paper.links) {
	    for(i = 0; i < paper.links.length; i++) {
		ln = document.createElement("span");
		ln.classList.add("link");
		ln.classList.add("screen-only");
		a = document.createElement("a");
		a.setAttribute("href", paper.links[i].url);
		a.setAttribute("target", "_blank");
		a.innerHTML = paper.links[i].name;
		ln.appendChild(a);
		para.appendChild(ln);
	    }
	}
	return para;
    },
    keyword: function(kw) {
	if(kw in keywords) return keywords[kw].name;
	else return kw;
    },
    string: function(paper) {
	if(paper.type == "jart"	// Journal article
	   || paper.type == "cart" // Collection article
	   || paper.type == "book"
	   || paper.type == "chap") { // Chapter
	    return this.jcart(paper);
	}
	else if(paper.type == "pat") {
	    return this.pat(paper);
	}
	else if(paper.type == "phd-thes") {
	    return this.thes(paper);
	}
	else if(paper.type == "phd-aref") {
	    return this.aref(paper);
	}
	else {
	    var para = document.createElement("p");
	    para.innerHTML = "No function to show " + paper.type;
	    return para;
	}
    },
    jcart: function(paper) {
	// Journal & Collection Article
	var coauthors = paper.coauthors.slice(); // copying because of unshift
	coauthors.unshift("self");
	return persons.lst(coauthors, "si", paper.lang)
	    + " " + paper.title
	    + "&nbsp;// " + paper.printed;
    },
    pat: function(paper) {
	// Patent
	var coauthors = paper.coauthors.slice(); // copying because of unshift
	coauthors.unshift("self");
	return paper.title
	    + " / " + persons.lst(coauthors, "is", paper.lang) + ";"
	    + " " + paper.printed;
    },
    aref: function(paper) {
	// Abstract
	var coauthors = paper.coauthors.slice(); // copying because of unshift
	coauthors.unshift("self");
	return persons.lst(coauthors, "si", paper.lang)
	    + " " + paper.title
	    + " / " + persons.lst(coauthors, "is", paper.lang)
	    + " — " + paper.printed;
    },
    thes: function(paper) {
	// Thesis
	var coauthors = paper.coauthors.slice(); // copying because of unshift
	coauthors.unshift("self");
	return persons.lst(coauthors, "si", paper.lang)
	    + " " + paper.title
	    + " / " + persons.lst(coauthors, "is", paper.lang)
	    + " — " + paper.printed;
    }
}

// Make table view
function make_table() {}
// - номер
// - наименование (название)
// - вид (тип)
//   - статья (журнал jart, сборник cart)
//   - автореферат autoref
//   - отчет о нир - исключен
//   - глава chapt
//   - книга/монография book
//   - патент pat
//   - прочее - other
// - выходные данные (издательство/журнал, год, номер, страница/страниц)
// - объем (всего, собственных)
// - соавторы


// Exactly one record
function make_row() {}

// Update view
function make_content() {
    //var content = document.getElementById("content");
    //make_biblio(content);
    biblio.make();
}


var filter = {
    get_els: function() {
	return document.getElementsByClassName("record");
    },
    proceed: function() {
	biblio.make();
	metainfo.subheader();
	this.showall();
	this.sections();
	this.beginning();
	this.end();
	this.types();
	this.keyword();
	metainfo.make();
    },
    showall: function() {
	var els = this.get_els();
	for(var i = 0; i < els.length; i++) {
	    els[i].classList.remove("hidden");
	}
    },
    sections: function() {
	els = document.getElementsByClassName("section");
	if(cfg.get("show_sections") == "true") {
	    for(var i = 0; i < els.length; i++) {
		els[i].classList.remove("hidden");
	    }
	}
	else {
	    for(var i = 0; i < els.length; i++) {
		els[i].classList.add("hidden");
	    }
	}
    },
    beginning: function() {
	var start = cfg.get("start");
	if(start) {
	    var els = this.get_els();
	    for(var i = 0; i < els.length; i++) {
		if(els[i].getAttribute('data-year') < start) {
		    els[i].classList.add("hidden");
		}
	    }
	    var els = document.getElementsByClassName("section");
	    for(var i = 0; i < els.length; i++) {
		if(els[i].hasAttribute('data-year')
		   && els[i].getAttribute('data-year') < start) {
		    els[i].classList.add("hidden");
		}
	    }
	}
    },
    end: function() {
	var end = cfg.get("end");
	if(end) {
	    var els = this.get_els();
	    for(var i = 0; i < els.length; i++) {
		if(els[i].getAttribute('data-year') > end) {
		    els[i].classList.add("hidden");
		}
	    }
	    var els = document.getElementsByClassName("section");
	    for(var i = 0; i < els.length; i++) {
		if(els[i].hasAttribute('data-year')
		   && els[i].getAttribute('data-year') > end) {
		    els[i].classList.add("hidden");
		}
	    }
	}
    },
    types: function() {
	var els = this.get_els();
	var type = cfg.get("types");
	if(type && type != "all") {
	    for(var i = 0; i < els.length; i++) {
		if(els[i].hasAttribute("data-type")
		   && els[i].getAttribute('data-type') != type) {
		    els[i].classList.add("hidden");
		}
	    }
	    var els = document.getElementsByClassName("section");
	    for(var i = 0; i < els.length; i++) {
		if(els[i].hasAttribute('data-type')
		   && els[i].getAttribute('data-type') != type) {
		    els[i].classList.add("hidden");
		}
	    }
	}
    },
    keyword: function() {
	var kw = cfg.get("keyword");
	if(kw == "all") return;
	var els = this.get_els();
	for(var i = 0; i < els.length; i++) {
	    if(els[i].hasAttribute("data-keywords")) {
		if(els[i].getAttribute("data-keywords").split(",").includes(kw)) {
		    continue;
		}
		else {
		    els[i].classList.add("hidden");
		}
	    }
	    else {
		els[i].classList.add("hidden");
	    }
	}
    },
    describe_filter: function() {
	return "Фильтр: "
	    + ["период: " + this.describe_period(),
	       "тип: " + this.describe_types(),
	       "ключевые слова: " + this.describe_keywords()].join("; ");
    },
    describe_period: function() {
	var start = cfg.get("start");
	if(!start) start = 2011;
	var end = cfg.get("end");
	if(!end) end = 2022;
	if(start == end) return "за " + start + " год";
	else return "с " + start + " года"
	    + " по " + end + " год"
	    + " (" + (end - start + 1)
	    + " " + adapt_words(end - start + 1, ["год", "года", "лет"]) + ")";
    },
    describe_types: function() {
	if(cfg.get("types") == "all") return "все";
	else return data_types[cfg.get("types")].sect_name.toLowerCase();
    },
    describe_keywords: function() {
	if(cfg.get("keyword") == "all") return "все";
	else return keywords[cfg.get("keyword")].name;
    },
    describe_visible: function() {
	return "Отфильтровано " + this.visible_papers() + " " + adapt_words(this.visible_papers(), ["работа", "работы", "работ"])
	    + " общим объемом " + this.visible_pages() + " " + adapt_words(this.visible_pages(), ["страница", "страницы", "страниц"])
    },
    visible_papers: function() {
	var els = this.get_els();
	var count = 0;
	for(var i = 0; i < els.length; i++) {
	    if(!els[i].classList.contains("hidden")) {
		count += 1;
	    }
	}
	return count;
    },
    visible_pages: function() {
	var els = this.get_els();
	var count = 0;
	for(var i = 0; i < els.length; i++) {
            if(!els[i].classList.contains("hidden")) {
		count += parseInt(els[i].getAttribute("data-pages"));
	    }
	}
	return count;
    },
    describe_total: function() {
	return "В полном списке " + this.total_papers() + " " + adapt_words(this.total_papers(), ["работа", "работы", "работ"])
	    + " общим объемом " + this.total_pages() + " " + adapt_words(this.total_pages(), ["страница", "страницы", "страниц"])
    },
    total_papers: function() {
	var els = this.get_els();
	return els.length;
    },
    total_pages: function() {
	var els = this.get_els();
	var count = 0;
	for(var i = 0; i < els.length; i++) {
	    count += parseInt(els[i].getAttribute("data-pages"));
	}
	return count;
    }
}

var metainfo = {
    make: function() {
	this.subheader();
	this.filtered_count();
	this.total_count();
    },
    subheader: function() {
	document.getElementById("period").innerHTML = '<p class="period">' + filter.describe_period() + '</p>';
    },
    filtered_count: function() {},
    total_count: function() {
	document.getElementById("stats-filter").innerHTML = filter.describe_filter();
	document.getElementById("stats-visible").innerHTML = filter.describe_visible();
	document.getElementById("stats-total").innerHTML = filter.describe_total();
    }
}

function filter_content() {
    filter.proceed();
}

function adapt_words(val, variants) {
    // Select correct word depending on number
    if(val % 100 >= 11 && val % 100 <= 19) return variants[2];
    else if(val % 10 == 1) return variants[0];
    else if(val % 10 >= 2 && val % 10 <= 4) return variants[1];
    else return variants[2];
}

var speed_filters = {
    _filters: {
	"reset": {
	    name: "Сбросить все фильтры",
	    filter: function() {
		Object.entries(cfg._defaults).forEach(([p, v]) => {
		    cfg.set(p, v);
		});
	    }
	},
	"last5": {
	    name: "За последние 5 лет",
	    filter: function() {
		var date = new Date();
		cfg.set("start", date.getFullYear() - 5 + 1);
		cfg.set("end", date.getFullYear());
	    }
	},
	"vak-table": {
	    name: "Таблица ВАК",
	    filter: function() {
		cfg.set("view", "table");
	    }
	}
    },
    place: function() {
	var holder = document.getElementById("speed-filters");
	Object.entries(this._filters).forEach(([id, f]) => {
	    var btn = document.createElement("button");
	    btn.innerText = f.name;
	    btn.addEventListener("click", this.apply);
	    btn.setAttribute("data-filter", id);
	    holder.appendChild(btn);
	});
    },
    apply: function(e) {
	e.preventDefault();
	speed_filters._filters[e.target.getAttribute("data-filter")].filter();
    }
}
