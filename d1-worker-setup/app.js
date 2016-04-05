var APP = {};

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

APP.test = function(prop) {
    console.log(prop);
};


var worker = new Worker('w/main-worker.js');
worker.postMessage({test: 'message to worker'});

worker.onmessage = function(e) {
    commInterface(e.data);
};