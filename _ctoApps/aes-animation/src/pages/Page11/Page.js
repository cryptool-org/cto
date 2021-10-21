import * as PIXI from "pixi.js"

import AnimationPage from "../../core/AnimationPage.js"
import PageTimeline from "./PageTimline"

import GridRow from "../../components/GridRow"
import PIXIText from "../../components/PIXIText"

import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax425 from "./Responsive.max-425"
//import ResponsiveMax400 from "./Responsive.max-1000"



class Page11 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)

        this.FADE_OUT_DELAY = 6;
    }



    createTitle(text, baseStyles){
        const title = new PIXI.Text(text, baseStyles)
        title.anchor.set(.5, .5)
        return title;
    }

    create(defines){
        // background
        const background = this.createBackground();

        // introtext
        const introText = new PIXIText("text", {})
        this.bindPageLocale("introText", introText)

        // titles
        const title1 = new PIXIText("roundLabel")
        this.bindPageLocale("roundLabel", title1)

        const title2 = new PIXIText("subBytesLabel")
        this.bindPageLocale("subBytesLabel", title2)

        const title3 = new PIXIText("ShiftRowsLabel")
        this.bindPageLocale("ShiftRowsLabel", title3)

        const title4 = new PIXIText("MixColumnsLabel")
        this.bindPageLocale("MixColumnsLabel", title4)

        const title5 = new PIXIText("RoundKeyLabel")
        this.bindPageLocale("RoundKeyLabel", title5)

        const titles = [title1, title2, title3, title4, title5]
        
        // state display rows
        const inputRow = new GridRow("inputLabel")
        this.bindPageLocale("inputLabel", inputRow.title)

        const row1 = new GridRow("roundOneLabel")
        this.bindPageLocale("roundOneLabel", row1.title)

        const row2 = new GridRow("roundTwoLabel")
        this.bindPageLocale("roundTwoLabel", row2.title)

        const row3 = new GridRow("roundThreeLabel")
        this.bindPageLocale("roundThreeLabel", row3.title)

        const row4 = new GridRow("roundFourLabel")
        this.bindPageLocale("roundFourLabel", row4.title)

        const row5 = new GridRow("roundFiveLabel")
        this.bindPageLocale("roundFiveLabel", row5.title)
        const rows = [inputRow, row1, row2, row3, row4, row5]


        this.subscribeTo("initial-state",inputRow.grids[0].cells)
        this.subscribeTo("key-0",inputRow.grids[4].cells)

        // bind data to grid rows
        for(let i = 1; i < rows.length; i++){
            const row = rows[i];
            row.grids.forEach((grid, c) => {
                switch(c){
                    case 0: this.subscribeTo(`round-${i}-initial`, grid.cells); break;
                    case 1: this.subscribeTo(`after-sub-bytes-${i}`, grid.cells); break;
                    case 2: this.subscribeTo(`after-shift-rows-${i}`, grid.cells); break;
                    case 3: this.subscribeTo(`after-mix-columns-${i}`, grid.cells); break;
                    case 4: this.subscribeTo(`key-${i}`, grid.cells); break;
                }
            })
        }

        // add to page container
        this.addPermanent({background, introText, row1, row2, row3, row4, row5, title1, title2, title3, title4, title5, inputRow})
        this.addToGlobalComponents({rows, titles})     
    }


    drawPage(defines){
        // get permanent componenents
        const {
            background, row1, 
            rows,inputRow,introText
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,introTextStyles
        } = defines

        background.redraw(backgroundStyles)
 
        introText.redraw(introTextStyles)

  
        // redraw rows
        const {rowStyles, rowTitleStyles, defaultGridStyles, emptyGridStyles, highlightGridStyles, lastColGridStyles, gridFontStyles} = defines
         
        inputRow.redraw(rowStyles, rowTitleStyles, {
            default: emptyGridStyles,
            0: defaultGridStyles,
            4: highlightGridStyles
        }, gridFontStyles)
        
        inputRow.position.set(0, rowStyles.y + rowStyles.margin) 
      
        for(let i = 1; i < rows.length; i++){
            const row = rows[i];
  
            row.redraw(rowStyles, rowTitleStyles, {
                default: defaultGridStyles,
                4: lastColGridStyles
            }, gridFontStyles);
            const y = i !== 0 ? rows[i-1].y + rowStyles.height : rowStyles.y;
            row.position.set(0, y + rowStyles.margin) 
        }

       
        // redraw titles
        const {titleStyles} = defines
        const {titles} = this.globalComponents
        titles.forEach((title, idx) => {
            title.redraw(titleStyles)
            title.position.set(row1.grids[idx].x + rows[0].gridWidth / 2, titleStyles.y)
        })

    }
}


export default Page11;