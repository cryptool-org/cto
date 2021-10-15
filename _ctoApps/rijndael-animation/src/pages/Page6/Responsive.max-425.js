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


       
        defines.labelStyles = {
            ...defines.labelStyles,
            width: this.getWidth(44), 
        }

        defines.labelFontStyles = {
            ...defines.labelFontStyles,
            fontSize: 18,
        }

        defines.titleStyles = {
            ...defines.titleStyles,
            fontSize: 18,
            wordWrap: true,
            wordWrapWidth: 280,
        }


        return defines;
    }
}

export default ResponsiveMax425