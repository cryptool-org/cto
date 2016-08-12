<?php
defined('_JEXEC') or die('Restricted access');
global $ks_hilf, $alfa36;

$codtxt=$_POST[codtxt];
$suchen=$_POST[suchen];
$tops=$_POST[tops];
$hmo=$_POST[hmo];
$hbi=$_POST[hbi];
$htri=$_POST[htri];

require('fkt_coder.php');
require('fkt_decipher.php');
require('fkt_alfabet.php');
require('alfa_dat.php');

    if (!$spacing) $spacing=5;
    $codtxt=strtoupper(normalisiere($codtxt,$alfa));
    if(!$schw1) $schw1=1.2;
    if (!$hbi && !$htri && !$hquad)
    {
        $hmo=on;
        $hbi=on;
        $htri=on;
        $tops=30;
    }


    if(isset($_POST['suchen']) && strlen($codtxt)>0)
    {
        if($hmo)
        {
            $res=ngramme($codtxt, 1);
            foreach ($res as $key => $value)
            {
                $armo[]=array($key,$value);
            }
        }
        if($hbi)
        {
            $res=ngramme($codtxt, 2);
            foreach ($res as $key => $value)
            {
                $arbi[]=array($key,$value);
            }
        }
        if($htri)
        {
            $res=ngramme($codtxt, 3);
            foreach ($res as $key => $value)
            {
                $artr[]=array($key,$value);
            }
        }
        if($hqua)
        {
            $res=ngramme($codtxt, 4);
            foreach ($res as $key => $value)
            {
                $arqu[]=array($key,$value);
            }
        }
        $result = ngrshow($armo,$arbi,$artr,$arqu,$tops,strlen($codtxt));
}

     for($t=5;$t<=1000;$t=$t+5)
     {
        $sObj0.='<option value="'.$t.'"';
        if ($t==$tops) $sObj0.=' SELECTED ';
        $sObj0.='>'.$t.'</option>';
     }
     if($hmo)  {$sObj1 = "checked";}
     if($hbi)  {$sObj2 = "checked";}
     if($htri) {$sObj3 = "checked";}
    
    
$lang_ngramanalysis=JTEXT::_('NGRAMANALYSIS');
$lang_list=JTEXT::_('LIST');
    
    
    
     $inhalt.='
<form name=formular method=post>

<table border=0>
    <tr>
        <td colspan=2>
           
            <textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size" onClick="this.form.codtxt.select();this.form.codtxt.focus()">'.spacing(strtoupper($codtxt),$spacing).'</textarea>
        

        </td>
    </tr>
    <tr>
        <td valign=middle colspan=2>
            <input type=submit name=suchen value="'.$lang_ngramanalysis.'" class="ctoformcss-default-button-l">
            <input type=hidden name=challenge value="'.$challenge.'">

           '.$lang_list.':<select name=tops>
           '.$sObj0.'
            </select>&nbsp;&nbsp;
            <input type=checkbox name=hmo   '.$sObj1.'>1&nbsp;
            <input type=checkbox name=hbi   '.$sObj2.'>2&nbsp;
            <input type=checkbox name=htri  '.$sObj3.'>3&nbsp;
        </td>
    </tr>
    <tr>
        <td valign=top align=right colspan=2>
        </td>
    </tr>
</table>
</form>
';
$inhalt.='<br>';
$inhalt.=$result;
$inhalt.='</center>';


echo "$inhalt";

?>