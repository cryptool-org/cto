//==========================================
// Title:  Caesar with Python IDE
// Author: Jean Michel Polak
// Date:   21.11.2020
//==========================================

//show tabs
$("#cmdOptions a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});

let upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
let blank = " ";
let digits = "0123456789";
let punctuationMarks = ".,:;!?()";
let umlautsUpper = "ÄÖÜ";
let umlautsLower = "äöüß";
let specialcharacters = '*-+[]{}/@_><#~="&%$§';

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
let fiveBlocksChecked = false;
let htmlWidth = $(document).width();
let windowWidth = $(window).width();
adjustCode(htmlWidth);
adjustCode(windowWidth);
editor.setSize("100%", "100%");
const onRefresh = () => {
  //set Alphabet options
  $("#plaintextAlp").val(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  );
  $("#cipherAlp").val("BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzA");
  $("#uppercaseAlphabet").prop("checked", true);
  $("#lowercaseAlphabet").prop("checked", true);

  $("#blanksAlphabet").prop("checked", false);
  $("#digitsAlphabet").prop("checked", false);
  $("#punctuationAlphabet").prop("checked", false);
  $("#umlautsAlphabet").prop("checked", false);
  $("#putTogetherAlphabet").prop("checked", true);
  $("#defineOwnAlphabet").prop("checked", false);
  //on refresh if keyword cB is checked
  $("#cryptCheckbox").prop("checked", false);
  $("#key").val(1);

  $("#input").val("${{caesar.INIT-TEXT}}$");
  $("#addFiveBlocksCodeCheckbox").prop("checked", false);
  $("#KeepNonAlphabetCharacters").prop("checked", true);
  $(".textareaWrapper").hide();

  $(
    "button, #customSwitches, #addFiveBlocksCodeCheckbox, #cryptCheckbox, #KeepNonAlphabetCharacters"
  ).attr("disabled", true);
  $("#themeConfi").html(editor.options.theme);

  $(".left-switch-label").css("color", $(".right-switch-label").css("color"));
  $("#input-len").html(displaylength($("#input").val()));

  //LOAD ALL ELEMENTS WITH A PARAMETER INTO CMD , start arguments without a parametet, f.e. booleans, should be defined in html doc
  $("#-k").html($("#key").val());
  $("#-m").html("'" + $("#input").val() + "'");
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
};

//code and buttons for editor are visible?
onRefresh();
let codeVisible = false;
let code = editor.getValue();
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//write the id in pre element here to find them
let argIdArrayName = ["-k", "-m", "mod", "fiveblock", "keepNonAlp", "-a"];

languagePluginLoader.then(() => {
  $(
    "button, #customSwitches, #addFiveBlocksCodeCheckbox, #cryptCheckbox, #KeepNonAlphabetCharacters"
  ).attr("disabled", false);
  $("#operationForCode").html(
    '<i class="mr-2 fa fa-code" aria-hidden="true"></i>' +
      "${{caesar.SHOW-CODE}}$"
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

//replace print function with append function -> its append the elements to a global attr. in pyodide object
function prepareCode(code) {
  code = code.replace(/print/g, "globalVariabel.append");

  return code;
}

//return of an array
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

    //replaceAll -> if string it contains ' -> double ' -> Error in code, so replace it .
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

// function to find args and change them in the cmdLine

$("#operationForCode").on("click", function () {
  if (codeVisible == false) {
    $(".textareaWrapper").show();
    codeVisible = true;
    $("#operationForCode").html(
      '<i class="mr-2 fa fa-angle-double-up" aria-hidden="true"></i>' +
        "${{caesar.HIDE-CODE}}$"
    );
  } else {
    $("#operationForCode").html(
      '<i class="mr-2 fa fa-code" aria-hidden="true"></i>' +
        "${{caesar.SHOW-CODE}}$"
    );
    $(".textareaWrapper").hide();
    codeVisible = false;
  }
});
$("#output").on("input", () => {
  $("#output-len").html(displaylength($("#output").val()));
});
//------------------------------------//
//functions for manipulationg cmd arguments in GUI

$("#key").on("input", () => {
  if (isNaN(parseInt($("#key").val())) || parseInt($("#key").val()) < 0) {
    $("#key").val(0);
  }
  let newNumber = parseInt($("#key").val());
  if (newNumber < 0) {
    newNumber = 0;
  }
  $("#-k").html(newNumber);
  runCode();
});

$("#plus").on("click", () => {
  let oldNumber = parseInt($("#key").val());
  let newNumber;
  let maxLen = $("#plaintextAlp").val().length - 1;
  if (oldNumber >= maxLen) {
    newNumber = 0;
  } else {
    newNumber = oldNumber + 1;
  }
  $("#key").val(newNumber);
  $("#-k").html(newNumber);
  cipherAlphabet = rotateAlphabet(
    newNumber,
    $("#plaintextAlp").val().split("")
  );

  $("#cipherAlp").val(cipherAlphabet);
  runCode();
});

$("#minus").on("click", () => {
  let oldNumber = parseInt($("#key").val());
  let newNumber;
  let maxLen = $("#plaintextAlp").val().length - 1;
  if (oldNumber <= 0) {
    newNumber = maxLen;
  } else {
    newNumber = oldNumber - 1;
  }
  $("#key").val(newNumber);
  cipherAlphabet = rotateAlphabet(
    newNumber,
    $("#plaintextAlp").val().split("")
  );

  $("#cipherAlp").val(cipherAlphabet);
  $("#-k").html(newNumber);
  runCode();
});

$("#input").on("input", () => {
  let newInput = $("#input").val();
  $("#-m").html("'" + newInput + "'");
  $("#input-len").html(displaylength(newInput));
  runCode();
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

$("#addFiveBlocksCodeCheckbox").on("click", () => {
  if ($("#addFiveBlocksCodeCheckbox").prop("checked")) {
    fiveBlocksChecked = true;
    $("#fiveblock").html("--blocks-of-five");
    $("#fiveblock").attr("hidden", false);
  } else {
    fiveBlocksChecked = false;
    $("#fiveblock").html("");
    $("#fiveblock").attr("hidden", true);
  }
  runCode();
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

//define own alphabet
$("#plaintextAlp").on("input", async () => {
  let plaintext = $("#plaintextAlp").val();
  let plaintextUniqueArray = new Set($("#plaintextAlp").val().split(""));
  plaintextUniqueArray = Array.from(plaintextUniqueArray);
  let key = parseInt($("#key").val());

  let cipherAlphabet = rotateAlphabet(key, plaintextUniqueArray.slice());

  if (plaintext != plaintextUniqueArray.join("")) {
    await delay(1000);
  }

  $("#plaintextAlp").val(plaintextUniqueArray.join(""));
  $("#cipherAlp").val(cipherAlphabet);
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});

//add chars to alphabet
$("#uppercaseAlphabet").on("click", () => {
  let key = parseInt($("#key").val());
  if ($("#uppercaseAlphabet").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set($("#plaintextAlp").val() + upperAlphabet)).join("")
    );
  } else {
    let eliminatedString = $("#plaintextAlp").val();
    for (const symbol of upperAlphabet) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#plaintextAlp").val(eliminatedString);
  }
  let cipherAlphabet = rotateAlphabet(key, $("#plaintextAlp").val().split(""));
  $("#cipherAlp").val(cipherAlphabet);
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});

$("#blanksAlphabet").on("click", () => {
  let key = parseInt($("#key").val());
  if ($("#blanksAlphabet").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set($("#plaintextAlp").val() + blank)).join("")
    );
  } else {
    let eliminatedString = $("#plaintextAlp").val();
    for (const symbol of blank) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#plaintextAlp").val(eliminatedString);
  }
  let cipherAlphabet = rotateAlphabet(key, $("#plaintextAlp").val().split(""));
  $("#cipherAlp").val(cipherAlphabet);
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});

$("#digitsAlphabet").on("click", () => {
  let key = parseInt($("#key").val());
  if ($("#digitsAlphabet").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set($("#plaintextAlp").val() + digits)).join("")
    );
  } else {
    let eliminatedString = $("#plaintextAlp").val();
    for (const symbol of digits) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#plaintextAlp").val(eliminatedString);
  }
  let cipherAlphabet = rotateAlphabet(key, $("#plaintextAlp").val().split(""));
  $("#cipherAlp").val(cipherAlphabet);
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});

$("#punctuationAlphabet").on("click", () => {
  let key = parseInt($("#key").val());
  if ($("#punctuationAlphabet").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set($("#plaintextAlp").val() + punctuationMarks)).join("")
    );
  } else {
    let eliminatedString = $("#plaintextAlp").val();
    for (const symbol of punctuationMarks) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#plaintextAlp").val(eliminatedString);
  }
  let cipherAlphabet = rotateAlphabet(key, $("#plaintextAlp").val().split(""));
  $("#cipherAlp").val(cipherAlphabet);
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});

