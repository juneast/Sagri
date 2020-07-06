export default function computeTime(time){
    var date =new Date(time)
    var now = new Date();
    var temp = now-date;
    if(Math.floor(temp/1000) ===0){
        return "1분 이내"
    } else if(Math.floor(temp/(1000*3600))===0) {
        return `${Math.floor(temp/1000)}분전`
    } else if(Math.floor(temp/(1000*3600*24))===0) {
        return `${Math.floor(temp/(1000*3600))}시간전`
    } else if(Math.floor(temp/(1000*3600*24*7))===0) {
        return `${Math.floor(temp/(1000*3600*24))}일전`
    } else if(Math.floor(temp/(1000*3600*24*7*4))===0) {
        return `${Math.floor(temp/(1000*3600*24*7))}주전`
    } else if(Math.floor(temp/(1000*3600*24*7*4*12))===0) {
        return `${Math.floor(temp/(1000*3600*24*7*4))}달전`
    } else {
        return `${Math.floor(temp/(1000*3600*24*7*4*12))}년전`
    }
    

}