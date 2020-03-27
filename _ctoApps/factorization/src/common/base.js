"use strict";

function hideOutputPanels() {
    jQuery('#status-panel').hide();
    jQuery('#factors-output-panel').hide();
}

hideOutputPanels(); //hide on startup

function setBitCountInfo(numberInputVal) {
    let bitInfo = "${{ base.MISSING_INPUT_NUMBER }}$";
    if (numberInputVal) {
        const bits = getBitCount(numberInputVal);
        if (bits !== null) {
            bitInfo = `${{ base.INPUT_NUMBER_BIT_COUNT_INFO }}$`;
        }
    }
    
    jQuery('#number-input-bits-count-info').html(bitInfo);
}

setBitCountInfo(null);

function onNumberInputChange() {
    hideOutputPanels(); //Hide output panels (if visible) on input change

    let inputEmpty = true;
    const numberInputVal = jQuery('#number-input').val();
    if (numberInputVal) {
        inputEmpty = false;
    }
    setBitCountInfo(numberInputVal);

    //Hide "factorize" button if input is empty:
    jQuery('#factorize-button').prop("disabled", inputEmpty);
}

jQuery('#number-input').on('input', function() {
    onNumberInputChange();
});

jQuery('.example-input').on('click', function (event) {
    event.preventDefault();
    const exampleNumber = jQuery(this).text();
    jQuery('#number-input').val(exampleNumber);
    onNumberInputChange();
});

jQuery('#factorize-button').on('click', event => {
    event.preventDefault();
    factorize();
});

const state = new function State() {
    this.$numberInput = jQuery('#number-input');
    this.$exampleInputs = jQuery('.example-input');
    this.$factorizeButton = jQuery('#factorize-button');
    this.$statusPanel = jQuery('#status-panel');
    this.$progressbar = jQuery('#progressbar');
    this.$statusText = jQuery('#status-text');
    this.$factorsOutputPanel = jQuery('#factors-output-panel');
    this.$factorsOutput = jQuery('#factors-output');
    this.$factoredNumber = jQuery('#factored-number');

    this.disableInputs = () => {
        this.$factorizeButton.prop("disabled", true);
        this.$numberInput.prop("disabled", true);
        this.$exampleInputs.addClass("disabled");
    };

    this.enableInputs = () => {
        this.$factorizeButton.prop("disabled", false);
        this.$numberInput.prop("disabled", false);
        this.$exampleInputs.removeClass("disabled");
    };

    this.setProgress = (statusText, progress) => {
        if (progress) {
            this.$progressbar.css('width', `${progress*100}%`);
        }
        this.$statusText.html(statusText);
        this.$statusPanel.show();
    };
};

const factorizer = new Factorizer(algo, state);

function factorize() {
    factorizer.factorize(state.$numberInput.val());
}

function getBitCount(numberExpression) {
    try {
        const parser = exprEval.Parser;
        const bitCount = parser.evaluate(`floor(log2(${numberExpression}))+1`);
        if (bitCount < 0) {
            return 0;
        }
        return bitCount;
    } catch (e) {
        return null;
    }
}
