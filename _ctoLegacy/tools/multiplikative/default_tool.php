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

$default_text=JTEXT::_('DEFAULTTEXT');
$lang_sings=JTEXT::_('SIGNS');
$lang_run=JTEXT::_('RUN');

//********
echo "
<div id='vertical_status' style='visibility: hidden;'>open</div>
<form id='CTOMultiplikativeForm1' name='CTOMultiplikativeForm1' action='#'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' cols='63' rows='5' onkeypress='var keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
CTOMultiplikativeScripts.keyPress(keyCode, \"encode\");' onkeyup='CTOMultiplikativeScripts.multiplikativeCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' type='radio' value='encode' checked='checked' onclick='CTOMultiplikativeScripts.multiplikativeCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' value='decode' onclick='CTOMultiplikativeScripts.multiplikativeCrypt(false)'/></td><td>$lang_decrypt</td>
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
CTOMultiplikativeScripts.keyPress(keyCode, \"decode\");' onkeyup='CTOMultiplikativeScripts.multiplikativeCrypt(\"decode\");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='casesensitiv' type='checkbox' checked='checked' id='casesensitiv' onclick='CTOMultiplikativeScripts.multiplikativeCrypt(false)'/></td><td>$lang_casesensitive</td>
      		</tr>
      		<tr>
      			<td><input name='signs' type='checkbox' id='signs' checked='checked' onclick='CTOMultiplikativeScripts.multiplikativeCrypt(false)'/></td><td>$lang_signstext</td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='clean' id='clean' onclick='CTOMultiplikativeScripts.multiplikativeCrypt(false)'/></td><td>$lang_cleanspace</td>
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
      				<td><input name='uppercase' type='checkbox' id='uppercase' checked='checked' onclick='CTOMultiplikativeScripts.setAlphabet(1);'/></td> <td>Gro&szlig;buchstaben</td>
      			</tr>
      			<tr>
      				<td><input name='blanks' type='checkbox' id='blanks' onclick='CTOMultiplikativeScripts.setAlphabet(2);'/></td> <td>Leerzeichen</td>
      			</tr>
      			<tr>
      				<td><input name='digits' type='checkbox' id='digits' onclick='CTOMultiplikativeScripts.setAlphabet(3);'/></td> <td>Ziffern</td>
      			</tr>
      			<tr>
      				<td><input name='punctuationmarks' type='checkbox' id='punctuationmarks' onclick='CTOMultiplikativeScripts.setAlphabet(4);'/></td> <td>Satzzeichen</td>
      			</tr>
      			<tr>
      				<td><input name='lowercase' type='checkbox' checked='checked' id='lowercase' onclick='CTOMultiplikativeScripts.setAlphabet(5);'/></td> <td>Kleinbuchstaben</td>
      			</tr>
      			<tr>
      				<td><input name='umlauts' type='checkbox' id='umlauts' onclick='CTOMultiplikativeScripts.setAlphabet(6);'/></td> <td>Umlaute</td>
      			</tr>
      			</table>
      	</div>


      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_plaintextabc&nbsp;&nbsp;&nbsp;&nbsp;
      <input type='button' class='ctoformcss-default-button-l' name='v_toggle' id='v_toggle' value='$lang_alphabet' onclick='CTOMultiplikativeScripts.ChangeParseAlphabetText();'>&nbsp;
      <input name='alphalength' type='text' class='ctoformcss-default-alphabet-length-output-style' id='alphalength' size='1' maxlength='2' onkeyup='CTOMultiplikativeScripts.checkKey();' readonly='true'/> $lang_sings


      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>
        <div id='plaintextabc' class='ctoformcss-txtsyncoutput-style ctoformcss-multiplikative-alphabet-output-size' value=''/>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</div>
      </label></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>
        <div id='ciphertextabc' class='ctoformcss-txtsyncoutput-style ctoformcss-multiplikative-alphabet-output-size' value=''/>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</div>
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
      <div id='keys'>
                     <select name='key' id='key' class='ctoformcss-default-button-m' onclick='CTOMultiplikativeScripts.parseAlphabet();'>
 				     <option value='3'>3</option>
                     <option value='5'>5</option>
                     </select>
      </div>
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
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOMultiplikativeScripts.multiplikativeCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOMultiplikativeScripts.setAlphabet(1);
CTOMultiplikativeScripts.setAlphabet(5);
//CTOMultiplikativeScripts.multiplikativeCrypt(false); //Encrypt default text
//-->
</script>
";
?>