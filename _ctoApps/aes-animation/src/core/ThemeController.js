

// high level strucutre
import * as PIXI from "pixi.js"



const THEME_SELECT_ID = "rijndael-animation-theme-select";

class ThemeController{
    constructor(controller, themes){
        this.controller = controller;
        this.themes = themes;

        this.themeContainer = document.querySelector("body");
        this.themeSelect = document.getElementById(THEME_SELECT_ID)

        this.styles = getComputedStyle(this.themeContainer);;
 

        this.currentTheme = themes[0].name
        this.themeContainer.classList.add(themes[0].className)
        this.themesByName = this.themes.reduce((prev, theme) => {
            return {...prev, [theme.name]: theme}
        },{})

        //this.initThemeSelect();
    }

    setTheme(themeName){
        if(themeName == this.currentTheme) return;
        if(!this.isValidTheme(themeName)) return;

        const oldThemeClass = this.themesByName[this.currentTheme].className;
        this.currentTheme = themeName;
        const newThemeClass = this.themesByName[themeName].className

        this.themeContainer.classList.remove(oldThemeClass);
        this.themeContainer.classList.add(newThemeClass);


        this.styles = getComputedStyle(this.themeContainer);

        //redraw & update timeline
        this.controller.timeline.saveAndRebuildTimeline();

    }

    getColor(name){
       // const style = getComputedStyle(this.themeContainer)
        return PIXI.utils.string2hex(this.styles.getPropertyValue(name).trim())
    }

    isValidTheme(themeName){
        return Object.keys(this.themesByName).includes(themeName)
    }


    initThemeSelect(){
        // insert options
        this.themes.map(({name, localeKey}) => {
            const option = document.createElement("option");
            option.value = name;
            option.innerHTML = this.controller.locale.getLocaleText(localeKey)
            option.dataset.lang = localeKey ;

            this.themeSelect.appendChild(option)
        })

        // set selected & add event listener
        this.themeSelect.value = this.currentTheme;
        this.themeSelect.addEventListener("change", (e) => {
            const themeName = e.target.value;
            this.setTheme(themeName)
    
        })
    }


}

export default ThemeController;