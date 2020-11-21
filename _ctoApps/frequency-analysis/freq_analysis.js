let letters;
let absoluteNumberArray;
let stepsAbsoluteNumber; //length of frequencie
let chart;
let sortByAlpha = false;
let language = "${{ freqencyanalysis.JS-INIT-LANG }}$"; //default
/////init
//uncheck all radio buttons, then chech the default radio buttons
$(".tab-content input[type='radio']").prop("checked", false);
$("#sortByFreq, #sortEngFreqByAlphabet, #sortGerFreqByAlphabet").prop(
  "checked",
  true
);
//set slider value to 1
$("#numberInput").val(1);
document.getElementById("sliderForEnglishTable").value = 1;
document.getElementById("sliderForGermanTable").value = 1;
//if too droprigt button too small then cahnge to dropdown
let htmlWidth = $(document).width();
let windowWidth = $(window).width();
if (
  htmlWidth < 525 ||
  windowWidth < 525 ||
  (htmlWidth < 992 && htmlWidth > 768) ||
  (windowWidth < 992 && windowWidth > 768)
) {
  $("#buttonContainer").removeClass("dropright");
  $("#buttonContainer").addClass("dropdown");
} else {
  $("#buttonContainer").removeClass("dropdown");
  $("#buttonContainer").addClass("dropright");
}
//the radio buttons for the tables goes in two rows and get only half of the row so col-6 to col-12 (whe width smaller than 386)

if (htmlWidth < 386 || windowWidth < 386) {
  $(".tableAlphabetSort").removeClass("col-6");
  $(".tableAlphabetSort").addClass("col-12");
  $(".tableFreqSort").removeClass("col-5");
  $(".tableFreqSort").addClass("col-12");
} else {
  $(".tableAlphabetSort").removeClass("col-12");
  $(".tableAlphabetSort").addClass("col-6");
  $(".tableFreqSort").removeClass("col-12");
  $(".tableFreqSort").addClass("col-5");
}

let valueSpan = $(".valueRange");
let value = $("#sliderForDiagram");
valueSpan.hide();
$("#ciphertext").val("${{ freqencyanalysis.JS-INIT-INPUT }}$"); //set example text
document.getElementById("amountOfChars").innerHTML =
  "${{ freqencyanalysis.TEXTLENGTH}}$: " + $("#ciphertext").val().length;
runAnalysis();
//on site it does load css wrong idk why-> so in js
$("#numberInput").css("border-color", "green");
$("#download_link").css("background-color", "green");
$("#download_link").css("color", "white");

$("#numberInput").on("input", () => {
  if (isNaN($("#numberInput").val()) || $("#numberInput").val() < 1) {
    $("#numberInput").attr("onclick", "return false;");
    $(".invalid-feedback").show();
    $("#numberInput").css("border-color", "red");
    $("#download_link").css("background-color", "grey");
    $("#download_link").css("color", "black");
  } else if ($("#numberInput").val() > 15) {
    $("#numberInput").val(15);
  } else {
    if ($("#numberInput").val().toString().startsWith("0")) {
      $("#numberInput").val(
        parseInt($("#numberInput").val().toString().substr(1))
      );
    }
    $("#numberInput").attr("onclick", false);
    $(".invalid-feedback").hide();
    $("#numberInput").css("border-color", "green");
    $("#download_link").css("background-color", "green");
    $("#download_link").css("color", "white");
  }
});
//generate donwload file
$("#download_link").on("click", function (e) {
  let nGram = $("#numberInput").val();
  if ($(".invalid-feedback").is(":visible")) {
    e.preventDefault();
  }

  let ciphertext = $("#ciphertext").val();
  let array;

  array = calcabsolutenumber(ciphertext, parseInt(nGram), 1, 0);

  let text = nGram + "${{ freqencyanalysis.JS-DOWNLOAD-HEADER }}$" + "\n";
  amountOfResults = 0;
  amountOfNGrams = 0;
  for (var iterateArray = 0; iterateArray < array.length; iterateArray++) {
    text = text + array[iterateArray][0] + ", " + array[iterateArray][1] + "\n";
    amountOfNGrams += 1;
    amountOfResults += array[iterateArray][1];
  }
  text = text + "-------------------------------" + "\n";
  //übersetzen
  text =
    text +
    "${{ freqencyanalysis.JS-AMOUNT }}$ " +
    nGram +
    "${{ freqencyanalysis.JS-DOWNLOAD-NGRAM }}$: " +
    amountOfNGrams +
    "\n" +
    "${{ freqencyanalysis.JS-AMOUNT-OF-ALL }}$ " +
    nGram +
    "${{ freqencyanalysis.JS-DOWNLOAD-NGRAM }}$: " +
    amountOfResults;

  var data = new Blob([text], { type: "text/plain" });

  var url = window.URL.createObjectURL(data);

  document.getElementById("download_link").href = url;
});
//sort the Diagram by Alphabet
$("#sortByAlphabet").on("click", function () {
  sortByAlpha = true;
  sortBars();
  sortBarsByAlphabet();
});

