<?php
defined('_JEXEC') or die('Restricted access');


global $schw1,$schw2,$ungefiltert,$morse,$AP,$alfa,$alfa36;
$pfad = dirname(__FILE__);
$codtxt=$_POST[codtxt];
$schw1=$_POST[schw1];
$suchen=$_POST[suchen];
$siz=$_POST[siz];
$pos1=$_POST[pos1];
$zaehl=$_POST[zaehl];
$nxfx=$_POST[nxfx];
$nosp=$_POST[nosp];
$akz=$_POST[akz];



require('fkt_coder.php');
require('fkt_decipher.php');
require('fkt_alfabet.php');
require('alfa_dat.php');
require('fkt_statistik.php');

    $codtxt=strtoupper(normalisiere($codtxt,$alfa));

    if(!$spacing) $spacing=5;
    if(!$schw1) $schw1=1.2;
    if(($akz || isset($_POST['suchen'])) && $suchen != "auswählen" && strlen($codtxt)>0)
    {
       if (!$siz)
       {
            $siz=200;
            $pos1=on;
            $zähl=on;
            $nxfx=on;
            $nosp=on;
            $akz=0;
            $total=ceil(strlen($codtxt)/10)*10;
            $teiler=gzt($total);
            for ($t=0;$t<(sizeof($teiler)-1);$t++)
            {
                if($siz>$teiler[$t] && $siz<$teiler[$t+1] && $t>0)
                {
                    $siz=$teiler[$t];
                    break;
                }
            }
       }


       if ($nosp)
       {
           $codtxt=str_replace(' ','',$codtxt);
       }

       if ($nxfx)
       {
           $total=ceil(strlen($codtxt)/10)*10;
           $teiler=gzt($total);
           for ($t=0;$t<(sizeof($teiler)-1);$t++)
           {
               if($siz>$teiler[$t] && $siz<$teiler[$t+1] && $akz=="+" && $t>0)
               {
                   $siz=$teiler[$t+1];
                   break;
               }
               if($siz>$teiler[$t] && $siz<$teiler[$t+1] && $akz=="-"&& $t>0)
               {
                   $siz=$teiler[$t];
                   break;
               }
               if($siz==$teiler[$t] && $akz=="-" && $t>0)
               {
                   $siz=$teiler[$t-1];
                   break;
               }
               if($siz==$teiler[$t] && $akz=="+" )
               {
                   $siz=$teiler[$t+1];
                   break;
               }
           }
       }
       else
       {
           if ($siz>=5 && $akz=="+"){$siz++;}
           if ($siz>5  && $akz=="-") {$siz--;}
       }
       if ($siz<=5 && $akz=="+"){$siz=5;}
       if ($siz<=5 && $akz=="-"){unset($siz);}
       if ($siz<=5 && $siz>0){$siz=5;}
       if ($siz>strlen($codtxt)){$siz=strlen($codtxt);}
       $parts=1;


       if($siz)
       {
           $arr=ak_akt($codtxt,$siz);
       }
       else
       {
           $arr=akt($codtxt);
       }

       #print_r(akt($codtxt));
       if(sizeof($arr)<=50) {$width=4;$spac=3;}
       if(sizeof($arr)>50)  {$width=3;$spac=2;}
       if(sizeof($arr)>100) {$width=2;$spac=1;}
       if(sizeof($arr)>200) {$width=2;$spac=0;}
       if(sizeof($arr)>400) {$width=1;$spac=0;}
       if ($pos1)
       {
           $arr=@array_slice($arr,1);
       }
       $out=showakt($arr,50,$parts,$width,$spac,0);

       if($zaehl)
       {
          if(!$schw1) $schw1=1.2;
          if(!$schw2) $schw2=1;

          $arr2=filterakt($arr);
          $zahl=keylen($arr2);
          $lang_maxima=JTEXT::_('MAXIMA');
		  $lang_maximum=JTEXT::_('MAXIMUM');
	      $lang_minimum=JTEXT::_('MINIMUM');
          $lang_useless=JTEXT::_('USELESS');
          $lang_vigenere=JTEXT::_('VIGENERE');
          $lang_strom=JTEXT::_('STROM');
          $out.= $lang_maxima.": ". $zahl;
          $zahl2=@array_search(@max($arr),$arr)+1;
          $zahl3=@array_search(@min($arr),$arr)+1;
          if ($pos1)
          {
              $out.= "<br>".$lang_maximum.": ". $zahl2;
              $out.= "<br>".$lang_minimum.": ". $zahl3;
              if(trim($zahl)=="")
              {
                 $out.= "<br> ".$lang_useless."! ";
              }
              elseif($zahl2%$zahl==0)
              {
                     $out.= "<br>".$lang_vigenere;
              }
              elseif($zahl2-$zahl==1)
              {
                  $out.= "<br>".$lang_strom;
              }
              else
              {
                  $out.= "<br> ".$lang_useless."! ";
              }
          }
       }
    }

for($t=5;$t<=20;$t++)
{
    $sObj0.= "\n<option value=\"".($t/10)."\"";
    if($t==$schw1*10){ $sObj0.= " SELECTED ";}
    $sObj0.= ">".(($t-10)*10)."%</option>";
}
if($pos1){$sObj1 = "checked";}
if($zaehl){$sObj2 = "checked";}
if($nxfx){$sObj3 = "checked";}
if($nosp){$sObj4 = "checked";}

$lang_count=JTEXT::_('COUNT');
$lang_length=JTEXT::_('LENGTH');
$lang_autocorrelation=JTEXT::_('AUTOCORRELATION');


$inhalt.='
<form name="formular" method="post" action="">
<table border=0>
    <tr>
        <td colspan=2>
            <table>
            <tr>
            <td>
            <textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size" onClick="this.form.codtxt.select();this.form.codtxt.focus()">'.spacing(strtoupper($codtxt),$spacing).'</textarea>
            </td>
            <td valign=middle></td>
            </tr>
            </table>

        </td>
    </tr>
    <tr>
        <td valign=middle colspan=2>
            <input type=submit name=suchen value="'.$lang_autocorrelation.'" class="ctoformcss-default-button-m">
            <input type=hidden name=challenge value="'.$challenge.'">
            <input type=submit name=akz value="+" class="ctoformcss-default-button-s">
            <input type=submit name=akz value="-" class="ctoformcss-default-button-s">
            &nbsp;&nbsp;'.$lang_length.':&nbsp;<input type=text name=siz value="'.$siz.'" size=4 class="ctoformcss-txtinput-style">


            <p>
            <select name=schw1 class="ctoformcss-txtinput-style">'.$sObj0.'</select>&nbsp;&nbsp;
            <input type=checkbox name=pos1 '.$sObj1.'>pos1&nbsp;&nbsp;
            <input type=checkbox name=zaehl '.$sObj2.'>'.$lang_count.'&nbsp;&nbsp;
            <input type=checkbox name=nxfx '.$sObj3.'>n|x&nbsp;&nbsp;
            <input type=checkbox name=nosp '.$sObj4.'>nosp&nbsp;&nbsp;

        </td>
    </tr>
</table>
</form>';

echo $inhalt;
echo $out;
?>