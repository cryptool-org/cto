"use strict";

window.addEventListener('load', function() {
    @@include('../common/base.js')
    @@include('./barcodeutilities.js')
    @@include('./barcodegenerator.js')
})

function BarcodeStandardChange() {
    var barcodeStandard = document.getElementById("BarcodeStandard").value;
    if(BarcodeStandardSet(barcodeStandard) === false) {
        BarcodeDetailsSet("The chosen barcode standard is invalid.");
    }
    else {
        if(barcodeStandard === "CODABAR") {
            BarcodeDetailsSet("${{ barcode.DETAILS_CODABAR }}$");
        }
        else if(barcodeStandard === "CODE128") {
            BarcodeDetailsSet("${{ barcode.DETAILS_CODE128 }}$");
        }
        else if(barcodeStandard === "CODE39") {
            BarcodeDetailsSet("${{ barcode.DETAILS_CODE39 }}$");
        }
        else if(barcodeStandard === "EAN13") {
            BarcodeDetailsSet("${{ barcode.DETAILS_EAN13 }}$");
        }
        else if(barcodeStandard === "EAN8") {
            BarcodeDetailsSet("${{ barcode.DETAILS_EAN8 }}$");
        }
        else if(barcodeStandard === "UPC") {
            BarcodeDetailsSet("${{ barcode.DETAILS_UPC }}$");
        }
        else {
            BarcodeDetailsSet(barcodeStandard);
        }
    }
    document.getElementById("BarcodeImage").style.visibility = "hidden";
}

function BarcodeGenerate() {
    var barcodeStandard = document.getElementById("BarcodeStandard").value;
    var barcodeData = document.getElementById("BarcodeData").value;
    JsBarcode("#BarcodeImage", barcodeData, { format: barcodeStandard, valid: BarcodeImageValid });
}
 
function BarcodeDetailsSet(_details) {
    document.getElementById("BarcodeDetails").innerHTML = _details;
}

function BarcodeImageValid(_valid) {
    document.getElementById("BarcodeImage").style.visibility = _valid ? "visible" : "hidden";
}
