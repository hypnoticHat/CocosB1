let targetScene= "LobbyScreen";
const SceneManager = {

    loadSceneWithLoading(sceneName) {
        targetScene = sceneName;
        cc.director.loadScene('LoadingScene');
    },

    getTargetScene(){
        return targetScene;
    }
}

module.exports = SceneManager;