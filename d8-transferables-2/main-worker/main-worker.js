var APP = {},
    SIZE = 1024 * 1024 * 32, // 32MB
    arrayBuffer = null,
    uInt8View = [],
    originalLength = null;


function commInterface(fns) {
    for (var fn in fns) {
        if ( typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

function toMB(bytes) {
    return Math.round(bytes / 1024 / 1024);
}

onmessage = function(e) {
    commInterface(e.data);
};


APP.receive = function(buffer) {
    console.log('WORKER: Received buffer from main script');
    uInt8View = new Uint8Array(buffer);
};

APP.test = function() {
    console.log('WORKER: ' + uInt8View.length);
    console.log(uInt8View);
};

APP.sendBuffer = function(){
    console.log('WORKER: ' + toMB(originalLength) + ' MB buffer, sent to main script');
    postMessage({receive: uInt8View.buffer}, [uInt8View.buffer]);
};

APP.generateTransferrable = function() {
    var i = 0;

    arrayBuffer = new ArrayBuffer(SIZE);
    uInt8View = new Uint8Array(arrayBuffer);
    originalLength = uInt8View.length;

    for (; i < originalLength; ++i) {
        uInt8View[i] = i;
    }

    console.log('WORKER: Generated ' + toMB(originalLength) + ' MB buffer');
};