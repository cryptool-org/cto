"use strict";

function hideOutputPanels() {
    jQuery('#status-panel').hide();
    jQuery('#factors-output-panel').hide();
}

hideOutputPanels(); //hide on startup

function setMissingInputNumberInfo() {
    jQuery('#number-input-bits-count-info').html("${{ base.MISSING_INPUT_NUMBER }}$");
}

function setBitCountInfo(numberInputVal) {
    let bitInfo = "${{ base.INVALID_INPUT_NUMBER }}$";
    if (numberInputVal) {
        const bits = getBitCount(numberInputVal);
        if (bits !== null) {
            bitInfo = `${{ base.INPUT_NUMBER_BIT_COUNT_INFO }}$`;
        }
    }

    jQuery('#number-input-bits-count-info').html(bitInfo);
}

setMissingInputNumberInfo();

function onNumberInputChange() {
    hideOutputPanels(); //Hide output panels (if visible) on input change

    let disableFactorizeButton = true;
    const factorizeButton = jQuery('#factorize-button');
    const numberInputVal = jQuery('#number-input').val();
    if (!numberInputVal) {
        setMissingInputNumberInfo();
    } else {
        if (isGreaterThanOne(numberInputVal)) {
            setBitCountInfo(numberInputVal);
            disableFactorizeButton = false;
        } else {
            setBitCountInfo(null);
        }
    }

    factorizeButton.prop("disabled", disableFactorizeButton);
}

jQuery('#number-input').on('input', function () {
    onNumberInputChange();
});

jQuery('#number-input').on('focus', function () {
    state.$factorizationRoot.addClass('input-mode');
});

jQuery('.example-input').on('click', function (event) {
    event.preventDefault();
    const exampleNumber = jQuery(this).text();
    jQuery('#number-input').val(exampleNumber);
    onNumberInputChange();
});

jQuery('#factorize-button').on('click', event => {
    event.preventDefault();
    state.$factorizationRoot.removeClass('input-mode');
    factorize();
});

const state = new function State() {
    this.$numberInput = jQuery('#number-input');
    this.$exampleInputs = jQuery('.example-input');
    this.$factorizeButton = jQuery('#factorize-button');
    this.$progressbar = jQuery('#progressbar');
    this.$statusText = jQuery('#status-text');
    this.$factorsOutputPanel = jQuery('#factors-output-panel');
    this.$factorsOutput = jQuery('#factors-output');
    this.$countFactorsFound = jQuery('#count-factors-found');
    this.$factoredNumber = jQuery('#factored-number');
    this.$statusPanel = jQuery('#status-panel');
    this.$factorizationRoot = jQuery('#factorization-root');

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
            this.$progressbar.css('width', `${progress * 100}%`);
        }
        this.$statusText.html(statusText);
        this.$statusPanel.show();
    };
};

const factorizer = new Factorizer(algo, state);

function factorize() {
    factorizer.factorize(state.$numberInput.val());
}

const parser = new exprEval.Parser({
    operators: {
        add: true,
        concatenate: false,
        conditional: false,
        divide: true,
        factorial: false,
        multiply: true,
        power: true,
        remainder: false,
        subtract: true,
        logical: false,
        comparison: true,
        'in': false,
        assignment: false
    }
});

function getBitCount(numberExpression) {
    try {
        const bitCount = parser.evaluate(`floor(log2(${numberExpression}))+1`);
        if (bitCount < 0) {
            return 0;
        }
        return bitCount;
    } catch (e) {
        return null;
    }
}

function isGreaterThanOne(numberExpression) {
    try {
        //Is evaluated as floating point, therefore test for >= 2:
        return parser.evaluate(`(${numberExpression}) >= 2`);
    } catch (e) {
        return false;
    }
}