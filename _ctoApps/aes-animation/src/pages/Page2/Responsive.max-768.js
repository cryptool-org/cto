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
        defines.textBoxStyles = {
            ...defines.textBoxStyles,
            x: this.getWidth(70),
        }

        
        defines.textBoxTextStyles = {
            ...defines.textBoxTextStyles,
            fontSize: 20,
        }
        
        defines.arrowStyles = {
            ...defines.arrowStyles,
            width: this.getWidth(18),
            height: this.getHeight(20),
        }

        defines.arrowLeftStyles = {
            ...defines.arrowLeftStyles,
            width: this.getWidth(30),
            height: this.getHeight(10),
        }

        defines.arrowFontStyles = {
            ...defines.arrowFontStyles,
            fontSize: 14,
        }

     

       
   

        return defines;
    }
}

export default ResponsiveMax768