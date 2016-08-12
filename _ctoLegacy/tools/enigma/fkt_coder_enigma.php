<?php
defined('_JEXEC') or die('Restricted access');
function enigma($links,$mitte,$rechts,$stator,$str,$s1,$s2,$ring1,$ring2,$ring3,$steckbr,$pukw)
{

  $spw1=$stator[$s1];
  $spw2=$stator[$s2];
  $stator_links=$stator;
  $stator_mitte=$stator;
  $stator_rechts=$stator;
  $schalter_1=$spw1;
  $schalter_2=$spw2;
  $stator_neu___=steckbrett($steckbr);
//-------------------------- Positionen der einzelnen Walzen ------------------------
  for ($i=1;$i<=$ring1;$i++)// Bei 0 auf A bei 25 auf Z  usw.
  {
    $rechts=rot($rechts);
    $stator_rechts=rot($stator_rechts);
  }
  for ($i=1;$i<=$ring2;$i++)
  {
    $mitte=rot($mitte);
    $stator_mitte=rot($stator_mitte);
  }
  for ($i=1;$i<=$ring3;$i++)
  {
    $links=rot($links);
    $stator_links=rot($stator_links);
  }
//-------------------------- Positionen der einzelnen Walzen ------------------------

  for ($i=0;$i<strlen($str);$i++)//Ermittlerung der Stringlänge um die nötigen Durchläufe zu machen
  {
    $zeichen=$str[$i];// holt sich einen Buchstaben aus dem String, den er Verschlüsseln wird
    $stator_rechts=rot($stator_rechts);// Rotation der rechten Walze, beginnt vor der Verschlüsselung (hier der Stator)
    $rechts=rot($rechts);//Rotation der rechten Walze, beginnt vor der Verschlüsselung (hier die Walze)
    $x=get_pos($stator_neu___,$zeichen);// holt sich die Position des eingegebenen Buchstaben auf den Stator
    $zeichen=get_zeichen($rechts,$x);// holt sich das Zeichen auf der Position die vorher ermittelt wurde("dort wo der Strom reingeht")
    $x=get_pos($stator_rechts,$zeichen);//holt sich die Position des zeichens auf dem Walzenstator um die Position zu erfahren wo er in die nächste Walze(mitte) rein muss
    if($schalter_2==$stator_mitte[1])// diese if-Anweisung bewirkt, das die 3te Walze rotiert, wenn Walze 2 die "Turnover position" erreicht
    {
      $stator_mitte=rot($stator_mitte);
      $mitte=rot($mitte);
      $stator_links=rot($stator_links);
      $links=rot($links);
    }
    if($schalter_1==$stator_rechts[0])//diese if-Anweisung bewirk, das die 2te Walze rotiert, wenn Walze 1 die "Turnover position" erreicht
    {
      $stator_mitte=rot($stator_mitte);
      $mitte=rot($mitte);
    }

    $zeichen=get_zeichen($mitte,$x);// holt sich das Zeichen auf der Walze mitte
    $x=get_pos($stator_mitte,$zeichen);// holt sich die Position auf dem Stator der Walze mitte

    $zeichen=get_zeichen($links,$x);// holt sich das Zeichen auf der Walze links
    $x=get_pos($stator_links,$zeichen);// holt sich die Position auf dem Stator der Walze links um die Position zu erfahren wo er in die UKW muss
    $zeichen=get_zeichen($stator,$x);//
    if($pukw==0){    $zeichen=ukw1($zeichen);};
    if($pukw==1){    $zeichen=ukw2($zeichen);};
 //------Verlauf nach UKW--------------------

    $x=get_pos($stator,$zeichen);
    $zeichen=get_zeichen($stator_links,$x);
    $x=get_pos($links,$zeichen);
    $zeichen=get_zeichen($stator_mitte,$x);
    $x=get_pos($mitte,$zeichen);
    $zeichen=get_zeichen($stator_rechts,$x);
    $x=get_pos($stator_rechts,$zeichen);
    $zeichen=get_zeichen($stator_rechts,$x);
    $x=get_pos($rechts,$zeichen);
    $zeichen=get_zeichen($stator_neu___,$x);
    $string.=$zeichen;

  }
  return $string;

}//Ende der Funktion enigma()

