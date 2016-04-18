var txt = document.getElementById('primes'),
	worker = new Worker('w/main-worker.js');


worker.onmessage = function(e) {
    txt.innerHTML = e.data;
};

//worker.terminate();