import * as PIXI from "pixi.js"

import Component from "./Component"



class AnimatableText extends Component{
    constructor(text, baseTextStyle={}){
        super();

        this.baseTextStyle = baseTextStyle

        // default styles
        this._lastDrawStyles = {scale: 1, letterspacing: 0, fontSize: 60}

        this.createTextElements(text);

        
    }

    createTextElements(text){
        this.removeChildren();
        this.chars = [...text].map((char, idx) => {           
            const charGraphic = new PIXI.Text(char, this.baseTextStyle);        
            this.addChild(charGraphic)
            return charGraphic;
        })
    }

    updateContent(text){
        this.createTextElements(text)
        this.redraw();   
    }

    redraw(textStyles={}){

        textStyles = {...this._lastDrawStyles, ...textStyles}
        this._lastDrawStyles = textStyles

        this.chars.forEach((char, idx) => {
            const x = idx !== 0 ? this.chars[idx-1].x + this.chars[idx-1].width +  textStyles.letterspacing : 0;
            char.position.set(x,0)  

            if(char.style.fontSize != textStyles.fontSize)
                char.style.fontSize = textStyles.fontSize;
        })    

    }
}



export default AnimatableText