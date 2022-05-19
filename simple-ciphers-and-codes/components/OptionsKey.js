import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey } from "@fortawesome/free-solid-svg-icons"

class OptionsKey extends React.Component {

    /**
     * key is initialized by passing props.initialKey
     * it is then managed in the inner state of OptionsKey (this class)
     * when it changes, props.onKeyChange is invoked with the updated key
     */

    static defaultProps = {
        initialKey: "In1tIaLk3y",
        onKeyChange: () => alert("no key change handler!"),
        idPrefix: (Math.random()+1).toString(36).substring(2)
    }

    state = {
        // make key a map to allow multiple values to be passed
        key: (this.props.initialKey instanceof Map) ? this.props.initialKey : new Map(Object.entries(
            { value: { type: typeof this.props.initialKey, value: this.props.initialKey } }))
    }

    // if initialKey is string|number -> use this one
    // if initialKey is map -> use format.. keyId: { type, caption, value }

    render() {
        return <Card className="mt-3">
            <Card.Header>
                <FontAwesomeIcon icon={faKey} /> Schlüssel
            </Card.Header>
            <Card.Body>
                <Row>
                    {Array.from(this.state.key).map(([key, values]) => <Form.Group as={Col}>
                        {values.caption && 
                            <Form.Label htmlFor={this.props.idPrefix + key}>{values.caption}</Form.Label>}
                        <Form.Control 
                            as={(values.type == "string") ? "textarea" : undefined} rows={2} value={values.value} spellCheck={false}
                            id={this.props.idPrefix + key} type={values.type} onChange={(e) => this.handleKeyChange(e, key)}
                            isValid={("" + values.value).length > 0} isInvalid={!(("" + values.value).length > 0)}
                        />
                    </Form.Group>)}
                </Row>
            </Card.Body>
        </Card>
    }

    handleKeyChange(event, key) {
        let keys = this.state.key
        keys.set(key, { ...keys.get(key), value: event.target.value })
        this.setState({ key: keys }, () => this.props.onKeyChange(keys))
    }

}

export default OptionsKey
