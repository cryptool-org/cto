import React from "react"

import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"

class InputOutputField extends React.Component {

    static defaultProps = {
        ioCaption: "Eingabe / Ausgabe",
        formatted: true,
        onChange: () => { alert("no change handler for io field!") },
        alphabet: "" // should be overwritten by apps using an alphabet
    }

    state = {
        activeTab: "rawvalue"
    }

    render() {
        let formattedValue = this.getFormattedValue()
        return <Tab.Container activeKey={this.state.activeTab} onSelect={(ek) => this.onTabSelect(ek)}>
            <Card>
                <Card.Header>
                    <Nav className="flex-column flex-md-row" variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="rawvalue">{this.props.ioCaption}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="formatted">Formatted</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Tab.Content>
                        <Tab.Pane eventKey="rawvalue">
                            <Form.Control as="textarea" rows={4} value={this.props.rawValue} onChange={(e) => this.onRawValueChange(e)} spellCheck={false}
                                isValid={(this.props.rawValue.length > 0)} isInvalid={!(this.props.rawValue.length > 0)} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="formatted">
                            <Form.Control as="textarea" rows={4} value={formattedValue} readOnly spellCheck={false} 
                                isValid={(formattedValue.length > 0)} isInvalid={!(formattedValue.length > 0)} />
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-end">
                    <Button variant="secondary" className="badge bg-secondary" onClick={() => navigator.clipboard.writeText((() => {
                            switch(this.state.activeTab) {
                                case "rawvalue": return this.props.rawValue
                                case "formatted": return formattedValue
                                default: return 0
                            }
                        })())}>
                        <FontAwesomeIcon icon={faCopy} /> Kopieren
                    </Button>
                    <div className="text-end small text-muted">Länge: {(() => {
                        switch(this.state.activeTab) {
                            case "rawvalue": return this.props.rawValue.length
                            case "formatted": return formattedValue.length
                            default: return 0
                        }
                    })()}</div>
                </Card.Footer>
            </Card>
        </Tab.Container>
    }

    onTabSelect(eventKey) {
        this.setState({ activeTab: eventKey })
    }

    onRawValueChange(event) {
        this.props.onChange(event.target.value)
    }

    getFormattedValue() {
        let value = this.props.rawValue
        let alphabet = this.props.alphabet
        let format = this.props.format

        // todo: this is "show only alphabet chars". this should be "also show non alp chars"
        if(format.keepnonalp) value = Array.from(value).filter(c => alphabet.includes(c)).join("") || ""

        // todo: might add more formaters here

        // this should always be last
        if(format.fiveblocks) value = value.match(/.{1,5}/g)?.join(" ") || ""
        return value.toString()
    }

}

export default InputOutputField
