// Make bibliographic view
function make_biblio(content) {
    for(var i = 0; i < papers.length; i++) {
	content.appendChild(record.make(papers[i]));
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
	para.innerHTML = this.string(paper);
	return para;
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
	return make_person_lst(coauthors, "si", paper.lang)
	    + " " + paper.title
	    + "&nbsp;// " + paper.printed;
    },
    pat: function(paper) {
	// Patent
	var coauthors = paper.coauthors.slice(); // copying because of unshift
	coauthors.unshift("self");
	return paper.title
	    + " / " + make_person_lst(coauthors, "is", paper.lang) + ";"
	    + " " + paper.printed;
    },
    aref: function(paper) {
	// Abstract
	var coauthors = paper.coauthors.slice(); // copying because of unshift
	coauthors.unshift("self");
	return make_person_lst(coauthors, "si", paper.lang)
	    + " " + paper.title
	    + " / " + make_person_lst(coauthors, "is", paper.lang)
	    + " — " + paper.printed;
    },
    thes: function(paper) {
	// Thesis
	var coauthors = paper.coauthors.slice(); // copying because of unshift
	coauthors.unshift("self");
	return make_person_lst(coauthors, "si", paper.lang)
	    + " " + paper.title
	    + " / " + make_person_lst(coauthors, "is", paper.lang)
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
    var content = document.getElementById("content");
    make_biblio(content);
}

function make_header() {
    var hdr = document.getElementById("period");
    var str = "";
    var start = get.get("start");
    var end = get.get("end");
    var period = "";
    if(start && end && start == end) {
	period += "за " + start + " год";
    }
    else {
	if(start) {
	    period += "с " + start;
	    if(!end) {
		period += " года";
	    }
	    else {
		period += " ";
	    }
	}
	if(end) {
	    period += "по " + end + " год";
	}
    }
    period = '<p class="period">' + period + '</p>';
    hdr.innerHTML = str + period;
}

var filter = {
    showall: function() {}
}

function filter_content() {
    make_header();
    filter_show_all();
    filter_start();
    filter_end();
    count_total();
}

function get_elements() {
    return document.getElementsByClassName('record');
}

function filter_show_all() {
    var els = get_elements();
    for(var i = 0; i < els.length; i++) {
	els[i].classList.remove("hidden");
    }
}

function filter_start() {
    var els = get_elements();
    var start = get.get("start");
    if(start) {
	for(var i = 0; i < els.length; i++) {
	    if(els[i].getAttribute('data-year') < start) {
		els[i].classList.add("hidden");
	    }
	}
    }
}

function filter_end() {
    var els = get_elements();
    var end = get.get("end");
    if(end) {
	for(var i = 0; i < els.length; i++) {
	    if(els[i].getAttribute('data-year') > end) {
		els[i].classList.add("hidden");
	    }
	}
    }
}

function count_total() {
    var total_papers = 0;
    var visible_papers = 0;
    var total_pages = 0;
    var visible_pages = 0;

    var els = get_elements();
    for(var i = 0; i < els.length; i++) {
	if(els[i].classList.contains("hidden")) {
	}
	else {
	    visible_papers += 1;
	    visible_pages += parseInt(els[i].getAttribute("data-pages"));
	}
	total_papers += 1;
	total_pages += parseInt(els[i].getAttribute("data-pages"));
    }

    vp_el = document.getElementById("visible-papers");
    vp_el.innerHTML = visible_papers + "&nbsp;" + adapt_words(visible_papers, ["работа", "работы", "работ"]);
    tp_el = document.getElementById("total-papers");
    tp_el.innerHTML = total_papers + "&nbsp;" + adapt_words(total_papers, ["работу", "работы", "работ"]);

    vp_el = document.getElementById("visible-pages");
    vp_el.innerHTML = visible_pages + "&nbsp;" + adapt_words(visible_pages, ["страница", "страницы", "страниц"]);
    tp_el = document.getElementById("total-pages");
    tp_el.innerHTML = total_pages + "&nbsp;" + adapt_words(total_pages, ["страница", "страницы", "страниц"]);
}

function adapt_words(val, variants) {
    // Select correct word depending on number
    var l = val % 10;
    var str = "";
    if(val % 100 >= 11 && val % 100 <= 19) {
	return variants[2];
    }
    else if(l == 1) {
	return variants[0];
    }
    else if(l >= 2 && l <= 4) {
	return variants[1];
    }
    else {
	return variants[2];
    }
}

