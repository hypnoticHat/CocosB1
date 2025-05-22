const { getRandomBrightColor } = require("SoundController");

cc.Class({
    extends: cc.Component,

    properties: {
        soundController: {
            type: cc.Component,
            default: null
        },
    },
    onLoad(){
        this.isColored = false;
        this.speed = 0;
        this.colorChangeTimer = 0;
        this.colorChangeInterval = 1;
    },

    update: function (dt) {
        this.node.angle += this.speed;
        
        if(this.isColored) {
            this.colorChangeTimer += dt;
            if (this.colorChangeTimer >= this.colorChangeInterval) {
                this.colorChangeTimer = 0;
                this.node.color = getRandomBrightColor();
            }
        }
    },

    addSpeed () {
        this.isColored = true;
        this.speed += 5;
        this.colorChangeInterval = Math.max(this.colorChangeInterval - 0.2,0.1);
        if(this.speed > 50) {
            this.node.angle = 0;
            this.speed = 0;
            this.isColored = false;
        }
    },

    


});