function get_zeichen($walze,$pos)
{
  return $walze[$pos];
}
function get_pos($walze,$char)
{
  for ($i=0;$i<=25;$i++)
  {
    if($walze[$i]==$char)
    {
      $zeiger=$i;
    }
  }
  return $zeiger;
}
function rot($w)
{
  $wneu[25]=$w[0];
  for ($i=24;$i>=0;$i--)
  {
    $wneu[$i]=$w[$i+1];
  }
  return $wneu;
}//Ende der Funktion rot()

function ausgabe_walze ($walze)
{
  for ($i=0;$i<=25;$i++)
  {
    $out.= $walze[$i];
  }
  return $out;
}

function ukw1($char)
{
  $zeichen='';
  switch ($char)
  {
    case 'A': $zeichen='Y';break;
    case 'B': $zeichen='R';break;
    case 'C': $zeichen='U';break;
    case 'D': $zeichen='H';break;
    case 'E': $zeichen='Q';break;
    case 'F': $zeichen='S';break;
    case 'G': $zeichen='L';break;
    case 'I': $zeichen='P';break;
    case 'J': $zeichen='X';break;
    case 'K': $zeichen='N';break;
    case 'M': $zeichen='O';break;
    case 'T': $zeichen='Z';break;
    case 'V': $zeichen='W';break;
    // ANDERS HERUM
    case 'Y': $zeichen='A';break;
    case 'R': $zeichen='B';break;
    case 'U': $zeichen='C';break;
    case 'H': $zeichen='D';break;
    case 'Q': $zeichen='E';break;
    case 'S': $zeichen='F';break;
    case 'L': $zeichen='G';break;
    case 'P': $zeichen='I';break;
    case 'X': $zeichen='J';break;
    case 'N': $zeichen='K';break;
    case 'O': $zeichen='M';break;
    case 'Z': $zeichen='T';break;
    case 'W': $zeichen='V';break;
  }
  return $zeichen;
}
function ukw2($char)
{
  $zeichen='';
  switch ($char)
  {
    case 'A': $zeichen='F';break;
    case 'B': $zeichen='V';break;
    case 'C': $zeichen='P';break;
    case 'D': $zeichen='J';break;
    case 'E': $zeichen='I';break;
    case 'F': $zeichen='A';break;
    case 'G': $zeichen='O';break;
    case 'H': $zeichen='Y';break;
    case 'I': $zeichen='E';break;
    case 'J': $zeichen='D';break;
    case 'K': $zeichen='R';break;
    case 'L': $zeichen='Z';break;
    case 'M': $zeichen='X';break;
    // ANDERS HERUM
    case 'N': $zeichen='W';break;
    case 'O': $zeichen='G';break;
    case 'P': $zeichen='C';break;
    case 'Q': $zeichen='T';break;
    case 'R': $zeichen='K';break;
    case 'S': $zeichen='U';break;
    case 'T': $zeichen='Q';break;
    case 'U': $zeichen='S';break;
    case 'V': $zeichen='B';break;
    case 'W': $zeichen='N';break;
    case 'X': $zeichen='M';break;
    case 'Y': $zeichen='H';break;
    case 'Z': $zeichen='L';break;
  }
  return $zeichen;
}

function leerraus($eing)#Entfernt alle vorhanden Leerzeichen aus dem String
{
  $ausg="";
  for ($t=0;$t<strlen($eing);$t++)
  {
          if((substr($eing,$t,1))==" "){}
          else{$ausg=$ausg.substr($eing,$t,1);}
  }
 return $ausg;
}
function steckbrett($string)
{
  $temp = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N',
                'O','P','Q','R','S','T','U','V','W','X','Y','Z');

  $string_neu=leerraus($string);
  $laenge=strlen($string_neu);
  $_array=str_split($string_neu);

  for ($i=0;$i<$laenge;$i++)
  {
    $zeichen1=$_array[$i];
    $zeichen2=$_array[$i+1];

    for ($k=0;$k<=25;$k++)
    {
      if($zeichen1==$temp[$k])
        {
          $temp[$k]=$zeichen2;
          $pos=$k;
        }
    }

    for ($k=0;$k<=25;$k++)
    {
      if($pos==$k){}
      else
        {
          if($zeichen2==$temp[$k]){$temp[$k]=$zeichen1;}
        }
    }

    $i++;
  }

return $temp;
}
?>