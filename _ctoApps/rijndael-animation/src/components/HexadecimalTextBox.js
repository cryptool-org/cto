
import * as PIXI from "pixi.js"

import {toHex, hexStringToInt} from "../utils/conversions"


let hexTextures = []
export let appRenderer = null;


// big font size font 
const hexTextureStyles = {

}

let bgTexture = null

export const initHexSprites = (renderer) => {
    appRenderer = renderer;
    console.time("create-hex-sprites")
    const textStyle = new PIXI.TextStyle(hexTextureStyles)
    hexTextures = [...new Array(256)].map((_, idx) => {
        const text = new PIXI.Text(toHex(idx), textStyle)
        return renderer.generateTexture(text);
    })
    console.timeEnd("create-hex-sprites")


   /* const graphic = new PIXI.Graphics();
    graphic.beginFill(0xffffff)
    graphic.drawRect(0,0,100,100)
    graphic.endFill()

    bgTexture = app.renderer()*/
    
}



const pixelToRectScale = (width, height) => {
    const scaleX = width / 100;
    const scaleY = height / 100; 
   return {scaleX, scaleY}
}

/*

    textSettings: {
        text: "",
        scale: 1.
    }
*/


class HexadecimalTextBox extends PIXI.Sprite{
    constructor(backgroundTexture, textSettings){
        super(backgroundTexture)

        this.textSettings = {
            text: null,
            scale: 1,
            ...textSettings,
        }


        this.redraw();
    }

    redraw(){

        if(this.textSettings.text){
            this.text = this.createText()
            this.addChild(this.text)
        }
     
    }

    createText(){
        const {scale, text: hexString} = this.textSettings
        const texture = this.getTextTexture(hexString)
      

        const text = new PIXI.Sprite(texture)
        text.scale.set(scale)
        text.anchor.set(.5)
        text.position.set(this.width/2, this.height/2)
        return text;
    }

    getTextTexture(hexString){
        const textureIndex = hexStringToInt(hexString);
        return hexTextures[textureIndex]
    }

    updateContent(text){
        this.removeChildren();
        this.textSettings = {...this.textSettings, text}
        this.text = this.createText()
        this.addChild(this.text)
    }
}

export default HexadecimalTextBox;