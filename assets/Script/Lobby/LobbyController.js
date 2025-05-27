
cc.Class({
    extends: cc.Component,

    properties: {
        popupController: cc.Node,
    },


    onLoad () {

    },

    start () {
        this.Popup = this.popupController.getComponent('PopupController')
    },

    showPopupRank() {
        this.Popup.showPopupRank();
    },
    
    hidePopupRank() {
        this.Popup.hidePopupRank();
    },
    
    showPopupSetting() {
        this.Popup.showPopupSetting();
    },
    
    hidePopupSetting() {
        this.Popup.hidePopupSetting();
    },


});
