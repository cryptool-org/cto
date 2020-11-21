//==========================================
// Title:  Monoalphabetic substitution with Python IDE
// Author: Jean Michel Polak
// Date:   21.11.2020
//==========================================

//show tabs
let selectedTab;
$("#cmdOptions a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
  selectedTab = $(this)[0]["hash"];
  $("#checkboxWrapper").popover("hide");
});
let fiveBlocksChecked = false;
let editor = CodeMirror.fromTextArea(
  document.getElementsByClassName("CodeMirror")[0],
  {
    mode: "python",
    lineNumbers: true,
    theme: "eclipse",
    lineWrapping: true,
    viewportMargin: Infinity,
    scrollbarStyle: "native",
    tabSize: 4,
    //indentWithTabs: true,
    indentUnit: 4,
    smartIndent: true,
    extraKeys: {
      Tab: function (cm) {
        cm.replaceSelection("    ", "end");
      },
    },
  }
);

let defaultCode = editor.getValue();
let htmlWidth = $(document).width();
let windowWidth = $(window).width();
adjustDesign(htmlWidth);
adjustDesign(windowWidth);
editor.setSize("100%", "100%");
const onRefresh = () => {
  //if html too small to display whole alphabet change rownumber to 2
  //disable alphabet textareas
  $("#cipherAlp, #plaintextAlp").prop("disabled", true);
  //on refresh if keyword cB is checked
  $("#cryptCheckbox").prop("checked", false);
  $("#keywordCheckBox").prop("checked", false);
  $("#addFiveBlocksCodeCheckbox").prop("checked", false);
  $("#input").val("${{monoalpha.INIT-TEXT}}$");
  let arr = Object.entries($("div .keyword input"));

  arr.pop(); //last two elements are unecessary
  arr.pop(); //only metadata
  //find if any k- checkboxes are stil checked
  arr.forEach((element) => {
    if (element[1].checked) {
      element[1].checked = false;
    }
  });
  //set the k inputs empty

  $("#plaintextAlp").val(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  );
  $("#cipherAlp").val("BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzA");
  $("#key").val(1);
  $("#inputKey1 , #inputKey2").val("");
  $("#" + idForKey).prop("checked", true);

  $(".textareaWrapper").hide();

  $(
    "button, #customSwitches, #addFiveBlocksCodeCheckbox, #cryptCheckbox, #keywordCheckBox, #KeepNonAlphabetCharacters"
  ).prop("disabled", true);
  $("#KeepNonAlphabetCharacters").prop("checked", true);
  $("#themeConfi").html(editor.options.theme);
  $(".left-switch-label").css("color", $(".right-switch-label").css("color"));
  $("#input-len").html(displaylength($("#input").val()));

  //set param with args not bool
  $("#-ca").html("'" + $("#cipherAlp").val() + "'");
  $("#-pa").html("'" + $("#plaintextAlp").val() + "'");
  $("#-m").html("'" + $("#input").val() + "'");
};
let idForKey = "k1"; //default
let plainAlp = $("#plaintextAlp").val();
let cipherAlp = $("#cipherAlp").val();
onRefresh();
let oldNumber = parseInt($("#key").val());
//write the paramname here ATTENTION: param with '-' are booleans, so do not have arguments
let argIdArrayName = ["-pa", "-ca", "-m", "mod", "fiveblock", "keepNonAlp"];

let codeVisible = false;

languagePluginLoader.then(async () => {
  await $(
    "button, #customSwitches, #addFiveBlocksCodeCheckbox, #keywordCheckBox, #cryptCheckbox , #KeepNonAlphabetCharacters"
  ).attr("disabled", false);
  $("#operationForCode").html(
    '<i class="mr-2 fa fa-code" aria-hidden="true"></i>' +
      "${{monoalpha.SHOW-CODE}}$"
  );
  $(".left-switch-label").css("color", "inherit");
  runCode();
});
$("#run-code").on("click", () => {
  runCode();
});
//run code function
function runCode() {
  $("#output").val("");
  //Prepare Code, globalVariael -> get all variables to print out in textarea
  //----------------------------------------------------------------------------------------------------------//
  //define globalVaraibel and append args to sys.argv -> did not append to code because in error message the linenumber is wrong, ->prepareSys.. function if you write sys.argv = argArray the "" disappear
  pyodide.runPython(
    "import sys\n" +
      "sys.argv = [" +
      prepareSysArgvArray() +
      "]\n" +
      "globalVariabel = []\n" +
      "__name__ = '__main__'\n"
  );
  //----------------------------------------------------------------------------------------------------------//

  try {
    pyodide.runPython(prepareCode(editor.getValue()));
    pyodide.globals.globalVariabel.forEach((el) => {
      $("#output").val($("#output").val() + el + "\r\n");
    });
  } catch (e) {
    $("#output").val(String(e).replace(/globalVariabel.append/g, "print"));
    //console.clear();
  }
  $("#input-len").html(displaylength($("#input").val()));
  $("#output-len").html(displaylength($("#output").val()));
}

