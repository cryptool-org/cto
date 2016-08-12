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



$orgtxt=$_POST[orgtxt];
$codtxt=$_POST[codtxt];
$key=$_POST[key];
$suche=$_POST[suche];
$suchen=$_POST[suchen];
$merken=$_POST[merken];


$firsttime=FALSE;

if ($orgtxt=="" && !isset($_POST['decode']))
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$key="CODE";
	$firsttime=TRUE;
}

if (!function_exists("normalisiere"))
{
     require "alfa_dat.php";
     require "fkt_coder.php";
     require "fkt_decipher.php";
}

$a_t=getmstime();
if(!$spacing) $spacing=5;
$orgtxt=strtoupper(normalisiere($orgtxt,$alfa));
$codtxt=strtoupper(normalisiere($codtxt,$alfa));
$key=strtoupper(normalisiere($key,$alfa));


if (isset($_POST['decode']))
{
	           $sel1="SELECTED"; 
             $orgtxt=enporta($codtxt,$key, $alfa); 
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
                       $sel2="SELECTED"; 
                       $codtxt=enporta($orgtxt,$key, $alfa);
}

if (strlen($key)>2) $spacing=strlen($key);
if($sel1){$sObj0.= "=>";}else{$sObj0.= "&nbsp;&nbsp;";}
if($sel2){$sObj1.= "=>";}else{$sObj1.= "&nbsp;&nbsp;";}
if($sel0){$sObj2.= "=>";}else{$sObj2.= "&nbsp;&nbsp;";}

$inhalt.='
<form name=form method=post>
<table border=0>
<tr>
  <td>{-orgtext-}:<br><textarea name=orgtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size" onKeyUp="this.value=this.value.toUpperCase()">'.spacing(strtoupper($orgtxt),$spacing).'</textarea></td>
  <td valign=middle></td>
</tr>

<tr>
  <td colspan=2>&nbsp;</td>
</tr>

<tr>
  <td>{-codtext-}:<br><textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size">'.spacing(strtoupper($codtxt),$spacing).'</textarea></td>
  <td valign=middle></td>
</tr>

<tr>
  <td colspan=2>&nbsp;</td>
</tr>

<tr>
  <td colspan=2>
  <table width="100%">
  <tr>
  <td width="70">{-keyword-}:</td>
  <td><input type=text name=key value="'.$key.'" size=20 class="ctoformcss-txtinput-style ctoformcss-porta-keylengt"></td>
  </tr>
  </table>
  </td>
</tr>

<tr>
  <td colspan=2>&nbsp;</td>
</tr>

<tr>
  <td colspan=2><input type=submit name=encode value="{-encrypt-}" class="ctoformcss-default-button-m">&nbsp;&nbsp;&nbsp;&nbsp;<input type=submit name=decode value="{-decrypt-}" class="ctoformcss-default-button-m">
  </td>
</tr>

<tr>
  <td colspan=2>&nbsp;</td>
</tr>
</table>
</form>
';


$inhalt = str_replace('{-orgtext-}', $lang_plaintext, $inhalt);
$inhalt = str_replace('{-codtext-}', $lang_ciphertext, $inhalt);
$inhalt = str_replace('{-encrypt-}', $lang_encode, $inhalt);
$inhalt = str_replace('{-decrypt-}', $lang_decode, $inhalt);
$inhalt = str_replace('{-keyword-}', $lang_key, $inhalt);


echo $inhalt;
