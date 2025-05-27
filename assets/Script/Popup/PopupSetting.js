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

        this.registerClickSoundFor(this.sliderBGM.node);
        this.registerClickSoundFor(this.sliderSFX.node);
        this.registerClickSoundFor(this.bgmToggle.node);
        this.registerClickSoundFor(this.sfxToggle.node);

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
        cc.systemEvent.emit('volume-change', { type: "bgm", volume: value });
    },

    onsliderSfxChanged(slider) {
        const value = parseFloat(slider.progress.toFixed(2));
        this.updateLabel("effect");
        cc.systemEvent.emit('volume-change', { type: "effect", volume: value });
    },

    toggleBgmSound() {
        cc.systemEvent.emit('toggle-mute', { type: "bgm", isOn: this.bgmToggle.isChecked });
    },

    toggleSfxSound() {
        cc.systemEvent.emit('toggle-mute', { type: "effect", isOn: this.sfxToggle.isChecked });
    },
    playClickSoundOnce() {
        cc.systemEvent.emit('play-click-sound');
    },

    registerClickSoundFor(node) {
        if (!node) return;
        const play = this.playClickSoundOnce.bind(this);
        node.on(cc.Node.EventType.TOUCH_START, play);
    }
});