//sort the diagram by frequencie
$("#sortByFreq").on("click", function () {
  sortByAlpha = false;
  sortBars();
});
//set string for dropdown button
let buttonString;
let setButtonString = () => {
  if ("${{ freqencyanalysis.LANG }}$" == "de") {
    buttonString =
      "Beschränkung auf das " + language.toLowerCase() + "e Alphabet";
  } else if ("${{ freqencyanalysis.LANG }}$" == "en") {
    buttonString = "Restrict to " + language + " alphabet";
  }
};

setButtonString();
document.getElementById("dropdownButton").innerHTML = buttonString;
$("#download").hide();
//if user chose english
$("#eng").on("click", function () {
  language = "${{ freqencyanalysis.JS-LANGUAGE-ENG }}$";
  setButtonString();
  document.getElementById("dropdownButton").innerHTML = buttonString;
  runAnalysis();
});
//if user chose german
$("#ger").on("click", function () {
  language = "${{ freqencyanalysis.JS-LANGUAGE-GER }}$";
  setButtonString();
  document.getElementById("dropdownButton").innerHTML = buttonString;
  runAnalysis();
});
//on input for text to analyse
$("#ciphertext").on("input", function () {
  document.getElementById("amountOfChars").innerHTML =
    "${{ freqencyanalysis.TEXTLENGTH}}$: " + $("#ciphertext").val().length;
  runAnalysis();
});

//user use slider
value.on("input change", () => {
  var numberBars = value.val();
  valueSpan.html(value.val());
  drawchart(absoluteNumberArray, "myChart", 0, stepsAbsoluteNumber);
  sortBars();
  chart.data.labels = chart.data.labels.slice(0, numberBars);
  chart.data.datasets[0].data = chart.data.datasets[0].data.slice(
    0,
    numberBars
  );
  chart.clear();
  chart.update();
  if (sortByAlpha) {
    sortBarsByAlphabet();
  }
});

$("#numberOfNgram").on("input", () => {
  if (
    isNaN($("#numberOfNgram").val()) ||
    $("#numberOfNgram").val() < 1 ||
    $("#numberOfNgram").val() > 25
  ) {
    $("#numberOfNgram").val(1);
  }

  runAnalysis();
});

//plus button
$("#plus").on("click", function () {
  let old_number = parseInt(document.getElementById("numberOfNgram").value);
  let new_number;
  if (old_number == 25) {
    new_number = 1;
  } else {
    new_number = old_number + 1;
  }
  $("#numberOfNgram").val(new_number);
  runAnalysis();
});

