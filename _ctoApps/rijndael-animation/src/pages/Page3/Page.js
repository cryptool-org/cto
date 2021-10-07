import AnimationPage from "../../core/AnimationPage.js"

import Arrow, {ARROW_ORIENTATION} from "../../components/Arrow"
import Grid2 from "../../components/Grid"
import CircledText from "../../components/CircledText";
import PIXIText from "../../components/PIXIText"

import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"

import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax425 from "./Responsive.max-425"
import ResponsiveMax375 from "./Responsive.max-375"


class Page3 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)
        this.registerResponsive("max-375", ResponsiveMax375)

        this.interactiveChildren = true;
    }


    create(defines){
        const background = this.createBackground();

        // title
        const title = new PIXIText("title")
        this.bindPageLocale("title",title)
        title.anchor.set(.5, .5)

        // left side (state)
        const subtitleLeft = new PIXIText("subtitleLeft")
        this.bindPageLocale("subtitleLeft",subtitleLeft)
        subtitleLeft.anchor.set(.5, .5)

        // left grid
        const gridLeft = new Grid2(4,4, {}, {})
        this.subscribeTo("initial-state", gridLeft.cells)
     
        // left arrow
        const arrowLeft = new Arrow({orientation: ARROW_ORIENTATION.DOWN})  

        // left text
        const textLeft = new PIXIText("textLeft", {align: "center", fontWeight: "500"})
        this.bindPageLocale("textLeft",textLeft)
        textLeft.anchor.set(.5, 0)

        const circleLeft = new CircledText("A", {fontSize: 30, fill: 0xffffff},  {radius: 30,borderColor: 0xffffff})


        // right side (key)
        const subtitleRight = new PIXIText("subtitleRight")
        this.bindPageLocale("subtitleRight",subtitleRight)
        subtitleRight.anchor.set(.5)

        const gridRight = new Grid2(4,4, {}, {})
        this.subscribeTo("key-0", gridRight.cells)

        const arrowRight = new Arrow({orientation: ARROW_ORIENTATION.DOWN})  

        const textRight = new PIXIText("textRight", {align: "center", fontWeight: "500"})
        this.bindPageLocale("textRight",textRight)
        textRight.anchor.set(.5, 0)

        const circleRight = new CircledText("B", {fontSize: 30, fill: 0xffffff},  {radius: 30,borderColor: 0xffffff})
        
        this.addPermanent({background, title, subtitleLeft, gridLeft, subtitleRight, gridRight, arrowLeft, arrowRight, textRight, textLeft, circleLeft, circleRight})   
    }

    drawPage(defines){
    
        // redraw title & background
        const { titleStyles, backgroundStyles, animationDimensions} = defines
        const { background, title, } = this.globalComponents
        background.redraw(backgroundStyles)

        title.redraw(titleStyles)

        // general styles 2
        const {subtitleStyles, textStyles,gridFontStyles, arrowStyles, gridStyles, circleStyles, circleFontStyles} = defines;


        // redraw left side
        const {textLeftStyles, leftGridStyles, arrowLeftPos, subtitleLeftStyles} = defines
        const {subtitleLeft, gridLeft, textLeft, arrowLeft, circleLeft} = this.globalComponents;

        subtitleLeft.redraw({
            ...subtitleStyles,
            ...subtitleLeftStyles,
        })


        gridLeft.redraw({...gridStyles, ...leftGridStyles}, gridFontStyles)
        gridLeft.position.set(leftGridStyles.x, subtitleLeft.y + subtitleLeft.height + leftGridStyles.yDistance)
        gridLeft.pivot.set(gridLeft.width / 2 , 0)

        arrowLeft.redraw(arrowStyles)
        arrowLeft.pivot.set(arrowLeft.width/2, 0)    
        arrowLeft.position.set(arrowLeftPos.x, gridLeft.y + gridLeft.height + arrowLeftPos.yDistance)

        textLeft.redraw({...textStyles,...textLeftStyles})
        textLeft.position.set(textLeftStyles.x, arrowLeft.y + arrowLeft.height + textLeftStyles.yDistance)

        circleLeft.redraw(circleStyles, circleFontStyles)
        circleLeft.position.set(arrowLeftPos.x, textLeft.y + textLeft.height + circleLeft.height /2 + 10)


        // redraw right side
        const {textRightStyles, rightGridStyles, arrowRightPos, subtitleRightStyles} = defines
        const {subtitleRight, gridRight, textRight, arrowRight, circleRight} = this.globalComponents;

        // right subtitle
        subtitleRight.redraw({
            ...subtitleStyles,
            ...subtitleRightStyles,
        })

        // right grid
        gridRight.redraw({...gridStyles, ...rightGridStyles}, gridFontStyles)
        gridRight.position.set(rightGridStyles.x, subtitleRight.y + subtitleRight.height + rightGridStyles.yDistance)
        gridRight.pivot.set(gridRight.width / 2 , 0)

        // right arrow
        arrowRight.redraw(arrowStyles)
        arrowRight.pivot.set(arrowRight.width/2, 0)    
        arrowRight.position.set(arrowRightPos.x, gridRight.y + gridRight.height +arrowRightPos.yDistance)

        // right text 
        textRight.redraw({...textStyles,...textRightStyles})
        textRight.position.set(textRightStyles.x, arrowRight.y + arrowRight.height + textRightStyles.yDistance)

        // right circle
        circleRight.redraw(circleStyles, circleFontStyles)
        circleRight.position.set(arrowRight.x, textRight.y + textRight.height + circleRight.height /2 + 10) 
    }
}


export default Page3;