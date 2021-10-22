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

        defines.animatableBackgroundTitleStyles = {
            ...defines.animatableBackgroundTitleStyles,
            fontSize: 24,
        }
        defines.roundedLabelStyles = {
            ...defines.roundedLabelStyles,
            width: 120, 
            height: 30,
        }

        defines.roundLabelTextStyles = {
            ...defines.roundLabelTextStyles,
            fontSize:12
        }

        defines.svgStyles = {
            ...defines.svgStyles,
            width: 100,
        }

        
        defines.sectionTitleStyles = {
            ...defines.sectionTitleStyles, 
            fontSize: 16,
        }

        return defines;
    }
}

export default ResponsiveMax425