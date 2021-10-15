import AnimationPage from "../../core/AnimationPage.js"
import PageTimeline from "./PageTimeline"

import AnimatableBackground from "../../components/AnimatableBackground"
import SBox from "../../components/SBox"
import Grid from "../../components/Grid"
import TextBox from "../../components/TextBox"

import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768";
import ResponsiveMax425 from "./Responsive.max-425";
import ResponsiveMax375 from "./Responsive.max-375";


class Page7 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
 
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425) 
    }


    create(defines){
        const background = this.createBackground();
        
        const animatableBackground = new AnimatableBackground("title", {})


        this.bindPageLocale("title", animatableBackground.title)

        const sbox = new SBox()
        this.subscribeTo("sbox", sbox.grid.cells)
        const { sBoxStyles, sboxLegendStyles, sBoxTextStyles} = defines
        sbox.redraw(sBoxStyles, sboxLegendStyles, sBoxTextStyles);

        const textBox = new TextBox()

        const grid = new Grid(4,4, {},{})
        const stateMovables = grid.createMovables()
        const resultMovables = grid.createMovables();

        
        this.subscribeTo("after-initial-round", stateMovables.movables)
        this.subscribeTo("after-sub-bytes-1", resultMovables.movables)
      
        this.addPermanent({background,animatableBackground,sbox, grid, textBox})

        this.addChild(...stateMovables.movables, ...resultMovables.movables)

        this.addToGlobalComponents({stateMovables, resultMovables})
       
        this.sortableChildren = true;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground, sbox, grid, textBox
        } = this.globalComponents

        // background redraw
        const { backgroundStyles} = defines
        background.redraw(backgroundStyles)


        // animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)


        const {sBoxPos, sBoxStyles, sboxLegendStyles, sBoxTextStyles} = defines
        sbox.redraw(sBoxStyles, sboxLegendStyles, sBoxTextStyles);    
        sbox.pivot.set(sBoxStyles.width, sBoxStyles.height)
        sbox.position.set(sBoxPos.x, sBoxPos.y)


        const {textBoxStyle} = defines;
        textBox.redraw(textBoxStyle, {})
        textBox.position.set(sbox.x - sBoxStyles.width / 2, sbox.y - sBoxStyles.height - textBox.height -10)
        textBox.pivot.set(textBox.width/2, 0)


        const {gridStyles, gridFontStyles} = defines
        grid.redraw(gridStyles);
        grid.position.set(gridStyles.x, gridStyles.y)
        grid.pivot.set(grid.width/2, grid.height/2)


        const {stateMovables} = this.globalComponents;
        const {stateMovableStyles} = defines
        stateMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...stateMovableStyles},gridFontStyles);
            movable.position.set(x, y)
        })

        const {resultMovables} = this.globalComponents;
        const {resultMovablesStyles} = defines
        resultMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...resultMovablesStyles},gridFontStyles);
            movable.position.set(x, y)
        })
    }
}

export default Page7;