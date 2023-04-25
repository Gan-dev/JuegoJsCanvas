class PowerUps {
    constructor(ctx, posX, posY, canvasSize, velX, color, poder) {
        this.ctx = ctx,
            this.canvasSize = canvasSize,
            this.powerUpsSpects = {
                pos: { x: posX, y: posY },
                size: { w: 200, h: 200 },
                vel: { x: velX, y: 10 },
                color: color,
                power: poder
            }

    }

    //Dibuja los powerUps
    drawPowerUps() {
        this.ctx.fillStyle = this.powerUpsSpects.color
        this.ctx.fillRect(this.powerUpsSpects.pos.x, this.powerUpsSpects.pos.y, this.powerUpsSpects.size.w, this.powerUpsSpects.size.h)
        this.movePowerUp() //me dice que el movimiento del power up no está definido
    }

    //movimiento de lo powerUp

    movePowerUp() {
        if (this.powerUpsSpects.pos.y >= this.canvasSize.h - this.powerUpsSpects.size.h) this.turnVertical()
        if (this.powerUpsSpects.vel.x == 3) { this.powerUpsSpects.vel.y += 0.3 }
        this.powerUpsSpects.pos.x -= this.powerUpsSpects.vel.x
        if (this.powerUpsSpects.vel.x == 3 || this.powerUpsSpects.vel.x == 11) {
            this.powerUpsSpects.pos.y += this.powerUpsSpects.vel.y
        }
    }

    //la gravedad del powerUp
    turnVertical() {
        this.powerUpsSpects.vel.y *= -1
    }

    setPower(ship) {

        return this.powerUpsSpects.power
    }


}