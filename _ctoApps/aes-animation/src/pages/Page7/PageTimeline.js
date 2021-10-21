
import {hexStringToInt} from "../../utils/conversions"
import {gsap} from "gsap"

import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page7Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     

     
    }


    


    createPreFadeIn(){
        const {resultMovables,sbox, grid, textBox,stateMovables} = this.getGlobalComponents();
        const tl = this.getPreFadeInTimeline();
        tl.set([sbox, textBox, grid], {pixi: {alpha: 0}})
        tl.set([...resultMovables.movables, ...stateMovables.movables], {pixi: {alpha: 0}})
        return tl;
    }

    createAnimationIn(){
        const tl = this.getAnimatableBackgroundTL();
        const {stateMovables,sbox} = this.getGlobalComponents();
        tl.set([...stateMovables.movables,sbox], {pixi: {alpha: 1}})
        return tl;
    }


    createAnimationMain(){
        const {
            sbox, grid, textBox,
            stateMovables, resultMovables
        } = this.getGlobalComponents();
        const tl = gsap.timeline()


        const sboxBackgroundColor = this.page.getColor("--sbox-background")
        const sboxBackgroundHighlightColor = this.page.getColor("--sbox-highlight-color")
       
        const firstCellHex = this.page.controller.data.getData("after-initial-round")[0]
        const cellX = hexStringToInt(firstCellHex[0])
        const cellY = hexStringToInt(firstCellHex[1])
  
        const sBoxCell = sbox.grid.get(cellX, cellY)
        const sBoxRow = sbox.grid.getRow(cellX).map(cell => cell.getBackground())
        const sBoxCol = sbox.grid.getCol(cellY).map(cell => cell.getBackground())


        // hide result movables and move first one
        tl.to(resultMovables.get(0,0), {pixi: {...this.getBounds(sBoxCell), alpha: 0}, duration: .0001})
        tl.set(resultMovables.movables, {pixi: {alpha: 0}})


        tl.to(stateMovables.get(0,0), {pixi: {...this.getBounds(textBox), zIndex: 10}, duration: 1.5}, "move-group")
        
        // highlight sbox row / col
        tl.to(sBoxRow, {pixi: {tint: sboxBackgroundHighlightColor}})
        tl.to(sBoxCol, {pixi: {tint: sboxBackgroundHighlightColor}})

        // show movable
        tl.set(resultMovables.get(0,0), {pixi: {alpha: 1}})

        // unhighlight row / col
        tl.to(sBoxRow, {pixi: {tint: sboxBackgroundColor}})
        tl.to(sBoxCol, {pixi: {tint: sboxBackgroundColor}}, "<")

  
        // move first substituted element back
        tl.to(resultMovables.get(0,0), {pixi: {scale: 1, ...this.getBounds(grid.get(0,0)), zIndex: 10}, duration: 1.5}, "move-back")
        tl.set(resultMovables.get(0,0), {pixi: {zIndex: 1}})

        tl.to(stateMovables.get(0,0), {pixi: {alpha: 0}}, "move-back+=0")


        for(let i = 1; i < stateMovables.movables.length; i++){
            const cell = stateMovables.movables[i] 
            const revealedCell = resultMovables.movables[i]
            const cellX = hexStringToInt(cell.text.text[0])
            const cellY = hexStringToInt(cell.text.text[1])

            const sBoxCell = sbox.grid.get(cellX, cellY)
            tl.to(sBoxCell.getBackground(), {pixi: {tint: sboxBackgroundHighlightColor}, duration: .1, delay: .5} )
            tl.to(revealedCell, {pixi: {alpha: 1}, duration: .1}, "<")
            tl.to(sBoxCell.getBackground(), {pixi: {tint: sboxBackgroundColor}, duration: .1, delay: .3} )
        }

        return tl;
    }


}

export default Page7Timline;

