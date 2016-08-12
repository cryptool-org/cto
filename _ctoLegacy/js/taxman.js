//service layer
var aufgegeben=false;


function Utf8decode (text)
{
		text = text.replace(/ae/g, "ä");
		text = text.replace(/AE/g, "Ä");
		text = text.replace(/oe/g, "ö");
		text = text.replace(/OE/g, "Ö");
		text = text.replace(/ue/g, "ü");
		text = text.replace(/UE/g, "Ü");
		text = text.replace(/ss/g, "ß");
		return text;
}


function factors(n) {
  result = {};
  for (var f = 1; f <= n; f++) {
    if (n % f == 0) {
      var g = Math.floor(n / f);
      result[f] = true;
      result[g] = true;
      if (f >= g) break;
    }
  }
  return result;
}

function intersection(a, b) {
  result = {};
  for (var f in a) {
    if (f in b) {
      result[f] = true;
    }
  }
  return result;
}

function difference(a, b) {
  result = {};
  for (var f in a) {
    if (!(f in b)) {
      result[f] = true;
    }
  }
  return result;
}

function legalmove(move, available) {
  if (!(move in available)) return false;
  var remaining = intersection(factors(move), available);
  for (var f in remaining) {
    if (f != move) return true;
  }
  return false;
}

function newgame(n) {
  var result = {};
  result.available = {};
  result.taken = {};
  for (var i = 1; i <= n; i++) {
    result.available[i] = true;
  }
  result.size = n
  result.score = 0;
  result.tax = 0;
  result.legal = function(move) {
    return legalmove(move, this.available);
  }
  result.move = function(m) {
    for (var f in factors(m)) {
      if (f in this.available) {
        delete this.available[f];
        if (f == m) {
          this.taken[f] = true;
          this.score += parseInt(f);
        }
        else {
          this.tax += parseInt(f);
        }
      }
    }
  }
  result.finish = function() {
    for (var f in this.available) {
      delete this.available[f];
      this.tax += parseInt(f);
    }
  }
  return result;
}


//gui


function taxstyle() {
  var text = "";
  text += "table.taxman { border-collapse:collapse; border: 1px solid black;}";
  text += "table.taxcap { border-collapse:collapse; border:none }";
  text += "td.taxman { height: 40px; width: 40px; border: 1px solid black;";
  text += "   text-align: center !important; vertical-align:middle !important;"
  text += "   font: 18px Arial bold; color: #000000; }";
  text += "td.taxcap { height: 40px;";
  text += "   text-align: center !important; vertical-align:middle !important;";
  text += "   font: 18px Arial bold; color: #000000; }";
  return text;
}

function boardtext(n) {
  var text = "<table class=taxman><tr>";
  for (var i = 1; i <= n; i++) {
    if (i > 1 && i % 10 == 1) text += "</tr><tr>";
    text += "<td class=taxman id=n" + i +
            " onmouseover=mousein(" + i + ")" +
            " onmouseout=mouseout(" + i + ")" +
            " onclick=mouseclick(" + i + ")" +
            ">" + i + "</td>";
  };
  if (n % 10 != 0) {
    text += "<td colspan=" + (n % 10) + ">&nbsp;</td>";
  }
  text += "</tr></table>";
  return text;
}

function board(n) {
 /* var text = "<table class=taxcap>";
  text += "<tr>"
  text += "<td class=taxcap>Score:</td><td style=width:64px class=taxcap>";
  text += "<span id=taxscore>0</span></td>"
  text += "<td class=taxcap>Taxman:</td><td style=width:64px class=taxcap>";
  text += "<span id=tax>0</span></td>";
  text += "<td class=taxcap><input type=button value=Done onclick=done()>";
  text += " &nbsp; ";
  text += "<form style='display:inline' onsubmit='restart(); return false;'>";
  text += "<input type=submit value=Restart>";
  text += "<input type=text title='Board Size' id=newsize size=2 maxlength=3 ";
  text += " style='width:26px; text-align:right' value=" + n + ">";
  text += "</form>";
  text += "</td></tr>";
  text += "</table>";*/

  var text = "<div id=boardslot>";
  text += boardtext(n);
  text += "</div>";
  return text;
}

function cell(n) {
  return document.getElementById("n" + n);
}

function scorecell() {
  return document.getElementById("taxscore");
}

function taxcell() {
  return document.getElementById("tax");
}

function newsizecell() {
  return document.getElementById("newsize");
}

function repaint() {
  document.getElementById("boardslot").innerHTML = boardtext(game.size);
}

