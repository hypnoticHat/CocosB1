const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,
    start() {
        this.onHello();
        this.onWelcome();
    },
    onHello() {
        cc.log();
        Emitter.instance.emit('HELLO', "Nam");
    },
    onWelcome() {
        Emitter.instance.emit('HELLO', "Minh");
    },
});