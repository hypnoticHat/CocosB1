const EventKeys = require('EventKeys');
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

        cc.systemEvent.on(EventKeys.POPUP.SHOW_RANK, this.showPopupRank, this);
        cc.systemEvent.on(EventKeys.POPUP.HIDE_RANK, this.hidePopupRank, this);
        cc.systemEvent.on(EventKeys.POPUP.SHOW_SETTING, this.showPopupSetting, this);
        cc.systemEvent.on(EventKeys.POPUP.HIDE_SETTING, this.hidePopupSetting, this);
    },

    onDestroy() {
        cc.systemEvent.off(EventKeys.POPUP.SHOW_RANK, this.showPopupRank, this);
        cc.systemEvent.off(EventKeys.POPUP.HIDE_RANK, this.hidePopupRank, this);
        cc.systemEvent.off(EventKeys.POPUP.SHOW_SETTING, this.showPopupSetting, this);
        cc.systemEvent.off(EventKeys.POPUP.HIDE_SETTING, this.hidePopupSetting, this);
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
