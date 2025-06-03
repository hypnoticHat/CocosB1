const WaveController = require("WaveController");
const EventKeys = require('EventKeys');
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: cc.ProgressBar,
        normalWaveSpriteFrame: cc.SpriteFrame,
        bossWaveSpriteFrame: cc.SpriteFrame,
        barNode: cc.Node,
        iconSize: 100,
        activeScale: 1.5,
        inactiveScale: 1,
    },

    onLoad() {
        cc.systemEvent.on(EventKeys.CONTROLLER.WAVE_PROGESS , this.updateWaveDisplay, this);

            if (!WaveController.instance || !WaveController.instance.waves) {
                cc.error("WaveController or waves missing.");
                return;
            }

            this.totalWaves = WaveController.instance.waves.length;
            this.iconNodes = [];

            this.initWaveIcons();
    },


    initWaveIcons() {
        if (this.totalWaves <= 0) return;

        const barNode = this.barNode;

        const totalWidth = barNode.width;

        for (let i = 0; i < this.totalWaves; i++) {
            const icon = new cc.Node("wave_" + (i + 1));
            const sprite = icon.addComponent(cc.Sprite);
            sprite.spriteFrame = (i === this.totalWaves - 1)
                ? this.bossWaveSpriteFrame
                : this.normalWaveSpriteFrame;

            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            icon.setContentSize(this.iconSize+10, this.iconSize+12);
            icon.setAnchorPoint(0.5, 0.5);
            icon.setScale(this.inactiveScale);

            barNode.addChild(icon);

            this.iconNodes.push(icon);
        }

        if (this.totalWaves === 1) {
            const barNode = this.barNode || (this.progressBar ? this.progressBar.node : null);
            const totalWidth = barNode.width;
            this.iconNodes[0].setPosition(cc.v2(totalWidth - this.iconSize / 2, 0));
        } 
        else {
            const step = this.totalWaves > 1 ? totalWidth / (this.totalWaves - 1) : 0;
            for (let i = 0; i < this.totalWaves; i++) {
                const x = i * step;
                this.iconNodes[i].setPosition(cc.v2(x, 0));
            }
        }
    },
    
    updateWaveDisplay(data) {

        const currentWave = Math.max(0, data.currentWave - 1);
            if (this.totalWaves <= 1) {
            this.progressBar.progress = 1;
        } else {
            this.progressBar.progress = currentWave / (this.totalWaves - 1);
        }

        for (let i = 0; i < this.iconNodes.length; i++) {
            const icon = this.iconNodes[i];
            icon.setScale(i === currentWave ? this.activeScale : this.inactiveScale);
        }
    },

    onDestroy() {
        cc.systemEvent.off(EventKeys.CONTROLLER.WAVE_PROGESS, this.updateWaveDisplay, this);
    }
});
