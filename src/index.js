window.onload = () => {
    document.getElementById("start-button").onclick = () => {
        document.getElementById("menu").classList.add("displayNone")
        document.getElementById('Canvas').classList.add("displayFlex")
        startGame();
        let dead = Game.isDead
        console.log(dead)
        if (!dead) {
            startGame()
        }
    };

    function startGame() {
        Game.init()
    }
};