const EventKeys = require('EventKeys');
const ScreneManager = require('SceneManager');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    showPopupRank() {
        cc.systemEvent.emit(EventKeys.POPUP.SHOW_RANK);
    },

    hidePopupRank() {
        cc.systemEvent.emit(EventKeys.POPUP.HIDE_RANK);
    },

    showPopupSetting() {
        cc.systemEvent.emit(EventKeys.POPUP.SHOW_SETTING);
    },

    hidePopupSetting() {
        cc.systemEvent.emit(EventKeys.POPUP.HIDE_SETTING);
    },

    openRoomScene(){
        ScreneManager.loadSceneWithLoading('RoomScene');
    },

});
