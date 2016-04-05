var APP = {}, n = 1, i = 2, j;

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

APP.primes = function() {
    j = 1000000000;
    primes: while (j > 0) {
        n += 1;
        for (; i <= Math.sqrt(n); i += 1) {
            if (n % i == 0) {
                continue primes;
            }
            postMessage({
                setPrime : n
            });
        }

        j--;
    }
};

onmessage = function(e) {
    commInterface(e.data);
};

//close();