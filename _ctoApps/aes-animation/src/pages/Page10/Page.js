import * as PIXI from "pixi.js"

import AnimationPage from "../../core/AnimationPage.js"
import PageTimeline from "./PageTimline"

import AnimatableBackground from "../../components/AnimatableBackground"
import Grid from "../../components/Grid"
import CircledText from "../../components/CircledText"
import PIXIText from "../../components/PIXIText.js"

import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768";
import ResponsiveMax425 from "./Responsive.max-425";
import ResponsiveMax375 from "./Responsive.max-375";


class Page10 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)


        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)
       // this.registerResponsive("max-375", ResponsiveMax375)

       this.sortableChildren = true;
    }


    create(defines){
        const background = this.createBackground();
        
        const animatableBackground = new AnimatableBackground("title", {})
        this.bindPageLocale("title", animatableBackground.title)


        const stateGrid = new Grid(4,4,{},{})
        const stateMovables = stateGrid.createMovables();
        const resultMovables = stateGrid.createMovables();

      

        const roundKeyGrid = new Grid(4,4, {}, {})
        const roundKeyMovables = roundKeyGrid.createMovables();


        this.subscribeTo("after-mix-columns-1", stateMovables.movables)
        this.subscribeTo("after-add-round-key-1", resultMovables.movables)
        this.subscribeTo("key-1", roundKeyMovables.movables)

        const equationContainer = new PIXI.Container();

        const columnLanding1 = new Grid(4,1, {}, {})
        const addSign = new CircledText("+", {fontSize: 30, fill: 0x333333, fontWeight: "700"}, {radius: 20, borderColor: 0x000000})
        const columnLanding2 = new Grid(4,1, {}, {})
        const equalsSign = new PIXI.Text("=", {fontSize: 30})
        equalsSign.anchor.set(.5,.5)
        const columnResult = new Grid(4,1, {}, {})

        equationContainer.addChild(columnLanding1, addSign, columnLanding2, equalsSign, columnResult)

        // label & text
        const roundKeyLabel = new PIXIText("Round key", {})
        const roundKeyText = new PIXIText("text", {})

        this.bindPageLocale("roundKeyLabel", roundKeyLabel)
        this.bindPageLocale("roundKeyText", roundKeyText)
      
        this.addPermanent({background,animatableBackground, stateGrid, roundKeyGrid, equationContainer, roundKeyLabel, roundKeyText})
        this.addChild(...stateMovables.movables, ...resultMovables.movables, ...roundKeyMovables.movables)
        this.addToGlobalComponents({columnLanding1, addSign, columnLanding2, equalsSign, columnResult, stateMovables, roundKeyMovables, resultMovables})     
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground,

            stateGrid, roundKeyGrid, 
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


        const {gridStyles, roundKeyGridPos, stateGridPos} = defines 

        stateGrid.redraw(gridStyles, {});
        stateGrid.position.set(stateGridPos.x, stateGridPos.y)
        stateGrid.pivot.set(stateGrid.width/2, stateGrid.height/2)

        roundKeyGrid.redraw(gridStyles, {});
        roundKeyGrid.position.set(roundKeyGridPos.x, roundKeyGridPos.y)
        roundKeyGrid.pivot.set(roundKeyGrid.width/2, roundKeyGrid.height/2)

        // equation redraw
        const {columnLanding1, addSign, columnLanding2, equalsSign, columnResult, equationContainer} = this.globalComponents;
        const {columnStyles, equationPos,} = defines;

        columnLanding1.redraw(columnStyles, {})
        columnLanding2.redraw(columnStyles, {})
        columnResult.redraw(columnStyles, {})
 
        addSign.redraw({borderColor: 0x333333, borderWidth: 2.81, radius: 16 }, {})

        addSign.position.set(columnLanding1.width + addSign.width, columnLanding1.height/2)
        columnLanding2.position.set(addSign.x + addSign.width, 0)
        equalsSign.position.set(columnLanding2.x + columnLanding2.width + equalsSign.width, columnLanding1.height/2)
        columnResult.position.set(equalsSign.x + equalsSign.width, 0)
           
        equationContainer.position.set(equationPos.x, equationPos.y)
        equationContainer.pivot.set(equationContainer.width/2, equationContainer.height/2)

        // movables
        const {stateMovables} = this.globalComponents;
        const {stateGridStyles, gridFontStyles} = defines;
        stateMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height} = stateGrid.cells[idx].getBounds()
            movable.redraw({width, height, ...stateGridStyles},gridFontStyles);
            movable.position.set(x, y)
        })

      const {resultMovables} = this.globalComponents;
        const {resultGridStyles} = defines
        resultMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height} = stateGrid.cells[idx].getBounds()
            movable.redraw({width, height, ...resultGridStyles},gridFontStyles);
            movable.position.set(x, y)
        })

        const {roundKeyMovables} = this.globalComponents;
        const {roundKeyGridStyles} = defines
        roundKeyMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height} = roundKeyGrid.cells[idx].getBounds()
            movable.redraw({width, height, ...roundKeyGridStyles},gridFontStyles);
            movable.position.set(x, y)
        })

        const {roundKeyLabel, roundKeyText} = this.globalComponents
        const {roundKeyLabelStyles, roundKeyTextStyles} = defines
        roundKeyLabel.redraw(roundKeyLabelStyles)
        roundKeyText.redraw(roundKeyTextStyles)

        roundKeyLabel.position.set(roundKeyGridPos.x - gridStyles.width / 2, roundKeyGridPos.y + gridStyles.height / 2 + 5)
        roundKeyText.position.set(roundKeyGridPos.x - gridStyles.width / 2, roundKeyGridPos.y + gridStyles.height / 2 + roundKeyLabelStyles.fontSize + 8)
       
    }
}


export default Page10;