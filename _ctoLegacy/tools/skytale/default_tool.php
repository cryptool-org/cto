<?
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;

$lang_encode=JTEXT::_('ENCODE');
$lang_decode=JTEXT::_('DECODE');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');


global $ks_hilf;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=dirname(__FILE__);

require $ks_hilf[pfad].'/fkt_coder.php';
$orgtxt = (string) $_POST[orgtxt];
$codtxt = (string) $_POST[codtxt];
$suche  = (string) $_POST[suche];
$key    = (int)    $_POST[key];
$clean  =          $_POST[clean];

if(!$spacing) $spacing=5;

if(!$key)
{
    $key=1;
}
if($rot=="+")
{
    if ($key<=256) $key++;
}
if($rot=="-")
{
    if ($key>1) $key--;
}


$firsttime=FALSE;

if ($orgtxt=="" && $codtxt=="")
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$firsttime=TRUE;
	$key=5;
}

$orgtxt=strtoupper($orgtxt);
$codtxt=strtoupper($codtxt);
$orgtxt=check($orgtxt);
$codtxt=check($codtxt);


if (isset($_POST['decode']))
{
	$key2=(ceil(strlen($codtxt)/$key));
    $fill=1; # Fehlstellen auffüllen
    $sel1="SELECTED"; $orgtxt=transponiere($codtxt,$key2,$fill);
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE)) 
{
	$fill=0; # Fehlstellen nicht auffüllen
    $sel2="SELECTED"; $codtxt=transponiere($orgtxt,$key,$fill);
}

$orgtxt=spacing($orgtxt,$spacing);
$codtxt=spacing($codtxt,$spacing);

# Formulare einlesen
$form = file_get_contents($ks_hilf[pfad].'/form.template');

# Formularstücke ersetzen
$form = str_replace('{-clean-}', $clean, $form);
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-codtxt-}', $codtxt, $form);
$form = str_replace('{-value-}', $key, $form);
$form = str_replace('{-action-}', '', $form);
$form = str_replace('{-alfasize-}', count($alfa), $form);
$form = str_replace('{-orgtext-}', $lang_plaintext, $form);
$form = str_replace('{-codtext-}', $lang_ciphertext, $form);
$form = str_replace('{-encrypt-}', $lang_encode, $form);
$form = str_replace('{-decrypt-}', $lang_decode, $form);
echo $form;
?>