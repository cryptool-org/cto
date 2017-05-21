"use strict";

window.addEventListener('load', function() {
    @@include('../common/crypt.js')
    @@include('../common/vigenere.js')
    @@include('../common/multiplikativ.js')
    @@include('../common/base.js')
})

document.getElementById("parameters").appendChild(document.getElementById("dropdown"));