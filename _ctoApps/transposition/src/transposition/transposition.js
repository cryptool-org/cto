//==========================================
// Title:  Transposition with Python IDE
// Author: Jean Michel Polak
// Date:   21.11.2020
//==========================================

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

var editor = CodeMirror.fromTextArea(
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
editor.setSize("100%", "100%");
let defaultCode = editor.getValue();

let fiveBlocksChecked = false;
let keepWhitespacesChecked = false;
let replaceWhiteSpacesChecked = false;
let caseSensitiveChecked = true;

initSiteBeforePythonLoaded();

let codeVisible = false;
//elements WITHOUT "-" at beginnign are booleans!!!!!!!!!!
let argIdArrayName = [
  "-m",
  "mod",
  "fiveblock",
  "-k",
  "removeSpacesCMD",
  "-rc",
  "-a",
  "cs",
];
languagePluginLoader.then(() => {
  $(
    "button, #casesensitive ,#customSwitches, #addFiveBlocksCodeCheckbox, #removeSpaces, #cryptCheckbox , #replaceChar"
  ).attr("disabled", false);

  $("#operationForCode").html(
    '<i class="mr-2 fa fa-code" aria-hidden="true"></i>' +
      "${{transposition.SHOW-CODE}}$"
  );
  runCode();
  $(".left-switch-label").css("color", "inherit");
});

$("#run-code").on("click", () => {
  runCode();
});
//run code function
function runCode() {
  $("#output").val("");
  //Prepare Code, globalVariael -> get all variables to print out in textarea [x non-alphabet characters have been deleted.]
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
      makeGrid();
    });
    const diff = showDifferenceBtwAlphabetAndInputs(
      $("#input").val(),
      $("#key").val()
    );
    let amountOfNonAlp = diff[0].length + diff[1].length;
    if (amountOfNonAlp > 0) {
      $("#output-label").html(
        "${{transposition.OUTPUT-LABEL}}$&nbsp;[" +
          amountOfNonAlp +
          " ${{transposition.NON-ALPHABETIC-TEXT}}$]"
      );
    } else {
      $("#output-label").html("${{transposition.OUTPUT-LABEL}}$");
    }
  } catch (e) {
    $("#output").val(String(e).replace(/globalVariabel.append/g, "print"));
    console.clear();
  }
  $("#output-len").html(displaylength($("#output").val())); //remove line breaks, because they get also count
}

// //replace print function with append function -> its append the elements to a global attr. in pyodide object
function prepareCode(code) {
  code = code.replace(/print/g, "globalVariabel.append");
  return code;
}

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
    //replaceAll -> if string contains ' -> it would be double ' -> Error in code, so replace it
    resultArray.push(
      "'" +
        $("#" + el)
          .text()
          .replace(/'/g, "")
          .replace(/(\r\n|\n|\r)/gm, "") + //replace line breaks to avoid errors in python code and set confirm parameter in cmd without line breaks
        "'"
    );
  });

  return resultArray;
}
//param text to calc length , return int
function displaylength(textForLen) {
  len = textForLen.replace(/(\r\n|\n|\r)/gm, "").length; //replace line breaks, they get also count for text length
  return "${{transposition.LENGTH}}$: " + len.toString();
}

//param: key as string, return: none
function getPermutationForKey(newKey) {
  // replace all non-alphabetic symbols
  const alpha = $("#alphabet").val();

  for (const symbol of newKey) {
    if (!alpha.includes(symbol)) {
      newKey = newKey.replace(symbol, "");
    }
  }

  if (!$("#casesensitive").prop("checked")) {
    newKey = newKey.toUpperCase();
  }
  let sortedKey = sortByCustomAlphabet(newKey.slice());
  let permutation = [];
  for (let i = 0; i < sortedKey.length; i++) {
    for (let z = 0; z < sortedKey.length; z++) {
      if (sortedKey[z] == newKey[i]) {
        permutation.push(z + 1);
        sortedKey[z] = undefined;
        break;
      }
    }
  }
  $("#key-permutation").val("");
  if (permutation.length > 0) {
    $("#key-permutation").html(
      "${{transposition.KEY-LABEL}}$&nbsp;[${{transposition.PERMUTATION}}$: " +
        permutation +
        "]"
    );
  } else {
    $("#key-permutation").html(
      "${{transposition.KEY-LABEL}}$&nbsp;[${{transposition.PERMUTATION}}$:]"
    );
    $("#maxTenRows").hide();
  }
}

