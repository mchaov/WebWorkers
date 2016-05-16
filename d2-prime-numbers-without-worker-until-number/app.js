var txt = document.getElementById('primes');

function generatePrimes() {

    var maxNumber = Number(document.getElementById("maxNumber").value);
    txt.innerHTML = '';

    // generate array with false values
    (function _arrayGenerate() {
        var out = [];
        return new Promise(function (_resolve) {
            (function _arrayGenerate() {
                if (out.length <= maxNumber) {
                    out.push(true);
                    setTimeout(
                        _arrayGenerate
                        , 0);
                } else {
                    _resolve(out);
                }
            }(0));
        });
    }()).then(function (inputArray) {
        return new Promise(function (preparedResolve) {
            (function _arrayIterate(index) {
                if (index <= Math.sqrt(maxNumber) && inputArray[index] === true) {
                    (function _iterate(i) {
                        console.log("iterate " + i);
                        if (i <= maxNumber) {
                            inputArray[i] = false;
                            i += index;
                            setTimeout(function () {
                                _iterate(i);
                            }, 0);
                        } else {
                            setTimeout(function () {
                                _arrayIterate(++index);
                            }, 0);
                        }
                    }(Math.pow(index, 2)));
                } else if (index <= Math.sqrt(maxNumber)) {
                    inputArray[index] = false;
                    setTimeout(function () {
                        _arrayIterate(++index);
                    }, 0);
                } else {
                    preparedResolve(inputArray);
                }
            }(2));
        });
    }).then(function (result) {
        // here we will display generated primes
        (function _displayResult(index) {
            if (index >= 2 && index <= result.length && result[index] === true) {
                var _div = document.createElement("div"),
                    _p = document.createElement("p"),
                    _hr = document.createElement("hr");
                
                _p.innerHTML = index;
                _div.appendChild(_p);
                _div.appendChild(_hr);
                txt.appendChild(_div);
            }

            if (index <= result.length) {
                setTimeout(function () {
                    _displayResult(++index)
                }, 0);
            }
        }(0));
    });

    return false;
}
