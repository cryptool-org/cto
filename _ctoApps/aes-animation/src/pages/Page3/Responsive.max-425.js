import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"




class ResponsiveMax425 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 425) return true;
        return false;
    }

    getDefines(defines){


        defines.titleStyles = {
            ...defines.titleStyles,
            fontSize: 20,
            position: {
                x: this.getWidth(50),
                y: 30,
            }
        }

        defines.gridStyles = {
            ...defines.gridStyles,
            width: this.getWidth(44),
            height: this.getWidth(30),
        }

        defines.gridFontStyles = {
            ...defines.gridFontStyles,
            fontSize: 22,
        }
       

        
        defines.subtitleStyles = {
            ...defines.subtitleStyles,
            fontSize: 18,
        }


        defines.textStyles = {
            ...defines.textStyles,
            fontSize: 16,
            wordWrapWidth: 120,

        }

        
        defines.circleStyles = {
            ...defines.circleStyles,
            borderWidth: 1,
            radius: 16,
        }

        defines.circleFontStyles = {
            ...defines.circleFontStyles,
            fontSize: 16,
        }

        return defines;
    }
}

export default ResponsiveMax425