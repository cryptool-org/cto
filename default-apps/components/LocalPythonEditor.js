import React from "react"

import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faUndo, faDownload } from "@fortawesome/free-solid-svg-icons"

import Button from "react-bootstrap/Button"

class LocalPythonEditor extends React.Component {

    static defaultProps = {
        value: "Error: Props 'value' is missing", downloadFilename: "script.py", height: 300, 
        onChange: (val) => {}, onRunAgainBtnClick: () => {}, onResetCodeBtnClick: () => {}
    }

    render() {
        return <>

            <div>
                <Button variant="success" onClick={e => this.props.onRunAgainBtnClick(e)}>
                    <FontAwesomeIcon icon={faPlay} /> Erneut ausführen
                </Button>
                <Button variant="dark" onClick={e => this.props.onResetCodeBtnClick(e)}>
                    <FontAwesomeIcon icon={faUndo} /> Code zurücksetzen
                </Button>
                <Button variant="info" onClick={e => this.handleDownloadCodeBtnClick(e)}>
                    <FontAwesomeIcon icon={faDownload} /> Code herunterladen
                </Button>
            </div>

            <CodeMirror 
                value={this.props.value}
                extensions={[python().language]}
                onChange={this.props.onChange}
                theme="dark"
            />

        </>
    }

    handleDownloadCodeBtnClick(e) {
        let tmpDlElem = document.createElement("a")
            tmpDlElem.href = "data:attachment/text," + encodeURIComponent(this.props.value)
            tmpDlElem.target = "_blank"
            tmpDlElem.download = this.props.downloadFilename
            tmpDlElem.click()
    }

}

export default LocalPythonEditor
