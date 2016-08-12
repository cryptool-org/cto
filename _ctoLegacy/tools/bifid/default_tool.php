<?
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;


$lang_encode=JTEXT::_('ENCRYPT');
$lang_decode=JTEXT::_('DECRYPT');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_key=JTEXT::_('KEY');


global $ks_hilf, $alfa;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=dirname(__FILE__);


include ('functions.bifid.php');
include ('alfa_dat.php');

$orgtxt = $_POST[orgtxt];
$codtxt = $_POST[codtxt];
$kkey = $_POST[kkey];
$alf = $_POST[alf];
$suche = $_POST[suche];

$firsttime=FALSE;

if ($orgtxt=="")
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$firsttime=TRUE;
}


$orgtxt=strtoupper(normalisiere($orgtxt,$alfa));
$codtxt=str_replace(" ","",$codtxt);
$kkey=strtoupper(normalisiere($kkey,$alfa));




switch ($alf)
{
    default:
    case "IJ":
                        $orgtxt=eregi_replace("J","I",$orgtxt);
                        $kkey=eregi_replace("J","I",$kkey);
                        $mode="ij";
                        $alf2=" SELECTED";
                        break;
    case "VW":
                        $orgtxt=eregi_replace("W","VV",$orgtxt);
                        $kkey=eregi_replace("W","VV",$kkey);
                        $mode="vw";
                        $alf1=" SELECTED";
                        break;
}

$polyquad=createPolybiosSquare($kkey,$alfa25,$mode);


if (isset($_POST['decode']))
{
	           $sel1="SELECTED";
             unset($orgtxt);
             $codnumbers=encodePolybios($codtxt,$polyquad);
             $orgnumbers=decodeNumbers($codnumbers);
             $orgtxt=decodePolybios($orgnumbers,$polyquad);
					   $codtxt=spaceIn($codtxt);
					   $orgtxt=spaceIn($orgtxt);
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
                       $sel2="SELECTED";
                       unset($codtxt);
                       $orgnumbers=encodePolybios($orgtxt,$polyquad);
                       $codnumbers=encodeNumbers($orgnumbers);
                       $codtxt=decodePolybios($codnumbers,$polyquad);
					             $codtxt=spaceIn($codtxt);
					             $orgtxt=spaceIn($orgtxt);
}


$t=0;
foreach($polyquad as $val){
     $polybiosmatrix .= $val." ";
     if ($t%5==4) $polybiosmatrix.= "<br>";
     $t++;
}
#Formularladen
$form = file_get_contents($ks_hilf[pfad].'/form.template');
$form2 = file_get_contents($ks_hilf[pfad].'/infobox.template');
# Formularstücke ersetzen
$form = str_replace('{-clean-}', $clean, $form);
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-codtxt-}', $codtxt, $form);
$form = str_replace('<input type="text" name="key" value="0" size="3" width="3">'
                  , '<input type="text" name="key" value="'.$key.'" size="3" width="3">'
                  , $form);
$form = str_replace('{-action-}', '', $form);
$form = str_replace('{-kkey-}', $kkey, $form);
$form = str_replace('{-alf1-}', $alf1, $form);
$form = str_replace('{-alf2-}', $alf2, $form);

$form = str_replace('{-orgtext-}', $lang_plaintext, $form);
$form = str_replace('{-codtext-}', $lang_ciphertext, $form);
$form = str_replace('{-encrypt-}', $lang_encode, $form);
$form = str_replace('{-decrypt-}', $lang_decode, $form);
$form = str_replace('{-keyword-}', $lang_key, $form);

$form2 = str_replace('{-polybiosmatrix-}', $polybiosmatrix, $form2);

echo $form;
echo $form2;

?>