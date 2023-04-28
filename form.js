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
	this.parse_keyword();
    },
    parse_beginning: function() {
	if(cfg.get("start")) {
	    var el = document.getElementById("start-year");
	    el.value = cfg.get("start");
	}
    },
    parse_end: function() {
	if(cfg.get("end")) {
	    var el = document.getElementById("end-year");
	    el.value = cfg.get("end");
	}
    },
    parse_dbs: function() {
	var el = document.getElementById("show-cite-dbs");
	if(cfg.get("show_dbs") == "true") {
	    el.checked = true;
	}
	else {
	    el.checked = false;
	}
    },
    parse_types: function() {
	var el = document.getElementById("types");
	if(cfg.get("types")) {
	    el.value = cfg.get("types");
	}
    },
    parse_sort: function() {
	var el = document.getElementById("sort");
	if(cfg.get("sort") != null) {
	    el.value = cfg.get("sort");
	}
	else el.value = "type";
    },
    parse_show_sections: function() {
	var el = document.getElementById("show-sections");
	if(cfg.get("show_sections") == "true") el.checked = true;
	else el.checked = false;
    },
    parse_view: function() {
	var el = document.getElementById("view");
	if(cfg.get("view") != null) {
	    el.value = cfg.get("view");
	}
	else el.value = "biblio";
    },
    parse_keyword: function() {
	var el = document.getElementById("keywords");
	el.value = cfg.get("keyword");
    }
}

// Changing GET when form changed
var form_get_ctrl = {
    update_beginning: function() {
	var el = document.getElementById("start-year");
	cfg.set("start", el.value);
	update_form();
    },
    update_ending: function() {
	var el = document.getElementById("end-year");
	cfg.set("end", el.value);
	update_form();
    },
    update_cite_dbs: function() {
	var box = document.getElementById("show-cite-dbs");
	if(box.checked) cfg.set("show_dbs", "true");
	else cfg.set("show_dbs", "false");
	update_form();
    },
    update_types: function() {
	cfg.set("types", document.getElementById("types").value);
	update_form();
    },
    update_sort: function() {
	cfg.set("sort", document.getElementById("sort").value);
	update_form();
    },
    update_show_sections: function() {
	if(document.getElementById("show-sections").checked) {
	    cfg.set("show_sections", "true");
	}
	else cfg.set("show_sections", "false");
	update_form();
    },
    update_view: function() {
	cfg.set("view", document.getElementById("view").value);
	if(cfg.get("view") == "table") {
	    cfg.set("sort", "vak");
	    document.getElementById("sort").setAttribute("disabled", true);
	    cfg.set("show_sections", "true");
	    document.getElementById("show-sections").setAttribute("disabled", true);
	}
	else {
	    document.getElementById("sort").removeAttribute("disabled");
	    document.getElementById("show-sections").removeAttribute("disabled");
	}
	update_form();
    },
    update_keywords: function() {
	cfg.set("keyword", document.getElementById("keywords").value);
	update_form();
    }
}

function fill_keywords() {
    var kws = scan_keywords();
    sel = document.getElementById("keywords");
    op = document.createElement("option");
    op.setAttribute("value", "all");
    op.innerText = "[Все]";
    sel.innerHTML = "";
    sel.appendChild(op);
    for(var i = 0; i < kws.length; i++) {
	op = document.createElement("option");
	op.setAttribute("value", kws[i]);
	if(kws[i] in keywords) op.innerText = keywords[kws[i]].name;
	else op.innerText = kws[i];
	sel.appendChild(op);
    }
}

function scan_keywords() {
    kws = [];
    for(var i = 0; i < papers.length; i++) {
	p = papers[i];
	if("keywords" in p) {
	    p.keywords.forEach(function(k) { if(!kws.includes(k)) kws.push(k); });
	}
    }
    return kws;
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
	if(cfg.get(this.get_par) == "true") {
	    el.classList.remove("hidden");
	}
	else {
	    el.classList.add("hidden");
	}
    }
}
