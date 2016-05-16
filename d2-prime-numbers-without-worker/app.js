var txt = document.getElementById('primes');

function generatePrimes() {
    var n = 1, i = 2;
    (function _primes() {
        n++;
        (function _generator() {
            return new Promise(function (resolve) {
                (function _iterator() {
                    if (i <= Math.sqrt(n) && n % i == 0) {
                        resolve();
                    } else if (i <= Math.sqrt(n)) {
                        txt.innerHTML = n;
                        i++;
                        setTimeout(_iterator, 0);
                    } else {
                        resolve();
                    }
                }());
            });
        }()).then(function () {
            setTimeout(_primes, 0);
        });
    }());
}
