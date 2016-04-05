// GLOBALS
var APP = {},
    uInt8View = [],
    originalLength;

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

function toMB(bytes) {
    return Math.round(bytes / 1024 / 1024);
}

function workerInterface(e){
    commInterface(e.data);
}

APP.receive = function(buffer) {
    console.log('MAIN SCRIPT: Received buffer from worker');
    uInt8View = new Uint8Array(buffer);
    originalLength = uInt8View.length;
};

APP.test = function() {
    console.log('MAIN SCRIPT: ' + uInt8View.length);
    console.log(uInt8View);
};

APP.sendBuffer = function() {
    console.log('MAIN SCRIPT: ' + toMB(originalLength) + ' MB buffer, sent to worker');
    mainWorker.postMessage({receive: uInt8View.buffer}, [uInt8View.buffer]);
};

// WORKER
mainWorker = new Worker('main-worker/main-worker.js');
mainWorker.onmessage = workerInterface;