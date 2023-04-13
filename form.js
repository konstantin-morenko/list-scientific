var beginning = 2011;

function update_form() {
    update_start();
    update_end();
    upd_cite_dbs();
    filter_content();
}

function update_start() {
    var st_element = document.getElementById("start-year");
    if(st_element.value == beginning || st_element.value == '') {
	get.rm("start");
    }
    else {
	get.set("start", st_element.value);
    }
}

function update_end() {
    var st_element = document.getElementById("end-year");
    if(st_element.value == 2022 || st_element.value == '') {
	get.rm("end");
    }
    else {
	get.set("end", st_element.value);
    }
}

var cite_dbs = {
    checkbox: "show-cite-dbs",
    panel: "cite-dbs",
    get_par: "show_dbs",
    init: function() {
	if(!get.get(this.get_par)) {
	    get.set(this.get_par, "true");
	}
	this.parse();
	this.update();
    },
    parse: function() {
	if(get.get(this.get_par)) {
	    document.getElementById(this.checkbox).checked = true;
	}
    },
    onchange: function() {
	var box = document.getElementById(this.checkbox);
	if(box.checked) {
	    get.set(this.get_par, "true");
	}
	else {
	    get.rm(this.get_par);
	}
	this.update();
    },
    update: function() {
        var el = document.getElementById(this.panel);
	if(get.get(this.get_par) == "true") {
	    el.classList.remove("hidden");
	}
	else {
	    el.classList.add("hidden");
	}
    }
}
