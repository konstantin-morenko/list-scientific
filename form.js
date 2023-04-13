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
    onchange: function() {
	var box = document.getElementById(cite_dbs.checkbox);
	if(box.checked) {
	    get.set(cite_dbs.get_par, "true");
	}
	else {
	    get.rm(cite_dbs.get_par);
	}
	cite_dbs.update();
    },
    update: function() {
        var el = document.getElementById(cite_dbs.panel);
	if(get.get(cite_dbs.get_par) == "true") {
	    el.classList.remove("hidden");
	}
	else {
	    el.classList.add("hidden");
	}
    }
}
