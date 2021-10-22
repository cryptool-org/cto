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
        
        defines.roundKeyLabelStyles = {
            ...defines.roundKeyLabelStyles,
            fontSize: 18,
        }
        defines.roundKeyTextStyles = {
            ...defines.roundKeyTextStyles,     
            wordWrapWidth: 140,
            fontSize: 12,
        }
    
        
        defines.gridStyles = {
            ...defines.gridStyles,
            width: 140,
            height: 120,
        }
        
        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height,
        }

        defines.gridFontStyles = {
            ...defines.gridFontStyles,
            fontSize: 16
        }
     
        return defines;
    }
}

export default ResponsiveMax425