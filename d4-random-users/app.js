var APP = {},
	worker,
	title = document.getElementById('notification'),
	users = document.getElementById('users');

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

APP.isOnline = true;
APP.users = new Array();

APP.status = function(online){
	var status = online === true ? 'online' : 'offline';
	APP.isOnline = online;
	title.innerHTML = 'App ' + status;
};

APP.getUser = function(){
    if(APP.isOnline){
        return worker.postMessage({getUser: ''});
    }
    alert('APP OFFLINE!');
};

APP.setUser = function(user){
    this.users.push(user);

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
	commInterface(e.data);
};