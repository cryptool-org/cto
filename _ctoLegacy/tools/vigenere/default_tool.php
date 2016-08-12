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

$lang_sings=JTEXT::_('SIGNS');

$lang_alpha_uppercase=JTEXT::_('ALPHA_UPPERCASE');
$lang_alpha_blanks=JTEXT::_('ALPHA_BLANKS');
$lang_alpha_digits=JTEXT::_('ALPHA_DIGITS');
$lang_alpha_puctuationmarks=JTEXT::_('ALPHA_PUNCTUATIONMARKS');
$lang_alpha_lowercase=JTEXT::_('ALPHA_LOWERCASE');
$lang_alpha_umlauts=JTEXT::_('ALPHA_UMLAUTS');
$lang_run=JTEXT::_('RUN');
$default_text=JTEXT::_('DEFAULTTEXT');



//********
echo "
<div id='vertical_status' style='visibility: hidden;'>open</div>
<form id='CTOVigenereForm1' name='CTOVigenereForm1'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOVigenereScripts.vigenereCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOVigenereScripts.vigenereCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOVigenereScripts.vigenereCrypt(false)'/></td><td>$lang_decrypt</td>
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
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOVigenereScripts.vigenereCrypt(\"decode\");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='casesensitiv' type='checkbox' id='casesensitiv' checked='checked' onclick='CTOVigenereScripts.vigenereCrypt(false)'/></td><td>$lang_casesensitive</td>
      		</tr>
      		<tr>
      			<td><input name='signs' type='checkbox' id='signs' checked='checked' onclick='CTOVigenereScripts.vigenereCrypt(false)'/></td><td>$lang_signstext</td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='clean' id='clean' onclick='CTOVigenereScripts.vigenereCrypt(false)'/></td><td>$lang_cleanspace</td>
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
      				<td><input name='uppercase' type='checkbox' id='uppercase' checked='checked' onclick='CTOVigenereScripts.setAlphabet(1);'/></td> <td>$lang_alpha_uppercase</td>
      			</tr>
      			<tr>
      				<td><input name='blanks' type='checkbox' id='blanks' onclick='CTOVigenereScripts.setAlphabet(2);'/></td> <td>$lang_alpha_blanks</td>
      			</tr>
      			<tr>
      				<td><input name='digits' type='checkbox' id='digits' onclick='CTOVigenereScripts.setAlphabet(3);'/></td> <td>$lang_alpha_digits</td>
      			</tr>
      			<tr>
      				<td><input name='punctuationmarks' type='checkbox' id='punctuationmarks' onclick='CTOVigenereScripts.setAlphabet(4);'/></td> <td>$lang_alpha_puctuationmarks</td>
      			</tr>
      			<tr>
      				<td><input name='lowercase' checked='checked' type='checkbox' id='lowercase' onclick='CTOVigenereScripts.setAlphabet(5);'/></td> <td>$lang_alpha_lowercase</td>
      			</tr>
      			<tr>
      				<td><input name='umlauts' type='checkbox' id='umlauts' onclick='CTOVigenereScripts.setAlphabet(6);'/></td> <td>$lang_alpha_umlauts</td>
      			</tr>
      			</table>";
      			//<textarea name='plaintextabc' id='plaintextabc' class='ctoformcss-default-alphabet-output-style' wrap='hard' readonly='true'></textarea>
      			echo"<div id='plaintextabc' class='ctoformcss-default-alphabet-output-style'></div>
      	</div>
      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      <input type='button' class='ctoformcss-default-button-l' name='v_toggle' id='v_toggle' value='$lang_alphabet' onclick='CTOVigenereScripts.ChangeParseAlphabetText();'>&nbsp;
      <input name='alphalength' type='text' class='ctoformcss-default-alphabet-length-output-style' id='alphalength' size='1' maxlength='2' readonly='true'/> $lang_sings
      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>

      </label></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_key:</td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
        <input name='key' type='text' class='ctoformcss-txtinput-style ctoformcss-keylength-full' id='key' value='CODE' onkeyup='CTOVigenereScripts.checkKey();'/>
        <div
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
    </tr>
    <tr>
      <td valign='top'></td>
      <td colspan='2'>
      <div class='mobilrun' id='mobilrun'>
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOVigenereScripts.vigenereCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOVigenereScripts.setAlphabet(1);
CTOVigenereScripts.setAlphabet(5);
CTOVigenereScripts.vigenereCrypt(false); //Encrypt default text
//-->
</script>
";
?>