// //replace print function with append function -> its append the elements to a global attr. in pyodide object
function prepareCode(code) {
  code = code.replace(/print/g, "globalVariabel.append");
  return code;
}

// // cmdLine to Array -> all elements with "" -> sys.argv = ["-k", "2", .....]
function prepareSysArgvArray() {
  resultArray = [];
  resultArray.push("'" + $("#cmdLine").html().split(" ")[1] + "'");
  argIdArrayName.forEach((el) => {
    if ($("#" + el).html() == "") {
      return 0;
    }
    if (el.startsWith("-")) {
      resultArray.push("'" + el + "'");
    }
    //replaceAll -> if string contains ' -> double ' -> Error in code, so replace it
    resultArray.push(
      "'" +
        $("#" + el)
          .text()
          .replace(/'/g, "")
          .replace(/(\r\n|\n|\r)/gm, "") +
        "'"
    );
  });

  return resultArray;
}

$("#operationForCode").on("click", function () {
  if (codeVisible == false) {
    $(".textareaWrapper").show();
    codeVisible = true;
    $("#operationForCode").html(
      '<i class="mr-2 fa fa-angle-double-up" aria-hidden="true"></i>' +
        "${{monoalpha.HIDE-CODE}}$"
    );
  } else {
    $("#operationForCode").html(
      '<i class="mr-2 fa fa-code" aria-hidden="true"></i>' +
        "${{monoalpha.SHOW-CODE}}$"
    );
    $(".textareaWrapper").hide();
    codeVisible = false;
  }
});

// //------------------------------------//
// //functions for manipulationg cmd arguments from GUI

$("#plaintextAlp").on("input", async () => {
  let uniqueChars = Array.from(
    new Set($("#plaintextAlp").val().replace(/ /g, "").split(""))
  ).join("");
  if ($("#plaintextAlp").val() != uniqueChars) {
    await delay(1000);
    $("#plaintextAlp").val(uniqueChars);
  }

  valideAlphabet();
  $("#-pa").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});
$("#cipherAlp").on("input", async () => {
  await delay(1000);
  $("#cipherAlp").val(
    Array.from(new Set($("#cipherAlp").val().replace(/ /g, "").split(""))).join(
      ""
    )
  );
  valideAlphabet();
  $("#-ca").html("'" + $("#cipherAlp").val() + "'");
  runCode();
});

$("#key").on("input", () => {
  //get shift and put in editor
  $("#checkboxWrapper").popover("hide");
  if (isNaN(parseInt($("#key").val())) || parseInt($("#key").val()) < 0) {
    $("#key").val(0);
  }
  let difference = oldNumber - parseInt($("#key").val());
  let array = $("#cipherAlp").val().split("");
  //if difference positiv -> minus
  if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      array.unshift(array.pop());
    }
  } else {
    for (let i = 0; i > difference; i--) {
      array.push(array.shift());
    }
  }
  oldNumber = parseInt($("#key").val());
  $("#cipherAlp").val(array.join(""));
  $("#-ca").html("'" + $("#cipherAlp").val() + "'");
  runCode();
});

$("#minus").on("click", () => {
  $("#checkboxWrapper").popover("hide");
  let cipherAlphabet = $("#cipherAlp").val();
  cipherAlp = cipherAlp.split("");
  oldNumber = parseInt($("#key").val());
  if (oldNumber <= 0) {
    newNumber = cipherAlphabet.length - 1;
  } else {
    newNumber = oldNumber - 1;
  }

  let array = cipherAlphabet.split("");
  array.unshift(array.pop());
  cipherAlp.unshift(cipherAlp.pop());
  cipherAlp = cipherAlp.join("");
  $("#key").val(newNumber);
  $("#cipherAlp").val(array.join(""));
  valideAlphabet();
  $("#-ca").html("'" + $("#cipherAlp").val() + "'");
  runCode();
});

