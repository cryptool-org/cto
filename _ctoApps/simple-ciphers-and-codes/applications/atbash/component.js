import React from "react"
import InputOutputField from "../../components/InputOutputField"

class ATBASH extends React.Component {

    render() {
        return <>
            <InputOutputField ioCaption="Klartext" />

            <InputOutputField ioCaption="Geheimtext" />
        </>
    }

    // onCleartextChange
    // onCiphertextChange

}

export default ATBASH
