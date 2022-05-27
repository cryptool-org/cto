import React from "react"
import { createRoot } from "react-dom/client"

import DefaultGUI from "../../components/DefaultGUI"
import RailfenceComponent from "../railfence/component"

import RedefenceAlgorithm from "./algorithm"

let keys = new Map()
keys.set("rails", { type: "number", caption: "Tiefe", value: 5, isValid: (val) => val > 1 })

keys.set("offset", { type: "number", caption: "Offset", value: 0, 
    isValid: (val) => val < (keys.get("rails").value - 1) * 2 && val >= 0 })

keys.set("order", { type: "text", caption: "Reihenfolge", value: "1 2 3 4 5", 
    isValid: (val) => val.split(" ").length == keys.get("rails").value 
        && val.split(" ").length == [...new Set(val.split(" "))].length 
        && val.split(" ").every(elem => parseInt(elem) > 0 && parseInt(elem) <= keys.get("rails").value) })

createRoot(document.getElementById("react-spawnpoint")).render(
    <DefaultGUI algorithm={RedefenceAlgorithm} initialKey={keys}
                showOpenOptionsModalBtn={true} showKeyOptions={true}
                showAlphabetOptions={true} showIOFormatOptions={true}>
        <RailfenceComponent />
    </DefaultGUI>
)
