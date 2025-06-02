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
        }

        this.mobDict = new Map();
        this.mobList = [];
        this._idCounter = 0;
    },

    start() {
        this.posX = 800;
        this.maxY = 280;
        this.minY = -300;

        this.schedule(() => {
            const prefab = this.getRandomMobPrefab();
            if (!prefab) return;
            const position = this.getRandomPosition();
            this.spawnMob(prefab, position);
        }, 1);

        cc.systemEvent.on('spawn-boss', this.onSpawnBoss, this);

        this.schedule(this.cleanupMobs, 0.5);  // schedule cleanup Ä‘á»‹nh ká»³
    },

    getRandomMobPrefab() {
        if (this.mobsPrefab.length === 0) {
            cc.error('No mob prefabs assigned!');
            return null;
        }
        const index = Math.floor(Math.random() * this.mobsPrefab.length);
        return this.mobsPrefab[index];
    },

    getRandomPosition() {
        const y = Math.random() * (this.maxY - this.minY) + this.minY;
        return cc.v2(this.posX, y);
    },

    generateUniqueId() {
        this._idCounter += 1;
        return 'mob_' + this._idCounter;
    },

    spawnMob(mobPrefab, position) {
        const mobNode = cc.instantiate(mobPrefab);
        mobNode.parent = this.mobParent;
        mobNode.position = position;
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
        cc.log(this.mobDict);

        return mob;
    },

    onMobDead(id) {
        const mob = this.mobDict.get(id);
        if (mob) {
            mob.node.destroy();
            mob._isRemoved = true;
            this.mobDict.delete(id);
        }
    },

    cleanupMobs() {
        this.mobList = this.mobList.filter(mob => !mob._isRemoved);
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
            cc.warn('[MobController] Boss prefab missing MobsBase!');
        }
    }
});
module.exports = MobController;