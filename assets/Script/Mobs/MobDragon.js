const MobsType = require("MobsType");
cc.Class({
    extends: require('MobsBase'),

    properties: {
        mana: {
            default: 1000,
            type: cc.Integer,
            override: true,
        },
        mobType: {
            default: MobsType.DRAGON,
            type: MobsType,
            override: true,
        },
    },

    onLoad() {
        this._super();
        this.moveTimer = 0;

    },

    update(dt) {
        this.moveTimer += dt
        if (this.moveTimer >= 1) {
            this.moveTimer = 0;
            if (this.fsm && this.fsm.state === 'move') {
                this.onMove(2000, dt);
            }
        }
    },

    runAnimation() {
        this.runTween = cc.tween(this.spriteNode)
            .repeatForever(
                cc.tween()
                    .to(1, { scale: 1.1 })
                    .to(1, { scale: 1 })
            )
            .start()
    },

});
