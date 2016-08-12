<?php
defined('_JEXEC') or die('Restricted access');


global $ungefiltert;
global $schw1;
global $schw2;
global $ks_hilf;
global $AP;
global $alfa;
global $alfa36;
global $morse;
global $homo;
$ks_hilf[pfad]=JURI::base(true) . "components/com_cto/tools/".$this->tool->template;;

$codtxt=$_POST[codtxt];
$schw2=$_POST[schw2];
$schw1=$_POST[schw1];
$mulv=$_POST[mulv];
$rotv=$_POST[rotv];
$rot=$_POST[rot];
$mul=$_POST[mul];
$rott=$_POST[rott];
$mult=$_POST[mult];

require('fkt_coder.php');
require('fkt_decipher.php');
require('fkt_alfabet.php');
require('alfa_dat.php');
require('fkt_statistik.php');

if (!$spacing) $spacing=5;
$codtxt=strtoupper(normalisiere($codtxt,$alfa));
$mulzahl=teilerfremde(sizeof($alfa));

if (!$mulv)
{
	$mulv=1;
}
else
{
	if(!array_search($mulv,$mulzahl)) $mulv=1;
}
if (!$rotv)
{
	$rotv=0;
}
if($rott || $mult|| $reset) {$rotv=0;$mulv=1;}
if(!$schw1) $schw1=1.2;
$alfa2 = createMulAlfa($alfa, $mulv);

if((isset($_POST['suchen']) || $rot || $mul|| $rott || $mult|| $reset) && strlen($codtxt)>0)
{
    if ($rot=="+")
    {
        $rotv=($rotv+1)%26; unset($rott);
    }
    if ($rot=="-")
    {
        $rotv=(26+$rotv-1)%26;unset($rott);
    }
    if ($mul=="+")
    {
        $mkey=array_search($mulv,$mulzahl);
        $mulv=$mulzahl[($mkey+1)%sizeof($mulzahl)]; unset($mult);
    }
    if ($mul=="-")
    {
        if($mulv==1) $mulv=3;
        $mkey=array_search($mulv,$mulzahl);
        $mulv=$mulzahl[($mkey-1)%sizeof($mulzahl)]; unset($mult);

    }
    if($rott)
    {
        $rotv=findrot($codtxt);
    }
    if($mult)
    {
        $mulv=findmul($codtxt);
        $alfa2 = createMulAlfa($alfa,$mulv);
        $rotv=0;
    }
    $alfa2 = createMulAlfa($alfa, $mulv);
    $codtxt=substituiere($codtxt,$alfa2,$alfa);
    $codtxt=dekodieren($codtxt,buchstabeVonIndex($alfa, $rotv),$alfa);
    $codtxt=kodieren($codtxt,buchstabeVonIndex($alfa, $rotv), $alfa);
    $codtxt=substituiere($codtxt,$alfa,$alfa2);
}

$lang_multiplier=JTEXT::_('MULTIPLIER');
$lang_frequency=JTEXT::_('FREQUENCYANALYSIS');

$inhalt.='
<form name=formular method=post>
<table border=0>
    <tr>
        <td colspan=2>
            <table>
            <tr>
            <td>
            <textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size" onClick="this.formular.codtxt.select();this.formular.codtxt.focus()">'.spacing(strtoupper($codtxt),$spacing).'</textarea>
            </td>
            <td valign=middle><script type="text/javascript" src=js/ie_copy_codtxt.js></script></td>
            </tr>
            </table>

        </td>
    </tr>
    <tr>
        <td valign=middle colspan=2>
            <input type=hidden name=challenge value="'.$challenge.'">
            <table border=0>
            <tr><td>'.$lang_multiplier.'</td><td>Rotator</td></tr>
            <tr><td>
            <input type=submit name=mul value=+ class="ctoformcss-default-button-s">
            <input type=text name=mulv value="'.$mulv.'" class="ctoformcss-txtinput-style ctoformcss-twosign-input-size">
            <input type=submit name=mul value=- class="ctoformcss-default-button-s">
            <input type=submit name=mult value=Mul-Check class="ctoformcss-default-button-m">
            </td>
            <td>
            <input type=submit name=rot value=+ class="ctoformcss-default-button-s">
            <input type=text name=rotv value="'.$rotv.'" class="ctoformcss-txtinput-style ctoformcss-twosign-input-size">
            <input type=submit name=rot value=- class="ctoformcss-default-button-s">
            <input type=submit name=rott value=Rot-Check class="ctoformcss-default-button-m">

            </td></tr>
            </table>
            <br><input type=submit name=suchen value="'.$lang_frequency.'" class="ctoformcss-default-button-l">
        </td>
    </tr>
</table>
</form>
<div style="width:450;" align=left>';

$inhalt.='</div>'.alfabetAnalyse($codtxt,$alfa);

echo $inhalt;