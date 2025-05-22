var Rotate = require("Rotate");
var SinRotate = cc.Class({
extends: Rotate,
update: function (dt) {
this.node.rotation += this.speed * Math.sin(dt);
}
});

module.exports = SinRotate;