class bullets {
    constructor(ctx, shipSpects) {
        this.ctx = ctx;

        this.posX = this.shipSpects.pos.x + this.shipSpects.size.w
        this.posY = this.shipSpects.pos.y + this.shipSpects.size.h / 2


        this.radius = 3

    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "red"
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.move()
    }

    move() {
        this.posX += this.shipSpects.speed
        this.posY += this.velY;
    }
}