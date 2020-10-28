"use strict";

exports.create = () => ({
    $numberInput: { val: () => (this.testInputNumber) },
    $factorsOutput: {},
    $factorsOutputCard: { hide: () => {} },
    $factoredNumber: {},
    setTestInput: number => {
        this.testInputNumber = number;
    },
    setState: () => {},
    setProgress: () => {},
    disableInputs: () => {},
    enableInputs: () => {}    
});
