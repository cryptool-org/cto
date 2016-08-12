<?

defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;


$lang_encode=JTEXT::_('ENCRYPT');
$lang_decode=JTEXT::_('DECRYPT');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_key=JTEXT::_('KEY');
$lang_step=JTEXT::_('STEP');


global $ks_hilf, $alfa;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=dirname(__FILE__);

$orgtxt=$_POST[orgtxt];
$codtxt=$_POST[codtxt];
$key=$_POST[key];
$suche=$_POST[suche];
$merken=$_POST[merken];
    
require('fkt_coder.php');
require('fkt_decipher.php');
require('alfa_dat.php');


$firsttime=FALSE;

if ($orgtxt=="" && !isset($_POST['decode']))
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$key="CODE";
	$firsttime=TRUE;
}


$orgtxt=strtoupper(normalisiere($orgtxt,$alfa36));
$codtxt=strtoupper(normalisiere($codtxt,$alfa));
$key=strtoupper(normalisiere($key,$alfa));

if ($key=="") $key="CODE";




if (isset($_POST['decode']))
{
	           $sel1="SELECTED";
             $orgtxt2=dekodieren($codtxt,$key,$alfa);
             $orgtxt=delarrabee($orgtxt2,$alfa,$alfanum[1]);
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
                       $sel2="SELECTED";
                       $orgtxt2=enlarrabee($orgtxt,$alfa,$alfanum[1]);
                       $orgtxt2=strtoupper(normalisiere($orgtxt2,$alfa));
                       $codtxt=kodieren($orgtxt2,$key,$alfa);
}


if (strlen($key)>2) $spacing=strlen($key);
if($merken){$sObj3 = "checked";}else{$sObj3 = "";}

$inhalt.='
<form name=formular method=post>
<input type=hidden name=action value=yes>
<input type=hidden name=topic value='.$topic.'>
<table border=0>
<tr><td>{-orgtext-}:<br><textarea name=orgtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size" onKeyUp="this.value=this.value.toUpperCase()">'.spacing(strtoupper($orgtxt),$spacing).'</textarea></td><td valign=middle>
</td></tr>
<tr><td>{-step-}:<br><textarea name=orgtxt2 readonly="true" class="ctoformcss-txtoutput-style ctoformcss-default-input-size">'.spacing(strtoupper($orgtxt2),$spacing).'</textarea></td><td valign=middle>
</td></tr>
<tr><td>{-codtext-}:<br><textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size">'.spacing(strtoupper($codtxt),$spacing).'</textarea></td><td valign=middle>
</td></tr>
<tr><td colspan=2>{-keyword-}:<br><input name=key value="'.strtoupper($key).'" class="ctoformcss-txtinput-style ctoformcss-larrabee-keylengt">
</td></tr>
<tr><td colspan=2>&nbsp;</td></tr>
<tr><td colspan=2>&nbsp;</td></tr>
<tr><td colspan=2><input type="submit" name="encode" value="{-encrypt-}" class="ctoformcss-default-button-m"> &nbsp;&nbsp;
<input type="submit" name="decode" value="{-decrypt-}" class="ctoformcss-default-button-m"> </td></tr>


</table>
</form>';


$inhalt = str_replace('{-orgtext-}', $lang_plaintext, $inhalt);
$inhalt = str_replace('{-codtext-}', $lang_ciphertext, $inhalt);
$inhalt = str_replace('{-encrypt-}', $lang_encode, $inhalt);
$inhalt = str_replace('{-decrypt-}', $lang_decode, $inhalt);
$inhalt = str_replace('{-keyword-}', $lang_key, $inhalt);
$inhalt = str_replace('{-step-}', $lang_step, $inhalt);

echo $inhalt."<br><p>";
