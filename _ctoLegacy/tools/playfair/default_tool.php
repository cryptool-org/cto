<?
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;
include ($pfad.'/functions.playfair.php');
include ($pfad.'/alfa_dat.php');

$orgtxt = $_POST[orgtxt];
$codtxt = $_POST[codtxt];
$kkey = $_POST[kkey];
$alf = $_POST[alf];
$suche = $_POST[suche];

if ($orgtxt=="") $orgtxt=$default_text=JTEXT::_('DEFAULTTEXT');


$orgtxt=strtoupper(normalisiere($orgtxt,$alfa));
$codtxt=str_replace(" ","",$codtxt);
$kkey=strtoupper(normalisiere($kkey,$alfa));

switch ($alf)
{
    case "VW":
                        $orgtxt=eregi_replace("W","VV",$orgtxt);
                        $kkey=eregi_replace("W","VV",$kkey);
                        $mode="vw";
                        $alf1=" SELECTED";
                        break;
    default:
    case "IJ":
                        $orgtxt=eregi_replace("J","I",$orgtxt);
                        $kkey=eregi_replace("J","I",$kkey);
                        $mode="ij";
                        $alf2=" SELECTED";
                        break;
}

$polyquad=createPolybiosSquare($kkey,$alfa25,$mode);


if (isset($_POST['encrypt'])) $suche="kodieren";
if (isset($_POST['decrypt'])) $suche="dekodieren";

switch($suche)
{
    case "dekodieren":
                       $sel1="SELECTED";
                       unset($orgtxt);
#                       $orgtxt=decodePolybios($codtxt,$polyquad);
                       $orgtxt2=dekPlayfair($codtxt,$polyquad);
                       $orgtxt=postDekPlayfair($orgtxt2);
                       switch($alf)
                       {
                           default:
                           case "VW": $orgtxt=eregi_replace("VV","W",$orgtxt);
                                      $kkey=eregi_replace("VV","W",$kkey);
                                      break;
                           case "IJ": $orgtxt=eregi_replace("I","I",$orgtxt);break;
                       }
                       break;
    case "":
    case "kodieren":
                       $sel2="SELECTED";
                       unset($codtxt);
                       switch($alf)
                       {
                           default:
                           case "VW": $orgtxt2=eregi_replace("W","VV",$orgtxt);break;
                           case "IJ": $orgtxt2=eregi_replace("J","I",$orgtxt);break;
                       }
                       $orgtxt2=preKodPlayfair($orgtxt2);
                       $codtxt=kodPlayfair($orgtxt2,$polyquad);
                       break;
}
#if($sel1){$sObj0 = "=>";}else{$sObj0 = "&nbsp;&nbsp;";}
#if($sel2){$sObj2.= "=>";}else{$sObj2.= "&nbsp;&nbsp;";}

$t=0;
foreach($polyquad as $val)
{
     $polybiosmatrix .= $val." ";
     if ($t%5==4) $polybiosmatrix.= "<br>";
     $t++;
}
$codtxt=spacing(str_replace(' ', '', $codtxt),2);
$orgtxt=spacing(str_replace(' ', '', $orgtxt),2);
$orgtxt2=spacing(str_replace(' ', '', $orgtxt2),2);
#Formularladen
$form = file_get_contents($pfad.'/form.template');
$form2 = file_get_contents($pfad.'/infobox.template');

# Formularstücke ersetzen
$form = str_replace('{-clean-}', $clean, $form);
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-orgtxt2-}', $orgtxt2, $form);
$form = str_replace('{-codtxt-}', $codtxt, $form);
$form = str_replace('<input type="text" name="key" value="0" size="3" width="3">'
                  , '<input type="text" name="key" value="'.$key.'" size="3" width="3">'
                  , $form);
$form = str_replace('{-action-}', '', $form);
$form = str_replace('{-kkey-}', $kkey, $form);
$form = str_replace('{-alf1-}', $alf1, $form);
$form = str_replace('{-alf2-}', $alf2, $form);
$form2 = str_replace('{-polybiosmatrix-}', $polybiosmatrix, $form2);


$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_FORMATTEDPLAINTEXT=JTEXT::_('FORMATTEDPLAINTEXT');
$lang_key=JTEXT::_('KEY');
$lang_encrypt=JTEXT::_('ENCRYPT');
$lang_decrypt=JTEXT::_('DECRYPT');

$form = str_replace('{-plaintext-}', $lang_plaintext, $form);
$form = str_replace('{-ciphertext-}', $lang_ciphertext, $form);
$form = str_replace('{-FORMATTEDPLAINTEXT-}', $lang_FORMATTEDPLAINTEXT, $form);
$form = str_replace('{-keylang-}', $lang_key, $form);
$form = str_replace('{-encrypt-}', $lang_encrypt, $form);
$form = str_replace('{-decrypt-}', $lang_decrypt, $form);



#$content->appendText($inhalt);
echo "$form";
echo "$form2";

?>