$("#min").on("click", function () {
  //minus
  let old_number = parseInt(document.getElementById("numberOfNgram").value);
  let new_number;
  if (old_number == 1) {
    new_number = 25;
  } else {
    new_number = old_number - 1;
  }

  $("#numberOfNgram").val(new_number);
  runAnalysis();
});
//analysis function
function runAnalysis() {
  var ciphertext = $("#ciphertext").val();
  stepsAbsoluteNumber = parseInt($("#numberOfNgram").val());
  absoluteNumberArray = calcabsolutenumber(
    ciphertext,
    stepsAbsoluteNumber,
    1,
    0
  );
  drawchart(absoluteNumberArray.slice(), "myChart", 0, stepsAbsoluteNumber);
  document
    .getElementById("sliderForDiagram")
    .setAttribute("max", absoluteNumberArray.length);

  if (chart.data.labels.length >= letters.length) {
    valueSpan.html(letters.length);
    sortBars();
    if (sortByAlpha) {
      sortBarsByAlphabet();
    }
    chart.data.labels = chart.data.labels.slice(0, letters.length);
    chart.data.datasets[0].data = chart.data.datasets[0].data.slice(
      0,
      letters.length
    );
    chart.clear();
    chart.update();
    document.getElementById("sliderForDiagram").value = letters.length;
  } else {
    sortBars();
    if (sortByAlpha) {
      sortBarsByAlphabet();
    }
    document.getElementById("sliderForDiagram").value =
      chart.data.labels.length;
    document.getElementById("sliderForDiagram").max = chart.data.labels.length;
  }

  valueSpan.html(value.val());
  valueSpan.show();

  $("#download").show();
}
//sort bars by frequency
function sortBars() {
  var arrayLabel = chart.data.labels;
  var arrayData = chart.data.datasets[0].data;
  arrayOfObj = arrayLabel.map(function (d, i) {
    return {
      label: d,
      data: arrayData[i] || 0,
    };
  });

  sortedArrayOfObj = arrayOfObj.sort(function (a, b) {
    return b.data - a.data;
  });

  newArrayLabel = [];
  newArrayData = [];
  sortedArrayOfObj.forEach(function (d) {
    newArrayLabel.push(d.label);
    newArrayData.push(d.data);
  });

  chart.data.labels = newArrayLabel;
  chart.data.datasets[0].data = newArrayData;
  chart.clear();
  chart.update();
}
//sort by alphabet
function sortBarsByAlphabet() {
  var arrayLabel = chart.data.labels;
  var arrayData = chart.data.datasets[0].data;
  arrayOfObj = arrayLabel.map(function (d, i) {
    return {
      label: d,
      data: arrayData[i] || 0,
    };
  });

  sortedArrayOfObj = arrayOfObj.sort(function (a, b) {
    if (a.label < b.label) {
      return -1;
    } else if (a.label > b.label) {
      return 1;
    } else {
      return 0;
    }
  });

  newArrayLabel = [];
  newArrayData = [];
  sortedArrayOfObj.forEach(function (d) {
    newArrayLabel.push(d.label);
    newArrayData.push(d.data);
  });

  chart.data.labels = newArrayLabel;
  chart.data.datasets[0].data = newArrayData;
  chart.clear();
  chart.update();
}
//set alphabet and get chars from text that are in alphabet
function choseLenguage(text) {
  var textlen = text.length;
  switch (language) {
    case "${{ freqencyanalysis.JS-LANGUAGE-GER }}$":
      letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "ä",
        "ö",
        "ü",
      ];
      letters = String.prototype.toUpperCase.apply(letters).split(",");
      letters.push("ß");
      text = text.replace(/[^a-zA-ZäöüÄÖÜß]+/gi, "");

      for (var i = 0; i < textlen; i++) {
        code = text.charCodeAt(i);

        if (text.charAt(i) !== "ß") {
          text = text.replace(text.charAt(i), text.charAt(i).toUpperCase());
        }
      }
      break;
    case "${{ freqencyanalysis.JS-LANGUAGE-ENG }}$":
      letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      letters = String.prototype.toUpperCase.apply(letters).split(",");

      text = text.replace(/[^a-z]+/gi, "");
      text = text.toUpperCase();
      break;
    default:
      //default english
      letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      letters = String.prototype.toUpperCase.apply(letters).split(",");

      text = text.replace(/[^a-z]+/gi, "");
      text = text.toUpperCase();
      break;
  }

  return text;
}

function createTable(array, max) {
  //max 26 or 30 depends on language
  // should be % 2 == 0
  array = array.sort(compareSecondColumn);
  var percentArray = [];
  for (var y = 0; y < array.length; y++) {
    percentArray.push(array[y][1]);
  }
  percentArray = calcpercent(percentArray);
  var table = $("#table");

  var thOne = $("#tablehead1");
  var thTwo = $("#tablehead2");
  var tdOne = $("#tabledata1");
  var tdTwo = $("#tabledata2");
  for (var i = 0; i < max; i++) {
    if (array[i] == undefined) {
      break;
    }
    if (i < max / 2) {
      thOne.append(
        "<td scope='col' width='7%'>" + "<b>" + array[i][0] + "</b>" + "</td>"
      );
      tdOne.append(
        "<td width='7%'>" + array[i][1] + "[" + percentArray[i] + "%]" + "</td>"
      );
    } else if (i >= max / 2) {
      thTwo.append(
        "<td scope='col' width='7%'>" + "<b>" + array[i][0] + "</b>" + "</td>"
      );
      tdTwo.append(
        "<td width='7%'>" + array[i][1] + "[" + percentArray[i] + "%]" + "</td>"
      );
    }
  }
}

