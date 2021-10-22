import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class Page5DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.abBaseTextStyles = {
            fill: this.c("--text-dark"),
        }

        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-beta"),
        }

        defines.animatableBackgroundTitleStyles = {
            position: {
                x: this.getWidth(90),
                y: this.getHeight(4),
            },
            fill: this.c("--text-grey"),
            fontSize: 30,
        }

        defines.animatableBackgroundBarStyles = {
            width: this.getWidth(100),
            height: this.getHeight(4),
            fill: this.c("--bar-background-beta")
 
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-alpha"),
            borderWidth: 0,
        }


        defines.svgStyles = {
            width: 200,
            x: this.getWidth(20),
        }

        defines.roundedLabelStyles = {
            width: this.getWidth(20), 
            height: this.getHeight(4),
            fill: 0xff0000,
            borderWidth: 1,
            borderFill: 0x000000,
            borderRadius: 30,
        }

        defines.roundLabelTextStyles = {
            fontSize:16
        }


        defines.addRoundKeyStyles = {
            fill: this.c("--label-bg-delta")
        }

        defines.subBytesStyles = {
            fill: this.c("--label-bg-alpha")
        }

        defines.shiftRowsStyles = {
            fill: this.c("--label-bg-beta")
        }

        defines.mixColumnsStyles = {
            fill: this.c("--label-bg-gamma")
        }


        defines.sectionTitleStyles = {
            fill: this.c("--text-grey"),
            fontSize: 24,
            anchor: {x: 1, y: .5}
        }

        defines.initialRoundTitleStyles = {
            position: {
                x: this.getWidth(90),
                y: this.getHeight(30),
            },
            
        }

        defines.mainRoundTitleStyles = {
            position: {
                x: this.getWidth(90),
                y: this.getHeight(50),
            },
        }

        defines.finalRoundTitleStyles  = {
            position: {
                x: this.getWidth(90),
                y: this.getHeight(70),
            },
        }

        defines.runnerStyles = {
            width: 30,
            height: 30,
            fill: this.c("--grid-background-alpha")
        }


        defines.counterStyles = {
            width: 50,
            height: 40,
            position: {
                x:  40,
                y: this.getHeight(90)
            },
            fill: this.c("--encryptor-box"),
        }

        defines.counterDisplayStyles  = {
            fontSize: 20,
            fill: this.c("--text-light"),

        }

        defines.counterTextStyles = {
            fontSize: 20,
            fill: this.c("--text-dark"),
        }
    

        return defines;
    }


    



  
}

export default Page5DefaultResponsives