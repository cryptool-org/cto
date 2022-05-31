import React from "react"

import Button from "react-bootstrap/Button"
import Collapse from "react-bootstrap/Collapse"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faRefresh, faChevronUp } from "@fortawesome/free-solid-svg-icons"

import DefaultGUI from "../../components/DefaultGUI"
import { DefaultGUIContext } from "../../components/DefaultGUI"

import LocalPythonEditor from "../../components/LocalPythonEditor"
import CaesarPythonCommandComponent from "./command"

import CaesarAlgorithm from "./algorithm.js"
import CaesarAlgorithmInPython from "./algorithm.py"

let keys = new Map()
keys.set("value", { type: "number", caption: "Shift amount", value: 1, 
    isValid: (val) => parseInt(val) == val })


class CaesarComponent extends React.Component {

    static contextType = DefaultGUIContext
    pyodide // contains the pyodide instance after loading
    downloadFilename = "caesar.py"

    state = {
        usePython: false, // false => uses js
        pythonSource: CaesarAlgorithmInPython,
        pyodideLoading: false, // if pyodide is loading
        pythonReady: false // if pyodide has loaded
    }

    render() {
        return <DefaultGUI algorithm={{ 
                    encrypt: (params) => this.handleEncrypt(params), 
                    decrypt: (params) => this.handleDecrypt(params) }} 
                initialKey={keys} showOpenOptionsModalBtn={true} showKeyOptions={true}
                showAlphabetOptions={true} showIOFormatOptions={true}>

            <Button onClick={(e) => this.handleUsePythonButtonClick(e)} className="mt-4"
                    aria-controls="example-collapse-text" aria-expanded={this.state.usePython}>
                {!this.state.usePython 
                ? (!this.state.pyodideLoading 
                    ? <span><FontAwesomeIcon icon={faPlay} /> Mit Python ausführen</span>
                    : <span><FontAwesomeIcon icon={faRefresh} spin /> Pyodide lädt</span>)
                : <span><FontAwesomeIcon icon={faChevronUp} /> Python Implementierung ausblenden</span>}
            </Button>

            <Collapse in={this.state.usePython}>
                <div id="example-collapse-text">
                    <CaesarPythonCommandComponent />
                    <LocalPythonEditor value={this.state.pythonSource} 
                        onChange={(val) => this.handleEditorValueChange(val)}
                        onRunAgainBtnClick={e => this.handleRunAgainButtonClick(e)} 
                        onResetCodeBtnClick={e => this.handleResetCodeButtonClick(e)}
                        downloadFilename={this.downloadFilename}
                    />
                </div>
            </Collapse>

        </DefaultGUI>
    }

    handleEncrypt({ value, alphabet, key }) {
        if(this.state.usePython) return this.runPythonEditorCodeWithPyodide({ value, alphabet, key, encrypt: true })
        else return CaesarAlgorithm.encrypt({ value, alphabet, key })
    }

    handleDecrypt({ value, alphabet, key }) {
        if(this.state.usePython) return this.runPythonEditorCodeWithPyodide({ value, alphabet, key, encrypt: false })
        else return CaesarAlgorithm.decrypt({ value, alphabet, key })
    }

    async handleUsePythonButtonClick() {
        let newState = { usePython: !this.state.usePython }

        // load pyodide if this is first open
        if(!this.state.pythonReady && !this.state.pyodideLoading) {
            if(!window.loadPyodide) { alert("Error: Pyodide not found!"); return }
            this.setState({ pyodideLoading: true }); this.pyodide = await loadPyodide()
            newState.pythonReady = true; newState.pyodideLoading = false
        }

        this.setState(newState)
        // todo: beim öffnen/schließen manuell den algorithmus ausführen
    }

    handleEditorValueChange(value) {
        this.setState({ usePython: true, pythonSource: value })
    }

    handleRunAgainButtonClick(e) {
        // todo
    }

    handleResetCodeButtonClick(e) {
        this.setState({ pythonSource: CaesarAlgorithmInPython })
    }

    runPythonEditorCodeWithPyodide({ value, alphabet, key, encrypt = true }) {
        try {

            if(!this.state.pythonReady) throw Error("Pyodide not ready yet")
            const pyodideArgs = this.calculatePyodideCommand({ value, alphabet, key, encrypt })

            // set command line arguments for pyodide
            this.pyodide.runPython(
                "import sys, io \n" + 
                "sys.argv = [" + pyodideArgs.map(arg => `'${arg}'`) + "] \n" + 
                "sys.stdout = io.StringIO() \n" // redirect outputs into io buffer
            )

            // execute the actual scripts in the editor
            this.pyodide.runPython(this.state.pythonSource)

            // get the output of the script
            const output = this.pyodide.runPython("sys.stdout.getvalue()"); console.log("output:", output)
            return output.replace(/\n$/g, "") // remove last linebreak

        } catch(e) { console.error(e); return e.message }
    }

    escapeSpecialCharsForPyodide(char) {
        char = String.fromCharCode(char.charCodeAt(0))
        if(char == "'") char = "'\"'\"'"
        if(char == "\n") char = "\\n"
        if(char == "\t") char = "\\t"
        // if(char == "\u") char = "\\u"
        // if(char == "\r") char = "\\r"
        if(char == "\\") char = "\\\\"
        return char
    }

    calculatePyodideCommand({ value, alphabet, key, encrypt = true }) {

        value = Array.from(value).map(char => this.escapeSpecialCharsForPyodide(char)).join("")
        alphabet = Array.from(alphabet).map(char => this.escapeSpecialCharsForPyodide(char)).join("")
        
        return [ this.downloadFilename, ((encrypt) ? "--encrypt" : "--decrypt"),
            `--message=${value}`, `--key=${key}`, `--alphabet=${alphabet}` ]
    }

}

export default CaesarComponent
