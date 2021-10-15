

import * as PIXI from "pixi.js"

import Component from "./Component"

import PIXIText from "./PIXIText"

const defaultTextStyles = {scale: 1}

class TextBox extends Component{


    constructor(text="",baseBackgroundStyles={}, baseTextStyles={}){
        super()

        this.textStyles = {...baseTextStyles}
        this.backgroundStyles = {...baseBackgroundStyles}
     

        this.background = new PIXI.Graphics();  
        this.text = new PIXIText(text, this.textStyles);
      
        
        //this.redraw()
        this.addChild(this.background, this.text)
    }

    redraw(backgroundStyles, textStyles){

        this.background.clear();
        this.backgroundStyles = {...this.backgroundStyles,...backgroundStyles}
        this.textStyles = {...this.textStyles,...textStyles}
 
        const {borderWidth, borderFill, borderRadius, width, height, fill} = this.backgroundStyles;

        // optionally add border
        if(borderWidth> 0) this.background.lineStyle(borderWidth, borderFill, 1, 0)

        this.background.beginFill(0xffffff)
        let isScaled = false
        if(borderRadius > 0){
            isScaled = true;
            this.background.drawRoundedRect(0, 0, width, height , borderRadius)
        }else{
            this.background.drawRect(0,0,width,height)
        }
        this.background.endFill()

       
        let tint = fill ? fill : 0x000000;
        this.background.tint = tint;

   

        // position text in center of background
        this.text.redraw({
            ...this.textStyles,
            position: {
                x: width / 2, 
                y: height / 2,
            },
            anchor: {
                x: .5,
                y: .5
            }
        })

     

    }

    updateContent(text){
        this.text.text = text;
    }


}

export default TextBox;