import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page13DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-alpha"),
            borderWidth: 0,
        }

        defines.titleStyles = {     
            fill: this.c("--text-color-beta"),
            x: this.getWidth(50),
            yDistance: this.getHeight(6),
            fontSize: 36,
        }

        defines.circledCharStyles = {
            x: this.getWidth(50),
            y: this.getHeight(30),
        }

        defines.textStyles = {
            x: this.getWidth(50),
            yDistance: this.getHeight(4),
            fontSize: 18,
            wordWrap: true,
            wordWrapWidth: 400,
            fill: this.c("--text-light")
        }


        defines.circleStyles = {}
        defines.circleFontStyles = {}

        return defines;
    }
}

export default Page13DefaultResponsives