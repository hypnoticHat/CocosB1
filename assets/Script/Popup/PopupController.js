cc.Class({
    extends: cc.Component,

    properties: {
        PopupRank: cc.Node,
        PopupSetting: cc.Node,
        blurBackground: cc.Node,
    },

    onLoad() {
        this.blurBackground.on(cc.Node.EventType.TOUCH_END, this.onClickBlur, this);
        this.hideBlur();

        cc.systemEvent.on('popupRank', this.showPopupRank, this);
        cc.systemEvent.on('hidePopupRank', this.hidePopupRank, this);
        cc.systemEvent.on('popupSetting', this.showPopupSetting, this);
        cc.systemEvent.on('hidePopupSetting', this.hidePopupSetting, this);
    },

    onClickBlur() {
        this.hideAllPopups();
    },

    showPopupRank() {
        this.showBlur();

        this.PopupRank.getComponent('PopupRank').show();
    },

    hidePopupRank() {
        this.PopupRank.getComponent('PopupRank').hide();
        this.hideBlur();
    },

    showPopupSetting() {
        this.showBlur();
        this.PopupSetting.getComponent('PopupSetting').show();
    },

    hidePopupSetting() {
        this.PopupSetting.getComponent('PopupSetting').hide();
        this.hideBlur();
    },

    showBlur() {
        this.blurBackground.active = true;
    },

    hideBlur() {
        this.blurBackground.active = false;
    },

    hideAllPopups() {
        this.hidePopupRank();
        this.hidePopupSetting();
    }
});
