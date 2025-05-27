cc.Class({
    extends: cc.Component,

    properties: {
        bgmClip: {
            type: cc.AudioClip,
            default: null
        },
        clickSound: {
            type: cc.AudioClip,
            default: null
        },
        bgmAudioSource: {
            type: cc.AudioSource,
            default: null
        },
        effectAudioSource: {
            type: cc.AudioSource,
            default: null
        }
    },

    onLoad() {
        this.masterVolume = 1;

        this.effectAudioSource.volume = 1;
        this.playBgm();

        cc.systemEvent.on('volume-change', this.onVolumeChange, this);
        cc.systemEvent.on('toggle-mute', this.onToggleMute, this);
        cc.systemEvent.on('play-click-sound', this.playClickSound, this);
    },

    onDestroy() {
        cc.systemEvent.off('volume-change', this.onVolumeChange, this);
        cc.systemEvent.off('toggle-mute', this.onToggleMute, this);
        cc.systemEvent.off('play-click-sound', this.playClickSound, this);
    },

    playBgm() {
        this.bgmAudioSource.clip = this.bgmClip;
        this.bgmAudioSource.loop = true;
        this.bgmAudioSource.volume = 1;
        this.bgmAudioSource.play();
    },

    onVolumeChange(event) {
        const { type, volume } = event;
        if (type === "bgm") {
            this.bgmAudioSource.volume = volume;
        } else if (type === "effect") {
            this.effectAudioSource.volume = volume;
        }
    },

    onToggleMute(event) {
        const { type, isOn } = event;
        if (type === "bgm") {
            this.bgmAudioSource.mute = !isOn;
        } else if (type === "effect") {
            this.effectAudioSource.mute = !isOn;
        }
    },

    playClickSound() {
        this.effectAudioSource.clip = this.clickSound;
        this.effectAudioSource.loop = false;
        this.effectAudioSource.play();
    }
});
