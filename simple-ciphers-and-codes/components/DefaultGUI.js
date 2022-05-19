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
        cleartextCaption: "Klartext", ciphertextCaption: "Geheimtext",

        showKeyOptions: true,
        initialKey: OptionsKey.defaultProps.initialKey,
        onOptionsKeyChange: () => {},

        showAlphabetOptions: true,
        initialAlphabet: OptionsAlphabet.defaultProps.initialAlphabet,
        onOptionsAlphabetChange: () => {},

        showIOFormatOptions: true,
        initialFormat: OptionsFormat.defaultProps.initialFormat,
        onOptionsFormatChange: () => {},

        showOpenOptionsModalBtn: true
    }
    
    state = {
        encrypt: true, // false => decrypt
        alphabet: this.props.initialAlphabet, 
        key: this.props.initialKey,
        cleartextValue: this.props.initialCleartext,
        ciphertextValue: this.props.algorithm.encrypt({ value: this.props.initialCleartext, 
            alphabet: this.props.initialAlphabet, key: this.props.initialKey }),
        inputOutputFormat: this.props.initialFormat,
        showOpenOptionsModalBtn: this.props.showOpenOptionsModalBtn
    }

    render() {
        return <>
            <Row>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.cleartextCaption} rawValue={this.state.cleartextValue} 
                        formatted={this.props.showIOFormatOptions} format={this.state.inputOutputFormat} alphabet={this.state.alphabet} 
                        onChange={(value) => this.handleCleartextChange(value)} />
                </Col>
                <Col xl={2}>
                    <DirectionArrow direction={this.state.encrypt} showBtn={this.state.showOpenOptionsModalBtn} 
                        onBtnClick={() => this.handleModalBtnClick()} onArrowClick={() => this.setState({ encrypt: !this.state.encrypt })} />
                </Col>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.ciphertextCaption} rawValue={this.state.ciphertextValue} 
                        formatted={this.props.showIOFormatOptions} format={this.state.inputOutputFormat} alphabet={this.state.alphabet} 
                        onChange={(value) => this.handleCiphertextChange(value)} />
                </Col>
            </Row>

            { React.Children.map(this.props.children, child => React.cloneElement(child, this.state)) }
            
            <OptionsModal onMounted={(modal) => this.modalObj = modal} 
                    onPin={() => this.setState({ showOpenOptionsModalBtn: false })}
                    onUnpin={() => this.setState({ showOpenOptionsModalBtn: true })}>

                {this.props.showKeyOptions &&
                <OptionsKey initialKey={this.state.key} onKeyChange={(key) => this.handleOptionsKeyChange(key)} />}

                {this.props.showAlphabetOptions &&
                <OptionsAlphabet initialAlphabet={this.state.alphabet} initialCheckboxes={["uppercase", "lowercase"]} 
                    onAlphabetChange={(alphabet) => this.handleOptionsAlphabetChange(alphabet)} />}

                {this.props.showIOFormatOptions &&
                <OptionsFormat initialFormat={this.state.format} 
                    onFormatChange={(format) => this.handleOptionsFormatChange(format)} />}

            </OptionsModal>
        </>
    }

    handleModalBtnClick() {
        if(this.modalObj != undefined) this.modalObj.handleOpen()
    }

    handleCleartextChange(value) {
        this.setState({ encrypt: true, cleartextValue: value, ciphertextValue: 
            this.props.algorithm.encrypt({ value, alphabet: this.state.alphabet, key: this.state.key }) })
    }

    handleCiphertextChange(value) {
        this.setState({ encrypt: false, ciphertextValue: value, cleartextValue: 
            this.props.algorithm.decrypt({ value, alphabet: this.state.alphabet, key: this.state.key }) })
    }

    handleOptionsKeyChange(value) {
        let params = { alphabet: this.state.alphabet, key: value }, newState = { key: value }
        if(this.state.encrypt == true) {
            params.value = this.state.cleartextValue
            newState.ciphertextValue = this.props.algorithm.encrypt(params)
        }
        if(this.state.encrypt == false) {
            params.value = this.state.ciphertextValue
            newState.cleartextValue = this.props.algorithm.decrypt(params)
        }
        this.setState(newState, () => this.props.onOptionsKeyChange(value))
    }

    handleOptionsAlphabetChange(value) {
        let params = { alphabet: value, key: this.state.key }, newState = { alphabet: value }
        if(this.state.encrypt == true) {
            params.value = this.state.cleartextValue
            newState.ciphertextValue = this.props.algorithm.encrypt(params)
        }
        if(this.state.encrypt == false) {
            params.value = this.state.ciphertextValue
            newState.cleartextValue = this.props.algorithm.decrypt(params)
        }
        this.setState(newState, () => this.props.onOptionsAlphabetChange(value))
    }

    handleOptionsFormatChange(value) {
        this.setState({ inputOutputFormat: value }, () => this.props.onOptionsFormatChange(value))
    }

}

export default DefaultGUI
