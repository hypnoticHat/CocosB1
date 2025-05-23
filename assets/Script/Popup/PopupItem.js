cc.Class({
    extends: cc.Component,

    properties: {
   
    },
    onLoad () {
        this.node.active = false;
    },

    show(){
        this.node.active = true;
    },
    hide(){
        this.node.active = false;
    },
});
