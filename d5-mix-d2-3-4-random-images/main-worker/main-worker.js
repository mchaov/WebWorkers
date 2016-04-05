importScripts('network-check.js');

var APP = {};

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

onmessage = function(e) {
    commInterface(e.data);
};

APP.getUser = function(){
    var r = new XMLHttpRequest();
    r.open('GET', 'https://randomuser.me/api/');

    r.onreadystatechange = function(){

        if(this.readyState === XMLHttpRequest.DONE){

            if(this.status === 200){

                postMessage({setUser: JSON.parse(this.response).results[0].user});

            }

        }
    };

    r.send();
};