cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: {
            default: null,
            type: cc.Label
        },
    },

    init(data){
        this.data = data;
        this.titleLabel.string = data;
        console.log("init data", data);
    }



});
