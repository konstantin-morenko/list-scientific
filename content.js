// Make bibliographic view
function make_biblio() {
    var biblio = "";
    for(var i = 0; i < papers.length; i++) {
	biblio += make_string(papers[i]);
    }
    return biblio;
}

// Exactly one record
function make_string(paper) {
    var string = "";
    var coauthors = paper.coauthors.slice(); // copying because of unshift
    coauthors.unshift("self");
    string += make_person_lst(coauthors, "si");

    string += " " + paper.title;
    string += "&nbsp;//";
    string += " " + paper.printed;
    return '<p class="record" data-year="' + paper.year + '">' + string + '</p>';
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
    var content=document.getElementById("content");
    content.innerHTML = make_biblio();
}

function make_header() {
    var hdr = document.getElementById("period");
    var str = "";
    var start = get_get("start");
    var end = get_get("end");
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

function filter_content() {
    make_header();
    filter_show_all();
    filter_start();
    filter_end();
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
    var start = get_get("start");
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
    var end = get_get("end");
    if(end) {
	for(var i = 0; i < els.length; i++) {
	    if(els[i].getAttribute('data-year') > end) {
		els[i].classList.add("hidden");
	    }
	}
    }
}
