import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import SlowTextBox from "../../components/SlowTextBox"

import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"
import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax425 from "./Responsive.max-425"
import PIXIText from "../../components/PIXIText.js"

class Page4 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425) 
    }


    create(defines){
        const background = this.createBackground();
        // title
        const title = new PIXIText("title", { fontSize: 24, align: "center", fontWeight: "700", wordWrap: true, wordWrapWidth: 300})
        this.bindPageLocale("title", title)
        title.anchor.set(.5, .5)

        const container = new PIXI.Container();
        const labelSubBytes = new SlowTextBox("labelone")
        const labelShiftRows = new SlowTextBox("labelTwo")
        const labelMixColumns = new SlowTextBox("labelThree")
        const labelAddRoundKey = new SlowTextBox("labelFour")

        this.bindPageLocale("labelone", labelSubBytes.text)
        this.bindPageLocale("labelTwo", labelShiftRows.text)
        this.bindPageLocale("labelThree", labelMixColumns.text)
        this.bindPageLocale("labelFour", labelAddRoundKey.text)

        container.addChild(labelSubBytes, labelShiftRows, labelMixColumns, labelAddRoundKey)
    
        this.addPermanent({background,title, container})
        this.addToGlobalComponents({labelSubBytes, labelShiftRows, labelMixColumns, labelAddRoundKey})
       
    }

    drawPage(defines){
        // get permanent componenents
        const {
            background, title,
        } = this.globalComponents

        // destructure defines
        const {
            backgroundStyles,
            titleStyles,
            textStyles,
        } = defines

        background.redraw(backgroundStyles)

      

        title.redraw({...titleStyles})
        const {labelStyles, labelFontStyles, containerPos, subBytesLabelStyles, shiftRowsLabelStyles, mixColumnsLabelStyles, addRoundKeyLabelStyles} = defines
        const {labelShiftRows, labelMixColumns, labelAddRoundKey, labelSubBytes, container} = this.globalComponents;

        // redraw labels
        labelSubBytes.redraw({...labelStyles, ...subBytesLabelStyles},labelFontStyles)
        labelShiftRows.redraw({...labelStyles, ...shiftRowsLabelStyles},labelFontStyles)
        labelMixColumns.redraw({...labelStyles, ...mixColumnsLabelStyles},labelFontStyles)
        labelAddRoundKey.redraw({...labelStyles, ...addRoundKeyLabelStyles},labelFontStyles)

        // posiiton labels
        const labelMargin = 20;
        labelShiftRows.position.set(0, labelSubBytes.y + labelStyles.height + labelMargin)
        labelMixColumns.position.set(0, labelShiftRows.y + labelStyles.height + labelMargin)
        labelAddRoundKey.position.set(0, labelMixColumns.y + labelStyles.height + labelMargin)

        labelShiftRows.text.tint = 0x000000;
 
        container.pivot.set(container.width / 2, 0)
        container.position.set(containerPos.x, title.position.y + title.height + 20) 
    }
}


export default Page4;