function upd_cite_dbs() {
    if(get_get("show_dbs") == "true") {
	sh_cite_dbs(true);
    }
    else {
	sh_cite_dbs(false);
    }
}

function sh_cite_dbs(show) {
    var el = document.getElementById("cite-dbs");
    if(show) {
	el.classList.remove("hidden");
    }
    else {
	el.classList.add("hidden");
    }
}
