
import Component from "./Component"
import Grid from "./Grid"
import CircledText from "./CircledText"
import * as PIXI from "pixi.js"
import PIXIText from "./PIXIText"


/*
    Component for pages 12 + 13 to display rows of the AES states

*/

class GridRow extends Component{
    constructor(title, page){
        super();
        this.page = page;
        this.title = new PIXIText(title, {})

        
        this.addSymbol = new CircledText("+", {fill: 0x333333, fontSize: 30, align: "center"}, {radius: 20, borderColor: 0x00000})
        this.equalsSymbol = new PIXI.Text("=", {})

        this.gridStyles = {}

        this.grids = []
        for(let i = 0; i < 5; i++){
            const grid = new Grid(4,4, {},{})
            this.grids.push(grid);
        }

        this.addChild(this.title, ...this.grids, this.addSymbol, this.equalsSymbol)
    }

    addGridStyles(idx, styles){
        this.gridStyles[idx] = styles;
    }

    getGridStyles(idx, gridStyles={}){
        let gridStyle = {...gridStyles.default, ...gridStyles[idx]}
        return gridStyle
    }

    redraw(rowStyles, titleStyles, gridStyles, fontStyles){
        
        rowStyles = {
            width: 1000,
            gap: 10,
            margin: 10,
            titleSpace: 140,

            ...rowStyles
        }


      
        titleStyles = { ...titleStyles}
        fontStyles = {...fontStyles}

        const {grids, title, addSymbol, equalsSymbol} = this
      
    
        this.title.redraw(titleStyles)
       

      
        // calculate space for grid
        const addSymbolGap = addSymbol.width * 2;
        const equalsSymbolGap = equalsSymbol.width * 2;
        const openSpace = rowStyles.width - addSymbolGap - equalsSymbolGap - rowStyles.titleSpace - 3 * rowStyles.gap  ;
        const gridWidth = openSpace / 5;
        const gridHeight = rowStyles.height - rowStyles.margin
   
        this.gridWidth = gridWidth;
      
        // redraw
  

        
        grids.forEach((grid, idx) => {
            const styles = this.getGridStyles(idx,gridStyles)
            grid.redraw({width: gridWidth, height: gridHeight, ...styles}, fontStyles);
        })
      

        
     
        addSymbol.redraw({radius: 12, borderWidth: 1, borderColor: 0x333333},1)
        addSymbol.scale.set(.5)
     

       
        equalsSymbol.anchor.set(.4)
        equalsSymbol.scale.set(.4)
        

        title.redraw({...this.titleStyles})
        title.anchor.set(.5,.5)
        title.position.set(rowStyles.titleSpace / 2, gridHeight/2)
        grids[0].position.set(rowStyles.titleSpace, 0)
        

     
   
       
        let xPrev = rowStyles.titleSpace;

        for(let i = 1; i < 4; i++){          
            xPrev = xPrev + gridWidth + rowStyles.gap;
            grids[i].position.set(xPrev,0)     
        }
  

        // 4ms average

       

        addSymbol.position.set(grids[3].x + gridWidth + addSymbol.width, gridHeight /2)

        grids[4].position.set(addSymbol.x + addSymbol.width, 0)
     
        equalsSymbol.position.set(grids[4].x + gridWidth + equalsSymbol.width, gridHeight/ 2)
    
    }
}

export default GridRow;