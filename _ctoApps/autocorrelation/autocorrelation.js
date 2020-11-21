let chart;
let barChosen = 1;
let alphabet;
let alphabetlength = ${{ autocorrelation.ALPHABETLENGTH }}$;//set length of default alphabet 
let checkboxChecked = false;
let language = "${{ autocorrelation.JS-INIT-LANG }}$"; //default//English or German //Deutsch or Englisch
/////////init
document.getElementById("sliderForDiagram").value = alphabetlength;
$("#input").val("${{ autocorrelation.JS-INIT-INPUT }}$");
let sliderValue = $("#sliderValue");
let slider = $("#sliderForDiagram");
document.getElementById("amountOfChars").innerHTML = "${{ autocorrelation.TEXTLENGTH }}$: " + $("#input").val().length;
runAutocorr();
////////////init end
//ifv space for droprigt button too small then change to dropdown
let htmlWidth = $(document).width();
let windowWidth = $(window).width();
if (htmlWidth < 525 || windowWidth < 525 || (htmlWidth < 992 && htmlWidth > 768) || (windowWidth < 992 && windowWidth > 768)) {
  $("#buttonContainer").removeClass("dropright");
  $("#buttonContainer").addClass("dropdown");
} else {
  $("#buttonContainer").removeClass("dropdown");
  $("#buttonContainer").addClass("dropright");
}
sliderValue.html(slider.val());

slider.on("input", () => {
	
	sliderValue.html(slider.val());
	document.getElementById("sliderValue").value = slider.val();

	setSliderAndChart();
});
let buttonString;
const setButtonString = () => {
	if("${{ autocorrelation.LANG }}$" == "de"){
		buttonString = "Beschränkung auf das "+ language.toLowerCase()+"e Alphabet";
	}else if("${{ autocorrelation.LANG }}$" == "en"){
		buttonString = "Restrict to "+ language + " alphabet" ;
	}
}

setButtonString();
document.getElementById("dropdownButton").innerHTML = buttonString;
$("#eng").on("click", function () {
	if (language != "${{ autocorrelation.LANGUAGE-CHOOSE-ENG }}$") {
		language = "${{ autocorrelation.LANGUAGE-CHOOSE-ENG }}$";
		setButtonString();
		document.getElementById("dropdownButton").innerHTML = buttonString;
		runAutocorr();
		document.getElementById("sliderForDiagram").value = alphabetlength;

		sliderValue.html(slider.val());
		setSliderAndChart();
	}
});

$("#ger").on("click", function () {
	if (language != "${{ autocorrelation.LANGUAGE-CHOOSE-GER }}$") {
		language = "${{ autocorrelation.LANGUAGE-CHOOSE-GER }}$";
		setButtonString();
		document.getElementById("dropdownButton").innerHTML = buttonString;
		runAutocorr();
		document.getElementById("sliderForDiagram").value = alphabetlength;
		sliderValue.html(slider.val());
		setSliderAndChart();
	}
});

$("#input").on("input", function () {
	document.getElementById("amountOfChars").innerHTML = "${{ autocorrelation.TEXTLENGTH }}$: " + $("#input").val().length;
	runAutocorr();
});

function runAutocorr() {
	input = $("#input").val();

	drawchart(autocorrelation());
    
	if (chart.data.labels.length > alphabetlength) {
		document.getElementById("sliderForDiagram").max = chart.data.labels.length;
		document.getElementById("sliderForDiagram").value = document.getElementById("sliderForDiagram").value;
		sliderValue.html(slider.val());
	} else {
		document.getElementById("sliderForDiagram").max = chart.data.labels.length;
		document.getElementById("sliderForDiagram").value = document.getElementById("sliderForDiagram").max;

		sliderValue.html(slider.val());
	}

	chart.data.labels = chart.data.labels.slice(0, document.getElementById("sliderForDiagram").value);
	chart.clear();
	chart.update();
	oneRoundAutocorrelation(barChosen + 1);
}

