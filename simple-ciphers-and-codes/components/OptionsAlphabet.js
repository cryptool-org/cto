import React from "react"

import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFont } from "@fortawesome/free-solid-svg-icons"

class OptionsAlphabet extends React.Component {

    /**
     * alphabet is initialized by passing props.initialAlphabet
     * it is then managed in the inner state of OptionsAlphabet (this class)
     * when it changes, props.onAlphabetChange is invoked with the updated alphabet
     */

    static defaultProps = {
        initialAlphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        initialCheckboxes: ["uppercase", "lowercase"],
        onAlphabetChange: () => alert("no alphabet change handler!"),
        idPrefix: (Math.random()+1).toString(36).substring(2)
    }

    state = {
        alphabet: this.props.initialAlphabet,
        checkboxes: Object.assign({}, ...this.props.initialCheckboxes.map(key => ({[key]: true})))
    }

    render() {
        return <Card className="mt-3">
            <Card.Header>
                <FontAwesomeIcon icon={faFont} /> Alphabet definieren
            </Card.Header>
            <Card.Body>
                <div className="mb-2">
                    <Form.Control as="textarea" rows={2} value={this.state.alphabet} readOnly={!this.state.checkboxes.freestyle}
                        onChange={(e) => this.handleFreestyleChange(e)} spellCheck={false}
                        isValid={(this.state.alphabet.length > 0)} isInvalid={!(this.state.alphabet.length > 0)} />
                </div>
                <div>
                    <Form.Check id={this.props.idPrefix + "freestyle"} data-key="freestyle" label="Freihand" inline 
                        checked={this.state.checkboxes.freestyle} onChange={(e) => this.handleCheckboxChange(e)} />

                    <Form.Check id={this.props.idPrefix + "uppercase"} data-key="uppercase" label="Großbuchstaben" inline 
                        checked={this.state.checkboxes.uppercase} onChange={(e) => this.handleCheckboxChange(e)} />

                    <Form.Check id={this.props.idPrefix + "lowercase"} data-key="lowercase" label="Kleinbuchstaben" inline 
                        checked={this.state.checkboxes.lowercase} onChange={(e) => this.handleCheckboxChange(e)} />

                    <Form.Check id={this.props.idPrefix + "digits"} data-key="digits" label="Ziffern" inline 
                        checked={this.state.checkboxes.digits} onChange={(e) => this.handleCheckboxChange(e)} />

                    <Form.Check id={this.props.idPrefix + "punctuation"} data-key="punctuation" label="Satzzeichen" inline 
                        checked={this.state.checkboxes.punctuation} onChange={(e) => this.handleCheckboxChange(e)} />

                    <Form.Check id={this.props.idPrefix + "umlauts"} data-key="umlauts" label="Umlaute" inline 
                        checked={this.state.checkboxes.umlauts} onChange={(e) => this.handleCheckboxChange(e)} />
                        
                    <Form.Check id={this.props.idPrefix + "blanks"} data-key="blanks" label="Leerzeichen" inline 
                        checked={this.state.checkboxes.blanks} onChange={(e) => this.handleCheckboxChange(e)} />
                </div>
            </Card.Body>
        </Card>
    }

    handleFreestyleChange(event) {
        if(!this.state.checkboxes.freestyle) return false
        this.setState({ alphabet: event.target.value }) // update this component
        this.props.onAlphabetChange(event.target.value) // call props listener
    }

    handleCheckboxChange(event) {

        const checkboxKey = event.target.dataset.key

        // merge changed checkbox state into the previous state
        let checkboxStates = {...this.state.checkboxes, ...{[checkboxKey]: event.target.checked}}

        // reset all other checkboxes if "freestyle" was chosen
        if(checkboxKey == "freestyle") checkboxStates = { freestyle: true, uppercase: false, 
            lowercase: false, digits: false, punctuation: false, umlauts: false, blanks: false }
        
        // reset freestyle if another was chosen
        else checkboxStates.freestyle = false

        // define alphabet based on checkboxes
        let alphabet = (checkboxStates.freestyle) ? this.state.alphabet : ""
        if(checkboxStates.uppercase)    alphabet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if(checkboxStates.lowercase)    alphabet += "abcdefghijklmnopqrstuvwxyz"
        if(checkboxStates.digits)       alphabet += "0123456789"
        if(checkboxStates.punctuation)  alphabet += ".,:;!?()"
        if(checkboxStates.umlauts)      alphabet += "ÄÖÜäöüß"
        if(checkboxStates.blanks)       alphabet += " "

        // update this component
        this.setState({ alphabet: alphabet, checkboxes: checkboxStates })
        this.props.onAlphabetChange(alphabet) // call props listener
    }

}

export default OptionsAlphabet
