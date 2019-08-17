"use strict";

window.addEventListener('load', function() {
    @@include('./barcodeutilities.js');
    @@include('./barcodegenerator.js');
});

window.onload = function() {
    BarcodeStandardChange();
};

function BarcodeStandardChange() {
    var barcodeStandard = document.getElementById("BarcodeStandard").value;
    if(BarcodeStandardSet(barcodeStandard) === false) {
        BarcodeDetailsSet("${{ barcode.DETAILS_INVALID }}$");
    }
    else {
        if(barcodeStandard === "CODABAR") {
            BarcodeDetailsSet("${{ barcode.DETAILS_CODABAR }}$");
            BarcodeDataSet("123");
        }
        else if(barcodeStandard === "CODE128") {
            BarcodeDetailsSet("${{ barcode.DETAILS_CODE128 }}$");
            BarcodeDataSet("123ABCabc");
        }
        else if(barcodeStandard === "CODE39") {
            BarcodeDetailsSet("${{ barcode.DETAILS_CODE39 }}$");
            BarcodeDataSet("123ABC");
        }
        else if(barcodeStandard === "EAN13") {
            BarcodeDetailsSet("${{ barcode.DETAILS_EAN13 }}$");
            BarcodeDataSet("123456123456");
        }
        else if(barcodeStandard === "EAN8") {
            BarcodeDetailsSet("${{ barcode.DETAILS_EAN8 }}$");
            BarcodeDataSet("1234567");
        }
        else if(barcodeStandard === "UPC") {
            BarcodeDetailsSet("${{ barcode.DETAILS_UPC }}$");
            BarcodeDataSet("01234512345");
        }
        else {
            BarcodeDetailsSet(barcodeStandard);
        }
    }
    document.getElementById("BarcodeImage").style.visibility = "hidden";
}

function BarcodeDataChange() {
    var barcodeResult = document.getElementById("BarcodeResult")
    barcodeResult.innerHTML = "<font color='#000000'>${{ barcode.CONTENT_RESULT_DEFAULT }}$</font>"
}

function BarcodeDataSet(_data) {
    var barcodeData = document.getElementById("BarcodeData");
    barcodeData.value = _data;
}

function BarcodeGenerate() {
    var barcodeStandard = document.getElementById("BarcodeStandard").value;
    var barcodeData = document.getElementById("BarcodeData").value;
    JsBarcode("#BarcodeImage", barcodeData, { format: barcodeStandard, valid: BarcodeImageValid });
}
 
function BarcodeDetailsSet(_details) {
    var barcodeDetails = document.getElementById("BarcodeDetails");
    barcodeDetails.innerHTML = _details;
}

function BarcodeImageValid(_valid) {
    document.getElementById("BarcodeImage").style.visibility = _valid ? "visible" : "hidden";
    document.getElementById("BarcodeResult").innerHTML = _valid ? "<font color='#005000'>${{ barcode.CONTENT_RESULT_SUCCESS }}$</font>" : "<font color='#800000'>${{ barcode.CONTENT_RESULT_FAIL }}$</font>"
}
