"use strict";

class Factorizer {
    constructor(algo, state) {
        this.algo = algo;
        this.state = state;
    }

    initFactorization() {
        this.state.disableInputs();
        this.state.setProgress("${{ base.FACTORIZATION_STARTING }}$", 0);
        this.state.$factorsOutputCard.hide();
    }

    showFactors(numberInput, factors) {
        this.state.setProgress("${{ base.FACTORIZATION_COMPLETED }}$", 1);
        const factorEntries = factors.map(factor => `<li class="list-group-item factor">${factor}</li>`);
        this.state.$factorsOutput.html(factorEntries.join("\n"));
        this.state.$factoredNumber.text(numberInput);
        this.state.$countFactorsFound.text(factorEntries.length);
        this.state.$factorsOutputCard.show();
    }

    factorize(numberInput) {
        try {
            this.initFactorization();
            const promise = this.algo(numberInput, this.state.setProgress);
            promise
                .then(result => this.showFactors(result.numberInput, result.factors))
                .catch(error => {
                    const info = "${{ base.ERROR_MESSAGE }}$";
                    const errorMessage = error.message
                        ? `${info}: ${error.message}`
                        : `${info}!`;
                    this.state.setProgress(errorMessage);
                })
                .finally(() => this.state.enableInputs());
            return promise;
        } catch (e) {
            this.state.enableInputs();
            throw e;
        }
    }
}
