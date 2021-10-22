import * as PIXI from "pixi.js"

import AnimationPage from "../../core/AnimationPage.js"

import CircledText from "../../components/CircledText";
import SpriteBackground from "../../components/SpriteBackground"
import Grid from "../../components/Grid"
import SBox from "../../components/SBox"
import PIXIText from "../../components/PIXIText"

import PageTimeline from "./PageTimline"
import DefaultResponsives from "./Responsives.default"
import ResponsiveMax850 from "./Responsive.max-850"
import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax550 from "./Responsive.max-550"
import ResponsiveMax425 from "./Responsive.max-425"
import ResponsiveMax375 from "./Responsive.max-375"

class Page14 extends AnimationPage{
    constructor(){
        super();
        this.timeline = new PageTimeline(this);
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-850", ResponsiveMax850)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-550", ResponsiveMax550)
        this.registerResponsive("max-425", ResponsiveMax425)
        this.registerResponsive("max-375", ResponsiveMax375)
    }


    setShouldHide(animationDimensions){
        this.shouldHide = animationDimensions.width <= 768;
        return this.shouldHide
    }


    create(defines){
        const background = this.createBackground();
        const title = new PIXIText("title", {fill: 0xffffff, fontSize: 30})
        this.bindPageLocale("title", title)

        const bar = new SpriteBackground();

        // utils 
        const equalsSymbol = new PIXIText("=")
        equalsSymbol.anchor.set(.5, .5)

        const addSymbol = new CircledText("+", {fontSize: 30, fill: 0x000000}, {radius: 20,borderColor: 0x000000});
        const addSymbol2 = new CircledText("+",  {fontSize: 30, fill: 0x000000}, {radius: 20,borderColor: 0x000000});

   
        // round key labels
        const gridSubtitleStyles = {fontSize: 16}

        const cipherKeyText = new PIXIText("cipherKeyLabel", gridSubtitleStyles)
        this.bindPageLocale("cipherKeyLabel", cipherKeyText)
        cipherKeyText.anchor.set(.5, 0)

        const roundOneKeyText = new PIXIText("roundKeyOneLabel", gridSubtitleStyles)
        this.bindPageLocale("roundKeyOneLabel", roundOneKeyText)
        roundOneKeyText.anchor.set(.5, 0)

        const roundTwoKeyText = new PIXIText("roundKeyTwoLabel", gridSubtitleStyles)
        this.bindPageLocale("roundKeyTwoLabel", roundTwoKeyText)
        roundTwoKeyText.anchor.set(.5, 0)

        const roundThreeKeyText = new PIXIText("roundKeyThreeLabel", gridSubtitleStyles)
        this.bindPageLocale("roundKeyThreeLabel", roundThreeKeyText)
        roundThreeKeyText.anchor.set(.5, 0)

        const roundTenKeyText = new PIXIText("Test", gridSubtitleStyles)
        this.bindPageLocale("roundKeyTenLabel", roundTenKeyText)
        roundTenKeyText.anchor.set(1.5, 0)


        // create other labels
        const labelStyles = {fill: 0xffffff}

        const rotWordText = new PIXI.Text("RotWordLabel", labelStyles)
        this.bindPageLocale("RotWordLabel", rotWordText)

        const subBytesText = new PIXI.Text("SubBytesLabel", labelStyles)
        this.bindPageLocale("SubBytesLabel", subBytesText)

        const sboxText = new PIXI.Text("SBoxLabel")
        this.bindPageLocale("SBoxLabel", sboxText)

        subBytesText.anchor.set(1, .5)
        const Rcon4Text = new PIXI.Text("RconFourLabel")
       

        const screenContainer = document.getElementById("rijndael-animation-screen")

     

        const createPixiText = (localeKey, id) => {
            const text = document.createElement("div")
            text.innerHTML = this.controller.locale.getCurrentLocaleObj()[this.id][localeKey]
            text.classList.add("pixi-text")
            text.dataset.lang= this.id + "." + localeKey
            text.id = id;
            return text;
        }

        const textInitial = createPixiText("textIntro", "page-14-text-intro")
        const container = document.createElement("div")
        const sText = createPixiText("text", "page-14-text-s")
        const aText = createPixiText("textA", "page-14-text-a")
        const bText = createPixiText("textB", "page-14-text-b")
        container.classList.add("pixi-text", "pixi-text-container")
        container.appendChild(sText)
        container.appendChild(aText)
        container.appendChild(bText)
        const textXor = createPixiText("textXOR", "page-14-text-xor")
        textXor.classList.add("pixi-text-container")
        textInitial.classList.add("pixi-text-container")
        screenContainer.appendChild(container)
        screenContainer.appendChild(textInitial)
        screenContainer.appendChild(textXor)

        


        // create sbox
        const sbox = new SBox();
        sbox.zIndex = 20;
        this.subscribeTo("sbox", sbox.grid.cells)
        sbox.redraw({width: 360, height: 240, legendWidth: 20}, {scale: .3}, {scale: .3})
        sbox.pivot.set(360, 240 / 2)
    
        // create grid landings (top row)
        const primaryGridOne = new Grid(4,4, {},{});
        const primaryGridTwo = new Grid(4,4, {},{});
        const primaryGridThree = new Grid(4,4, {},{});
        const primaryGridFour = new Grid(4,4, {},{});
        const primaryGrids = [primaryGridOne, primaryGridTwo, primaryGridThree, primaryGridFour]

        // create movables 2 for each
        const pgOneMovablesOg = primaryGridOne.createMovables();
        const pgOneMovablesTranform = primaryGridOne.createMovables();
        this.subscribeTo("key-0", pgOneMovablesOg.movables)
        this.subscribeTo("key-0", pgOneMovablesTranform.movables)

        const pgTwoMovablesOg = primaryGridTwo.createMovables();
        const pgTwoMovablesTranform = primaryGridTwo.createMovables();
        this.subscribeTo("key-1", pgTwoMovablesOg.movables)
        this.subscribeTo("key-1", pgTwoMovablesTranform.movables)

      

        const pgThreeMovablesOg = primaryGridThree.createMovables();
        const pgThreeMovablesTranform = primaryGridThree.createMovables();
        this.subscribeTo("key-2", pgThreeMovablesOg.movables)
        this.subscribeTo("key-2", pgThreeMovablesTranform.movables)

          // replace first column of first 

        const pgFourMovablesOg = primaryGridFour.createMovables();
        this.subscribeTo("key-3", pgFourMovablesOg.movables)
        

        const subBytesMovables = primaryGridOne.createMovables();
        this.subscribeTo("key-schedule-sub-bytes-grid", subBytesMovables.movables)
        
        const finalGrid = new Grid(4,4, {},{})
        const finalGridMovables = finalGrid.createMovables();
        this.subscribeTo("key-10", finalGridMovables.movables)

        // create grid landings (bottom)
        const secondaryGridOne = new Grid(4,4, {},{});
        const secondaryGridTwo = new Grid(4,4, {},{});
        const secondaryGridThree = new Grid(4,4, {},{});
        const secondaryGridFour = new Grid(4,4, {},{});
        const secondaryGrids = [secondaryGridOne, secondaryGridTwo, secondaryGridThree, secondaryGridFour]

        // hide lower landings
        secondaryGrids.forEach(grid => {
            grid.renderable = false;
        });

     
        // rcon 
        const rcon = new Grid(4, 10, {},{})
        const rconText = new PIXIText("Rcon")
        const rconMovables = rcon.createMovables()
        rcon.alpha = 0;
        this.subscribeTo("rcon", rconMovables.movables)
      
        // add components to page container
        this.addPermanent({
            background, bar, title, 
            primaryGridOne, primaryGridTwo, primaryGridThree, primaryGridFour, 
            secondaryGridOne, secondaryGridTwo, secondaryGridThree, secondaryGridFour,
            rcon, rconText, finalGrid,
            equalsSymbol,
            addSymbol,
            addSymbol2,
            roundOneKeyText, roundTwoKeyText, cipherKeyText, roundThreeKeyText, roundTenKeyText,
            rotWordText, sboxText,subBytesText,
            //textXor,
            //textInitial, sText, aText, bText
            
        })

        // add movables to page container
        this.addChild(
            ...pgOneMovablesOg.movables, 
            ...pgOneMovablesTranform.movables,
            ...pgTwoMovablesOg.movables, 
            ...pgTwoMovablesTranform.movables,
            ...pgThreeMovablesOg.movables, 
            ...pgThreeMovablesTranform.movables,
            ...rconMovables.movables,         
            ...finalGridMovables.movables,
            ...pgFourMovablesOg.movables,
            sbox,
            ...subBytesMovables.movables,
        )

 
        this.addToGlobalComponents({
            sbox,
            pgFourMovablesOg,
            finalGridMovables,
            subBytesMovables, rconMovables, primaryGrids, secondaryGrids, 
            pgOneMovablesTranform, pgOneMovablesOg, pgTwoMovablesOg, 
            pgTwoMovablesTranform, pgThreeMovablesOg, pgThreeMovablesTranform,
            textXor, sText, aText, bText, textInitial
        })
    }

    drawPage(defines){
        
        const shouldHide = this.setShouldHide(defines.animationDimensions);
   

        // get permanent componenents
        const {
            background, 
            primaryGrids,
            secondaryGrids,
            rcon,
            rconText,
            title,
            bar,
            finalGrid,
            pgOneMovablesOg,
            pgOneMovablesTranform,
            pgTwoMovablesOg,
            pgTwoMovablesTranform,
            pgThreeMovablesOg,
            pgThreeMovablesTranform,
            addSymbol,
            sbox,
            rconMovables,
            addSymbol2,
            equalsSymbol,
            subBytesMovables,
            subBytesText
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
            
        } = defines

        // redraw symbols
        background.redraw(backgroundStyles)

        const {equalSymbolStyles, addSymbolStyles, addSymbolFontStyles} = defines;
        equalsSymbol.redraw(equalSymbolStyles)
        addSymbol.redraw(addSymbolStyles, addSymbolFontStyles)
        addSymbol2.redraw(addSymbolStyles, addSymbolFontStyles)

        /// redraw title and bar
        const {barStyles, titleStyles} = defines;
        title.scale.set(titleStyles.scale)
        title.position.set(titleStyles.x, titleStyles.y)
        title.anchor.set(1, 0)
        bar.redraw(barStyles)
        bar.position.set(0, title.y * 2 + title.height)
    

        // redraw sbox
        const {sboxStyles, sboxLegendStyles,sBoxTextStyles } = defines
      
        sbox.redraw(sboxStyles,sboxLegendStyles, sBoxTextStyles)

        sbox.position.set(sboxStyles.x, sboxStyles.y)
        subBytesText.position.set(sbox.x - 360, sbox.y)

        
        // redraw primary grids
        const {baseGridStyles, baseGridFontStyle, primaryGridPos} = defines
        const primaryGridsY = bar.y + bar.height + primaryGridPos.y;
        primaryGrids.forEach((grid, idx) => {
            grid.redraw({...baseGridStyles}, {})

            const prevGrid = idx != 0 ? primaryGrids[idx -1] : null;
            const primaryGridsX = prevGrid ? prevGrid.x + baseGridStyles.width : primaryGridPos.x;
            grid.position.set(primaryGridsX, primaryGridsY)
            
            if(idx == 3) {
                grid.alpha = shouldHide ? 0 : 1;
            }
        })


        // redraw secondary grids
        const {secondaryGridPos} = defines
        const secondaryGridsY = primaryGridsY+ secondaryGridPos.y;
        secondaryGrids.forEach((grid, idx) => {
            grid.redraw({...baseGridStyles})

            const prevGrid = idx != 0 ? secondaryGrids[idx -1] : null;
            const primaryGridsX = prevGrid ? prevGrid.x + baseGridStyles.width : secondaryGridPos.x;

            grid.position.set(primaryGridsX, secondaryGridsY)
            

            if(idx == 3) {
                grid.alpha = shouldHide ? 0 : 1;
            }
            
        })


        // redraw final grid
        const {finalGridPos} = defines
        finalGrid.redraw({...baseGridStyles})
        finalGrid.position.set(finalGridPos.x, primaryGridsY)
        finalGrid.pivot.set(baseGridStyles.width, 0)

      
        // redraw rcon
        const {rconStyles, rconTextStyles} = defines;
        rcon.redraw({...rconStyles})
        rcon.position.set(rconStyles.x, rconStyles.y)
        rcon.pivot.set(rconStyles.width/2, rconStyles.height)
       
        rconText.redraw({
            ...rconTextStyles,
            position: {
                x:rcon.x + rconStyles.width / 2 + rconTextStyles.distanceX,
                y:rcon.y - rconStyles.height / 2 ,
            }
        })
     

        // redraw movables

        // grid movables
        const {pgFourMovablesOg,finalGridMovables} = this.globalComponents
        const {firstGridStyle} = defines
        const {gridMovableStyles, gridTextStyle, subbytesMovablesStyles, rconMovablesTextStyles, rconMovablesStyles} = defines

        this.redrawMovables(rconMovables, rcon, rconMovablesStyles,rconMovablesTextStyles)
       
        this.redrawMovables(pgOneMovablesOg, primaryGrids[0], {...firstGridStyle}, baseGridFontStyle)
        this.redrawMovables(pgOneMovablesTranform, primaryGrids[0], {...firstGridStyle},baseGridFontStyle)
        this.redrawMovables(pgTwoMovablesOg, primaryGrids[1], gridMovableStyles,baseGridFontStyle)
        this.redrawMovables(pgTwoMovablesTranform, primaryGrids[1], gridMovableStyles,baseGridFontStyle)
        this.redrawMovables(pgThreeMovablesOg, primaryGrids[2], gridMovableStyles,baseGridFontStyle)
        this.redrawMovables(pgThreeMovablesTranform, primaryGrids[2], gridMovableStyles,baseGridFontStyle)
        this.redrawMovables(pgFourMovablesOg, primaryGrids[3], gridMovableStyles,baseGridFontStyle)
        this.redrawMovables(subBytesMovables, primaryGrids[0], subbytesMovablesStyles,baseGridFontStyle)
        this.redrawMovables(finalGridMovables, finalGrid, gridMovableStyles,baseGridFontStyle)
       
        // hide last grid on small screens
        if(!shouldHide){         
            pgFourMovablesOg.movables.forEach(movable => movable.alpha = 1)
        }else{
            pgFourMovablesOg.movables.forEach(movable => movable.alpha = 0)
          
        }

        this.colorFirstCol(0x868486, pgTwoMovablesOg)
        this.colorFirstCol(0x868486, pgTwoMovablesTranform)
        this.colorFirstCol(0x868486, pgThreeMovablesOg)
        this.colorFirstCol(0x868486, pgThreeMovablesTranform)
        this.colorFirstCol(0x868486, pgFourMovablesOg)
        this.colorFirstCol(0x868486, finalGridMovables)

        // redraw lables
        const {cipherKeyText, roundOneKeyText, roundTwoKeyText, roundThreeKeyText, roundTenKeyText} = this.globalComponents; 
        const {roundKeyLabelStyles} = defines

        this.redrawRoundKeyLabel(cipherKeyText, roundKeyLabelStyles, primaryGrids[0], baseGridStyles)
        this.redrawRoundKeyLabel(roundOneKeyText, roundKeyLabelStyles, primaryGrids[1], baseGridStyles)
        this.redrawRoundKeyLabel(roundTwoKeyText, roundKeyLabelStyles, primaryGrids[2], baseGridStyles)
        this.redrawRoundKeyLabel(roundThreeKeyText, roundKeyLabelStyles, primaryGrids[3], baseGridStyles)

        roundTenKeyText.redraw({
            ...roundKeyLabelStyles,
            position: {
                x: finalGrid.x - finalGrid.width / 2 ,
                y: finalGrid.y + baseGridStyles.height + 10,
            },
            anchor: {x: .5, y:0}
        })
          

        // position info texts
       /* const {textXor, aText, bText, sText, textInitial} = this.globalComponents
        const {xorTextPos, sTextStylesPos, initialTextPos} = defines;
        textXor.position.set(xorTextPos.x, xorTextPos.y)


        textInitial.position.set(initialTextPos.x,initialTextPos.y)
        sText.position.set(sTextStylesPos.x, sTextStylesPos.y)
        aText.position.set(sText.x, sText.y + sText.height)
        bText.position.set(sText.x, aText.y + aText.height)*/
    }

    redrawRoundKeyLabel(label, labelStyles, referenceGrid, baseGridStyles){   
        label.redraw({
            ...labelStyles,
            position: {
                x: referenceGrid.x + baseGridStyles.width / 2,
                y: referenceGrid.y + baseGridStyles.height + 10,
            }
        })
    }
       

    colorFirstCol(color, grid){
        grid.getCol(0).map(cell => cell.getBackground().tint = color);
    }

    redrawMovables(movablesController, grid, movablesStyles={}, movablesTextStyles={}){
        movablesController.movables.forEach((movable, idx) => {
           const {x,y,width, height}= grid.cells[idx].getBounds()          
           movable.redraw({width, height, ...movablesStyles},{scale: 1, ...movablesTextStyles});
           movable.position.set(x, y)        
       })
    }
}


export default Page14;