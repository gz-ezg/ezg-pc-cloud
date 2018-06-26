

/**
 * title：压缩图片库
 * 回调函数机制还是比较好用，高深的promise待定
 * @param {图片对象} file 
 * @param {压缩后图片置入} files_array 
 */
export function yasuo(file,files_array){
    let _self = this
    let ready = new FileReader()
    ready.readAsDataURL(file)
    ready.onload = function(){
        var re = this.result
        // console.log(re)
        canvasDataURL(re,function(e){
            files_array.push(e)
        })
    }
}

function canvasDataURL(path,callback){
    var _self = this
    var img = new Image()
    img.src = path;
    img.onload = function(){
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        canvas.width = 800
        canvas.height = 600
        ctx.drawImage(this,0,0,800,600)// 重绘成800*600 canvas
        var base64 = canvas.toDataURL('image/jpeg',0.7)// 图片质量
        // console.log(convertBase64UrlToBlob(base64))
        callback(convertBase64UrlToBlob(base64))
        // return convertBase64UrlToBlob(base64)
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
