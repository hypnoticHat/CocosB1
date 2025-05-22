
cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 30,
            type: cc.Float,
        },
        direction:{
            default: 1,
            type: cc.Float,
        },
    },


    start () {

    },

    update (dt) {
        this.node.x += this.speed * this.direction * dt;

        const screenWidth = cc.winSize.width;
        const halfWidth = this.node.width / 2;
        if (this.node.x + halfWidth > screenWidth) {
            this.node.x = screenWidth - halfWidth;
            this.direction *= -1;
            this.node.getComponent(cc.Label).string = "I'm moving to the left";
        }
        else if (this.node.x - halfWidth < 0) {
            this.node.x = halfWidth;
            this.direction *= -1;
            this.node.getComponent(cc.Label).string = "I'm moving to the right";
        }
    },
});
