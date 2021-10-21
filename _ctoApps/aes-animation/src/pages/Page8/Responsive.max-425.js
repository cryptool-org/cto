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

        defines.gridStyles = {
            ...defines.gridStyles,
            width: this.getWidth(80),
            height: this.getHeight(30),
            x: this.getWidth(50),
            y: this.getHeight(26)
        }
       
        defines.baseTextStyles = {
            ...defines.baseTextStyles,
            fontSize: 26,
        }

      


        return defines;
    }
}

export default ResponsiveMax425