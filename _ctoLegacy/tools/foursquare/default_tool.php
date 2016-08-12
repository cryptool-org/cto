<?
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;
$pass1=$_POST['passwort_E1'];
$pass2=$_POST['passwort_E2'];
$klar=$_POST['klartext'];
$fremd=$_POST['fremdtext'];
$firsttimer=FALSE;

if ($klar=="") 
{
	$klar=$default_text=JTEXT::_('DEFAULTTEXT');
	$firsttime=TRUE;
}

if ($pass1=="") $pass1="example";
if ($pass2=="") $pass2="keyword";

include_once($pfad.'/main.php');

$chiff = new main();
$form = file_get_contents($pfad.'/form.template');


$chiff->setKey1Einschub($pass1);
$chiff->setKey2Einschub($pass2);

$crypt=$fremd;
$encrypt=$klar;

if (isset($_POST['decode'])) $encrypt=strtoupper($chiff->getEnCrypt(strtolower($fremd)));
if (isset($_POST['encode'])) $crypt=strtoupper($chiff->getCrypt(strtolower($klar)));
if (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE) $crypt=strtoupper($chiff->getCrypt(strtolower($klar)));


$form = str_replace('{-orgtxt-}', $encrypt, $form);
$form = str_replace('{-codtxt-}', $crypt, $form);
$form = str_replace('{-pass1-}', $pass1, $form);
$form = str_replace('{-pass2-}', $pass2, $form);


$lang_encode=JTEXT::_('ENCODE');
$lang_decode=JTEXT::_('DECODE');
$lang_code1=JTEXT::_('CODE1');
$lang_code2=JTEXT::_('CODE2');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');

$form = str_replace('{-encode-}', $lang_encode, $form);
$form = str_replace('{-decode-}', $lang_decode, $form);
$form = str_replace('{-code1-}', $lang_code1, $form);
$form = str_replace('{-code2-}', $lang_code2, $form);
$form = str_replace('{-plaintext-}', $lang_plaintext, $form);
$form = str_replace('{-ciphertext-}',$lang_ciphertext, $form);

# Ausgabe erzeugen
echo $form;
?>