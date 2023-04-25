class Enemies {
    constructor(ctx, posY, posX, canvasSize, velX, wRandom) {
        this.ctx = ctx,
            this.canvasSize = canvasSize
        this.enemiesSpects = {
            pos: { x: posX, y: posY },
            size: { w: wRandom, h: wRandom },
            vel: { x: velX, y: 2 },
            vit: { health: 200, damage: 10 }
        }
    }
    //Dibuja Enmigos
    drawEnemies() {
        this.ctx.fillStyle = "Red"
        this.ctx.fillRect(this.enemiesSpects.pos.x, this.enemiesSpects.pos.y, this.enemiesSpects.size.w, this.enemiesSpects.size.h)
        this.move()
    }
    move() {
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

}