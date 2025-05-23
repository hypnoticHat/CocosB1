
cc.Class({
    extends: require('PopupItem'),

    properties: {
        tableController: cc.Node,
    },

    onLoad(){
        this._super();
        let data = [1,2,3,4,5,6,7,8,9,10];

        this.tableController.getComponent('TableController').loadData(data);
    },

    show() {
        this._super();
    },
    hide() {
        this._super();
    },


 
});
