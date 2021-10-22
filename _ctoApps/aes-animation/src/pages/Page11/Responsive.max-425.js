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

        
        defines.introTextStyles = {
            ...defines.introTextStyles,
            fontSize: 18,
            wordWrapWidth: 300,
        }

        defines.rowTitleStyles = {
            ...defines.rowTitleStyles,
            width: this.getWidth(100),
            fontSize: 14,
        }

        defines.rowStyles = {
            ... defines.rowStyles,
            height: this.getHeight(12),
            width: this.getWidth(100),
            gap: 4,
            titleSpace: 18,
            x: 0,
            fontSize: 14,
        }

        defines.titleStyles = {
            ... defines.titleStyles,
            fontSize: 10,
            wordWrap: true,
            wordWrapWidth: 60,
        }

        defines.gridFontStyles = {
            fontSize: 9,
        }

        return defines;
    }
}

export default ResponsiveMax425