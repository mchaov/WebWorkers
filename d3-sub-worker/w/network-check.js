function handler(){
    if(this.readyState === XMLHttpRequest.DONE){
        if(this.status === 200){
            postMessage({status: true});
        }
        else{
            postMessage({status: false});
        }
    }
}

function testConnection(){
    var r = new XMLHttpRequest();
    r.open('GET', 'http://localhost');
    r.onreadystatechange = handler;
    r.send();
}

setInterval(testConnection, 1000);