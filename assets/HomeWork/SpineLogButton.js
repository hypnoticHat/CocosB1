cc.Class({
    extends: cc.Component,

    properties: {
        spineNode: cc.Node,
        scrollView: cc.ScrollView,
        buttonPrefab: cc.Prefab,
        loopToggle: cc.Toggle
    },

    start(){

        this.spine = this.spineNode.getComponent(sp.Skeleton);
        let runtimeData = this.spine.skeletonData.getRuntimeData();
        let animations = runtimeData.animations;
        let content = this.scrollView.content;

        for (let i = 0; i < animations.length; i++) {
            let animName = animations[i].name;

            let btn = cc.instantiate(this.buttonPrefab);
            btn.parent = content;

            let label = btn.getComponentInChildren(cc.Label);
            if (label) {
                label.string = animName;
            }

            btn.on('click', () => {
                let loop = this.loopToggle.isChecked;
                this.spine.setAnimation(0, animName, loop);
            });
        }
    }
});
