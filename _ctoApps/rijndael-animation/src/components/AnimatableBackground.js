import Component from "./Component"

import * as PIXI from "pixi.js"
import PIXIText from "./PIXIText"

import SpriteBackground from "./SpriteBackground"


const backgroundStyleDefaults = {width: 1920, height: 1080, fill: 0xff0000, borderWidth: 0}
const barStyleDefaults = {width: 1920, height: 50, fill: 0xffffff, borderWidth: 0}
const textStyleDefaults = {fontSize: 30, x: 0, y: 0,}


class AnimatableBackground extends Component{
    constructor(text, baseTextStyles){
        super();
        this.textStyles = {fill: 0xffffff, ...baseTextStyles};

        this.background = new SpriteBackground()
        this.bar = new SpriteBackground()  
        this.title = new PIXIText(text, this.textStyles)
        this.title.anchor.set(1, 0)

        this.titleMask = new SpriteBackground();
        this.titleMask.alpha = 0;
       


        this.addChild(this.background, this.bar, this.title, this.titleMask)

    }


    redraw(backgroundStyles, barStyles, textStyles){

        backgroundStyles = {...backgroundStyleDefaults, ...backgroundStyles};
        barStyles = {...barStyleDefaults, ...barStyles}
        this.textStyles  = {...this.textStyles, ...textStyles}

        this.background.redraw(backgroundStyles);
        this.bar.redraw({...barStyles});

        // position text
       // this.title.position.set(textStyles.x, textStyles.y)
     //   this.title.style.fontSize = textStyles.fontSize
        this.title.redraw(this.textStyles)
  
       this.addChild(this.title)



        this.bar.position.set(0, this.title.y * 2 + this.title.height)


        this.titleMask.redraw({fill:  backgroundStyles.fill, borderWidth: 0, width: this.title.width, height: this.title.height})
        this.titleMask.position.set(this.title.x - this.title.width, this.title.y)
    }
}

export default AnimatableBackground