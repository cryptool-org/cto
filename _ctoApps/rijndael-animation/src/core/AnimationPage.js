


import {gsap} from "gsap"
import * as PIXI from "pixi.js"

import SpriteBackground from "../components/SpriteBackground"





class AnimationPage extends PIXI.Container{
    constructor(){
        super();
        this.id = null;
   
        this.FADE_IN_DURATION = .0001;
        this.FADE_OUT_DURATION = .00001;
        this.FADE_OUT_DELAY = 3;
        this.autoLabelCounter = 0;

        // body reference for theme colors
        this.bodyReference = document.querySelector("body")

        this.renderedComponents = {}

    
        this.permanentComponents = []
        this.temporaryComponents = []
        this.globalComponents = {}

        // responsives (define ui sizes for differnt screen dimensions )
        this.DEFAULT_RESPONSIVE_LABEL = "default"
        this.responsives = []
        this.responsivesByLabel = {}   

        this.timeline = null;

        this.interactiveChildren = true;   
    }

    addPermanent(obj){
        const objArray = Object.keys(obj).map(key => obj[key])
        this.addChild(...objArray)
        this.permanentComponents = [...this.permanentComponents, ...objArray]
        this.addToGlobalComponents(obj)       
    }

    addTemporary(obj){
        const objArray = Object.keys(obj).map(key => obj[key])
        this.addChild(...objArray)
        this.temporaryComponents = [...this.temporaryComponents, ...objArray]
        this.addToGlobalComponents(obj)
    }


    registerResponsive(label, AnimationPageResponsive){
        if(label !== this.DEFAULT_RESPONSIVE_LABEL) this.responsives.push(label)
        this.responsivesByLabel[label] = new AnimationPageResponsive(label, this)
    }

    initPage(pageID, controller){
        this.id = pageID;
        this.controller = controller;

        if(!this.timeline) throw new Error(`Animation page ${pageID} is missing timeline`);

     

        this.removeChildren();
     
        const defines = this.getDefines();

        this.create(defines)

        this.drawPage(defines)
    }

    redraw(){
        this.removeChild(...this.temporaryComponents)
        this.temporaryComponents = []
        const defines = this.getDefines();
        this.drawPage(defines)
    }

    // override to create graphics
    create(defines){}
    drawPage(defines){}

    createBackground(color){
        const background = new SpriteBackground();
        return background;
    }

    getResponsive(){
        for(let i = 0; i < this.responsives.length; i++){
            const label = this.responsives[i];
            const responsive = this.responsivesByLabel[label]

            if(responsive.evoke(ANIMATION_DIMENSIONS)){
                return responsive;
            }

            // return last as default;
            if(i == this.responsives.length -1) return responsive;
        }

    }

    getDefines(){
      
        const defaultDefines =  this.responsivesByLabel[this.DEFAULT_RESPONSIVE_LABEL] ? this.responsivesByLabel[this.DEFAULT_RESPONSIVE_LABEL].getDefines() : {};
        let defines = {...defaultDefines};

        // find correct responsive
        for(let i = 0; i < this.responsives.length; i++){
            const label = this.responsives[i];
            if(label == this.DEFAULT_RESPONSIVE_LABEL) continue;

            const responsive = this.responsivesByLabel[label]

            if(responsive.evoke(this.controller.ANIMATION_DIMENSIONS)){       
                defines =  {
                    ...defines,
                    ...responsive.getDefines(defines)
                }
            }
        }


        return {...defines, animationDimensions: this.controller.ANIMATION_DIMENSIONS}
    }


    /* replace with responsive tl templates ? (kinda unecessary). Splite Animation & responsives aka defines? */

   


    addToRenderedComponents(obj){
        this.renderedComponents = {...this.renderedComponents, ...obj}
    }

    addToGlobalComponents(obj){
        this.globalComponents = {...this.globalComponents, ...obj}
    }

    getAutoLabel(){      
        this.autoLabelCounter++;
        return `${this.pageID}-label-${this.autoLabelCounter}`
    }

 

    bindPageLocale(key,element){
        this.controller.locale.bindPixiReference(this.id, key, element);
    }

    getColor(name){
        return this.controller.theme.getColor(name)
        //const style = getComputedStyle(this.bodyReference)
        //return PIXI.utils.string2hex(style.getPropertyValue(name).trim())
    }

    hide(){  
        gsap.set(this, {pixi: { alpha: 0, renderable: false}})
    }

    subscribeTo(key, elements){
        this.controller.data.subscribe(key, elements)
    }

    positionComponent(component, componentDefines){
        const defines = {x: 0, y: 0, anchorX: 0, anchorY: 0, ...componentDefines}
        component.positionComponent(defines.x, defines.y, defines.anchorX, defines.anchorY)
    }

    updateFontStyle(textElement, styles){
        const {fontSize, scale, fill, position, anchor} = styles

        if(fontSize) textElement.style.fontSize = fontSize;
        if(scale) textElement.scale.set(scale)
        if(fill){
            let tint = (typeof fill  == "string") ? this.getColor(fill) : fill;
            textElement.tint = tint
        }
        if(position)  textElement.position.set(position.x, position.y)
        if(anchor) textElement.anchor.set(anchor.x, anchor.y)
    }

}


export default AnimationPage