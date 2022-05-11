import React from "react"
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

class InputOutputField extends React.Component {

    static defaultProps = {
        ioCaption: "Eingabe / Ausgabe",
        formatted: true,
        onChange: () => { alert("no change handler for io field!") }
    }

    state = {
        activeTab: "rawvalue"
    }

    render() {
        return <Tab.Container activeKey={this.state.activeTab} onSelect={(ek) => this.onTabSelect(ek)}>
            <Card className="my-3">
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
                            <Form.Control as="textarea" rows={4} value={this.props.rawValue} onChange={(e) => this.onRawValueChange(e)} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="formatted">
                            <Form.Control as="textarea" rows={4} value={this.getFormattedValue()} readOnly />
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
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
        return this.props.rawValue.toUpperCase() // todo
    }

}

export default InputOutputField
