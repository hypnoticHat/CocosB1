
const MobsType = require("MobsType");
const MobController = require("MobController");
cc.Class({
    extends: require('MobsBase'),

    properties: {
        mana: {
            default: 100,
            type: cc.Integer,
            override: true,
        },
        mobType: {
            default: MobsType.WOLF,
            type: MobsType,
            override: true,
        },
        dropItem: cc.Prefab,
    },

    onLoad() {
        this._super();
        this.amplitude = 50 + Math.random() * 100;
        this.frequency = 0.1 + Math.random() * 0.3;
    },

    update(dt) {

        this.onMove(150, dt);
    },

    onMove(speed, dt) {
        this._super(speed, dt)
        this.timePassed = (this.timePassed || 0) + dt;
        this.mobNode.y = Math.sin(this.timePassed * this.frequency * Math.PI * 2) * this.amplitude;
    },

    onDie() {
        const dropRate = 0.3;
        if (this.dropItem && this.node.parent) {
            if (Math.random() < dropRate) {
                const item = cc.instantiate(this.dropItem);
                item.setPosition(this.node.position);
                this.node.parent.addChild(item);
            }
        }

    cc.tween(this.spriteNode)
        .to(0.3, { angle: -180 }, { easing: 'sineOut' })
        .call(() => {
            MobController.instance.onMobDead(this.id);
        })
        .start();
    }

});
