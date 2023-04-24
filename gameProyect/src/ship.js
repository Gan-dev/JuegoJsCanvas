class Ship {
    constructor(ctx, posX, canvasSize) {
        this.canvasSize = canvasSize,
            this.ctx = ctx,
            this.shipSpects = {
                pos: { x: posX, y: 800 },
                size: { w: 200, h: 200 },
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
            console.log(event)
            if (key == "ArrowLeft") {
                this.shipSpects.pos.x -= this.shipSpects.speed
            }

            if (key == "ArrowRight") {
                this.shipSpects.pos.x += this.shipSpects.speed
            }

            if (key == "ArrowDown") {
                this.shipSpects.pos.y += this.shipSpects.speed

            }
            //SEgundo jugador
            if (key == "ArrowUp") {
                this.shipSpects.pos.y -= this.shipSpects.speed
            }
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
        console.log("disparo")
        //para establecer los parámetros voy a necesitar el move() de la nave??
        this.bullets.push(new Bullets(this.ctx, this.shipSpects))
    }
    clearBullets() {
        this.bullets = this.bullets.filter(e => e.bulletsSpects.pos.x < this.canvasSize.w)
    }

}