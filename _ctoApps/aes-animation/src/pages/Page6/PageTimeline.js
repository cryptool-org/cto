import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page6Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    createPreFadeIn(){ 
        const {container, title} = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();
        tl.set([container], {pixi: {alpha: 0}})
        return tl;
    }

    createAnimationMain(){
        const {container, title, labelSubBytes, labelShiftRows, labelMixColumns, labelAddRoundKey} = this.getGlobalComponents();
        const tl = gsap.timeline();
        


        tl.set(container, {pixi: {x: container.x-200, scale: .7}})
        tl.to([labelSubBytes, labelShiftRows, labelMixColumns, labelAddRoundKey], {pixi: {alpha: 1}})
        tl.to(container, {pixi: {alpha: 1}, duration: .5})
        tl.to(container, {pixi: {x: container.x, scale: 1}, duration: 1}, "-=.2")
        tl.to(title, {pixi: {alpha: 1}}, "<")
        return tl;
    }

}

export default Page6Timline;
