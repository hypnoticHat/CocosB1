
cc.Class({
    extends: require('PopupItem'),

    properties: {
        tableController: cc.Node,
    },

    onLoad(){
        this._super();
        let names = [
            "PlayerOne", "ShadowStrike", "DragonSlayer", "NightWolf", "GhostRider",
            "SniperX", "Phoenix", "BlazeStorm", "IronFist", "SilentBlade"
        ];

        let data = this.randomScore(names)

        this.tableController.getComponent('TableController').loadData(data);
    },

    show() {
        this._super();
    },
    hide() {
        this._super();
    },
    randomScore(names){
        return names.map((name, index) => {
            return {
                id: index + 1,
                name: name,
                score: Math.floor(Math.random() * 10001)
            };
        }).sort((b,a)=> a.score - b.score);
    },


 
});
