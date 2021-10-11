import * as PIXI from "pixi.js"

import AnimationPage from "../../core/AnimationPage.js"
import PageTimeline from "./PageTimline"

import PIXIText from "../../components/PIXIText"
import GridRow from "../../components/GridRow"
import Grid from "../../components/Grid"

import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax425 from "./Responsive.max-425"

class Page12 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)  
    }



    createTitle(text, baseStyles){
        const title = new PIXI.Text(text, baseStyles)
        title.anchor.set(.5, .5)
        return title;
    }

    create(defines){
        const background = this.createBackground();

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
        const row6 = new GridRow("roundSixLabel")
        this.bindPageLocale("roundSixLabel", row6.title)

        const row7 = new GridRow("roundSevenLabel")
        this.bindPageLocale("roundSevenLabel", row7.title)

        const row8 = new GridRow("roundEightLabel")
        this.bindPageLocale("roundEightLabel", row8.title)

        const row9 = new GridRow("roundNineLabel")
        this.bindPageLocale("roundNineLabel", row9.title)

        const row10 = new GridRow("roundTenLabel")
        this.bindPageLocale("roundTenLabel", row10.title)
       
        const rows = [row6, row7, row8, row9, row10]

        // bind data to state display rows
        for(let i = 6; i <= 9; i++){
            const row = rows[i-6];
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

        
        this.subscribeTo(`round-10-initial`, row10.grids[0].cells); 
        this.subscribeTo(`after-sub-bytes-10`, row10.grids[1].cells); 
        this.subscribeTo(`after-shift-rows-10`, row10.grids[2].cells); 
        this.subscribeTo(`key-10`, row10.grids[4].cells);

        const outputGrid = new Grid(4,4)
        this.subscribeTo("after-add-round-key-10", outputGrid.cells)
        const cipherText = new PIXIText("ciphertext");
        this.bindPageLocale("cipherTextLabel", cipherText)
        const outputText = new PIXIText("output"); 
        this.bindPageLocale("outputLabel", outputText)

        // add components to page container
        this.addPermanent({background,row6, row7, row8, row9, row10, title1, title2, title3, title4, title5, outputGrid, cipherText, outputText})
        this.addToGlobalComponents({rows, titles})   
    }


    drawPage(defines){
        // get permanent componenents
        const {
            background, 
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
        } = defines

        background.redraw(backgroundStyles)

        const {rows, row6} = this.globalComponents;
        const {rowStyles, rowTitleStyles, defaultGridStyles,lastColGridStyles, gridFontStyles} = defines
        for(let i = 0; i < rows.length; i++){
            const row = rows[i];
            row.redraw(rowStyles, rowTitleStyles, {
                default: defaultGridStyles,
                4: lastColGridStyles
            },gridFontStyles);
            const y = i !== 0 ? rows[i-1].y + rowStyles.height : rowStyles.y;
            row.position.set(0, y + rowStyles.margin) 
        }


        // redraw titles
        const {titleStyles} = defines
        const {titles} = this.globalComponents
        titles.forEach((title, idx) => {
            title.redraw(titleStyles)
            title.position.set(row6.grids[idx].x + rows[0].gridWidth / 2, titleStyles.y)
        },gridFontStyles)


        const {outputGrid, cipherText, outputText} = this.globalComponents;

        const gridWidth = row6.gridWidth;
        const gridHeight = rowStyles.height;

        outputGrid.redraw({
            width: gridWidth,
            height: gridHeight,
            ...defaultGridStyles,
        },gridFontStyles)

        outputGrid.position.set(rowStyles.titleSpace,rows[rows.length-1].y + rowStyles.height)

        cipherText.redraw({...titleStyles});
        outputText.redraw({...titleStyles, rotation: -1.5708}); // 90deg
        cipherText.position.set(rowStyles.titleSpace + gridWidth/ 2, outputGrid.y + gridHeight + 10)

        if(defines.animationDimensions.width <= 768) {
            outputText.position.set(rowStyles.titleSpace + gridWidth + 10, outputGrid.y + gridHeight /2)
        }else{
            outputText.position.set(rowStyles.titleSpace - 20, outputGrid.y + gridHeight /2)
        }
        
    }
}


export default Page12;