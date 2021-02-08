import React from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


class Stepper extends React.Component {
    handleOnStep = () => {
        console.log('clicked')
    }

    render() {
    return (
        <ProgressBar percent={this.props.percent} width="65%" filledBackground="#0dba0d">
            <Step>
                {({ accomplished}) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished}) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                    </div>
                )}
            </Step>
        </ProgressBar>
    )
    }
}

export default Stepper;