<?
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . "components/com_cto/tools/".$this->tool->template;
global $schw1,$schw2,$ungefiltert,$morse,$AP,$alfa,$alfa36;




global $ks_hilf, $alfa;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=JURI::base(true) . "components/com_cto/tools/".$this->tool->template;

global $schw1,$schw2,$ungefiltert,$morse,$AP,$alfa,$alfa36;




$codtxt=$_POST[codtxt];
$siz=$_POST[siz];
$sect=$_POST[sect];
$schw1=$_POST[schw1];
$schw2=$_POST[schw2];

require('fkt_coder.php');
require('fkt_decipher.php');
require('alfa_dat.php');
require('fkt_statistik.php');

  if(!$schw1) $schw1=1.3;
  if(!$schw2) $schw2=1;
  if(!$siz) $siz=150;
  if(!$sect) $sect=1000;
  $spacing=5;

  $codtxt=strtoupper(normalisiere($codtxt,$alfa));
  $parttxt=substr($codtxt,0,$sect);
  $parttxt=strtoupper(normalisiere($parttxt,$alfa));

  if(strlen($codtxt)==0){
    $sich=1000;
  }else{

    $inhalt.='<div style="width:450;" class="text12" align=left>';
    $arr=ak_akt($codtxt,$siz);
    if(sizeof($arr)<=50) {$width=4;$spac=3;}
    if(sizeof($arr)>50)  {$width=3;$spac=2;}
    if(sizeof($arr)>100) {$width=2;$spac=1;}
    if(sizeof($arr)>200) {$width=2;$spac=0;}
    if(sizeof($arr)>400) {$width=1;$spac=0;}
    $inhalt.='<br>';
    $inhalt.=showakt($arr,50,1,$width,$spac,1);



    $inhalt.='<br>';
    $arr2=filterakt($arr);
    $inhalt.=showakt($arr2,10,1,$width,$spac,1);

    $zahl=keylen($arr2);
    $inhalt.='{-keylength-}: ';
    if ($zahl) {$inhalt.=$zahl; }else{$inhalt.='{-unknown-}'; }
    $inhalt.='!';
    $sich=round(($zahl*26*10)/strlen($codtxt),0);
    if($sich>1) $inhalt.='<br>{-unsafe-}';
    $inhalt.='';
    $passw=findpw($parttxt, $zahl);
    $inhalt.='<br>{-keyword-}: "'.$passw.'"!';
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
            <textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size" wrap=virtual>'.spacing(strtoupper($codtxt),$spacing).'</textarea>
        </td>
        <td></td>
    </tr>
    <tr>
        <td colspan=2>SW1:
            <select name=schw1>';
              $inhalt.=$schw1;
              for($t=5;$t<=20;$t++){
                 $inhalt.='<option value="'.($t/10).'"';
                 if($t==$schw1*10){ $inhalt.=' SELECTED ';}
                 $inhalt.='>'.(($t-10)*10).'%</option>';
              }
$inhalt.='
            </select>&nbsp;&nbsp;
            SW2:
            <select name=schw2>';
              $inhalt.=$schw2;
              for($t=1;$t<=20;$t++){
                 $inhalt.='<option value="'.$t.'"';
                 if($t==$schw2){ $inhalt.=' SELECTED ';}
                 $inhalt.='>+'.$t.'</option>';
              }
$inhalt.='
            </select>&nbsp;&nbsp;
            SW3:
            <select name=siz>';

              for($t=50;$t<=1000;$t=$t+10){
                 $inhalt.='<option value='.$t;
                 if($t==$siz){ $inhalt.=' SELECTED ';}
                 $inhalt.='>'.($t).' </option>';
              }
$inhalt.='
            </select>&nbsp;&nbsp;
             sect:<select name=sect>';

              for($t=200;$t<=10000;$t=$t+50){
                 $inhalt.='<option value='.$t;
                 if($t==$sect){ $inhalt.=' SELECTED ';}
                 $inhalt.='>'.($t).' </option>';
              }
$inhalt.='
            </select>
            <p><input type=submit name=suchen value="Break Vigenère" class="ctoformcss-default-button-m">
        </td>
    </tr>
</table>
</form>';


$inhalt.='<br>';

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
