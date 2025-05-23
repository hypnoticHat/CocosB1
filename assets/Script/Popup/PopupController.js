
cc.Class({
    extends: cc.Component,

    properties: {
        PopupRank: cc.Node,
        PopupSetting: cc.Node,
    },

    showPopupRank() {
        this.PopupRank.getComponent('PopupRank').show();
    },

    hidePopupRank() {
        this.PopupRank.getComponent('PopupRank').hide();
    },
    showPopupSetting() {
        this.PopupSetting.getComponent('PopupSetting').show();
    },
    hidePopupSetting() {
        this.PopupSetting.getComponent('PopupSetting').hide();
    }


});
