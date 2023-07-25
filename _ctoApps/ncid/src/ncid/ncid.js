let architectureSelect = $("#architecture-select")
let analyzeButton = $("#analyze-button")
let filterSelect = $("#filter-select")
let defaultArchitecture = "Transformer"
let host = "/ncidapi" // [dev.]cryptool.org
let acaGroups, lastResults, hasAnalyzed

const onRefresh = () => {
    $("#input-len").html(displaylength($("#input-textarea").val()))
}; onRefresh()

$("#input-textarea").on("input", () => {
    let newInput = $("#input-textarea").val()
    $("#input-len").html(displaylength(newInput))
})

function displaylength(textForLen) {
    len = textForLen.replace(/(\r\n|\n|\r)/gm, "").length
    return "${{ncid.length}}$ " + len.toString()
}

$(function () {
    $('[data-toggle="tooltip-architecture"]').tooltip()
    $('[data-toggle="tooltip-filter"]').tooltip()
    $.get(CTO_Globals.pluginRoot + "aca-groups.json", aca => acaGroups = aca)
})

const parseResponse = (response, successCallback = () => {}) => {

    if(response.success != undefined) {

        if(response.success == true) {
            successCallback(response.payload)
        }

        else {
            // error response from web api
            showErrorAlert({ statusText: "API Error", responseText: response.error_msg })
        }

    }

    else {
        // response.success undefined -> unknown Error
        showErrorResponse({ statusText: "Unknown Error", responseText: "Response undefined" })
    }

}

const showErrorResponse = (error) => {
    console.error(error)

    if(error.responseText == undefined) {
        error.responseText = "Unknown Error, maybe CORS or something ..."
    }

    if(error.statusText != undefined) type = error.statusText
    else type = "Error"

    if(error.responseJSON != undefined && error.responseJSON.error_msg != undefined) {
        error_msg = error.responseJSON.error_msg
    } else if(error.responseText != undefined) {
        error_msg = error.responseText
    } else {
        error_msg = "Unknown Error"
    }

    showErrorAlert(type, error_msg)
}


const showErrorAlert = (type, message) => {
    $("#error-alert-type").text(type)
    $("#error-alert-content").text(message)
    $("#error-alert").removeClass("d-none")
}

const hideErrorAlert = () => {
    $("#error-alert").addClass("d-none")
}
$("#error-alert .close").on("click", hideErrorAlert)


const loadAndShowAvailableArchitectures = () => {

    $.get(host + "/get_available_architectures", {}, response => {

        parseResponse(response, payload => {

            if(typeof payload == "object") {
                architectureSelect.selectpicker()
                let htmlToInsert = ""
                payload.forEach(architecture => {
                    htmlToInsert += `<option value="${architecture}"${(architecture == architecture) ? ' selected' : ''}>${architecture}</option>`
                })

                architectureSelect.html(htmlToInsert)
                architectureSelect.selectpicker('refresh')

            }

            else console.error("payload is not an object")

        })

    }).fail(showErrorResponse)

}

const analyze = () => {

    hideErrorAlert()
    hasAnalyzed = true

    ciphertext = $("#input-textarea").val().toLowerCase()
    ciphertext = ciphertext.replace(/\s+/g, '') // remove spaces
    ciphertext = ciphertext.replace(/\n|\r/g, '') // remove newline
    ciphertext = ciphertext.replace(/[^A-Za-z0-9]/g, '') // remove symbols, which are not a-z,A-Z,0-9

    if(ciphertext.length < 30) {
        showErrorAlert("Error", "${{ ncid.ciphertext_too_short }}$"); return
    }

    if(architectureSelect.val().length == 0) {
        showErrorAlert("Error", "${{ ncid.no_architecture_selected }}$"); return
    }

    $.ajaxSetup({ traditional: true }) // needed for correct array transmission
    $.get(host + "/evaluate/single_line/ciphertext", {
        ciphertext: ciphertext,
        architecture: architectureSelect.val(),
    }, response => {

        parseResponse(response, payload => {
            if(typeof payload == "object") showSingleLineEvaluationResults(payload)
            else console.error("single line evaluation: payload is not an object")
            lastResults = payload
        })

    }).fail(showErrorResponse)

    // todo: animate icon while loading

}

