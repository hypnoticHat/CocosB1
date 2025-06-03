const StateMachine = require('javascript-state-machine');
const MobsType = require("MobsType");
const MobController = require("MobController");
const EffectController = require("EffectController");

cc.Class({
    extends: cc.Component,

    properties: {
        mobId: 0,
        mobType: {
            default: MobsType.DOG,
            type: MobsType,
        },
        mana: 100,
        mobNode: cc.Node,
        mobHpBar: cc.ProgressBar,
        spriteNode: cc.Node,
    },

    onLoad() {
        this.initFSM();
    },

    init(id) {
        this.id = id;
        this.maxMana = this.mana;
        this.updateHpBar();

        this.scheduleOnce(() => {
            if (this.fsm && this.fsm.can('move')) {
                this.fsm.move();
            }
        }, .2);
    },

    initFSM() {
        this.fsm = new StateMachine({
            init: 'idle',
            transitions: [
                { name: 'idle', from: ['none', 'hurt'], to: 'idle' },
                { name: 'move', from: ['idle', 'hurt'], to: 'move' },
                { name: 'hit', from: ['idle', 'move'], to: 'hurt' },
                { name: 'die', from: '*', to: 'dead' },
            ],
            methods: {
                onEnterIdle: this.onEnterIdle.bind(this),
                onEnterMove: this.onEnterMove.bind(this),
                onEnterHurt: this.onEnterHurt.bind(this),
                onEnterDead: this.onEnterDead.bind(this),
            }
        });
    },

    onEnterIdle() {
        this.stopAnimation();
    },

    onEnterMove() {
        this.runAnimation();
    },

    onEnterHurt() {
        this.stopAnimation();
        this.flashOnHit();

        this.scheduleOnce(() => {
            if (this.fsm.state !== 'dead' && this.fsm.can('move')) {
                this.fsm.move();
            }
        }, 0.2);
    },

    onEnterDead() {
        this.stopAnimation();
        MobController.instance.onMobDead(this.id);
    },

    onMove(speed, dt) {
        if (this.fsm.state !== 'move') return;

        if (this.mobNode) {
            this.mobNode.x -= speed * dt;
            this.checkOutOfScreen();
        }
    },

    checkOutOfScreen() {
        const halfWidth = (cc.winSize.width / 2) + 100;
        if (this.mobNode.x < -halfWidth || this.mobNode.x > halfWidth) {
            this.fsm.die();
        }
    },

    takeDamage(damage) {
        if (this.fsm.state === 'dead') return;

        this.mana -= damage;
        this.updateHpBar();

        const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        EffectController.instance.playEffectText(worldPos, damage, 0.5);

        if (this.mana <= 0) {
            this.onDie();
        } else {
            this.fsm.hit();
        }
    },

    updateHpBar() {
        if (this.mobHpBar) {
            this.mobHpBar.progress = this.mana / this.maxMana;
        }
    },

    flashOnHit() {
        const target = this.spriteNode;
        if (!target) return;

        if (this.hitTween) this.hitTween.stop();

        const originalColor = target.color;

        this.hitTween = cc.tween(target)
            .to(0.05, { color: cc.Color.RED })
            .to(0.05, { color: originalColor })
            .start();
    },

    runAnimation() {
        if (!this.spriteNode) return;

        this.walkTween = cc.tween(this.spriteNode)
            .repeatForever(
                cc.tween()
                    .to(0.5, { angle: 10 })
                    .to(0.5, { angle: -10 })
            )
            .start();
    },

    stopAnimation() {
        if (this.walkTween) {
            this.walkTween.stop();
            this.walkTween = null;
        }

        if (this.hitTween) {
            this.hitTween.stop();
            this.hitTween = null;
        }

        if (this.spriteNode) {
            this.spriteNode.angle = 0;
            this.spriteNode.color = cc.Color.WHITE;
        }
    },

    onDie() {
        this.fsm.die();
    }
});
