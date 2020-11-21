var alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
var chart;
var defchart;
var numberarray;
var whichbuttonclicked;
var shiftChart;
var key = [];

$("#decypher-text").hide();
$("#containerToAnalyse").hide();
$("#dropdownButton").hide();
$("#tablewrapper").hide();

//init
let htmlWidth = $(document).width();
if (htmlWidth < 438) {
  $(".autocorrelationsBox, #autoCorrResult").css("font-size", "small");
} else {
  $(".autocorrelationsBox, #autoCorrResult").css("font-size", "medium");
}
$("#ciphertext").val(
  "ETGU RLXRGA JGM, OMTHECGX ANU JCCM XB TFKT HR N FZNAHQNVZA BBWFKFL. XM ANU YCGX XUCK FT UIPCDC PVUHCZLIXH JKKF IAI JTZRXGKF QW YAUIEVZ, RGBXUGDGJL EAF GMGME, NPU FXL MAVVPTLX VP TPNIXBIIYEAC JCJ GVGMGGU. DDK QNPP WTTVF, EIWEMSTTRNWR ANU EMIAMAI DMGX XUCE Y IHSY VYYI AIYRVB WBQ UKJ BXIPBORRXV ABTB, ZJM EG VYC PZI BH KFXKXL PZLT, OMTHECGX HREZBTW XUCK FT AEQ CDYHLIQ GEMJZL ZQECN MS OG RZAX XB CSYCWSA JZQ RTVRGI YCW GBPTCCMVNVV MC T PVHV MU LXHFP. GI PEF QEJN MLRP KFPM LR DVEPG VRUVYGVL VPKM P GIJ EZNWXV."
);

var text = $("#ciphertext").val();
runAnalysis();

$("#tableSelect").on("click", function () {
  $("#tablewrapper").show();
  $(".keyLengthChartContainer").hide();
});

$("#chartSelect").on("click", function () {
  $(".keyLengthChartContainer").show();
  $("#tablewrapper").hide();
});

$("#ciphertext").on("input", function () {
  text = $("#ciphertext").val();

  runAnalysis();
  if ($("#decypher-text").is(":visible")) {
    decypher(key.join(""));
  }
});

$("#right").hide();
$("#left").hide();

$("#min").on("click", function () {
  let number = $("#numoffreq").val();
  number = parseInt(number);
  if (number == 1) {
    $("#numoffreq").val(5);
  } else {
    number = number - 1;
    $("#ciphertext").val();
    $("#numoffreq").val(number);
  }
  runAnalysis();
});

$("#plus").on("click", function () {
  let number = $("#numoffreq").val();
  number = parseInt(number);
  if (number == 5) {
    $("#numoffreq").val(1);
  } else {
    number += 1;
    $("#numoffreq").val(number);
  }
  runAnalysis();
});

$("#right").on("click", function () {
  chart.data.labels.unshift(chart.data.labels.pop());
  chart.data.datasets[0].data.unshift(chart.data.datasets[0].data.pop());
  chart.clear();
  chart.update();

  $("#buttons .active").html(numberarray[0]);
  key[parseInt($("#buttons .active").attr("value"))] = numberarray[0];
  if (!key.includes(null)) {
    decypher(key.join(""));
  }

  getAutoCorrelationResult(
    chart.data.datasets[0].data,
    defchart.data.datasets[0].data
  );
});

$("#left").on("click", function () {
  chart.data.labels.push(chart.data.labels.shift());
  chart.data.datasets[0].data.push(chart.data.datasets[0].data.shift());
  chart.clear();
  chart.update();
  $("#buttons .active").html(numberarray[0]);
  key[parseInt($("#buttons .active").attr("value"))] = numberarray[0];
  if (!key.includes(null)) {
    decypher(key.join(""));
  }

  getAutoCorrelationResult(
    chart.data.datasets[0].data,
    defchart.data.datasets[0].data
  );
});

function runAnalysis() {
  $("#buttons button").removeClass("active");
  document.getElementById("amountOfChars").innerHTML =
    "${{vigenerebreak.TEXTLENGTH}}$: " + $("#ciphertext").val().length;
  if ($(".keyLengthChartContainer").is(":visible")) {
    $(".keyLengthChartContainer").show();
    $("#tablewrapper").hide();
  } else if ($("#tablewrapper").is(":visible")) {
    $(".keyLengthChartContainer").hide();
    $("#tablewrapper").show();
  }
  let numberoffreq = parseInt($("#numoffreq").val());
  frqsarr = findDistanceBetweenLetters(numberoffreq);

  resetTable();
  createtable(frqsarr, 21);
  shiftarray = calcCommonShift(frqsarr, 20); //64

  drawShiftChart(shiftarray, "keyLengthChart", 0);
  $("#dropdownButton").show();
  addKeyLengButtons(shiftarray.slice());
}

