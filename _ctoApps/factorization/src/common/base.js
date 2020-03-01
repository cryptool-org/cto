"use strict";

function hideOutputPanels() {
    $('#status-panel').hide();
    $('#factors-output-panel').hide();
}

hideOutputPanels(); //hide on startup

function onNumberInputChange() {
    hideOutputPanels(); //Hide output panels (if visible) on input change

    let inputEmpty = true;
    if ($('#number-input').val()) {
        inputEmpty = false;
    }
    //Hide "factorize" button if input is empty:
    $('#factorize-button').prop("disabled", inputEmpty);
}

$('#number-input').on('input', function() {
    onNumberInputChange();
});

$('.example-input').on('click', function () {
    const exampleNumber = $(this).text();
    $('#number-input').val(exampleNumber);
    onNumberInputChange();
});

$('#factorize-button').on('click', event => {
    event.preventDefault();
    factorize();
});

const state = new function State() {
    this.$numberInput = $('#number-input');
    this.$exampleInputs = $('.example-input');
    this.$factorizeButton = $('#factorize-button');
    this.$statusPanel = $('#status-panel');
    this.$progressbar = $('#progressbar');
    this.$statusText = $('#status-text');
    this.$factorsOutputPanel = $('#factors-output-panel');
    this.$factorsOutput = $('#factors-output');
    this.$factoredNumber = $('#factored-number');

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