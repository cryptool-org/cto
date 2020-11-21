let twoCompl = false;
let chosenSystem = "decimal";
let binaryTooBig = false;

//on refresh if 2 comp is checked
if ($("#compl").prop("checked")) {
  let arr = Object.entries($("#bitSizeWrapper div input"));
  arr.pop(); //last two elements are unecessary
  arr.pop();
  //find if any checkboxe are stil checked
  arr.forEach((element) => {
    if (element[1].checked) {
      element[1].checked = false;
    }
  });

  $("#compl").prop("checked", false);
  $(".form-row div input").val("");
}
//default 32bit checkbox
sizeOfBitID = "32Bit";
$("#32Bit").prop("checked", true);
$("#bitSizeWrapper").hide();

//show/ hide table

$("#exampletableNormalButton").on("click", function () {
  if ($(".exampletableNormal").is(":visible")) {
    $("#exampletableNormalButton").html(
      "${{ numberconverter.SHOW-TABLE-BUTTON-EXAMPLE-TABLE }}$"
    );
    $(".exampletableNormal").hide();
  } else {
    $("#exampletableNormalButton").html(
      "${{ numberconverter.HIDE-TABLE-INNER }}$"
    );
    $(".exampletableNormal").show();
  }
});

$("#exampletableTwoComplButton").on("click", function () {
  if ($(".exampletableTwoCompl").is(":visible")) {
    $("#exampletableTwoComplButton").html(
      "${{ numberconverter.SHOW-COMPLEMENT-TABLE-BUTTON-EXAMPLE-TABLE }}$"
    );
    $("#exampletableTwoComplButton").removeClass(
      "col-lg-3 col-md-3 col-sm-5 ml-3"
    );
    $("#exampletableTwoComplButton").addClass(
      "col-lg-4 col-md-6 col-sm-7 ml-3"
    );
    $(".exampletableTwoCompl").hide();
  } else {
    $("#exampletableTwoComplButton").html(
      "${{ numberconverter.HIDE-TABLE-INNER }}$"
    );
    $(".exampletableTwoCompl").show();
    $("#exampletableTwoComplButton").removeClass(
      "col-lg-4 col-md-6 col-sm-7 col-8 ml-3"
    );
    $("#exampletableTwoComplButton").addClass(
      "col-lg-3 col-md-3 col-sm-5 col-5 ml-3"
    );
  }
});

$("input").on("focus", function () {
  // get focus on input when is used
  $("input").css("background-color", "white");
});
$("input").on("focusout", function () {
  // get focus out
  $("input").css("background-color", "lightgray");
});

//if bit-checkbox get clicked Bit Checkbox
//set id
$("#bitSizeWrapper input").on("click", function () {
  if ($(this).attr("id") != sizeOfBitID) {
    $("#binary").removeAttr("maxLength");
    $("#" + sizeOfBitID).prop("checked", false);
    sizeOfBitID = $(this).attr("id");
    $("#" + sizeOfBitID).prop("checked", true);
  } else if ($(this).attr("id") == sizeOfBitID) {
    $("#" + sizeOfBitID).prop("checked", false);
    $("#any").prop("checked", true);
    sizeOfBitID = $("#any").attr("id");
  }

  convert(chosenSystem);
});
//on input the system f.e. octal will be changed
$(".form-row div input").on("input", function (e) {
  chosenSystem = $(this).attr("id");

  convert(chosenSystem);
  if (chosenSystem == "binary") {
    e.currentTarget.selectionStart = $("#binary").val().length;
    e.currentTarget.selectionEnd = e.currentTarget.selectionStart;
  }
});

// on/off 2-compl
$("#compl").on("click", function (e) {
  //
  if (twoCompl == true) {
    // from Compl to NoNCompl
    twoCompl = false;
    $("#bitSizeWrapper").hide();
    $(".invalid-feedback").hide();
    convert(chosenSystem);
  } else {
    //from nonCompl to Compl
    twoCompl = true;
    $("#bitSizeWrapper").show();
    convert(chosenSystem);
  }
});