hover = null;
function recolor() {
  var taxed = {};
  var highlight = null;
  if (hover !== null && game.legal(hover)) {
    highlight = hover;
    taxed = intersection(factors(hover), game.available);
  }
  for (var i = 1; i <= game.size; i++) {
    color = "none";
    if (i in game.taken) color = "lightblue";
    else if (!(i in game.available)) color = "pink";
    else if (highlight == i) color = "blue";
    else if (i in taxed && document.getElementById("showmove").checked) color = "red";
    cell(i).style.background = color;
  }
  scorecell().value = game.score;
  taxcell().value = game.tax;
}

function mousein(n) {
  hover = n;
  recolor();
}

function mouseout(n) {
  hover = null;
  recolor();
}

function mouseclick(n) {
  if (game.legal(n)) {
    game.move(n);
    // add history entry
    var tmp = document.getElementById("choices").value;
    if (tmp!="") tmp+="-"+n;
    else tmp=n;
    document.getElementById("choices").value = tmp;
    //check if game is over
    if (isgameover()&&document.getElementById("autoend").checked) done();
  }
  recolor();
}

function done() {
if (aufgegeben==false)
{
  game.finish();
  recolor();
  writehighscore();
}
  aufgegeben=true;
}

//checks if the game is over
function isgameover()
{
	var gameover=true;
	for (var i = 1; i <= game.size; i++)
	{
		if (game.legal(i))
		{
			return false;
		}
	}
	return true;
}

//AJAX FUNCTIONS
function getXMLHttp()
{
  var xmlHttp

  try
  {
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    //Internet Explorer
    try
    {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e)
    {
      try
      {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e)
      {
        alert("Your browser does not support AJAX!")
        return false;
      }
    }
  }
  return xmlHttp;
}

function writehighscore()
{
  var xmlHttp = getXMLHttp();

  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      HandleWriteResponse(xmlHttp.responseText);
    }
  }
  var moves = document.getElementById("choices").value;
  var playername = document.getElementById("playername").value;
  var path = document.getElementById("modulpath").value;
  xmlHttp.open("GET", path+'highscore.php?action=query&move='+moves+'&gamesize='+game.size+'&name='+playername+'&typ=1', true);
  xmlHttp.setRequestHeader("Pragma", "no-cache");
  xmlHttp.setRequestHeader("Cache-Control", "must-revalidate");
  xmlHttp.setRequestHeader("If-Modified-Since", document.lastModified);
  xmlHttp.send(null);
}

function HandleWriteResponse(response)
{
  if (response=="TRUE")
  {
  	document.getElementById("highscore").style.visibility = "visible";
  	var size = parseInt(newsizecell().value);
  	readhighscore(size);
  }
}



function readhighscore(size)
{
  var xmlHttp = getXMLHttp();

  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      HandleReadResponse(xmlHttp.responseText);
    }
  }
  var path = document.getElementById("modulpath").value;
  xmlHttp.open("GET", path+'highscore.php?action=query&typ=2&gamesize='+game.size, true);
  xmlHttp.setRequestHeader("Pragma", "no-cache");
  xmlHttp.setRequestHeader("Cache-Control", "must-revalidate");
  xmlHttp.setRequestHeader("If-Modified-Since", document.lastModified);
  xmlHttp.send(null);
}

function readfirsthighscore(mypath)
{
  var xmlHttp = getXMLHttp();

  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4)
    {
      HandleReadResponse(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", mypath+'highscore.php?action=query&typ=2&gamesize=20', true);
  xmlHttp.setRequestHeader("Pragma", "no-cache");
  xmlHttp.setRequestHeader("Cache-Control", "must-revalidate");
  xmlHttp.setRequestHeader("If-Modified-Since", document.lastModified);
  xmlHttp.send(null);
}


function HandleReadResponse(response)
{
  //might throw exception if form part in not loaded yet
  try
  {
  if (document.getElementById("restartbutton").value=="Restart")
  {
  	response = response.replace(/Punktzahl/g, "Score");
  	response = response.replace(/Datum/g, "Date");
  	response = response.replace(/Platz/g, "Position");
  }
  }
  catch(err)
  {
  }
  try
  {
  document.getElementById("highscorelist").innerHTML=response;
  }
  catch(err)
  {
  }
}




function restart() {
  try
  {
  document.getElementById("highscore").style.visibility = "hidden";
  var size = parseInt(newsizecell().value);
  if (size > 1000) {
    size = 1000;
  }
  if (isNaN(size) || size < 1) {
    size = 20;
    newsizecell().value = size;
  }
  document.getElementById("choices").value = "";
  game = newgame(size);
  repaint();
  recolor();
  readhighscore(size);
  document.getElementById("highsize").innerHTML = size;
  aufgegeben=false;
  }
  catch(err)
  {
  }
}