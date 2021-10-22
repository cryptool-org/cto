import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page15Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
        this.FADE_OUT_DELAY = 0;


        this.overlay = document.getElementById("animation-completed-screen")
    }


    createPreFadeIn(){
        const tl = this.getPreFadeInTimeline();
        tl.set(this.overlay , {opacity: 0, display: "none"})
        return tl;
    }

    createAnimationIn(){
        const tl = gsap.timeline();
        tl.set(this.overlay , {opacity: 1, display: "flex"})
        return tl;
    }

    createFadeOut(){
        const tl = gsap.timeline();    
        return tl;
    }

}

export default Page15Timline;