$("#plus").on("click", () => {
  $("#checkboxWrapper").popover("hide");
  oldNumber = parseInt($("#key").val());
  let cipherAlphabet = $("#cipherAlp").val();
  oldNumber = parseInt($("#key").val());
  cipherAlp = cipherAlp.split("");
  if (oldNumber >= cipherAlphabet.length - 1) {
    newNumber = 0;
  } else {
    newNumber = oldNumber + 1;
  }
  let array = cipherAlphabet.split("");
  array.push(array.shift());
  cipherAlp.push(cipherAlp.shift());
  cipherAlp = cipherAlp.join("");
  $("#key").val(newNumber);
  $("#cipherAlp").val(array.join(""));
  valideAlphabet();
  $("#-ca").html("'" + $("#cipherAlp").val() + "'");
  runCode();
});

$("#input").on("input", () => {
  let newInput = $("#input").val();
  $("#-m").html("'" + newInput + "'");
  $("#input-len").html(displaylength(newInput));
  runCode();
});

$("#output").on("input", () => {
  $("#output-len").html(displaylength($("#output").val()));
});

$("#cryptCheckbox").on("click", () => {
  if ($("#cryptCheckbox").prop("checked")) {
    //disable fiverblock//
    $("#addFiveBlocksCodeCheckbox").prop("disabled", true);
    $("#addFiveBlocksCodeCheckbox").prop("checked", false);
    $("#mod").html("--decrypt");
    $("#fiveblock").html("");
    $("#fiveblock").attr("hidden", true);
  } else {
    if (fiveBlocksChecked) {
      $("#addFiveBlocksCodeCheckbox").prop("checked", true);
      $("#fiveblock").html("--blocks-of-five");
      $("#fiveblock").attr("hidden", false);
    }
    $("#addFiveBlocksCodeCheckbox").prop("disabled", false);

    $("#mod").html("--encrypt");
  }
  runCode();
});

$("#addFiveBlocksCodeCheckbox").change(() => {
  if ($("#addFiveBlocksCodeCheckbox").prop("checked")) {
    $("#fiveblock").html("--blocks-of-five");
    $("#fiveblock").attr("hidden", false);
    fiveBlocksChecked = true;
  } else {
    fiveBlocksChecked = false;

    $("#fiveblock").html("");
    $("#fiveblock").attr("hidden", true);
  }
  runCode();
});

$("#keywordCheckBox").on("click", () => {
  //by checking
  if ($("#keywordCheckBox").prop("checked")) {
    $("#defineKeyWordContainer").removeClass("col-md-5");
    $("#defineKeyWordContainer").addClass("col-md-12");
    $(".keyword").attr("hidden", false);

    let inputKeyOne = new Set(
      $("#inputKey1").val().replace(/ /g, "").split("")
    );
    let inputKeyTwo = new Set(
      $("#inputKey2").val().replace(/ /g, "").split("")
    );
    inputKeyOne = Array.from(inputKeyOne);
    inputKeyTwo = Array.from(inputKeyTwo);

    if (idForKey == "k1") {
      $("#plaintextAlp").val(plainAlp);
      $("#cipherAlp").val(cipherAlp);
      if (!inputKeyOne.length == 0) {
        appendAtStartOfPlainAlp(inputKeyOne);
      }
      $("#keyOneInputBox").attr("hidden", false);
      $("#keyTwoInputBox").attr("hidden", true);
      $(".keyAlp1").html("${{monoalpha.K1-LABEL}}$:");
    } else if (idForKey == "k2") {
      $("#plaintextAlp").val(plainAlp);
      $("#cipherAlp").val(cipherAlp);
      if (!inputKeyOne.length == 0) {
        appendAtEndOfCipherAlp(inputKeyOne);
      }

      $("#keyOneInputBox").attr("hidden", false);
      $("#keyTwoInputBox").attr("hidden", true);
      $(".keyAlp1").html("${{monoalpha.K2-LABEL}}$:");
    } else if (idForKey == "k3") {
      $("#plaintextAlp").val(plainAlp);
      $("#cipherAlp").val(cipherAlp);
      if (!inputKeyOne.length == 0) {
        appendAtStartOfPlainAlp(inputKeyOne);
      }

      if (!inputKeyOne.length == 0) {
        appendAtEndOfCipherAlp(inputKeyOne);
      }
      $("#keyOneInputBox").attr("hidden", false);
      $("#keyTwoInputBox").attr("hidden", true);
      $(".keyAlp1").html("${{monoalpha.K3-LABEL}}$:");
    } else {
      $("#plaintextAlp").val(plainAlp);
      $("#cipherAlp").val(cipherAlp);
      if (!inputKeyOne.length == 0) {
        appendAtStartOfPlainAlp(inputKeyOne);
      }

      if (!inputKeyOne.length == 0) {
        appendAtEndOfCipherAlp(inputKeyTwo);
      }

      $("#keyOneInputBox").attr("hidden", false);
      $("#keyTwoInputBox").attr("hidden", false);
      $(".keyAlp1").html("${{monoalpha.K1-LABEL}}$:");
    }
  }
  //by unchecking
  else {
    $("#defineKeyWordContainer").removeClass("col-md-12 mt-md-2");
    $("#defineKeyWordContainer").addClass("col-md-5 mt-md-0");
    $("#plaintextAlp").val(plainAlp);
    $("#cipherAlp").val(cipherAlp);

    $(".keyword").attr("hidden", true);
    $("#keyOneInputBox").attr("hidden", true);
    $("#keyTwoInputBox").attr("hidden", true);
  }
  if (valideAlphabet() != -1) {
    $("#-pa").html("'" + $("#plaintextAlp").val() + "'");
    $("#-ca").html("'" + $("#cipherAlp").val() + "'");
    runCode();
  }
});

