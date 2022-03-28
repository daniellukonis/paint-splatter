console.log('connected')

class PaintSplatter{
    constructor(canvasElement){
        this.canvas = document.querySelector(canvasElement) 
        this.context = this.canvas.getContext('2d')    

        this.cvw = window.innerWidth * 4
        this.cvh = window.innerHeight *4
        this.cvx = this.cvw * this.cvh
        this.maxDots = this.cvx / 5000

        this.canvas.width = this.cvw
        this.canvas.height = this.cvh
    
        this.radii = [1,2,3,4,5,6,7,8,14]
        // this.radii = [5, 10]
    }

    clearCanvas(){
        this.context.fillStyle = '#000'
        this.context.globalCompositeOperation = 'source-over'
        this.context.fillRect(0,0,this.cvw,this.cvh)
    }

    randomInt(min,max){
        return Math.floor(Math.random() * (max + 1)) + min
    }

    dots(x,y,radius){
        this.context.save()
        this.context.beginPath()
        this.context.arc(x,y,radius,0,Math.PI*2)
        this.context.fill()
        this.context.restore()
    }
  
    drawClear(){
        this.clearCanvas()
        this.context.fillStyle = '#000'
        this.context.globalCompositeOperation = 'destination-out'
        this.radii.forEach(r=>{
            for(let i = 0 ; i < this.maxDots ; i++){
                let x = this.randomInt(0, this.cvw)
                let y = this.randomInt(0, this.cvh)
                this.dots(x,y,r)
            }
        })
    }

    drawColor(){
        this.clearCanvas()

        this.rColor = this.randomInt(0,255)
        this.gColor = this.randomInt(0,255)
        this.bColor = this.randomInt(0,255)
        this.cIndex = this.randomInt(0,2)
        this.fillColor = [this.rColor, this.gColor, this.bColor]
        this.radius = 140
        this.reduction = 1

        for(let i = 0 ; i < this.maxDots / this.reduction; i++){
            this.context.globalCompositeOperation = 'source-over'
            this.fillColor[this.cIndex] = this.randomInt(0,255)
            this.context.fillStyle = `rgb(
                ${this.fillColor[0]},
                ${this.fillColor[1]},
                ${this.fillColor[2]}
                )`
                // console.log(this.context.fillStyle)
            let x = this.randomInt(0, this.cvw)
            let y = this.randomInt(0, this.cvh)
            this.dots(x,y,this.radius)
        }
    }
}

class backgroundArt{
    constructor(canvasElement){
        this.canvas = document.querySelector(canvasElement) 
        this.context = this.canvas.getContext('2d')    

        this.cvw = window.innerWidth
        this.cvh = window.innerHeight

        this.canvas.width = this.cvw
        this.canvas.height = this.cvh
    
        this.color = '#7fff99'
    }

    clearCanvas(color){
        this.context.fillStyle = this.color
        this.context.fillRect(0,0,this.cvw,this.cvh)
    }
}

const splatterZ1 = new PaintSplatter('#canvasZ1')
splatterZ1.drawColor()

const splatterZ2 = new PaintSplatter('#canvasZ2')
splatterZ2.drawClear()

window.addEventListener('click', ()=>{
    location.reload()
})

window.addEventListener('resize', ()=>{
    location.reload()
})