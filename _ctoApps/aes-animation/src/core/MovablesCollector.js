class MovablesCollector{
    constructor( movables, rows=1, cols=movables.length){
        this.movables = movables;
        this.cols = cols,
        this.rows = rows;
    }


    getRow(rowIndex){
        return this.movables.slice(rowIndex * this.cols, rowIndex * this.cols + this.cols)
    }

    getCol(colIndex){
        return this.movables.reduce((colArray, movable, idx) => {
            return idx % this.cols == colIndex ? [...colArray, movable] : colArray;
        }, [])
    }

    get(rowIndex, colIndex){
        return this.movables[rowIndex * this.cols + colIndex];
    }


}


export default MovablesCollector;