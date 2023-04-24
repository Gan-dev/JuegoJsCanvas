class Bullets {
    constructor(ctx, shipSpects) {
        this.ctx = ctx;
        this.bulletsSpects = {
            pos: { x: shipSpects.pos.x + (shipSpects.size.w / 2), y: shipSpects.pos.y + shipSpects.size.h / 2 },
            size: { w: 250, h: 250 },
            speed: 12
        }
    }


    //draw() va a dibujar las balas

    drawBullets() {
        this.move()
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.bulletsSpects.pos.x, this.bulletsSpects.pos.y, 40, 20);
    }

    //move() va a establecer el movimiento de la bala

    move() {
        this.bulletsSpects.pos.x += this.bulletsSpects.speed
    }
}