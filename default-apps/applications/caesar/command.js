import React from "react"

import Alert from "react-bootstrap/Alert"

import { DefaultGUIContext } from "../../components/DefaultGUI"

class CaesarPythonCommandComponent extends React.Component {

    static contextType = DefaultGUIContext

    render() {
        return <Alert variant="dark" className="my-4">
            <b>Konsolen-Befehl:</b> <span className="font-monospace">{this.calculateCommand()}</span>
        </Alert>
    }

    escapeSpecialChars(string) {
        string = "" + string // make me string
        return string.replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/\\/g, "\\").replace(/\n/g, "<br>").replace(/'/g, "'\"'\"'")
    }

    calculateCommand() {
        const message = this.context.encrypt ? this.context.cleartext : this.context.ciphertext
        return "python caesar.py " 
            + (this.context.encrypt ? "--encrypt" : "--decrypt") 
            + ` --message='${this.escapeSpecialChars(message)}'`
            + ` --key='${this.escapeSpecialChars(this.context.key)}'`
            + ` --alphabet='${this.escapeSpecialChars(this.context.alphabet)}'`
    }

}

export default CaesarPythonCommandComponent
