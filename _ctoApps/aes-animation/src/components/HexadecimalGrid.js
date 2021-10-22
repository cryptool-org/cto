

import * as PIXI from "pixi.js"

import Component from "./Component"
import HexadecimalTextBox, {appRenderer} from "./HexadecimalTextBox"


import MovablesCollector from "../core/MovablesCollector"

class SpriteGrid extends Component{
    constructor(rows, cols, backgroundSetttings, textSettings){
        super();

        this.rows = rows;
        this.cols = cols;
        this.backgroundSettings = backgroundSetttings;
        this.textSettings = textSettings;


        this.cells = []

        this.redraw();
    }


    getGraphic(){

        const {width, height, fill} = this.backgroundSettings; 

        const graphic = new PIXI.Graphics();
        graphic.lineStyle(1, 0x333333, 1, 0)
        graphic.beginFill(0xffffff)

        graphic.drawRect(0,0,width,height)
        graphic.endFill();
        graphic.position.set(0,0)
        graphic.tint = fill;
     
        return graphic;
    }

    redraw(){
        this.removeChildren();
        const bgGraphic = this.getGraphic();
        const bgTexture = appRenderer.generateTexture(bgGraphic)


        this.cells = []

        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const textBox = new HexadecimalTextBox(bgTexture, this.textSettings)
                textBox.position.set(bgGraphic.width * c, (bgGraphic.height )  * r)
                this.cells.push(textBox)
            }
        }
        
        this.addChild(...this.cells)
    }


    getGraphic2({width, height, fill, lineWidth, lineFill, }){
      

        const graphic = new PIXI.Graphics();
        graphic.lineStyle(1, 0x333333, 1, 0)
        graphic.beginFill(0xffffff)

        graphic.drawRect(0,0,width,height)
        graphic.endFill();

        graphic.tint = fill;
     
        return graphic;
    }

    createMovables(cellBackgroundStyle, cellTextStyle={}){
        const movableCells = []
        const bgGraphic = this.getGraphic2(cellBackgroundStyle);
        const bgTexture = appRenderer.generateTexture(bgGraphic)
    

        this.cells.forEach(cell => {
            const cellBounds = cell.getBounds()
            const movableCell = new HexadecimalTextBox(bgTexture, cellTextStyle) 
            movableCell.position.set(cellBounds.x, cellBounds.y)
            movableCells.push(movableCell)
        })

        return new MovablesCollector(movableCells, this.rows, this.cols)
    }

    getRow(rowIndex){
        return this.cells.slice(rowIndex * this.cols, rowIndex * this.cols + this.cols)
    }

    getCol(colIndex){
        return this.cells.reduce((colArray, cell, idx) => {
            return idx % this.cols == colIndex ? [...colArray, cell] : colArray;
        }, [])
    }

    get(rowIndex, colIndex){
        return this.cells[rowIndex * this.cols + colIndex];
    }
}


export default SpriteGrid