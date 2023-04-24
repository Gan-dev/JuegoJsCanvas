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

        if (this.frame % 20 == 0) {
            console.log("Creando enemigos")


            this.enemies.push(new Enemies(this.ctx, yRandom, this.canvasSize.w, this.canvasSize, xRandom, wRandom))
            console.log(yRandom)
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
    }
}