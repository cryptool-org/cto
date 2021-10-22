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
       
        defines.gridStyles = {
            ...defines.gridStyles,
            width: this.getWidth(24),
            height: this.getWidth(16),
            x: this.getWidth(50),
            y: this.getHeight(28)
        }

        defines.gridFontStyles = {
            ...defines.gridFontStyles,
            fontSize: 14,
        }

        defines.sBoxStyles = {
            ...defines.sBoxStyles,
            width: this.getWidth(90),
            height: this.getHeight(50)
        }

        defines.sboxLegendStyles = {
            ...defines.sboxLegendStyles,
            fontSize: 10,
        }
        
        defines.sBoxTextStyles = {
            ...defines.sBoxTextStyles,
            fontSize: 10,
        }

        defines.sBoxPos = {
            ...defines.sBoxPos,
            x: this.getWidth(95),
            y: this.getHeight(96)
        }

        return defines;
    }
}

export default ResponsiveMax768