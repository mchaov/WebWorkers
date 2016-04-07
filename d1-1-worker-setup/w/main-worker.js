onmessage = function(e) {
    console.log(e.data);
    postMessage('message from worker');
};

//close();