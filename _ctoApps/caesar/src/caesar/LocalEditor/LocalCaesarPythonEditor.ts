/// <reference path="../caesar.js" />

class LocalCaesarPythonEditor extends LocalPythonEditor {

    protected caesar: CaesarController

    constructor(editorElem: HTMLElement, pyodide: any, caesar: CaesarController, callback?: () => void) {
        super(editorElem, pyodide, callback)
        this.caesar = caesar
    }

    protected makeVisible(): void {
        super.makeVisible()
        this.caesar.render() // render Python output into the GUI
    }

    protected getArgsForPyodide(): string[] {

        // escape single quotes and linebreaks in text inputs
        let message = caesar.input.value.replace(/'/g, "'\"'\"'").replace(/\\n/g, "\\\n").replace(/\n/g, "\\n")
        let alphabet = caesar.alphabet.alphabet.replace(/'/g, "'\"'\"'").replace(/\\n/g, "\\\n").replace(/\n/g, "\\n")

        let args = [
            "caesar.py",
            ((!caesar.encrypt.value) ? "--encrypt" : "--decrypt"), // value is negated
            `--key=${caesar.key.value}`,
            `--message=${message}`,
            `--alphabet=${alphabet}`
        ]

        if(caesar.keepChars.value) args.push("--keep-non-alp")
        if(caesar.blocksFive.value) args.push("--blocks-of-five")

        return args

    }

    protected getArgsForGuiCommand(): string[] {

        // todo: implement me :D
        return this.getArgsForPyodide() // this is only temporary ^^

    }

}