import AnimationPageResponsives from "../../core/AnimationPageResponsives"



import {gsap} from "gsap"
class Page8DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-zeta"),
        }

        defines.animatableBackgroundTitleStyles = {
            position: {
                x: this.getWidth(90),
                y: this.getHeight(4),
            },
            fill: this.c("--text-light"),
            fontSize: 30,
        }


        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(5),
            fill: this.c("--bar-background-alpha"),
        }

        defines.gridFontStyles = {
            fontSize: 20
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-delta"),
            borderWidth: 0,
        }



        defines.gridStyles = {
            width: this.getWidth(30),
            height: this.getHeight(30),
            fill: this.c(" --grid-background-alpha"),
            x: this.getWidth(25),
            y: this.getHeight(50)
        }

        defines.movablesStyles = {
            fill: this.c("--grid-background-alpha")
        }



        defines.baseTextStyles = {
            fontSize: 24,
            anchor: {x: 0, y: .5}
        }
        const cellHeight = defines.gridStyles.height / 4;

        defines.text1Styles = {
            fill: this.c("--text-light"),
            position: {
                x: this.getWidth(50),
                y: defines.gridStyles.y + cellHeight * 1.5
            }
        }

        defines.text2Styles = {
            fill: this.c("--text-light"),
            position: {
                x: this.getWidth(50),
                y: defines.gridStyles.y + cellHeight * 2.5   
            }
        }

        defines.text3Styles = {
            fill: this.c("--text-light"),
            position: {
                x: this.getWidth(50),
                y: defines.gridStyles.y + cellHeight * 3.5
            }
        }

        return defines;
    }
}

export default Page8DefaultResponsives