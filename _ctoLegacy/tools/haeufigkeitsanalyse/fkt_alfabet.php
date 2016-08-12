<?
defined('_JEXEC') or die('Restricted access');
unset($alfahier);
unset($p);
unset($r);
$ksbVersion[]=array("fkt_alfabet.php","1.0","20030530","Marcel Brätz");

function alfabetAnalyse($codtxt,$alfa)
{
    global $AP, $ks_hilf;
    $alfahier=@hauf($codtxt);
    for ($t=0;$t<sizeof($alfahier);$t++)
    {
        $p[]=100*prob($alfahier[$t],strlen($codtxt));
    }
    $alfahier=$p;
    $VX=varianz($AP[de]);
    $SX=sqrt(varianz($AP[de]));
    $VY=varianz($alfahier);;
    $SY=sqrt(varianz($alfahier));
    $cov=covarianz($AP[de], $alfahier);
    $r=@abs($cov/sqrt($VX*$VY));

    for($t=0;$t<sizeof($alfa);$t++)
    {
       $ba1.="<img src=$ks_hilf[pfad]/image/letter".$t.".gif border=0><img src=$ks_hilf[pfad]/image/bar0.jpg width=3 border=0>";
       $ba2.="<img src=$ks_hilf[pfad]/image/letter".(($t+$rotv)%sizeof($alfa)).".gif border=0><img src=$ks_hilf[pfad]/image/bar0.jpg width=3 border=0>";
    }

$lang_normalalphabet=JTEXT::_('NORMALALPHABET');
$lang_STATISTICALDATA=JTEXT::_('STATISTICALDATA');
$lang_VARIANCE=JTEXT::_('VARIANCE');
$lang_DEFAULTABWEICHUNG=JTEXT::_('DEFAULTABWEICHUNG');
$lang_CURRENTALPHABET=JTEXT::_('CURRENTALPHABET');
$lang_SIGNS=JTEXT::_('SIGNS');
$lang_ENTROPY=JTEXT::_('ENTROPY');

    $out.='<table border=0><tr><td>
            <b>'.$lang_normalalphabet.'</b><br>'.$lang_STATISTICALDATA.':<br>'
            .'<br>'.$lang_VARIANCE.': '.round($VX,5)
            .'<br>'.$lang_DEFAULTABWEICHUNG.':  '.round($SX,5)
            .'</td><td valign=middle>'
            .showakt($AP[de],50,1,5,3,0)
            .'<center><div class=text7 >'.$ba1.'</div></center>'
            .'</td></tr>'
            .'<tr><td>'
            .'<br><b>'.$lang_CURRENTALPHABET.'</b><br>'.$lang_STATISTICALDATA.':<br>'
            .'<br>'.$lang_VARIANCE.':    '.round($VY,5)
            .'<br>'.$lang_DEFAULTABWEICHUNG.':     '.round($SY,5)
            .'<br>'
            .'</td><td valign=middle><br>'
            .showakt($alfahier,50,1,5,3,0)
            .'<center><div class=text7 >'.$ba2.'</div></center>'
            .'</td></tr><tr><td>'

            .'<br>'.$lang_SIGNS.':    '.strlen($codtxt)
            .'<br>'.$lang_ENTROPY.':   '.round(entropie($codtxt),5)
            .'</td></tr></table>';
    return $out;
}