////CONVERT-FUNCTIONS
function convert(inputId) {
  binaryTooBig = false;

  $(".form-row div input").css("border-color", "");

  try {
    if ($("#" + inputId).val() == "") {
      $(".form-control").val("");
      $("#lenDec").html(
        "${{ numberconverter.LENGTH }}$: " + $("#decimal").val().length
      );
      $("#lenHex").html(
        "${{ numberconverter.LENGTH }}$: " + $("#hexa").val().length
      );
      $("#lenOct").html(
        "${{ numberconverter.LENGTH }}$: " + $("#octal").val().length
      );
      $("#lenBin").html(
        "${{ numberconverter.LENGTH }}$: " +
          $("#binary").val().replace(/ /g, "").length
      );
      return 0;
    }
    if ($("#decimal").val() == "-") {
      $(".form-row div input[id='hexa']").val("");
      $(".form-row div input[id='binary']").val("");
      $(".form-row div input[id='octal']").val("");
      return 0;
    }

    switch (inputId) {
      case "decimal":
        var number = BigInt(
          $("#" + inputId)
            .val()
            .toString()
        ); //decimal number

        if (twoCompl) {
          //setBitLen Func
          $(".form-row div input[id='binary']").val(
            setBitLen(decTo2erCompBinary(number.toString()))
          );
          if (binaryTooBig == false) {
            $(".form-row div input[id='hexa']").val(
              BigInt("0b" + $("#binary").val().replace(/ /g, ""))
                .toString(16)
                .toUpperCase()
            );
            $(".form-row div input[id='octal']").val(
              BigInt(
                "0b" +
                  $(".form-row div input[id='binary']").val().replace(/ /g, "")
              ).toString(8)
            );
          }
        } else if (twoCompl == false) {
          $(".form-row div input[id='hexa']").val(
            number.toString(16).toUpperCase()
          );
          $(".form-row div input[id='binary']").val(
            setBitLenForNonCompl(number.toString(2))
          );
          $(".form-row div input[id='octal']").val(number.toString(8));
        }
        break;
      /////////////////////////////////////////////////////////////////////////////////
      case "hexa":
        $(".form-row div input[id='hexa']").val(
          $(".form-row div input[id='hexa']").val().toUpperCase()
        );
        if (twoCompl) {
          $(".form-row div input[id='binary']").val(
            setBitLen(
              BigInt(
                "0x" +
                  $("#" + inputId)
                    .val()
                    .replace(/ /g, "")
              ).toString(2)
            )
          );
          if (binaryTooBig == false) {
            $(".form-row div input[id='decimal']").val(
              bin2dec($(".form-row div input[id='binary']").val())
            );
            $(".form-row div input[id='octal']").val(
              BigInt(
                "0x" +
                  $("#" + inputId)
                    .val()
                    .replace(/ /g, ""),
                16
              ).toString(8)
            );
          }
        } else if (twoCompl == false) {
          $(".form-row div input[id='binary']").val(
            setBitLenForNonCompl(
              BigInt(
                "0x" +
                  $("#" + inputId)
                    .val()
                    .replace(/ /g, "")
              ).toString(2)
            )
          );
          $(".form-row div input[id='decimal']").val(
            BigInt(
              "0x" +
                $("#" + inputId)
                  .val()
                  .replace(/ /g, ""),
              16
            )
          );
          $(".form-row div input[id='octal']").val(
            BigInt(
              "0x" +
                $("#" + inputId)
                  .val()
                  .replace(/ /g, ""),
              16
            ).toString(8)
          );
        }

        break;
      //////////////////////////////////////////////////////////////////////////////////////77
      case "octal":
        var number = BigInt(
          "0o" +
            $("#" + inputId)
              .val()
              .replace(/ /g, "")
        );
        $(".form-row div input[id='octal']").val(
          $(".form-row div input[id='octal']").val().toUpperCase()
        );
        if (twoCompl) {
          $(".form-row div input[id='binary']").val(
            setBitLen(number.toString(2))
          );
          if (binaryTooBig == false) {
            $(".form-row div input[id='decimal']").val(
              bin2dec($(".form-row div input[id='binary']").val())
            );
            $(".form-row div input[id='hexa']").val(
              number.toString(16).toUpperCase()
            );
          }
        } else if (twoCompl == false) {
          $(".form-row div input[id='binary']").val(
            setBitLenForNonCompl(number.toString(2))
          );
          $(".form-row div input[id='decimal']").val(number);
          $(".form-row div input[id='hexa']").val(
            decToHex($(".form-row div input[id='decimal']").val()).toUpperCase()
          );
        }

        break;

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      case "binary":
        var number = BigInt(
          "0b" +
            $("#" + inputId)
              .val()
              .replace(/ /g, "")
        );
        if (twoCompl) {
          $(".form-row div input[id='binary']").val(
            setBitLen($("#" + inputId).val())
          );
          $(".form-row div input[id='decimal']").val(
            bin2dec($("#" + inputId).val())
          );
          $(".form-row div input[id='hexa']").val(
            number.toString(16).toUpperCase()
          );
          $(".form-row div input[id='octal']").val(number.toString(8));
        } else if (twoCompl == false) {
          $(".form-row div input[id='hexa']").val(
            number.toString(16).toUpperCase()
          );
          $(".form-row div input[id='decimal']").val(number);
          $(".form-row div input[id='octal']").val(number.toString(8));
        }

        break;
    }

    $("#lenDec").html(
      "${{ numberconverter.LENGTH }}$: " + $("#decimal").val().length
    );
    $("#lenHex").html(
      "${{ numberconverter.LENGTH }}$: " + $("#hexa").val().length
    );
    $("#lenOct").html(
      "${{ numberconverter.LENGTH }}$: " + $("#octal").val().length
    );
    $("#lenBin").html(
      "${{ numberconverter.LENGTH }}$: " +
        $("#binary").val().replace(/ /g, "").length
    );

    $("#" + chosenSystem).css("border-color", "green");
    $(".form-row div input[id='binary']").val(
      setWhiteSpaceInBin($(".form-row div input[id='binary']").val())
    );
  } catch (e) {
    $("#" + chosenSystem).css("border-color", "red");
    $(".invalid-feedback").hide();
  }
} // here end of func convert