function calcabsolutenumber(input, steps, distance, begin) {
  //calc the total number of letters absolute Anzahl
  // return array with keys                    //steps = 2 --> "ac"
  let letter = []; //                          //distance = how many char skip "calc" d = 2 so a would not calculate

  input = choseLenguage(input);

  for (let i = begin; i < input.length; i += distance) {
    if (i + steps >= input.length + 1) {
      break;
    }

    let temp = "";
    for (let a = i; a < i + steps; a++) {
      temp = temp + input[a];
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
function findIndexInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    // This if statement depends on the format of your array
    if (array[i][0] == item) {
      return i; // Found it
    }
  }
  return false; // Not found
}

//////////////////////////////////////////////////////////////////////////////////////////////7

function drawchart(array, name, begin, string) {
  let yaxis = [];
  numberarray = []; //-> global
  let stripLines = [];

  for (let i = 0; i < array.length; i++) {
    numberarray.push(array[i][0]);
    yaxis.push(array[i][1]);
  }
  let percentarray = calcpercent(yaxis);
  for (let i = 0.5; i < array.length + 0.5; i++) {
    //set striplines
    stripLines.push({ value: i, color: "black" });
  }

  if (chart) {
    chart.options.tooltips.callbacks = {
      label: function (tooltipItem) {
        let content =
          "${{ freqencyanalysis.JS-PERCENT }}$: " +
          tooltipItem.yLabel +
          "%  " +
          "-  " +
          "${{ freqencyanalysis.JS-ABSOLUT-AMOUNT }}$: " +
          yaxis[findIndexInArray(array, tooltipItem.xLabel.toString())];
        return content;
      },
    };
    chart.data.labels = numberarray;
    chart.data.datasets[0].data = percentarray;
    chart.clear();
    chart.update();
  } else {
    let ctx = document.getElementById(name).getContext("2d");
    chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "bar",

      wrap: false,

      // The data for our dataset
      data: {
        labels: numberarray,
        indexLabelWrap: false,
        datasets: [
          {
            label: "${{ freqencyanalysis.JS-DIAGRAM-LABEL }}$",
            backgroundColor: "green",
            borderColor: "green", //'rgb(255, 99, 132)''rgb(255, 99, 132)'
            data: percentarray,
          },
        ],
      },

      // Configuration options go here
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },

        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              let content =
                "${{ freqencyanalysis.JS-PERCENT }}$: " +
                tooltipItem.yLabel +
                "%  " +
                "-  " +
                "${{ freqencyanalysis.JS-ABSOLUT-AMOUNT }}$: " +
                yaxis[findIndexInArray(array, tooltipItem.xLabel.toString())];
              return content;
            },
          },
        },

        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (value) {
                  {
                    return value + "%";
                  }
                },

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
//calc percent for diagram
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

//table tab functions
let sortEngFreqByAlp = true;
let sortGermanFreqByAlp = true;
let numberEnglishTable = $("#valueForEnglish");
let valueSliderEnglishTable = $("#sliderForEnglishTable");
numberEnglishTable.html(valueSliderEnglishTable.attr("value"));

let numberGermanTable = $("#valueForGerman");
let valueSliderGermanTable = $("#sliderForGermanTable");
numberGermanTable.html(valueSliderGermanTable.attr("value"));

///////ENglisg gram arrays
englishOneGram = [
  ["A", 8.55],
  ["B", 1.6],
  ["C", 3.16],
  ["D", 3.87],
  ["E", 12.1],
  ["F", 2.18],
  ["G", 2.09],
  ["H", 4.96],
  ["I", 7.33],
  ["J", 0.22],
  ["K", 0.81],
  ["L", 4.21],
  ["M", 2.53],
  ["N", 7.17],
  ["O", 7.47],
  ["P", 2.07],
  ["Q", 0.1],
  ["R", 6.33],
  ["S", 6.73],
  ["T", 8.94],
  ["U", 2.68],
  ["V", 1.06],
  ["W", 1.83],
  ["X", 0.19],
  ["Y", 1.72],
  ["Z", 0.11],
];

