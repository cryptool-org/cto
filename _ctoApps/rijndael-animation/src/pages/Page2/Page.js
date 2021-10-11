import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import TextBox from "../../components/TextBox"
import PIXIText from "../../components/PIXIText"
import ArrowWithText,{ARROW_ORIENTATION} from "../../components/ArrowWithText"



import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax425 from "./Responsive.max-425"
import ResponsiveMax375 from "./Responsive.max-375"

class Page2 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)
        this.registerResponsive("max-375", ResponsiveMax375)
    }

    create(defines){
        const background = this.createBackground();

        const centerBox = new TextBox("Cipher", {
            fill: 0xffffff,
            align: "center",
            fontSize: 50,
        })
        this.bindPageLocale("boxText", centerBox.text)


        // create top arrow and text
        const arrowTopContainer = new PIXI.Container();

        // create text + arrow
        const textTop = new PIXIText("text",{fill: 0xffffff})
        this.bindPageLocale("textTop", textTop)
        textTop.anchor.set(.5, 0)
        const arrowTop = new ArrowWithText("010101", {orientation: ARROW_ORIENTATION.DOWN})
        arrowTopContainer.addChild(textTop, arrowTop)

        // create textLeft + arrow
        const arrowLeftContainer = new PIXI.Container();
        const textLeft = new PIXIText("textLeft",{fill: 0xffffff})
        this.bindPageLocale("textLeft", textLeft)
        textLeft.anchor.set(.5, 0)
        const arrowLeft = new ArrowWithText("0101010", {orientation: ARROW_ORIENTATION.RIGHT})
        arrowLeftContainer.addChild(textLeft, arrowLeft)

        // create textBottom + arrow
        const arrowBotContainer = new PIXI.Container();
        const textBottom = new PIXIText("textLeft",{fill: 0xffffff})
        this.bindPageLocale("textBottom", textBottom)
        textBottom.anchor.set(.5, 0)
        const arrowBottom = new ArrowWithText("0101010", {orientation: ARROW_ORIENTATION.DOWN})
        arrowBotContainer.addChild(arrowBottom,textBottom)



        this.addPermanent({background, centerBox, arrowTopContainer, arrowLeftContainer, arrowBotContainer})
        this.addToGlobalComponents({arrowTop, textTop, arrowLeft, textLeft, textBottom, arrowBottom})

    }

    drawPage(defines){
        const {
            backgroundStyles, arrowLeftStyles,
        } = defines
        const {background, centerBox} = this.globalComponents;

        // redraw background styles
        background.redraw(backgroundStyles)


        // redraw center box styles
        const {textBoxStyles, textBoxTextStyles} = defines

        centerBox.redraw(textBoxStyles, textBoxTextStyles)
        centerBox.position.set(textBoxStyles.x, textBoxStyles.y)
        centerBox.pivot.set(textBoxStyles.width /2, textBoxStyles.height/2)

        const {arrowStyles, arrowFontStyles, arrowTitleStyles, arrowTextBottomStyles} = defines

        // redraw arrow top
        const {arrowTop, textTop, arrowTopContainer} = this.globalComponents;
        arrowTop.redraw(arrowStyles, arrowFontStyles)

        textTop.redraw({
            ...arrowTitleStyles,
            position: {
                x: arrowTop.width / 2,
                y:  0,
            },
        })

        arrowTop.position.set(0, textTop.height + 10) 
        arrowTopContainer.position.set(textBoxStyles.x,centerBox.y - centerBox.height / 2- arrowTopContainer.height)
        arrowTopContainer.pivot.set(arrowTopContainer.width  * .5,0)

        // redraw arrow left
        const {arrowLeft, textLeft, arrowLeftContainer} = this.globalComponents;
        arrowLeft.redraw({...arrowStyles,...arrowLeftStyles}, arrowFontStyles)
        textLeft.redraw({
            ...arrowTitleStyles,
            position: {
                x: arrowLeft.width / 2,
                y:  0,
            },
        })
        arrowLeft.position.set(0, textLeft.height + 10) 
        arrowLeftContainer.position.set(centerBox.x -  centerBox.width /2 -  arrowLeftContainer.width,textBoxStyles.y )
        arrowLeftContainer.pivot.set(0, arrowLeftContainer.height * .5)

        //redraw arrow bottom
        const {arrowBottom, textBottom, arrowBotContainer} = this.globalComponents;
        arrowBottom.redraw(arrowStyles, arrowFontStyles)
        arrowBottom.position.set(0, 0)

        textBottom.redraw({
            ...arrowTitleStyles,
            ...arrowTextBottomStyles,
            position: {
                x: arrowBottom.width / 2,
                y: arrowBottom.height + 10,
            },
        })
        
        arrowBotContainer.position.set(textBoxStyles.x,centerBox.y + textBoxStyles.height - (textBoxStyles.height / 2))
        arrowBotContainer.pivot.set(arrowBotContainer.width  * .5,0)
  
    }
}


export default Page2;