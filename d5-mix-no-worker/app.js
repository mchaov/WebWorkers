// GLOBALS
var APP = {},
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


// USERS
APP.getUser = function(){
	var r = new XMLHttpRequest();
    r.open('GET', 'https://randomuser.me/api/');

    r.onreadystatechange = function(){

        if(this.readyState === XMLHttpRequest.DONE){

            if(this.status === 200){
                setUser(JSON.parse(this.response).results[0]);
            }

        }
    };

    r.send();
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
var primesMax = 100000000;
var n = 1, i = 2;
APP.getPrimes = function(){
    primes: while (primesMax > 0) {
        n += 1;
        for (; i <= Math.sqrt(n); i += 1) {
            if (n % i == 0) {
                continue primes;
            }
            setPrime(n);
        }

        primesMax--;
    }
	primesMax = 100000000;
};

function setPrime(prime){
    primesTxt.innerHTML = prime;
}
APP.setPrime = rafPaint(setPrime);


// IMAGES
APP.getImage = function() {
    var r = new XMLHttpRequest();

    r.open('GET', 'https://source.unsplash.com/category/nature/100x100', true);
    r.responseType = 'arraybuffer';

    r.onreadystatechange = function(){
		if(this.readyState === XMLHttpRequest.DONE){

			if (this.status === 200) {

				var blb = new Blob( [this.response] , {type : 'image/jpeg'} ),
					reader = new FileReader();


				reader.addEventListener("load", function() {

					var dataurl = this.result;
					APP.setImage(dataurl);

				}, false);

				reader.readAsDataURL(blb);
			}
		}
	};
	r.send();

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
        APP.int2 = setInterval(APP.getUser, interval / 4);
    }
};