$("#k1, #k2, #k3, #k4").on("click", (e) => {
  idForKey = $(e.target).attr("id");
  //eliminate duplicates
  let inputKeyOne = new Set($("#inputKey1").val().replace(/ /g, "").split(""));
  let inputKeyTwo = new Set($("#inputKey2").val().replace(/ /g, "").split(""));
  inputKeyOne = Array.from(inputKeyOne);
  inputKeyTwo = Array.from(inputKeyTwo);

  if (idForKey == "k1") {
    $("#plaintextAlp").val(plainAlp);
    $("#cipherAlp").val(cipherAlp);
    if (!inputKeyOne.length == 0) {
      appendAtStartOfPlainAlp(inputKeyOne);
    }

    $("#keyOneInputBox").attr("hidden", false);
    $("#keyTwoInputBox").attr("hidden", true);
    $(".keyAlp1").html("${{monoalpha.K1-LABEL}}$:");
  } else if (idForKey == "k2") {
    $("#plaintextAlp").val(plainAlp);
    $("#cipherAlp").val(cipherAlp);
    if (!inputKeyOne.length == 0) {
      appendAtEndOfCipherAlp(inputKeyOne);
    }

    $("#keyOneInputBox").attr("hidden", false);
    $("#keyTwoInputBox").attr("hidden", true);
    $(".keyAlp1").html("${{monoalpha.K2-LABEL}}$:");
  } else if (idForKey == "k3") {
    $("#plaintextAlp").val(plainAlp);
    $("#cipherAlp").val(cipherAlp);
    if (!inputKeyOne.length == 0) {
      appendAtStartOfPlainAlp(inputKeyOne);
    }

    if (!inputKeyOne.length == 0) {
      appendAtEndOfCipherAlp(inputKeyOne);
    }

    $("#keyOneInputBox").attr("hidden", false);
    $("#keyTwoInputBox").attr("hidden", true);
    $(".keyAlp1").html("${{monoalpha.K3-LABEL}}$:");
  } else {
    $("#plaintextAlp").val(plainAlp);
    $("#cipherAlp").val(cipherAlp);
    if (!inputKeyOne.length == 0) {
      appendAtStartOfPlainAlp(inputKeyOne);
    }

    if (!inputKeyOne.length == 0) {
      appendAtEndOfCipherAlp(inputKeyTwo);
    }

    $("#keyOneInputBox").attr("hidden", false);
    $("#keyTwoInputBox").attr("hidden", false);
    $(".keyAlp1").html("${{monoalpha.K1-LABEL}}$:");
  }
  if (valideAlphabet() != -1) {
    $("#-pa").html("'" + $("#plaintextAlp").val() + "'");
    $("#-ca").html("'" + $("#cipherAlp").val() + "'");
    runCode();
  }
});

