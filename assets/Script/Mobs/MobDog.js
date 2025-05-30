
cc.Class({
    extends: require('MobsBase'),

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

    onMove(speed,dt){
        this._super(speed,dt);
    },

    onDie(){
        this.dieTween = cc.tween(this.node)
        .to(1, { scale: 0 })
        .start()
        this.dieTween.stop();
        this.dieTween = null;
        this._super();
    }
});