function initSiteBeforePythonLoaded() {
  $("#input").val("${{transposition.INIT-TEXT}}$");
  $("#key").val("${{transposition.KEY}}$");
  $("#alphabet").val("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
  $(".textareaWrapper").hide();

  $("#casesensitive").prop("checked", true);
  $("#-a").html("'" + $("#alphabet").val() + "'");
  //part alphabets
  $("#uppercaseAlphabet").prop("checked", true);
  $("#blanksAlphabet").prop("checked", false);
  $("#digitsAlphabet").prop("checked", false);
  $("#punctuationAlphabet").prop("checked", false);
  $("#lowercaseAlphabet").prop("checked", true);
  $("#umlautsAlphabet").prop("checked", false);
  $("#putTogetherAlphabet").prop("checked", true);
  $("#defineOwnAlphabet").prop("checked", false);
  $("#specialCharacters").prop("checked", false);
  $(
    "button, #casesensitive,#customSwitches, #addFiveBlocksCodeCheckbox, #cryptCheckbox , #removeSpaces, #replaceChar, #charForReplace"
  ).attr("disabled", true);
  $(
    "#addFiveBlocksCodeCheckbox, #removeSpaces, #replaceChar, #cryptCheckbox"
  ).prop("checked", false);

  $("#themeConfi").html(editor.options.theme);
  getPermutationForKey($("#key").val());
  $(".left-switch-label").css("color", $(".right-switch-label").css("color"));
  makeGrid();
  //set length
  $("#key-len").html(displaylength($("#key").val()));
  $("#input-len").html(displaylength($("#input").val()));

  //
  $("#-a").html("'" + $("#alphabet").val() + "'");
  $("#-k").html("'" + $("#key").val() + "'");
  $("#-m").html("'" + $("#input").val() + "'");
}

// function to find args and change them
$("#operationForCode").on("click", function () {
  if (codeVisible == false) {
    $(".textareaWrapper").show();
    codeVisible = true;
    $("#operationForCode").html(
      '<i class="mr-2 fa fa-angle-double-up" aria-hidden="true"></i>' +
        "${{transposition.HIDE-CODE}}$"
    );
  } else {
    $("#operationForCode").html(
      '<i class="mr-2 fa fa-code" aria-hidden="true"></i>' +
        "${{transposition.SHOW-CODE}}$"
    );
    $(".textareaWrapper").hide();
    codeVisible = false;
  }
});

// //------------------------------------//
// //functions for manipulationg cmd arguments from GUI
$("#output").on("input", () => {
  $("#output-len").html(displaylength($("#output").val()));
});

$("#key").on("input", () => {
  let newKey = $("#key").val();
  $("#-k").html("'" + newKey + "'");

  //show permutation
  getPermutationForKey(newKey);
  $("#key-len").html(displaylength(newKey));
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
    $("#mod").html("--decrypt");
    //remove 5block options
    $("#addFiveBlocksCodeCheckbox").prop("disabled", true);
    $("#addFiveBlocksCodeCheckbox").prop("checked", false);
    $("#fiveblock").html("");
    $("#fiveblock").attr("hidden", true);
    //remove spaces options
    $("#removeSpaces").prop("disabled", true);
    $("#removeSpaces").prop("checked", false);
    $("#removeSpacesCMD").html("");
    $("#removeSpacesCMD").attr("hidden", true);
    //replace whitespace options
    $("#replaceChar").prop("checked", false);
    $("#replaceChar").prop("disabled", true);
    $("#charForReplace").attr("disabled", true);
    $("#-replaceCharCMD, #-rc").attr("hidden", true);
    $("#-rc").html(false);
  } else {
    if (fiveBlocksChecked) {
      $("#addFiveBlocksCodeCheckbox").prop("checked", true);
      $("#fiveblock").html("--blocks-of-five");
      $("#fiveblock").attr("hidden", false);
    }
    if (keepWhitespacesChecked) {
      $("#removeSpaces").prop("checked", true);
      $("#removeSpacesCMD").html("--remove-spaces");
      $("#removeSpacesCMD").attr("hidden", false);
    }
    if (replaceWhiteSpacesChecked) {
      $("#replaceChar").prop("checked", true);
      $("#-replaceCharCMD, #-rc").attr("hidden", false);
      $("#charForReplace").attr("disabled", false);
      let newChar = $("#charForReplace").val();
      $("#-rc").html("'" + newChar + "'");
    }

    $("#casesensitive").prop("disabled", false);
    $("#addFiveBlocksCodeCheckbox").prop("disabled", false);
    $("#removeSpaces").prop("disabled", false);
    $("#replaceChar").prop("disabled", false);
    $("#mod").html("--encrypt");
  }
  runCode();
});
$("#casesensitive").on("click", () => {
  if ($("#casesensitive").prop("checked")) {
    caseSensitiveChecked = true;
    getPermutationForKey($("#key").val());
    $("#cs").html("--case-sensitive");
    $("#cs").attr("hidden", false);
  } else {
    caseSensitiveChecked = false;
    getPermutationForKey($("#key").val().toUpperCase());
    $("#cs").html("");
    $("#cs").attr("hidden", true);
  }
  runCode();
});

