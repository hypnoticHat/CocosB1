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

        this.effectAudioSource.volume = 1;

        this.playBgm();
    },

    playBgm() {
        this.bgmAudioSource.clip = this.bgmClip;
        this.bgmAudioSource.loop = true;
        this.bgmAudioSource.volume = 1;
        this.bgmAudioSource.play();
    },

    setVolume(type, volume) {
        if (type === "bgm") {
            this.bgmAudioSource.volume = volume;
        } else if (type === "effect") {
            this.effectAudioSource.volume = volume;
        }
    },

    getVolume(type) {
        if (type === "bgm") {
            return this.bgmAudioSource.volume;
        } else if (type === "effect") {
            return this.effectAudioSource.volume;
        }
        return 0;
    },

    toggleMute(type, isOn) {
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
