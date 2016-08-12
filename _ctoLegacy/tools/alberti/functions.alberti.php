<?
defined('_JEXEC') or die('Restricted access');
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
function str_splitt($text)
{   # einen String zeichenweise in ein Array aufsplitten, war nötig bei PHP4
    # entspricht der PHP5-Funktion str_split

    for($t=0;$t<strlen($text);$t++)
    {
        $arr[$t]=substr($text, $t, 1);
    }
    return $arr;
}

function array_flipp($arr)
{   # Array rückwärts ausgeben
    $i=sizeof($arr);
    for($t=0;$t<$i;$t++)
    {
        $arr2[]=$arr[$i-$t-1];
    }
    return $arr2;
}
function substituiere($text, $alfa1, $alfa2)
{
    // Algorithmus zur Umsetzung eines Textes aus einem Alfabet in ein anderes
    // dies ist eine Ersetzung des Zeichen aus alfa1 durch das Zeichen an der selben Stelle in alfa2
    $laengetxt=strlen($text);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $buchstabe = buchstabeVonIndex($alfa2, indexVonBuchstabe($alfa1,substr($text,$t,1)));
        $codtext   = $codtext.$buchstabe;
    }
    return $codtext;
}

?>