$("#addFiveBlocksCodeCheckbox").on("click", () => {
  if ($("#addFiveBlocksCodeCheckbox").prop("checked")) {
    $("#fiveblock").html("--blocks-of-five");
    $("#fiveblock").attr("hidden", false);
    fiveBlocksChecked = true;
  } else {
    $("#fiveblock").html("");
    $("#fiveblock").attr("hidden", true);
    fiveBlocksChecked = false;
  }
  runCode();
});

$("#removeSpaces").on("click", () => {
  if ($("#removeSpaces").is(":checked")) {
    $("#removeSpacesCMD").html("--remove-spaces");
    $("#removeSpacesCMD").attr("hidden", false);
    keepWhitespacesChecked = true;
  } else {
    $("#removeSpacesCMD").html("");
    $("#removeSpacesCMD").attr("hidden", true);
    keepWhitespacesChecked = false;
  }
  runCode();
});
$("#replaceChar").on("click", () => {
  if ($("#replaceChar").is(":checked")) {
    $("#-replaceCharCMD, #-rc").attr("hidden", false);
    $("#charForReplace").attr("disabled", false);
    let newChar = $("#charForReplace").val();
    $("#-rc").html("'" + newChar + "'");
    replaceWhiteSpacesChecked = true;
  } else {
    $("#charForReplace").attr("disabled", true);
    $("#-replaceCharCMD, #-rc").attr("hidden", true);
    $("#-rc").html(false);
    replaceWhiteSpacesChecked = false;
  }
  runCode();
});

$("#charForReplace").on("input", () => {
  let newChar = $("#charForReplace").val();
  $("#-rc").html("'" + newChar + "'");
  runCode();
});

//radiobuttons for alphabet template
$("#defineOwnAlphabet").on("click", () => {
  $(".alphabetTemplates").hide();
  $("#alphabet").attr("disabled", false);
});

$("#putTogetherAlphabet").on("click", () => {
  $(".alphabetTemplates").show();
  $("#alphabet").attr("disabled", true);
});

//define own alphabet
$("#alphabet").on("input", async () => {
  let plaintext = $("#alphabet").val();
  let plaintextUniqueArray = new Set($("#alphabet").val().split(""));
  plaintextUniqueArray = Array.from(plaintextUniqueArray);
  if (plaintext != plaintextUniqueArray.join("")) {
    await delay(1000);
  }
  $("#alphabet").val(plaintextUniqueArray.join(""));

  $("#-a").html("'" + $("#alphabet").val() + "'");
  runCode();
});

//define alphabet
$("#uppercaseAlphabet").on("click", () => {
  if ($("#uppercaseAlphabet").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set($("#alphabet").val() + upperAlphabet)).join("")
    );
  } else {
    let eliminatedString = $("#alphabet").val();
    for (const symbol of upperAlphabet) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }

    $("#alphabet").val(eliminatedString);
  }

  $("#-a").html("'" + $("#alphabet").val() + "'");
  runCode();
});