function decTo2erCompBinary(num) {
  var bin;

  if (num.startsWith("-")) {
    bin = BigInt(num.replace("-", "")).toString(2);
  } else {
    bin = BigInt(num).toString(2);
  }
  if (num.startsWith("-")) {
    bin = flip(bin);
    bin = addBinary(bin, BigInt("1").toString(2));

    if (bin.startsWith("0")) {
      bin = bin.split("");
      bin.unshift("1");
      bin = bin.join("");
    }
  } else {
    if (bin.startsWith("1")) {
      bin = bin.split("");
      bin.unshift("0");
      bin = bin.join("");
    }
  }

  return bin;
}

function bin2dec(binNum) {
  binNum = binNum.replace(/\s+/g, "");

  if (binNum.startsWith("1")) {
    var binLen = binNum.length;
    binNum = BigInt("0b" + binNum);
    binNum = binNum - BigInt(2) ** BigInt(binLen);
    return binNum;
  } else {
    return BigInt("0b" + binNum);
  }
}

function decToHex(bn) {
  bn = bn.toString();
  bn = bn.replace(/ /g, "");

  var pos = true;
  bn = BigInt(bn);

  // I've noticed that for some operations BigInts can
  // only be compared to other BigInts (even small ones).
  // However, <, >, and == allow mix and match
  if (bn < 0) {
    pos = false;
    bn = bitnot(bn);
  }

  var base = 16;
  var hex = bn.toString(base);
  if (hex.length % 2) {
    hex = "0" + hex;
  }

  // Check the high byte _after_ proper hex padding
  var highbyte = parseInt(hex.slice(0, 2), 16);
  var highbit = 0x80 & highbyte;

  if (pos && highbit) {
    // A 32-byte positive integer _may_ be
    // represented in memory as 33 bytes if needed
    //hex = '00' + hex;
  }

  return hex;
}

function bitnot(bn) {
  // JavaScript's bitwise not doesn't work on negative BigInts (bn = ~bn; // WRONG!)
  // so I manually implement my own two's compliment (flip bits, add one)
  bn = -bn;
  var bin = bn.toString(2);
  var prefix = "";
  while (bin.length % 8) {
    bin = "0" + bin;
  }
  if ("1" === bin[0] && -1 !== bin.slice(1).indexOf("1")) {
    prefix = "11111111";
  }
  bin = bin
    .split("")
    .map(function (i) {
      return "0" === i ? "1" : "0";
    })
    .join("");
  return BigInt("0b" + prefix + bin) + BigInt(1);
}

function flip(n) {
  return n.replace(/(0)|(1)/g, function (m, p1, p2) {
    return p2 ? 0 : 1;
  });
}

var addBinary = function (a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = "";
  while (i >= 0 || j >= 0) {
    let m = i < 0 ? 0 : a[i] | 0;
    let n = j < 0 ? 0 : b[j] | 0;
    carry += m + n; // sum of two digits
    result = (carry % 2) + result; // string concat
    carry = (carry / 2) | 0; // remove decimals,  1 / 2 = 0.5, only get 0
    i--;
    j--;
  }
  if (carry !== 0) {
    result = carry + result;
  }
  return result;
};

function setWhiteSpaceInBin(binVal) {
  if (binVal.length <= 4) {
    return binVal;
  }

  binVal = binVal.replace(/ /g, "").split("").reverse();

  return binVal
    .map((d, i) => (i % 4 == 0 && i != 0 ? d + " " : d))
    .reverse()
    .join("")
    .trim();
}

function setBitLenForNonCompl(binVal) {
  binVal = binVal.replace(/ /g, "");
  binVal = binVal.split("");
  if ($("#decimal").val().startsWith("-") == false) {
    let binLen = binVal.length;
    let bitNumber = 4;

    while (bitNumber < binLen) {
      bitNumber *= 2;
    }
    while (binVal.length != bitNumber) {
      binVal.unshift("0");
    }
  } else {
    binVal.shift();

    let binLen = binVal.length;
    let bitNumber = 4;

    while (bitNumber < binLen) {
      bitNumber *= 2;
    }
    while (binVal.length != bitNumber) {
      binVal.unshift("0");
    }

    binVal.unshift("-");
  }
  return binVal.join("");
}

