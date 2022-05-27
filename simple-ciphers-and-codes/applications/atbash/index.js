import React from "react"
import { createRoot } from "react-dom/client"

import DefaultGUI from "../../components/DefaultGUI"

import AtbashAlgorithm from "./algorithm"
import "./translations"

createRoot(document.getElementById("react-spawnpoint")).render(
    <DefaultGUI algorithm={AtbashAlgorithm} showOpenOptionsModalBtn={false} />
)
