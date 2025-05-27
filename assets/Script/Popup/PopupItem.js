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
        this.node.active = true;
    },
    hide(){
        this.node.active = false;
    },
});
