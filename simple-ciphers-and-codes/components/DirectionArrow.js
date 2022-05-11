import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Button from "react-bootstrap/Button"

class DirectionArrow extends React.Component {

    static defaultProps = {
        direction: true, // true = right or down (desktop or mobile) // false = left or up
        onBtnClick: () => alert("no button click handler!")
    }

    render() {
        return <div className="h-100 d-flex flex-column justify-content-center align-items-center">

            <svg viewBox="0 0 50 50" width="50" height="50" style={{transform: "rotate(-" + (this.props.direction ? "90" : "270") + "deg)"}}>
                <polyline points="0,20 15,20 15,0 35,0 35,20 50,20 25,50" style={{fill: "#888"}}></polyline>
            </svg>

            <Button variant="primary" size="sm" className="mt-3 text-nowrap" onClick={() => this.props.onBtnClick()}>
                <FontAwesomeIcon icon={["fas", "fa-screwdriver-wrench"]} />Einstellungen
            </Button>

        </div>
    }

}

export default DirectionArrow
