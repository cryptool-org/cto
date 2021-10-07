import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page1Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    createPreFadeIn(){
        const {
            textRijndael,
            textCipher,
            subtitle,
            introText,
        } = this.getGlobalComponents()

        const obj = {val: 0}
        const tl = gsap.timeline()

        tl.to(obj, {val: 1, duration: .0001})
        tl.set([...textRijndael.chars, ...textCipher.chars, subtitle], {pixi: {alpha: 0}})
        tl.set([introText], {pixi: {alpha: 1}})
        tl.set(this.page, {pixi: {alpha: 1, renderable:true}})

        return tl;
    }

   



    createAnimationMain(){

        const {
            textRijndael,
            textCipher,
            subtitle,
            introText
        } = this.getGlobalComponents()
        const obj = {val: 0}
        const tl = gsap.timeline();
      
        tl.to([introText], {pixi: {alpha: 0}})
        
        tl.to([...textRijndael.chars, ...textCipher.chars], {pixi: {
            scale: 3,
         
        }, duration: .001,})
        tl.to(textRijndael.chars, { stagger: .2, pixi: { alpha: 1, scaleX: 1, scaleY: 1}});
        tl.to(textCipher.chars, { stagger: .2, pixi: { alpha: 1, scaleX: 1, scaleY: 1}})
        tl.to(subtitle, {pixi: {alpha: 1}, duration: .5})
        return tl;
    }

}

export default Page1Timline;