function setSliderAndChart() {
	drawchart(autocorrelation());
	chart.data.labels = chart.data.labels.slice(0, document.getElementById("sliderForDiagram").value);
	chart.clear();
	chart.update();
}

function choseLenguage(text) {
    //define alphabet and filter/ replace non alphabetic chars
    switch(language){
	case "${{ autocorrelation.LANGUAGE-CHOOSE-GER }}$":
		alphabet = [
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
			"ß",
		];
		alphabetlength = alphabet.length;
        text = text.replace(/[^a-zA-ZäöüÄÖÜß]+/gi, "");
        break;
	case "${{ autocorrelation.LANGUAGE-CHOOSE-ENG }}$":
		alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

		alphabetlength = alphabet.length;
        text = text.replace(/[^a-z]+/gi, "");
        break;
    default://default english
        alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

		alphabetlength = alphabet.length;
        text = text.replace(/[^a-z]+/gi, "");
        break;
	}
    
	return text;
}
function oneRoundAutocorrelation(runs, a) {
	document.getElementById("showHits").hidden = false;
	
	$("#hits").html("${{ autocorrelation.SHIFT-BY-STRING }}$: ");
	$("#hits").html($("#hits").html() + runs.toString());
	$(".textToComparison").html("");

	text = $("#input").val();

	let NotLettersArray = [];
	for (let charPos = 0; charPos < text.length; charPos++) {
		if (alphabet.includes(text.charAt(charPos).toLowerCase()) == false) {
			NotLettersArray.push(text.charAt(charPos));
		} else {
			NotLettersArray.push(undefined);
		}
	}

	text = choseLenguage(text);
	text = text.split("");
	let orginalText = text.slice();

	for (let i = 0; i < runs; i++) {
		text.unshift("");
		text.pop();
	}

	let arrayHitOne = [];
	let arrayHitTwo = [];
	let y = 0;

	for (let i = 0; i < NotLettersArray.length; i++) {
		if (NotLettersArray[i] != undefined) {
			continue;
		}

		if (text[y].toLowerCase() == orginalText[y].toLowerCase()) {
			if (orginalText[y] != "ß") {
				NotLettersArray[i] = orginalText[y].toUpperCase();
			} else {
				NotLettersArray[i] = orginalText[y];
			}

			arrayHitOne.push(i);
			let hitPointer = i;
			let counter = 0;

			for (let pointer = i; pointer >= hitPointer - (runs + counter); pointer--) {
				if (NotLettersArray[pointer] != undefined && alphabet.includes(NotLettersArray[pointer].toLowerCase()) == false) {
					counter++;
					continue;
				}
				if (pointer == hitPointer - (runs + counter)) {
					arrayHitTwo.push(runs + counter);
					counter = 0;
					break;
				}
			}
		} else {
			NotLettersArray[i] = orginalText[y].toLowerCase();
		}

		y++;
	}
	let amountOfClashes = 0;
	for (let z = 0; z < NotLettersArray.length; z++) {
		if (arrayHitOne.includes(z)) {
			NotLettersArray[z] = "<span class='hit' id=" + amountOfClashes + ">" + NotLettersArray[z] + "</span>";
			NotLettersArray[z - arrayHitTwo[amountOfClashes]] =
				"<span class='hit2'id=" + amountOfClashes + ">" + NotLettersArray[z - arrayHitTwo[amountOfClashes]] + "</span>";
			amountOfClashes++;
		}
	}

	$(".textToComparison").html(NotLettersArray.join(""));
}
let color;
$(document).on("mouseover", ".hit", function () {
    //hardcoded

	if ($(".hit2#" + $(this).attr("id")).length > 0 && $(".hit2#" + $(this).attr("id") + " .hit").length == 0) {
		color = $(".hit2#" + $(this).attr("id")).css("background-color");
		$(".hit2#" + $(this).attr("id")).css("background-color", "red");
        $(this).css("background-color", "green");
        $(this).css("color", "white");
	} else if ($(".hit2#" + $(this).attr("id") + " .hit").length > 0) {
		color = $(".hit2#" + $(this).attr("id") + " .hit").css("background-color");
		$(this).css("background-color", "green");
        $(".hit2#" + $(this).attr("id") + " .hit").css("background-color", "red");
        
	}
});

