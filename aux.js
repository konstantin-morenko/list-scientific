function copy_content(e) {
    e.preventDefault();
    e.stopPropagation();

    cp = e.target;

    navigator.clipboard.writeText(cp.innerText);
    selectText(cp);
}

function selectText(container) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(container);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(container);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}
