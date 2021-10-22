
import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"
import {generatRandomBinaryStrings} from "../../utils/conversions"

class Page2Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
        this.FADE_OUT_DELAY = 0;
    }


    createPreFadeIn(){
        const {centerBox, arrowTopContainer, arrowBotContainer, arrowLeftContainer} = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();
        tl.set(centerBox, {pixi: {scale: 1}})
        tl.set([arrowBotContainer, arrowLeftContainer, arrowTopContainer], {pixi: {alpha: 1}})
        return tl;
    }

    createAnimationMain(){      
        const {arrowTop, arrowBottom, arrowLeft} = this.getGlobalComponents();
        const binaryStrings = generatRandomBinaryStrings(20, 8)
        
        const tl = gsap.timeline();
        const obj = {val: 0};

        tl.to(obj, {val: binaryStrings.length-1, ease: "none", duration: 3, repeat: 2, onUpdate: () => {
            const idx = Math.floor(obj.val)
            arrowTop.text.text = binaryStrings[idx];
            arrowLeft.text.text = binaryStrings[(idx+1)%binaryStrings.length];
            arrowBottom.text.text = binaryStrings[(idx+2)%binaryStrings.length];
        }})


      
        return tl;
    }


    createAnimationOut(){
        const {centerBox, arrowTopContainer, arrowBotContainer, arrowLeftContainer} = this.getGlobalComponents();
        const tl = gsap.timeline();

        tl.to([arrowBotContainer, arrowLeftContainer, arrowTopContainer], {pixi: {alpha: 0}, duration: .3})
     
        tl.to(centerBox, {pixi: {scale: 5}, duration: 1.5}, "fade-out-center-box")
        tl.to(centerBox.text, {pixi: {alpha: 0}, duration: .3}, "fade-out-center-box+=0")
        //tl.to(centerBox.text, {pixi: {alpha: 0}, duration: .2}, "fade-out-center-box+=2")
        
        return tl;
    }


}

export default Page2Timline;

