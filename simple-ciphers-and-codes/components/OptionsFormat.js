import React from "react"

import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHighlighter } from "@fortawesome/free-solid-svg-icons"

class OptionsFormat extends React.Component {

    /**
     * format is initialized by passing props.initialFormat
     * it is then managed in the inner state of OptionsFormat (this class)
     * when it changes, props.onFormatChange is invoked with the updated format
     */

    static defaultProps = {
        initialFormat: { fiveblocks: true, alpcharsonly: false },
        onFormatChange: () => alert("no format change handler!"),
        idPrefix: (Math.random()+1).toString(36).substring(2)
    }

    state = {
        removeblanks: this.props.initialFormat.removeblanks,
        fiveblocks: this.props.initialFormat.fiveblocks,
        alpcharsonly: this.props.initialFormat.alpcharsonly,
        convtoupper: this.props.initialFormat.convtoupper
    }

    render() {
        return <Card className="mt-3">
            <Card.Header>
                <FontAwesomeIcon icon={faHighlighter} /> Ausgabe formatieren
            </Card.Header>
            <Card.Body>
                <Form.Check id={this.props.idPrefix + "removeblanks"} data-key="removeblanks" label="Leerzeichen rausfiltern" inline 
                    checked={this.state.removeblanks} onChange={(e) => this.handleCheckboxChange(e)} />
                <Form.Check id={this.props.idPrefix + "fiveblocks"} data-key="fiveblocks" label="In 5er-Blöcken anzeigen" inline 
                    checked={this.state.fiveblocks} onChange={(e) => this.handleCheckboxChange(e)} />
                <Form.Check id={this.props.idPrefix + "alpcharsonly"} data-key="alpcharsonly" label="Auf Alphabet-Zeichen filtern" inline 
                    checked={this.state.alpcharsonly} onChange={(e) => this.handleCheckboxChange(e)} />
                <Form.Check id={this.props.idPrefix + "convtoupper"} data-key="convtoupper" label="In Großbuchstaben umwandeln" inline 
                    checked={this.state.convtoupper} onChange={(e) => this.handleCheckboxChange(e)} />
            </Card.Body>
        </Card>
    }

    handleCheckboxChange(event) {
        const checkboxKey = event.target.dataset.key
        let updatedState = {...this.state, ...{[checkboxKey]: event.target.checked}}
        this.setState(updatedState) // update this component
        this.props.onFormatChange(updatedState) // call props listener
    }

}

export default OptionsFormat
