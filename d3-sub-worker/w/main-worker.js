importScripts('network-check.js');

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

onmessage = function(e) {
    commInterface(e.data);
};