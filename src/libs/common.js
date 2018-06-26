function image_reduce(image){
    this.yasuo(file,{quality:0.2},function(base64code){
    var b1 = convertBase64UrlToBlob(base64code)
    return b1
    }
}

function convertBase64UrlToBlob(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function yasuo(file,w,objDiv){
        var that = this
        var ready = new FileReader()
        ready.readAsDataURL(file)
        ready.onload = function(){
            var re = this.result
            canvasDataURL(re, w, objDiv)
        }
    }

function canvasDataURL(path, obj, callback){
    var that = this
    var img = new Image()
    img.src = path;
    img.onload = function(){
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        canvas.width = 800
        canvas.height = 600
        ctx.drawImage(this,0,0,800,600)
        var base64 = canvas.toDataURL('image/jpeg',0.7)
        callback(base64)
    }
}

export function image_reduce(image)
