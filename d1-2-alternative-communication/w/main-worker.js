var APP = {};

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

APP.test = function(prop) {
	console.log(prop);
	postMessage({callback: 'message to parent'})
};

onmessage = function(e) {
    commInterface(e.data);
};

//close();