import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page6DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-eta"),
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
            height: this.getHeight(8),
            fill: this.c("--bar-background-alpha"),
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-zeta"),
            borderWidth: 0,
        }


        defines.gridFontStyles = {
            fontSize: 24
        }

    
        // galois field
        defines.galoisFieldFontStyles = {
            fontSize: 24
        }


        defines.galoisFieldStyles = {
            width: this.getWidth(26),
            height: this.getWidth(20),
        }

       
        defines.gridStyles = {
            width: this.getWidth(26),
            height: this.getWidth(20),
        }

    

        defines.gridLandingPos = {
            x: this.getWidth(8),
            y: this.getHeight(55)
        }



        defines.equationPos = {
            x: this.getWidth(40),
            y: this.getHeight(30),
        }

  
        defines.stateGridStyle = {
            fill: this.c("--grid-background-alpha"),
        }

        defines.resultGridStyle = {
            fill: this.c("--grid-background-delta"),
        }

        defines.columnLandingPos = {}
        defines.resultLandingPos = {}


        defines.textStyles = {
            fontSize: 20,
            wordWrap: true,
            fill: this.c("--text-color"),
            wordWrapWidth: 400,
            position: {
                x: this.getWidth(40),
                y: this.getHeight(70)
            }
        }
        

    

        return defines;
    }





  
  
}

export default Page6DefaultResponsives