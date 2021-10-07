import AnimationPageResponsives from "../../core/AnimationPageResponsives"


class Page7DefaultResponsives extends AnimationPageResponsives{
    constructor(label, page){
        super(label, page);
    }

    getDefines(){

        const defines = {}


        defines.animatableBackgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-delta"),
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
            fill: this.page.getColor("--text-color-inverted"),
        }
      
        defines.backgroundStyles = {
            width: this.getWidth(100),
            height: this.getHeight(100),
            fill: this.c("--page-background-beta"),
            borderWidth: 0,
        }


        defines.sBoxStyles = {
            width: this.getWidth(50),
            height: this.getHeight(50),
            legendColor: this.c("--sbox-legend-background")
        }

     
        defines.sboxLegendStyles = {
            fontSize: 12,
        }
        
        defines.sBoxTextStyles = {
            fontSize: 12,
        }

        defines.sBoxPos = {
            x: this.getWidth(96),
            y: this.getHeight(96)
        }

        defines.gridStyles = {
            width: this.getWidth(24),
            height: this.getWidth(16),
            x: this.getWidth(25),
            y: this.getHeight(50)
        }


        defines.gridFontStyles = {
            fontSize: 18,
        }

        defines.stateMovableStyles = {
            fill: this.c("--grid-background-alpha")
        }

        defines.resultMovablesStyles = {
            fill: this.c("--grid-background-gamma")
        }

        defines.textBoxStyle = {
            width: this.getWidth(6),
            height: this.getWidth(4),
        }
    

        return defines;
    }







  
}

export default Page7DefaultResponsives