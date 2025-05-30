const MobType = require("MobsType");
cc.Class({
    extends: cc.Component,

    properties: {
        timeDelayCollider: {
            default: 2,
            type: cc.Float
        }
    },
    onLoad() {
        this.initDropEffect(this.timeDelayCollider);
    },

    initDropEffect(delay) {
        this.collider = this.getComponent(cc.Collider);
        if (this.collider) {
            this.collider.enabled = false;
        }

        this._flashTween = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(0.3, { opacity: 100 })
                    .to(0.3, { opacity: 255 })
            )
            .start();

        this.scheduleOnce(() => {
            if (this.collider) this.collider.enabled = true;

            if (this._flashTween) {
                this._flashTween.stop();
            }

            this.node.opacity = 255;
        }, delay);
    },

    onCollisionEnter(other, self) {
        if (other.node.group === 'Mobs') {
            const mobScript = other.node.getComponent('MobsBase');
            if (mobScript && mobScript.mobType === MobType.DOG) {
            other.node.emit('mob-dead', mobScript.id);

            cc.systemEvent.emit('spawn-boss', this.node.position);

            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.01);
            }
        }
    }

});
