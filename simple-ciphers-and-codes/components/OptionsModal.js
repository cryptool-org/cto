import React from "react"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faScrewdriverWrench, faCheck, faTableColumns, faWindowRestore } from "@fortawesome/free-solid-svg-icons"

class OptionsModal extends React.Component {

    modalRef = React.createRef()

    static defaultProps = {
        title: "Einstellungen",
        onPin: () => {}, onUnpin: () => {}
    }

    state = {
        shown: false,
        pinned: false
    }

    componentDidMount() {
        // pass `this` to upper component (for btn trigger)
        if(this.props.onMounted) this.props.onMounted(this)
    }

    render() {
        return <Modal ref={this.modalRef} show={this.state.shown} onHide={() => this.handleClose()} backdrop={false}
                enforceFocus={false} dialogClassName="modal-lg modal-dialog-centered modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon={faScrewdriverWrench} /> {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p>Hier können Sie die Parameter des Algorithmus einstellen. Änderungen werden sofort wirksam.</p>

                {this.props.children}

            </Modal.Body>
            <Modal.Footer>
                {this.state.pinned == false && <Button variant="primary" className="flex-fill" 
                        onClick={() => this.handleClose()}>
                    <FontAwesomeIcon icon={faCheck} /> Ok
                </Button>}
                {this.state.pinned == false && <Button variant="secondary" className="flex-fill" 
                        onClick={() => this.handlePin()}>
                    <FontAwesomeIcon icon={faTableColumns} /> Fixieren
                </Button>}
                {this.state.pinned == true && <Button variant="primary" className="flex-fill" 
                        onClick={() => this.handleUnpin()}>
                    <FontAwesomeIcon icon={faWindowRestore} /> Fixierung lösen
                </Button>}
            </Modal.Footer>
        </Modal>
    }

    handleOpen = () => this.setState({ shown: true })

    handleClose = () => {
        if(this.state.pinned) this.handleUnpin()
        else this.setState({ shown: false })
    }

    handlePin = () => {

        // call CTO system to pin the options modal
        window.CTO_Globals?.syscalls?.sidebar?.pinOptionsModal?.(this.modalRef.current.dialog)

        // update this component
        this.setState({ shown: true, pinned: true }, this.props.onPin)
    }

    handleUnpin = () => {

        // instantly hide modal (display will be reset by opening the modal again)
        this.modalRef.current.dialog.style.setProperty("display", "none", "important")

        // call CTO system to unpin the options modal
        window.CTO_Globals?.syscalls?.sidebar?.unpinOptionsModal?.()

        // update this component
        this.setState({ shown: false, pinned: false }, this.props.onUnpin)
    }

}

export default OptionsModal
