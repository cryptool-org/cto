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

$orgtxt = (string) $_POST[orgtxt];
$codtxt = (string) $_POST[codtxt];
$suche  = (string) $_POST[suche];
$key    = (int)    $_POST[key];
$clean  =          $_POST[clean];

include_once($pfad.'/navajo.coder.php');



$firsttime=FALSE;

if ($orgtxt=="")
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$firsttime=TRUE;
}

$orgtxt=strtoupper($orgtxt);
$codtxtt=strtoupper($codtxt);


if (isset($_POST['decode'])) $orgtxt = dekodieren($codtxt);
if (isset($_POST['encode'])) $codtxt = kodieren(clean($orgtxt));
if (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE) $codtxt = kodieren(clean($orgtxt));







# Formulare einlesen
$form = file_get_contents($ks_hilf[pfad].'/form.template');

# Formularstücke ersetzen
$form = str_replace('{-clean-}', $clean, $form);
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-codtxt-}', $codtxt, $form);
$form = str_replace('<input type="text" name="key" value="0" size="3" width="3">'
                  , '<input type="text" name="key" value="'.$key.'" size="3" width="3">'
                  , $form);
$form = str_replace('{-action-}', '', $form);
$form = str_replace('{-orgtext-}', $lang_plaintext, $form);
$form = str_replace('{-codtext-}', $lang_ciphertext, $form);
$form = str_replace('{-encrypt-}', $lang_encode, $form);
$form = str_replace('{-decrypt-}', $lang_decode, $form);

$form = str_replace('MINE SWEEPER', "", $form);


# Ausgabe erzeugen
echo $form;

?>