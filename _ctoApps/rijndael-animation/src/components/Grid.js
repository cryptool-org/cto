import * as PIXI from "pixi.js"
import TextBox from "./TextBox.js"
import MovablesCollector from "../core/MovablesCollector"

class ResponsiveGrid extends PIXI.Container{

    constructor(rows, cols, bgStyles, textStyles){
        super();
        this.cols = cols;
        this.rows = rows;
        this.bgStyles = bgStyles;
        this.textStyles = textStyles;

        this.cells = [...new Array(this.cols * this.rows)].map((_,idx) => {
            const cell = new TextBox()
            this.addChild(cell)
            return cell;
        })

        
    }

    redraw(bgStyles, textStyles){       
        bgStyles = {width: 300, height: 200, ...bgStyles}

        const cellWidth = bgStyles.width / this.cols;
        const cellHeight = bgStyles.height / this.rows;
      

        for(let r = 0; r < this.rows; r++){
        
            for(let c = 0; c < this.cols; c++){        
                const cell = this.cells[r * this.cols + c];
                cell.redraw({...bgStyles, width: cellWidth, height: cellHeight}, textStyles)
                cell.position.set(cellWidth * c, cellHeight * r)       
            }
        }     
    }

    createMovables(cellBackgroundStyle, cellTextStyle={}){
        const movableCells = []
        this.cells.forEach(cell => {
            const cellBounds = cell.getBounds()
            const movableCell = new TextBox(cellBackgroundStyle, cellTextStyle) 
            movableCell.position.set(cellBounds.x, cellBounds.y)
            movableCells.push(movableCell)
        })

        return new MovablesCollector(movableCells, this.rows, this.cols)
    }

    // get col etc

    getByColumn(){
        let cells = [];
        for(let i = 0; i < this.cols; i++){
            const colCells = this.getCol(i)
            cells = [...cells, ...colCells]
        }
        return cells;
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

export default ResponsiveGrid;