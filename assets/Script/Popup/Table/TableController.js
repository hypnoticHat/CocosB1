cc.Class({
    extends: cc.Component,

    properties: {
        cellPrefab: cc.Prefab,
        badgeFrames: [cc.SpriteFrame],
    },

    onLoad() {
        this.cellPool = new cc.NodePool();
    },

    loadData(data) {
        this.data = data;

        while (this.node.children.length > 0) {
            const child = this.node.children[0];
            this.cellPool.put(child);
        }

        for (let i = 0; i < data.length; i++) {
            const cell = this._getCell();
            cell.getComponent('Cells').init(data[i], i, this.badgeFrames);
            this.node.insertChild(cell, i);
        }
    },

    _getCell() {
        if (this.cellPool.size() > 0) {
            return this.cellPool.get();
        } else {
            return cc.instantiate(this.cellPrefab);
        }
    },
});
