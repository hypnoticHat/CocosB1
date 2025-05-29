cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter (other, self){
        if(other.node.group === 'Mobs'){
            other.node.getComponent('MobsBase').takeDamage(100);
        }
    }
});
