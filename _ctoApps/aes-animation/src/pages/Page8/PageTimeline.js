import {gsap} from "gsap"
import {shiftArray} from "../../utils/utils"
import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page8Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    createPreFadeIn(){
        const {
            movablesCollector, grid, text1, text2, text3
        } = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();

        // hide texts
        tl.set([text1, text2, text3, grid], {pixi: {alpha: 0}})

        const ys = movablesCollector.movables.map(movable => movable.y)
        tl.set(movablesCollector.movables, {pixi: {
             alpha: 0, 
             y: (idx) => ys[idx] - 100
         }})
        return tl;
    }

    createAnimationIn(){
        const {
            movablesCollector, grid, text1, text2, text3
        } = this.getGlobalComponents();

      
        const tl = this.getAnimatableBackgroundTL();

        // fade in grid
        const ys = movablesCollector.movables.map(movable => movable.y)
         tl.to(movablesCollector.movables, {pixi: {
            alpha: 1, 
            y: (idx) => ys[idx] 
        }, duration: .5})
    
        return tl;
     }


 
 
     createAnimationMain(){
         const {
             movablesCollector, grid, text1, text2, text3
         } = this.getGlobalComponents();
         const tl = gsap.timeline();
 
  
 
        tl.to(text1, {pixi: {alpha: 1}, duration: .3, delay: .8})
        tl.add(this.shiftRow(movablesCollector.getRow(1), grid.getRow(1)))
        tl.to(text1, {pixi: {alpha: 0}})
        tl.to(text2, {pixi: {alpha: 1}}, "<")
        // shift 3 row 2 times
        
        const secondsRowMovables = movablesCollector.getRow(2)
        tl.add(this.shiftRow(secondsRowMovables, grid.getRow(2)))
        tl.add(this.shiftRow(shiftArray(secondsRowMovables, 1), grid.getRow(2)))
        
 
        // shift 4th row 3 times
        tl.to(text2, {pixi: {alpha: 0}})
        tl.to(text3, {pixi: {alpha: 1}}, "<")
 
        const thirdRowMovables =movablesCollector.getRow(3)
        tl.add(this.shiftRow(thirdRowMovables, grid.getRow(3)))
        tl.add(this.shiftRow(shiftArray(thirdRowMovables, 1), grid.getRow(3)))
        tl.add(this.shiftRow(shiftArray(thirdRowMovables, 2), grid.getRow(3)))
        tl.to(text3, {pixi: {alpha: 0}})
 
         return tl;  
     }
 
 
 
 
     shiftRow(movables, landings, settings={}){
         const tl = gsap.timeline();
 
        const landingBounds = this.getBounds(landings[3])
        const landingBoundsZero = this.getBounds(landings[0])
 
 
        tl.to(movables[0], {pixi: {
            ...landingBounds,
            x: (landingBounds.x + landingBoundsZero.x) / 2,
            y: landingBounds.y -100, 
            zIndex: 10,
         }, duration: 1}, "shift-row")
         tl.to(movables[0], {pixi: {...landingBounds, zIndex: 10}, duration: 1})
 
 
 
        for(let i = 1; i < movables.length; i++){
            const bounds = this.getBounds(landings[i-1])
            tl.to(movables[i], {pixi: {...bounds, zIndex: 5}, duration: .8}, "shift-row+=1")
        }
 
        tl.set(movables, {pixi: {zIndex: 1}})   
 
         return tl;
     }

     createFadeOut(){
        const {movablesCollector} = this.getGlobalComponents();

        const tl = gsap.timeline();

        // fade in grid
        const ys = movablesCollector.movables.map(movable => movable.y)
         tl.to(movablesCollector.movables, {pixi: {
            alpha: 0, 
            y: (idx) => ys[idx] + 100 
        }, duration: .5})
    
        return tl;
     }
}

export default Page8Timline;
