/// <reference path="./LocalEditor.ts" />

class LocalPythonEditor extends LocalEditor {

    protected syntaxHightlighting: string = "resources/codemirror/mode/python/python.js"
    protected pyodide: any

    constructor(editorElem: HTMLElement, pyodide: any, callback?: () => void) {

        super(editorElem, "caesar.py")
        this.pyodide = pyodide

        console.log("loading python syntax hightlighting..")

        // @ts-ignore // loadScript() is defined in helperfunctions.js btw
        loadScript(CTO_Globals.pluginRoot + this.syntaxHightlighting, () => {

            console.log("loaded syntax highlighting", this.syntaxHightlighting)
            console.log("initializing python editor")

            super.initializeEditor({
                mode: "python",
                lineNumbers: true,
                theme: "eclipse",
                lineWrapping: true,
                viewportMargin: Infinity,
                scrollbarStyle: "native",
                tabSize: 4,
                indentUnit: 4,
                smartIndent: true,
                extraKeys: {
                    Tab: function (cm) {
                        cm.replaceSelection("    ", "end")
                    },
                },
            })

            this.makeVisible()
            if(callback) callback()

        })

    }

    protected makeVisible(): void {
        this.editorElem.querySelector(".editor-load-animation").remove()
        this.editorElem.querySelector(".editor-command-alert").classList.remove("d-none")
        this.updateGuiCommand() // init command element in GUI
        super.makeVisible()
    }

    public runEditorCode(): string {

        console.log("running python code from editor")

        this.updateGuiCommand()

        try {

            // set command line arguments
            this.pyodide.runPython(
                "import sys\n" +
                "import io\n" +
                "sys.argv = [" +
                    this.getArgsForPyodide().map(arg => `'${arg}'`) +
                "]\n" +
                "sys.stdout = io.StringIO()\n" + // this is used to get the output of the script
                "__name__ = '__main__'\n"
            )

            // execute script from editor
            this.pyodide.runPython(this.editor.getValue())

            // get the output of the script
            let output = this.pyodide.runPython("sys.stdout.getvalue()")
            return output.replace(/\n$/g, "") // remove last linebreak

        }

        catch (e) { return e.message }

    }

    protected getArgsFromGUI(): ArgsFormat {
        console.warn("args from gui were requested, this needs to be overwritten")
        return null
    }

    protected getArgsForPyodide(): string[] {
        console.warn("args for pyodide were requested, this needs to be overwritten")
        return []
    }

    protected getArgsForGuiCommand(): ArgsFormat {
        console.warn("args for gui command were requested, this needs to be overwritten")
        return null
    }

    public updateGuiCommand() {
        console.warn("gui commands were tried to be updated, this needs to be overwritten")
    }

}


interface ArgsFormat {
    message: string,
    alphabet: string,
    key: string | number,
    encrypt: boolean,
    keepChars: boolean,
    blocksFive: boolean
}
