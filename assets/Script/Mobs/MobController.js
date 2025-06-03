const EventKeys = require('EventKeys');
const MobController = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null,
    },

    properties: {
        mobsPrefab: [cc.Prefab],
        mobParent: cc.Node,
        bossPrefab: cc.Prefab,
    },

    onLoad() {
        if (!MobController.instance) {
            MobController.instance = this;
        } else {
            cc.warn('Multiple MobController instances!');
            this.node.destroy();
            return;
        }

        this.mobDict = new Map();
        this.mobList = [];
        this.idCounter = 0;

        this.posX = 800;
        this.maxY = 280;
        this.minY = -300;
    },

    start() {
        this.schedule(this.cleanupMobs, 1);
        cc.systemEvent.on(EventKeys.CONTROLLER.SPAWM_BOSS, this.onSpawnBoss, this);
    },
    onDestroy() {
        cc.systemEvent.off(EventKeys.CONTROLLER.SPAWM_BOSS, this.onSpawnBoss, this);
    },

    getRandomPosition() {
        const y = Math.random() * (this.maxY - this.minY) + this.minY;
        return cc.v2(this.posX, y);
    },

    generateUniqueId() {
        this.idCounter += 1;
        return 'mob_' + this.idCounter;
    },

    spawnMob(mobPrefab, position) {
        const mobNode = cc.instantiate(mobPrefab);
        mobNode.parent = this.mobParent;
        mobNode.position = position;
        mobNode.zIndex = Math.floor(-position.y);

        const mob = mobNode.getComponent('MobsBase');
        if (!mob) {
            cc.warn('Prefab missing MobsBase component!');
            return null;
        }

        const newId = this.generateUniqueId();
        mob.init(newId);
        mob.id = newId;

        this.mobDict.set(newId, mob);
        this.mobList.push(mob);

        return mob;
    },

    onMobDead(id) {
        const mob = this.mobDict.get(id);
        if (mob) {
            mob.node.destroy();
            mob.isRemoved = true;
            this.mobDict.delete(id);
        }
    },

    cleanupMobs() {
        this.mobList = this.mobList.filter(mob => !mob.isRemoved);
    },

    onSpawnBoss(position) {
        const bossNode = cc.instantiate(this.bossPrefab);
        bossNode.position = position;
        this.mobParent.addChild(bossNode);

        const bossScript = bossNode.getComponent('MobsBase');
        if (bossScript) {
            const newId = this.generateUniqueId();
            bossScript.init(newId);
            bossScript.id = newId;

            this.mobDict.set(newId, bossScript);
            this.mobList.push(bossScript);
        } else {
            cc.warn('MobController Boss prefab missing MobsBase!');
        }
    },
});

module.exports = MobController;
