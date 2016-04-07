var worker = new Worker('w/main-worker.js');
worker.postMessage('message to worker');

worker.onmessage = function(e) {
    console.log(e.data);
};

//worker.terminate();