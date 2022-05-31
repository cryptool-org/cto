import React from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import InputOutputField from "./InputOutputField"
import DirectionArrow from "./DirectionArrow"
import OptionsModal from "./OptionsModal"
import OptionsAlphabet from "./OptionsAlphabet"
import OptionsKey from "./OptionsKey"
import OptionsFormat from "./OptionsFormat"

export const DefaultGUIContext = React.createContext()

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
        cleartext: this.props.initialCleartext,
        ciphertext: "", // -> componentDidMount
        inputOutputFormat: this.props.initialFormat,
        showOpenOptionsModalBtn: this.props.showOpenOptionsModalBtn
    }

    componentDidMount() {
        // encrypt first time when component has initialized
        this.handleCleartextChange(this.props.initialCleartext)
    }

    render() {
        return <>
            <Row>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.cleartextCaption} rawValue={getReturnValueHelper(this.state.cleartext)} 
                        formatted={this.props.showIOFormatOptions} format={this.state.inputOutputFormat} alphabet={this.state.alphabet} 
                        onChange={(value) => this.handleCleartextChange(value)} />
                </Col>
                <Col xl={2}>
                    <DirectionArrow direction={this.state.encrypt} showBtn={this.state.showOpenOptionsModalBtn} 
                        onBtnClick={() => this.handleModalBtnClick()} onArrowClick={() => this.setState({ encrypt: !this.state.encrypt })} />
                </Col>
                <Col xl={5}>
                    <InputOutputField ioCaption={this.props.ciphertextCaption} rawValue={getReturnValueHelper(this.state.ciphertext)} 
                        formatted={this.props.showIOFormatOptions} format={this.state.inputOutputFormat} alphabet={this.state.alphabet} 
                        onChange={(value) => this.handleCiphertextChange(value)} />
                </Col>
            </Row>

            <DefaultGUIContext.Provider value={this.state}>
                {this.props.children}
            </DefaultGUIContext.Provider>
            
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
        // todo: check if everything is valid? :D
        let key = getKeyMapDefaultKey(this.state.key)
        let encryption = this.props.algorithm.encrypt({ value, alphabet: this.state.alphabet, key: key })
        this.setState({ encrypt: true, cleartext: value, ciphertext: encryption })
    }

    handleCiphertextChange(value) {
        let key = getKeyMapDefaultKey(this.state.key)
        let decryption = this.props.algorithm.decrypt({ value, alphabet: this.state.alphabet, key: key })
        this.setState({ encrypt: false, ciphertext: value, cleartext: decryption })
    }

    handleOptionsKeyChange(value) {
        let params = { alphabet: this.state.alphabet, key: value }, newState = { key: value }
        if(this.state.encrypt == true) {
            params.value = getReturnValueHelper(this.state.cleartext)
            newState.ciphertext = this.props.algorithm.encrypt(params)
        }
        if(this.state.encrypt == false) {
            params.value = getReturnValueHelper(this.state.ciphertext)
            newState.cleartext = this.props.algorithm.decrypt(params)
        }
        this.setState(newState, () => this.props.onOptionsKeyChange(value))
    }

    handleOptionsAlphabetChange(value) {
        let params = { alphabet: value, key: this.state.key }, newState = { alphabet: value }
        if(this.state.encrypt == true) {
            params.value = getReturnValueHelper(this.state.cleartext)
            newState.ciphertext = this.props.algorithm.encrypt(params)
        }
        if(this.state.encrypt == false) {
            params.value = getReturnValueHelper(this.state.ciphertext)
            newState.cleartext = this.props.algorithm.decrypt(params)
        }
        this.setState(newState, () => this.props.onOptionsAlphabetChange(value))
    }

    handleOptionsFormatChange(value) {
        this.setState({ inputOutputFormat: value }, () => this.props.onOptionsFormatChange(value))
    }

}

// sometimes algorithms return a string, sometimes an object (containing meta info like interim results)
// but the gui needs a string, so here we map to the default object return property "value" if it exists
const getReturnValueHelper = (clearOrCipherTextObject) => {
    if(clearOrCipherTextObject.hasOwnProperty("value")) return clearOrCipherTextObject.value
    else return (clearOrCipherTextObject || "").toString()
}

// sometimes algorithms have multiple key parameters and sometimes only one. both will be organized using 
// a map. if the entry "value" is set (which is the default), we will return the direct value instead of map
const getKeyMapDefaultKey = (keyMap) => {
    if(keyMap.size == 1 && keyMap.has("value")) return keyMap.get("value").value
    else return keyMap
}

export default DefaultGUI
