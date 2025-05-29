const MobsType = require("MobsType");
cc.Class({
    extends: cc.Component,

    properties: {
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
        }
    },

    onLoad() {
        this.maxMana = this.mana;
        this.updateHpBar();

        cc.director.getCollisionManager().enabled = true;

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
        if(this.mana <= 0){
            this.onDie();
        }
    },

    onDie(){
        this.node.destroy();
    },

    runAnimation(){
        cc.tween(this.node)
            .repeatForever(
            cc.tween()
                .to(.5, { angle: 10 })
                .to(.5, { angle: -10 })
            )
            .start()
    }

});
