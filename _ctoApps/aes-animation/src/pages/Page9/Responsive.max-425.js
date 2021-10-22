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
        
        defines.equationPos = {
            ...defines.equationPos,
            x: this.getWidth(10),
            y: this.getHeight(26)
        }

        
        defines.gridLandingPos = {
            ...defines.gridLandingPos,
            x: this.getWidth(10),
            y: this.getHeight(50)
        }
        
        defines.textStyles = {
            ...defines.textStyles, 
            fontSize: 18,
            position: {
                x: this.getWidth(10),
                y: this.getHeight(75)
            }
        }

        

        defines.gridFontStyles = {
            ...defines.gridFontStyles, 
            fontSize: 18
        }
        return defines;
    }
}

export default ResponsiveMax425