function setBitLen(binVal) {
  //set binaryLen to bits chosen by checkbox
  $(".invalid-feedback").hide();
  $("#decimal").removeAttr("maxLength");
  $("#binary").removeAttr("maxLength");
  $("#hexa").removeAttr("maxLength");
  $("#octal").removeAttr("maxLength");
  $("#binary").css("border-color", "");

  binVal = binVal.replace(/ /g, "");

  if (sizeOfBitID == "any" && twoCompl) {
    binVal = binVal.split("");
    let binLen = binVal.length;
    let bitNumber = 8;

    while (bitNumber < binLen) {
      bitNumber *= 2;
    }

    if ($("#decimal").val().startsWith("-")) {
      while (binVal.length != bitNumber) {
        binVal.unshift("1");
      }
    } else {
      while (binVal.length != bitNumber) {
        binVal.unshift("0");
      }
    }
    return binVal.join("");
  } else if (sizeOfBitID != 0 || "any") {
    if (chosenSystem == "binary") {
      if (binVal.length == parseInt(sizeOfBitID)) {
        $("#binary").prop("maxLength", parseInt(sizeOfBitID));
        $("#decimal").prop("maxLength", parseInt($("#decimal").val().length));
        $("#octal").prop("maxLength", parseInt($("#octal").val().length));
        $("#hexa").prop("maxLength", parseInt($("#hexa").val().length));

        return $("#binary").val();
      } else if (
        binVal.length > parseInt(sizeOfBitID) &&
        binVal.length != "any"
      ) {
        return $("#binary").val().toString().slice(0, -1);
      }
      return binVal;
    } else if (chosenSystem == "decimal") {
      $("#decimal").removeAttr("maxLength");
      if (
        binVal.length <= parseInt(sizeOfBitID) ||
        parseInt(sizeOfBitID) == 0
      ) {
        if (binVal.startsWith("1")) {
          binVal = binVal.split("");
          while (binVal.length < parseInt(sizeOfBitID)) {
            binVal.unshift("1");
          }

          return binVal.join("");
        } else {
          binVal = binVal.split("");
          while (binVal.length < parseInt(sizeOfBitID)) {
            binVal.unshift("0");
          }

          return binVal.join("");
        }
      } else {
        binaryTooBig = true;

        $("#hexa").val(
          BigInt("0b" + binVal)
            .toString(16)
            .toUpperCase()
        );
        $("#octal").val(
          BigInt("0b" + binVal)
            .toString(8)
            .toUpperCase()
        );

        $("#binary").prop("maxLength", parseInt(sizeOfBitID));
        $("#decimal").prop("maxLength", parseInt($("#decimal").val().length));
        $("#octal").prop("maxLength", parseInt($("#octal").val().length));
        $("#hexa").prop("maxLength", parseInt($("#hexa").val().length));

        $("#binary").css("border-color", "red");

        $(".invalid-feedback").show();

        return $("#binary").val();
      }
    } else if (chosenSystem == "octal" || chosenSystem == "hexa") {
      $("#" + chosenSystem).removeAttr("maxLength");
      if (
        binVal.length <= parseInt(sizeOfBitID) &&
        parseInt(sizeOfBitID) != 0
      ) {
        binVal = binVal.split("");
        while (binVal.length < parseInt(sizeOfBitID)) {
          binVal.unshift("0");
        }

        return binVal.join("");
      } else {
        binaryTooBig = true;

        $(".form-row div input[id='decimal']").val(bin2dec(binVal));

        if (chosenSystem == "octal") {
          $(".form-row div input[id='hexa']").val(
            BigInt(
              "0o" +
                $("#" + chosenSystem)
                  .val()
                  .replace(/ /g, "")
            )
              .toString(16)
              .toUpperCase()
          );
        } else if (chosenSystem == "hexa") {
          $(".form-row div input[id='octal']").val(
            BigInt(
              "0x" +
                $("#" + chosenSystem)
                  .val()
                  .replace(/ /g, ""),
              16
            ).toString(8)
          );
        }

        $("#binary").prop("maxLength", parseInt(sizeOfBitID));
        $("#decimal").prop("maxLength", parseInt($("#decimal").val().length));
        $("#octal").prop("maxLength", parseInt($("#octal").val().length));
        $("#hexa").prop("maxLength", parseInt($("#hexa").val().length));
        $("#binary").css("border-color", "red");

        $(".invalid-feedback").show();
        return $("#binary").val();
      }
    }
  } else {
    return binVal;
  }
}
