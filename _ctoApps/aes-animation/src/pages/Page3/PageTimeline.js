import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page3Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }


    createPreFadeIn(){
        const {
            title, subtitleLeft, gridLeft, subtitleRight, gridRight, arrowLeft, arrowRight, textRight, textLeft, circleLeft, circleRight
        } = this.getGlobalComponents();

        const gridLeftTexts = gridLeft.cells.map((cell) => cell.text)
        const gridRightTexts = gridRight.cells.map((cell) => cell.text)

        const tl = this.getPreFadeInTimeline();
        tl.set([subtitleLeft, subtitleRight, arrowLeft, arrowRight, textRight,textLeft, circleLeft,circleRight,gridLeft, gridRight], {pixi: {alpha: 0}})
        tl.set([...gridLeftTexts, ...gridRightTexts], {pixi: {alpha: 0}})
        return tl; 
    }




    createAnimationMain(){
        const {
            title, subtitleLeft, gridLeft, subtitleRight, gridRight, arrowLeft, arrowRight, textRight, textLeft, circleLeft, circleRight
        } = this.getGlobalComponents();

        const gridLeftCells = gridLeft.getByColumn().map((cell) => cell.text)
        const gridRightCells = gridRight.getByColumn().map((cell) => cell.text)

        const tl = gsap.timeline();
        tl.to(title, {pixi: {alpha: 1}, duration: .3})
        tl.to([subtitleLeft, subtitleRight], {pixi: {alpha: 1}, duration: .3, delay: .2})
        tl.to([gridRight, gridLeft], {pixi: {alpha: 1}, duration: .3, delay: .2})

        // fade in state & key
        tl.to(gridLeftCells, {pixi: {alpha: 1}, stagger: .2, duration: .2})
        tl.to(gridRightCells, {pixi: {alpha: 1}, stagger: .2, duration: .2})

        // 
        tl.to([arrowLeft, arrowRight], {pixi: {alpha: 1}, duration: .3, delay: .2})
        tl.to([textRight, textLeft], {pixi: {alpha: 1}, duration: .3, delay: .2})
        tl.to([circleLeft, circleRight], {pixi: {alpha: 1}, duration: .3, delay: .2})

        return tl;
    }

}

export default Page3Timline;
