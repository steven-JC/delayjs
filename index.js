
var delays = {};

var delay = {

    sleep: function(ms) {
        ms = ms || 0;
        return new Promise(function(resolve){
            setTimeout(function(){
                resolve();
            }, ms);
        });
    },

    until: function(judge, msPerJudge) {
        msPerJudge = msPerJudge || 10;
        if(typeof judge !== 'function') throw '[tunk-delay]: until need a judge function';
        return new Promise(function(resolve){
            var interv = setInterval(function(){
                if(judge()){
                    clearInterval(interv);
                    resolve();
                }
            }, msPerJudge);
        });
    },

    delay: function(id, ms) {
        if(!id) throw '[tunk-delay]: the delay id is required.';
        ms = ms || 100;
        if(delays[id]) {
            clearTimeout(delays[id].timo);
            delays[id].resolve(false);
            delays[id] = null;
        }
        return new Promise(function(resolve){
            delays[id] = {};
            delays[id].resolve = resolve;
            delays[id].timo = setTimeout(function(){
                 resolve(true);
                 delays[id] = null;
            }, ms);
        });
    }
};



if (typeof module === 'object' && module.exports) {
    module.exports = delay;
}
else if (typeof define === 'function' && define.amd) {
    define(function () {
        return delay;
    })
}