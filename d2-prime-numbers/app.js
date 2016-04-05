var APP = {},
	txt = document.getElementById('primes'),
	worker = new Worker('w/main-worker.js');

//worker.postMessage({primes: ''});

worker.onmessage = function(e) {
    txt.innerHTML = e.data;
};

//worker.terminate();