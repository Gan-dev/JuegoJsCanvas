class Bullets {
    constructor(ctx, shipSpects, bullets, bulletsDireccion) {
        this.posY
        this.bullets = bullets,
            this.bulletsDireccion = bulletsDireccion
        this.ctx = ctx;
        this.bulletsSpects = {
            pos: { x: shipSpects.pos.x + (shipSpects.size.w / 2) + 100, y: shipSpects.pos.y + (shipSpects.size.h / 2) + 50 },
            size: { w: 120, h: 50 },
            speed: 80
        }
        this.image = new Image()
        this.image.src = "./img/pepiRick.png"
    }


    //draw() va a dibujar las balas

    drawBullets() {
        this.move()
        this.ctx.drawImage(this.image,
            this.bulletsSpects.pos.x,
            this.bulletsSpects.pos.y,
            this.bulletsSpects.size.w,
            this.bulletsSpects.size.h
        )
    }

    //move() va a establecer el movimiento de la bala

    move() {
        if (this.bullets && this.bulletsDireccion == "up") {
            this.bulletsSpects.pos.x += this.bulletsSpects.speed
            this.bulletsSpects.pos.y -= this.bulletsSpects.speed
        } else if (this.bullets && this.bulletsDireccion == "down") {
            this.bulletsSpects.pos.x += this.bulletsSpects.speed
            this.bulletsSpects.pos.y += this.bulletsSpects.speed
        } else {
            this.bulletsSpects.pos.x += this.bulletsSpects.speed

        }
    }
}