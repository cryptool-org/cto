import * as PIXI from "pixi.js"
import SpriteBackground from "./SpriteBackground"
import PIXIText from "./PIXIText"
let counter = 10;

class TextBox extends PIXI.Container{
    constructor(text, baseTextStyles={}){
        super();


        this.textStyles = {...baseTextStyles};

        this.background = new SpriteBackground();
        this.addChild(this.background)

        this.text = null;
    
        if(text){
            this.text = new PIXIText(text, this.textStyles)
            this.text.anchor.set(.5,.5)
            this.addChild(this.text)
        }
    }



    updateContent(newText){
        if(!this.text){
            this.createText(newText);
        }else{
            this.text.text = newText;
        }
        this.text.anchor.set(.5,.5)
    }

    createText(text){
        this.text = new PIXIText(text, this.textStyles)
        this.addChild(this.text)
    }


    redraw(bgStyles, textStyles){    
        this.textStyles = {...this.textStyles,...textStyles}

    
       
        this.background.redraw(bgStyles)
       
        if(this.text){
           this.text.redraw({
                ...this.textStyles,
                position: {
                    x: bgStyles.width / 2,
                    y: bgStyles.height / 2
                }
            }) 
        }
    }

    getBackground(){
        return this.background.foreground;
    }
}

export default TextBox;