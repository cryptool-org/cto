import React from "react"
import { Button } from "react-bootstrap"

class DirectionArrow extends React.Component {

    state = {
        direction: true // true = right or down (desktop or mobile) // false = left or up
    }

    render() {
        return <Col xl={2} 
                className="d-flex flex-column justify-content-center align-items-center"
                style="padding-top: calc(var(--bs-body-line-height) * 1rem + 0.5rem); cursor: pointer;">

            <svg viewBox="0 0 50 50" width="50" height="50" style="transform: rotate(-90deg)">
                <polyline points="0,20 15,20 15,0 35,0 35,20 50,20 25,50" style="fill: #888"></polyline>
            </svg>

            <Button></Button>

        </Col>
    }

}
