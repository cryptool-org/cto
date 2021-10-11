import AnimationPageResponsives from "../../core/AnimationPageResponsives"

class Page3DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){
        const defines = {}

        defines.titleStyles = {
            fill: this.c("--text-light"),
            position: {
                x: this.getWidth(50),
                y: 50,
            }
        }

        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-iota"),
            borderWidth: 0,
        }

        defines.gridStyles = {
            width: this.getWidth(30),
            height: this.getWidth(20),
        }

        defines.leftGridStyles = {
            x: this.getWidth(25),
            yDistance: this.getHeight(2),
            fill: this.c("--grid-background-alpha")
        }

        defines.gridFontStyles = {
            fontSize: 20,
        }

        defines.rightGridStyles = {
            x: this.getWidth(75),
            yDistance: this.getHeight(2),
            fill: this.c("--grid-background-beta")
        }

        defines.subtitleStyles = {
            fill: this.c("--text-light"),
            fontSize: 30,

        }

        defines.subtitleLeftStyles = {
            position: {
                x: this.getWidth(25),
                y: this.getHeight(14)
            }
        }

        defines.subtitleRightStyles = {
            position: {
                x: this.getWidth(75),
                y: this.getHeight(14)
            }
        }


        defines.arrowStyles = {
            height: this.getHeight(16),
            width: this.getWidth(6),
        }

        defines.arrowLeftPos = {
            x: this.getWidth(25),
            yDistance: this.getHeight(2)
        }

        defines.arrowRightPos = {
            x: this.getWidth(75),
            yDistance: this.getHeight(2)
        }


        defines.textStyles = {
            fontSize: 23,
            fill: this.c("--text-light"),
            wordWrap: true,
            wordWrapWidth: 200,
        }

        defines.textRightStyles = {
            x: this.getWidth(75),
            yDistance: this.getHeight(2),
            fill: this.c("--text-color-beta")
        }
        defines.textLeftStyles = {
            x: this.getWidth(25),
            yDistance: this.getHeight(2),
            fill: this.c("--text-color-alpha")
        }


        defines.circleStyles = {
            borderWidth: 3,
            borderColor: this.c("--text-light")
        }

        defines.circleFontStyles = {}
        
        return defines;
    }
  
}

export default Page3DefaultResponsives