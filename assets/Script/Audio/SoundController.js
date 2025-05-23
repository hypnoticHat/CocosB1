cc.Class({
    extends: cc.Component,

    properties: {
        labelVolumeBGM: cc.Label,
        labelVolumeEffect: cc.Label,

        bgmClip: {
            type: cc.AudioClip,
            default: null,
        },

        clickSound: {
            type: cc.AudioClip,
            default: null,
        },

        bgmAudioSource: cc.AudioSource,
        effectAudioSource: cc.AudioSource,

        BgmToggle: cc.Toggle,
        SfxToggle: cc.Toggle,

        SliderBGM: cc.Slider,
        SliderSFX: cc.Slider,


    },

    start() {
        this.audioSettings = {
            bgm: {
                source: this.bgmAudioSource,
                label: this.labelVolumeBGM,
                volume: 1,
                step: 0.1,
            },
            effect: {
                source: this.effectAudioSource,
                label: this.labelVolumeEffect,
                volume: 1,
                step: 0.2,
            },
        };

        this.bgmAudioSource.clip = this.bgmClip;
        this.bgmAudioSource.loop = true;
        this.bgmAudioSource.play();

        this.updateAudioSetting("bgm");
        this.updateAudioSetting("effect");

        if (this.BgmToggle) {
            this.BgmToggle.isChecked = !this.audioSettings.bgm.source.mute;
        }
        
        if (this.SfxToggle) {
            this.SfxToggle.isChecked = !this.audioSettings.effect.source.mute;
        }

        this.SliderBGM.node.on('slide', this.onSliderBgmChanged, this);
        this.SliderSFX.node.on('slide', this.onSliderSfxChanged, this);

        this.SliderBGM.progress = this.audioSettings.bgm.volume;
        this.SliderSFX.progress = this.audioSettings.effect.volume;

    },

    playClickSound() {
        const source = this.audioSettings.effect.source;
        source.clip = this.clickSound;
        source.loop = false;
        source.volume = this.audioSettings.effect.volume;
        source.play();
    },

    updateAudioSetting(type) {
        const setting = this.audioSettings[type];
        setting.source.volume = setting.volume;
        setting.label.string = `${Math.round(setting.volume * 100)}`;
    },

    onSliderBgmChanged(slider) {
        const value = parseFloat(slider.progress.toFixed(2));
        this.audioSettings.bgm.volume = value;
        this.updateAudioSetting("bgm");
    },
    
    onSliderSfxChanged(slider) {
        const value = parseFloat(slider.progress.toFixed(2));
        this.audioSettings.effect.volume = value;
        this.updateAudioSetting("effect");
    },
    

    toggleBgmSound() {
        this.audioSettings.bgm.source.mute = !this.BgmToggle.isChecked;
    },

    toggleSfxSound() {
        this.audioSettings.effect.source.mute = !this.SfxToggle.isChecked;
    }
    
});
