cc.Class({
    extends: cc.Component,

    properties: {
        LevelNoicte: cc.Node,
        LevelLabel: cc.Label
    },

    start () {
        this.LevelLabel.string = cc.director.getScene().name;
        cc.tween(this.LevelNoicte)
        .to(1.5, { scale: 1.5, opacity: 0 })
        .call(() => {
            this.LevelNoicte.active = false
        })
        .start();
    },

});