function compareSecondColumn(a, b) {
  if (a[1] === b[1]) {
    return a[0] > b[0] ? -1 : 1;
  } else {
    return a[1] > b[1] ? -1 : 1;
  }
}

function addKeyLengButtons(array) {
  array.sort(compareSecondColumn);
  let foundActiveButton = false;
  let activeLengthButton = $("#maxval .active");
  let element = document.getElementById("maxval");

  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }

  let divider = parseInt(array.length / 3);
  for (let i = 0; i < array.length; i++) {
    if (array[i][1] == 0) {
      break;
    }
    let btn = document.createElement("BUTTON");
    btn.innerHTML = array[i][0];
    btn.setAttribute("id", "buttonForBiggesValue" + (i + 1));
    btn.setAttribute("value", array[i][0]);
    btn.onclick = function () {
      keyLenButtonsOnClick(this);
    };
    btn.classList.add("mr-2", "mt-2", "btn");
    divider = i;

    if (
      btn.innerHTML == activeLengthButton.html() &&
      foundActiveButton == false
    ) {
      btn.classList.add("active");
      if ($("#buttons .active").length == 0) {
        $("#b1").click();
      } else {
        $("#buttons .active")[0].click();
      }
      foundActiveButton = true;
    }

    element.appendChild(btn);
  }

  if (foundActiveButton == false && key.length != 0) {
    $("#maxval").children(":first").click();
  }
  let children = element.children;
  for (let y = 0; y < element.childElementCount; y++) {
    if (y < divider / 3 || y == 0) {
      children[y].classList.add("btn-success");

      continue;
    } else if (y < (divider / 3) * 2) {
      children[y].classList.add("btn-warning");

      continue;
    } else if (y < array.length) {
      children[y].classList.add("btn-danger");

      continue;
    }
  }
}

function describe(value) {
  let string = [];
  for (let i = 1; i <= parseInt(value); i++) {
    string.push("A");
  }
  return string;
}

function describeII(numberII) {
  let stringII = [];
  let max = parseInt(numberII) * 5;
  for (let i = 1; i <= max; i += parseInt(numberII)) {
    stringII.push(i);
  }
  return stringII;
}

function keyLenButtonsOnClick(buttonClicked) {
  $("#containerToAnalyse").show();

  addButtons(parseInt(buttonClicked.value));
  whichbuttonclicked = buttonClicked;

  $("#decypher-text").show();
  drawdefaultchart();
  let max = parseInt(whichbuttonclicked.value);

  document.getElementById("descriptionOfButtons").innerHTML =
    "${{vigenerebreak.LETTER-BUTTON-DESCRIPTION-FIRST}}$" +
    max +
    "." +
    "${{vigenerebreak.LETTER-BUTTON-DESCRIPTION-SECOND}}$" +
    describe(max).join("-") +
    "\n" +
    ".${{vigenerebreak.LETTER-BUTTON-DESCRIPTION-THIRD}}$" +
    describeII(max).join(", ") +
    ", ..." +
    "\n" +
    "${{vigenerebreak.LETTER-BUTTON-DESCRIPTION-FOURTH}}$";
  key = [];
  let element = document.getElementById("buttons");

  for (let i = 0; i < element.childElementCount; i++) {
    key.push(element.children[i].innerHTML);
  }

  if (chart && $("#buttons .active").length == 1) {
    while (chart.data.labels[0] != $("#buttons .active").html()) {
      chart.data.labels.push(chart.data.labels.shift());
      chart.data.datasets[0].data.push(chart.data.datasets[0].data.shift());
      chart.clear();
      chart.update();
    }
  }

  if ($("#buttons .active").length == 0) {
    $("#b1").click();
  } else {
    $("#buttons .active")[0].click();
  }

  $("#right").show();
  $("#left").show();

  decypher(key.join(""));
}

