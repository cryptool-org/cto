import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Button, Modal } from "react-bootstrap"

class OptionsModal extends React.Component {

    props = {
        title: "Einstellungen"
    }

    state = {
        shown: false,
        pinned: false
    }

    render() {
        return <Modal show={this.state.shown} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon={["fas", "screwdriver-wrench"]} /> {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                Hallo Welt ich bin ein Modal :D

            </Modal.Body>
            <Modal.Footer>
                {this.state.pinned == false && <Button variant="primary" onClick={() => this.handleClose()}>
                    <FontAwesomeIcon icon={["fas", "check"]} /> Ok
                </Button>}
                {this.state.pinned == false && <Button variant="secondary" onClick={() => this.handlePin()}>
                    <FontAwesomeIcon icon={["fas", "table-columns"]} /> Fixieren
                </Button>}
                {this.state.pinned == true && <Button variant="secondary" onClick={() => this.handleUnpin()}>
                    <FontAwesomeIcon icon={["fas", "window-restore"]} /> Fixierung lösen
                </Button>}
            </Modal.Footer>
        </Modal>
    }

    handleOpen = () => this.setState({ shown: true })
    handleClose = () => this.setState({ shown: false })

    handlePin = () => this.setState({ pinned: true })
    handleUnpin = () => this.setState({ pinned: false })

}

export default OptionsModal
