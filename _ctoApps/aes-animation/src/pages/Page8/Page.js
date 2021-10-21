import AnimationPage from "../../core/AnimationPage.js"

import AnimatableBackground from "../../components/AnimatableBackground"
import Grid from "../../components/Grid"
import PIXIText from "../../components/PIXIText"

import PageTimline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768";
import ResponsiveMax425 from "./Responsive.max-425";
import ResponsiveMax375 from "./Responsive.max-375";

class Page8 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimline(this);
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)  
    }


    create(defines){
        const background = this.createBackground();
        
        // background 
        const animatableBackground = new AnimatableBackground("title", {})
        this.bindPageLocale("title", animatableBackground.title)

        // grid + movables
        const grid = new Grid(4,4, {},{})
        const movables = grid.createMovables()
        this.subscribeTo("after-sub-bytes-1", movables.movables)


        // texts
        const text1 = new PIXIText("rotateTextOne")
        this.bindPageLocale("rotateTextOne",text1)

        const text2 = new PIXIText("rotateTextTwo")
        this.bindPageLocale("rotateTextTwo",text2)

        const text3 = new PIXIText("rotateTextThree")
        this.bindPageLocale("rotateTextThree",text3)

      
        this.addPermanent({background,animatableBackground, grid, text1, text2, text3})
        this.addChild(...movables.movables)
        this.addToGlobalComponents({movablesCollector: movables})

        this.sortableChildren = true;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground,
        } = this.globalComponents

        // background redraw
       
        const { backgroundStyles,movablesStyles} = defines
        background.redraw(backgroundStyles)

        // redraw animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)


        // redraw grid & movables
        const { grid, movablesCollector} = this.globalComponents;
        const {gridStyles, gridFontStyles} = defines;
        grid.redraw(gridStyles, {})
        grid.position.set(gridStyles.x, gridStyles.y)
        grid.pivot.set(grid.width /2, 0)

   
        movablesCollector.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...movablesStyles},gridFontStyles);
            movable.position.set(x, y)
        })


        // redraw text
        const {baseTextStyles, text1Styles,text2Styles,text3Styles} = defines;
        const {text1, text2, text3} = this.globalComponents;
        text1.redraw({...baseTextStyles,...text1Styles})
        text2.redraw({...baseTextStyles,...text2Styles})
        text3.redraw({...baseTextStyles,...text3Styles})   
    }
}


export default Page8;