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
        defines.equationPos = {
            ...defines.equationPos,
            x: this.getWidth(20),
            y: this.getHeight(26)
        }

        
        defines.gridLandingPos = {
            ...defines.gridLandingPos,
            x: this.getWidth(20),
            y: this.getHeight(50)
        }
        
        defines.textStyles = {
            ...defines.textStyles, 
            fontSize: 22,
            wordWrapWidth: 300,
            position: {
                x: this.getWidth(20),
                y: this.getHeight(70)
            }
        }

        
        defines.galoisFieldStyles = {
            ...defines.galoisFieldStyles,
            width: 160,
            height: 140,
        }

       
        defines.gridStyles = {
            ...defines.gridStyles,
            width: 200,
            height: 160,
        }

        defines.gridFontStyles = {
            ...defines.gridFontStyles, 
            fontSize: 18
        }

    



        return defines;
    }
}

export default ResponsiveMax768