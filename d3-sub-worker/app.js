var APP = {},
	worker,
	title = document.getElementById('notification');

APP.isOnline = true;

worker = new Worker('w/main-worker.js');
worker.postMessage('');

worker.onmessage = function(e) {
    var status = e.data === 'true' ? 'online' : 'offline';
    APP.isOnline = status;
    title.innerHTML = 'App ' + status;
};