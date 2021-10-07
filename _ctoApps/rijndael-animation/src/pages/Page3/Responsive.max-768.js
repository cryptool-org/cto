import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"




class ResponsiveMax768 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 768) return true;
        return false;
    }

    getDefines(defines){
        defines.gridStyles = {
            ...defines.gridStyles,
            width: this.getWidth(36),
            height: this.getWidth(24),
        }

        defines.gridFontStyles = {
            ...defines.gridFontStyles,
            fontSize: 22,
        }

        defines.subtitleStyles = {
            ...defines.subtitleStyles,
            fontSize: 24,
        }

        defines.textStyles = {
            ...defines.textStyles,
            fontSize: 21,
            wordWrapWidth: 200,
        }
        return defines;
    }
}

export default ResponsiveMax768