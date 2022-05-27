import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import InputOutputField from "../../components/InputOutputField"

import "./translations"

class RailfenceComponent extends React.Component {

    /**
     * props are inherited from DefaultGUI state
     */

    render() {
        return <Row className="mt-5">
            <Col xs={12}>
                <InputOutputField ioCaption="Jägerzaun" rawValue={this.formatAsRailfence()} formatted={false}
                    rows={(this.props.ciphertext?.railfenceRows || this.props.cleartext?.railfenceRows)?.length} 
                    onChange={() => { /* empty */ }} />
            </Col>
        </Row>
    }

    formatAsRailfence() {
        let rows = this.props.ciphertext?.railfenceRows || this.props.cleartext?.railfenceRows
        if(!rows) return "error: railfenceRows props missing"
        else return rows.join("\n")
    }

}

export default RailfenceComponent
