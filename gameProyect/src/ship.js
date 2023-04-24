class Ship {
    constructor(ctx, posX, canvasSize) {
        this.canvasSize = canvasSize,
            this.ctx = ctx,
            this.shipSpects = {
                pos: { x: posX, y: 800 },
                size: { w: 200, h: 200 },
                vit: { health: 100, damage: 20 },
                speed: 45
            },
            //Segundo Jugadro
            /* this.shipSpects2 = {
                pos: { x: 500 + posX, y: 500 },
                size: { w: 200, h: 200 },
                speed: 45
            } */
            this.bullets = []    //creo una array de balas
        this.setEventListener()
    }

    //obetener los accionadores de teclado
    setEventListener() {
        document.onkeyup = event => {
            const { key } = event

            if (key == "ArrowLeft") {
                if (this.shipSpects.pos.x - 50 > 0) {
                    this.shipSpects.pos.x -= this.shipSpects.speed
                }
            }

            if (key == "ArrowRight") {
                if (this.shipSpects.pos.x + this.shipSpects.size.w < this.canvasSize.w) {
                    this.shipSpects.pos.x += this.shipSpects.speed
                }
            }

            if (key == "ArrowDown") {
                if (this.shipSpects.pos.y + this.shipSpects.size.h < this.canvasSize.h) {
                    this.shipSpects.pos.y += this.shipSpects.speed
                }
            }
            //SEgundo jugador
            if (key == "ArrowUp") {
                if (this.shipSpects.pos.y > 0) {
                    this.shipSpects.pos.y -= this.shipSpects.speed
                }
            }
            //SEgundo jugador
            /*
                //nave 2
                if (key == "a") {
                    this.shipSpects2.pos.x -= this.shipSpects2.speed
                }
            
                if (key == "d") {
                    this.shipSpects2.pos.x += this.shipSpects2.speed
                }
            
                if (key == "s") {
                    this.shipSpects2.pos.y += this.shipSpects2.speed
            
                }
            
                if (key == "w") {
                    this.shipSpects2.pos.y -= this.shipSpects2.speed
                } */
            if (key == " ") {
                this.shoot()
            }

        }
    }
    drawShip() {
        this.move()
        this.ctx.fillStyle = "Black"
        this.ctx.fillRect(this.shipSpects.pos.x, this.shipSpects.pos.y, this.shipSpects.size.w, this.shipSpects.size.h)
        //this.ctx.fillRect(this.shipSpects2.pos.x, this.shipSpects2.pos.y, this.shipSpects2.size.w, this.shipSpects2.size.h)

    }
    move() {
        this.bullets.forEach(bullet => bullet.drawBullets())
        this.clearBullets()
    }
    shoot() {
        //para establecer los parámetros voy a necesitar el move() de la nave??
        this.bullets.push(new Bullets(this.ctx, this.shipSpects))
    }
    //limpiamos las balas
    clearBullets() {
        this.bullets = this.bullets.filter(e => e.bulletsSpects.pos.x < this.canvasSize.w)
    }
    //metodo que recibe daño
    getDamage(damage) {
        return this.shipSpects.vit.health - damage
    }
    //metodo que da daño
    setDamage(enemieHealth) {
        return this.shipSpects.vit.damage - enemieHealth
    }
    //chequeamos las colisiones de los enemigos con las balas
    checkBulletCollision(enemie) {
        return enemie.forEach((enemies, i) => {
            return this.bullets.some((bullet, i2) => {
                if (bullet.bulletsSpects.pos.x < enemies.enemiesSpects.pos.x + enemies.enemiesSpects.size.w &&
                    bullet.bulletsSpects.pos.x + bullet.bulletsSpects.size.w > enemies.enemiesSpects.pos.x &&
                    bullet.bulletsSpects.pos.y < enemies.enemiesSpects.pos.y + enemies.enemiesSpects.size.h &&
                    bullet.bulletsSpects.pos.y + bullet.bulletsSpects.size.h > enemies.enemiesSpects.pos.y) {
                    enemies.enemiesSpects.vit.health = enemies.getDamage(20)
                    console.log("la vida del enemigo de" + i + "es" + enemies.enemiesSpects.vit.health)
                    if (enemies.enemiesSpects.vit.health <= 0) {
                        this.removeEnemies(i, enemie)//llamamos a la funcion remove enemies

                    }

                    return this.bullets.splice(i2, 1)

                }
            })
        })

    }
    //eliminamos los elementos de los enemigos
    removeEnemies(id, enemyArray) {

        return enemyArray.splice(id, 1)
    }

}