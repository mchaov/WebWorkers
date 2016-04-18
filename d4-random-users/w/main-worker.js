onmessage = function(e) {
    getUser();
};

function getUser(){
    var r = new XMLHttpRequest();
    r.open('GET', 'https://randomuser.me/api/');

    r.onreadystatechange = function(){

        if(this.readyState === XMLHttpRequest.DONE){
            if(this.status === 200){
                postMessage(JSON.parse(this.response).results[0]);
            }
        }
    };

    r.send();
};