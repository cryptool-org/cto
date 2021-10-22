
import * as PIXI from "pixi.js"


export const ARROW_ORIENTATION = {
    UP: "ARROW_UP",
    DOWN: "ARROW_DOWN",
    LEFT: "ARROW_LEFT",
    RIGHT: "ARROW_RIGHT"
}

class Arrow extends PIXI.Graphics{
    constructor(arrowSettings={}){
        super();
        this.arrowSettings = {
            fill: 0xffffff,
            width: 200,
            height: 100,
            headToBodyRatio: .2,
            bodyWidthRatio: .5,
            borderWidth: 0,
            borderColor: 0xffffff,
            orientation: ARROW_ORIENTATION.LEFT,
            ...arrowSettings
        }

        this.redraw();
    }


    redraw(arrowStyles={}){
        this.clear();

        this.arrowSettings = {
            ...this.arrowSettings,
            ...arrowStyles,
        }

        switch(this.arrowSettings.orientation){
            case ARROW_ORIENTATION.UP: 
                this.drawArrowUp();
            break;
            case ARROW_ORIENTATION.DOWN: 
                this.drawArrowDown();
            break;
            case ARROW_ORIENTATION.LEFT: 
                this.drawArrowLeft();
            break;
            case ARROW_ORIENTATION.RIGHT: 
                this.drawArrowRight();
            break;
        }

       
    } 


    drawArrowRight(){
        const {width, height, bodyWidthRatio, headToBodyRatio, fill, borderWidth, borderColor} = this.arrowSettings;

        const bodyHeight = height * bodyWidthRatio;
        const bodyStart = height / 2 - bodyHeight / 2;
        const bodyEnd = height / 2 + bodyHeight / 2;
        const headStart = width * (1  -headToBodyRatio);


        this.beginFill(fill);
        this.lineStyle(borderWidth, borderColor, 1, 0);
        this.moveTo(0,bodyStart)
        this.lineTo(0, bodyEnd)
        this.lineTo(headStart, bodyEnd)
        this.lineTo(headStart, height)
        this.lineTo(width, height/2)
        this.lineTo(headStart, 0)
        this.lineTo(headStart, bodyStart)
        this.lineTo(0, bodyStart)
        
        
        this.endFill();
    }

    
    drawArrowLeft(){
        const {width, height, bodyWidthRatio, headToBodyRatio, fill, borderWidth, borderColor} = this.arrowSettings;

        const bodyHeight = height * bodyWidthRatio;
        const bodyStart = height / 2 - bodyHeight / 2;
        const bodyEnd = height / 2 + bodyHeight / 2;
        const headStart = width * headToBodyRatio;


        this.beginFill(fill);
        this.lineStyle(borderWidth, borderColor, 1, 0);
        this.moveTo(0,height/2)
        this.lineTo(headStart, height)
        this.lineTo(headStart, bodyEnd)
        this.lineTo(width, bodyEnd)
        this.lineTo(width, bodyStart)
        this.lineTo(headStart, bodyStart)
        this.lineTo(headStart, 0)
        
        
        this.endFill();
    }

    drawArrowDown(){
        const {width, height, bodyWidthRatio, headToBodyRatio, fill, borderWidth, borderColor} = this.arrowSettings;

        const bodyWidth = width * bodyWidthRatio;


        const bodyStart = width / 2 - bodyWidth / 2;
        const bodyEnd = width / 2 + bodyWidth / 2;
        const headStart = height * (1-headToBodyRatio);


        this.beginFill(fill);
        this.lineStyle(borderWidth, borderColor, 1, 0);
        this.moveTo(bodyStart, 0)

        this.lineTo(bodyStart, headStart)
        this.lineTo(0, headStart)
        this.lineTo(width/2, height)
        this.lineTo(width, headStart)
        this.lineTo(bodyEnd, headStart)
        this.lineTo(bodyEnd, 0)
        this.lineTo(bodyStart, 0)
        
        
        this.endFill();
    }

    drawArrowUp(){
        const {width, height, bodyWidthRatio, headToBodyRatio, fill, borderWidth, borderColor} = this.arrowSettings;

        const bodyWidth = width * bodyWidthRatio;


        const bodyStart = width / 2 - bodyWidth / 2;
        const bodyEnd = width / 2 + bodyWidth / 2;
        const headStart = height * headToBodyRatio;


        this.beginFill(fill);
        this.lineStyle(borderWidth, borderColor, 1, 0);
        this.moveTo(width /2, 0)

        this.lineTo(0, headStart)
        this.lineTo(bodyStart, headStart)
        this.lineTo(bodyStart, height)
        this.lineTo(bodyEnd, height)
        this.lineTo(bodyEnd, headStart)
        this.lineTo(width, headStart)
        
        
        this.endFill();
    }
}

export default Arrow;