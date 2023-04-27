class Background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.backgroundSpects = {
            size: { w: canvasSize.w, h: canvasSize.h },
            position: { xAxis: 0, yAxis: 0 }
        }

        this.image = new Image()
        this.image.src = "./img/space1.png"
    }

    drawBackground() {
        this.ctx.drawImage(this.image,
            this.backgroundSpects.position.xAxis,
            this.backgroundSpects.position.yAxis,
            this.backgroundSpects.size.w,
            this.backgroundSpects.size.h)

    }
}

