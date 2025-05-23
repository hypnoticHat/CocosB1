cc.Class({
    extends: cc.Component,

    properties: {
        cellPrefab: {
            default: null,
            type: cc.Prefab
        },
    },
    // onLoad () {
    //     for(let i = 0; i < 10; i++){
    //         const cell = cc.instantiate(this.cellPrefab);
    //         cell.parent = this.node;
    //         cell.getComponent('Cells').init(i);
    //     }
    // },

    loadData(data){
        this.data = data;
        for(let i = 0; i < 10; i++){
            let cell = cc.instantiate(this.cellPrefab);
            cell.parent = this.node;
            cell.getComponent('Cells').init(data[i]);
        }
    }

});
