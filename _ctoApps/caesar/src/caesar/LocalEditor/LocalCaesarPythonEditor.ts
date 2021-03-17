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

        // escape single quotes and linebreaks in text inputs
        args.message  =  args.message.replace(/'/g, "'\"'\"'").replace(/\\n/g, "\\\n").replace(/\n/g, "\\n")
        args.alphabet = args.alphabet.replace(/'/g, "'\"'\"'").replace(/\\n/g, "\\\n").replace(/\n/g, "\\n")

        // escape last backslash in message if there is any (would break params otherwise)
        if(args.message.charAt(args.message.length - 1) == "\\") args.message = args.message.slice(0, -1) + "\\\\"

        let params = [
            "caesar.py",
            ((args.encrypt) ? "--encrypt" : "--decrypt"),
            `--key=${args.key}`,
            `--message=${args.message}`,
            `--alphabet=${args.alphabet}`
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

    public updateGuiCommand() {

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

        this.editorElem.querySelector(".editor-command").innerHTML = "python " + params.join(" ")

    }

}
