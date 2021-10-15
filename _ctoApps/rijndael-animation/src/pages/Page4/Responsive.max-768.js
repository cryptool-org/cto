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
       
        defines.textStyles = {
            ... defines.textStyles,
            fontSize: 20,
            wordWrapWidth: 360,
        }



        return defines;
    }
}

export default ResponsiveMax768