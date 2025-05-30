cc.Class({
    extends: cc.Component,

    properties: {
        mobsPrefab: [cc.Prefab],
        mobList: [],
        idCounter: 0,
        mobParent: cc.Node,
        bossPrefab: cc.Prefab,
    },

    start() {
        this.schedule(() => {
            const prefab = this.getRandomMobPrefab();
            const position = this.getRandomPosition();
            this.spawnMob(prefab, position);
        }, 1);

        this.posX = 800;
        this.maxY = 280;
        this.minY = -300;
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

    spawnMob(mobPrefab, position) {
        const mobNode = cc.instantiate(mobPrefab);
        mobNode.parent = this.mobParent;
        mobNode.position = position;

        const mob = mobNode.getComponent('MobsBase');
        const newId = this.generateUniqueId();

        mob.init(newId);

        this.mobList.push(mob)
        cc.log(this.mobList);

        mob.node.on('mob-dead', this.onMobDead, this);
        cc.systemEvent.on('spawn-boss', this.onSpawnBoss, this);

        return mob;
    },

    generateUniqueId() {
        this._idCounter += 1;
        return 'mob_' + this._idCounter;
    },

    onMobDead(id) {
        const idx = this.mobList.findIndex(mob => mob.id === id);
        if (idx !== -1) {
            const mob = this.mobList[idx];
            mob.node.destroy();
            this.mobList.splice(idx, 1);
        }
    },
    onSpawnBoss(position) {
        const bossNode = cc.instantiate(this.bossPrefab);
        bossNode.setPosition(position);
        this.mobParent.addChild(bossNode);

        const bossScript = bossNode.getComponent('MobsBase');
        if (bossScript) {
            const newId = this.generateUniqueId();
            bossScript.init(newId);
            this.mobList.push(bossScript);
            bossNode.on('mob-dead', this.onMobDead, this);
        } else {
            cc.warn('[MobController] Boss prefab missing MobBase!');
        }
    },
});
