
import * as PIXI from "pixi.js"

class Component extends PIXI.Container{

    constructor(){
        super();
    }

    updateContent(){}

    clear(){
        this.removeChildren(0, this.children.length)
    }


    positionComponent(x, y, anchorX=0, anchorY=0){
        this.position.set(x,y)  
        this.pivot.x = anchorX * this.width / this.scale.x;
        this.pivot.y = anchorY * this.height / this.scale.y;
    }
}

export default Component