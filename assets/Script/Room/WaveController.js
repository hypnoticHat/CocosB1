const EventKeys = require('EventKeys');
const WaveController = cc.Class({
    extends: cc.Component,

    properties: {
        mobControllerNode: cc.Node,
    },

    onLoad() {
        if (!WaveController.instance) {
        WaveController.instance = this;
    } else {
        this.node.destroy();
        return;
    }
        this.mobController = this.mobControllerNode.getComponent('MobController');

        this.currentWaveIndex = 0;
        this.waveTimer = 0;
        this.spawnTimer = 0;
        this.inRestTime = false;
        this.restTimer = 0;
        this.mobSpawnedInWave = 0;

        this.defineWaves();
        this.totalWaves = this.waves.length;

        this.scheduleOnce(() => {
            cc.systemEvent.emit(EventKeys.CONTROLLER.WAVE_PROGESS, {
                currentWave: this.currentWaveIndex + 1,
                totalWave: this.totalWaves
            });
        }, 0);
        this.schedule(this.updateWaves, 0.1);
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
                    { prefab: this.mobController.mobsPrefab[0], weight: 100 },
                ]
            },
            {
                duration: 20,
                spawnInterval: 1,
                maxMobCount: 5,
                maxMobInWave: 10,
                restTime: 10,
                mobs: [
                    { prefab: this.mobController.mobsPrefab[0], weight: 80 },
                    { prefab: this.mobController.mobsPrefab[1], weight: 20 },
                ]
            },            
            {
                duration: 10,
                spawnInterval: 1,
                maxMobCount: 5,
                maxMobInWave: 10,
                restTime: 10,
                mobs: [
                    { prefab: this.mobController.mobsPrefab[0], weight: 50 },
                    { prefab: this.mobController.mobsPrefab[1], weight: 50 },
                ]
            },

        ];
    },

    updateWaves(dt) {
        if (this.currentWaveIndex >= this.waves.length) return;

        const currentWave = this.waves[this.currentWaveIndex];

        if (this.inRestTime) {
            this.restTimer += dt;
            if (this.restTimer >= currentWave.restTime) {
                this.nextWave();
            }
            return;
        }

        this.waveTimer += dt;
        this.spawnTimer += dt;

        if (this.spawnTimer >= currentWave.spawnInterval &&
            this.mobController.mobList.length < currentWave.maxMobCount &&
            this.mobSpawnedInWave < currentWave.maxMobInWave) {

            const prefab = this.getRandomMobPrefab(currentWave.mobs);
            const pos = this.mobController.getRandomPosition();
            this.mobController.spawnMob(prefab, pos);
            this.spawnTimer = 0;
            this.mobSpawnedInWave++;
        }

        const allMobsDead = this.mobController.mobList.length === 0;
        const spawnDone = this.mobSpawnedInWave >= currentWave.maxMobInWave;

        if (spawnDone && allMobsDead) {
            this.inRestTime = true;
            this.restTimer = 0;
            cc.log(`End wave ${this.currentWaveIndex + 1}, resting...`);
        }
    },

    nextWave() {
        this.currentWaveIndex++;
        if (this.currentWaveIndex >= this.totalWaves) {
            cc.log('All waves completed!');
            return;
        }

        cc.systemEvent.emit(EventKeys.CONTROLLER.WAVE_PROGESS, {
            currentWave: this.currentWaveIndex + 1,
            totalWave: this.totalWaves
        });

        this.inRestTime = false;
        this.waveTimer = 0;
        this.spawnTimer = 0;
        this.mobSpawnedInWave = 0;

        cc.log(`Starting wave ${this.currentWaveIndex + 1}`);
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
});

module.exports = WaveController;
