import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class Page4DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: 0x000000,
            borderWidth: 0,
        }

        defines.titleStyles = {     
            fill: this.c("--text-color-alpha"),
            x: this.getWidth(50),
            yDistance: this.getHeight(6),
            fontSize: 36,
        }

        defines.circledCharStyles = {
            x: this.getWidth(50),
            y: this.getHeight(30),
        }

        defines.textStyles = {
            x: this.getWidth(50),
            yDistance: this.getHeight(4),
            fontSize: 18,
            wordWrap: true,
            wordWrapWidth: 400,
            fill: this.c("--text-light")
        }


        defines.circleStyles = {}
        defines.circleFontStyles = {}

        
  
        return defines;
    }




  
}

export default Page4DefaultResponsives