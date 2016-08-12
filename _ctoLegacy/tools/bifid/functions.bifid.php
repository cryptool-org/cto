<?
defined('_JEXEC') or die('Restricted access');
########################################################
## Bifid
########################################################

$cipherVersion[]=array('Bifid','1.0','03062008','Ron Moritz, Francesco Goertz, Marcel Brätz');

function decodePolybios($codtxt,$polyquad)
{
    for ($t=0;$t<strlen($codtxt);$t+=2)
    {
        $orgtxt.=$polyquad[substr($codtxt,$t,2)];
    }
    return $orgtxt;
}

function decodeNumbers($codnumbers)
{
	$half=strlen($codnumbers)/2;
	$temp1=substr($codnumbers,0,$half);
	$temp2=substr($codnumbers,$half,$half);
	for ($t=0;$t<$half;$t++)
         {
                 $orgnumbers.=substr($temp1,$t,1).substr($temp2,$t,1);
         }
return $orgnumbers;
}

function encodeNumbers($orgnumbers)
{
	for ($t=0;$t<strlen($orgnumbers);$t+=2)
         {
          	$temp1.=substr($orgnumbers,$t,1);
                 $temp2.=substr($orgnumbers,$t+1,1);
         }
$codnumbers=$temp1.$temp2;
return $codnumbers;
}

function encodePolybios($orgtxt,$polyquad)
{
    for ($t=0;$t<strlen($orgtxt);$t++)
    {
        $codtxt.=array_search(substr($orgtxt,$t,1),$polyquad);
    }
    return $codtxt;
}

function spaceIn($txt)
{
$ausgabetxt=chunk_split ($txt, 6,' ');
return $ausgabetxt;
}

function createPolybiosSquare($kkey,$alfa25,$mode)
{
    if (strlen(trim($kkey))>0)
    {
        $alfa2=array_merge(array_unique(str_split($kkey)),array_diff($alfa25[$mode],str_split($kkey)));
    }
    else
    {
        $alfa2=$alfa25[$mode];
    }
    $polyquad=array_combine($alfa25[index],$alfa2);
    return $polyquad;
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

?>