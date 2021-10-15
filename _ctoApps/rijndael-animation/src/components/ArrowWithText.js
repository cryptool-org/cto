import Arrow, {ARROW_ORIENTATION as ARROW_ORIENTATION_CONST} from "./Arrow"

import * as PIXI from "pixi.js"

import Component from "./Component"
import PIXIText from "./PIXIText";

export const ARROW_ORIENTATION = ARROW_ORIENTATION_CONST

class ArrowWithText extends Component{

    constructor(text, arrowStyles={}, textStyles={}){
        super();

        this.textStyles = {
            ...textStyles,
        }
        this.arrowStyles = arrowStyles;

      

        this.text = new PIXIText(text, this.textStyles);
        this.arrow = new Arrow(this.arrowStyles);

        this.addChild(this.arrow, this.text)

        this.redraw();
    }

    redraw(arrowStyles, textStyles){

        this.arrowStyles = {...this.arrowStyles, ...arrowStyles}
        this.textStyles = {...this.textStyles, ...textStyles}
        this.arrow.redraw(this.arrowStyles)
        
     //   this.text.anchor.set(.5, .5)

        this.text.redraw({
            ...this.textStyles,
            position: {
                x: this.arrowStyles.width / 2,
                y: this.arrowStyles.height / 2,
            },
            anchor: {x: .5, y: .5}
        })

       // this.text.position.set(this.arrow.width/2, this.arrow.height/2)
        if(this.arrowStyles.orientation == ARROW_ORIENTATION.UP || this.arrowStyles.orientation == ARROW_ORIENTATION.DOWN){
            this.text.rotation = 1.5708 // 90 degrees in radians
        }
  
    }

}

export default ArrowWithText;