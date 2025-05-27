
cc.Class({
    extends: require('PopupItem'),

    properties: {
        tableController: cc.Node,
    },

    onLoad() {
        this._super();

        this.names = [
            "PlayerOne", "ShadowStrike", "DragonSlayer", "NightWolf", "GhostRider",
            "SniperX", "Phoenix", "BlazeStorm", "IronFist", "SilentBlade"
        ];
    },

    show() {
        this._super();

        let data = this.randomScore(this.names);
        this.tableController.getComponent('TableController').loadData(data);
    },

    randomScore(names) {
        return names.map((name, index) => {
            return {
                id: index + 1,
                name: name,
                score: Math.floor(Math.random() * 10001)
            };
        }).sort((b, a) => a.score - b.score);
    },



});
