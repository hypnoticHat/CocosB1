const EventKeys = require('EventKeys');
cc.Class({
    extends: cc.Component,

    properties: {
   
    },
    onLoad () {
        this.node.active = false;

    },

    show() {
        cc.systemEvent.emit(EventKeys.AUDIO.PLAY_CLICK_SOUND);
        this.node.active = true;
    },
    
    hide() {
        cc.systemEvent.emit(EventKeys.AUDIO.PLAY_CLICK_SOUND);
        this.node.active = false;
    }
});
