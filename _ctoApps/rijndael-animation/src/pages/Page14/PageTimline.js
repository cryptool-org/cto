import {gsap} from "gsap"
import {hexStringToInt} from "../../utils/conversions"
import {shiftArray} from "../../utils/utils"
import AnimationPageTimeline from "../../core/AnimationPageTimeline"


class Page14Timline extends AnimationPageTimeline{
    constructor(animationPage){
        super(animationPage)
     
    }

    moveXL(idx=4, movablesOne, movablesTwo, ogMovables){
        const {
            equalsSymbol,
            primaryGrids,
            secondaryGrids,
            addSymbol
        } = this.getGlobalComponents();
        // idx refers to 0-15 to global grid idx
        const col1Idx = idx - 3;
        const col2Idx = idx;
        const col3Idx = idx + 3;
        const resColIdx = idx +1; 

    

        // movables
        const col1 = movablesOne.getCol(col1Idx % 4);
        const col2 = movablesTwo.getCol(col2Idx % 4);

  

        const colRes = movablesTwo.getCol(resColIdx % 4);

        // landings
        const landingsAddOne = secondaryGrids[Math.floor(col1Idx / 4)].getCol(col1Idx % 4)
        const landingsAddTwo = secondaryGrids[Math.floor(col2Idx / 4)].getCol(col2Idx % 4)
        const landingsAddRes = secondaryGrids[Math.floor(col3Idx / 4)].getCol(col3Idx % 4)
        const landingsReturn = primaryGrids[Math.floor(resColIdx / 4)].getCol(resColIdx % 4)

        const tl = gsap.timeline();

        // position addition symbol

        const addCell = secondaryGrids[Math.floor((idx-1) / 4)].get(2, (idx-1) % 4)
        const addPos = addCell.getBounds();

        const equalsCell = secondaryGrids[Math.floor((idx+2) / 4)].get(2, (idx+2) % 4)
        const equalsPos = equalsCell.getBounds();

        // prep
        tl.set(equalsSymbol, {pixi: {x: equalsPos.x, y: equalsPos.y}})
        tl.set(addSymbol, {pixi: {x: addPos.x, y: addPos.y}})
        tl.set([...colRes, equalsSymbol, addSymbol], {pixi: {alpha: 0}})        
        tl.add(this.moveGroup(colRes, landingsAddRes, {duration: .001}))

        // move columns down
        tl.set(col1, {pixi: {alpha: 1}})
        tl.add(this.moveGroup(col1, landingsAddOne,{duration: 1}))
        tl.add(this.moveGroup(col2, landingsAddTwo,{duration: 1}))

        // reval equation
        tl.to(addSymbol, {pixi: {alpha: 1}})
        tl.to(equalsSymbol, {pixi: {alpha: 1}})
        tl.to(colRes, {pixi: {alpha: 1}})       

        // move back
        tl.add(this.moveGroup(colRes, landingsReturn, {duration: 1}),)

        // hide equation + cleanup
        tl.to( [...col1, ...col2, equalsSymbol, addSymbol], {pixi: {alpha: 0}})
        tl.set(ogMovables.getCol(resColIdx % 4), {pixi: {alpha: 1}})
        
        return tl;
    }


    shiftColumn(movables, landings, settings={}){
        const tl = gsap.timeline();

        const shiftOffset = window.screen.width <= 800 ? -50 : -100;

       const landingBoundsFirst = this.getBounds(landings[0])
       const landingBoundsLast = this.getBounds(landings[3])
      
       tl.to(movables[0], {pixi: {
           ...landingBoundsLast,
           x: landingBoundsLast.x + shiftOffset,
            y: (landingBoundsLast.y + landingBoundsFirst.y) / 2,
           zIndex: 10,
        }, duration: 1}, "shift-col")
        tl.to(movables[0], {pixi: {...landingBoundsLast, zIndex: 10}, duration: 1})



       for(let i = 1; i < movables.length; i++){
           const bounds = this.getBounds(landings[i-1])
           tl.to(movables[i], {pixi: {...bounds, zIndex: 5}, duration: .8}, "shift-col+=1")
       }

       tl.set(movables, {pixi: {zIndex: 1}})   

        return tl;
    }


    getSecondaryGridBounds(index){
        const {secondaryGrids} = this.getGlobalComponents();
        const bounds = secondaryGrids[Math.floor(index / 4)].get(2,index % 4).getBounds();
        return {x: bounds.x, y: bounds.y}
    }

