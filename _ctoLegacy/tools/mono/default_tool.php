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
$default_text=strtolower($default_text);
$lang_sings=JTEXT::_('SIGNS');
$lang_run=JTEXT::_('RUN');

//********
echo "
<div id='vertical_status' style='visibility: hidden;'>open</div>
<form id='CTOMonoForm1' name='CTOMonoForm1' action='#'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' cols='63' rows='5' onkeyup='CTOMonoScripts.monoCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' type='radio' value='encode' checked='checked' onclick='CTOMonoScripts.monoCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' value='decode' onclick='CTOMonoScripts.monoCrypt(false)'/></td><td>$lang_decrypt</td>
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
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOMonoScripts.monoCrypt(\"decode\");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='casesensitiv' type='checkbox' checked='checked' id='casesensitiv' onclick='CTOMonoScripts.monoCrypt(false)'/></td><td>$lang_casesensitive</td>
      		</tr>
      		<tr>
      			<td><input name='signs' type='checkbox' id='signs' checked='checked' onclick='CTOMonoScripts.monoCrypt(false)'/></td><td>$lang_signstext</td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='clean' id='clean' onclick='CTOMonoScripts.monoCrypt(false)'/></td><td>$lang_cleanspace</td>
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

      


      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_plaintextabc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input name='alphalength' type='text' class='ctoformcss-default-alphabet-length-output-style' id='alphalength' size='1' maxlength='2' readonly='true'/> $lang_sings


      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td><label>
      <textarea name='plaintextabc' id='plaintextabc' onkeyup='CTOMonoScripts.monoCrypt(\"none\");' class='ctomonocss-txtsyncinput-style'>abcdefghijklmnopqrstuvwxyz</textarea>
      </label></td>
            <td valign='left'>
        &nbsp;<input name='atbash' type='checkbox' id='atbash' onclick='CTOMonoScripts.Atbash();'/>&nbsp;Atbash
      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>
      <textarea name='ciphertextabc' id='ciphertextabc' onkeyup='CTOMonoScripts.monoCrypt(\"none\");' class='ctomonocss-txtsyncinput-style'>qwertz*/&pas§$%hjklyxcvbnm</textarea>
      </label></td>

    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_ciphertextabc
      <input name='alphaBlength' type='text' class='ctoformcss-default-alphabet-length-output-style' id='alphaBlength' size='1' maxlength='2' readonly='true'/> $lang_sings
      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>

      </td>
      
      
              <tr>
      <td valign='top'></td>
      <td colspan='2'>
      <div class='mobilrun' id='mobilrun'>
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOMonoScripts.monoCrypt(false);'></td>
      </div>
    </tr>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOMonoScripts.monoCrypt(false); //Encrypt default text
//-->
</script>
";
?>