$("#inputKey1, #inputKey2").on("input", () => {
  let inputKeyOne = new Set($("#inputKey1").val().replace(/ /g, "").split(""));
  let inputKeyTwo = new Set($("#inputKey2").val().replace(/ /g, "").split(""));

  inputKeyOne = Array.from(inputKeyOne);
  inputKeyTwo = Array.from(inputKeyTwo);

  switch (idForKey) {
    case "k1":
      $("#plaintextAlp").val(plainAlp);

      if (inputKeyOne.length == 0) {
        break;
      }
      appendAtStartOfPlainAlp(inputKeyOne);
      break;

    case "k2":
      $("#cipherAlp").val(cipherAlp);
      if (inputKeyOne.length == 0) {
        break;
      }
      appendAtEndOfCipherAlp(inputKeyOne);
      break;

    case "k3":
      $("#plaintextAlp").val(plainAlp);
      $("#cipherAlp").val(cipherAlp);
      if (inputKeyOne.length == 0) {
        break;
      }

      if (inputKeyOne.length == 0) {
        break;
      }
      appendAtStartOfPlainAlp(inputKeyOne);
      appendAtEndOfCipherAlp(inputKeyOne);
      break;

    case "k4":
      $("#plaintextAlp").val(plainAlp);
      $("#cipherAlp").val(cipherAlp);

      if (inputKeyOne.length == 0) {
        //do nothing
      }
      appendAtStartOfPlainAlp(inputKeyOne);
      appendAtEndOfCipherAlp(inputKeyTwo);
      break;
  }
  if (valideAlphabet() != -1) {
    $("#-pa").html("'" + $("#plaintextAlp").val() + "'");
    $("#-ca").html("'" + $("#cipherAlp").val() + "'");
    runCode();
  }
});

$("#KeepNonAlphabetCharacters").on("click", () => {
  if ($("#KeepNonAlphabetCharacters").prop("checked")) {
    $("#keepNonAlp").html("--keep-non-alp");
    $("#keepNonAlp").attr("hidden", false);
  } else {
    $("#keepNonAlp").html("");
    $("#keepNonAlp").attr("hidden", true);
  }
  runCode();
});

//end of functS to manipulate cdm line
// //-----------------------------------------------------------------------------------//
//buttons/

//dealy function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
//change theme of editor
$("#dropdownTheme").on("click", "*", function () {
  $("#themeConfi").html($(this).html());
  editor.setOption("theme", $(this).html());
});

$("#dropdownTheme").on("click", "*", function () {
  $("#themeConfi").html($(this).html());
  editor.setOption("theme", $(this).html());
});

$(".defineAlphabet").on("click", () => {
  if ($(".alphabet").attr("disabled") == "disabled") {
    $(".alphabet").attr("disabled", false);
    $(".defineAlphabet").html("${{monoalpha.CLOSE-DEFINE-ALPHABET}}$");
  } else {
    $(".alphabet").attr("disabled", true);
    $(".defineAlphabet").html("${{monoalpha.DEFINE-ALPHABET}}$");
  }
});

$("#changeToDefault").on("click", async () => {
  if (defaultCode == editor.getValue()) {
    return 0;
  }
  $("#alertCodeCahnge").attr("hidden", false);
  await delay(7000); //wait for 7 sec and hide warning alert
  $("#alertCodeCahnge").attr("hidden", true);
});
$("#confirmCodeChange").on("click", () => {
  editor.setValue(defaultCode);
  $("#alertCodeCahnge").attr("hidden", true);
});

$("#denyCodeChange").on("click", () => {
  $("#alertCodeCahnge").attr("hidden", true);
});
//--------------------------//

String.prototype.insert = function (index, string) {
  if (index > 0) {
    return (
      this.substring(0, index) + string + this.substring(index, this.length)
    );
  }

  return string + this;
};

