import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax768 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 768) return true;
        return false;
    }

    getDefines(defines){
       
        defines.labelStyles = {
            ...defines.labelStyles,
            width: this.getWidth(36), 
        }

        defines.labelFontStyles = {
            ...defines.labelFontStyles,
            fontSize: 20,
        }

        defines.titleStyles = {
            ...defines.titleStyles,
            fontSize: 22,
            wordWrap: true,
            wordWrapWidth: 360,
        }


        return defines;
    }
}

export default ResponsiveMax768