$("#specialCharacters").on("click", () => {
  if ($("#specialCharacters").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set($("#plaintextAlp").val() + specialcharacters)).join("")
    );
  } else {
    let eliminatedString = $("#plaintextAlp").val();
    for (const symbol of specialcharacters) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#plaintextAlp").val(eliminatedString);
  }

  $("#-a").html("'" + $("#plaintextAlp").val() + "'");

  runCode();
});

$("#lowercaseAlphabet").on("click", () => {
  let key = parseInt($("#key").val());

  if ($("#lowercaseAlphabet").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set($("#plaintextAlp").val() + lowerAlphabet)).join("")
    );
  } else {
    let eliminatedString = $("#plaintextAlp").val();
    for (const symbol of lowerAlphabet) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#plaintextAlp").val(eliminatedString);
  }
  let cipherAlphabet = rotateAlphabet(key, $("#plaintextAlp").val().split(""));
  $("#cipherAlp").val(cipherAlphabet);
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});

$("#umlautsAlphabet").on("click", () => {
  let key = parseInt($("#key").val());

  if ($("#umlautsAlphabet").is(":checked")) {
    upperAlphabet = upperAlphabet + umlautsUpper;
    lowerAlphabet = lowerAlphabet + umlautsLower;
  } else {
    let eliminatedString = $("#plaintextAlp").val();
    for (const symbol of umlautsUpper + umlautsLower) {
      upperAlphabet = upperAlphabet.replace(symbol, "");
      lowerAlphabet = lowerAlphabet.replace(symbol, "");
      eliminatedString = eliminatedString.replace(symbol, "");
    }

    $("#plaintextAlp").val(eliminatedString);
  }

  if ($("#lowercaseAlphabet").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set(lowerAlphabet + $("#plaintextAlp").val())).join("")
    );
  }
  if ($("#uppercaseAlphabet").is(":checked")) {
    $("#plaintextAlp").val(
      Array.from(new Set(upperAlphabet + $("#plaintextAlp").val())).join("")
    );
  }

  let cipherAlphabet = rotateAlphabet(key, $("#plaintextAlp").val().split(""));
  $("#cipherAlp").val(cipherAlphabet);
  $("#-a").html("'" + $("#plaintextAlp").val() + "'");
  runCode();
});

