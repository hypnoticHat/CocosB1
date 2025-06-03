const MobsBase = require("MobsBase");
cc.Class({
    extends: MobsBase,

    properties: {
        mana: {
            default: 150,
            type: cc.Integer,
            override: true,

        },
    },

    onLoad(){
        this._super();
        this.damageTimer = 0;
    },

    update(dt){
        this.damageTimer += dt
        if(this.damageTimer >= 1){
            this.damageTimer = 0;
            this.takeDamage(20);
        }

        this.onMove(200,dt);
    },

    onDie() {
        this.dieTween = cc.tween(this.node)
        .to(.5, { scale: 0.2 })
        .call(() => {
            this.fsm.die();
            this.dieTween = null;
        })
        .start();
    }
});
