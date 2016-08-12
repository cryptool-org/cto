<?php
defined('_JEXEC') or die('Restricted access');
//ERROR_REPORTING(E_ALL);
//Daten aus umgebung übernehmen
$oben=$_POST[oben];
$ueb=$_POST[ueb];
$unten=$_POST[unten];
$wst1=$_POST[wst1];
$wst2=$_POST[wst2];
$wst3=$_POST[wst3];
$ukw=$_POST[ukw];
$wp1=$_POST[wp1];
$wp2=$_POST[wp2];
$wp3=$_POST[wp3];
$sprp1=$_POST[sprp1];
$sprp2=$_POST[sprp2];
$steckbr=$_POST[steckbr];
//------------------------ Laden der notwendigen Funktionen ---------------------------------
# require("fkt_coder_enigma.php");//läd die enigmafunktion
require ('alfa_dat.php');
require ('fkt_coder.php');
require ('fkt_coder_enigma.php');
require ('fkt_decipher.php');
########################################################
## Enigma M3 v1.0 (beta)
########################################################
$cipherVersion[]=array('Enigma M3','1.0','20060601','Andreas Hauschild, Matthias Luttenberger');

//----------------------------------- Layout ------------------------------------------------
switch($_POST['wp1'])
{
  case '1': $wp1=$walze1;break;
  case '2': $wp1=$walze2;break;
  case '3': $wp1=$walze3;break;
  case '4': $wp1=$walze4;break;
  case '5': $wp1=$walze5;break;
  default: {$wp1=$walze1;$_POST['wp1']=1;}
  //Falls kein richtiger Wert eingegeben wurder, wird ein Standartwert verwendet
}//Festlegung der Walze an Walzenposition 1
switch($_POST['wp2'])
{
  case '1': $wp2=$walze1;break;
  case '2': $wp2=$walze2;break;
  case '3': $wp2=$walze3;break;
  case '4': $wp2=$walze4;break;
  case '5': $wp2=$walze5;break;
  default: {$wp2=$walze2;$_POST['wp2']=2;}
  //Falls kein richtiger Wert eingegeben wurder, wird ein Standartwert verwendet
}//Festlegung der Walze an Walzenposition 2
switch($_POST['wp3'])
{
  case '1': $wp3=$walze1;break;
  case '2': $wp3=$walze2;break;
  case '3': $wp3=$walze3;break;
  case '4': $wp3=$walze4;break;
  case '5': $wp3=$walze5;break;
  default: {$wp3=$walze3;$_POST['wp3']=3;}
  //Falls kein richtiger Wert eingegeben wurder, wird ein Standartwert verwendet
}//Festlegung der Walze an Walzenposition 3



if($_POST['ueb']=="vona")
{
$text=$_POST['oben'];
$text=strtoupper($text);//Hier werden alle Zeichen groß gemacht
$text=strfix($text);//Hier werden vorhandene Umlaute in Bigramme konvertiert
$text=leerraus($text);//Entfernen der vorhandenen Leerzeichen
$code=enigma($wp1,$wp2,$wp3,$stator,$text,$_POST['sprp1'],$_POST['sprp2'],$_POST['wst1'],$_POST['wst2'],$_POST['wst3'],$_POST['steckbr'],$_POST['ukw']);
$code2=spacing($code,5);
$text=spacing($text,5);
$code1=$text;
}
if($_POST['ueb']=="vuna"){
$text=$_POST['unten'];
$text=strtoupper($text);//Hier werden alle Zeichen groß gemacht
$text=strfix($text);//Hier werden vorhandene Umlaute in Bigramme konvertiert
$text=leerraus($text);//Entfernen der vorhandenen Leerzeichen
echo $_POST['steckbr'];
$code=enigma($wp1,$wp2,$wp3,$stator,$text,$_POST['sprp1'],$_POST['sprp2'],$_POST['wst1'],$_POST['wst2'],$_POST['wst3'],$_POST['steckbr'],$_POST['ukw']);
$code1=spacing($code,5);
$text=spacing($text,5);
$code2=$text;
}


$lang_POST=JTEXT::_('POST');
$lang_UPDOWN=JTEXT::_('UPDOWN');
$lang_DOWNUP=JTEXT::_('DOWNUP');
$lang_ROTORPOSITION=JTEXT::_('ROTORPOSITION');
$lang_INITALROTORPOSITION=JTEXT::_('INITALROTORPOSITION');
$lang_REFLECTOR=JTEXT::_('REFLECTOR');
$lang_USEDROTORS=JTEXT::_('USEDROTORS');
$lang_STEPPINGPOSITION=JTEXT::_('STEPPINGPOSITION');
$lang_PLUGBOARD=JTEXT::_('PLUGBOARD');
$lang_PLUGBOARDTEXT=JTEXT::_('PLUGBOARDTEXT');
$lang_CHARACTERSET=JTEXT::_('CHARACTERSET');
$lang_ROTORCONFIGURATION=JTEXT::_('ROTORCONFIGURATION');
$lang_ROTOR=JTEXT::_('ROTOR');
$lang_ATPOSITION=JTEXT::_('ATPOSITION');


if ($code1=="") $code1="ENIGMA";
if ($code2=="") $code2="FQGAHW";


