import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import InputOutputField from "../../components/InputOutputField"
import { DefaultGUIContext } from "../../components/DefaultGUI"

import "./translations"

class RailfenceComponent extends React.Component {

    static contextType = DefaultGUIContext

    render() {
        return <Row className="mt-5">
            <Col xs={12}>
                <InputOutputField ioCaption="Jägerzaun" rawValue={this.formatAsRailfence()} formatted={false}
                    rows={(this.context.ciphertext?.railfenceRows || this.context.cleartext?.railfenceRows)?.length} 
                    onChange={() => { /* empty */ }} />
            </Col>
        </Row>
    }

    formatAsRailfence() {
        let rows = this.context.ciphertext?.railfenceRows || this.context.cleartext?.railfenceRows
        if(!rows) return "error: railfenceRows props missing"
        else return rows.join("\n")
    }

}

export default RailfenceComponent
