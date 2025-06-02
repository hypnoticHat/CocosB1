cc.Class({
    extends: cc.Component,

    properties: {
    },

    onCollisionEnter (other, self){
        if(other.node.group === 'Mobs'){
            other.node.getComponent('MobsBase').takeDamage(100);
        }
    }
});
