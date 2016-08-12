<?php
defined('_JEXEC') or die('Restricted access');

$lang_encode=JTEXT::_('ENCRYPT');
$lang_decode=JTEXT::_('DECRYPT');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_key=JTEXT::_('KEY');


global $ks_hilf, $alfa;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=dirname(__FILE__);

 require $ks_hilf[pfad]."/alfa_dat.php";
 require $ks_hilf[pfad]."/functions.alberti.php";

$orgtxt = $_POST[orgtxt];
$codtxt = $_POST[codtxt];
$kkey1 = $_POST[kkey1];
$mkey1 = $_POST[mkey1];
$rkey1 = $_POST[rkey1];
$flip1a = $_POST[flip1a];
$flip1b = $_POST[flip1b];
$kkey2 = $_POST[kkey2];
$mkey2 = $_POST[mkey2];
$rkey2 = $_POST[rkey2];
$flip2a = $_POST[flip2a];
$flip2b = $_POST[flip2b];
$suche = $_POST[suche];
$suchen = $_POST[suchen];

$firsttime=FALSE;

if ($orgtxt=="" && !isset($_POST['decode']))
{
	$orgtxt=JTEXT::_('DEFAULTTEXT');
	$kkey1="CODE";
	$kkey2="TEST";
	$firsttime=TRUE;
}

$spacing=5;
$mulzahl = teilerfremde(count($alfa));

# Alfabete erzeugen
################################################################################
$orgtxt=strtoupper(normalisiere($orgtxt,$alfa));
$codtxt=strtoupper(normalisiere($codtxt,$alfa));
$kkey1=strtoupper(normalisiere($kkey1,$alfa));
################################################################################
if(!$mkey1) $mkey1=1;
$alfa2 = rotieren($alfa, $rkey1);
$alfa2 = createMulAlfa($alfa2, $mkey1);
if ($flip1a) { $alfa2 = array_flipp($alfa2); }
#$kkey1=normalize($kkey1);
#$kkey1=strtoupper($kkey1);
if (strlen(trim($kkey1))>0){
   $alfa2=array_merge(array_unique(str_split($kkey1)),array_diff($alfa2,str_split($kkey1)));
}
if ($flip1b) { $alfa2 = array_flipp($alfa2); }
################################################################################
if(!$mkey2) $mkey2=1;
$alfa3 = rotieren($alfa, $rkey2);
$alfa3 = createMulAlfa($alfa3, $mkey2);
if ($flip2a) { $alfa3 = array_flipp($alfa3); }
$kkey2=strtoupper(normalisiere($kkey2,$alfa));
if (strlen(trim($kkey2))>0){
   $alfa3=array_merge(array_unique(str_splitt($kkey2)),array_diff($alfa3,str_split($kkey2)));
}
if ($flip2b) { $alfa3 = array_flipp($alfa3); }
################################################################################



if (isset($_POST['decode']))
{
	           $sel1="SELECTED";
                           $orgtxt1=substituiere($codtxt,$alfa2,$alfa);
                           $orgtxt2=substituiere($codtxt,$alfa3,$alfa);
                           $orgtxt="";
                           for($t=0;$t<strlen($codtxt);$t++)
                           {
                                   if($t%2 == 0){
                                           $orgtxt.=substr($orgtxt1,$t,1);
                                   }else{
                                           $orgtxt.=substr($orgtxt2,$t,1);
                                   }
                           }
}

if (isset($_POST['encode']) || (!isset($_POST['decode']) && !isset($_POST['encode']) && $firsttime==TRUE))
{
                      $sel2="SELECTED";
                           $codtxt1=substituiere($orgtxt,$alfa,$alfa2);
                           $codtxt2=substituiere($orgtxt,$alfa,$alfa3);
                           $codtxt="";
                           for($t=0;$t<strlen($orgtxt);$t++)
                           {

                                   if($t%2 == 0) {
                                           $codtxt.=substr($codtxt1,$t,1);
                                   }else{
                                           $codtxt.=substr($codtxt2,$t,1);
                                   }
                           }
}



