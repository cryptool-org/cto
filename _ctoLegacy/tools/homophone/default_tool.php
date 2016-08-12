<?
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;


$lang_encode=JTEXT::_('ENCODE');
$lang_decode=JTEXT::_('DECODE');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_random=JTEXT::_('RANDOM');


global $ks_hilf, $homo, $alfa;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=dirname(__FILE__);


$orgtxt = (string) $_POST[orgtxt];
$codtxt = (string) $_POST[codtxt];
$suche  = (string) $_POST[suche];
$key    = (int)    $_POST[key];
$key2   = (int)    $_POST[key2];
$clean  =          $_POST[clean];

require_once($ks_hilf[pfad].'/functions.homo.php');
require_once($ks_hilf[pfad]."/alfa_dat.php");

/*
$datasource = new PDO('sqlite:'.$ks_hilf['pfad'].'/ksb.sqlite');
foreach ($datasource->query("SELECT data FROM alfa WHERE name = 'de' LIMIT 1") as $row)
{
  $alfa = str_split($row[data],1); $alfastring = $row[data];
}
*/

# Plausibilität von Eingaben prüfen
/*
if (!is_int($key) || $key<0) {$key=0;} else {$key=($key%count($alfa));}
if ($clean) {$clean = 'checked';} else {$clean = '';}
*/
if(!$key) $key=1;
$mulzahl=teilerfremde(100);
for($s=0;$s<100;$s++)
{
    $rotzahl[]=$s;
}

if (isset($_POST['random']))
{
    $key_t=mt_rand(0, count($mulzahl)-1);
    $key2_t=mt_rand(0, count($rotzahl)-1);
    $key=$mulzahl[$key_t];
    $key2=$rotzahl[$key2_t];
}

for ($t=0;$t<100;$t++)
{
        if($t<10) {$tt="0".$t;}else{$tt=$t;}
        $subst[]=$tt;
}



$subst2 = createMulAlfa($subst, $key);
$subst2 = rotieren($subst2, $key2);

$alfah = makehomoalfa($subst2,"de");
foreach($alfah as $num)
{
  foreach($num as $bla[])
  {
  }
}

for($t=0;$t<sizeof($mulzahl);$t++)
{
    $sObj2.="\n<option value=\"".$mulzahl[$t]."\"";
    if ($mulzahl[$t]==$key) $sObj2.=" SELECTED ";
    $sObj2.=">".$mulzahl[$t]."</option>";
}

for($t=0;$t<sizeof($rotzahl);$t++)
{
    $sObj3.= "\n<option value=\"".$rotzahl[$t]."\"";
    if ($rotzahl[$t]==$key2) $sObj3.= " SELECTED ";
    $sObj3.= ">".$rotzahl[$t]."</option>";
}



$firsttime=FALSE;

if ($orgtxt=="")
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$firsttime=TRUE;
	//$key=5;
}

$orgtxt=strtoupper(normalisiere($orgtxt,$alfa));
$codtxt=str_replace(" ","",$codtxt);
if ($clean) {$coder->setCleanflag();}

if (isset($_POST['decode']))
{
	$sel1="SELECTED"; $orgtxt=dekhomo($codtxt,$alfah, $alfa);
    $codtxt=str_split($codtxt,2);
    $codtxt=implode(" ",$codtxt);
    $orgtxt=str_split($orgtxt,5);
    $orgtxt=implode(" ",$orgtxt);
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
	$sel2="SELECTED"; $codtxt=kodhomo($orgtxt,$alfah, $alfa);
    $codtxt=str_split($codtxt,2);
    $codtxt=implode(" ",$codtxt);
    $orgtxt=str_split($orgtxt,5);
    $orgtxt=implode(" ",$orgtxt);
}



# Formulare einlesen
$form = file_get_contents($ks_hilf[pfad].'/form.template');
$infobox = file_get_contents($ks_hilf[pfad].'/infobox.template');

# Formularstücke ersetzen
$form = str_replace('{-clean-}', $clean, $form);
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-codtxt-}', $codtxt, $form);
$form = str_replace('{-mul-}', $sObj2, $form);
$form = str_replace('{-rot-}', $sObj3, $form);
$form = str_replace('<input type="text" name="key" value="0" size="3" width="3">'
                  , '<input type="text" name="key" value="'.$key.'" size="3" width="3">'
                  , $form);
$form = str_replace('{-action-}', '', $form);
$form = str_replace('{-orgtext-}', $lang_plaintext, $form);
$form = str_replace('{-codtext-}', $lang_ciphertext, $form);
$form = str_replace('{-encrypt-}', $lang_encode, $form);
$form = str_replace('{-decrypt-}', $lang_decode, $form);
$form = str_replace('{-random-}', $lang_random, $form);

$infobox = str_replace('{-alfa-}', displayhomo($subst2), $infobox);

# Ausgabe erzeugen
echo $form;
echo "<p><br><p>";
echo $infobox;

?>