/*
  Useful utility functions
*/

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
	return entityMap[s];
    });
}

function unescapeHtml(string) {
    string = string.replace("&amp;", "&");
    string = string.replace("&lt;", "<");
    string = string.replace("&gt;", ">");
    string = string.replace("&quot;", '"');
    string = string.replace("&#39;", "'");
    string = string.replace("&#x2F;", "/");
    return string;
}

module.exports = {
    escapeHtml: escapeHtml,
    unescapeHtml: unescapeHtml,
}
