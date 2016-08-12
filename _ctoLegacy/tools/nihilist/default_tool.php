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



$orgtxt  = (string) $_POST[orgtxt];
$codtxt  = (string) $_POST[codtxt];
$suche   = (string) $_POST[suche];
$key     = (string) $_POST[key];
$key2 	 = (string) $_POST[key2];
$ersetze = (string) $_POST[ersetze];
$from	   = (string) $_POST[from];
$to		   = (string)	$_POST[to];

$firsttime=FALSE;

if ($orgtxt=="")
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$firsttime=TRUE;
	if ($codtxt=="") $key2="key";
}

if ($key=="") $key="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

$key=strtoupper($key);
$key2=strtoupper($key2);
$orgtxt=strtoupper($orgtxt);
$codtxt=strtoupper($codtxt);

require_once($ks_hilf[pfad].'/entschluesseln.php');
require_once($ks_hilf[pfad].'/verschluesseln.php');

$coder1 = new decipher();
$coder2 = new encode(); 



switch($ersetze)
{
    case "W=VV":     
                    $from="W";
						        $to="VV";
						        $ersetze1="SELECTED"; 
						        $key=str_replace("W","VV",$key);
                    $key2=str_replace("W","VV",$key2);    
                    break;
    case "":
    case "I=J":    
						        $from="I";
						        $to="J";
						        $ersetze2="SELECTED"; 
						        $key=str_replace('I', 'J', $key);
                    $key2=str_replace('I', 'J', $key2);
                    break;
}




if (isset($_POST['decode']))
{
	           $coder1->setCode($codtxt);
                        $coder1->setFrom($from);
            						$coder1->setTo($to);
            						$coder1->setPW1($key);
            						$coder1->setPW2($key2);
								      	$coder1->vorverarb();				
                        					
                        $orgtxt=$coder1->decrypt();                        
                        $alph_ersetz=$coder1->getMatrix();
                        
                        $t=0;                        
                        foreach($alph_ersetz as $b){
                             $nihi_matrix .= $b." ";
                             if ($t%5==4) $nihi_matrix.= "<br>";
                             $t++;
                        }
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
                       $coder2->setText($orgtxt);                    
            						$coder2->setFrom($from);
            						$coder2->setTo($to);
            						$coder2->setPW1($key);
            						$coder2->setPW2($key2);
            						$coder2->vorverarb();
            						
                        $codtxt=$coder2->crypt();                         
                        if($codtxt==0) {$codtxt=""; }                        
                        $alph_ersetz=$coder2->getMatrix();                      
                      
                        $t=0;                        
                        foreach($alph_ersetz as $b){
                             $nihi_matrix .= $b." ";
                             if ($t%5==4) $nihi_matrix.= "<br>";
                             $t++;
                        }
}


$form = file_get_contents($ks_hilf[pfad].'/form.template');
$form2 = file_get_contents($ks_hilf[pfad].'/infobox.template');

$form = str_replace('{-clean-}', $clean, $form);
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-codtxt-}', $codtxt, $form);
$form = str_replace('<input type="text" name="key" value="0" size="3" width="3">'
                  , '<input type="text" name="key" value="'.$key.'" size="3" width="3">'
                  , $form);;
$form = str_replace('{-key-}', $key, $form);				  
$form = str_replace('{-key2-}', $key2, $form);
$form = str_replace('{-ersetze1-}', $ersetze1, $form);
$form = str_replace('{-ersetze2-}', $ersetze2, $form);
$form = str_replace('{-action-}', '', $form);

$form = str_replace('{-orgtext-}', $lang_plaintext, $form);
$form = str_replace('{-codtext-}', $lang_ciphertext, $form);
$form = str_replace('{-encrypt-}', $lang_encode, $form);
$form = str_replace('{-decrypt-}', $lang_decode, $form);
$form = str_replace('{-keyword-}', $lang_key, $form);

$form2 = str_replace('{-nihi_matrix-}', $nihi_matrix , $form2);


echo $form;
echo $form2;
?>