    createPreFadeIn(){
        const {
            equalsSymbol,
            pgTwoMovablesOg,
            pgTwoMovablesTranform,
            pgThreeMovablesOg,
            pgThreeMovablesTranform,
            addSymbol,
            addSymbol2,
            subBytesMovables,
            sbox,
            subBytesText,
            cipherKeyText,
            roundOneKeyText,
            roundTwoKeyText,
            roundThreeKeyText,
            roundTenKeyText,
            sText, aText, bText, textInitial, textXor,
            rotWordText,
            sboxText,
            finalGridMovables,
            pgFourMovablesOg
        } = this.getGlobalComponents();
        const tl = gsap.timeline();

        // hide movables and symbols
        tl.set([...pgFourMovablesOg.movables,...finalGridMovables.movables,...subBytesMovables.movables,...pgTwoMovablesTranform.movables, ...pgTwoMovablesOg.movables, ...pgThreeMovablesOg.movables, ...pgThreeMovablesTranform.movables], {pixi: {alpha: 0}})
        tl.set([
            addSymbol, addSymbol2, equalsSymbol, cipherKeyText, sbox, 
            subBytesText, roundOneKeyText, roundTwoKeyText, 
            
            rotWordText, sboxText,
            roundThreeKeyText,
            roundTenKeyText,
        ], {pixi: {alpha: 0}})

        tl.set([
      textInitial, textXor,
        ], {opacity: 0})
  

      

        return tl;
    }


    createAnimationMain(){

        const {
            pgOneMovablesTranform,
            pgTwoMovablesOg,
            pgTwoMovablesTranform,
            pgThreeMovablesOg,
            pgThreeMovablesTranform,
            cipherKeyText,
            roundOneKeyText,
            roundTwoKeyText,
            textXor,
            pgFourMovablesOg,
            finalGridMovables,
            roundThreeKeyText,
            roundTenKeyText,
            rconMovables,
            rconText
        } = this.getGlobalComponents();

        const tl = gsap.timeline();


        tl.add(this.createFirstSubByteTimeline())
        
        // first box
        if(!this.page.shouldHide){
            tl.to(textXor,{opacity: 1})
        }
        
        tl.add(this.moveXL(4, pgOneMovablesTranform, pgTwoMovablesTranform, pgTwoMovablesOg))
        tl.add(this.moveXL(5, pgOneMovablesTranform, pgTwoMovablesTranform, pgTwoMovablesOg))
        tl.add(this.moveXL(6, pgOneMovablesTranform, pgTwoMovablesTranform, pgTwoMovablesOg))
        tl.to(textXor,{opacity: 0})

        // second iteration
        if(!this.page.shouldHide){
            tl.add(this.createSecondSubTimeline())

            tl.add(this.moveXL(8, pgTwoMovablesTranform, pgThreeMovablesTranform, pgThreeMovablesOg))
            tl.add(this.moveXL(9, pgTwoMovablesTranform, pgThreeMovablesTranform, pgThreeMovablesOg))
            tl.add(this.moveXL(10, pgTwoMovablesTranform, pgThreeMovablesTranform, pgThreeMovablesOg))
          

        }

    
     

        // reveal round key 3
        if(!this.page.shouldHide){
            tl.to([ cipherKeyText,roundOneKeyText,roundTwoKeyText], {pixi: {alpha: 1}})
            tl.to([...pgFourMovablesOg.movables, roundThreeKeyText], {pixi: {alpha: 1}});
            tl.to(rconMovables.getCol(2), {pixi: {alpha: 0}}, "<");
        }else{
            tl.to([ cipherKeyText,roundOneKeyText], {pixi: {alpha: 1}})
            tl.to([...pgThreeMovablesOg.movables, roundTwoKeyText], {pixi: {alpha: 1}});
            tl.to(rconMovables.getCol(1), {pixi: {alpha: 0}}, "<");
        }

       
    
        const startPoint = this.page.shouldHide ? 2 : 3;
        for(let i = startPoint; i < 10; i++){
            tl.to(rconMovables.getCol(i), {pixi: {alpha: 0}, duration: .1, delay: .3});
        }
        tl.to(rconText, {pixi: {alpha: 0}}, "<")

        tl.to([...finalGridMovables.movables, roundTenKeyText], {pixi: {alpha: 1}})

        

        return tl;
    }



