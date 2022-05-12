import React from "react"

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
        onKeyChange: () => alert("no key change handler!")
    }

    state = {
        key: this.props.initialKey
    }

    render() {
        return <Card className="mt-3">
            <Card.Header>
                <FontAwesomeIcon icon={faKey} /> Schlüssel
            </Card.Header>
            <Card.Body>
                <Form.Control as="textarea" rows={2} value={this.state.key}
                    onChange={(e) => this.handleKeyChange(e)} spellCheck={false}
                    isValid={(this.state.key.length > 0)} isInvalid={!(this.state.key.length > 0)} />
            </Card.Body>
        </Card>
    }

    handleKeyChange(event) {
        this.setState({ key: event.target.value }) // update this component
        this.props.onKeyChange(event.target.value) // call props listener
    }

}

export default OptionsKey
