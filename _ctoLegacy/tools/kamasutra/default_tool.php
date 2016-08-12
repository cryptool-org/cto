<?php // no direct kamasutra

defined('_JEXEC') or die('Restricted kamasutra');


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

$default_text=JTEXT::_('DEFAULTTEXT');
$lang_run=JTEXT::_('RUN');
$lang_random=JTEXT::_('RANDOM');



//********
echo "
<div id='vertical_status' style='visibility: hidden;'>open</div>
<form id='CTOKamasutraForm1' name='CTOKamasutraForm1' onSubmit='return false;'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeypress='var keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
CTOKamasutraScripts.keyPress(keyCode, \"encode\");' onkeyup='CTOKamasutraScripts.kamasutraCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOKamasutraScripts.kamasutraCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOKamasutraScripts.kamasutraCrypt(false)'/></td><td>$lang_decrypt</td>
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
CTOKamasutraScripts.keyPress(keyCode, \"decode\");' onkeyup='CTOKamasutraScripts.kamasutraCrypt(\"decode\");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td></td>
      		</tr>
      		<tr>
      			<td><input name='signs' type='checkbox' id='signs' checked='checked' onclick='CTOKamasutraScripts.kamasutraCrypt(false)'/></td><td>$lang_signstext</td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='clean' id='clean' onclick='CTOKamasutraScripts.kamasutraCrypt(false)'/></td><td>$lang_cleanspace</td>
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
      <td colspan='2'><label>

      </label></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>$lang_key:</td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td>
        <input name='key' type='text' class='ctoformcss-txtinput-style ctoformcss-keylength-full' id='key' value='kjzqiglxubyfhvpnwreamscdot' onkeyup='CTOKamasutraScripts.checkKey();'/>
      </td>
      <td valign='left'>
      	&nbsp;<input type='button' class='ctoformcss-default-button-l' name='randomize' id='random_alpha' value='$lang_random' onclick='CTOKamasutraScripts.CreateAlphabet();'>
      </td>
      
      
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>
        <div id='plaintextabc' class='ctoformcss-txtsyncoutput-style ctoformcss-caesar-alphabet-output-size' value=''/>kjzqiglxubyfh</div>
      </label></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><label>
        <div id='ciphertextabc' class='ctoformcss-txtsyncoutput-style ctoformcss-caesar-alphabet-output-size' value=''/>vpnwreamscdot</div>
      </label></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
    <tr>
    </tr>
        <tr>
      <td valign='top'></td>
      <td colspan='2'>
      <div class='mobilrun' id='mobilrun'>
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOKamasutraScripts.kamasutraCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOKamasutraScripts.kamasutraCrypt(false); //Encrypt default text
//-->
</script>
";
?>