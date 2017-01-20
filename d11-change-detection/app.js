var worker = new Worker('w/main-worker.js');
worker.postMessage('message to worker');

var api = {
    html: function(content){
        console.log("\n-----UPDATE-----\n")
        document.getElementById("t").innerHTML = content;
    }
}

worker.onmessage = function(e) {
    if(typeof e.data === "object"){
        for (var i in e.data ){
            api[i](e.data[i]);
        }
    }else{
        console.log(e.data);
    }
};

//worker.terminate();