    createSubByteTimeline(toSubCol, subbedCol, landings){
        const {sbox, subBytesText } = this.getGlobalComponents();
        const tl = gsap.timeline();

        const shiftedColum = shiftArray([...toSubCol], 1)

        //subbytes movabes, shifted col

        // move subbyte movables to equation landings
        tl.add(this.moveGroup(subbedCol, landings), {duration: .001})

        // reveal sbox

        
        tl.to(sbox, {pixi: {alpha: 1}})
        if(!this.page.shouldHide){
            tl.to(subBytesText, {pixi: {alpha: 1}}, "<")
        }
        


        const sboxBackgrooundColor = this.page.getColor("--sbox-background")
        const sboxHighlightColor = this.page.getColor("--sbox-highlight-color")
        // reveal subbytes from sbox
        for(let i = 0; i < 4; i++){           
            const cellLanding = this.getSubByteCellLanding(shiftedColum[i])
            const cellSub = subbedCol[i]

            if(i == 0){
                tl.set(cellSub, {pixi: {...this.getBounds(cellLanding)}})
                tl.to(cellSub, {pixi: {alpha: 1}})
                tl.to(cellSub, {pixi: {...this.getBounds(landings[0])}})
            }else{
                // highlight sbox cell + reveal cell landing
                tl.to(cellLanding.getBackground(), {pixi: {tint: sboxHighlightColor}})
                tl.to(cellSub, {pixi: {alpha: 1}})
                tl.to(cellLanding.getBackground(), {pixi: {tint: sboxBackgrooundColor}})
            }
        }

        // hide sbox
        tl.to([sbox, subBytesText], {pixi: {alpha: 0}})

        return tl;
    }


    createFirstSubByteTimeline(){
        
        const {
            primaryGrids,
            secondaryGrids,
            equalsSymbol,
            pgOneMovablesTranform,
            pgTwoMovablesOg,
            pgTwoMovablesTranform,
            rconMovables,
            addSymbol,
            addSymbol2,
            subBytesMovables,
            rotWordText,
            aText,
            sText,
            textInitial,
            bText
        } = this.getGlobalComponents();

        const tl = gsap.timeline();

        // movables
        const lastColMovables = pgOneMovablesTranform.getCol(3);
        const firstColMovables =  pgOneMovablesTranform.getCol(0)
        const rconColMovables = rconMovables.getCol(0)
        const resultMovables = pgTwoMovablesTranform.getCol(0)

        // landing
        const lastColOgLanding = primaryGrids[0].getCol(3);
        const addOneLanding = secondaryGrids[0].getCol(0)
        const addTwoLanding = secondaryGrids[0].getCol(3)
        const addThreeLanding = secondaryGrids[1].getCol(2)
        const resultLanding = secondaryGrids[2].getCol(1)
        const resultDestinationLanding = primaryGrids[1].getCol(0)

        // hide + move result column to initial result position
        tl.set([...resultMovables], {pixi: {alpha: 0}})
        tl.add(this.moveGroup(resultMovables, resultLanding, {duration: .001}))

        // move symbols to positions (hidden)
        tl.set(addSymbol, {pixi: {...this.getSecondaryGridBounds(2)}})
        tl.set(addSymbol2, {pixi: {...this.getSecondaryGridBounds(5)}})
        tl.set(equalsSymbol, {pixi: {...this.getSecondaryGridBounds(8)}})
        
        if(!this.page.shouldHide){
            tl.to(textInitial, {opacity: 1})
        }
     
        

        // move down and shift col
        const bounds = addTwoLanding[0].getBounds();
        tl.to(rotWordText, {pixi: {x: bounds.x + 50, y: bounds.y + 30 }, duration: .001, delay: 2} )
        tl.to(textInitial, {opacity: 0})
        tl.add(this.moveGroup(lastColMovables, addTwoLanding, {duration: 1}))
        tl.to([rotWordText], {pixi: {alpha: 1}})

        if(!this.page.shouldHide){
            tl.to([aText, sText], {opacity:1}, "<")
        }
        tl.add(this.shiftColumn(lastColMovables, addTwoLanding, {}))
        tl.to(rotWordText, {pixi: {alpha: 0}})

        // subbytes
        tl.add(this.createSubByteTimeline(
            lastColMovables,
            subBytesMovables.getRow(0),
            addTwoLanding
        ))
      

        // move adds and reveal equation
        tl.add(this.moveGroup(firstColMovables, addOneLanding, {duration: 1}))
        tl.to(addSymbol, {pixi: {alpha: 1}})

        tl.add(this.moveGroup(rconColMovables, addThreeLanding, {duration: 1}))
       
        if(!this.page.shouldHide){
            tl.to(bText, {opacity: 1})
        }
        tl.to(addSymbol2, {pixi: {alpha: 1}})
        tl.to(equalsSymbol, {pixi: {alpha: 1}})
        tl.to(resultMovables, {pixi: {alpha: 1}})

        // move back result
        tl.add(this.moveGroup(resultMovables, resultDestinationLanding, {duration: 1}))

        // hide / reset equation

        // show column underneath result (for moving later)
        tl.set(pgTwoMovablesOg.getCol(0), {pixi: {alpha: 1}})

        // hide equation
        tl.to([addSymbol, addSymbol2, equalsSymbol], {pixi: {alpha: 0}})
        tl.to([sText, aText, bText], {opacity: 0})
        tl.to([...lastColMovables, ...firstColMovables, ...rconColMovables, ...subBytesMovables.movables], {pixi: {alpha: 0}})

        // move last col back
        tl.add(this.moveGroup(lastColMovables, lastColOgLanding, {duration: .001}))
        tl.set(lastColMovables, {pixi: {alpha: 1}})

        return tl;

    }

