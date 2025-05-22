function getRandomBrightColor() {
    const r = Math.floor(100 + Math.random() * 155);
    const g = Math.floor(100 + Math.random() * 155);
    const b = Math.floor(100 + Math.random() * 155);
    return new cc.Color(r, g, b);
}

let soundController = cc.Class({
    extends: cc.Component,

    properties: {
        labelVolumeBGM: {
            type: cc.Label,
            default: null,
        },

        labelVolumeEffect: {
            type: cc.Label,
            default: null,
        },

        bgmClip: {
            type: cc.AudioClip,
            default: null,
        },

        clickSound: {
            type: cc.AudioClip,
            default: null,
        },

        spriteMain: {
            type: cc.Sprite,
            default: null,
        },

        buttonMinusTarget: {
            type: cc.Button,
            default: null,
        },

        spriteIconAlternate: {
            type: cc.SpriteFrame,
            default: null,
        },

        buttonIncreaseVolume: {
            type: cc.Button,
            default: null,
        }
    },

    start() {
        this.playBackgroundMusic();
        this.volume = 1;
        this.effectVolume = 1;
    },

    playBackgroundMusic() {
        this.bgmId = cc.audioEngine.play(this.bgmClip, false, 1);
    },

    playClickSound() {
        cc.audioEngine.playEffect(this.clickSound, false);
    },



    updateAudioSettings() {
        cc.audioEngine.setEffectsVolume(this.effectVolume);
        cc.audioEngine.setVolume(this.bgmId, this.volume);

        this.labelVolumeBGM.string = "Volume Engine: " + this.volume.toFixed(1);
        this.labelVolumeEffect.string = "Volume Effect: " + cc.audioEngine.getEffectsVolume().toFixed(1);

        const minFontSize = 10;
        const maxFontSize = 30;
        this.labelVolumeBGM.fontSize = Math.floor(minFontSize + (maxFontSize - minFontSize) * this.volume);

        this.labelVolumeEffect.node.color = getRandomBrightColor();
    },

    swapButtonSprites(targetButton) {
        const currentSprite = this.spriteMain.spriteFrame;
        targetButton.target.getComponent(cc.Sprite).spriteFrame = currentSprite;
        this.spriteMain.spriteFrame = this.spriteIconAlternate;
    },

    increaseVolume() {
        this.playClickSound();
        this.effectVolume = parseFloat(Math.min(this.effectVolume + 0.2, 1).toFixed(1));

        this.volume = parseFloat(Math.min(this.volume + 0.1, 1).toFixed(1));
        this.updateAudioSettings();
        this.swapButtonSprites(this.buttonMinusTarget);
    },

    decreaseVolume() {
        this.playClickSound();
        this.effectVolume = parseFloat(Math.max(this.effectVolume - 0.2, 0).toFixed(1));

        this.volume = parseFloat(Math.max(this.volume - 0.1, 0).toFixed(1));
        this.updateAudioSettings();
        this.swapButtonSprites(this.buttonIncreaseVolume);
    }
});
module.exports = {getRandomBrightColor};
