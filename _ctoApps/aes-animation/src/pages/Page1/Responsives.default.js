import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"

class Page1DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){
        const defines = {}

        defines.baseTextStyles = {
            fontSize: 60,
            fill: 0xffffff,
        }

        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: 0x000000,
        }

       defines.containerPos = {
           x: this.getWidth(50),
           y: this.getHeight(50),
           anchorX: .5,
           anchorY: .5,
       }

       defines.subtitleStyles = {
            position: {
                x: this.getWidth(50),
            },
            fill: "--text-color-alpha",
            anchor: {x: .5, y: 1}
       }

        return defines;
    }



  
}

export default Page1DefaultResponsives