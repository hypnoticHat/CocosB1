
cc.Class({
    extends: require('PopupItem'),

    properties: {
        labelVolumeBGM: cc.Label,
        labelVolumeEffect: cc.Label,

        BgmToggle: cc.Toggle,
        SfxToggle: cc.Toggle,

        SliderBGM: cc.Slider,
        SliderSFX: cc.Slider,

        soundController: cc.Node,
    },

    start() {
        this.controller = this.soundController.getComponent('SoundController');

        this.BgmToggle.isChecked = !this.controller.bgmAudioSource.mute;
        this.SfxToggle.isChecked = !this.controller.effectAudioSource.mute;

        this.SliderBGM.progress = this.controller.getVolume("bgm");
        this.SliderSFX.progress = this.controller.getVolume("effect");

        this.updateLabel("bgm");
        this.updateLabel("effect");

        this.SliderBGM.node.on('slide', this.onSliderBgmChanged, this);
        this.SliderSFX.node.on('slide', this.onSliderSfxChanged, this);
    },

    updateLabel(type) {
        const volume = this.controller.getVolume(type);
        if (type === "bgm") {
            this.labelVolumeBGM.string = `${Math.round(volume * 100)}`;
        } else {
            this.labelVolumeEffect.string = `${Math.round(volume * 100)}`;
        }
    },

    onSliderBgmChanged(slider) {
        const value = parseFloat(slider.progress.toFixed(2));
        this.controller.setVolume("bgm", value);
        this.updateLabel("bgm");
    },

    onSliderSfxChanged(slider) {
        const value = parseFloat(slider.progress.toFixed(2));
        this.controller.setVolume("effect", value);
        this.updateLabel("effect");
    },

    toggleBgmSound() {
        this.controller.toggleMute("bgm", this.BgmToggle.isChecked);
    },

    toggleSfxSound() {
        this.controller.toggleMute("effect", this.SfxToggle.isChecked);
    }
});
