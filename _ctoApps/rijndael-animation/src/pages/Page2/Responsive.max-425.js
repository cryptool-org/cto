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
        defines.arrowTitleStyles = {
            ...defines.arrowTitleStyles,
            fontSize: 14,
        }

        defines.textBoxTextStyles = {
            ...defines.textBoxTextStyles,
            fontSize: 16,
        }

        return defines;
    }
}

export default ResponsiveMax425