englishTwoGram = [
  ["TH", 2.71],
  ["HE", 2.33],
  ["IN", 2.03],
  ["ER", 1.78],
  ["AN", 1.61],
  ["RE", 1.41],
  ["ES", 1.32],
  ["ON", 1.32],
  ["ST", 1.25],
  ["NT", 1.17],
  ["EN", 1.13],
  ["AT", 1.12],
  ["ED", 1.08],
  ["ND", 1.07],
  ["TO", 1.07],
  ["OR", 1.06],
  ["EA", 1],
  ["TI", 0.99],
  ["AR", 0.98],
  ["TE", 0.98],
  ["NG", 0.89],
  ["AL", 0.88],
  ["IT", 0.88],
  ["AS", 0.87],
  ["IS", 0.86],
  ["HA", 0.83],
  ["ET", 0.76],
  ["SE", 0.73],
  ["OU", 0.72],
  ["OF", 0.71],
];

englishThreeGram = [
  ["THE", 1.81],
  ["AND", 0.73],
  ["ING", 0.72],
  ["ENT", 0.42],
  ["ION", 0.42],
  ["HER", 0.36],
  ["FOR", 0.34],
  ["THA", 0.33],
  ["NTH", 0.33],
  ["INT", 0.32],
  ["ERE", 0.31],
  ["TIO", 0.31],
  ["TER", 0.3],
  ["EST", 0.28],
  ["ERS", 0.28],
  ["ATI", 0.26],
  ["HAT", 0.26],
  ["ATE", 0.25],
  ["ALL", 0.25],
  ["HES", 0.24],
  ["VER", 0.24],
  ["HIS", 0.24],
  ["ETH", 0.24],
  ["OFT", 0.22],
  ["ITH", 0.21],
  ["FTH", 0.21],
  ["STH", 0.21],
  ["OTH", 0.21],
  ["RES", 0.21],
  ["ONT", 0.2],
];

englishFourGram = [
  ["TION", 0.31],
  ["NTHE", 0.27],
  ["THER", 0.24],
  ["THAT", 0.21],
  ["OFTH", 0.19],
  ["FTHE", 0.19],
  ["THES", 0.18],
  ["WITH", 0.18],
  ["INTH", 0.17],
  ["ATIO", 0.17],
  ["OTHE", 0.16],
  ["TTHE", 0.16],
  ["DTHE", 0.15],
  ["INGT", 0.15],
  ["ETHE", 0.15],
  ["SAND", 0.14],
  ["STHE", 0.14],
  ["HERE", 0.13],
  ["THEC", 0.13],
  ["THEM", 0.12],
  ["RTHE", 0.12],
  ["MENT", 0.12],
  ["THEP", 0.11],
  ["FROM", 0.1],
  ["THIS", 0.1],
  ["TING", 0.1],
  ["THEI", 0.1],
  ["NGTH", 0.1],
  ["IONS", 0.1],
  ["ANDT", 0.1],
];

englishFiveGram = [
  ["OFTHE", 0.18],
  ["ATION", 0.17],
  ["INTHE", 0.16],
  ["THERE", 0.09],
  ["INGTH", 0.09],
  ["TOTHE", 0.08],
  ["NGTHE", 0.08],
  ["ANDTH", 0.07],
  ["NDTHE", 0.07],
  ["ONTHE", 0.07],
  ["OTHER", 0.07],
  ["ATTHE", 0.07],
  ["TIONS", 0.07],
  ["EDTHE", 0.06],
  ["THEIR", 0.06],
  ["TIONA", 0.06],
  ["ORTHE", 0.06],
  ["FORTH", 0.06],
  ["INGTO", 0.06],
  ["CTION", 0.05],
  ["WHICH", 0.05],
  ["THESE", 0.05],
  ["AFTER", 0.05],
  ["EOFTH", 0.05],
  ["THECO", 0.05],
  ["ABOUT", 0.04],
  ["ERTHE", 0.04],
  ["IONAL", 0.04],
  ["FIRST", 0.04],
  ["WOULD", 0.04],
];

/////////GErman gram array

