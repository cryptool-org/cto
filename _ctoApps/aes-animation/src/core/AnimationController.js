import * as PIXI from "pixi.js"

import {initTexture} from "../components/SpriteBackground"

import AnimationPlayerUI from "./AnimationPlayerUI.js"
import AnimationTimeline from "./AnimationTimeline.js"
import DataController from "./DataController.js"
import LocaleController from "./LocaleController"
import ThemeController from "./ThemeController"
import FormController from "./RijndaelFormController.js"


class AnimationController{

    constructor(settings){

        this.app = null;
        this.settings = settings;
        this.container = document.getElementById("rijndael-animation-screen")


        this.ANIMATION_DIMENSIONS = {
            width: null,
            height: null,
            widthPercent: null,
            heightPercent: null
        }
      

        this.pageIDs = [];
        this.pagesByID = {}
        this.currentPage = null;

        this.isResizing = false;

        this.locale = new LocaleController(this, settings.locale)
        this.theme = new ThemeController(this, settings.themes)
        this.data = new DataController(this)
        this.timeline = new AnimationTimeline(this); 
        this.ui = new AnimationPlayerUI(this);  
        this.form = new FormController(this)


        this.iframeContainer = window.parent.document.getElementById(this.settings.iframeContainerID);

        // add resize event listener
        const onResize = this.onResize.bind(this)
        window.addEventListener("resize", onResize)


        this.app = null;


        this.init();
    }

    
    init(){
        console.log("init")
        // get canvas container dimensions
        this.resizeIFrameContainer();
        this.updateAnimationDimensions();

        // create pixi & canvas
        this.app = new PIXI.Application({
            autoDensity: true,
            resolution: window.devicePixelRatio,
        })

        this.app.renderer.autoResize = true;
       
        const bounds = this.container.getBoundingClientRect();
        this.app.renderer.resize(bounds.width, bounds.height)
        initTexture(this.app.renderer)

        // add stage to canvas
        this.container.appendChild(this.app.view)

       

        // enable touch scaling 
        //this.app.renderer.plugins.interaction.autoPreventDefault = false;
        //this.app.renderer.view.style.touchAction = 'auto';


      

        this.app.stage.interactiveChildren = true;



     
                

        // add on resize event listener
       // window.addEventListener("resize", this.onResize)
    }

    updateAnimationDimensions = () => {
        const containerBounds = this.container.getBoundingClientRect()
        this.ANIMATION_DIMENSIONS.width = containerBounds.width;
        this.ANIMATION_DIMENSIONS.height = containerBounds.height
        this.ANIMATION_DIMENSIONS.widthPercent = containerBounds.width / 100;
        this.ANIMATION_DIMENSIONS.heightPercent = containerBounds.height / 100;
    }

    resizeIFrameContainer(){
        const width = this.iframeContainer.getBoundingClientRect().width;
        if(width <= 900){
            this.iframeContainer.style.height = window.parent.innerHeight + "px";
        }else{
            this.iframeContainer.style.height = document.body.scrollHeight + "px"
        }
    }

    onResize(){
        this.isResizing = true;
        this.resizeIFrameContainer();
        this.updateAnimationDimensions();
        // resize renderer
        this.app.renderer.resize(this.ANIMATION_DIMENSIONS.width, this.ANIMATION_DIMENSIONS.height)

        // do i need to update clamp      
        this.timeline.onResize();
        this.pagesByID[this.currentPage].redraw();
       
    }

    hideCurrentPage(){
        this.pagesByID[this.currentPage].hide();
    }

    hideAllPages(){
        this.pageIDs.map(pageID => {
            const page = this.pagesByID[pageID];
            page.hide();
        })
    }
   

    setCurrentPage(pageID){
        this.currentPage = pageID;
        this.ui.updateCurrentPageUI(pageID)
     
    }

    


    redrawPages(){
    
        this.pageIDs.map(pageID => {
            const page = this.pagesByID[pageID];
            page.redraw();
        })
    }



    play(){
        this.timeline.play()
    }

    pause(){
        this.timeline.pause();
    }

    goToFirstPage(){
        this.timeline.tl.seek(`${this.pageIDs[0]}-animation-main`, false)
    }


    registerAnimationPage(AnimationPageClass, pageID){
       
        const animationPage = new AnimationPageClass() 
      
        animationPage.initPage(pageID, this)
        this.pageIDs.push(pageID)
        this.pagesByID[pageID] = animationPage;

        // hide pages
        animationPage.hide();

        
        this.app.stage.addChild(animationPage)
        this.ui.addInfoText(pageID);

    }


    buildTimeline(){
        // redraw pages
        this.redrawPages();
        this.timeline.createTimeline();
        this.ui.recreateNavigation()
    }

}

export default AnimationController;