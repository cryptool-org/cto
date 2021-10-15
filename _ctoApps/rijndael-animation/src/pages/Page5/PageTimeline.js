import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page5Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    createPreFadeIn(){
        const {
            runner, svg,initialAddRoundKey, mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,  frSubBytes, frShiftRows, frAddRoundKey,
            labelInitialRound, labelFinalRound, labelMainRounds, counter, counterText
        }  = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();
        tl.set([initialAddRoundKey, mrSubBytes, runner, mrShiftRows, mrMixColumns, mrAddRoundKey,  frSubBytes, frShiftRows, frAddRoundKey], {pixi: {zIndex: 20, alpha: 0}})
        tl.set([svg,labelInitialRound, labelFinalRound, labelMainRounds, counter, counterText], {pixi: {alpha: 0}})
        tl.call(() => {
            counter.updateContent("0")
        })
        return tl;
    }



  
    createAnimationIn(){
        const {
            runner, svg,initialAddRoundKey, mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,  frSubBytes, frShiftRows, frAddRoundKey,
            labelInitialRound, labelFinalRound, labelMainRounds, counter, counterText
        }  = this.getGlobalComponents();
        const tl = this.getAnimatableBackgroundTL();


        tl.to([initialAddRoundKey, mrSubBytes, runner, mrShiftRows, mrMixColumns, mrAddRoundKey,  frSubBytes, frShiftRows, frAddRoundKey], {pixi: { alpha: 1}})
        tl.to([svg,labelInitialRound, labelFinalRound, labelMainRounds, counter, counterText], {pixi: {alpha: 1}}, "<")
       
        return tl;
    }


   


    getMotionPathDuration(start, end, multiplier=10){
        return (end - start) * multiplier;
    }

   createAnimationMain(){
        const {runner, svg, container,counter,  initialAddRoundKey, mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey,  frSubBytes, frShiftRows, frAddRoundKey,}  = this.getGlobalComponents();


        const path = svg.getPath();




 

        const tl = gsap.timeline()


        tl.to([svg], {pixi: {alpha: 1}, delay: .8})

        // INITIAL ROUND
        const segOneDuration = this.getMotionPathDuration(0, svg.info.segments.two.progress)
        tl.to(runner, {motionPath: {
            path: path,
            start: 0,
            end: svg.info.segments.two.progress,
            curviness: 0
        }, duration: segOneDuration,  ease: "none"}, "segOne")
 
        // initial add round key blink
        const labelBgAddRoundKey = this.page.getColor("--label-bg-delta")
        const labelBgAddRoundKeyHighlight = this.page.getColor("--label-bg-highlight-delta")
        const [start, end] = this.getTimes(initialAddRoundKey.y - svg.y, svg.info.segments.one.length, segOneDuration)  
        tl.to(initialAddRoundKey.background,{pixi: {tint: labelBgAddRoundKeyHighlight },duration: .001}, `segOne+=${start}`)
        tl.to(initialAddRoundKey.background,{pixi: {tint: labelBgAddRoundKey },duration: .001}, `segOne+=${end}`)
      

        // MAIN ROUNDS 1  


       

         // MAIN ROUNDS 1-8
        for(let i = 1; i < 9; i++){
 
            const mainRoundTL = gsap.timeline({})
            tl.call(() => counter.updateContent(i))
            const duration = i == 1 ? 10 : 1.5;
            mainRoundTL.add(this.getMainRoundTL(path, duration))
            const segThreeDuration = this.getMotionPathDuration(svg.info.segments.three.progress, svg.info.segments.four.progress, duration)
 
            mainRoundTL.set(runner, {pixi: {x: runner.x, y: runner.y}})
            mainRoundTL.to(runner, {motionPath: {
                path: path,  
                start: svg.info.segments.three.progress,
                end: svg.info.segments.four.progress,
                curviness: 0,
            }, duration: segThreeDuration ,  ease: "none",})


            tl.add(mainRoundTL)
        }


          // MAIN ROUND 9 
        tl.call(() => counter.updateContent("9"))
        tl.add(this.getMainRoundTL(path))
        //tl.call(() => {tl.timeScale(1)})
        // FINAL ROUND

        const finalRoundDuration = this.getMotionPathDuration(svg.info.segments.five.progress, 1)

    
        
        tl.set(runner, {pixi: {x: runner.x, y: runner.y}})
        tl.call(() => counter.updateContent("10"))
        tl.to(runner, {motionPath: {
            path: path,  
            start: svg.info.segments.five.progress,
            end: 1,
            curviness: 0
        }, duration: finalRoundDuration,  ease: "none",}, "finalRound")

        const finalSegmentY = svg.y + svg.info.segments.five.y;
        const [frsbStart, frsbEnd] = this.getTimes(frSubBytes.y - finalSegmentY, svg.info.segments.five.length, finalRoundDuration)  

        // counter.updateContent("1")
       
        const labelBgSubBytes = this.page.getColor("--label-bg-alpha")
        const labelBgSubBytesHighlight = this.page.getColor("--label-bg-highlight-alpha")
        tl.to(frSubBytes.background,{pixi: {tint: labelBgSubBytesHighlight },duration: .001}, `finalRound+=${frsbStart}`)
        tl.to(frSubBytes.background,{pixi: {tint: labelBgSubBytes },duration: .001}, `finalRound+=${frsbEnd}`)

        const labelBgShiftRows = this.page.getColor("--label-bg-beta")
        const labelBgShiftRowsHighlight = this.page.getColor("--label-bg-highlight-beta")
        const [frsrStart, frsrEnd] = this.getTimes(frShiftRows.y - finalSegmentY, svg.info.segments.five.length, finalRoundDuration)  
        tl.to(frShiftRows.background,{pixi: {tint: labelBgShiftRowsHighlight },duration: .001}, `finalRound+=${frsrStart}`)
        tl.to(frShiftRows.background,{pixi: {tint: labelBgShiftRows },duration: .001}, `finalRound+=${frsrEnd}`)

 
        const [frarStart, frarEnd] = this.getTimes(frAddRoundKey.y - finalSegmentY, svg.info.segments.five.length, finalRoundDuration)  
        tl.to(frAddRoundKey.background,{pixi: {tint: labelBgAddRoundKeyHighlight },duration: .001}, `finalRound+=${frarStart}`)
        tl.to(frAddRoundKey.background,{pixi: {tint: labelBgAddRoundKey },duration: .001}, `finalRound+=${frarEnd}`)

        
      
        

        return tl;
    }

    
    getTimes = (relY, height, duration) => {
        const tOffset = .05;
        const percent = relY / height
        return [duration * (percent - tOffset), duration * (percent + tOffset) ]
    }




    getMainRoundTL(svgData, duration){
        const {runner, svg,mrSubBytes, mrShiftRows, mrMixColumns, mrAddRoundKey} = this.getGlobalComponents();

 

        const mainRoundDuration = this.getMotionPathDuration(svg.info.segments.two.progress, svg.info.segments.three.progress, duration)

        const tl = gsap.timeline()
        
        tl.set(runner, {pixi: {x: runner.x, y: runner.y}})
        tl.to(runner, {motionPath: {
            path: svgData,  
            start: svg.info.segments.two.progress,
            end: svg.info.segments.three.progress,
            curviness: 0,
        }, duration: mainRoundDuration,  ease: "none",}, "mainRound")

        const labelBgSubBytes = this.page.getColor("--label-bg-alpha")
        const labelBgSubBytesHighlight = this.page.getColor("--label-bg-highlight-alpha")
        const [mrsbStart, mrsbEnd] = this.getTimes(mrSubBytes.y - svg.y - svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrSubBytes.background,{pixi: {tint: labelBgSubBytesHighlight},duration: .001}, `mainRound+=${mrsbStart}`)
        tl.to(mrSubBytes.background,{pixi: {tint: labelBgSubBytes },duration: .001}, `mainRound+=${mrsbEnd}`)

        const labelBgShiftRows = this.page.getColor("--label-bg-beta")
        const labelBgShiftRowsHighlight = this.page.getColor("--label-bg-highlight-beta")
        const [mrsrStart, mrsrEnd] = this.getTimes(mrShiftRows.y -  svg.y -svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrShiftRows.background,{pixi: {tint: labelBgShiftRowsHighlight },duration: .001}, `mainRound+=${mrsrStart}`)
        tl.to(mrShiftRows.background,{pixi: {tint: labelBgShiftRows },duration: .001}, `mainRound+=${mrsrEnd}`)

        const labelBgMixColumns = this.page.getColor("--label-bg-gamma")
        const labelBgMixColumnsHighlight = this.page.getColor("--label-bg-highlight-gamma")
        const [mrmcStart, mrcmEnd] = this.getTimes(mrMixColumns.y -  svg.y -svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrMixColumns.background,{pixi: {tint: labelBgMixColumnsHighlight},duration: .001}, `mainRound+=${mrmcStart}`)
        tl.to(mrMixColumns.background,{pixi: {tint: labelBgMixColumns },duration: .001}, `mainRound+=${mrcmEnd}`)

        // color, element, label, segmentY, segmentHeight, segmentDuration
        const labelBgAddRoundKey = this.page.getColor("--label-bg-delta")
        const labelBgAddRoundKeyHighlight = this.page.getColor("--label-bg-highlight-delta")
        const [mrarStart, mrarEnd] = this.getTimes(mrAddRoundKey.y -  svg.y -svg.info.segments.two.y, svg.info.segments.two.length, mainRoundDuration)  
        tl.to(mrAddRoundKey.background,{pixi: {tint: labelBgAddRoundKeyHighlight },duration: .001}, `mainRound+=${mrarStart}`)
        tl.to(mrAddRoundKey.background,{pixi: {tint: labelBgAddRoundKey },duration: .001}, `mainRound+=${mrarEnd}`)

        return tl;
    }
  

    createBlink(element,  blinkColor, duration){
        const ogColor = element.background.tint;
        const tl = gsap.timeline()
        tl.to(element.background,{pixi: {tint: blinkColor },duration: .001})
        tl.to(element.background,{pixi: {tint: ogColor },duration: .001, delay: duration})
        return tl;
    }
}

export default Page5Timline;
