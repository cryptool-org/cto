import React from "react"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import Button from "react-bootstrap/Button"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons"

import "./DirectionArrow.css"

class DirectionArrow extends React.Component {

    static defaultProps = {
        direction: true, // true = right or down (desktop or mobile) // false = left or up
        onBtnClick: () => alert("no button click handler!"),
        onArrowClick: () => alert("no arrow click handler!")
    }

    render() {
        return <div className={(this.props.direction ? "flip" : "flop") + " direction-arrow h-100 d-flex flex-row flex-xl-column justify-content-center align-items-center p-3"}>

            <OverlayTrigger overlay={<Tooltip>Type to change direction</Tooltip>}>

                <svg viewBox="0 0 50 50" width="50" height="50" onClick={() => this.props.onArrowClick()}>
                    <polyline points="0,20 15,20 15,0 35,0 35,20 50,20 25,50" style={{fill: "#888"}}></polyline>
                </svg>

            </OverlayTrigger>

            <Button variant="primary" size="sm" onClick={() => this.props.onBtnClick()}
                    className={"ms-3 ms-xl-0 mt-xl-3 text-nowrap" + (this.props.showBtn ? "" : " d-none") }>
                <FontAwesomeIcon icon={faScrewdriverWrench} /> Einstellungen
            </Button>

        </div>
    }

}

export default DirectionArrow
