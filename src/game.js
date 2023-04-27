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
    //background
    background: undefined,
    //Enemies
    enemies: [],
    //PowerUps
    powerUps: [],
    random: undefined,
    idInterval: undefined,
    //Inicia el Juego
    //aumeta la dificultad
    counterEnemies: 40,
    isDead: true,
    init() {
        this.getContext()
        this.setDimension()
        this.playMusic()
        this.start()
    },

    //la música de fondo del juego
    playMusic() {
        console.log("PRUEBA MUSICA")
        this.backgroundSound = new Audio()
        this.backgroundSound.src = './audio/rick_and_morty_intro_8_bits.mp3'
        this.backgroundSound.volume = 1
        this.backgroundSound.play()
    },

    //Obtiene el contexto del juego
    getContext() {
        this.ctx = document.getElementById('Canvas').getContext('2d')
    },
    //EstablecemosDimensionesaLJUEGO
    setDimension() {
        this.canvasSize = {
            w: window.innerWidth - 300,
            h: window.innerHeight - 200,
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
        if (this.frame % this.counterEnemies == 0) {
            let yRandom = Math.floor(Math.random() * (this.canvasSize.h - 60) - 100)
            let xRandom = Math.floor(Math.random() * 41) + 11 // aqui meto velocidades aleatorias en el eje X
            let wRandom = Math.floor(Math.random() * 301) + 50 // aquí varío el tamaño de enemigos dentro de un rango
            let eRandom = Math.floor(Math.random() * 2) + 1
            if (eRandom == 1) {
                this.enemies.push(new Enemies(this.ctx, yRandom, this.canvasSize.w, this.canvasSize, xRandom, wRandom, "./img/badRick1.png"))
            } else if (eRandom == 2) {
                this.enemies.push(new Enemies(this.ctx, yRandom, this.canvasSize.w, this.canvasSize, xRandom, wRandom, "./img/asteroide1.png"))
            }
        }
    },
    //Limpiar Enemigos
    clearEnemies() {
        this.enemies = this.enemies.filter(e => e.enemiesSpects.pos.x > 0)
    },

    //Sección PowerUps (Creación y limpia)

    createPowerUps() {
        if (this.frame % 100 == 0) {
            let xRandom = Math.floor(Math.random() * 41) + 10 //
            let yRandom = Math.floor(Math.random() * (this.canvasSize.h - 60) - 100)
            let random = Math.floor(Math.random() * 4) + 1 //creo un numero entre uno 1-3
            if (random == 1) {
                // si el numero es una significa que le va a pasar las propiedades de 1 y el color verde
                this.powerUps.push(new PowerUps(this.ctx, this.canvasSize.w, yRandom, this.canvasSize, xRandom, "./img/life.png", random))

            } else if (random == 2) {
                //si es dos el color es yellow y aumenta su damge
                this.powerUps.push(new PowerUps(this.ctx, this.canvasSize.w, yRandom, this.canvasSize, xRandom, "./img/damage.png", random))
            } else if (random == 3) {
                this.powerUps.push(new PowerUps(this.ctx, this.canvasSize.w, yRandom, this.canvasSize, xRandom, "./img/speed.png", random))
                //si es 3 le pasa el color rosa y aumenta su velocidad
            } else if (random === 4) {
                this.powerUps.push(new PowerUps(this.ctx, this.canvasSize.w, yRandom, this.canvasSize, xRandom, "./img/double.png", random))
            }

        }
    },

    clearPowerUps() {
        this.powerUps = this.powerUps.filter(e => e.powerUpsSpects.pos.x > 0)

    },

    //corazon tukun
    start() {
        this.reset()
        this.createShip()
        this.createBackground()
        this.idInterval = setInterval(() => {
            this.frame > 5000 ? this.frame = 0 : this.frame++
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
            //
            this.setDifultad()
        }, 50)
    },
    //Borrar y Dibujar
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.background.drawBackground()
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

            // if score es menor que cero, meter la condicion que si es negativo el puntuaje se pone a cero

            if (this.ship.score < 0) {
                this.ship.score = 0;
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
                let powerS = false
                const power = powerUps.setPower()
                if (power == 1) {
                    this.ship.shipSpects.vit.health += 30
                } else if (power == 2) {
                    this.ship.shipSpects.vit.damage += 30
                } else if (power === 3) {
                    this.ship.shipSpects.speed += 40
                }
                let countTimer = 0
                let timer = setInterval(() => {
                    if (power === 4) {
                        powerS = true
                        this.ship.shoot(powerS)
                    }
                    countTimer++
                    if (countTimer == 20) {
                        if (power == 2) {
                            this.ship.shipSpects.vit.damage = 20
                        } else if (power == 3) {
                            this.ship.shipSpects.speed = 45
                        }
                        powerS = false
                        clearInterval(timer)
                    }

                }, 500)

                this.powerUps.splice(i, 1) //eliminamos el powerUp
            }
        })
    },

    //GAME OVER
    gameOver() {
        console.log("gameOver")
        this.ctx.fillStyle = "red"

        this.ctx.font = "200pt Verdana"

        this.ctx.fillText("GAME OVER", this.canvasSize.w / 2 - 780, this.canvasSize.h / 2)
        this.backgroundSound.pause()
        this.isDead = true
        clearInterval(this.idInterval)

        this.reset()

    },

    //resetea la pantalla 
    reset() {
        //resetea la pantalla tanto el array de enemigos como el array de power UPs
        this.createShip()
        this.enemies = []
        this.powerUps = []
    },



    //Textos

    drawText() {
        this.ctx.fillStyle = "white"
        this.ctx.font = "80pt Verdana"
        //crea el score
        this.ctx.fillText("Score " + this.ship.score, this.canvasSize.w / 2 - 180, 100)
        this.ctx.font = "60pt Verdana"
        //live
        this.ctx.fillText("LIFE: " + this.ship.shipSpects.vit.health, 60, this.canvasSize.h - 180)
        //Damage
        this.ctx.fillText("Damage: " + this.ship.shipSpects.vit.damage, 60, this.canvasSize.h - 80)
        //speed
        this.ctx.fillText("Speed: " + this.ship.shipSpects.speed, 650, this.canvasSize.h - 180)
    },

    //background

    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize);

    },
    //Dificutad  aumenta la velocidad entorno a los ticks del frame 
    setDifultad() {
        if (this.frame % 300 == 0) {
            console.log("subinedo la dificultad")
            this.counterEnemies <= 10 ? this.counterEnemies = 8 : this.counterEnemies -= 5
            console.log(this.counterEnemies)

        }
    }

}