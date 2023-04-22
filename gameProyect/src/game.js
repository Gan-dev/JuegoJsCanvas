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
        this.ship = new Ship(this.ctx, 500)
    },
    //crearEnmeigos
    createEnemies() {
        /*       let yRandom = Math.floor(Math.random() * 10001)
              if (this.frame % 20 == 0) {
                  console.log("Creando enemigos")
      
      
                  this.enemies.push(new Enemies(this.ctx, yRandom))
                  console.log(yRandom)
              } */
    },

    //corazon tukun
    start() {
        this.createShip()
        setInterval(() => {
            this.frame > 50 ? this.frame = 0 : this.frame++
            this.clearAll()
            this.drawAll()

            this.createEnemies()
        }, 50)
    },
    //Borrar y Dibujar
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.ship.drawShip()
        /* this.enemies.forEach(e => {
            e.drawEnemies()
        }) */
        console.log(this.enemies)
    }
}