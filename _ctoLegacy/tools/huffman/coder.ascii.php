<?

########################################################
## Binärkodierung v1.0
########################################################
$cipherVersion[]=array('ISO 8859-1 ASCII','1.0','20030210','Marcel Brätz');
function tobin($orgtxt)
{
    $laengetxt=strlen($orgtxt);
    for($t=0;$t<$laengetxt;$t=$t+1){
        $codtxt   = $codtxt.bincod(ord(substr($orgtxt,$t,1))).' ';
    }
    return $codtxt;
}

function bincod($zahl)
{
    $cod=decbin($zahl);
    $l=strlen($cod);
    if ($l<8)
    {
        $cod = str_repeat('0',(8-$l)).$cod;
    }
    return $cod;
}
function frobin($codtxt)
{
    $codtxt=str_replace(' ','',$codtxt);
    $laengetxt=strlen($codtxt);
    for($t=0;$t<$laengetxt;$t=$t+8)
    {
        $orgtxt = $orgtxt.chr(bindec(substr($codtxt,$t,8)));
    }
    return $orgtxt;
}

?>