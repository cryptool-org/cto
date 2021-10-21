
//import {ANIMATION_DIMENSIONS} from "./AnimationController"



import {gsap} from "gsap"

class AnimationPageResponsives{

    constructor(label, page){
        this.label = label;
        this.page = page;


        this.FADE_OUT_DELAY = 3;
        this.FADE_OUT_DURATION = .0001;
        this.FADE_IN_DURATION = .0001;

       
    }

    getColor(name){
        return this.page.getColor(name)
    }

    c(name){
        return this.page.getColor(name)
    }

    evoke(pageDimensions){   
        return false;
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
                this.controller.setCurrentPage(this.id)
            },
            onReverseComplete: () => {
                if(prevPageID) this.controller.setCurrentPage(prevPageID)
            }
        })
        tl.to(obj, {val: 1, duration: .0001})
        return tl;
    }
 

}


export default AnimationPageResponsives;