class Ship {
    constructor(ctx, shipSpects, posX) {
        this.ctx = ctx,
            this.shipSpects = {
                pos: { x: shipSpects, y: 800 },
                size: { w: 500, h: 500 },
                speed: 45
            },
            this.canLeft = false
        this.canRigth = false
        this.setEventListener()
    }

    //obetener los accionadores de teclado
    setEventListener() {
        document.onkeyup = event => {
            const { key } = event

            if (key == "ArrowLeft") {
                this.shipSpects.pos.x -= this.shipSpects.speed
            }

            if (key == "ArrowRight") {
                this.shipSpects.pos.x += this.shipSpects.speed
            }

            if (key == "ArrowDown") {
                this.shipSpects.pos.y += this.shipSpects.speed

            }

            if (key == "ArrowUp") {
                this.shipSpects.pos.y -= this.shipSpects.speed
            }
            if (key == " ") {
                this.shoot()
            }
        }
    }
    drawShip() {
        console.log("me Dibujo")
        this.move()
        this.ctx.fillStyle = "Black"
        this.ctx.fillRect(this.shipSpects.pos.x, this.shipSpects.pos.y, this.shipSpects.size.w, this.shipSpects.size.h)
    }
    move() {
        /* this.canLeft ? this.shipSpects.pos.x -= 20 : this.shipSpects.pos.x
        this.canRigth ? this.shipSpects.pos.x += 20 : this.shipSpects.pos.x

 */    }




}