
cc.Class({
    extends: cc.Component,

    properties: {
        popupController: cc.Node,
    },


    onLoad () {

    },

    start () {
        this.lobby = this.popupController.getComponent('PopupController')
    },

    showPopupRank() {
        this.lobby.showPopupRank();
    },
    
    hidePopupRank() {
        this.lobby.hidePopupRank();
    },
    
    showPopupSetting() {
        this.lobby.showPopupSetting();
    },
    
    hidePopupSetting() {
        this.lobby.hidePopupSetting();
    },


});
