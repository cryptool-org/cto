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

        
        defines.baseGridStyles = {
            ...defines.baseGridStyles,
            width: 80,
            height: 60,
        }

        defines.sboxStyles = {
            ...defines.sboxStyles,
            x: this.getWidth(50) + 190, // width + x of grid rows
            y: this.getHeight(66),
            width: 320,
            height: 240,
            legendWidth: 24,
        }

        
        defines.rconStyles = {
            ...defines.rconStyles,
            width: 200,
            height: 64,
        }

        defines.roundKeyLabelStyles = {
            ...defines.roundKeyLabelStyles,
            fontSize: 8,
        }

        defines.primaryGridPos = {
            ...defines.primaryGridPos,
            x: this.getWidth(4),
            y: 20,
        }

        defines.secondaryGridPos = {
            ...defines.secondaryGridPos,
            x: this.getWidth(4),
            y: 100,
        }

        defines.baseGridFontStyle = {
            ...defines.baseGridFontStyle,
            fontSize: 10
        }


        defines.addSymbolStyles = {
            ... defines.addSymbolStyles,
            radius: 12, 
        }

        defines.addSymbolFontStyles = {
            ... defines.addSymbolFontStyles,
            fontSize: 16,
        }

        defines.equalSymbolStyles = {
            ... defines.equalSymbolStyles,
            fontSize: 22,
        }
   

        defines.rconTextStyles = {
            ...defines.rconTextStyles,
            fontSize: 20,
            distanceX: 10,
        }

        defines.addSymbolStyles = {
            scale: .5, 
            borderColor: this.c("--text-color"),
        }

        defines.addSymbolFontStyles = {
            scale: .8,
            fill: this.c("--text-color"),
        }

        return defines;
    }
}

export default ResponsiveMax425