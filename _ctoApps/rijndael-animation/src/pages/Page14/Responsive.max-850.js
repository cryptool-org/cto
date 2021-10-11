import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class ResponsiveMax850 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 850) return true;
        return false;
    }

    getDefines(defines){
       
    

        defines.sboxStyles = {
            ...defines.sboxStyles,
            x: this.getWidth(86),
            y: this.getHeight(60),
            width: 280,
            height: 240,
     
        }


        return defines;
    }
}

export default ResponsiveMax850