$("#blanksAlphabet").on("click", () => {
  if ($("#blanksAlphabet").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set($("#alphabet").val() + blank)).join("")
    );
  } else {
    let eliminatedString = $("#alphabet").val();
    for (const symbol of blank) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#alphabet").val(eliminatedString);
  }

  $("#-a").html("'" + $("#alphabet").val() + "'");
  runCode();
});

$("#digitsAlphabet").on("click", () => {
  if ($("#digitsAlphabet").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set($("#alphabet").val() + digits)).join("")
    );
  } else {
    let eliminatedString = $("#alphabet").val();
    for (const symbol of digits) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#alphabet").val(eliminatedString);
  }

  $("#-a").html("'" + $("#alphabet").val() + "'");
  runCode();
});

$("#punctuationAlphabet").on("click", () => {
  if ($("#punctuationAlphabet").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set($("#alphabet").val() + punctuationMarks)).join("")
    );
  } else {
    let eliminatedString = $("#alphabet").val();
    for (const symbol of punctuationMarks) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#alphabet").val(eliminatedString);
  }

  $("#-a").html("'" + $("#alphabet").val() + "'");
  runCode();
});

$("#specialCharacters").on("click", () => {
  if ($("#specialCharacters").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set($("#alphabet").val() + specialcharacters)).join("")
    );
  } else {
    let eliminatedString = $("#alphabet").val();
    for (const symbol of specialcharacters) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#alphabet").val(eliminatedString);
  }

  $("#-a").html("'" + $("#alphabet").val() + "'");

  runCode();
});

$("#lowercaseAlphabet").on("click", () => {
  if ($("#lowercaseAlphabet").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set($("#alphabet").val() + lowerAlphabet)).join("")
    );
  } else {
    let eliminatedString = $("#alphabet").val();
    for (const symbol of lowerAlphabet) {
      eliminatedString = eliminatedString.replace(symbol, "");
    }
    $("#alphabet").val(eliminatedString);
  }

  $("#-a").html("'" + $("#alphabet").val() + "'");
  runCode();
});

$("#umlautsAlphabet").on("click", () => {
  if ($("#umlautsAlphabet").is(":checked")) {
    upperAlphabet = upperAlphabet + umlautsUpper;
    lowerAlphabet = lowerAlphabet + umlautsLower;
  } else {
    let eliminatedString = $("#alphabet").val();
    for (const symbol of umlautsUpper + umlautsLower) {
      upperAlphabet = upperAlphabet.replace(symbol, "");
      lowerAlphabet = lowerAlphabet.replace(symbol, "");
      eliminatedString = eliminatedString.replace(symbol, "");
    }

    $("#alphabet").val(eliminatedString);
  }
  if ($("#lowercaseAlphabet").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set(lowerAlphabet + $("#alphabet").val())).join("")
    );
  }
  if ($("#uppercaseAlphabet").is(":checked")) {
    $("#alphabet").val(
      Array.from(new Set(upperAlphabet + $("#alphabet").val())).join("")
    );
  }
  $("#-a").html("'" + $("#alphabet").val() + "'");
  runCode();
});

//end of functS to manipulate cdm line
// //-----------------------------------------------------------------------------------//
$("#dropdownTheme").on("click", "*", function () {
  $("#themeConfi").html($(this).html());
  editor.setOption("theme", $(this).html());
});