const showSingleLineEvaluationResults = (results) => {

    let container = $("#ncid-results")
    let cipherClasses = {}

    // concat results with aca groups
    for(let architecture in results) {

        // filter lower probabilities
        if(results[architecture] < parseInt(filterSelect.val())) continue

        // fallback for unassigned ciphers
        if(acaGroups.ciphers[architecture] == undefined)
            acaGroups.ciphers[architecture] = {name: architecture, url: "#", class: ["none"]}

        // fallback for ciphers without class
        if((acaGroups.ciphers[architecture].class || []).length == 0
          || !Array.isArray(acaGroups.ciphers[architecture].class))
            acaGroups.ciphers[architecture].class = ["none"]

        // concat objects into cipher object
        let cipher = {...{probability: results[architecture]}, ...acaGroups.ciphers[architecture]}

        // add cipher to all set classes
        cipher.class.forEach(cipherClass => {
            if(!acaGroups.classes[cipherClass]) cipherClass = "none" // fallback
            if(!cipherClasses[cipherClass]) cipherClasses[cipherClass] = []
            cipherClasses[cipherClass].push(cipher)
        })

    }

    // sort ciphers by probability
    let sortedCipherClasses = []
    for(let cipherClass in cipherClasses) {

        let newCipherClassObject = { key: cipherClass, probability: 0, items: [] }

        cipherClasses[cipherClass].forEach(cipher => {
            newCipherClassObject.probability += cipher.probability
            newCipherClassObject.items.push(cipher)
        })

        newCipherClassObject.items = newCipherClassObject.items.sort(
            (a, b) => { return b.probability - a.probability })

        sortedCipherClasses.push(newCipherClassObject)

    }; delete cipherClasses

    // sort cipher classes by probability
    sortedCipherClasses = sortedCipherClasses.sort((a, b) => { return b.probability - a.probability })

    // show cipher classes in html
    let htmlToInsert = ""
    sortedCipherClasses.forEach(cipherClass => {

        let cipherCaption = "${{ncid.cipher}}$"
        let probabilityCaption = "${{ncid.probability}}$"
        let acaClassCaption = (acaGroups.classes[cipherClass.key] || {})[ioApp.lang]

        htmlToInsert += `
            <div class="card my-4 border-0 text-center">
                <div class="card-header bg-dark text-white border">
                    <h5 class="mb-0">${acaClassCaption} <span class="badge badge-secondary">${cipherClass.probability.toFixed(2)}%</span></h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0" style="table-layout: fixed;">
                            <thead>
                                <tr>
                                    <th scope="col">${cipherCaption}</th>
                                    <th scope="col">${probabilityCaption}</th>
                                </tr>
                            </thead>
                            <tbody>
        `

        cipherClass.items.forEach(cipher => {
            if(cipher.url && cipher.url != "#")
                cipher.name = `<a href="${cipher.url}" target="_blank">${cipher.name}</a>`

            htmlToInsert += `
                <tr>
                    <td>${cipher.name}</td>
                    <td>${cipher.probability.toFixed(2)}%</td>
                </tr>
            `
        })

        htmlToInsert += `</tbody></table></div></div></div>`

    })

    if(htmlToInsert == "") htmlToInsert = '<span class="text-muted">${{ ncid.result_no_result }}$</span>'
    container.html(htmlToInsert)

}

// initialize when all contents have been loaded
document.addEventListener("DOMContentLoaded", function() {
    loadAndShowAvailableArchitectures()
})

// add click handlers to analyze
$(analyzeButton).click(analyze)
$(architectureSelect).change(() => { if(hasAnalyzed) analyze() })

// add change handler for filter
$(filterSelect).change(() => { if(lastResults) showSingleLineEvaluationResults(lastResults) })