function addButtons(max) {
  //KEYBUTTONS

  let element = document.getElementById("buttons");

  if (element.childElementCount > 0) {
    if (max > element.childElementCount) {
      for (let i = element.childElementCount; i < max; i++) {
        let btn = document.createElement("BUTTON");

        btn.innerHTML = key[i % key.length]; // here the char are put in the button

        btn.setAttribute("id", "b" + i);
        btn.setAttribute("value", i);
        btn.onclick = function () {
          buttonOnClick(this);
        };
        btn.classList.add("mr-2", "btn", "btn-success", "mt-1");
        element.appendChild(btn);
      }
    } else if (max < element.childElementCount) {
      if (parseInt($("#buttons .active").attr("value")) + 1 > max) {
        element.children[0].classList.add("active");
        drawchart(
          calcabsolutenumber(
            1,
            parseInt(whichbuttonclicked.value),
            parseInt($("#buttons .active").attr("value"))
          ),
          "chartToCompare",
          0
        );
      }

      while (element.childElementCount != max) {
        element.removeChild(element.lastChild);
      }
    }
  } else if (element.childElementCount == 0) {
    for (let i = 0; i < max; i++) {
      let btn = document.createElement("BUTTON");
      btn.innerHTML = "A";

      btn.setAttribute("id", "b" + (i + 1));
      btn.setAttribute("value", i);
      btn.onclick = function () {
        buttonOnClick(this);
      };
      btn.classList.add("mr-2", "btn", "btn-success", "mt-1");

      element.appendChild(btn);
    }
  }
}

$("#buttons").on("click", "*", function () {
  $("#buttons button").removeClass("active");
  $(this).addClass("active");
});

$("#maxval").on("click", "*", function () {
  $("#maxval button").removeClass("active");
  $(this).addClass("active");
});

//clicked on key length button
function buttonOnClick(button) {
  $("#left").show();
  $("#right").show();

  let begin = parseInt(button.value);

  drawchart(
    calcabsolutenumber(1, parseInt(whichbuttonclicked.value), begin),
    "chartToCompare",
    0
  );

  while (chart.data.labels[0] != button.innerHTML) {
    chart.data.labels.push(chart.data.labels.shift());
    chart.data.datasets[0].data.push(chart.data.datasets[0].data.shift());
    chart.clear();
    chart.update();
  }

  getAutoCorrelationResult(
    chart.data.datasets[0].data,
    defchart.data.datasets[0].data
  );
}

function calcCommonShift(array, number) {
  let shiftarray = [];

  for (let i = 0; i <= number; i++) {
    shiftarray.push([i, 0]);
  }

  for (let i = 0; i < array.length; i++) {
    //firs element in array[i] is ngarm and secind the amount of ngrams
    for (let z = 2; z < array[i].length; z++) {
      let number = array[i][z];

      if (number == 1) {
        shiftarray[1][1]++;
        continue;
      }
      for (let teiler = 2; teiler < 21; teiler++) {
        if (number % teiler == 0) {
          shiftarray[teiler][1]++;
        }
      }
    }
  }
  shiftarray.shift(); //delete firts elem of array because 0
  return shiftarray;
}

function drawdefaultchart() {
  let can = document.getElementById("defChart").getContext("2d");
  defchart = new Chart(can, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: alphabet,
      datasets: [
        {
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [
            8.34,
            1.5,
            2.7,
            4.1,
            12.6,
            2,
            2,
            6.1,
            6.7,
            0.2,
            0.9,
            4.2,
            2.5,
            6.8,
            7.7,
            1.7,
            0.1,
            5.7,
            6.1,
            9.4,
            2.8,
            1.1,
            2.3,
            0.2,
            2.1,
            0.1,
          ],
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: "${{vigenerebreak.ENGLISH-TABLE-LABEL}}$",
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              precision: 0,
              max: 15,
            },
          },
        ],
      },
    },
  });
}

function calcpercent(keyarray) {
  let sum = 0;
  let arr = [];
  for (let i = 0; i < keyarray.length; i++) {
    sum = sum + keyarray[i];
  }

  for (let y = 0; y < keyarray.length; y++) {
    arr.push(((keyarray[y] / sum) * 100).toFixed(1));
  }

  return arr;
}

function calcabsolutenumber(steps, distance, begin) {
  //calc the total number of alphabet absolute Anzahl
  // return array with keys                    //steps = 2 --> "ac"
  let letter = []; //                          //distance = how many char skip "calc" d = 2 so "a" would be skipped if begin = 0 --> c,l....

  for (let i = begin; i < text.length; i += distance) {
    if (i + steps >= text.length + 1 || !alphabet.includes(text[i])) {
      break;
    }

    let temp = "";
    for (let a = i; a < i + steps; a++) {
      if (alphabet.includes(text[a])) {
        temp = temp + text[a];
      }
    }

    if (!letter.includes(temp)) {
      letter.push(temp);
      letter[temp] = 1;
    } else {
      letter[temp]++;
    }
  }

  let final = [];

  for (let z = 0; z < letter.length; z++) {
    final.push([letter[z], letter[letter[z]]]);
  }

  return final;
}