germanOneGram = [
  ["A", 6.34],
  ["K", 1.5],
  ["U", 3.76],
  ["B", 2.21],
  ["L", 3.72],
  ["V", 0.94],
  ["C", 2.71],
  ["M", 2.75],
  ["W", 1.4],
  ["D", 4.92],
  ["N", 9.59],
  ["X", 0.07],
  ["E", 15.99],
  ["O", 2.75],
  ["Y", 0.13],
  ["F", 1.8],
  ["P", 1.06],
  ["Z", 1.22],
  ["G", 3.02],
  ["Q", 0.04],
  ["Ä", 0.54],
  ["H", 4.11],
  ["R", 7.71],
  ["Ö", 0.24],
  ["I", 7.6],
  ["S", 6.41],
  ["Ü", 0.63],
  ["J", 0.27],
  ["T", 6.43],
  ["ß", 0.15],
];

germanTwoGram = [
  ["ER", 3.9],
  ["EN", 3.61],
  ["CH", 2.36],
  ["DE", 2.31],
  ["EI", 1.98],
  ["TE", 1.98],
  ["IN", 1.71],
  ["ND", 1.68],
  ["IE", 1.48],
  ["GE", 1.45],
  ["ST", 1.21],
  ["NE", 1.19],
  ["BE", 1.17],
  ["ES", 1.17],
  ["UN", 1.13],
  ["RE", 1.11],
  ["AN", 1.07],
  ["HE", 0.89],
  ["AU", 0.89],
  ["NG", 0.87],
  ["SE", 0.83],
  ["IT", 0.81],
  ["DI", 0.81],
  ["IC", 0.8],
  ["SC", 0.77],
  ["LE", 0.73],
  ["DA", 0.72],
  ["NS", 0.71],
  ["IS", 0.7],
  ["RA", 0.69],
];

germanThreeGram = [
  ["DER", 1.04],
  ["EIN", 0.83],
  ["SCH", 0.76],
  ["ICH", 0.75],
  ["NDE", 0.72],
  ["DIE", 0.62],
  ["CHE", 0.58],
  ["DEN", 0.56],
  ["TEN", 0.51],
  ["INE", 0.48],
  ["UND", 0.48],
  ["TER", 0.44],
  ["GEN", 0.44],
  ["END", 0.44],
  ["ERS", 0.42],
  ["STE", 0.42],
  ["CHT", 0.41],
  ["UNG", 0.39],
  ["DAS", 0.38],
  ["ERE", 0.38],
  ["BER", 0.36],
  ["ENS", 0.36],
  ["NGE", 0.35],
  ["RDE", 0.35],
  ["VER", 0.34],
  ["EIT", 0.33],
  ["HEN", 0.31],
  ["ERD", 0.3],
  ["REI", 0.3],
  ["IND", 0.29],
];

germanFourGram = [
  ["EINE", 0.41],
  ["NDER", 0.29],
  ["ICHT", 0.27],
  ["CHEN", 0.24],
  ["SCHE", 0.23],
  ["ENDE", 0.2],
  ["LICH", 0.2],
  ["SICH", 0.19],
  ["ERDE", 0.18],
  ["INDE", 0.17],
  ["NDEN", 0.16],
  ["RDEN", 0.16],
  ["NDIE", 0.15],
  ["ISCH", 0.15],
  ["ICHE", 0.15],
  ["AUCH", 0.15],
  ["ERST", 0.14],
  ["SEIN", 0.14],
  ["NTER", 0.14],
  ["NICH", 0.13],
  ["EITE", 0.13],
  ["ANDE", 0.13],
  ["NGEN", 0.13],
  ["TSCH", 0.12],
  ["EDER", 0.12],
  ["DIES", 0.12],
  ["NACH", 0.12],
  ["DERS", 0.11],
  ["ESCH", 0.11],
  ["ÜBER", 0.11],
];

function compareSecondColumn(a, b) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] > b[1] ? -1 : 1;
  }
}

function compareFirstColumn(a, b) {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
}

createTableForFrequencies(
  englishOneGram.sort(compareFirstColumn),
  "englishTable"
);
createTableForFrequencies(
  germanOneGram.sort(compareFirstColumn),
  "germanTable"
);

