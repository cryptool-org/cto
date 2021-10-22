import AnimationPage from "../../core/AnimationPage.js"

import CircledText from "../../components/CircledText";
import PIXIText from "../../components/PIXIText";

import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax425 from "./Responsive.max-425"


class Page4 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)
   
        this.interactiveChildren = true;
    }


    create(defines){
        const background = this.createBackground();
 
        const circledChar = new CircledText("A", {fontSize: 30, fill: 0xffffff}, {radius: 30,borderColor: 0xffffff})

        // title
        const title = new PIXIText("title")
        this.bindPageLocale("title", title)
        title.anchor.set(.5, .5)

        const text = new PIXIText("text")
        this.bindPageLocale("text", text)
        text.anchor.set(.5, 0)

        this.addPermanent({background, circledChar, title, text})    
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, title, circledChar, text,
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
            circledCharStyles, 
            titleStyles,
            textStyles,
        } = defines

        background.redraw(backgroundStyles)
     
        circledChar.redraw()
        circledChar.position.set(circledCharStyles.x, circledCharStyles.y)

        title.redraw(titleStyles)
        title.position.set(titleStyles.x,circledChar.y + circledChar.height + titleStyles.yDistance)
      
        text.redraw(textStyles)
        text.position.set(textStyles.x, title.position.y + title.height )     
    }
}


export default Page4;