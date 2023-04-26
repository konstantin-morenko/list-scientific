var beginning = 2011;

// Parsing GET to form elements
var form_parse_get = {
    parse: function() {
	this.parse_beginning();
	this.parse_end();
	this.parse_dbs();
	this.parse_types();
	this.parse_sort();
	this.parse_show_sections();
	this.parse_view();
    },
    parse_beginning: function() {
	if(get.get("start")) {
	    var el = document.getElementById("start-year");
	    el.value = get.get("start");
	}
    },
    parse_end: function() {
	if(get.get("end")) {
	    var el = document.getElementById("end-year");
	    el.value = get.get("end");
	}
    },
    parse_dbs: function() {
	var el = document.getElementById("show-cite-dbs");
	if(get.get("show_dbs") == "true" || get.get("show_dbs") == null) {
	    el.checked = true;
	}
	else {
	    el.checked = false;
	}
    },
    parse_types: function() {
	var el = document.getElementById("types");
	if(get.get("types")) {
	    el.value = get.get("types");
	}
    },
    parse_sort: function() {
	var el = document.getElementById("sort");
	if(get.get("sort") != null) {
	    el.value = get.get("sort");
	}
	else el.value = "type";
    },
    parse_show_sections: function() {
	var el = document.getElementById("show-sections");
	if(get.get("show_sections") == "true") el.checked = true;
	else el.checked = false;
    },
    parse_view: function() {
	var el = document.getElementById("view");
	if(get.get("view") != null) {
	    el.value = get.get("view");
	}
	else el.value = "biblio";
    }
}

// Changing GET when form changed
var form_get_ctrl = {
    update_beginning: function() {
	var el = document.getElementById("start-year");
	if(el.value == beginning || el.value == '') {
	    get.rm("start");
	}
	else {
	    get.set("start", el.value);
	}
	update_form();
    },
    update_ending: function() {
	var el = document.getElementById("end-year");
	if(el.value == 2022 || el.value == '') {
	    get.rm("end");
	}
	else {
	    get.set("end", el.value);
	}
	update_form();
    },
    update_cite_dbs: function() {
	var box = document.getElementById("show-cite-dbs");
	if(box.checked) {
	    get.set("show_dbs", "true");
	}
	else {
	    get.set("show_dbs", "false");
	}
	update_form();
    },
    update_types: function() {
	get.set("types", document.getElementById("types").value);
	update_form();
    },
    update_sort: function() {
	get.set("sort", document.getElementById("sort").value);
	update_form();
    },
    update_show_sections: function() {
	if(document.getElementById("show-sections").checked) {
	    get.set("show_sections", "true");
	}
	else get.rm("show_sections");
	update_form();
    },
    update_view: function() {
	get.set("view", document.getElementById("view").value);
	if(get.get("view") == "table") {
	    get.set("sort", "vak");
	    document.getElementById("sort").setAttribute("disabled", true);
	    get.set("show_sections", "true");
	    document.getElementById("show-sections").setAttribute("disabled", true);
	}
	else {
	    document.getElementById("sort").removeAttribute("disabled");
	    document.getElementById("show-sections").removeAttribute("disabled");
	}
	update_form();
    },
}

function update_form() {
    filter_content();
    cite_dbs.update();
    form_parse_get.parse();
}

var cite_dbs = {
    checkbox: "show-cite-dbs",
    panel: "cite-dbs",
    get_par: "show_dbs",
    update: function() {
        var el = document.getElementById(this.panel);
	if(get.get(this.get_par) == "true" || get.get(this.get_par) == null) {
	    el.classList.remove("hidden");
	}
	else {
	    el.classList.add("hidden");
	}
    }
}
