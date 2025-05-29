cc.Class({
    extends: cc.Component,

    properties: {
        mobsPrefab: [cc.Prefab]
    },

    start() {
        this.schedule(this.randomSpawn, 1);
        this.posX = 800;
        this.maxY = 280;
        this.minY = -300;
    },

    randomSpawn() {
        const randomIndex = Math.floor(Math.random() * this.mobsPrefab.length);
        const prefab = this.mobsPrefab[randomIndex];

        const mob = cc.instantiate(prefab);

        const randomY = this.minY + Math.random() * (this.maxY - this.minY);
        mob.setPosition(this.posX, randomY);

        this.node.addChild(mob);
        
    }
});
