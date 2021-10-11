import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import AnimatableBackground from "../../components/AnimatableBackground"
import Grid from "../../components/Grid"

import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768";
import ResponsiveMax425 from "./Responsive.max-425";
import ResponsiveMax375 from "./Responsive.max-375";
import PIXIText from "../../components/PIXIText.js"

class Page9 extends AnimationPage{
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
        
        const animatableBackground = new AnimatableBackground("title", {})
        this.bindPageLocale("title", animatableBackground.title)


          // grid + movables
          const grid = new Grid(4, 4, {}, {})
          grid.renderable = false;
          const gridMovables = grid.createMovables()
          const gridMovablesResults = grid.createMovables()


          this.subscribeTo("after-shift-rows-1", gridMovables.movables)
          this.subscribeTo("after-mix-columns-1", gridMovablesResults.movables)
  
          // equation 
          const equationContainer = new PIXI.Container()
  
  
          const galoisField = new Grid(4,4, {}, {})
          this.subscribeTo("galois-field", galoisField.cells)
  
          const landingCol = new Grid(4, 1, {}, {})
          const resultCol = new Grid(4, 1, {}, {})
  
          const multiplicationSign = new PIXI.Graphics();
          multiplicationSign.beginFill(0x000000)
          multiplicationSign.drawCircle(0,0, 6),
          multiplicationSign.endFill();
  
          const equalsSign = new PIXI.Text("=", {fontSize: 30})
          equalsSign.anchor.set(.5, .5)
  
  
          equationContainer.addChild(galoisField, multiplicationSign, landingCol, equalsSign, resultCol )


          const text1 = new PIXIText("text")
          const text2 = new PIXIText("text2")

          this.bindPageLocale("text", text1)
          this.bindPageLocale("text2", text2)
  
  
          this.addPermanent({background,animatableBackground,grid, equationContainer, text1, text2})
          this.addChild(...gridMovables.movables, ...gridMovablesResults.movables)
          this.addToGlobalComponents({
              gridMovables,
              gridMovablesResults,
              resultCol,
              landingCol,
              multiplicationSign,
              equalsSign,
              galoisField
          })
      
        
          this.sortableChildren = true;
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground, grid, gridMovables, gridMovablesResults,
            equationContainer, galoisField, landingCol, multiplicationSign, equalsSign, resultCol
        } = this.globalComponents

        // background redraw
        const { backgroundStyles, gridTextStyles} = defines
        background.redraw(backgroundStyles)


        // animatable background
        const {
            animatableBackgroundStyles: abStyles,
            animatableBackgroundTitleStyles: abTitleStyles,
            animatableBackgroundBarStyles: abBarStyles,
        } = defines

        animatableBackground.redraw(abStyles,abBarStyles,abTitleStyles)


        // grid landings
        const {gridStyles, gridLandingPos, gridFontStyles} = defines;

        grid.redraw(gridStyles, {})
        grid.position.set(gridLandingPos.x, gridLandingPos.y)
        //grid.pivot.set(grid.width/2, grid.height/2)



        // equation 

        const {equationPos, galoisFieldStyles, galoisFieldFontStyles} = defines;
        galoisField.redraw(galoisFieldStyles, galoisFieldFontStyles)
        landingCol.redraw({...galoisFieldStyles, width: galoisFieldStyles.width / 4}, {})
        resultCol.redraw({...galoisFieldStyles, width: galoisFieldStyles.width / 4}, {})

        equationContainer.position.set(equationPos.x, equationPos.y)
     
        multiplicationSign.position.set(galoisField.width + multiplicationSign.width, equationContainer.height / 2)
        landingCol.position.set(multiplicationSign.x + multiplicationSign.width, 0)
        equalsSign.position.set(landingCol.x + landingCol.width + equalsSign.width, equationContainer.height / 2)
        resultCol.position.set(equalsSign.x + equalsSign.width, 0)


        // initial movables
        const {stateGridStyle} = defines;
        gridMovables.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...stateGridStyle},gridFontStyles);
            movable.position.set(x, y)
        })

        const {resultGridStyle} = defines;
        gridMovablesResults.movables.forEach((movable, idx) => {
            const {x,y,width, height}= grid.cells[idx].getBounds()
            movable.redraw({width, height, ...resultGridStyle},gridFontStyles);
            movable.position.set(x, y)
        })


        const {textStyles} = defines;
        const {text1, text2} = this.globalComponents
        text1.redraw(textStyles);
        text2.redraw(textStyles)

      
    }
}


export default Page9;