ob_start();
?>
<form name=formular method=post>
<input type=hidden name=action value=yes>
<input type=hidden name=topic value=<?php echo $topic?>>
<table border=0>
<tr><td> <?php echo $lang_plaintext?>:<br><textarea name=orgtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size" onKeyUp="this.value=this.value.toUpperCase()"><?php echo spacing(strtoupper($orgtxt),$spacing)?></textarea></td><td valign=middle align=left>
</td></tr>
<tr>
<td>&nbsp;</td><td>&nbsp;</td></tr>

<tr>
<td><?php echo $lang_ciphertext?>:<br><textarea name=codtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size"><?php echo spacing(strtoupper($codtxt),$spacing)?></textarea></td><td valign=middle></td></tr>
<tr><td colspan=2>
<br>
<?php echo $lang_key?>1:<input type=text name=kkey1 value="<?php echo $kkey1?>" class="ctoformcss-txtinput-style ctoformcss-alberti-keylengt">
Mul1:<select name=mkey1 class="ctoformcss-default-button">
    <?php for($t=0;$t<sizeof($mulzahl);$t++): ?>
        <option value="<?php echo $mulzahl[$t]?>" <?php if($mulzahl[$t]==$mkey1) echo 'SELECTED';?>>
            <?php echo $mulzahl[$t]?>
        </option>
     <?php endfor;?>
    </select>
Rot1:<select name=rkey1 class="ctoformcss-default-button">
     <?php for($t=0;$t<count($alfa);$t++):?>
        <option value="<?php echo $t?>" <?php if ($t==$rkey1) echo "SELECTED"?>>
            <?php echo $t?>
        </option>
     <?php endfor;?>
    </select>
<br>

<?php echo $lang_key?>2:<input type=text name=kkey2 value="<?php echo $kkey2?>" class="ctoformcss-txtinput-style ctoformcss-alberti-keylengt">
Mul2:<select name=mkey2 class="ctoformcss-default-button">
<?php for($t=0;$t<sizeof($mulzahl);$t++):?>
        <option value="<?php echo $mulzahl[$t]?>" <?php if ($mulzahl[$t]==$mkey2) echo 'SELECTED'?>>
            <?php echo $mulzahl[$t] ?>
        </option>
     <?php endfor;?>
    </select>
Rot2:<select name=rkey2 class="ctoformcss-default-button">
<?php for($t=0;$t<26;$t++):?>
        <option value="<?php echo $t?>" <?php if ($t==$rkey2) echo 'SELECTED'?>>
            <?php echo $t?>
        </option>
     <?php endfor;?>

    </select>
<br><p>
<input type=submit name=encode value="<?php echo $lang_encode?>" class="ctoformcss-default-button-m">&nbsp;&nbsp;&nbsp;<input type=submit name=decode value="<?php echo $lang_decode?>" class="ctoformcss-default-button-m">
<br>
</td></tr>
</table>
</form><p><br>
<table border=0><tr><td><font face=courier>
 <?php for($t=0;$t<sizeof($alfa);$t++):?>
     <?php echo $alfa[$t]?> 
 <?php endfor;?>

<hr size=1>
</td></tr><tr><td><font face=courier>';
<?php for($t=0;$t<sizeof($alfa2);$t++):?>
     <?php if ($t%2==1):?><font color=silver><?php endif;?>
     <?php echo $alfa2[$t]?> 
     <?php if ($t%2==1):?></font><?php endif;?>
 <?php endfor;?>
    </font></td></tr><tr><td><font face=courier>';
<?php for($t=0;$t<sizeof($alfa3);$t++):?>
     <?php if ($t%2==0):?><font color=silver><?php endif;?>
     <?php echo $alfa3[$t]?> 
     <?php if ($t%2==0):?></font><?php endif;?>
 <?php endfor;?>
</font></td></tr></table>
<br><br>
<?php
$inhalt = ob_get_contents();
ob_end_clean();
echo $inhalt;

?>