$("#fontsize").on("change , input", () => {
  //valide  input
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

function adjustCode(width) {
  if (width >= 992) {
    $("#fontsize").val(12);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 992 && width >= 768) {
    $("#fontsize").val(9);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 768 && width >= 492) {
    $(".button-edit-responsive").addClass("col-6");
    $(".button-edit-responsive").removeClass("col-9");
    $("#fontsize").val(7);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 492 && width >= 380) {
    $(".button-edit-responsive").removeClass("col-6");
    $(".button-edit-responsive").addClass("col-10");
    $("#fontsize").val(6);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  } else if (width < 380) {
    $(".button-edit-responsive").removeClass("col-6");
    $(".button-edit-responsive").addClass("col-10");
    $("#fontsize").val(5);
    $(".CodeMirror").css("font-size", $("#fontsize").val() + "px");
  }
  if (width < 564) {
    $(".resposive-button-code").removeClass("col-6");
    $(".resposive-button-code").addClass("col-12 mt-2");
  } else {
    $(".resposive-button-code").addClass("col-6");
    $(".resposive-button-code").removeClass("col-12 mt-2");
  }
}
$(window, document).resize(() => {
  //get html width
  let htmlWidth = $(document).width();
  let windowWidth = $(window).width();
  adjustCode(htmlWidth);
  adjustCode(windowWidth);
});

function makeGrid() {
  let text = "";
  if ($("#cryptCheckbox").prop("checked")) {
    text = $("#output").val();
  } else {
    text = $("#input").val();
  }

  let key = $("#key").val();
  if (!$("#casesensitive").prop("checked")) {
    key = key.toUpperCase();
  }
  const alpha = $("#alphabet").val().replace("[]", "[]");
  for (const symbol of key) {
    if (!alpha.includes(symbol)) {
      key = key.replace(symbol, "");
    }
  }

  let blockFive = $("#addFiveBlocksCodeCheckbox").prop("checked");
  let removeSpaces = $("#removeSpaces").prop("checked");
  let replaceChar = $("#replaceChar").prop("checked");

  if (replaceChar) {
    let char = $("#charForReplace").val();
    text = text.replace(/ /g, char);
  }

  if (removeSpaces || blockFive) {
    text = text.replace(/ /g, "");
  }
  for (const symbol of text) {
    if (!alpha.includes(symbol)) {
      text = text.replace(symbol, "");
    }
  }
  //abfragen welche ckeckboxen ausgwählt
  let keyLength = key.length;
  let textLength = text.length;
  let sortedKey = sortByCustomAlphabet(key);

  //key in table
  let rowKey = document.getElementById("keyOrder");
  let rowNumber = document.getElementById("keyNumberInAlpOrder");
  let textToGrid = document.getElementById("textToGrid");
  let dictArray = [];
  //remove childs
  while (rowKey.firstChild) {
    rowKey.removeChild(rowKey.firstChild);
    rowNumber.removeChild(rowNumber.firstChild);
  }
  while (textToGrid.firstChild) {
    textToGrid.removeChild(textToGrid.firstChild);
  }
  for (let i = 0; i < keyLength; i++) {
    let td = rowKey.insertCell(i);
    td.innerHTML = key[i];
    //numbers in table
    //search for numeric order
    for (let z = 0; z < keyLength; z++) {
      if (sortedKey[z] == key[i]) {
        dictArray.push([i, z]);
        let tdNumber = rowNumber.insertCell(i);
        tdNumber.innerHTML = z + 1;
        sortedKey[z] = undefined;
        break;
      }
    }
  }
  //text in table
  let textPointer = 0;
  const numberOfRows = Math.ceil(textLength / keyLength);
  $("#maxTenRows").hide();

  for (let rows = 0; rows < numberOfRows; rows++) {
    if (rows > 9) {
      $("#maxTenRows").show();
      break;
    }
    let textRow = textToGrid.insertRow(rows);
    for (let textChar = 0; textChar < keyLength; textChar++) {
      var cell = textRow.insertCell(textChar);
      if (textPointer >= textLength) {
        cell.innerHTML = "&nbsp;";
      } else {
        char = text[textPointer];
        if (char == " ") {
          char = "&nbsp";
        }
        cell.innerHTML = char;
      }

      textPointer++;
    }
  }
}

//param: string
function sortByCustomAlphabet(str) {
  //bubble sort
  let res = str.split("");
  const alpha = $("#alphabet").val();
  const len = res.length;
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len - i; j++) {
      if (alpha.indexOf(res[j - 1]) > alpha.indexOf(res[j])) {
        let temp = res[j - 1];
        res[j - 1] = res[j];
        res[j] = temp;
      }
    }
  }
  return res;
}

//param: both strings
//return 2d array with non alphabetic symbols for key and input
function showDifferenceBtwAlphabetAndInputs(input, key) {
  let difference = [[], []];
  alpha = $("#alphabet").val();
  for (const symbol of input) {
    if (!alpha.includes(symbol)) {
      difference[0].push(symbol);
    }
  }
  for (const symbol of key) {
    if (!alpha.includes(symbol)) {
      difference[1].push(symbol);
    }
  }
  return difference;
}
