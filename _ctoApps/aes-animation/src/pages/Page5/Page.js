import AnimationPage from "../../core/AnimationPage.js"

import AnimatableBackground from "../../components/AnimatableBackground"
import SlowTextBox from "../../components/SlowTextBox"
import TextBox from "../../components/TextBox"
import PIXIText from "../../components/PIXIText"
import Grid from "../../components/Grid"
import SVGPath from "../../components/Page5Path"

import PageTimeline from "./PageTimeline.js"
import DefaultResponsives from "./Responsives.default"
//import ResponsiveMax400 from "./Responsive.max-1000"
import ResponsiveMax768 from "./Responsive.max-768"
import ResponsiveMax425 from "./Responsive.max-425"
import ResponsiveMax375 from "./Responsive.max-375"

class Page5 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this)
        this.registerResponsive("default", DefaultResponsives)
        this.registerResponsive("max-768", ResponsiveMax768)
        this.registerResponsive("max-425", ResponsiveMax425)
        this.registerResponsive("max-375", ResponsiveMax375)     
    }


    createLabel(localeKey){
        const label = new SlowTextBox(localeKey)
        this.bindPageLocale(localeKey, label)
        return label
    }

    create(defines){
        const background = this.createBackground();

        const svg = new SVGPath();
        
        const {abBaseTextStyles} = defines
        const animatableBackground = new AnimatableBackground("title", abBaseTextStyles)
        this.bindPageLocale("title", animatableBackground.title)
        // create big labels

        const labelInitialRound = new PIXIText("titleInitialRound");
        this.bindPageLocale("titleInitialRound", labelInitialRound)
        const labelMainRounds = new PIXIText("titleMainRounds");
        this.bindPageLocale("titleMainRounds", labelMainRounds)
        const labelFinalRound = new PIXIText("titleFinalRound");
        this.bindPageLocale("titleFinalRound", labelFinalRound)
      

        const runner = new Grid(4,4)

        // create labels
        const {roundedLabelStyles} = defines
        const initialAddRoundKey = this.createLabel("labelInitial")
     
        const mrSubBytes = this.createLabel("labelMrone")
        const mrShiftRows = this.createLabel("labelMrTwo")
        const mrMixColumns = this.createLabel("labelMrThree")
        const mrAddRoundKey = this.createLabel("labelMrFour")
      
        const frSubBytes = this.createLabel("labelFrOne")
        const frShiftRows = this.createLabel("labelFrTwo")
        const frAddRoundKey = this.createLabel("labelFrThree")

        // counter textbox
        const counterText = new PIXIText("Round",{})
        this.bindPageLocale("round", counterText)
        const counter = new TextBox("0", {}, {})
     
      
        this.addPermanent({
            background,animatableBackground, 
            labelInitialRound, labelMainRounds, labelFinalRound,
            runner,
            initialAddRoundKey,
            mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,
            frSubBytes, frShiftRows, frAddRoundKey,
            counter,counterText,
            svg,
        })
       
       this.sortableChildren = true;   
    }



    drawPage(defines){
        // get permanent componenents
        const {
            background, animatableBackground,

            initialAddRoundKey,
            mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,
            frSubBytes, frShiftRows, frAddRoundKey,
            runner, container, svg,
            counter,counterText
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


        const barEnd = (animatableBackground.bar.y + animatableBackground.bar.height)
        const height = background.height - barEnd - 20;

       

        const {svgStyles} = defines
        svg.redraw({height, width: svgStyles.width});
        svg.position.set(svgStyles.x,barEnd + 10)

        const {labelInitialRound, labelMainRounds, labelFinalRound} = this.globalComponents
        const {mainRoundTitleStyles, initialRoundTitleStyles, finalRoundTitleStyles, sectionTitleStyles} = defines


        labelInitialRound.redraw({...sectionTitleStyles,...initialRoundTitleStyles, position: {
            x: initialRoundTitleStyles.position.x,
            y: svg.y + svg.info.segments.one.length / 2,
        }})
    
        labelMainRounds.redraw({...sectionTitleStyles,...mainRoundTitleStyles, position: {
            x: mainRoundTitleStyles.position.x,
            y:  svg.y + svg.info.segments.one.length + svg.info.segments.two.length / 2,
        }})
        labelFinalRound.redraw({...sectionTitleStyles,...finalRoundTitleStyles, position: {
            x: finalRoundTitleStyles.position.x,
            y: svg.y + svg.info.segments.one.length + svg.info.segments.two.length + svg.info.segments.five.length / 2,
        }})

        // draw svg labels
      
        const {runnerStyles} = defines
        runner.redraw(runnerStyles)
      
        //runner.anchor.set(.5)
        runner.pivot.set(runnerStyles.width/2, runnerStyles.height /2)
        runner.position.set(svg.x, svg.y)

      const {roundedLabelStyles, roundLabelTextStyles, addRoundKeyStyles, mixColumnsStyles, shiftRowsStyles, subBytesStyles} = defines;
        initialAddRoundKey.redraw({...roundedLabelStyles, ...addRoundKeyStyles}, roundLabelTextStyles)
        mrSubBytes.redraw({...roundedLabelStyles, ...subBytesStyles}, roundLabelTextStyles)
        mrShiftRows.redraw({...roundedLabelStyles,...shiftRowsStyles}, roundLabelTextStyles)
        mrMixColumns.redraw({...roundedLabelStyles,...mixColumnsStyles}, roundLabelTextStyles)
        mrAddRoundKey.redraw({...roundedLabelStyles,...addRoundKeyStyles}, roundLabelTextStyles)
        frSubBytes.redraw({...roundedLabelStyles,...subBytesStyles}, roundLabelTextStyles)
        frShiftRows.redraw({...roundedLabelStyles,...shiftRowsStyles}, roundLabelTextStyles)
        frAddRoundKey.redraw({...roundedLabelStyles,...addRoundKeyStyles}, roundLabelTextStyles)

        // positions 
        initialAddRoundKey.position.set(svg.position.x, svg.position.y + svg.height * .1)
        initialAddRoundKey.pivot.set(initialAddRoundKey.width /2, initialAddRoundKey.height /2)

        // center 
        const mrStart = .4
        const mrDist = .07
        mrSubBytes.position.set(svg.position.x, svg.position.y + svg.height * (mrStart - 1.5 * mrDist ))
        mrSubBytes.pivot.set(mrSubBytes.width /2, mrSubBytes.height /2)

        mrShiftRows.position.set(svg.position.x, svg.position.y + svg.height * (mrStart - .5* mrDist ))
        mrShiftRows.pivot.set(mrShiftRows.width /2, mrShiftRows.height /2)

        mrMixColumns.position.set(svg.position.x, svg.position.y + svg.height * (mrStart + .5 * mrDist ))
        mrMixColumns.pivot.set(mrMixColumns.width /2, mrMixColumns.height /2)

        mrAddRoundKey.position.set(svg.position.x, svg.position.y + svg.height * (mrStart + 1.5 * mrDist ))
        mrAddRoundKey.pivot.set(mrAddRoundKey.width /2, mrAddRoundKey.height /2)

        // 0.5 + 0
        const frStart = .8
        const frDist = .07
        frSubBytes.position.set(svg.position.x, svg.position.y + svg.height * (frStart - frDist ))
        frSubBytes.pivot.set(frSubBytes.width /2, frSubBytes.height /2)

        frShiftRows.position.set(svg.position.x, svg.position.y + svg.height * (frStart ))
        frShiftRows.pivot.set(frShiftRows.width /2, frShiftRows.height /2)

        frAddRoundKey.position.set(svg.position.x, svg.position.y + svg.height * (frStart +  frDist ))
        frAddRoundKey.pivot.set(frAddRoundKey.width /2, frAddRoundKey.height /2)

        // redraw counter
        const {counterStyles, counterTextStyles, counterDisplayStyles} = defines
        counter.redraw(counterStyles, counterDisplayStyles)
        counter.position.set(counterStyles.position.x, counterStyles.position.y)
        counter.pivot.set(counterStyles.width/2, counterStyles.height/2)

        counterText.redraw(counterTextStyles)
        counterText.position.set(counterStyles.position.x, counterStyles.position.y - 40)
        counterText.anchor.set(.5)
    }
}


export default Page5;