/// <reference path="../caesar.js" />
/// <reference path="./LocalEditor.ts" />
/// <reference path="./LocalPythonEditor.ts" />

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

    protected getArgsFromGUI(): ArgsFormat {
        return {
            message: this.caesar.input.value,
            alphabet: this.caesar.alphabet.alphabet,
            key: caesar.key.value,
            encrypt: !this.caesar.encrypt.value, // value is negated
            keepChars: this.caesar.keepChars.value,
            blocksFive: this.caesar.blocksFive.value
        }
    }

    protected getArgsForPyodide(): string[] {

        let args = this.getArgsFromGUI()

        const escapeSpecialChars = (char: String) => {
            char = String.fromCharCode(char.charCodeAt(0))
            if(char == "'") char = "'\"'\"'"
            if(char == "\n") char = "\\n"
            if(char == "\t") char = "\\t"
            // if(char == "\u") char = "\\u"
            // if(char == "\r") char = "\\r"
            if(char == "\\") char = "\\\\"
            return char
        }

        let message = ""
        for(let i = 0; i < args.message.length; i++)
            message += escapeSpecialChars(args.message[i])
        console.log("message:", message)

        let alphabet = ""
        for(let i = 0; i < args.alphabet.length; i++)
            alphabet += escapeSpecialChars(args.alphabet[i])
        console.log("alphabet:", alphabet)

        let params = [
            "caesar.py",
            ((args.encrypt) ? "--encrypt" : "--decrypt"),
            `--key=${args.key}`,
            `--message=${message}`,
            `--alphabet=${alphabet}`
        ]

        if(caesar.keepChars.value) params.push("--keep-non-alp")
        if(caesar.blocksFive.value) params.push("--blocks-of-five")

        return params

    }

    protected getArgsForGuiCommand(): ArgsFormat {

        const escapeSpecialChars = (string: string) => {
            return string.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "\\").replace(/\n/g, "<br>").replace(/'/g, "'\"'\"'")
        }

        let args = this.getArgsFromGUI()

        args.key = escapeSpecialChars(args.key.toString())
        args.message = escapeSpecialChars(args.message)
        args.alphabet = escapeSpecialChars(args.alphabet)

        return args

    }

    public updateGuiCommand(): void {

        let args = this.getArgsForGuiCommand()

        let params = [
            "caesar.py",
            ((args.encrypt) ? "--encrypt" : "--decrypt"),
            `--key=${args.key}`,
            `--message='${args.message}'`,
            `--alphabet='${args.alphabet}'`
        ]

        if(caesar.keepChars.value) params.push("--keep-non-alp")
        if(caesar.blocksFive.value) params.push("--blocks-of-five")

        // params.join(" ").replace(/(--[\w-]+)/g, '<span class="d-inline-block">$1</span>')
        this.editorElem.querySelector(".editor-command").innerHTML = "python " + params.join(" ")

    }

    public runEditorCode(): string {
        let output = super.runEditorCode();
        (<HTMLTextAreaElement> document.querySelector("#caesar-output")).value = output
        return output
    }

}
