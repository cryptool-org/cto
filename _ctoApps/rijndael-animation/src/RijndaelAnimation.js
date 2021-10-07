import AnimationController from "./core/AnimationController"
import LOCALE from "./languages/index"

import Page1 from "./pages/Page1/Page"
import Page2 from "./pages/Page2/Page"
import Page3 from "./pages/Page3/Page"
import Page4 from "./pages/Page4/Page"
import Page5 from "./pages/Page5/Page"
import Page6 from "./pages/Page6/Page"
import Page7 from "./pages/Page7/Page"
import Page8 from "./pages/Page8/Page"
import Page9 from "./pages/Page9/Page"
import Page10 from "./pages/Page10/Page"
import Page11 from "./pages/Page11/Page"
import Page12 from "./pages/Page12/Page"
import Page13 from "./pages/Page13/Page"
import Page14 from "./pages/Page14/Page"
import Page15 from "./pages/Page15/Page"


const SETTINGS = {
    locale: LOCALE, // object containing english and german language texts
    themes: [
        {name: "default", className: "theme--default", localeKey: "themeOptionDefault"},
        {name: "new", className: "theme--new", localeKey: "themeOptionNew"},
    ],
    iframeContainerID: "test-container"
}



class RijndaelAnimation extends AnimationController {
    constructor(){
        super(SETTINGS)

        console.time("create")
        this.registerAnimationPage(Page1, "page-1")
        this.registerAnimationPage(Page2, "page-2")
        this.registerAnimationPage(Page3, "page-3")
        this.registerAnimationPage(Page4, "page-4")
        this.registerAnimationPage(Page5, "page-5")
        this.registerAnimationPage(Page6, "page-6")
        this.registerAnimationPage(Page7, "page-7")
        this.registerAnimationPage(Page8, "page-8")
        this.registerAnimationPage(Page9, "page-9")
        this.registerAnimationPage(Page10, "page-10")
        this.registerAnimationPage(Page11, "page-11")
        this.registerAnimationPage(Page12, "page-12")
        this.registerAnimationPage(Page13, "page-13")
        this.registerAnimationPage(Page14, "page-14")
        this.registerAnimationPage(Page15, "page-15")
   
 
        this.buildTimeline()

        this.goToFirstPage();

    }
}

export default RijndaelAnimation;