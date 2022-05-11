import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import InputOutputField from "./InputOutputField"
import DirectionArrow from "./DirectionArrow"
import OptionsModal from "./OptionsModal"

class DefaultGUI extends React.Component {

    modalObj = undefined

    static defaultProps = {
        algorithm: {
            encrypt: () => "No algorithm defined!",
            decrypt: () => "No algorithm defined!"
        },
        initialCleartext: "The quick brown fox jumps over the lazy dog.",
        cleartextCaption: "Klartext",
        ciphertextCaption: "Geheimtext"
    }
    
    state = {
        encrypt: true, // false => decrypt
        cleartextValue: this.props.initialCleartext,
        ciphertextValue: this.props.algorithm.encrypt(this.props.initialCleartext)
    }

    render() {
        return <div className="container">
            <Row>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.cleartextCaption} rawValue={this.state.cleartextValue} 
                        onChange={(value) => this.onCleartextChange(value)} />
                </Col>
                <Col xl={2}>
                    <DirectionArrow direction={this.state.encrypt} onBtnClick={() => this.onModalBtnClick()} />
                </Col>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.ciphertextCaption} rawValue={this.state.ciphertextValue} 
                        onChange={(value) => this.onCiphertextChange(value)} />
                </Col>
            </Row>
            {this.props.children}
            <OptionsModal onMounted={(modal) => this.modalObj = modal} />
        </div>
    }

    onModalBtnClick() {
        if(this.modalObj != undefined) this.modalObj.handleOpen()
    }

    onCleartextChange(value) {
        this.setState({ encrypt: true, cleartextValue: value,
            ciphertextValue: this.props.algorithm.encrypt(value) })
    }

    onCiphertextChange(value) {
        this.setState({ encrypt: false, ciphertextValue: value,
            cleartextValue: this.props.algorithm.decrypt(value) })
    }

}

export default DefaultGUI
