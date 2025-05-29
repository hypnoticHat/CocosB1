const EventKeys = require('EventKeys');
cc.Class({
    extends: require('PopupItem'),

    properties: {
        labelVolumeBGM: cc.Label,
        labelVolumeEffect: cc.Label,

        bgmToggle: cc.Toggle,
        sfxToggle: cc.Toggle,

        sliderBGM: cc.Slider,
        sliderSFX: cc.Slider,
    },

    start() {
        this.bgmToggle.isChecked = true;
        this.sfxToggle.isChecked = true;

        this.sliderBGM.progress = 1;
        this.sliderSFX.progress = 1;

        this.updateLabel("bgm");
        this.updateLabel("effect");

        this.registerToggleWithSound(this.bgmToggle);
        this.registerToggleWithSound(this.sfxToggle);        

        this.registerSliderWithSound(this.sliderBGM);
        this.registerSliderWithSound(this.sliderSFX);

        this.sliderBGM.node.on('slide', this.onsliderBgmChanged, this);
        this.sliderSFX.node.on('slide', this.onsliderSfxChanged, this);

        this.bgmToggle.node.on('toggle', this.toggleBgmSound, this);
        this.sfxToggle.node.on('toggle', this.toggleSfxSound, this);

    },

    updateLabel(type) {
        const volume = (type === "bgm") ? this.sliderBGM.progress : this.sliderSFX.progress;
        if (type === "bgm") {
            this.labelVolumeBGM.string = `${Math.round(volume * 100)}`;
        } else {
            this.labelVolumeEffect.string = `${Math.round(volume * 100)}`;
        }
    },

    onsliderBgmChanged(slider) {
        const value = parseFloat(slider.progress.toFixed(2));
        this.updateLabel("bgm");
        cc.systemEvent.emit(EventKeys.AUDIO.VOLUME_CHANGE, { type: "bgm", volume: value });
    },

    onsliderSfxChanged(slider) {
        const value = parseFloat(slider.progress.toFixed(2));
        this.updateLabel("effect");
        cc.systemEvent.emit(EventKeys.AUDIO.VOLUME_CHANGE, { type: "effect", volume: value });
    },

    toggleBgmSound() {
        cc.systemEvent.emit(EventKeys.AUDIO.TOGGLE_MUTE, {
            type: "bgm",
            isOn: this.bgmToggle.isChecked,
        });
    },

    toggleSfxSound() {
        cc.systemEvent.emit(EventKeys.AUDIO.TOGGLE_MUTE, {
            type: "effect",
            isOn: this.sfxToggle.isChecked,
        });
    },

    playClickSoundOnce() {
        cc.systemEvent.emit(EventKeys.AUDIO.PLAY_CLICK_SOUND);
    },

    registerToggleWithSound(toggle) {
    
        toggle.node.on('toggle', () => {
            this.playClickSoundOnce();
        });
    },

    registerSliderWithSound(slider) {
    
        slider.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.playClickSoundOnce();
        });
    }
});
