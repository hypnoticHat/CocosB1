
cc.Class({
    extends: cc.Component,

    properties: {
    },

    showPopupRank() {
        cc.systemEvent.emit('popupRank');
    },
    
    hidePopupRank() {
        cc.systemEvent.emit('hidePopupRank');
    },
    
    showPopupSetting() {
        cc.systemEvent.emit('popupSetting');
    },
    
    hidePopupSetting() {
        cc.systemEvent.emit('hidePopupSetting');
    },


});
