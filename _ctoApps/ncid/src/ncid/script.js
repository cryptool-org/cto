let architectureSelect = $("#architecture-select")
let filterSelect = $("#filter-select")
let defaultArchitecture = "Transformer"
let host = "https://dev.cryptool.org/ncidapi"

const onRefresh = () => {
    $("#input-len").html(displaylength($("#input-textarea").val()));
};

onRefresh();

$("#input-textarea").on("input", () => {
    let newInput = $("#input-textarea").val();
    $("#input-len").html(displaylength(newInput));
  });

  function displaylength(textForLen) {
    len = textForLen.replace(/(\r\n|\n|\r)/gm, "").length;
    return ${{ncid.length}}$ + len.toString();
  }

    $(function () {
        $('[data-toggle="tooltip-architecture"]').tooltip()
        $('[data-toggle="tooltip-filter"]').tooltip()
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
    
        if(error.statusText != undefined) {
            type = error.statusText
        } else {
            type = "Error"
        }
    
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
    
                console.log(payload)
    
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
    
        $("#analyze-button").click(function(e) {
          
            hideErrorAlert()
            ciphertext = $("#input-textarea").val()
            ciphertext = ciphertext.toLowerCase()
            //remove spaces
            ciphertext = ciphertext.replace(/\s+/g, '')
            //remove newline
            ciphertext = ciphertext.replace(/\n|\r/g, '')
            //remove symbols, which are not a-z,A-Z
            ciphertext = ciphertext.replace(/[^A-Za-z]/g, '')
            
            if(ciphertext.length <30){
                showErrorAlert("Error","Der Geheimtext ist zu kurz! (Mindestens 30 Zeichen)")
                return;
            }

            /*
            $.get(host + "/filter_ciphertext", {
                ciphertext: ciphertext,
            }, response => {
    
                parseResponse(response, payload => {
                    console.log(payload)
                })
    
            }).fail(showErrorResponse)
            */
            // todo: Use cipherImplementations.Cipher.filter() method to filter input
    
            $.get(host + "/evaluate/single_line/ciphertext", {
                ciphertext: ciphertext,
                architecture: architectureSelect.val()[0] // todo: send all selected elems
            }, response => {
    
                parseResponse(response, payload => {
                    if(typeof payload == "object") showSingleLineEvaluationResults(payload)
                    else console.error("single line evaluation: payload is not an object")
                })
    
            }).fail(showErrorResponse)
    
            // todo: animate icon while loading
            
        })
    
        const showSingleLineEvaluationResults = (results) => {
    
            let container = $("#results-card")
    
            // sort cipher probabilties
            let probabilties = []
            for (let architecture in results)
                probabilties.push([architecture, results[architecture]])
            probabilties = probabilties.sort((a, b) => { return b[1] - a[1] })
    
            let htmlToInsert = `
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">${{ncid.cipher}}$</th>
                                <th scope="col">${{ncid.probability}}$</th>
                            </tr>
                        </thead>
                        <tbody>
            `
            let rowCount = 0

            probabilties.forEach(cipher => {
                if(cipher[1]>filterSelect.val()){
                rowCount+=1
                htmlToInsert += `
                    <tr>
                        <td>${cipher[0]}</td>
                        <td>${cipher[1].toFixed(2)}%</td>
                    </tr>
                `
                }
            })
            htmlToInsert += `</tbody></table></div>`
            container.html(htmlToInsert)

            $("#result-view").removeClass("d-none")
            if(filterSelect.val() == 0){
                $("#result-view-p").html(${{ncid.result_no_filter}}$)
            }else{
                $("#result-view-p").html(${{ncid.result_filter}}$)
            }
    
        }
    
        // initialize when all contents have been loaded
        document.addEventListener("DOMContentLoaded", function() {
            loadAndShowAvailableArchitectures()
        })

