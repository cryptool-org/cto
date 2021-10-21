import AnimationPageResponsives from "../../core/AnimationPageResponsives"




import {gsap} from "gsap"
class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}

      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-gamma"),
            borderWidth: 0,
        }

        defines.barStyles = {
            width: this.getWidth(100),
            height: this.getHeight(5),
            fill: this.c("--bar-background-alpha"),
            borderWidth: 0,
        }

        defines.baseGridStyles = {
            width: 120,
            height: 100,
            fill: this.c("--grid-background-eta"),
        }

        defines.baseGridTextStyles = {
            fontSize: 14,
        }

        defines.finalGridPos = {
            x: this.getWidth(96),
        }

        defines.titleStyles = {
            y: 10, 
            x: this.getWidth(90),
            scale: 1,
        }

        defines.sboxStyles = {
            x: this.getWidth(80),
            y: this.getHeight(54),
            width: 340,
            height: 260,
            legendWidth: 24,
            legendColor: this.c("--sbox-legend-background")
        }

        defines.sboxLegendStyles = {
            fontSize: 10,
        }
        
        defines.sBoxTextStyles = {
            fontSize: 10,
        }


        //
        defines.rconStyles = {
            fill: this.c("--grid-background-alpha"),
            width: 300,
            height: this.getHeight(16),
            x: this.getWidth(50),
            y: this.getHeight(96),
        }

        defines.rconMovablesTextStyles = {
            fontSize: 28,
            scale: .5
        }

        defines.rconMovablesStyles = {
            fill: this.c("--grid-background-alpha"),
        }


        defines.firstGridStyle = {
            fill: this.c("--grid-background-beta"),
        }

        defines.gridMovableStyles = {
            fill: 0xC2C0C2,
        }

        
        defines.baseGridFontStyle = {
            fontSize: 16
        }

        
        defines.subbytesMovablesStyles = {
            fill: this.c("--grid-background-gamma")
        }


        defines.xorTextPos = {
            x: this.getWidth(96),
            y: this.getHeight(50)
        }

        defines.initialTextPos = {
            x: this.getWidth(96),
            y: this.getHeight(50)
        }

        defines.sTextStylesPos = {
            x: this.getWidth(96),
            y: this.getHeight(50)
        }
    
        defines.roundKeyLabelStyles = {
            fill: 0xffffff,
            fontSize: 12,
            
        }

        defines.primaryGridPos = {
            x: 50,
            y: 50,
        }

        defines.secondaryGridPos = {
            x: 50,
            y: 200,
        }


        defines.addSymbolStyles = {
            scale: 1, 
            borderColor: this.c("--text-color"),
        }

        defines.addSymbolFontStyles = {
            scale: 1,
            fill: this.c("--text-color"),
        }

        defines.equalSymbolStyles = {
            fontSize: 50,
            fill: this.c("--text-color"),
        }

        defines.rconTextStyles = {
            fill: this.c("--text-light"),
            fontSize: 30,
            distanceX: 20,
            anchor: {
                x: 0,
                y: .5
            }
        }

        return defines;
    }






  
}

export default Page7DefaultResponsives