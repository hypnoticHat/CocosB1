cc.Class({
    extends: cc.Component,

    properties: {
        progressBars: [cc.ProgressBar]
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClick, this);
    },

    onButtonClick() {
        this.progressBars.forEach((bar) => {
            if (!bar) return;

            bar.progress += 0.1;
            if (bar.progress > 1) {
                bar.progress = 0;
            }
        });
    }
});