function resetTable() {
  let table = document.getElementById("table");
  if (table.childElementCount > 0) {
    while (table.firstChild) {
      table.removeChild(table.lastChild);
    }
  }
}

function createtable(numarray, maxkeylen) {
  modarray = [];
  let table = document.getElementById("table");
  let tableheader = document.createElement("thead");
  table.appendChild(tableheader);
  let tablebody = document.createElement("tbody");
  table.appendChild(tablebody);
  for (let i = -1; i < numarray.length; i++) {
    let tr = document.createElement("tr");
    if (i == -1) {
      tr.appendChild(document.createElement("th"));
      tr.lastChild.setAttribute("id", "1");
      tr.appendChild(document.createElement("th"));
      tr.lastChild.setAttribute("id", "2");
      tr.cells[0].appendChild(
        document.createTextNode(
          $("#numoffreq").val() + "-${{vigenerebreak.GRAM}}$"
        )
      );
      tr.cells[1].appendChild(
        document.createTextNode("${{vigenerebreak.AMOUNT}}$")
      );

      for (let y = 1; y < maxkeylen; y++) {
        let th = document.createElement("th");

        tr.appendChild(th);
        tr.cells[y + 1].appendChild(document.createTextNode(y));
      }

      tableheader.appendChild(tr);
      continue;
    }

    tr.appendChild(document.createElement("td"));
    tr.appendChild(document.createElement("td"));

    tr.cells[0].appendChild(
      document.createTextNode(numarray[i][0].toString().toUpperCase())
    );
    tr.cells[1].appendChild(document.createTextNode(numarray[i][1]));

    let dividerarray = numarray[i].slice(2, numarray[i].length);

    let isX = false;
    for (let cell = 2; cell <= maxkeylen; cell++) {
      if (cell == 2) {
        tr.appendChild(document.createElement("td"));
        if (dividerarray.includes(1)) {
          tr.cells[cell].innerHTML = "x";
          tr.cells[cell].bgColor = "green";
          tablebody.appendChild(tr);
        }

        continue;
      }
      tr.appendChild(document.createElement("td"));

      let bool = dividerarray.every(function (item) {
        return item % (cell - 1) == 0;
      });

      if (bool) {
        tr.cells[cell].innerHTML = "x";
        tr.cells[cell].bgColor = "green";
        isX = true;
      }
    }
    if (isX == true) {
      tablebody.appendChild(tr);
    }
  }
}

function drawShiftChart(array, name, begin) {
  let yaxis = [];
  let numberarr = []; //-> local
  let stripLines = [];

  for (let index = begin; index < array.length; index++) {
    //push number from 2 to f.e. 64 for x axis
    numberarr.push(array[index][0]);
    yaxis.push(array[index][1]);
  }
  for (let i = 0.5; i < array.length + 0.5; i++) {
    stripLines.push({ value: i, color: "black" });
  }

  if (shiftChart) {
    shiftChart.data.labels = numberarr;
    shiftChart.data.datasets[0].data = yaxis;
    shiftChart.clear();
    shiftChart.update();
  } else {
    let cx = document.getElementById(name).getContext("2d");
    shiftChart = new Chart(cx, {
      // The type of chart we want to create
      type: "bar",

      // The data for our dataset
      data: {
        labels: numberarr,

        datasets: [
          {
            backgroundColor: "green",
            borderColor: "green",
            data: yaxis,
          },
        ],
      },

      // Configuration options go here

      options: {
        maintainAspectRatio: false,
        responsive: true,

        title: {
          display: true,
          text: "${{vigenerebreak.POSSIBLE-KEYSIZE-TABLE-LABEL}}$",
        },
        legend: {
          display: false,
        },
        tooltips: {},
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,

                precision: 0,
              },
            },
          ],
        },
      },
    });
  }
}

