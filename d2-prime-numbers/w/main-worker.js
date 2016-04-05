var APP = {}, n = 1, i = 2;

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

APP.primes = function() {
	primes: while (true) {
	  n += 1;
	  for (; i <= Math.sqrt(n); i += 1) { 
		if (n % i == 0) {
		 continue primes;
		}
		postMessage(n);
	  }
	}
};

onmessage = function(e) {
    commInterface(e.data);
};

//close();