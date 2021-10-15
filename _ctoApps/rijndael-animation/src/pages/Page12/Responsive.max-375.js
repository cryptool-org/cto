import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax375 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width < 375) return true;
        return false;
    }

    getDefines(defines){
       
        return defines;
    }
}

export default ResponsiveMax375