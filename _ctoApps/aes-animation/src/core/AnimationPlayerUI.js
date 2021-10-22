import {debounce} from "../utils/utils"


const CONTAINER_ID = "rijndael-animation-ui"

const PLAY_BTN_ID = "rijndael-animation-play-btn";
const FORWARDS_BTN_ID = "rijndael-animation-jump-forwards";
const BACKWARDS_BTN_ID = "rijndael-animation-jump-backwards";
const SETTINGS_BTN_ID = "rijndael-animation-settings-btn";
const NAVIGATION_BTN_ID = "rijndael-animation-navigation-btn";
const INFO_BTN_ID  = "rijndael-animation-info-btn";
const FORM_BTN_ID = "rijndael-animation-form-btn";
const CLOSE_SETTINGS_BTN_ID = "close-settings-btn"

// overlays
const SETTINGS_OVERLAY_ID = "rijndael-animation-settings-overlay";
const NAVIGATION_OVERLAY_ID =  "rijndael-animation-navigation-overlay";
const INFO_OVERLAY_ID =  "rijndael-animation-info-overlay";
const FORM_OVERLAY_ID=  "rijndael-animation-form-overlay";

const NAVIGATION_CONTAINER_ID = "rijndael-animation-navigation"

const INFO_TEXT_CONTAINER_ID ="rijndael-animation-info"


// form
const LANG_SELECT_INPUT_ID = "rijndael-animation-lang-select";
const THEME_SELECT_INPUT_ID = "rijndael-animation-theme-select";
const JUMP_STEP_INPUT_ID = "rijndael-animation-jump-step-input";
const SPEED_INPUT_ID = "rijndael-animation-speed-select";
const SPEED_OUTPUT_ID = "rijndael-animation-speed-output"


const OVERLAY_CLASS = ".ui-container"


class AnimationPlayerUI{

    constructor(controller){
        this.controller = controller;

        this.mobileOverlays = document.querySelectorAll(OVERLAY_CLASS);

        this.bodyRef = document.querySelector("body")

        this.container = document.getElementById(CONTAINER_ID)

        this.animationSpeed = 1.0;

        this.playBtn = document.getElementById(PLAY_BTN_ID);
        this.forwardsBtn = document.getElementById(FORWARDS_BTN_ID);
        this.backwardsBtn = document.getElementById(BACKWARDS_BTN_ID);
        this.settingsBtn = document.getElementById(SETTINGS_BTN_ID);
        this.infoBtn = document.getElementById(INFO_BTN_ID);
        this.navigationBtn = document.getElementById(NAVIGATION_BTN_ID);
        this.formBtn = document.getElementById(FORM_BTN_ID);
        this.closeSettingsBtn = document.getElementById(CLOSE_SETTINGS_BTN_ID)

        this.navigationOverlay = document.getElementById(NAVIGATION_OVERLAY_ID);
        this.infoOverlay = document.getElementById(INFO_OVERLAY_ID)
        this.formOverlay = document.getElementById(FORM_OVERLAY_ID)
        this.settingsOverlay = document.getElementById(SETTINGS_OVERLAY_ID)

        this.navigationContainer = document.getElementById(NAVIGATION_CONTAINER_ID)
        this.infoContainer = document.getElementById(INFO_TEXT_CONTAINER_ID)

        this.themeSelect = document.getElementById(THEME_SELECT_INPUT_ID)
        this.langSelect = document.getElementById(LANG_SELECT_INPUT_ID)
        this.jumpStepInput = document.getElementById(JUMP_STEP_INPUT_ID)
        this.speedInput = document.getElementById(SPEED_INPUT_ID)
        this.speedOutput = document.getElementById(SPEED_OUTPUT_ID)
        
        this.pageInfoTexts = []

        this.createEventListeners()
    }


    resizeUI(){
      
        if(uiWidth <= 900){
            this.container.style.height = document.body.clientHeight + "px"
        }else{
            this.container.style.height = "auto"
        }
    }


    createEventListeners(){
     
        this.playBtn.addEventListener("click", () => {
            this.hideAllOverlays();
            this.higlightButton()
            
            if(this.controller.timeline.isPaused()){
                this.controller.play();
            }else{
                this.controller.pause();
            }
        })

        this.forwardsBtn.addEventListener("click", () => {
            this.hideAllOverlays();
            this.higlightButton()
            this.controller.timeline.jumpForwards()
        })

        this.backwardsBtn.addEventListener("click", () => {
            this.hideAllOverlays();
            this.higlightButton()
            this.controller.timeline.jumpBackwards()
        })

        this.infoBtn.addEventListener("click", () => {
            this.onOverlayBtnPress(this.infoBtn, this.infoOverlay) 
        });

       
        this.navigationBtn.addEventListener("click", () => {
            this.onOverlayBtnPress(this.navigationBtn, this.navigationOverlay) 
        });

        this.formBtn.addEventListener("click", () => {
            this.onOverlayBtnPress(this.formBtn, this.formOverlay) 
        });

        
        this.settingsBtn.addEventListener("click", () => {
            // hide all overlays
            // hide all button highlights
            // 

            this.onOverlayBtnPress(this.settingsBtn, this.settingsOverlay) 
        
        });

        this.closeSettingsBtn.addEventListener("click", (e) => {
            this.settingsOverlay.classList.remove("ui-container--display")
            this.higlightButton(this.settingsBtn, false)

        })


        this.speedInput.addEventListener("change", (e) => {
            console.log(e.target.value)

            this.animationSpeed = e.target.value / 100;
            
            // update timeline speed
            this.controller.timeline.setTimeScale(this.animationSpeed)
        
        })

        this.speedInput.addEventListener("input", (e) => {
            this.animationSpeed = e.target.value / 100;
            this.speedOutput.innerHTML = `&nbsp;(${this.animationSpeed.toFixed(1)})`;
        })


        this.jumpStepInput.addEventListener("input", (e) => {

            const oldVal = this.controller.timeline.JUMP_STEP;
            var regexp = /^\d(?:[.,]\d)?$/;
            // returns true

            let newVal = e.target.value

            if(newVal == ""){
                this.controller.timeline.setJumpStep(0.5)
                return;
            }

            newVal = parseFloat(newVal)

            if(newVal != 0 && !regexp.test(newVal)){
                e.target.value = oldVal
            }else{
                this.controller.timeline.setJumpStep(newVal)
            }
        })

       
    }




