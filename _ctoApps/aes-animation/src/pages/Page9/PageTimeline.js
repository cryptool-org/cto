import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page9Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    createPreFadeIn(){
        const {
            grid, gridMovables, gridMovablesResults,
            equationContainer, 
            galoisField, 
            landingCol, 
            multiplicationSign,
            equalsSign, 
            resultCol,
            text1,
            text2,
        } = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();
        tl.set([landingCol, resultCol, multiplicationSign, equalsSign, galoisField, text1, text2], {pixi: {alpha: 0}})
  
        // hide & pre movables
        tl.set(gridMovablesResults.movables, {pixi: {alpha: 0}})
        const ys = gridMovables.movables.map(movable => movable.y)
        tl.set(gridMovables.movables, {pixi: {
            alpha: 0, 
            y: (idx) => ys[idx] - 100 
        }, duration: .5})
        return tl;
    }

    createAnimationIn(){
        const {gridMovables} = this.getGlobalComponents();
        const tl = this.getAnimatableBackgroundTL();
        const ys = gridMovables.movables.map(movable => movable.y)
        tl.to(gridMovables.movables, {pixi: {
           alpha: 1, 
           y: (idx) => ys[idx] 
        }, duration: .5})
        return tl;
    }


    createAnimationMain(){

        const {
            grid, gridMovables, gridMovablesResults,
            equationContainer, 
            galoisField, 
            landingCol, 
            multiplicationSign,
            equalsSign, 
            resultCol,
            text1,
            text2
        } = this.getGlobalComponents();
        const tl =  gsap.timeline();

        
        // premove 
        tl.add(this.moveGroup(gridMovablesResults.getCol(0), resultCol.cells, {duration: .0001}))
        tl.add(this.moveGroup(gridMovables.getCol(0), landingCol.cells, {duration: 1.5, delay: 1}))

        // reveal equation 
        tl.to(equationContainer, {pixi: {alpha: 1}})
        tl.to(galoisField, {pixi: {alpha: 1}})
        tl.to(multiplicationSign, {pixi: {alpha: 1}})

        tl.to(text1, {pixi: {alpha: 1}})

        tl.to([equalsSign, ...gridMovablesResults.getCol(0)], {pixi: {alpha: 1}, delay: 2})


        // move back
        tl.add(this.moveGroup(gridMovablesResults.getCol(0), grid.getCol(0), {duration: 1.5}))

        // hide equation
        tl.to([equationContainer, ...gridMovables.getCol(0), text1], {pixi: {alpha: 0}, duration: .3}, "<")
        tl.to(text2, {pixi: {alpha: 1}, duration: .3})
    

        // reveal other
        tl.to(gridMovablesResults.getCol(1), {pixi: {alpha: 1}, duration: .1, delay: 2})
        tl.to(gridMovablesResults.getCol(2), {pixi: {alpha: 1}, duration: .1, delay: .5})
        tl.to(gridMovablesResults.getCol(3), {pixi: {alpha: 1}, duration: .1, delay: .5})

        return tl;
    }


    createFadeOut(){
        const {text2, gridMovablesResults, gridMovables} = this.getGlobalComponents();
        const tl = gsap.timeline()

        tl.set(gridMovables.movables, {pixi: {alpha: 0}, delay: 1})
        const ys = gridMovablesResults.movables.map(movable => movable.y)
        tl.to(gridMovablesResults.movables, {pixi: {
           alpha: 0, 
           y: (idx) => ys[idx] + 100 
       }, duration: .5})
        tl.to(text2, {pixi: {alpha: 0}, duration: .3}, "<")

        return tl;
    }



}

export default Page9Timline;
