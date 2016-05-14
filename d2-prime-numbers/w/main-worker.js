var n = 1, i = 2;

primes: while (true) {
  n += 1;
  for (; i <= Math.sqrt(n); i += 1) { 
	if (n % i == 0) {
	 continue primes;
	}
	postMessage(n);
  }
}

onmessage = function(e) {
    console.log(e.data);
};

//close();