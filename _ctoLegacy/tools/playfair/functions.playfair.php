<?

########################################################
## Playfair-Chiffre v1.0
########################################################
$cipherVersion[]=array('Playfair-Chiffre','1.0','20060213','Marcel Brätz');
function preKodPlayfair($orgtxt)
{
    $orgtxt2='';
    $codtxt='';
    for ($t=0;$t<strlen($orgtxt);$t++)
    {
        $str1=substr($orgtxt,$t,1);
        $str2=substr($orgtxt,$t+1,1);
        $fill='';
        if ($str1==$str2)
        {
            $fill='X';
        }
        $orgtxt2.=$str1.$fill;
    }
    if (strlen($orgtxt2)%2!=0) {$orgtxt2.='A';}
    return $orgtxt2;
}
function postDekPlayfair($orgtxt2)
{
    for ($t=0;$t<strlen($orgtxt2);$t++)
    {
        $str1=substr($orgtxt2,$t,1);
        $str2=substr($orgtxt2,$t+1,1);
        $str3=substr($orgtxt2,$t+2,1);
        if ($str1==$str3 && $str2=='X') {$t++;}
        $orgtxt.=$str1;
    }
    if(strlen($orgtxt2)%2==0 && substr($orgtxt2,strlen($orgtxt2)-1,1)=='A')
    {
        $orgtxt=substr($orgtxt,0,strlen($orgtxt)-1);
    }
    return $orgtxt;
}
function kodPlayfair($orgtxt2,$polyquad)
{
    for ($t=0;$t<strlen($orgtxt2);$t+=2)
    {
        $str1=substr($orgtxt2,$t,1);
        $str2=substr($orgtxt2,$t+1,1);
        $key1=array_search($str1,$polyquad);
        $key2=array_search($str2,$polyquad);
        $z1=substr($key1,0,1);
        $s1=substr($key1,1,1);
        $z2=substr($key2,0,1);
        $s2=substr($key2,1,1);
        if($z1<>$z2 && $s1<>$s2)
        {
            $codtxt.=$polyquad[$z1.$s2].$polyquad[$z2.$s1];
        }
        if ($z1==$z2)
        {
            if($s1<5){$S1=$s1+1;}else{$S1=1;}
            if($s2<5){$S2=$s2+1;}else{$S2=1;}
            $codtxt.=$polyquad[$z1.$S1].$polyquad[$z2.$S2];
        }
        if ($s1==$s2)
        {
            if($z1<5){$Z1=$z1+1;}else{$Z1=1;}
            if($z2<5){$Z2=$z2+1;}else{$Z2=1;}
            $codtxt.=$polyquad[$Z1.$s1].$polyquad[$Z2.$s2];
        }
    }
    return $codtxt;
}
function dekPlayfair($codtxt,$polyquad)
{
    for ($t=0;$t<strlen($codtxt);$t+=2)
    {
        $str1=substr($codtxt,$t,1);
        $str2=substr($codtxt,$t+1,1);
        $key1=array_search($str1,$polyquad);
        $key2=array_search($str2,$polyquad);
        $z1=substr($key1,0,1);
        $s1=substr($key1,1,1);
        $z2=substr($key2,0,1);
        $s2=substr($key2,1,1);
        if($z1<>$z2 && $s1<>$s2)
        {
            $orgtxt2.=$polyquad[$z1.$s2].$polyquad[$z2.$s1];
        }
        if ($z1==$z2)
        {
            if($s1>1){$S1=$s1-1;}else{$S1=5;}
            if($s2>1){$S2=$s2-1;}else{$S2=5;}
            $orgtxt2.=$polyquad[$z1.$S1].$polyquad[$z2.$S2];
        }
        if ($s1==$s2)
        {
            if($z1>1){$Z1=$z1-1;}else{$Z1=5;}
            if($z2>1){$Z2=$z2-1;}else{$Z2=5;}
            $orgtxt2.=$polyquad[$Z1.$s1].$polyquad[$Z2.$s2];
        }
    }
    return $orgtxt2;
}
########################################################
## Polybios
########################################################

$cipherVersion[]=array('Polybios','1.0','20060209','Marcel Brätz');

function decodePolybios($codtxt,$polyquad)
{
    for ($t=0;$t<strlen($codtxt);$t+=2)
    {
        $orgtxt.=$polyquad[substr($codtxt,$t,2)];
    }
    return $orgtxt;
}
function encodePolybios($orgtxt,$polyquad)
{
    for ($t=0;$t<strlen($orgtxt);$t++)
    {
        $codtxt.=array_search(substr($orgtxt,$t,1),$polyquad);
    }
    return $codtxt;
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
?>