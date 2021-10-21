import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";

import {gsap} from "gsap"

import RijndaelAnimation from "./RijndaelAnimation";

import * as PIXI from "pixi.js";

import "./styles/main.scss"


window.addEventListener("load",function(){
    gsap.registerPlugin(MotionPathPlugin, PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    new RijndaelAnimation(); 
},false);

