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
            ... defines.titleStyles,
            yDistance: this.getHeight(4),
            fontSize: 26,
        }

        defines.textStyles = {
            ... defines.textStyles,
            fontSize: 16,
            wordWrapWidth: 280,
        }


        return defines;
    }
}

export default ResponsiveMax425