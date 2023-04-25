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
    //PowerUps
    powerUps: [],
    random: undefined,
    idInterval: undefined,
    //Inicia el Juego

    //Score
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
            w: window.innerWidth - 400,
            h: window.innerHeight - 400,
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
        if (this.frame % 10 == 0) {
            let yRandom = Math.floor(Math.random() * (this.canvasSize.h - 60) - 100)
            let xRandom = Math.floor(Math.random() * 41) - 11 // aqui meto velocidades aleatorias en el eje X
            let wRandom = Math.floor(Math.random() * 301) + 50 // aquí varío el tamaño de enemigos dentro de un rango


            this.enemies.push(new Enemies(this.ctx, yRandom, this.canvasSize.w, this.canvasSize, xRandom, wRandom))
        }
    },
    //Limpiar Enemigos
    clearEnemies() {
        this.enemies = this.enemies.filter(e => e.enemiesSpects.pos.x > 0)
    },

    //Sección PowerUps (Creación y limpia)

    createPowerUps() {
        if (this.frame % 3000 == 0) {
            let xRandom = Math.floor(Math.random() * 41) - 11 //
            let yRandom = Math.floor(Math.random() * (this.canvasSize.h - 60) - 100)
            let random = Math.floor(Math.random() * 3) + 1
            if (random == 1) {
                this.powerUps.push(new PowerUps(this.ctx, this.canvasSize.w, yRandom, this.canvasSize, xRandom, "green", random))

            } else if (random == 2) {
                this.powerUps.push(new PowerUps(this.ctx, this.canvasSize.w, yRandom, this.canvasSize, xRandom, "yellow", random))

            } else if (random == 3) {
                this.powerUps.push(new PowerUps(this.ctx, this.canvasSize.w, yRandom, this.canvasSize, xRandom, "pink", random))

            }

        }
    },

    clearPowerUps() {
        this.powerUps = this.powerUps.filter(e => e.powerUpsSpects.pos.x > 0)

    },

    //corazon tukun
    start() {
        this.createShip()
        idInterval = setInterval(() => {
            this.frame > 50 ? this.frame = 0 : this.frame++
            this.clearAll()
            this.drawAll()

            this.createEnemies()
            this.clearEnemies()


            this.createPowerUps()
            this.clearPowerUps()

            this.ship.checkBulletCollision(this.enemies, this.score) //chekeamos las bullets collison
            //Si la vida es 0 te da game over
            this.ship.shipSpects.vit.health ? this.isCollision() : this.gameOver()
            this.isCollisionPower()
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
        this.powerUps.forEach(e => {
            e.drawPowerUps()
        })
        this.drawText()
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
                this.ship.score -= 20
                this.enemies.splice(i, 1) //eliminamos el asteroide
            }
        })
    },

    //Colisiones de Nave con PowerUps

    isCollisionPower() {

        return this.powerUps.some((powerUps, i) => {
            if (

                this.ship.shipSpects.pos.x < powerUps.powerUpsSpects.pos.x + powerUps.powerUpsSpects.size.w &&
                this.ship.shipSpects.pos.x + this.ship.shipSpects.size.w > powerUps.powerUpsSpects.pos.x &&
                this.ship.shipSpects.pos.y < powerUps.powerUpsSpects.pos.y + powerUps.powerUpsSpects.size.h &&
                this.ship.shipSpects.pos.y + this.ship.shipSpects.size.h > powerUps.powerUpsSpects.pos.y
            ) {

                const power = powerUps.setPower()
                if (power == 1) {
                    this.ship.shipSpects.vit.health += 10
                } else if (power == 2) {
                    this.ship.shipSpects.vit.damage += 10
                } else if (power === 3) {
                    this.ship.shipSpects.speed += 30
                }
                let countTimer = 0
                let timer = setInterval(() => {
                    countTimer++
                    console.log(countTimer)
                    if (countTimer == 5) {
                        this.ship.shipSpects.vit.damage = 20
                        this.ship.shipSpects.speed = 45
                        clearInterval(timer)
                    }

                }, 1000)

                this.powerUps.splice(i, 1) //eliminamos el powerUp
            }
        })
    },

    //GAME OVER
    gameOver() {

        clearInterval(this.idInterval)

        console.log("gameOver")
        this.reset()

    },

    //resetea la pantalla 
    reset() {
        this.createShip()
        this.enemies = []
        this.powerUps = []
    },



    //Textos

    drawText() {
        this.ctx.fillStyle = "black"
        this.ctx.font = "80pt Verdana"
        this.ctx.fillText("Score " + this.ship.score, this.canvasSize.w / 2 - 180, 100)
        this.ctx.font = "60pt Verdana"
        this.ctx.fillText("LIFE: " + this.ship.shipSpects.vit.health, 60, this.canvasSize.h - 180)
        this.ctx.fillText("Damage: " + this.ship.shipSpects.vit.damage, 60, this.canvasSize.h - 80)
        this.ctx.fillText("Speed: " + this.ship.shipSpects.speed, 650, this.canvasSize.h - 180)
    }

}