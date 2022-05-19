import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import InputOutputField from "../../components/InputOutputField"

import "./translations"

class RailfenceComponent extends React.Component {

    render() {
        return <Row className="mt-5">
            <Col xs={12}>
                <InputOutputField ioCaption="Jägerzaun" rawValue={this.formatAsRailfence()} 
                    formatted={false} onChange={() => { /* empty */ }} />
            </Col>
        </Row>
    }

    formatAsRailfence() {
        return "todoooo :D  " + JSON.stringify(this.props.key)
    }

}

export default RailfenceComponent
