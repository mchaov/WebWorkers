var APP = {},
	worker,
	title = document.getElementById('notification');

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

APP.isOnline = true;

APP.status = function(online){
	var status = online === true ? 'online' : 'offline';
	APP.isOnline = status;
	title.innerHTML = 'App ' + status;
};

worker = new Worker('w/main-worker.js');
worker.postMessage('');

worker.onmessage = function(e) {
	commInterface(e.data);
};