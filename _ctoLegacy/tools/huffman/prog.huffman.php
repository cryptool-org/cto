<?php
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;

$lang_encode=JTEXT::_('ENCODE');
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_defaulttext=JTEXT::_('DEFAULTTEXT');
$lang_huffmancodedtext=JTEXT::_('HUFFMANCODEDTEXT');
$lang_asciicodedtext=JTEXT::_('ASCIICODEDTEXT');
$lang_result=JTEXT::_('RESULT');
$lang_storagesize=JTEXT::_('STORAGESIZE');
$lang_entropy=JTEXT::_('ENTROPY');
$lang_codelength=JTEXT::_('CODELENGTH');
$lang_compression=JTEXT::_('COMPRESSION');
$lang_number=JTEXT::_('NUMBER');
$lang_sign=JTEXT::_('SIGN');
$lang_frequency=JTEXT::_('FREQUENCY');











global $alphabet, $search, $replace, $verteilung, $satzname, $ks_hilf;
//global $alphabet, $search, $replace, $verteilung, $satzname;
$ks_hilf[pfad]=dirname(__FILE__);




include($ks_hilf[pfad].'/coder.huffman.php');
include($ks_hilf[pfad].'/coder.ascii.php');
include($ks_hilf[pfad].'/analyse.class.php');
include($ks_hilf[pfad].'/analyse.data.php');
$orgtxt=$_POST[orgtxt];

if ($orgtxt=="") $orgtxt=$lang_defaulttext;

$codtxt="";
$bintxt="";
$t=array_unique(str_split($orgtxt));

if (strlen($orgtxt)>1 and count($t)>1)
{
    $daten=huffmanKodierer($orgtxt);
    $v = huffmanVorschrift($daten);
    $txt = str_split($orgtxt);
    $codtxt = huffmanEncode($txt, $v);
    $bintxt = tobin($orgtxt);

    $hafu = new analyse($sprache="bin2");
    $hafu->ladeText($codtxt);
    $hafu->standardVorverarbeitung();
    $hafu->entropie();
    $entropie=$hafu->data['entropie'];
    $huf=$hafu->text;

    $hafu2 = new analyse($sprache="bin2");
    $hafu2->ladeText($bintxt);
    $hafu2->standardVorverarbeitung();
    $hafu2->entropie();
    $entropie2=$hafu2->data['entropie'];
    $huf2=$hafu2->text;

    foreach ($daten as $stuff)
    {
        $mit+=$stuff[1]*strlen($stuff[2]);
        $mitz+=$stuff[1];
    }
    $mitl=$mit/$mitz;

}
$form = "";
ob_start();
?>
<form method=post name=form>
<table border=0>
<tr><td>
 <?php echo $lang_plaintext?>:<br>
<textarea name=orgtxt class="ctoformcss-txtinput-style ctoformcss-default-input-size"><?php echo $orgtxt?></textarea><br>
<br><input type=submit class="ctoformcss-default-button-m" value="<?php echo $lang_encode?>">
<?php if(count($daten)>1): ?>
    <br><br><?php echo $lang_huffmancodedtext?>:<br>
    <textarea name=codtxt class="ctoformcss-txtoutput-style ctoformcss-default-input-size" readonly><?php echo $codtxt?></textarea><p>
    <?php echo $lang_asciicodedtext?>:<br>
    <textarea name=codtxt class="ctoformcss-txtoutput-style ctoformcss-default-input-size" readonly><?php echo $bintxt?></textarea><br>
<?php endif; ?>
</td></tr></table>
</form>

<?php 
$t=0;
if(count($daten)>1): 
ob_start();?>
    <p><br>
    <table border=0>
    <tr><td>
    <h2><?php echo $lang_result?></h2>
    <br><b><?php echo $lang_storagesize?>:</b>
    <blockquote>
       ASCII: <?php echo (strlen($orgtxt)*8)?> bit<br>
       Huffman: <?php echo (strlen($huf))?> bit<br>
    </blockquote>
    <b><?php echo $lang_entropy?>:</b>
    <blockquote>
       ASCII: <?php echo $entropie2?><br>
       Huffman: <?php echo $entropie?><br>
    </blockquote>
    <b><?php echo $lang_codelength?>:</b>
    <blockquote>
       ASCII: 8 bit <br>
       Huffman: <?php echo $mitl?> bit<br>
    </blockquote>
    <b><?php echo $lang_compression?>:</b> <?php echo ($mitl/8)?>
    <br><br>
    <table cellspacing=0 cellpadding=4 border=1>
<?php 
@sort($daten);
?>
    <tr><td><b>&nbsp;<?php echo $lang_number?>&nbsp;</b></td><td><b>&nbsp;<?php echo $lang_sign?>&nbsp;</b></td><td><b>&nbsp;ASCII&nbsp;</b></td><td><b>&nbsp;<?php echo $lang_frequency?>&nbsp;</b></td><td><b>&nbsp;Huffman&nbsp;</b></td><td><b>&nbsp;ASCII&nbsp;</b></td></tr>
    <?php foreach ($daten as $stuff): ?>
        <tr>
	    <td><?php echo $t;?></td>
	    <td>'<?php echo $stuff[0];?>'</td>
	    <td><?php echo ord($stuff[0]);?></td>
	    <td><?php echo $stuff[1];?></td>
	    <td><?php echo $stuff[2];?></td>
	    <td><?php echo sprintf("%08.0f",decbin(ord($stuff[0])));?></td>
	</tr>    
    <?php
    $t++;
    endforeach;
    ?>
    </table>    </td></tr></table>
<?php 
$inhalt = ob_get_contents();
ob_end_clean();
endif;
$form = ob_get_contents();
ob_end_clean();
echo $form;
if(count($daten)>1) echo $inhalt;

?>