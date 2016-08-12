<?
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;
unset($alfahier);
unset($p);
unset($r);
$ksbVersion[]=array("fkt_alfabet.php","1.0","20030530","Marcel Brätz");

function alfabetAnalyse($codtxt,$alfa)
{
	$pfad = JURI::base(true) . "components/com_cto/tools/autokorrelation";
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
       $ba1.="<img src=$pfad/image/letter".$t.".gif border=0><img src=$pfad/image/bar0.jpg width=3 border=0>";
       $ba2.="<img src=$pfad/image/letter".(($t+$rotv)%sizeof($alfa)).".gif border=0><img src=$pfad/image/bar0.jpg width=3 border=0>";
    }

    $out.='<table border=0><tr><td>
            <b>Normales Alfabet</b><br>Statistische Daten:<br>'
            .'<br>Varianz: '.round($VX,5)
            .'<br>StdAbw:  '.round($SX,5)
            .'</td><td valign=middle>'
            .showakt($AP[de],50,1,5,3,0)
            .'<center><div class=text7 >'.$ba1.'</div></center>'
            .'</td></tr>'
            .'<tr><td>'
            .'<br><b>vorliegendes Alfabet</b><br>Statistische Daten:<br>'
            .'<br>Varianz:    '.round($VY,5)
            .'<br>StdAbw:     '.round($SY,5)
            .'<br>'
            .'</td><td valign=middle><br>'
            .showakt($alfahier,50,1,5,3,0)
            .'<center><div class=text7 >'.$ba2.'</div></center>'
            .'</td></tr><tr><td>'

            .'<br>Zeichen:    '.strlen($codtxt)
            .'<br>Entropie:   '.round(entropie($codtxt),5)
            .'<br>KI-Index:   '.round(koinzidenzIndex($codtxt),5)
            .'</td><td>'

            .'<br>GV-Maß1:    '.round(gvmass($codtxt, $alfahier),5)
            .'<br>GV-Maß2:    '.round(gvmass2($codtxt, $alfahier),5)
            .'</td></tr></table><div class=text10><br>Kovarianz:  '.round($cov,5)
            .'<br>KorrKoeff:  '.round($r,5)
            .'</div>';
    return $out;
}