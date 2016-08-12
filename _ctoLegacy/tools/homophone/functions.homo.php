<?php
defined('_JEXEC') or die('Restricted access');
########################################################
## Homophone Chiffre v1.0
########################################################
$cipherVersion[]=array('Homophone Chiffre','1.0','20041017','Marcel Brätz');
function kodhomo($orgtxt, $alfah, $alfa)
{
    $codtxt="";
    for ($t=0;$t<strlen($orgtxt);$t++)
    {
            $buch=$alfah[indexVonBuchstabe($alfa,substr($orgtxt,$t,1))];
            mt_srand();
            $codtxt.=$buch[round(mt_rand(0,count($buch)-1),0)];
    }
    return $codtxt;
}
function dekhomo($codtxt, $alfah, $alfa)
{
    $orgtxt="";
    for ($t=0;$t<strlen($codtxt);$t=$t+2)
    {
        for ($s=0;$s<sizeof($alfa);$s++)
        {
            $buch=$s;
            if (in_array(substr($codtxt,$t,2),$alfah[$s]))
            {
                break;
            }
        }
        $orgtxt.=buchstabeVonIndex($alfa,$buch);
    }
    return $orgtxt;
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

function displayhomo($subst)
{
    global $homo;
    global $alfa;
    $r=0;
    $text='<table><tr>';
    for ($t=0;$t<count($alfa);$t++)
    {
        $text.='<td align=center><b>'.$alfa[$t].'</b></td>';
    }
    $text.='</tr>';
    $text.='<tr>';
    for ($t=0;$t<count($homo[de]);$t++)
    {
        $text.='<td valign=top class=text9>';
        for($s=0;$s<$homo[de][$t];$s++)
        {
            $text.=$subst[$r].'<br>';
            $r++;
        }
        $text.='</td>';
    }
    $text.='</tr>';
    $text.='</table>';
    return $text;
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