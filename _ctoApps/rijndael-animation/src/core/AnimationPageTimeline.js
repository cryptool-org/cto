import {gsap} from "gsap"

class AnimationPageTimeline{

    constructor(page){
        this.page = page;

        this.FADE_IN_DURATION = .0001;
        this.FADE_OUT_DURATION = .00001;
        this.FADE_OUT_DELAY = 3;
    }

    getWidth(widthPercent){
        return this.page.controller.ANIMATION_DIMENSIONS.widthPercent * widthPercent
    }

    getHeight(heightPercent){
        return this.page.controller.ANIMATION_DIMENSIONS.heightPercent * heightPercent
    }

    // timeline insert to update currentpage number in 
    createUpdatePage(prevPageID){
        const obj = {val:0};
        const tl = gsap.timeline({
            onStart: () => {
                this.page.controller.setCurrentPage(this.page.id)
            },
            onReverseComplete: () => {
                if(prevPageID) this.page.controller.setCurrentPage(prevPageID)
            }
        })
        tl.to(obj, {val: 1, duration: .0001})
        return tl;
    }
    createPreFadeIn(){}
    createAnimationIn(){}
    createAnimationOut(){}
    createAnimationMain(){}
    createFadeIn(){
        const tl = gsap.timeline();
        tl.to(this.page, {pixi: {alpha: 1, renderable:true}, duration: this.FADE_IN_DURATION})
        return tl;
    }
    createFadeOut(){
        const tl = gsap.timeline();
        tl.to(this.page, {pixi: {alpha: 0, renderable: false},duration: this.FADE_OUT_DURATION, delay: this.FADE_OUT_DELAY})
        return tl;
    }

    getGlobalComponents(){
        return this.page.globalComponents;
    }

    getBounds(elem){
        const bounds  = elem.getBounds();
        return {x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height}
    }

    getPreFadeInTimeline(){
        const obj = {val: 0}
        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .0001})
        return tl;
    }

    moveGroup(movables, landings, settings={}){
        const tl = gsap.timeline();

        tl.to(movables[0], {pixi: {...this.getBounds(landings[0]), zIndex: 10}, ...settings}, "move-group")

        for(let i = 1; i < movables.length; i++){
            const movable = movables[i]
            const landingBounds = this.getBounds(landings[i])
            tl.to(movable, {pixi: {...landingBounds, zIndex: 10}, ...settings}, "move-group+=0")
        }

        tl.set(movables, {zIndex: 1})
    
        return tl;
    }


    getAnimatableBackgroundTL(){
        const {animatableBackground} = this.getGlobalComponents()
        const {title, titleMask, bar} = animatableBackground;

        const tl = gsap.timeline();
        tl.set([animatableBackground, title, titleMask], {pixi: {alpha: 0}})
        tl.set(animatableBackground, {pixi: {y: animatableBackground.height}})
        tl.set(bar, {pixi: {y: 0}})

        // move background up
        tl.set(animatableBackground, {pixi: {alpha: 1}})
        tl.to(animatableBackground, {pixi: {y: 0}, duration: .8})

        // move bar down
        tl.to(bar, {pixi: {y: bar.y}})

        // reveal title
        tl.set([title, titleMask], {pixi: {alpha: 1}})
        tl.to(titleMask, {pixi: {x: titleMask.x + titleMask.width}})


        return tl;
    }
}

export default AnimationPageTimeline;