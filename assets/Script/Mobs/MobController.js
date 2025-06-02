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
        this._idCounter = 0;

        this.currentWaveIndex = 0;
        this.waveTimer = 0;
        this.spawnTimer = 0;
        this.inRestTime = false;
        this.restTimer = 0;
        this.mobSpawnedInWave = 0;

        this.posX = 800;
        this.maxY = 280;
        this.minY = -300;

        this.defineWaves();
    },

    start() {
        this.schedule(this.updateWaves, 0.1);
        cc.systemEvent.on('spawn-boss', this.onSpawnBoss, this);
        this.schedule(this.cleanupMobs, 1);
    },

    defineWaves() {
        this.waves = [
            {
                duration: 10,
                spawnInterval: 1,
                maxMobCount: 5,
                maxMobInWave: 10,
                restTime: 10,
                mobs: [
                    { prefab: this.mobsPrefab[0], weight: 100 },
                ]
            },
            {
                duration: 20,
                spawnInterval: 0.8,
                maxMobCount: 8,
                maxMobInWave: 10,
                restTime: 12,
                mobs: [
                    { prefab: this.mobsPrefab[0], weight: 60 },
                    { prefab: this.mobsPrefab[1], weight: 40 },
                ]
            },
            {
                duration: 30,
                spawnInterval: 0.8,
                maxMobCount: 8,
                maxMobInWave: 10,
                restTime: 12,
                mobs: [
                    { prefab: this.mobsPrefab[0], weight: 40 },
                    { prefab: this.mobsPrefab[1], weight: 60 },
                ]
            }
        ];
    },

    updateWaves(dt) {
        if (this.currentWaveIndex >= this.waves.length) return;

        const currentWave = this.waves[this.currentWaveIndex];

        if (this.inRestTime) {
            this.restTimer += dt;
            if (this.restTimer >= currentWave.restTime) {
                this.currentWaveIndex++;
                if(this.currentWaveIndex > this.waves.length-1){
                    cc.log('End Game!');
                }

                this.inRestTime = false;
                this.waveTimer = 0;
                this.spawnTimer = 0;
                this.mobSpawnedInWave = 0;
                cc.log(`Bắt đầu Wave ${this.currentWaveIndex + 1}`);
            }
            return;
        }

        this.waveTimer += dt;
        this.spawnTimer += dt;

        if (this.spawnTimer >= currentWave.spawnInterval &&
            this.mobList.length < currentWave.maxMobCount &&
            this.mobSpawnedInWave < currentWave.maxMobInWave) {

            const prefab = this.getRandomMobPrefab(currentWave.mobs);
            const pos = this.getRandomPosition();
            this.spawnMob(prefab, pos);
            this.spawnTimer = 0;
            this.mobSpawnedInWave++;
        }

        const allMobsDead = this.mobList.length === 0;
        const waveTimeExceeded = this.waveTimer >= currentWave.duration;
        const spawnDone = this.mobSpawnedInWave >= currentWave.maxMobInWave;

        if (spawnDone && (allMobsDead || waveTimeExceeded)) {
            this.inRestTime = true;
            this.restTimer = 0;
            cc.log(`Kết thúc Wave ${this.currentWaveIndex + 1}, nghỉ ${currentWave.restTime}s`);
        }
    },

    getRandomMobPrefab(mobList) {
        const totalWeight = mobList.reduce((sum, mob) => sum + mob.weight, 0);
        let rand = Math.random() * totalWeight;
        let cumulative = 0;

        for (let mob of mobList) {
            cumulative += mob.weight;
            if (rand < cumulative) {
                return mob.prefab;
            }
        }

        return mobList[0].prefab;
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
    }
});

module.exports = MobController;
