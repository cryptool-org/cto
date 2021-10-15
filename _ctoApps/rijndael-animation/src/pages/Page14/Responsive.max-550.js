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


        return defines;
    }
}

export default ResponsiveMax550