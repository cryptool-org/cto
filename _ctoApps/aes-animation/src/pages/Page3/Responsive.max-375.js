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
        defines.textStyles = {
            ...defines.textStyles, 
            scale: .8,
            wordWrapWidth: 160,
        }

        defines.circleStyles = {
            ...defines.circleStyles,
            scale: .6
        }

        defines.circleFontStyles = {
            scale: .6
        }

        defines.gridFontStyles = {
           fontSize: 16
        }
        

        return defines;
    }
}

export default ResponsiveMax375