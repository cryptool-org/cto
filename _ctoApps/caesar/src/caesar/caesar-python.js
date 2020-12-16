/**
 * Script for the local Python version of Caesar.
 * 
 * Notes:
 * 1) 'caesar' variable is defined in 'caesar.js'
 * 2) input starting with - (hyphens) is not allowed
 *    as it's interpreted as a new console parameter
 *    (only the case for this Python implementation)
 * 3) Linebreaks in input also lead to Python errors
 */


// initialize Python editor
let editor = CodeMirror.fromTextArea(
    document.getElementsByClassName("CodeMirror")[0], {
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
    }
)
editor.setSize("100%", "100%")
$("#caesar-python-local-theme-selector-caption").text(editor.options.theme)

// wait until Python editor is loaded
languagePluginLoader.then(() => {
    $("#caesar-python-local-load-animation").remove()
    $("#caesar-python-local-textarea-wrapper").removeClass("d-none")
    $("#caesar-python-local-command-alert").removeClass("d-none")
    $("#caesar-python-local-ide-options").removeClass("d-none")
    updateLocalPythonCommandInGUI() // init command element
    editor.refresh() // needed for editor to get visible
})

const getLocalPythonCommandLineArguments = () => {

    // if message or alphabet contain ' -> escape it '"'"'
    let message = caesar.input.value.replace(/'/g, "'\"'\"'")
    let alphabet = caesar.alphabet.alphabet.replace(/'/g, "'\"'\"'")

    let args = [
        "caesar.py",
        ((!caesar.encrypt.value) ? "--encrypt" : "--decrypt"), // value is negated
        "--key", caesar.key.value,
        "--message", message,
        "--alphabet", alphabet
    ]

    if(caesar.keepChars.value) args.push("--keep-non-alp")
    if(caesar.blocksFive.value) args.push("--blocks-of-five")

    return args

}

const updateLocalPythonCommandInGUI = () => {

    let cliArgs = getLocalPythonCommandLineArguments()

    const wrapIntoBadgeElem = (string) => {
        return '<div class="badge badge-light">' + string + '</div>'
    }

    const escapeSpecialChars = (string) => {
        return string.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "\\")
    }

    // todo: maybe there is a less hand-picked-indices solution for this?
    cliArgs[1] = wrapIntoBadgeElem(cliArgs[1]) // --encrypt / --decrypt
    cliArgs[2] = wrapIntoBadgeElem(cliArgs[2]) // --key
    cliArgs[4] = wrapIntoBadgeElem(cliArgs[4]) // --message
    cliArgs[5] = "'" + escapeSpecialChars(cliArgs[5]) + "'" // value of --message
    cliArgs[6] = wrapIntoBadgeElem(cliArgs[6]) // --alphabet
    cliArgs[7] = "'" + escapeSpecialChars(cliArgs[7]) + "'" // value of --alphabet
    if(cliArgs[8]) cliArgs[8] = wrapIntoBadgeElem(cliArgs[8])
    if(cliArgs[9]) cliArgs[9] = wrapIntoBadgeElem(cliArgs[9])

    $("#caesar-python-local-command").html("python " + cliArgs.join(" "))

}

const runLocalPythonCode = () => {

    updateLocalPythonCommandInGUI()

    try {

        // set command line arguments
        pyodide.runPython(
            "import sys\n" +
            "import io\n" +
            "sys.argv = [" +
                getLocalPythonCommandLineArguments().map(arg => `'${arg}'`) +
            "]\n" +
            "sys.stdout = io.StringIO()\n" + // this is used to get the output of the script
            "__name__ = '__main__'\n"
        )

        // execute script from editor
        pyodide.runPython(editor.getValue())

        // get the output of the script
        let output = pyodide.runPython("sys.stdout.getvalue()")
        return output

    }

    catch (e) { return e.message }

}


// -- editor customization elements --

// manually run and render local python code
$("#caesar-python-local-run").click(() => {
    caesar.render()
})

// reset editor code (triggers modal dialog)
let initialLocalPythonCode = editor.getValue()
$("#caesar-python-local-reset-code-trigger").click(() => {
    $("#caesar-python-local-reset-code-modal").modal("show")
})
$("#caesar-python-local-reset-code").click(() => {
    editor.setValue(initialLocalPythonCode)
    $("#caesar-python-local-reset-code-modal").modal("hide")
    caesar.render() // re-run the resetted code
})

// download code from editor
$("#caesar-python-local-download-code").click(() => {
    let tmpDlElem = document.createElement("a")
    tmpDlElem.href = "data:attachment/text," + encodeURIComponent(editor.getValue())
    tmpDlElem.target = "_blank"
    tmpDlElem.download = "caesar.py"
    tmpDlElem.click()
})

// select theme for editor
$("#caesar-python-local-theme-selector a.dropdown-item").click(e => {
    editor.setOption("theme", e.target.innerText)
    $("#caesar-python-local-theme-selector-caption").text(editor.options.theme)
})

// select font size for editor
$("#caesar-python-local-editor-font-size input").on("input", e => {
    if(isNaN(e.target.value)) e.target.value = 12 // if not number
    if(e.target.value <= 0) e.target.value = 1
    if(e.target.value > 50) e.target.value = 50
    $(".CodeMirror").css("font-size", e.target.value + "px")
})