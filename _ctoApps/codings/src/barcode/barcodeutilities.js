"use strict";

function BarcodeStandardSet(_barcodeStandard) {
    switch(_barcodeStandard) {
        case "CODABAR":
            return true;
        case "CODE128":
            return true;
        case "CODE39":
            return true;
        case "EAN13":
            return true;
        case "EAN8":
            return true;
        case "UPC":
            return true;
        default:
            break;
    }
    return false;
}
