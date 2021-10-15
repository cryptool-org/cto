import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"




class ResponsiveMax375 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 375) return true;
        return false;
    }

    getDefines(defines){
        defines.arrowTitleStyles = {
            ...defines.arrowTitleStyles,
            fontSize: 12,
        }

        defines.textBoxTextStyles = {
            ...defines.textBoxTextStyles,
            fontSize: 14,
        }

        return defines;
    }
}

export default ResponsiveMax375