//end add chars to alphabet

//end of functS to manipulate cdm line
//-----------------------------------------------------------------------------------//

//param text to calc length , return int
function displaylength(textForLen) {
  len = textForLen.replace(/(\r\n|\n|\r)/gm, "").length;
  return "${{caesar.LENGTH}}$: " + len.toString();
}
//
function rotateAlphabet(key, alphabetArray) {
  for (let i = 0; i < key; i++) {
    let temp = alphabetArray.shift();
    alphabetArray.push(temp);
  }
  return alphabetArray.join("");
}

//show/ hide alphabet
$("#defineAlphabetButton").on("click", () => {
  if ($("#defineAlphabetWrapper").attr("hidden")) {
    $("#defineAlphabetWrapper").attr("hidden", false);
    $("#defineAlphabetButton").html("${{caesar.CLOSE-DEFINE-ALPHABET}}$");
  } else {
    $("#defineAlphabetWrapper").attr("hidden", true);
    $("#defineAlphabetButton").html("${{caesar.DEFINE-ALPHABET}}$");
  }
});

//radiobuttons for alphabet template
$("#defineOwnAlphabet").on("click", () => {
  $(".alphabetTemplates").hide();
  $("#plaintextAlp").attr("disabled", false);
});

$("#putTogetherAlphabet").on("click", () => {
  $(".alphabetTemplates").show();
  $("#plaintextAlp").attr("disabled", true);
});

//dealy function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
//change theme of editor
$("#dropdownTheme").on("click", "*", function () {
  $("#themeConfi").html($(this).html());
  editor.setOption("theme", $(this).html());
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

function adjustCode(width) {
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
  if (width <= 768) {
    $("#cipherAlp, #plaintextAlp").attr("rows", "2");
  } else {
    $("#cipherAlp, #plaintextAlp").attr("rows", "1");
  }
}

$(window, document).resize(() => {
  //get html width
  let htmlWidth = $(document).width();
  let windowWidth = $(window).width();
  adjustCode(htmlWidth);
  adjustCode(windowWidth);
});
