var worker = new Worker('w/main-worker.js');
worker.postMessage(window.requestAnimationFrame);

worker.onmessage = function(e) {
    console.log(e.data);
};

//worker.terminate();