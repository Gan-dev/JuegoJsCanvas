const Game = {
    AppName: "Navesitas",
    authors: "GanDev, JL",
    licence: "que alguien nos subencione para seguir creando",
    version: '1.0.0',
    descripcion: "a ship arcade game",
    //Elementos del game
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    shipInstance: undefined,
    //Spects De la nave
    ship: undefined,
    //Frames
    frame: 0,
    //Enemies
    enemies: [],
    //Inicia el Juego
    init() {
        this.getContext()
        this.setDimension()
        this.start()
    },
    //Obtiene el contexto del juego
    getContext() {
        this.ctx = document.getElementById('Canvas').getContext('2d')
    },
    //EstablecemosDimensionesaLJUEGO
    setDimension() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },
    //crearNaves
    createShip() {
        this.ship = new Ship(this.ctx, 500, this.canvasSize)
    },
    //crearEnmeigos
    createEnemies() {
        let yRandom = Math.floor(Math.random() * this.canvasSize.h)
        let xRandom = Math.floor(Math.random() * 21)
        let wRandom = Math.floor(Math.random() * 301)

        if (this.frame % 10 == 0) {


            this.enemies.push(new Enemies(this.ctx, yRandom, this.canvasSize.w, this.canvasSize, xRandom, wRandom))
        }
    },
    //Limpiar Enemigos
    clearEnemies() {
        this.enemies = this.enemies.filter(e => e.enemiesSpects.pos.x > 0)
    },

    //corazon tukun
    start() {
        this.createShip()
        setInterval(() => {
            this.frame > 50 ? this.frame = 0 : this.frame++
            this.clearAll()
            this.drawAll()

            this.createEnemies()
            this.clearEnemies()

            this.ship.checkBulletCollision(this.enemies) //chekeamos las bullets collison
            //Si la vida es 0 te da game over
            this.ship.shipSpects.vit.health ? this.isCollision() : this.gameOver()
        }, 50)
    },
    //Borrar y Dibujar
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.ship.drawShip()
        this.enemies.forEach(e => {
            e.drawEnemies()
        })
    },
    //Colisiones De Nave con objetos 

    isCollision() {

        return this.enemies.some((enemies, i) => {
            if (

                this.ship.shipSpects.pos.x < enemies.enemiesSpects.pos.x + enemies.enemiesSpects.size.w &&
                this.ship.shipSpects.pos.x + this.ship.shipSpects.size.w > enemies.enemiesSpects.pos.x &&
                this.ship.shipSpects.pos.y < enemies.enemiesSpects.pos.y + enemies.enemiesSpects.size.h &&
                this.ship.shipSpects.pos.y + this.ship.shipSpects.size.h > enemies.enemiesSpects.pos.y
            ) {
                this.ship.shipSpects.vit.health = this.ship.getDamage(enemies.enemiesSpects.vit.damage)
                console.log(this.ship.shipSpects.vit.health)
                this.enemies.splice(i, 1) //eliminamos el asteroide
            }
        })
    },

    //GAME OVER
    gameOver() {


        console.log("gameOver")
        this.reset()

    },

    //resetea la pantalla 
    reset() {
        this.createShip()
        this.enemies = []
    }

}