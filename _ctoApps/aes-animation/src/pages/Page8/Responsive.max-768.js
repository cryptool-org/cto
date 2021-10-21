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
            width: this.getWidth(50),
            height: this.getHeight(30),
            x: this.getWidth(50),
            y: this.getHeight(26)
        }
       
        defines.baseTextStyles = {
            ...defines.baseTextStyles,
            fontSize: 30,
            anchor: {x: .5, y: .5}
        }

        const textY = defines.gridStyles.y + defines.gridStyles.height + 100;

        defines.text1Styles = {
            ... defines.text1Styles,
            position: {
                x: this.getWidth(50),
                y: textY
            }
        }

        defines.text2Styles = {
            ... defines.text2Styles,
            position: {
                x: this.getWidth(50),
                y: textY
            }
        }

        defines.text3Styles = {
            ... defines.text3Styles,
            position: {
                x: this.getWidth(50),
                y: textY
            }
        }


        return defines;
    }
}

export default ResponsiveMax768