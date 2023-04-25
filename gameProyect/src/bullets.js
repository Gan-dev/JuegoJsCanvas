class Bullets {
    constructor(ctx, shipSpects) {
        this.ctx = ctx;
        this.bulletsSpects = {
            pos: { x: shipSpects.pos.x + (shipSpects.size.w / 2), y: shipSpects.pos.y + shipSpects.size.h / 2 },
            size: { w: 80, h: 40 },
            speed: 80
        }
    }


    //draw() va a dibujar las balas

    drawBullets() {
        this.move()
        this.ctx.fillStyle = "purple"
        this.ctx.fillRect(this.bulletsSpects.pos.x, this.bulletsSpects.pos.y, this.bulletsSpects.size.w, this.bulletsSpects.size.h);
    }

    //move() va a establecer el movimiento de la bala

    move() {
        this.bulletsSpects.pos.x += this.bulletsSpects.speed
    }
}