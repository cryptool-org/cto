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

    protected getArgsForPyodide(): string[] {
        console.log("args for pyodide were requested, this needs to be overwritten")
        return []
    }

    protected getArgsForGuiCommand(): string[] {
        console.log("args for gui command were requested, this needs to be overwritten")
        return []
    }

    public updateGuiCommand() {

        // todo: überarbeiten lol :D

        let cliArgs = this.getArgsForGuiCommand()

        const escapeSpecialChars = (string) => {
            return string.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "\\")
        }

        cliArgs[2] = escapeSpecialChars(cliArgs[2]) // --key
        cliArgs[3] = "--message='" + escapeSpecialChars(cliArgs[3].replace("--message=", "")) + "'"
        cliArgs[4] = "--alphabet='" + escapeSpecialChars(cliArgs[4].replace("--alphabet=", "")) + "'"

        this.editorElem.querySelector(".editor-command").innerHTML = "python " + cliArgs.join(" ")

    }

}