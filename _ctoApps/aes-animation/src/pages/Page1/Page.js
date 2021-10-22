import AnimationPage from "../../core/AnimationPage.js"
import * as PIXI from "pixi.js"

import Component from "../../components/Component"
import AnimatableText from "../../components/AnimatableText"

import PageTimeline from "./PageTimeline"
import DefaultResponsives from "./Responsives.default"


class Page1 extends AnimationPage{
    constructor(){
        super();

        this.timeline = new PageTimeline(this);
        this.registerResponsive("default", DefaultResponsives) 

        this.FADE_IN_DURATION = .00001;
    }


    

    create(defines){
        const {baseTextStyles} = defines

        const background = this.createBackground();

        const subtitle = new PIXI.Text("test", {fill: 0xffffff, wordWrap: true, wordWrapWidth: 320, fontSize: 22})
        this.bindPageLocale("text", subtitle)

        // create headline text
        const container = new Component();

        const textRijndael = new AnimatableText("Rijndael" ,baseTextStyles)
        this.bindPageLocale("titlePartOne", textRijndael)

        const textCipher = new AnimatableText("Cipher", baseTextStyles)
        this.bindPageLocale("titlePartOne", textRijndael)

        container.addChild(textRijndael, textCipher)


        const introTitle = new PIXI.Text("testeasfdasdf", {fill: 0xffffff, wordWrap: true, wordWrapWidth: 320, fontSize: 30})
        this.bindPageLocale("introTitle", introTitle)
        const introText = new PIXI.Text("test 2", {fill: 0xffffff, wordWrap: true, wordWrapWidth: 300, fontSize: 16})
        this.bindPageLocale("introText", introText)
        const containerIntro = new Component();
        containerIntro.addChild(introText)

       

        //this.addPermanent({background, container})
        this.addToGlobalComponents({textRijndael,textCipher, introTitle, introText})
        this.addPermanent({background, subtitle, container, containerIntro})
    }


    drawPage(defines){

        const {background, container, textCipher, textRijndael, subtitle, containerIntro, introText, introTitle} = this.globalComponents;

        const {backgroundStyles, containerPos} = defines

        // background
        background.redraw({...backgroundStyles, fill: this.getColor("--page-background-alpha")})

        // headline
        textRijndael.redraw();
        textCipher.redraw()

        textRijndael.position.set(container.width / 2, 0)
        textRijndael.pivot.set(textRijndael.width / 2, 0)
        
        textCipher.position.set(container.width / 2, textRijndael.height)
        textCipher.pivot.set(textCipher.width / 2, 0)

        container.position.set(containerPos.x, containerPos.y)
        container.pivot.set(container.width / 2, container.height)



        // subtitle
        const {subtitleStyles} = defines
        this.updateFontStyle(subtitle, subtitleStyles)
        subtitle.position.set(subtitleStyles.position.x, container.y + container.height)

        //intro
        introTitle.position.set(container.width / 2, 0)
        introTitle.pivot.set(introTitle.width / 2, 0)

        introText.position.set(container.width / 2, introTitle.height *2)
        introText.pivot.set(introText.width / 2, 0)

        containerIntro.position.set(containerPos.x, containerPos.y)
        containerIntro.pivot.set(container.width / 2, container.height)

    }
}


export default Page1;