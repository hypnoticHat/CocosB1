const MobType = require("MobsType");
cc.Class({
    extends: cc.Component,

    properties: {
        bossPrefab: cc.Prefab,


    },
    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

onCollisionEnter(other, self) {
    if (other.node.group === 'Mobs') {
        const mobScript = other.node.getComponent('MobsBase');
        if (mobScript && mobScript.mobType === MobType.DOG) {
            other.node.destroy();
            this.node.destroy();

            const boss = cc.instantiate(this.bossPrefab);
            boss.setPosition(this.node.position);
            this.node.parent.addChild(boss);
        }
    }
}

});
