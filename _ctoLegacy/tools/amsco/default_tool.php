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
$key    = 		   $_POST[key];
$clean  =          $_POST[clean];
if (!$key) $key=1;


$firsttime=FALSE;

if ($orgtxt=="")
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$firsttime=TRUE;
	$key="135624";
}

# Plausibilität von Eingaben prüfen
if(is_numeric($key)) $key = (int) $key;
#if (!is_int($key) || $key<0) {$key=0;} else {$key=($key%count($alfa));}
if ($clean) {$clean = 'checked';} else {$clean = '';}
# Kodieren / Dekodieren
require_once($ks_hilf[pfad].'/class.amsco.php');
$coder = new amsco_cipher();
$coder->setKey($key);
$coder->setAlfa($alfastring);
if ($clean) {$coder->setCleanflag();}


if(is_integer($key))
{
if (isset($_POST['decode']))
{
	$coder->setText($codtxt);
    $orgtxt=$coder->getText();
    $coder->decode();
    $orgtxt=$coder->getText();
}
if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
	$coder->setText($orgtxt);
    $orgtxt=$coder->getText();
    $coder->encode();
    $codtxt=$coder->getText();
}
}

# Formulare einlesen
$form = file_get_contents($ks_hilf[pfad].'/form.template');
$infobox = file_get_contents($ks_hilf[pfad].'/infobox.template');

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
$form = str_replace('{-key-}', $key, $form);

# Ausgabe erzeugen
echo $form;


?>