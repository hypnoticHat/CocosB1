cc.Class({
    extends: cc.Component,

    properties: {
   
    },
    onLoad () {
        this.node.active = false;
        this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
            e.stopPropagation();
        }, this);
    },

    show(){
        cc.systemEvent.emit('play-click-sound');
        this.node.active = true;
    },
    hide(){
        cc.systemEvent.emit('play-click-sound');
        this.node.active = false;
    },
});
