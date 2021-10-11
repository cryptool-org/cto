import AnimationPageResponsives from "../../core/AnimationPageResponsives"

import {gsap} from "gsap"
class Page6DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: 0xffffff,
            borderWidth: 0,
        }

        defines.titleStyles = {
            fill: this.c("--text-color"),
            position: {
                x: this.getWidth(50),
                y: this.getHeight(30)
            }
        }

        defines.containerPos = {
            x: this.getWidth(50),
        }

        defines.labelStyles = {
            width: this.getWidth(22), 
            height: this.getHeight(6),
            borderWidth: 2,
            borderFill: 0x000000,
            borderRadius: 30,
        }

        defines.labelFontStyles = {
            fontSize: 24,
            fill: this.c("--text-color")
        }


        defines.subBytesLabelStyles = {
            fill: this.c("--label-bg-alpha")
        }

        defines.shiftRowsLabelStyles = {
            fill: this.c("--label-bg-beta")
        }

        defines.mixColumnsLabelStyles = {
            fill: this.c("--label-bg-gamma")
        }

        defines.addRoundKeyLabelStyles = {
            fill: this.c("--label-bg-delta")
        }


    

        return defines;
    }


  



  
}

export default Page6DefaultResponsives