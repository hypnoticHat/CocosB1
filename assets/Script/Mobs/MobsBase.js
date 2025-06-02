const MobsType = require("MobsType");
const MobController = require("MobController");
const EffectController = require("EffectController");
cc.Class({
    extends: cc.Component,

    properties: {
        mobId: {
            default: 0,
            type: cc.Integer,
        },
        mobType: {
            default: MobsType.DOG,
            type: MobsType,
        },
        mana: {
            default: 100,
            type: cc.Integer,
        },
        mobNode: {
            default: null,
            type: cc.Node,
        },
        mobHpBar: {
            default: null,
            type: cc.ProgressBar,
        },
        spriteNode: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad(){},

    init(id){
        this.id = id;
        this.maxMana = this.mana;
        this.updateHpBar();
        this.runAnimation();
    },

    updateHpBar() {
        if (this.mobHpBar) {
            this.mobHpBar.progress = this.mana / this.maxMana;
        }
    },

    onMove(speed, dt){
        if(this.mobNode){
            this.mobNode.x -= speed* dt;
            this.checkOutOfScreen();
        }
    },

    checkOutOfScreen() {
        const halfWidth = (cc.winSize.width / 2) + 100;
        const posX = this.mobNode.x;

        if (posX < -halfWidth || posX > halfWidth) {
            this.onDie();
        }
    },

    takeDamage(damage){
        this.mana -= damage;
        this.updateHpBar();
        this.flashOnHit();
        if(this.mana <= 0){
            this.onDie();
        }
        const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        EffectController.instance.playEffectText(worldPos,damage,.5);
    },

    flashOnHit() {
        const target = this.spriteNode;

        if (this.hitTween) {
            this.hitTween.stop();
        }

        const originalColor = target.color;

        this.hitTween = cc.tween(target)
            .to(0.05, { color: cc.Color.RED })
            .to(0.05, { color: originalColor })
            .start();
    },

    
    runAnimation(){
        this.runTween = cc.tween(this.spriteNode)
        .repeatForever(
            cc.tween()
            .to(.5, { angle: 10 })
            .to(.5, { angle: -10 })
        )
        .start()
    },
    
    onDie(){
        if (this.walkTween) {
            this.walkTween.stop();
            this.walkTween = null;
        }

        if (this._hitTween) {
            this._hitTween.stop();
            this._hitTween = null;
        }
        MobController.instance.onMobDead(this.id);
    },  
});
