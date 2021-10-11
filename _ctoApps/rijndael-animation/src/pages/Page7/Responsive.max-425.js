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
            width: this.getWidth(50),
            height: this.getWidth(26),
            x: this.getWidth(50),
            y: this.getHeight(28),
       
        }

        defines.gridFontStyles = {
            ...defines.gridFontStyles,
            fontSize: 14,
        }

        defines.textBoxStyle = {
            ...defines.textBoxStyle,
            width: this.getWidth(12),
            height: this.getWidth(8),
        }

        defines.sBoxStyles = {
            ...defines.sBoxStyles,
            width: this.getWidth(96),
            height: this.getHeight(50),
            legendWidth: 24,
        }

        defines.sboxLegendStyles = {
            ...defines.sboxLegendStyles,
            fontSize: 8,
        }
        
        defines.sBoxTextStyles = {
            ...defines.sBoxTextStyles,
            fontSize: 8,
        }

        defines.sBoxPos = {
            ...defines.sBoxPos,
            x: this.getWidth(98),
            y: this.getHeight(96)
        }


        return defines;
    }
}

export default ResponsiveMax425