cc.Class({
    extends: cc.Component,

    properties: {
        audioBGm:{
            type: cc.AudioClip,
            default: null,
        },

        audioClick:{
            type: cc.AudioClip,
            default: null,
        }

    },

    playSoundClick(){
        cc.audioEngine.play(this.audioClick, false, 1);
        cc.audioEngine.stop(this.bgm);
    },

    start () {
        this.playBgm();
    },

    playBgm(){
         this.bgm = cc.audioEngine.play(this.audioBGm, false, 1);
    },

   
});