//validate Alphabet
//param : none
//return 0-> not valid -> not same site, -1 -> not valid -> collision
let valideAlphabet = () => {
  //look if equal length
  let plaintextAlp = $("#plaintextAlp").val();
  let cipherAlp = $("#cipherAlp").val();
  let equal = plaintextAlp.length == cipherAlp.length;
  if (!equal && selectedTab == "#choseAlphabet") {
    $("#checkboxWrapper").attr(
      "data-content",
      "${{monoalpha.ALPHABETLENGTHWARNING}}$"
    );

    $("#checkboxWrapper").popover("show");
    return -1;
  }
  let collisionArray = [];
  for (let i = 0; i < plaintextAlp.length; i++) {
    if (plaintextAlp[i] == cipherAlp[i]) {
      collisionArray.push(plaintextAlp[i]);
    }
  }
  if (collisionArray.length > 0 && selectedTab == "#choseAlphabet") {
    $("#checkboxWrapper").attr(
      "data-content",
      "${{monoalpha.LETTERCLASHWARNING}}$: " + collisionArray.join(",")
    );
    $("#checkboxWrapper").popover("show");
    return 0;
  }
};

$("#checkboxWrapper").on("shown.bs.popover", function () {
  setTimeout(function () {
    $("#checkboxWrapper").popover("hide");
  }, 5000);
});

function appendAtStartOfPlainAlp(inputArray) {
  let plainAlp = $("#plaintextAlp").val();
  inputArray.forEach((el) => {
    if (plainAlp.includes(el)) {
      plainAlp = plainAlp.replace(el, "");
    }
  });
  $("#plaintextAlp").val(inputArray.join("") + plainAlp);
}

function appendAtEndOfCipherAlp(inputArray) {
  let cipherAlp = $("#cipherAlp").val();
  inputArray.forEach((el) => {
    if (cipherAlp.includes(el)) {
      cipherAlp = cipherAlp.replace(el, "");
    }
  });
  let shiftBy = parseInt($("#key").val());
  let newAlp = cipherAlp.insert(
    cipherAlp.length - shiftBy,
    inputArray.join("")
  );
  $("#cipherAlp").val(newAlp);
}
//change fontsize in editor
$("#fontsize").on("change , input", () => {
  //valide  input
  if ($("#fontsize").val().replace(/ /g, "") == "") {
    return 0;
  }
  if (
    isNaN(parseInt($("#fontsize").val())) ||
    parseInt($("#fontsize").val()) < 1
  ) {
    $("#fontsize").val(1);
  } else if (parseInt($("#fontsize").val()) > 50) {
    $("#fontsize").val(50);
  }
  $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  editor.refresh();
  document.getElementById("fontsize").scrollIntoView();
});
function adjustDesign(width) {
  if (width >= 992) {
    $("#fontsize").val(12);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 992 && width >= 768) {
    $("#fontsize").val(9);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 768 && width >= 492) {
    $("#fontsize").val(7);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 492 && width >= 380) {
    $("#fontsize").val(6);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 380) {
    $("#fontsize").val(5);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  }
  if (width <= 768) {
    $("#cipherAlp, #plaintextAlp").attr("rows", "2");
  } else {
    $("#cipherAlp, #plaintextAlp").attr("rows", "1");
  }
  if (width < 436) {
    $(".button-edit-responsive, #keyBox").removeClass("col-6");
    $(".button-edit-responsive").addClass("col-10 mt-2");
  } else {
    $(".button-edit-responsive, #keyBox").addClass("col-6");
    $(".button-edit-responsive").removeClass("col-10 mt-2");
  }
  if (width < 564) {
    $(".resposive-button-code").removeClass("col-6");
    $(".resposive-button-code").addClass("col-12 mt-2");
  } else {
    $(".resposive-button-code").addClass("col-6");
    $(".resposive-button-code").removeClass("col-12 mt-2");
  }
  if (width < 460) {
    $("#placeholderForButton").attr("hidden", false);
    $("#buttonDefineAlpWrapper").attr("hidden", true);
  } else {
    $("#buttonDefineAlpWrapper").attr("hidden", false);
    $("#placeholderForButton").attr("hidden", true);
  }
}
//window on resize if under 768 pixel set row to 2 to see all chars
$(window).resize(() => {
  //get html width
  let htmlWidth = $(document).width();
  let windowWidth = $(window).width();
  adjustDesign(htmlWidth);
  adjustDesign(windowWidth);
});

//param text to calc length , return int
function displaylength(textForLen) {
  len = textForLen.replace(/(\r\n|\n|\r)/gm, "").length;
  return "${{monoalpha.LENGTH}}$: " + len.toString();
}
