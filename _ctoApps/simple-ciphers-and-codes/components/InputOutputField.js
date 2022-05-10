import React from "react"
import { Tab, Tabs } from "react-bootstrap"

class InputOutputField extends React.Component {

    props = {
        ioCaption: "Eingabe / Ausgabe",
        formatted: true,
        onChange: () => {}
    }

    state = {
        activeTab: "inputoutput"
    }

    render() {
        return <Tabs variant="pills" activeKey={this.state.activeTab} onSelect={k => this.setState({ activeTab: k })}>

            <Tab eventKey="inputoutput" title={this.props.ioCaption}>

                Hallo Welt Hier die Eingabe
                textarea mit this.props.onChange

            </Tab>

            {this.props.formatted && <Tab eventKey="formatted">
                Hallo Welt hier formatiert
            </Tab>}

        </Tabs>
    }
}

export default InputOutputField
