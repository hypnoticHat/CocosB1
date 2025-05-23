export default class AudioSetting {
    constructor(audioSource, volume = 1) {
        this.audioSource = audioSource;
        this.volume = volume;
        this.muted = false;

        this.applyVolume();
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(vol, 1));
        this.applyVolume();
    }

    getVolume() {
        return this.volume;
    }

    mute() {
        this.audioSource.mute = true;
        this.muted = true;
    }

    unmute() {
        this.audioSource.mute = false;
        this.muted = false;
    }

    toggleMute() {
        this.muted ? this.unmute() : this.mute();
    }

    applyVolume() {
        if (!this.audioSource.mute) {
            this.audioSource.volume = this.volume;
        }
    }

    playOneShot(clip) {
        this.audioSource.playOneShot(clip);
    }
}
