var Rotate = cc.Class({
    extends: cc.Component,
    properties: {
    speed: 1
    },
    update: function () {
    this.node.angle += this.speed;
    }
    });
    module.exports = Rotate;