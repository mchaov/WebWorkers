var APP = {};

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

APP.call1 = function(prop) {
	w2.postMessage('');
};
APP.call2 = function(prop) {
	w1.postMessage('');
};

var w1 = new Worker('w/w1.js');
var w2 = new Worker('w/w2.js');
//worker.postMessage('message to worker');

w1.onmessage = function(e) {
    commInterface(e.data);
};

w2.onmessage = function(e) {
    commInterface(e.data);
};


//worker.terminate();