import AnimationPageResponsives from "../../core/AnimationPageResponsives"
import {degreeToRadians} from "../../utils/conversions"

class ResponsiveMax768 extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    evoke(animationDimensions){
        if(animationDimensions.width <= 768) return true;
        return false;
    }

    getDefines(defines){
       
        defines.rowTitleStyles = {
            ...defines.rowTitleStyles,
            fontSize: 14,
            rotation: degreeToRadians(-90),
        }

        defines.rowStyles = {
            ... defines.rowStyles,
            height: this.getHeight(12),
            width: this.getWidth(100),
            gap: 4,
            titleSpace: 18,
            x: 0,
            fontSize: 14,
        }

        defines.titleStyles = {
            ... defines.titleStyles,
            fontSize: 14,
            wordWrap: true,
            wordWrapWidth: 80,
        }

        defines.gridFontStyles = {
            fontSize: 14,
        }



        return defines;
    }
}

export default ResponsiveMax768