$("#sortEngFreqByPer").on("click", () => {
  sortEngFreqByAlp = false;
  switch (numberEnglishTable.html()) {
    case "1":
      createTableForFrequencies(
        englishOneGram.sort(compareSecondColumn),
        "englishTable"
      );
      break;
    case "2":
      createTableForFrequencies(
        englishTwoGram.sort(compareSecondColumn),
        "englishTable"
      );
      break;
    case "3":
      createTableForFrequencies(
        englishThreeGram.sort(compareSecondColumn),
        "englishTable"
      );
      break;
    case "4":
      createTableForFrequencies(
        englishFourGram.sort(compareSecondColumn),
        "englishTable"
      );
      break;
    case "5":
      createTableForFrequencies(
        englishFiveGram.sort(compareSecondColumn),
        "englishTable"
      );
      break;
  }
});
$("#sortEngFreqByAlphabet").on("click", function () {
  sortEngFreqByAlp = true;
  switch (numberEnglishTable.html()) {
    case "1":
      createTableForFrequencies(
        englishOneGram.sort(compareFirstColumn),
        "englishTable"
      );
      break;
    case "2":
      createTableForFrequencies(
        englishTwoGram.sort(compareFirstColumn),
        "englishTable"
      );
      break;
    case "3":
      createTableForFrequencies(
        englishThreeGram.sort(compareFirstColumn),
        "englishTable"
      );
      break;
    case "4":
      createTableForFrequencies(
        englishFourGram.sort(compareFirstColumn),
        "englishTable"
      );
      break;
    case "5":
      createTableForFrequencies(
        englishFiveGram.sort(compareFirstColumn),
        "englishTable"
      );
      break;
  }
});

$("#sortGerFreqByPer").on("click", () => {
  sortGermanFreqByAlp = false;
  switch (numberGermanTable.html()) {
    case "1":
      createTableForFrequencies(
        germanOneGram.sort(compareSecondColumn),
        "germanTable"
      );
      break;
    case "2":
      createTableForFrequencies(
        germanTwoGram.sort(compareSecondColumn),
        "germanTable"
      );
      break;
    case "3":
      createTableForFrequencies(
        germanThreeGram.sort(compareSecondColumn),
        "germanTable"
      );
      break;
    case "4":
      createTableForFrequencies(
        germanFourGram.sort(compareSecondColumn),
        "germanTable"
      );
      break;
  }
});
$("#sortGerFreqByAlphabet").on("click", function () {
  sortGermanFreqByAlp = true;
  switch (numberGermanTable.html()) {
    case "1":
      createTableForFrequencies(
        germanOneGram.sort(compareFirstColumn),
        "germanTable"
      );
      break;
    case "2":
      createTableForFrequencies(
        germanTwoGram.sort(compareFirstColumn),
        "germanTable"
      );
      break;
    case "3":
      createTableForFrequencies(
        germanThreeGram.sort(compareFirstColumn),
        "germanTable"
      );
      break;
    case "4":
      createTableForFrequencies(
        germanFourGram.sort(compareFirstColumn),
        "germanTable"
      );
      break;
  }
});

valueSliderEnglishTable.on("input change", () => {
  numberEnglishTable.html(valueSliderEnglishTable.val());

  switch (numberEnglishTable.html()) {
    case "1":
      if (sortEngFreqByAlp) {
        createTableForFrequencies(
          englishOneGram.sort(compareFirstColumn),
          "englishTable"
        );
      } else {
        createTableForFrequencies(
          englishOneGram.sort(compareSecondColumn),
          "englishTable"
        );
      }
      break;
    case "2":
      if (sortEngFreqByAlp) {
        createTableForFrequencies(
          englishTwoGram.sort(compareFirstColumn),
          "englishTable"
        );
      } else {
        createTableForFrequencies(
          englishTwoGram.sort(compareSecondColumn),
          "englishTable"
        );
      }
      break;
    case "3":
      if (sortEngFreqByAlp) {
        createTableForFrequencies(
          englishThreeGram.sort(compareFirstColumn),
          "englishTable"
        );
      } else {
        createTableForFrequencies(
          englishThreeGram.sort(compareSecondColumn),
          "englishTable"
        );
      }
      break;
    case "4":
      if (sortEngFreqByAlp) {
        createTableForFrequencies(
          englishFourGram.sort(compareFirstColumn),
          "englishTable"
        );
      } else {
        createTableForFrequencies(
          englishFourGram.sort(compareSecondColumn),
          "englishTable"
        );
      }
      break;
    case "5":
      if (sortEngFreqByAlp) {
        createTableForFrequencies(
          englishFiveGram.sort(compareFirstColumn),
          "englishTable"
        );
      } else {
        createTableForFrequencies(
          englishFiveGram.sort(compareSecondColumn),
          "englishTable"
        );
      }
      break;
  }
});

