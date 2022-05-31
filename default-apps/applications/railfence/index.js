import React from "react"
import { createRoot } from "react-dom/client"

import DefaultGUI from "../../components/DefaultGUI"

import RailfenceAlgorithm from "./algorithm"
import RailfenceComponent from "./component"

let keys = new Map()
keys.set("rails", { type: "number", caption: "Tiefe", value: 5, isValid: (val) => val > 1 })
keys.set("offset", { type: "number", caption: "Offset", value: 0, isValid: (val) => val < (keys.get("rails").value - 1) * 2 && val >= 0 })

createRoot(document.getElementById("react-spawnpoint")).render(
    <DefaultGUI algorithm={RailfenceAlgorithm} initialKey={keys}
                showOpenOptionsModalBtn={true} showKeyOptions={true}
                showAlphabetOptions={true} showIOFormatOptions={true}>
        <RailfenceComponent />
    </DefaultGUI>
)
