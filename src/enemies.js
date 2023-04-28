class Enemies {
    constructor(ctx, posY, posX, canvasSize, velX, wRandom, typeOfEnemine, shoot) {
        this.ctx = ctx,
            this.canvasSize = canvasSize
        this.enemiesSpects = {
            pos: { x: posX, y: posY },
            size: { w: 300 + wRandom, h: 250 + wRandom },
            vel: { x: velX, y: 2 },
            vit: { health: 250, damage: 10 },
            shoot: shoot
        }
        this.bullets = []
        this.typeOfEnemine = typeOfEnemine
        this.image = new Image()
        this.image.src = typeOfEnemine
    }
    //Dibuja Enmigos
    drawEnemies(frames) {
        this.ctx.drawImage(this.image,
            this.enemiesSpects.pos.x,
            this.enemiesSpects.pos.y,
            this.enemiesSpects.size.w,
            this.enemiesSpects.size.h
        )
        if (frames % 20 == 0) {
            this.createShoot()
        }
        this.move()
    }
    move() {
        this.shootMove()
        //Hace que rebote los enemigos en el eje y = 0
        if (this.enemiesSpects.pos.y >= this.canvasSize.h - this.enemiesSpects.size.h) this.turnVertical()
        if (this.enemiesSpects.vel.x == 3) { this.enemiesSpects.vel.y += 0.3 }
        this.enemiesSpects.pos.x -= this.enemiesSpects.vel.x
        if (this.enemiesSpects.vel.x == 3 || this.enemiesSpects.vel.x == 11) {
            this.enemiesSpects.pos.y += this.enemiesSpects.vel.y
        }
    }
    turnVertical() {
        this.enemiesSpects.vel.y *= -1
    }
    getDamage(bulletsDamage) {
        return this.enemiesSpects.vit.health - bulletsDamage
    }

    //disparos
    shootMove() {
        this.bullets.forEach(bullet => bullet.drawBullets())
        this.clearBullets()
    }
    createShoot() {
        //para establecer los parámetros voy a necesitar el move() de la nave??
        if (this.enemiesSpects.shoot) {
            this.bullets.push(new Bullets(this.ctx, this.enemiesSpects, true, this.enemiesSpects.pos.y + this.enemiesSpects.size.h / 2, true))
        }
    }
    //limpiamos las balas
    clearBullets() {
        this.bullets = this.bullets.filter(e => {
            return e.bulletsSpects.pos.x > 0 && e.bulletsSpects.pos.y > 0 && e.bulletsSpects.pos.y < this.canvasSize.h
        })
    }
    //colisones con la nave
    checkBulletCollision(ship) {
        return this.bullets.some((bullet, i) => {

            if (bullet.bulletsSpects.pos.x < ship.shipSpects.pos.x + ship.shipSpects.size.w &&
                bullet.bulletsSpects.pos.x + bullet.bulletsSpects.size.w > ship.shipSpects.pos.x &&
                bullet.bulletsSpects.pos.y < ship.shipSpects.pos.y + ship.shipSpects.size.h &&
                bullet.bulletsSpects.pos.y + bullet.bulletsSpects.size.h > ship.shipSpects.pos.y) {
                console.log("colisono")
                ship.shipSpects.vit.health = ship.getDamage(10)

                return this.bullets.splice(i, 1)
            }
        })

    }
}