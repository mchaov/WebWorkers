var APP = {};

function commInterface(fns){
    for(var fn in fns){
        if(typeof APP[fn] === 'function') {
            APP[fn](fns[fn]);
        }
    }
}

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
                    postMessage({setImage : '<img src="' + dataurl + '" />'});

                }, false);

                reader.readAsDataURL(blb);
            }
        }
    };
    r.send();
};


onmessage = function(e) {
    commInterface(e.data);
};

//close();