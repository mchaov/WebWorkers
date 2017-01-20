importScripts("utils.js");

var CACHE = "";

var templates = {
    tr: { tag: "tr", attr: { } },
    th: { tag: "th", attr: { }, text: "1" },
    td: { tag: "td", attr: { }, text: "1" }
};

var generatedTemplate = [];

function changeDetection(s){
    if(CACHE === s){
        return false;
    }
    else{
        CACHE = s;
        return true;
    }
}

function init(e){
    var s = e.currentTarget.response;
    if(changeDetection(s)){
        var json = JSON.parse(CACHE);
        var keys = _getJSONKeys(json);

        // build headings
        var trth = Object.assign( {}, templates.tr, { attr: { class: "bold" } } );
        trth.content = [];
        for(var i = 0; i < keys.length; i++){
            trth.content.push(Object.assign( {}, templates.th, {
                text: keys[i]
            }));
        }
        generatedTemplate.push(trth);

        // build cells
        json.reduce(function(trs, cell){
            var tr = Object.assign( {},templates.tr, {} );
            tr.content = [];

            for(var i = 0; i < keys.length; i++){
                tr.content.push(Object.assign( {}, templates.td, {
                    text: cell[keys[i]]
                }));
            }
            trs.push(tr);
            return trs;

        }, generatedTemplate);
        
        postMessage({
            html: _buildHtml(generatedTemplate)
        });

        generatedTemplate = [];

        return true;
    }
    return false;
}

setInterval(_getData.bind(null, '../MOCK_DATA_2.json', init), 250);
//_getData.bind(null, '../MOCK_DATA_2.json', init)();


onmessage = function(e) {
    console.log(e.data);
    postMessage('message from worker');
};

//close();