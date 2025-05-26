cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: {
            default: null,
            type: cc.Label
        },
        scoreLabel:{
            type: cc.Label,
            default: null
        },
        rankLabel: {
            type: cc.Label,
            default: null
        },
        badgeSprite: cc.Sprite,

    },

    init(data, index, badgeFrames){
        this.data = data;
        this.titleLabel.string = data.name;
        this.scoreLabel.string = data.score;

        if (index < badgeFrames.length) {
            this.badgeSprite.spriteFrame = badgeFrames[index];
            this.badgeSprite.node.active = true;
            this.rankLabel.node.active = false;
        } else {
            this.rankLabel.string = (index + 1).toString();
            this.rankLabel.node.active = true;
            this.badgeSprite.node.active = false;
        }
    }



});
