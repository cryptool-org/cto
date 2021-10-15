import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page14Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)

        this.FADE_OUT_DELAY = 0;
     
    }

    createPreFadeIn(){
        const {title, text, circledChar} = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();
        tl.set([title, text, circledChar], {pixi: {alpha: 0}})
        return tl;
    }


    createAnimationIn(){
        const {title, text, circledChar} = this.getGlobalComponents();
        const tl = gsap.timeline();   
        tl.to([title, circledChar], {pixi: {alpha: 1}, duration: .3, delay: .4})
        tl.to( text, {pixi: {alpha: 1}, duration: .3}, "-=.1")
        return tl;
    }

    createAnimationOut(){
        const {title, text, circledChar} = this.getGlobalComponents();
        const tl = gsap.timeline();   
        tl.to( text, {pixi: {alpha: 0}, duration: .3, delay: 5})
        tl.to([title, circledChar], {pixi: {alpha: 0}, duration: .3}, "-=.1")
       
        return tl;
    }

}

export default Page14Timline;
