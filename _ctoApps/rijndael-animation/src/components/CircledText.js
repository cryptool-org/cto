
import Component from "./Component"
import * as PIXI from "pixi.js"

class CircledText extends Component{
    constructor(text, textBaseStyle, circleBaseStyles){
        super();

        this.text = new PIXI.Text(text, textBaseStyle)
        this.text.anchor.set(.5)
        this.circle = this.createCircle(circleBaseStyles);


        this.addChild(this.circle, this.text)
    }

    createCircle(circleStyles){
        const cs = {radius: 30, borderColor: 0xfffffff, borderWidth: 3, ...circleStyles}
        const circleComponent = new PIXI.Graphics();
        if(cs.borderWidth > 0) circleComponent.lineStyle(cs.borderWidth, cs.borderColor, 1, 0)  
        circleComponent.drawCircle(0,0, cs.radius * 2);
        circleComponent.endFill();

        circleComponent.cacheAsBitmap = true;
        circleComponent.scale.set(this.getCirlceScale(1))
        return circleComponent
    }

    redraw(circleStyles={}, textStyles={}){
        const cs = {scale: 1, ...circleStyles};
        const ts = {scale: 1, ...textStyles} 

    

        this.circle.scale.set(this.getCirlceScale(cs.scale))
        this.text.scale.set(ts.scale) 
     
     
    }

    getCirlceScale(scale){
        return scale * .5;
    }


}

export default CircledText;