// GLOBALS
var APP = {},
	worker,
	images = document.getElementById('images'),
	primesTxt = document.getElementById('primes'),
	title = document.getElementById('notification'),
	users = document.getElementById('users'),
	interval = 1000;

APP.isOnline = true;


// HELPERS
var rafPaint = ( function() {
    if (!window.requestAnimationFrame) {
        return function(func) {
            return func.bind(this);
        };
    }

    return function(func) {
        return function() {
            var context = this,
                args =
                arguments;

            return requestAnimationFrame(function() {
                func.apply(context, args);
            });
        };
    };
}());


function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

function workerInterface(e){
    commInterface(e.data);
}


// STATUS
function status(online){
    var status;

    if(online === true){
        status = 'online';
        APP.isOnline = online;
        document.body.classList.add('isOnline');

    } else {
       status = 'offline';
        APP.isOnline = false;
        document.body.classList.remove('isOnline');
    }

    title.innerHTML = 'App ' + status;
}
APP.status = rafPaint(status);


// USERS
APP.getUser = function(){
    if(APP.isOnline){
        return mainWorker.postMessage({getUser: ''});
    }
    alert('APP OFFLINE!');
};

function setUser(user){
    var img = new Image(),
        h2 = document.createElement('h2'),
        p = document.createElement('p'),
        div = document.createElement('div');

        img.src = user.picture.thumbnail;
        h2.innerHTML = user.name.first + ' ' + user.name.last;
        p.innerHTML = user.email + '<br/>' + user.cell;

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);

    users.insertAdjacentElement('afterbegin', div);
}
APP.setUser = rafPaint(setUser);


// PRIMES
APP.getPrimes = function(){
    primesWorker.postMessage({primes: ''});
};

function setPrime(prime){
    primesTxt.innerHTML = prime;
}
APP.setPrime = rafPaint(setPrime);


// IMAGES
APP.getImage = function(){
    if(APP.isOnline){
        return imageWorker.postMessage({getImage: ''});
    }
    alert('APP OFFLINE!');
};

function setImage(dataurl){
    var img = new Image();
    img.src = dataurl;
    images.insertAdjacentElement('afterbegin', img);
}
APP.setImage = rafPaint(setImage);


// CLEAR HTML
APP.clearHTML = function(){
    images.innerHTML = '';
    primesTxt.innerHTML = '';
    users.innerHTML = '';
};

// INTERVALS
APP.int1;
APP.int2;
APP.ints = false;
APP.intervals = function(action){
    if(!action && APP.ints === true){
        APP.ints = false;
        clearInterval(APP.int1);
        clearInterval(APP.int2);
    } else {
        APP.ints = true;
        APP.int1 = setInterval(APP.getImage, interval);
        APP.int2 = setInterval(APP.getUser, 1);
    }
};


// WORKERS
mainWorker = new Worker('main-worker/main-worker.js');
mainWorker.onmessage = workerInterface;

primesWorker = new Worker('primes-worker/primes.js');
primesWorker.onmessage = workerInterface;

imageWorker = new Worker('image-worker/image.js');
imageWorker.onmessage = workerInterface;