valueSliderGermanTable.on("input change", () => {
  numberGermanTable.html(valueSliderGermanTable.val());

  switch (numberGermanTable.html()) {
    case "1":
      if (sortGermanFreqByAlp) {
        createTableForFrequencies(
          germanOneGram.sort(compareFirstColumn),
          "germanTable"
        );
      } else {
        createTableForFrequencies(
          germanOneGram.sort(compareSecondColumn),
          "germanTable"
        );
      }
      break;
    case "2":
      if (sortGermanFreqByAlp) {
        createTableForFrequencies(
          germanTwoGram.sort(compareFirstColumn),
          "germanTable"
        );
      } else {
        createTableForFrequencies(
          germanTwoGram.sort(compareSecondColumn),
          "germanTable"
        );
      }
      break;
    case "3":
      if (sortGermanFreqByAlp) {
        createTableForFrequencies(
          germanThreeGram.sort(compareFirstColumn),
          "germanTable"
        );
      } else {
        createTableForFrequencies(
          germanThreeGram.sort(compareSecondColumn),
          "germanTable"
        );
      }
      break;
    case "4":
      if (sortGermanFreqByAlp) {
        createTableForFrequencies(
          germanFourGram.sort(compareFirstColumn),
          "germanTable"
        );
      } else {
        createTableForFrequencies(
          germanFourGram.sort(compareSecondColumn),
          "germanTable"
        );
      }
      break;
  }
});

function createTableForFrequencies(gramArray, idOfTable) {
  //first delete last empty the last table
  $("#" + idOfTable).empty();
  //hardcoded the number of rows == 4
  let iterateArray = 0;
  for (let rows = 0; rows < 2; rows++) {
    $("#" + idOfTable).append(
      "<thead id = 'thead" + rows + idOfTable + "'></thead>"
    );
    $("#" + idOfTable).append(
      "<tbody id = 'tbody" + rows + idOfTable + "'></tbody>"
    );

    $("#thead" + rows + idOfTable).append(
      "<tr id = 'throw" + rows + idOfTable + "'></tr>"
    );
    $("#tbody" + rows + idOfTable).append(
      "<tr id = 'tbrow" + rows + idOfTable + "'></tr>"
    );

    // gram 26 lenght then in one row only 13 // >_ 30 -> 15
    for (let data = 0; data < gramArray.length / 2; data++) {
      $("#throw" + rows + idOfTable).append(
        "<td font-weight= 'bold' >" + gramArray[iterateArray][0] + "</td>"
      );
      $("#tbrow" + rows + idOfTable).append(
        "<td>" + gramArray[iterateArray][1] + "%" + "</td>"
      );
      iterateArray++;
    }
  }
}

//on resize

$(window, document).resize(() => {
  //get html width
  let htmlWidth = $(document).width();
  let windowWidth = $(window).width();
  if (
    htmlWidth < 525 ||
    windowWidth < 525 ||
    (htmlWidth < 992 && htmlWidth > 768) ||
    (windowWidth < 992 && windowWidth > 768)
  ) {
    $("#buttonContainer").removeClass("dropright");
    $("#buttonContainer").addClass("dropdown");
  } else {
    $("#buttonContainer").removeClass("dropdown");
    $("#buttonContainer").addClass("dropright");
  }
  if (htmlWidth < 386 || windowWidth < 386) {
    $(".tableAlphabetSort").removeClass("col-6");
    $(".tableAlphabetSort").addClass("col-12");
    $(".tableFreqSort").removeClass("col-5");
    $(".tableFreqSort").addClass("col-12");
  } else {
    $(".tableAlphabetSort").removeClass("col-12");
    $(".tableAlphabetSort").addClass("col-6");
    $(".tableFreqSort").removeClass("col-12");
    $(".tableFreqSort").addClass("col-5");
  }
});
