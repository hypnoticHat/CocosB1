const sceneManger = require("SceneManager");
cc.Class({
    extends: cc.Component,

    properties: {
       loadingLabel: cc.Label,
       progressBar: cc.ProgressBar,
       playerSprite: cc.Node,
    },

   

    start () {
        const targetScene = sceneManger.getTargetScene();
        if (!targetScene) {
            cc.log('Cant find targetScene');
        }

        this.startLoading(targetScene);
    },

    startLoading(targetScene, onFinish = null){
        this.loadingLabel.string = "Loading...";
        this.progressBar.progress = 0;
        this.lastProgress = 0;

        this.spine = this.playerSprite.getComponent(sp.Skeleton);
        this.spine.setAnimation(0,"run",true);
        this.spine.timeScale = 0;

        cc.director.preloadScene(targetScene, (completedCount, totalCount) => {
            let progress = completedCount / totalCount;
            
            if(progress > this.lastProgress){
                this.lastProgress = progress;

                this.progressBar.progress = progress;
                this.spine.timeScale = 0.5 + progress * 1.5;
                this.loadingLabel.string = `Loading ${Math.floor(progress * 100)}%`;

                let barWidth = this.progressBar.node.width;
                this.playerSprite.x = this.progressBar.node.x - barWidth / 2 + barWidth * progress;
            }
        }, 
        () => {
            cc.director.loadScene(targetScene, () => {
                if (onFinish) onFinish();
            });
        });
    },
});
