import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax550 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 550) return true;
        return false;
    }

    getDefines(defines){
       
    

        defines.baseGridStyles = {
            ...defines.baseGridStyles,
            width: 90,
            height: 60,
        }

        defines.baseGridFontStyle = {
            ...defines.baseGridFontStyle,
            fontSize: 12
        }

        defines.rconMovablesTextStyles = {
            fontSize: 12
        }

        defines.rconStyles = {
            ...defines.rconStyles,
            width: 240,
        }

        defines.addSymbolStyles = {
            scale: .6, 
            borderColor: this.c("--text-color"),
        }

        defines.addSymbolFontStyles = {
            scale: .6,
            fill: this.c("--text-color"),
        }

        defines.equalSymbolStyles = {
            fontSize: 30,
            fill: this.c("--text-color"),
        }


        return defines;
    }
}

export default ResponsiveMax550