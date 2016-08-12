<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_plaintextabc=JTEXT::_('PLAINTEXT-ABC');
$lang_ciphertextabc=JTEXT::_('CIPHERTEXT-ABC');
$lang_key=JTEXT::_('KEY');
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
<form id='CTOCaesarForm1' name='CTOCaesarForm1' action='#'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' cols='63' rows='5' onkeypress='var keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
CTOCaesarScripts.keyPress(keyCode, \"encode\");' onkeyup='CTOCaesarScripts.caesarCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' type='radio' value='encode' checked='checked' onclick='CTOCaesarScripts.caesarCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' value='decode' onclick='CTOCaesarScripts.caesarCrypt(false)'/></td><td>$lang_decrypt</td>
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
      <td><div id='codtxtdesc'>$lang_ciphertext:</div>
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeypress='var keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
CTOCaesarScripts.keyPress(keyCode, \"decode\");' onkeyup='CTOCaesarScripts.caesarCrypt(\"decode\");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='casesensitiv' type='checkbox' checked='checked' id='casesensitiv' onclick='CTOCaesarScripts.caesarCrypt(false)'/></td><td>$lang_casesensitive</td>
      		</tr>
      		<tr>
      			<td><input name='signs' type='checkbox' id='signs' checked='checked' onclick='CTOCaesarScripts.caesarCrypt(false)'/></td><td>$lang_signstext</td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='clean' id='clean' onclick='CTOCaesarScripts.caesarCrypt(false)'/></td><td>$lang_cleanspace</td>
      		</tr>
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

      <div id='alphabet-options' class='ctoformcss-default-alphabet-options'>
      			<table>
      			<tr>
      				<td><input name='uppercase' type='checkbox' id='uppercase' checked='checked' onclick='CTOCaesarScripts.setAlphabet(1);'/></td> <td>$lang_alpha_uppercase</td>
      			</tr>
      			<tr>
      				<td><input name='blanks' type='checkbox' id='blanks' onclick='CTOCaesarScripts.setAlphabet(2);'/></td> <td>$lang_alpha_blanks</td>
      			</tr>
      			<tr>
      				<td><input name='digits' type='checkbox' id='digits' onclick='CTOCaesarScripts.setAlphabet(3);'/></td> <td>$lang_alpha_digits</td>
      			</tr>
      			<tr>
      				<td><input name='punctuationmarks' type='checkbox' id='punctuationmarks' onclick='CTOCaesarScripts.setAlphabet(4);'/></td> <td>$lang_alpha_puctuationmarks</td>
      			</tr>
      			<tr>
      				<td><input name='lowercase' type='checkbox' checked='checked' id='lowercase' onclick='CTOCaesarScripts.setAlphabet(5);'/></td> <td>$lang_alpha_lowercase</td>
      			</tr>
      			<tr>
      				<td><input name='umlauts' type='checkbox' id='umlauts' onclick='CTOCaesarScripts.setAlphabet(6);'/></td> <td>$lang_alpha_umlauts</td>
      			</tr>
      			</table>
      	</div>


      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_plaintextabc&nbsp;&nbsp;&nbsp;&nbsp;
      <input type='button' class='ctoformcss-default-button-l' name='v_toggle' id='v_toggle' value='$lang_alphabet' onclick='CTOCaesarScripts.ChangeParseAlphabetText();'>&nbsp;
      <input name='alphalength' type='text' class='ctoformcss-default-alphabet-length-output-style' id='alphalength' size='1' maxlength='2' onkeyup='CTOCaesarScripts.checkKey();' readonly='true'/> $lang_sings


      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>
        <div id='plaintextabc' class='ctoformcss-txtsyncoutput-style ctoformcss-caesar-alphabet-output-size' value=''/>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</div>
      </label></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>
        <div id='ciphertextabc' class='ctoformcss-txtsyncoutput-style ctoformcss-caesar-alphabet-output-size' value=''/>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</div>
      </label></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_ciphertextabc</td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>

      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_key:</td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
        <input type='button' class='ctoformcss-default-button-s' name='keyvalue' id='plus' value='+' onclick='CTOCaesarScripts.increaseKey()'/>
        <input name='key' type='text' class='ctoformcss-txtinput' id='key' value='0' size='2' maxlength='2' onkeyup='CTOCaesarScripts.checkKey();'/>
        <input type='button' class='ctoformcss-default-button-s' name='keyvalue' id='minus' value='-' onclick='CTOCaesarScripts.decreaseKey()'/>
        <label>
        <input name='rot13' type='checkbox' id='rot13' onclick='CTOCaesarScripts.setAlphabet(7);'/>Rot-13 $lang_uppercase</label>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
    </tr>
    
    <tr>
      <td valign='top'></td>
      <td colspan='2'>
      <div class='mobilrun' id='mobilrun'>
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOCaesarScripts.caesarCrypt(false);'></td>
      </div>
    </tr>
    
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOCaesarScripts.setAlphabet(1);
CTOCaesarScripts.setAlphabet(5);
CTOCaesarScripts.caesarCrypt(false); //Encrypt default text
//-->
</script>
";
?>