    createSecondSubTimeline(){
        
        const {
            primaryGrids,
            secondaryGrids,
            equalsSymbol,

            pgThreeMovablesTranform,
            pgThreeMovablesOg,
            pgTwoMovablesTranform,
            rconMovables,
            addSymbol,
            addSymbol2,
            subBytesMovables,
            rotWordText,
            aText,
            sText,
            textInitial,
            bText
        } = this.getGlobalComponents();

        const tl = gsap.timeline();

        // movables
        const lastColMovables = pgTwoMovablesTranform.getCol(3);
        const firstColMovables =  pgTwoMovablesTranform.getCol(0)
        const rconColMovables = rconMovables.getCol(1)
        const resultMovables = pgThreeMovablesTranform.getCol(0)

        // landing
        const lastColOgLanding = primaryGrids[1].getCol(3);
        const addOneLanding = secondaryGrids[1].getCol(0)
        const addTwoLanding = secondaryGrids[1].getCol(3)
        const addThreeLanding = secondaryGrids[2].getCol(2)
        const resultLanding = secondaryGrids[3].getCol(1)
        const resultDestinationLanding = primaryGrids[2].getCol(0)

        // hide + move result column to initial result position
        tl.set([...resultMovables], {pixi: {alpha: 0}})
        tl.add(this.moveGroup(resultMovables, resultLanding, {duration: .001}))

        // move symbols to positions (hidden)
        tl.set(addSymbol, {pixi: {...this.getSecondaryGridBounds(6)}})
        tl.set(addSymbol2, {pixi: {...this.getSecondaryGridBounds(9)}})
        tl.set(equalsSymbol, {pixi: {...this.getSecondaryGridBounds(12)}})
        

  
        

        // move down and shift col
        const bounds = addTwoLanding[0].getBounds();
        tl.to(rotWordText, {pixi: {x: bounds.x + 50, y: bounds.y + 30 }, duration: .001, delay: 2} )

        tl.add(this.moveGroup(lastColMovables, addTwoLanding, {duration: 1}))
        tl.to(rotWordText, {pixi: {alpha: 1}})
        tl.add(this.shiftColumn(lastColMovables, addTwoLanding, {}))
        tl.to(rotWordText, {pixi: {alpha: 0}})

        // subbytes
        tl.add(this.createSubByteTimeline(
            lastColMovables,
            subBytesMovables.getRow(1),
            addTwoLanding
        ))
      

        // move adds and reveal equation
        tl.set(firstColMovables, {pixi: {alpha: 1}})
        tl.add(this.moveGroup(firstColMovables, addOneLanding, {duration: 1}))
        tl.to(addSymbol, {pixi: {alpha: 1}})

        tl.add(this.moveGroup(rconColMovables, addThreeLanding, {duration: 1}))
   
        tl.to(addSymbol2, {pixi: {alpha: 1}})
        tl.to(equalsSymbol, {pixi: {alpha: 1}})
        tl.to(resultMovables, {pixi: {alpha: 1}})

        // move back result
        tl.add(this.moveGroup(resultMovables, resultDestinationLanding, {duration: 1}))

        // hide / reset equation

        // show column underneath result (for moving later)
        tl.set(pgThreeMovablesOg.getCol(0), {pixi: {alpha: 1}})

        // hide equation
        tl.to([addSymbol, addSymbol2, equalsSymbol], {pixi: {alpha: 0}})
        tl.to([sText, aText, bText], {opacity: 0})
        tl.to([...lastColMovables, ...firstColMovables, ...rconColMovables, ...subBytesMovables.movables], {pixi: {alpha: 0}})

        // move last col back
        tl.add(this.moveGroup(lastColMovables, lastColOgLanding, {duration: .001}))
        tl.set(lastColMovables, {pixi: {alpha: 1}})

        return tl;

    }


    getSubByteCellLanding(cell){
        const {sbox} = this.getGlobalComponents()
        const text = cell.text.text
        const subX = hexStringToInt(text[0])
        const subY = hexStringToInt(text[1])
        const cellLanding = sbox.grid.get(subX, subY) 
        return cellLanding;
    }

}

export default Page14Timline;