$(document).on("mouseout", ".hit", function () {
	//hardcoded
	$(this).css("background-color", "rgb(1, 255, 1)");
    //
    $(this).css("color", "black");
	$(".hit2#" + $(this).attr("id") + " .hit").css("background-color", color);
    $(".hit2#" + $(this).attr("id")).css("background-color", color);
    
});

function autocorrelation() {
	text = $("#input").val();
	text = choseLenguage(text);

	var final = [];
	for (var z = 0; z < text.length; z++) {
		final.push([z + 1, 0]);
	}
	var orginalText = text.slice();
	orginalText = orginalText.split("");
	text = text.split("");

	for (var i = 0; i < text.length; i++) {
		text.unshift("");
		text.pop();

		for (var y = i; y < text.length; y++) {
			if (text[y].toLowerCase() == orginalText[y].toLowerCase()) {
				final[i + 1][final[i][1]++];
			}
		}
	}

	return final;
}
function onClickEvent(e, a) {
	chart.data.datasets[0].backgroundColor[barChosen] = "green";
	if (a[0] != undefined) {
		chart.clear();
		chart.update();
		a[0]._chart.config.data.datasets[0]._meta[0].data[parseInt(a[0]._index)]._model.backgroundColor = "rgb(1, 255, 1)";

		barChosen = a[0]._index;
		oneRoundAutocorrelation(parseInt(a[0]._index) + 1, a);
	}
}

function drawchart(array) {
	var stripLines = [];
	var numberarray = [];
	var yaxis = [];
	for (let index = 1; index <= array.length; index++) {
		numberarray.push(index);
	}
	for (let i = 0.5; i < array.length + 0.5; i++) {
		//set striplines
		stripLines.push({ value: i, color: "black" });
	}
	for (let i = 0; i < array.length; i++) {
		yaxis.push(array[i][1]);
	}

	if (chart != undefined) {
		let color = [];
		chart.data.labels = numberarray;
		chart.data.datasets[0].data = yaxis;
		for (let i = 0; i < yaxis.length; i++) {
			if (i == barChosen) {
				//here the other color of bar
				color.push("rgb(1, 255, 1)");
				continue;
			}
			color.push("green");
		}
		chart.data.datasets[0].backgroundColor = color;

		chart.clear();
		chart.update();
	}
	//make backgroundcolor
	else {
		let color = [];
		for (let i = 0; i < yaxis.length; i++) {
			if (i == barChosen) {
				//here the other color of bar
				color.push("rgb(1, 255, 1)");
				continue;
			}
			color.push("green");
		}
		var ctx = document.getElementById("myChart").getContext("2d");
		chart = new Chart(ctx, {
			// The type of chart we want to create
			type: "bar",

			// The data for our dataset
			data: {
				labels: numberarray,
				datasets: [
					{
						backgroundColor: color,

						data: yaxis,
					},
				],
			},

			options: {
                maintainAspectRatio: false,
                responsive: true,
				title: {
					display: true,
					text: "${{ autocorrelation.DIAGRAM-LABEL }}$",
				},
				legend: {
					display: false,
				},
				scales: {
					yAxes: [
						{
							ticks: {
								precision: 0,
							},
						},
					],
				},
				onClick: onClickEvent,
			},
		});
	}
}

//on resize
$(window , document).resize(() => {
    //get html width
  
    let htmlWidth = $(document).width();
    let windowWidth = $(window).width();  
    
    if (htmlWidth < 525 || windowWidth < 525 || (htmlWidth < 992 && htmlWidth > 768) || (windowWidth < 992 && windowWidth > 768)) {
      $("#buttonContainer").removeClass("dropright");
      $("#buttonContainer").addClass("dropdown");
    } else {
      $("#buttonContainer").removeClass("dropdown");
      $("#buttonContainer").addClass("dropright");
    }
  });