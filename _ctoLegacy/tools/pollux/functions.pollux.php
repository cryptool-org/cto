<?php
defined('_JEXEC') or die('Restricted access');
########################################################
## Pollux-Chiffre
########################################################
$cipherVersion[]=array('Pollux-Chiffre','2.0','20060609','Florian Haker, Sven Radelof');
function encPollux($morse,$eingabe)
{
    $alles=str_split($morse);
    foreach($alles as $zeichen)
    {
        switch($zeichen)
        {
            case ' ':
                        $out.=$eingabe[0][rand(0,count($eingabe[0])-1)];
                        break;
            case '-':
                        $out.=$eingabe[1][rand(0,count($eingabe[1])-1)];
                        break;
            case '.':
                        $out.=$eingabe[2][rand(0,count($eingabe[2])-1)];
                        break;
        }
    }
    return $out;
}

function decPollux($code,$eingabe)
{
    $alles=str_split($code);
    foreach($alles as $zeichen)
    {
        $a1=array_search($zeichen,$eingabe[0]);
        $a2=array_search($zeichen,$eingabe[1]);
        $a3=array_search($zeichen,$eingabe[2]);
        if(is_int($a1)) $out.=' ';
        if(is_int($a2)) $out.='-';
        if(is_int($a3)) $out.='.';
    }
    return $out;
}
########################################################
## Funktionen zur Erzeugung neuer Alfabete
########################################################
function makehomoalfa($subst,$cod)
{
        global $homo;
        global $alfa;
        $r=0;
        for ($t=0;$t<count($homo[$cod]);$t++)
        {
            for($s=0;$s<$homo[$cod][$t];$s++)
            {
                $alfah[$t][]=$subst[$r];
                $r++;
            }
        }
        return $alfah;
}
function createMulAlfa($alfa, $key)
{
    // erzeugt ein Alfabet auf für eine Multiplikative Chiffre
    for($t=0;$t<sizeof($alfa);$t++)
    {
        $alfa2[$t]=buchstabeVonIndex($alfa,(indexVonBuchstabe($alfa,$alfa[$t])*$key)%sizeof($alfa));
    }
    return $alfa2;
}
function rotieren($alfa, $key)
{
    // Rotiert ein Alfabet
    for($t=0;$t<sizeof($alfa);$t++)
    {
        $alfa2[$t]=buchstabeVonIndex($alfa,(indexVonBuchstabe($alfa,$alfa[$t])+$key)%sizeof($alfa));
    }
    return $alfa2;
}

########################################################
## Hilfsfunktionen
########################################################
function indexVonBuchstabe($alfa,$letter)
{
    // liefert den Index des Buchstaben aus dem verwendeten Alphabet
    // A..Z --> 0..25
    for ($t=0;$t<sizeof($alfa);$t=$t+1)
    {
        if($letter==$alfa[$t])
        {
            return $t;
            break;
        }
    }
}
function buchstabeVonIndex($alfa,$index)
{
    // liefert den Buchstaben aus dem verwendeten Alphabet
    // 0..25 --> A..Z
    return $alfa[$index];
}
function spacing($text, $zeichen)
{
    if($zeichen<=1)
    {
        $zeichen=1;
    }
    for ($t=0;$t<strlen($text);$t++)
    {
        $text2.=substr($text,$t,1);
        if(($t+1)%$zeichen==0 && $t>0)
        {
            $text2.=" ";
        }
    }
    return $text2;
}
########################################################
## Morsen v1.1
########################################################
$cipherVersion[]=array('Morse-Code','1.1','20040602','Marcel Brätz');
function toMorse($orgtxt)
{
    $orgtxt=trim($orgtxt);
    global $morse;
    for($t=0;$t<sizeof($morse[0]);$t=$t+1)
    {
        $malfa[] = ord($morse[0][$t]);
    }
    $laengetxt=strlen($orgtxt);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $test     =  array_search(ord(strtoupper(substr($orgtxt,$t,1))),$malfa);
        $codtxt   = $codtxt.$morse[1][ $test ].' ';
    }
    return $codtxt;
}
function fromMorse($codtxt)
{
    $codtxt=explode(' ',trim($codtxt));
    global $morse;
    $laengetxt=sizeof($codtxt);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $test     =  array_search($codtxt[$t],$morse[1]);
        $orgtxt   =  $orgtxt.$morse[0][ $test ];
    }
    return $orgtxt;
}

function strfix($text)
{   # ersetzt Umlaute durch die entsprechenden Bigramme

    $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/"); # suchen nach ...
    $replace = array ("AE","AE","OE","OE","UE","UE","SS");        # ersetzen durch ...
    $text = preg_replace($search, $replace, $text);
    return $text;

}

function normalisiere($text,$alfa)
{   # prüft, ob die Zeichen des Textes im Zeichensatz enthalten sind.

    $text=strfix($text); # Ersetzen der Umlaute
    $size=strlen($text);
    $newtext="";
    for ($t=0;$t<$size;$t++)
    {
        $token=substr($text,$t,1);
        $a=in_array(strtolower($token),$alfa); # prüft Zeichen als Kleinbuchstaben
        $b=in_array(strtoupper($token),$alfa); # prüft Zeichen als Großbuchstaben
        if (!$a && !$b)
        {
            $token=''; # sind sie nicht erhalten, werden sie entfernt.
        }
        $newtext.=$token;
    }
    return $newtext;
}

function teilerfremde($zahl)
{
    $teiler=gzt($zahl);
    for ($t=1;$t<sizeof($teiler);$t++)
    {
        for($s=1;$s<=ceil($zahl/$teiler[$t]);$s++)
        {
            $teiler2[]=$s*$teiler[$t];
        }
    }
    $teiler=array_unique($teiler2);
    for($s=1;$s<=$zahl;$s++)
    {
        if (!in_array($s,$teiler))
        {
            $mulzahl[]=$s;
        }
    }
    return $mulzahl;
}

function gzt($n)
{   # Alle ganzzahligen Teiler von $n

    $t=1;
    $i=0;
    while($t<=$n)
    {
        if(($n%$t)==0)
        {
            $liste[] = $t;
            $i++;
        }
        $t++;
    }
    return $liste;
}
?>
