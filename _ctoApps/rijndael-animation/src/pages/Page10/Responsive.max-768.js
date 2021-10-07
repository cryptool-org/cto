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
      

        
        defines.roundKeyLabelStyles = {
            ...defines.roundKeyLabelStyles,
            fontSize: 24,
        }
        defines.roundKeyTextStyles = {
            ...defines.roundKeyTextStyles,     
            wordWrapWidth: 180,
        }
    
        
        defines.gridStyles = {
            ...defines.gridStyles,
            width: 180,
            height: 160,
        }

        defines.stateGridPos = {
            ...defines.stateGridPos,
            x: this.getWidth(25),
            y: this.getHeight(70)
        }

        defines.roundKeyGridPos = {
            ...defines.stateGridPos,
            x: this.getWidth(75),
            y: this.getHeight(70)
        }


        defines.equationPos = {
            ...defines.equationPos,
            x: this.getWidth(50),
            y: this.getHeight(40),
        }

        
        defines.columnStyles = {
            width: defines.gridStyles.width / 4,
            height: defines.gridStyles.height,
        }



        return defines;
    }
}

export default ResponsiveMax768