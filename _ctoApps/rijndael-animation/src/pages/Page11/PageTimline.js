import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page11Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    
    createPreFadeIn(){

        //const tl = this.getPreFadeInTimeline();
        const {rows, titles} = this.getGlobalComponents();
        const obj = {val: 0}
        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .0001})
        tl.set([...rows, ...titles], {pixi: {alpha: 0}})
        return tl;
    }

    createAnimationMain(){
        const {rows, titles, introText} = this.getGlobalComponents();

        const tl = gsap.timeline(); 

        tl.to(introText, {pixi: {alpha: 0}, delay: 2})
        tl.to(titles, {pixi: {alpha: 1}})
        tl.to(rows[0], {pixi: {alpha: 1}, delay: .2})
        tl.to(rows[1], {pixi: {alpha: 1}, delay: .2})
        tl.to(rows[2], {pixi: {alpha: 1}, delay: .2})
        tl.to(rows[3], {pixi: {alpha: 1}, delay: .2})
        tl.to(rows[4], {pixi: {alpha: 1}, delay: .2})
        tl.to(rows[5], {pixi: {alpha: 1}, delay: .2})

        return tl;
    }


}

export default Page11Timline;