$inhalt.= "
<form action=\"\" method=\"post\" name=form>
<table border=\"0\">
<tr>
<td><textarea name=\"oben\" rows=\"8\" cols=\"50\" class=\"ctoformcss-txtinput-style ctoformcss-default-input-size\">".$code1."</textarea>
<tr><td><center>
<input name=\"ueb\" type=\"radio\" value=\"vona\"checked>$lang_UPDOWN
<input name=\"ueb\" type=\"radio\" value=\"vuna\"";
if($_POST['ueb']=="vuna"){$inhalt.= "checked";}
$inhalt.= ">$lang_DOWNUP

<tr><td>
<textarea name=\"unten\" rows=\"8\" cols=\"50\" class=\"ctoformcss-txtinput-style ctoformcss-default-input-size\">".$code2."</textarea>
<tr><td><center><input type=\"submit\" value='$lang_POST' class='ctoformcss-default-button-m'>
";
$inhalt.= "</table><table border=\"0\"><tr><td><font size=1><center>$lang_INITALROTORPOSITION(000=AAA)<br>
$lang_ROTORPOSITION 1(0-".(count($stator)-1).") :<input name=\"wst1\" type=\"text\" value=\"0\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='2'><br>
$lang_ROTORPOSITION 2(0-".(count($stator)-1).") :<input name=\"wst2\" type=\"text\" value=\"0\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='2'><br>
$lang_ROTORPOSITION 3(0-".(count($stator)-1).") :<input name=\"wst3\" type=\"text\" value=\"0\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='2'>
<td><font size=1><center>$lang_REFLECTOR<br><input name=\"ukw\" type=\"radio\" value=\"0\" checked>UKW B<br>
<input name=\"ukw\" type=\"radio\" value=\"1\"";
if($_POST['ukw']=="1"){$inhalt.= "checked";}
$inhalt.= " >UKW C
<td><font size=1><center>$lang_USEDROTORS<br>
$lang_ROTOR :<input name=\"wp1\" type=\"text\" value=\"".$_POST['wp1']."\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='1'><br>
$lang_ROTOR :<input name=\"wp2\" type=\"text\" value=\"".$_POST['wp2']."\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='1'><br>
$lang_ROTOR :<input name=\"wp3\" type=\"text\" value=\"".$_POST['wp3']."\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='1'>
<tr>
<td><center><font size=1>
$lang_STEPPINGPOSITION 2(0-".(count($stator)-1).") :<input name=\"sprp1\" type=\"text\" value=\"22\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='2'><br>
$lang_STEPPINGPOSITION 3(0-".(count($stator)-1).") :<input name=\"sprp2\" type=\"text\" value=\"5\" class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' maxlength='2'>

<td colspan=2><font size=1>
<center>$lang_PLUGBOARD<br>
<textarea name=\"steckbr\" cols=\"10\" class=\"ctoformcss-txtinput-style\">".$_POST['steckbr']."</textarea>
<br>$lang_PLUGBOARDTEXT";


$inhalt.= "</table><table border=\"0\"><tr><td colspan=\"".count($stator)."\"><center><font size=1>$lang_CHARACTERSET <tr><td>";

for($i=0;$i<count($stator);$i++)
{
  $inhalt.= "<td width=12><font size=1><center>".$i;
}
$inhalt.= "<tr><td>";
for($i=0;$i<count($stator);$i++)
{
  $inhalt.= "<td><center><font size=1>".$stator[$i];
}
$inhalt.= "<tr><td colspan=\"".count($stator)."\"><font size=1><center>$lang_ROTORCONFIGURATION<tr>";
for($j=1;$j!=($walzenanzahl+1);$j++)
{
  $schleife="walze".$j;
  $inhalt.= "<td><nobr><font size=1>";
  if($j==$_POST['wp1'] or $j==$_POST['wp2'] or $j==$_POST['wp3'] ){$inhalt.= "<b><font size=2 color=red>";}
  $inhalt.= "$lang_ROTOR ".$j." :";
  for($i=0;$i<count(${$schleife});$i++)
  {

    $inhalt.= "<td><font size=1><center>";
    if($j==$_POST['wp1'])
    {
      if($_POST['sprp1']==$i){$inhalt.= "<b><font size=2 color=red>";}
    }
    if($j==$_POST['wp2'])
    {
      if($_POST['sprp2']==$i){$inhalt.= "<b><font size=2 color=red>";}
    }
    $inhalt.= ${$schleife}[$i];
    if($i==(count(${$schleife})-1))
    {
    if($j==$_POST['wp1'])
    {
      $inhalt.= "<td><nobr></nobr><font size=1> $lang_ATPOSITION 1";
    }
    if($j==$_POST['wp2'])
    {
      $inhalt.= "<td><nobr><font size=1> $lang_ATPOSITION 2";
    }
    if($j==$_POST['wp3'])
    {
      $inhalt.= "<td><nobr><font size=1> $lang_ATPOSITION 3";
    }
    }
  }$inhalt.= "<tr>";
}
$inhalt.= "</table></form><script>form.oben.select();form.oben.focus();</script>";
//------------------------------------------------- Layout -------------------------------------------------

//$content->resetText();
//$content->setTitel('Enigma M3');
echo $inhalt;
?>