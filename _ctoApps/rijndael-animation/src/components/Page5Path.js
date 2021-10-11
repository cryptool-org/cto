import Component from "./Component"
import * as PIXI from "pixi.js"

class Page5Path extends Component{
    constructor(){
        super();


        this.svg;
        this.path;
        this.points;

        this.info = {}
    }


    getPath(){
        const points = this.path.points
        const path = []
        for (let i = 0;i < points.length; i=i+2) {
            path.push({x: points[i] + this.x, y: points[i+1] + this.y})
        }
        return path;
    }


    getPathPercent(element){
        

        const {width, height, segOne, segTwo, segThree, totalLength} = this.info;


        const bounds = element.getBounds();
        const yPos = bounds.y - this.y;
      

        

        if(yPos <= segOne){
            return yPos / totalLength;
        }else if(yPos <= segOne + segTwo){
            return yPos / totalLength;
        }

        return yPos + 2 * width + 2 * segTwo;




    }


    redraw(styles){
        this.removeChildren();

        const {width, height} = styles;

        const graphic = new PIXI.Graphics();


        const hSegments = [2,4,4];
        const yMul = height / hSegments.reduce((pv, cv) => pv + cv, 0);

        const yOne = yMul * hSegments[0];
        const yTwo = yOne + yMul * hSegments[1];


        const totalLength =  height + width * 2 + 2 * hSegments[1] * yMul;


        const getSegment = (y, length, prev) => {
            return {
                y,
                length,
                startDist: prev ? prev.startDist + prev.length : 0,
                progress: prev ? (prev.startDist + prev.length) / totalLength : 0,
            }
        }

        const segments = {}
        const one = getSegment(0, yMul * hSegments[0], null)
        const two = getSegment(yOne, yMul * hSegments[1], one)
        const three = getSegment(yTwo, yMul * hSegments[1] + width * 2, two)
        const four = getSegment(yOne, yMul * hSegments[1], three)
        const five = getSegment(yTwo, yMul * hSegments[2], four)
        

 


        this.info = {
            height: height,
            width: width,
            segments: {
                one,
                two,
                three,
                four,
                five
            },
            totalLength
        }


        graphic.lineStyle(2, 0x000000, 1, 0)
        graphic.moveTo(0,0)
        graphic.lineTo(0, yTwo)

        graphic.lineTo(width, yTwo)
        graphic.lineTo(width, yOne)
        graphic.lineTo(0, yOne)
        graphic.lineTo(0, height)
        

        this.svg = graphic;

        this.path = this.svg.currentPath;

        this.addChild(this.svg)

    }
}

export default Page5Path