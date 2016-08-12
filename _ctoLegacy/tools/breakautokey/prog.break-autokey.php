<?
defined('_JEXEC') or die('Restricted access');

$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;
global $schw1,$schw2,$ungefiltert,$morse,$AP,$alfa,$alfa36;




global $ks_hilf, $alfa;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=JURI::base(true) . '/' . 'modules' . '/mod_cto_breakautokey';

$codtxt=$_POST[codtxt];
$siz=$_POST[siz];
$sect=$_POST[sect];

require('fkt_coder.php');
require('fkt_decipher.php');
require('alfa_dat.php');
require('fkt_statistik.php');

  $codtxt=strtoupper(normalisiere($codtxt,$alfa));
  $spacing=5;
  if(!$siz) $siz=200;
  if(!$sect) $sect=1000;
  $schw1=1.5;
  $parttxt=substr($codtxt,0,$sect);

  if(strlen($codtxt)==0){
    $sich=1000;
  }else{
    $inhalt.= '<br><div style="width:450;" class="text12" align=left>';
    $arr=ak_akt($codtxt, $siz);
    if(sizeof($arr)<=50) {$width=4;$spac=3;}
    if(sizeof($arr)>50)  {$width=3;$spac=2;}
    if(sizeof($arr)>100) {$width=2;$spac=1;}
    if(sizeof($arr)>200) {$width=2;$spac=0;}
    if(sizeof($arr)>400) {$width=1;$spac=0;}
    $inhalt.=showakt($arr,50,2,$width,$spac,1);

    $tmp=array_slice($arr,1,sizeof($arr));
    $zahl=array_search(max($tmp),$tmp)+1;
    $inhalt.= '{-keylength-}: ';
    if ($zahl) {
       $inhalt.= $zahl;
    }else{
       $inhalt.= '{-unknown-}';
    }
    $inhalt.= '!';
    $sich=round(($zahl*26*10)/strlen($codtxt),0);
    if($sich>1) $inhalt.='<br>{-unsafe-}<br>';
    $passw=findpw_ak($parttxt, $zahl);
    $inhalt.='<br><br>{-keyword-}: "'.$passw.'"!';
  }

if($sel2){$sObj0 = "=>";}else{$sObj0 = "&nbsp;&nbsp;";}
for($t=50;$t<=1000;$t=$t+10)
{
    $sObj1.= "\n<option value=".$t;
    if($t==$siz){ $sObj1.= " SELECTED ";}
    $sObj1.= ">".($t)." </option>";
}

for($t=200;$t<=10000;$t=$t+50)
{
    $sObj2.= "\n<option value=".$t;
    if($t==$sect){ $sObj2.= " SELECTED ";}
    $sObj2.= ">".($t)." </option>";
}
if(strlen($passw)){
	
    $sObj3.= "";
}

$inhalt.='
<form action="" name="formular" method="post">
<table border=0>
    <tr>
        <td colspan=2>
            {-ciphertextsigns-}: '.strlen($codtxt).'
        </td>
     </tr>
     <tr>
         <td>
            <textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size">'.spacing(strtoupper($codtxt),$spacing).'</textarea>
        </td>
        <td></td>
    </tr>
    <tr>
        <td colspan=2>
             SW1:<select name=siz>
             '.$sObj1.'
            </select>
             sect:<select name=sect>
             '.$sObj2.'
            </select>
            <input type=submit name=suchen value="Break Autokey" class="ctoformcss-default-button-m">
        </td>
    </tr>
</table>
</form>
'.$sObj3.'
<br>';


$lang_KEYLENGTH=JTEXT::_('KEYLENGTH');
$lang_UNSAFE=JTEXT::_('UNSAFE');
$lang_KEYWORD=JTEXT::_('KEYWORD');
$lang_CIPHERTEXTSIGNS=JTEXT::_('CIPHERTEXTSIGNS');
$lang_UNKNOWN=JTEXT::_('UNKNOWN');



$inhalt = str_replace('{-keylength-}', $lang_KEYLENGTH, $inhalt);
$inhalt = str_replace('{-unsafe-}', $lang_UNSAFE, $inhalt);
$inhalt = str_replace('{-keyword-}', $lang_KEYWORD, $inhalt);
$inhalt = str_replace('{-ciphertextsigns-}', $lang_CIPHERTEXTSIGNS, $inhalt);
$inhalt = str_replace('{-unknown-}', $lang_UNKNOWN, $inhalt);


echo $inhalt;
