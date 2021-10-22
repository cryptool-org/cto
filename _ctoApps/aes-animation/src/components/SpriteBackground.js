import * as PIXI from "pixi.js"


let rendererReference = null;
let baseTexture = null;

const BASE_TEXTURE_WIDTH = 1000;
const BASE_TEXTURE_HEIGHT = 1000;


const defaultStyles = { 
    width: 100,
    height: 100,
    fill: 0xffffff,
    borderColor: 0x3333333,
    borderWidth: 1,
}


export const initTexture = (renderer) => {
    rendererReference = renderer;

    /* draw base texture */
    const baseGraphic = new PIXI.Graphics();
    baseGraphic.beginFill(0xffffff)
    baseGraphic.drawRect(0,0,BASE_TEXTURE_WIDTH,BASE_TEXTURE_HEIGHT)
    baseGraphic.endFill()

    baseTexture = renderer.generateTexture(baseGraphic)
}


class SpriteBackground extends PIXI.Sprite{


    constructor(border=true){
        super(baseTexture);

  

      
            this.foreground = new PIXI.Sprite(baseTexture)   
            this.addChild(this.foreground)

            this._height = null;
            this._width = null;
        
    }

    redraw(styles={}){      
        const {fill, width, height, borderWidth, borderColor} = {...defaultStyles, ...styles};

  


            
   
        //if(this._height !== height || this._width !== width){
            this._height = height;
            this._width = width;
        
            const scaleFactor = this.getScaleFactor(width, height)
            this.scale.set(scaleFactor.scaleX, scaleFactor.scaleY)
            this.tint = borderColor;
            
        
            this.scaleForeGround(width,height,scaleFactor, borderWidth)
            
    
            this.foreground.tint = fill;
        //}
 


        
      
    }

    scaleForeGround(width, height, scaleFactor, borderWidth){
       
   
        const scaleX = (width - 2 * borderWidth) / width;
        const scaleY = (height - 2 * borderWidth) / height;
       

        this.foreground.scale.set(scaleX,scaleY)
        this.foreground.position.set(borderWidth / scaleFactor.scaleX, borderWidth / scaleFactor.scaleY)
    }

    getScaleFactor(width, height){
        const scaleX = width / BASE_TEXTURE_WIDTH;
        const scaleY = height / BASE_TEXTURE_HEIGHT;
        return {scaleX, scaleY}
    }



}

export default SpriteBackground