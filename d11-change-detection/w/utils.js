function _empty() { while (this.hasChildNodes()) { this.removeChild(this.firstChild); } }
function _isHtmlElement(o) { return (typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"); }
function _getData(url, callback) { var oReq = new XMLHttpRequest(); oReq.addEventListener("load", callback); oReq.open("GET", url); oReq.send(); }
function _getJSONKeys(arr) { var a = [], i, j; for ( i = 0; i < arr.length; i++) { for (j in arr[i]) { if (arr[i].hasOwnProperty(j) && a.indexOf(j) === -1) { a.push(j); } } } return a; }

function _prepareTemplate(s, o) { return Object.keys(o).reduce(function (s, x) { return s.replace("{{" + x + "}}", o[x]); }, s); }
function _createElement(o, t) {
    var e = "<" + o.tag,
        a;

    if (o.attr) {
        for (a in o.attr) {
            e += " " + a + "=" + "\"" + o.attr[a] + "\"";
        }
    }

    e += ">";

    if (o.text) e += o.text;
    if (t) e += t;

    e += "</" + o.tag + ">";
    return e;
}

function _buildHtml(o) {
    var h = "";
    if(typeof o === "object") {
        o.forEach(function(x) {
            h += _createElement(x, _buildHtml(x.content));
        });
    }
    return h;
}