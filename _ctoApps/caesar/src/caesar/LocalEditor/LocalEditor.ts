/// <reference path="../../../node_modules/@types/codemirror/index.d.ts" />

class LocalEditor {

    protected editor: CodeMirror.Editor
    protected editorElem: HTMLElement

    protected initialCode: string
    protected downloadFilename: string

    constructor(editorElem: HTMLElement, downloadFilename: string = "code.txt") {
        this.editorElem = editorElem; this.downloadFilename = downloadFilename
    }

    public initializeEditor(editorConfig: CodeMirror.EditorConfiguration, callback?: () => void): CodeMirror.Editor {

        // initialize editor object
        this.editor = CodeMirror.fromTextArea(
            this.editorElem.querySelector(".CodeMirror"), editorConfig
        ); this.editor.setSize("100%", "100%");
        
        // initialize elems below editor
        this.initializeCustomizationElements()

        if(callback) callback()
        return this.editor

    }

    protected makeVisible(): void {
        this.editorElem.querySelector(".editor-textarea-wrapper").classList.remove("d-none")
        this.editorElem.querySelector(".editor-options").classList.remove("d-none")
        this.editor.refresh() // needed for editor to get visible
    }

    protected runEditorCode(): void {
        console.log("running the editors code was demanded, this needs to be overwritten")
    }

    protected initializeCustomizationElements() {

        console.log("initializing editor elements")
        
        // manually run and render local python code
        this.editorElem.querySelector(".editor-run").addEventListener("click", () => {
            this.runEditorCode()
        })

        // reset editor code (triggers modal dialog)
        this.initialCode = this.editor.getValue()
        this.editorElem.querySelector(".editor-reset-code-trigger").addEventListener("click", () => {
            ($(this.editorElem.querySelector(".editor-reset-code-modal")) as any).modal("show")
        })
        this.editorElem.querySelector(".editor-reset-code").addEventListener("click", () => {
            this.editor.setValue(this.initialCode);
            ($(this.editorElem.querySelector(".editor-reset-code-modal")) as any).modal("hide")
            this.runEditorCode()
        })

        // download code from editor
        this.editorElem.querySelector(".editor-download-code").addEventListener("click", () => {
            let tmpDlElem = document.createElement("a")
            tmpDlElem.href = "data:attachment/text," + encodeURIComponent(this.editor.getValue())
            tmpDlElem.target = "_blank"
            tmpDlElem.download = this.downloadFilename
            tmpDlElem.click()
        })

        // select theme for editor
        this.editorElem.querySelectorAll(".editor-theme-selector a.dropdown-item").forEach(elem => {
            elem.addEventListener("click", e => {
                this.editor.setOption("theme", (<HTMLElement>e.target).innerText)
                this.showThemeNameInControls()
            })
        }); this.showThemeNameInControls()

        // select font size for editor
        this.editorElem.querySelector(".editor-font-size").addEventListener("input", e => {
            let target = <HTMLInputElement> e.target
            let value = parseInt(target.value)
            if(isNaN(value)) target.value = "12" // if not number
            if(value <= 0) target.value = "1"
            if(value > 50) target.value = "50"
            this.editorElem.querySelectorAll(".CodeMirror").forEach(elem => {
                (<HTMLElement> elem).style.fontSize = value + "px"
            })
        })

    }

    protected showThemeNameInControls() {
        (<HTMLElement>this.editorElem.querySelector(".editor-theme-selector-caption"))
            .innerText = this.editor.getOption("theme")
    }

}