function drawchart(array, name, begin, string) {
  if (array.length == 0) {
    return 0;
  }
  let yaxis = [];
  numberarray = []; //-> global
  let stripLines = [];

  if (string == "shift") {
    for (let index = begin; index < array.length; index++) {
      //push number from 2 to f.e. 64 for x axis
      numberarray.push(array[index][0]);
      yaxis.push(array[index][1]);
    }
  } else {
    let temp = 0;

    numberarray = alphabet.slice();
    var array = array.sort();

    for (let i = 0; i < alphabet.length; i++) {
      if (alphabet[i] == array[temp][0] && array[temp] != undefined) {
        yaxis.push(array[temp][1]);

        if (temp < array.length - 1) {
          temp++;
        }
      } else {
        yaxis.push(0);
      }
    }
    var percentarray = calcpercent(yaxis);
  }

  for (let i = 0.5; i < array.length + 0.5; i++) {
    //set striplines
    stripLines.push({ value: i, color: "black" });
  }

  if (chart) {
    chart.data.labels = numberarray;
    chart.data.datasets[0].data = percentarray;
    chart.clear();
    chart.update();
  } else {
    let ctx = document.getElementById(name).getContext("2d");
    chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "bar",

      // The data for our dataset
      data: {
        labels: numberarray,
        datasets: [
          {
            backgroundColor: "green",
            borderColor: "green",
            data: percentarray,
          },
        ],
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "${{vigenerebreak.CIPHERTEXT-TABLE-LABEL}}$",
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 15,
                precision: 0,
              },
            },
          ],
        },
      },
    });
  }
}

function findDistanceBetweenLetters(steps) {
  text = text.replace(/\W/g, "");
  text = text.replace(/[^a-z]+/gi, "");
  text = text.toUpperCase();
  //replace all spaces //english language

  let letterArray = [];
  for (let i = 0; i < text.length; i++) {
    otherchar = false;

    if (i + steps >= text.length + 1) {
      break;
    }

    let temp = "";
    for (let a = i; a < i + steps; a++) {
      temp = temp + String(text[a]);
    }

    if (!letterArray.includes(temp)) {
      letterArray.push(temp);
      letterArray[temp] = [i];
    } else {
      letterArray[temp].push(i);
    }
  }

  let final = [];

  for (let x = 0; x < letterArray.length; x++) {
    array = letterArray[letterArray[x]];

    if (array != undefined) {
      amountOfNgrams = array.length;
      if (array.length > 1) {
        let diffarray = [];
        for (let c = array.length - 1; c >= 1; c--) {
          num = array[c];

          for (index = 0; index < c; index++) {
            let diff = num - array[index];

            diffarray.push(diff);
          }
        }
        if (diffarray.length > 0) {
          diffarray.unshift(amountOfNgrams);
          diffarray.unshift(letterArray[x]);

          final.push(diffarray);
        }
      }
    }
  }

  return final;
}

function getAutoCorrelationResult(shiftData, defaultData) {
  let result = 0;

  for (let i = 0; i < shiftData.length; i++) {
    result += Math.pow(
      parseFloat(defaultData[i] - parseFloat(shiftData[i])),
      2
    );
  }
  $("#autoCorrResult").html(result.toFixed(2));

  $(".autocorrelationsBox").html("${{vigenerebreak.AUTOCORRELAION-LABEL}}$");
}

//function to decypher the input
function decypher(key) {
  let ciphertext = $("#ciphertext").val();
  ciphertext = ciphertext.toUpperCase();

  key = key.toUpperCase();
  let keyplace = 0;
  let final = "";
  for (let i = 0; i < ciphertext.length; i++) {
    code = ciphertext.charCodeAt(i);
    char = ciphertext[i].toUpperCase();
    if (
      // numeric (0-9)(!(code > 47 && code < 58) &&
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      final = final + char;
      continue;
    }

    let copyletters = alphabet.slice();

    while (copyletters[0] != key[keyplace]) {
      copyletters.unshift(copyletters.pop());
    }

    for (let y = 0; y < copyletters.length; y++) {
      if (copyletters[y] == char) {
        final = final + alphabet[y];
        break;
      }
    }
    if (keyplace == key.length - 1) {
      keyplace = 0;
    } else {
      keyplace++;
    }
  }
  $("#decypher").val(final);
}

//window on resize if under 768 pixel set row to 2 to see all chars
$(window).resize(() => {
  //get html width
  let htmlWidth = $(document).width();
  if (htmlWidth < 438) {
    $(".autocorrelationsBox, #autoCorrResult").css("font-size", "small");
  } else {
    $(".autocorrelationsBox, #autoCorrResult").css("font-size", "medium");
  }
});
