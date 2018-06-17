/**
 * Created by zhangxiaoxue on 10/4/15.
 */

;function Helper(){

}

Helper.prototype = {
    isIndex: function(){
        var url = window.location.href;
        var re = /index/g;
        if(url.match(re) || !url.match(/\.html/g)){
            return true;
        }else{
            return false;
        }
    },
    isWork: function(){
        var url = window.location.href;
        var re = /works\/(\w*)\.html/g;
        if(url.match(re)){
            return true;
        }else{
            return false;
        }
    },
    getCurrentLocation: function(){
        var url = window.location.href;
        var re = /\/(\w*)\.html/g;
        var match = re.exec(url);
        return (match && match[1]) || 'index';
    }
};