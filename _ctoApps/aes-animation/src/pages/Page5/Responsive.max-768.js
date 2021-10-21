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
       
        defines.counterStyles = {
            ...defines.counterStyles,
            width: 59,
            height: 40,
            position: {
                x:  this.getWidth(80),
                y: this.getHeight(96)
            },
        }



        defines.sectionTitleStyles = {
            ...defines.sectionTitleStyles,
            fontSize: 16,
        }

        defines.initialRoundTitleStyles = {
            position: {
                x: this.getWidth(96),
                y: this.getHeight(30),
            },
            
        }

        defines.mainRoundTitleStyles = {
            position: {
                x: this.getWidth(96),
                y: this.getHeight(50),
            },
        }

        defines.finalRoundTitleStyles  = {
            position: {
                x: this.getWidth(96),
                y: this.getHeight(70),
            },
        }

        defines.roundLabelTextStyles = {
            ...defines.roundLabelTextStyles,
            width: this.getWidth(20), 
            fontSize:10
        }

        return defines;
    }
}

export default ResponsiveMax768