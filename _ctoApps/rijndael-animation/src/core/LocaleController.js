

const LOCALE_SELECT_ID = "rijndael-animation-lang-select";

class LocaleController{
    constructor(controller, locales){
        this.controller = controller;
        this.localesSelect = document.getElementById(LOCALE_SELECT_ID);

        this.locales = locales;


        // key => [references]
        this.pixiLocalesReferences = {}


        // get page locale from html (<html lang="en">)
        this.currentLocale = this.getCurrentPageLocale(); 

        if(!this.isValidLocaleKey(this.currentLocale)) this.currentLocale = Object.keys(this.locales)[0]
        this.updateHTMLLocale();
        this.initLocalesSelect();
    }


    setLocale(localeKey){
        if(!this.isValidLocaleKey(localeKey)) return;
        this.currentLocale = localeKey;

        this.updatePIXILocale();
        this.updateHTMLLocale();

        // redraw
        this.controller.onResize();

    }

    bindPixiReference(pageID, key, element){
        if(pageID in this.pixiLocalesReferences == false){
            this.pixiLocalesReferences[pageID] = {}
        }



        if(key in this.pixiLocalesReferences[pageID]){
            this.pixiLocalesReferences[pageID][key] = [...this.pixiLocalesReferences[pageID][key], element]
        }else{
            this.pixiLocalesReferences[pageID][key] = [element]
        }
      
        
        const localizedText = this.getCurrentLocaleObj()[pageID][key]
        this.updatePixiElementLocale(element, localizedText)
        
    }

    updatePixiElementLocale(element, text){
        if(element.updateContent){
            element.updateContent(text)
        }else{
            element.text = text;
        }
    }

    updatePIXILocale(){
        // loop through pixi text references and update text

        Object.keys(this.pixiLocalesReferences).forEach((pageID) => {
            const pageLocale = this.pixiLocalesReferences[pageID]
            Object.keys(pageLocale).forEach((localeKey) => {
                const elements = pageLocale[localeKey]
                if(Array.isArray(elements) && elements.length > 0){

                    const localeText = this.getLocalePageText(pageID, localeKey)

                    // update text of elements
                    elements.forEach(element => {
                        this.updatePixiElementLocale(element, localeText)
                    })
                }  
            })       
        })
    }

    updateHTMLLocale(){
        const containers = document.querySelectorAll(".ui > div")
        for(let i = 1; i < containers.length; i++){
            const container = containers[i]
           
            this.updateHTMLLocaleByContainer(container, this.getCurrentLocaleObj())
        } 

        this.updatePixiHTMLLocale()

    }

    updatePixiHTMLLocale(){
        const screen = document.getElementById("rijndael-animation-screen")
        const languageNodes = screen.querySelectorAll("[data-lang]")

        const locale = this.getCurrentLocaleObj()

        languageNodes.forEach(element => {
            const langDataKey = element.dataset["lang"]

            const [pageID, langKey] = langDataKey.split(".")
            console.log(pageID)
            console.log(langKey)
            console.log(locale[pageID][langKey])

            element.innerHTML = locale[pageID][langKey]
        })
    }

    updateHTMLLocaleByContainer(container, locale){
        const languageNodes = container.querySelectorAll("[data-lang]")

        languageNodes.forEach(element => {
            const langDataKey = element.dataset["lang"]
            if(langDataKey in locale){
                element.innerHTML = locale[langDataKey]
            }
        })
    }

    isValidLocaleKey(localeKey){
        return Object.keys(this.locales).includes(localeKey)
    }

    getLocaleText(key){
        return this.getCurrentLocaleObj()[key]
    }

    getLocalePageText(pageID, localeKey){
        return this.getCurrentLocaleObj()[pageID][localeKey];
    }

    getCurrentLocaleObj(){
        return this.locales[this.currentLocale]
    }

    addLocaleToElement(key, element){
        const text = this.getLocaleText(key)
        element.innerHTML = text;
        element.dataset.lang = key
    }

    initLocalesSelect(){
        // insert options
        Object.keys(this.locales).map(localeKey => {
            const option = document.createElement("option");
            option.value = localeKey;
            option.innerHTML = this.getLocaleText(`languageOption${localeKey.toUpperCase()}`)
            option.dataset.lang = `languageOption${localeKey.toUpperCase()}`;

            if(localeKey == this.currentLocale)
                option.selected = true;

            this.localesSelect.appendChild(option)
        })

        // set selected & add event listener
        this.localesSelect.value = this.currentLocale;
        this.localesSelect.addEventListener("change", (e) => {
            const localeKey = e.target.value;
            this.setLocale(localeKey)
        })



    }




    getCurrentPageLocale(){
        return parent.document.documentElement.lang;
    }
}




export default LocaleController;
