<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_railfence=JTEXT::_('RAILFENCE');
$lang_plaintextabc=JTEXT::_('PLAINTEXT-ABC');
$lang_ciphertextabc=JTEXT::_('CIPHERTEXT-ABC');
$lang_key=JTEXT::_('KEY');
$lang_offset=JTEXT::_('OFFSET');
$lang_encrypt=JTEXT::_('ENCRYPT');
$lang_decrypt=JTEXT::_('DECRYPT');
$lang_signstext=JTEXT::_('SIGNSTEXT');
$lang_cleanspace=JTEXT::_('CLEANSPACE');
$lang_alphabet=JTEXT::_('ALPHABET');
$lang_uppercase=JTEXT::_('UPPERCASE');
$lang_casesensitive=JTEXT::_('CASESENSITIVE');

$lang_alpha_uppercase=JTEXT::_('ALPHA_UPPERCASE');
$lang_alpha_blanks=JTEXT::_('ALPHA_BLANKS');
$lang_alpha_digits=JTEXT::_('ALPHA_DIGITS');
$lang_alpha_puctuationmarks=JTEXT::_('ALPHA_PUNCTUATIONMARKS');
$lang_alpha_lowercase=JTEXT::_('ALPHA_LOWERCASE');
$lang_alpha_umlauts=JTEXT::_('ALPHA_UMLAUTS');

$default_text=JTEXT::_('DEFAULTTEXT');
$lang_sings=JTEXT::_('SIGNS');
$lang_run=JTEXT::_('RUN');

//********
echo "
<div id='vertical_status' style='visibility: hidden;'>open</div>
<form id='CTOJaegerForm1' name='CTOJaegerForm1' action='#'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' cols='63' rows='5' onkeyup='CTOJaegerScripts.jaegerCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' type='radio' value='encode' checked='checked' onclick='CTOJaegerScripts.jaegerCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' value='decode' onclick='CTOJaegerScripts.jaegerCrypt(false)'/></td><td>$lang_decrypt</td>
      		</tr>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		</table>
      	</div>
      </td>
    </tr>
    
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_railfence:</div>
        <textarea name='railfence' id='railfence' wrap='off' class='ctojaegercss-txtsyncoutput-style ctoformcss-default-input-size' cols='63' rows='5' wrap='none' readonly='true'></textarea>      </td>
      <td valign='left'>
      </td>
    </tr>
    
    
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td><div id='codtxtdesc'>$lang_ciphertext:</div>
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOJaegerScripts.jaegerCrypt(\"decode\");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		</table>
      	</div>

      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>

      


      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      <table>
      <tr>
      <td>
      $lang_key:
      <br>
      <input type='button' class='ctoformcss-default-button-s' name='keyvalue' id='plus' value='+' onclick='CTOJaegerScripts.increaseKey()'/>
      <input name='key' type='text' class='ctoformcss-txtinput' id='key' value='4' size='2' maxlength='2' onkeyup='CTOJaegerScripts.checkKey();'/>
      <input type='button' class='ctoformcss-default-button-s' name='keyvalue' id='minus' value='-' onclick='CTOJaegerScripts.decreaseKey()'/>
      </td>
      <td>&nbsp;</td>
      <td>
      $lang_offset:
      <br>
      <input type='button' class='ctoformcss-default-button-s' name='offsetvalue' id='plusoffset' value='+' onclick='CTOJaegerScripts.increaseOffset()'/>
      <input name='offset' type='text' class='ctoformcss-txtinput' id='offset' value='0' size='2' maxlength='2' onkeyup='CTOJaegerScripts.checkOffset();'/>
      <input type='button' class='ctoformcss-default-button-s' name='offsetvalue' id='minusoffset' value='-' onclick='CTOJaegerScripts.decreaseOffset()'/>
      </td>
      </tr>
      </table>
      </td>
    </tr>
    
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
    </tr>
    
    
    
        <tr>
      <td valign='top'></td>
      <td colspan='2'>
      <div class='mobilrun' id='mobilrun'>
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOJaegerScripts.jaegerCrypt(false);'></td>
      </div>
    </tr>

  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOJaegerScripts.jaegerCrypt(false); //Encrypt default text
//-->
</script>
";
?>