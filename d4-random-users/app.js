var worker,
	users = document.getElementById('users');

function getUser(){
    worker.postMessage('');
};

function setUser(user){
    var img = new Image(),
        h2 = document.createElement('h2'),
        p = document.createElement('p'),
        div = document.createElement('div');

        img.src = user.picture.large;
        h2.innerHTML = user.name.first + ' ' + user.name.last;
        p.innerHTML = user.email + '<br/>' + user.cell;

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);

    users.insertAdjacentElement('afterbegin', div);
};

worker = new Worker('w/main-worker.js');

worker.onmessage = function(e) {
	setUser(e.data);
};

//setInterval(getUser, 500);
