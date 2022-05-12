import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import InputOutputField from "./InputOutputField"
import DirectionArrow from "./DirectionArrow"
import OptionsModal from "./OptionsModal"
import OptionsAlphabet from "./OptionsAlphabet"
import OptionsKey from "./OptionsKey"
import OptionsFormat from "./OptionsFormat"

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
        alphabet: OptionsAlphabet.defaultProps.initialAlphabet, 
        key: OptionsKey.defaultProps.initialKey,
        cleartextValue: this.props.initialCleartext,
        ciphertextValue: this.props.algorithm.encrypt(this.props.initialCleartext),
        inputOutputFormat: OptionsFormat.defaultProps.initialFormat,
        showOpenOptionsModalBtn: true
    }

    render() {
        return <>
            <Row>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.cleartextCaption} rawValue={this.state.cleartextValue} 
                        format={this.state.inputOutputFormat} alphabet={this.state.alphabet} 
                        onChange={(value) => this.handleCleartextChange(value)} />
                </Col>
                <Col xl={2}>
                    <DirectionArrow direction={this.state.encrypt} showBtn={this.state.showOpenOptionsModalBtn} 
                        onBtnClick={() => this.handleModalBtnClick()} onArrowClick={() => this.setState({ encrypt: !this.state.encrypt })} />
                </Col>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.ciphertextCaption} rawValue={this.state.ciphertextValue} 
                        format={this.state.inputOutputFormat} alphabet={this.state.alphabet} 
                        onChange={(value) => this.handleCiphertextChange(value)} />
                </Col>
            </Row>
            {this.props.children}
            <OptionsModal onMounted={(modal) => this.modalObj = modal} 
                    onPin={() => this.setState({ showOpenOptionsModalBtn: false })}
                    onUnpin={() => this.setState({ showOpenOptionsModalBtn: true })}>

                <OptionsKey initialKey={this.state.key} onKeyChange={(key) => this.setState({ key: key })} />
                <OptionsAlphabet initialAlphabet={this.state.alphabet} initialCheckboxes={["uppercase", "lowercase"]} 
                    onAlphabetChange={(alphabet) => this.setState({ alphabet: alphabet })} />
                <OptionsFormat initialFormat={this.state.format} onFormatChange={(format) => this.setState({ inputOutputFormat: format })} />

            </OptionsModal>
        </>
    }

    handleModalBtnClick() {
        if(this.modalObj != undefined) this.modalObj.handleOpen()
    }

    handleCleartextChange(value) {
        this.setState({ encrypt: true, cleartextValue: value,
            ciphertextValue: this.props.algorithm.encrypt(value) })
    }

    handleCiphertextChange(value) {
        this.setState({ encrypt: false, ciphertextValue: value,
            cleartextValue: this.props.algorithm.decrypt(value) })
    }

}

export default DefaultGUI