    getMenuItemTemplate = (index) => {
        return `
        <div class="navigation-item tooltip">
            <div class="tooltiptext"></div>
            <div class="navigation-item__number">${index}</div>
            <div class="navigation-item__title"></div>
        </div>
        `
    }


    showPlayIcon(){
        this.playBtn.classList.add("controlls__play-btn--paused")
    }

    showPauseIcon(){
        this.playBtn.classList.remove("controlls__play-btn--paused")
    }




    recreateNavigation(){
        this.navigationContainer.innerHTML = ""

        this.controller.pageIDs.forEach((pageID, pageIndex) => {


            const menuItem = document.createElement("div")
            menuItem.innerHTML = this.getMenuItemTemplate(pageIndex+1).trim();
            const firstChild = menuItem.firstChild;

            this.controller.locale.addLocaleToElement(this.getTitleLangKey(pageID), firstChild.querySelector(".tooltiptext"))
            this.controller.locale.addLocaleToElement(this.getTitleLangKey(pageID), firstChild.querySelector(".navigation-item__title"))
                
            firstChild.addEventListener("click", () => {
               // this.goToPage(pageID)
               
               this.controller.timeline.goToPage(pageID)
               this.hideAllOverlays();
               this.higlightButton()
            })   
          
            this.navigationContainer.appendChild(firstChild)
        })
    }


    getInfoTextTemplate(pageID){
        return `
            <div class="info" id="rijndael-page-info-${pageID}">
                <h3 class="info__title"></h3>
                <div class="info__body"></div>
            </div>
        `
    }

    getTitleLangKey = (pageID) =>  `${pageID}-title`;
    getInfoLangKey = (pageID) =>  `${pageID}-info`;



    addInfoText(pageID, title, text){
        const pageInfo = document.createElement("div")

        pageInfo.innerHTML = this.getInfoTextTemplate(pageID).trim();
        const info = pageInfo.firstChild;

        this.controller.locale.addLocaleToElement(this.getTitleLangKey(pageID), info.querySelector("h3"))
        this.controller.locale.addLocaleToElement(this.getInfoLangKey(pageID), info.querySelector(".info__body"))
       
        this.infoContainer.appendChild(info)
        this.pageInfoTexts.push(info)
    }

    showInfoText(pageID){
        this.pageInfoTexts.forEach((infoText) => {
            if(infoText.id === `rijndael-page-info-${pageID}`){
                infoText.style.display = "block"  
            }else{
                infoText.style.display = "none"
            }           
        })
    }

    //updateCurrentPageInNavigation(pageID){}

    updateCurrentPageUI = debounce((pageID) => {
    
        // update info 
        this.showInfoText(pageID)


        // hightlight current page in navigation
        const menuItems = this.navigationContainer.querySelectorAll(".navigation-item")
        const currentIndex = this.controller.pageIDs.indexOf(pageID)

       

        menuItems.forEach((menuItem, idx) => {       
            if(idx == currentIndex){
                menuItem.classList.add("navigation-item--current")
            }else{
                menuItem.classList.remove("navigation-item--current")
            }
        })
    }, 100)


    // hide overlays & dehighlight buttons
    onOverlayBtnPress(btn, overlay){
        const shouldHighlight = this.toggleOverlays(overlay)

        this.higlightButton(btn, shouldHighlight)
    }

    toggleOverlays(overlayElement){
        let added = null;
        this.mobileOverlays.forEach(overlay => {
            if(overlay !== overlayElement){
                overlay.classList.remove("ui-container--display")
            }else{
                added = overlay.classList.toggle("ui-container--display")
            }
        })
        return added;
    }

   

    hideAllOverlays(){
        this.mobileOverlays.forEach(overlay => overlay.classList.remove("ui-container--display"))
    }

    higlightButton(btn = null, shouldHighlight=false){
        const btns = [this.navigationBtn, this.formBtn, this.infoBtn]

        btns.forEach(b => {
            if(b==btn && shouldHighlight){
                b.classList.add("ui__btn--selected")
            }else{
                b.classList.remove("ui__btn--selected")
            }
        })
    }

}

export default AnimationPlayerUI