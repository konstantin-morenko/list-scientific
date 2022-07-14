var beginning = 2011;

function update_form() {
    update_start();
    update_end();
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
