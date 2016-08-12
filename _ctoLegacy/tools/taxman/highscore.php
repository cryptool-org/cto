<?php

//db zugang
$host = "localhost";
$user = "ctonline";
$passwort ="193KgV";
$dbname = "ctonline";
$tabname = "taxmanscore";
//mit joomla werten ersetzen

$timestamp = time();
$name = $_GET['name'];
$move = $_GET['move'];
$typ = $_GET['typ'];
$gamesize = $_GET['gamesize'];
global $playerscore;
global $taxmanscore;
$playerscore=0;
$taxmanscore=array();
if ($name=="") $name = "anonym";

function getteiler ($zahl)
{
		global $taxmanscore;
        $teilerzahl=0;
        for ($j=1;$j<$zahl;$j++)
        {
          if (($zahl % $j) == 0)
          {
          	$taken=FALSE;
          	for ($k=0; $k<sizeof($taxmanscore); $k++)
          	{
          		if ($taxmanscore[$k]==$j) $taken=TRUE;
          	}
            if ($taken==FALSE) $taxmanscore[sizeof($taxmanscore)]=$j;
          }
        }

}


if ($typ==1)
{
//new highscore entry

$error=false;
//get moves
$moves = explode("-", $move);
//is $moves or $gamesize emtpy?
if (sizeof($moves)==0 || $gamesize<2) return;


//playerscore
$playerscore=0;
for ($j=0; $j<sizeof($moves); $j++)
{
	//get next move
	$nextmove=$moves[$j];

    //lets see if all moves are in gamesize range
	if ($nextmove > $gamesize || $nextmove < 1) return;


	$playerscore+=$nextmove;
	$taxmansize=sizeof($taxmanscore);
	//calculate texmans score
	getteiler($nextmove);
	if ($taxmansize==sizeof($taxmanscore)) return;
}

//calculate final taxman score
$taxmanfinalscore=0;
for ($i=0; $i<sizeof($taxmanscore); $i++)
{
 $taxmanfinalscore += $taxmanscore[$i];
}

//calculate maximal score
$maxgamescore=0;
for ($i=0; $i<=$gamesize; $i++) $maxgamescore+=$i;

//if player & taxman score is bigger than maxgamescore something went wrong
if ($playerscore+$taxmanfinalscore > $maxgamescore) return;
//else $taxmanfinalscore = $maxgamescore-$playerscore;  ## not needed


//if this script is still running everything seems to be ok with the score :)
//time to write it to the highscore list.

$verbindung = mysql_connect($host, $user, $passwort);

//cut name
$name = substr($name, 0, 25);
//kill tags
$name = str_replace("</", "-", $name);
$name = str_replace("/>", "-", $name);
$name = str_replace("<", "-", $name);
$name = str_replace(">", "-", $name);
//create entry
$verbindung = mysql_connect($host, $user, $passwort);
mysql_query("use $dbname;", $verbindung);
mysql_query("Insert $tabname (name, score, size, chosen) Values ('$name', '$playerscore', '$gamesize', '$move');", $verbindung);
mysql_close();

echo 'TRUE';
return;
}
//end of typ1
//***************
//***************
//typ2 read highscore
if ($typ==2)
{
	$output="";
    $verbindung = mysql_connect($host, $user, $passwort);
	mysql_query("use $dbname;", $verbindung);
	$res=mysql_query("SELECT * From $tabname where size = $gamesize order by score DESC, date, name, id;", $verbindung);
    $num=mysql_num_rows($res);
    mysql_close();

    $output.='<table width="410" border="1">';
    $output.='
  <tr>
    <td width="88"><b>Platz</b></td>
    <td width="197"><b>Name</b></td>
    <td width="118"><b>Punktzahl</b></td>
    <td width="119"><b>Datum</b></td>
  </tr>';



    for ($i=0; $i<10 && $i<$num; $i++)
    {
     $name = mysql_result($res, $i, "name");
     //$name=htmlentities($name);
     $score = mysql_result($res, $i, "score");
     $datumalt = mysql_result($res, $i, "date");
     $datumuralt=$datumalt;
     $datumalt = substr($datumalt, 0, 4);
     $datumalt2 = substr($datumuralt, 5, 2);
     $datumalt3 = substr($datumuralt, 8, 2);
     $datum="$datumalt3.$datumalt2.$datumalt";

     $color="#FFFFFF";
     $txtcolor="#000000";
     if ($i==0) $color="#FFCC00";
     if ($i==1) $color="#999999";
     if ($i==2) $color="#996600";


     $output.='
       	 <tr>
   		 <td bgcolor="'.$color.'" color="'.$txtcolor.'">'.($i+1).'</td>
   		 <td bgcolor="'.$color.'" color="'.$txtcolor.'">'.$name.'</td>
         <td bgcolor="'.$color.'" color="'.$txtcolor.'">'.$score.'</td>
         <td bgcolor="'.$color.'" color="'.$txtcolor.'">'.$datum.'</td>
  		 </tr>';
     }

     if ($num<10)
     {
     	for ($i=$num; $i<10; $i++)
     	{
     	 $color="#FFFFFF";
    	 $txtcolor="#000000";
     	 if ($i==0) $color="#FFCC00";
     	 if ($i==1) $color="#999999";
    	 if ($i==2) $color="#996600";

     	 $output.='
       	 <tr>
   		 <td bgcolor="'.$color.'" color="'.$txtcolor.'">'.($i+1).'</td>
   		 <td bgcolor="'.$color.'" color="'.$txtcolor.'">&nbsp;</td>
         <td bgcolor="'.$color.'" color="'.$txtcolor.'">&nbsp;</td>
         <td bgcolor="'.$color.'" color="'.$txtcolor.'">&nbsp;</td>
  		 </tr>';
  		}
     }


$output.='</table>';


echo $output;
return;
}






?>
