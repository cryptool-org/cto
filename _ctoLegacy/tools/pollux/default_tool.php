<?
defined('_JEXEC') or die('Restricted access');

$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;


$lang_encode=JTEXT::_('ENCODE');
$lang_decode=JTEXT::_('DECODE');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_dashes=JTEXT::_('DASHES');
$lang_dots=JTEXT::_('DOTS');
$lang_spaces=JTEXT::_('SPACES');

$lang_chars=JTEXT::_('CHARS');
$lang_digits=JTEXT::_('DIGITS');
$lang_merge=JTEXT::_('MERGE');


global $ks_hilf, $homo, $alfa, $morse;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=dirname(__FILE__);


$orgtxt = (string) $_POST[orgtxt];
$codtxt = (string) $_POST[codtxt];
$suche  = (string) $_POST[suche];
$num    = $_POST[num];
$alf    = $_POST[alf];
$misch  = $_POST[misch];
$clean  = $_POST[clean];



require_once($ks_hilf[pfad].'/functions.pollux.php');
require_once($ks_hilf[pfad]."/alfa_dat.php");

  $polluxalfa[0]=$alfanum[0];
  $polluxalfa[1]=$alfa;
  $polluxalfa[2]=$alfa36;

  if (!$num && !$alf): $num="on"; $alf="on"; $misch="on"; $palfa=$polluxalfa[0]; $n=0; endif;
  if ($num && !$alf):  $palfa=$polluxalfa[0]; $n=0; endif;
  if (!$num && $alf):  $palfa=$polluxalfa[1]; $n=1; endif;
  if ($num && $alf):   $palfa=$polluxalfa[2]; $n=2; endif;

  # einfache Mischung über den gemeinsamen Teilerfremden 7 zu 10, 26 und 36
  if($misch) $palfa=createMulAlfa($palfa, 7);

  $eingabe[0]=array_slice($palfa,0,$pvert[$n][0]);
  $eingabe[1]=array_slice($palfa,$pvert[$n][0],$pvert[$n][1]);
  $eingabe[2]=array_slice($palfa,$pvert[$n][0]+$pvert[$n][1],$pvert[$n][2]);

$codtxt=str_replace(' ','',$codtxt);
if(!$spacing) $spacing=5;

# Kodieren / Dekodieren

#if ($clean) {$coder->setCleanflag();}
$codtxt=str_replace(' ','',$codtxt);
$orgtxt=str_replace(' ','',$orgtxt);


if (isset($_POST['decode']))
{
	$codtxt=str_replace(' ','',$codtxt);
                      $orgtxt=str_replace(' ','',$orgtxt);
                      $polluxcode=$codtxt;
                      $morsecode=decPollux($polluxcode,$eingabe);
                      $orgtxt=fromMorse($morsecode);
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
	$sel2='SELECTED';
                      $orgtxt=normalisiere($orgtxt,$morse[0]);
                      $morsecode=trim(toMorse(trim($orgtxt)));
                      if (strlen($morsecode)>0)
                      {
                          $polluxcode=encPollux($morsecode,$eingabe);
                      }
                      else
                      {
                          $polluxcode="";
                      }
                      $codtxt=$polluxcode;
}


$codtxt=str_split($codtxt,5);
$codtxt=implode(" ",$codtxt); 
$orgtxt=str_split($orgtxt,5);
$orgtxt=implode(" ",$orgtxt);                       

# Formulare einlesen
$form = file_get_contents($ks_hilf[pfad].'/form.template');
$infobox = file_get_contents($ks_hilf[pfad].'/infobox.template');

# Formularstücke ersetzen
if($num) $sObj3=' checked';
if($alf) $sObj4=' checked';
if($misch) $sObj5=' checked';

$form = str_replace('{-clean-}', $clean, $form);
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-codtxt-}', $codtxt, $form);
$form = str_replace('{-mul-}', $sObj2, $form);
$form = str_replace('{-rot-}', $sObj3, $form);
$form = str_replace('<input type="text" name="key" value="0" size="3" width="3">'
                  , '<input type="text" name="key" value="'.$key.'" size="3" width="3">'
                  , $form);
$form = str_replace('{-action-}', '', $form);

$form = str_replace('{-num-}', $sObj3, $form);
$form = str_replace('{-alf-}', $sObj4, $form);
$form = str_replace('{-misch-}',  $sObj5, $form);

$form = str_replace('{-zeile1-}', implode(", ",$eingabe[0]), $form);
$form = str_replace('{-zeile2-}', implode(", ",$eingabe[1]), $form);
$form = str_replace('{-zeile3-}', implode(", ",$eingabe[2]), $form);

$form = str_replace('{-orgtext-}', $lang_plaintext, $form);
$form = str_replace('{-codtext-}', $lang_ciphertext, $form);
$form = str_replace('{-encrypt-}', $lang_encode, $form);
$form = str_replace('{-decrypt-}', $lang_decode, $form);

$form = str_replace('{-dots-}', $lang_dots, $form);
$form = str_replace('{-dashes-}', $lang_dashes, $form);
$form = str_replace('{-spaces-}', $lang_spaces, $form);

$form = str_replace('{-Zahlen-}', $lang_digits, $form);
$form = str_replace('{-Buchstaben-}', $lang_chars, $form);
$form = str_replace('{-Mischen-}', $lang_merge, $form);



# Ausgabe erzeugen
echo $form;
?>
