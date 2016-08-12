<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_encrypt=JTEXT::_('ENCRYPT');
$lang_decrypt=JTEXT::_('DECRYPT');
$lang_cleanspace=JTEXT::_('CLEANSPACE');
$default_text=JTEXT::_('DEFAULTTEXT');
$lang_run=JTEXT::_('RUN');
//********
echo "
<form id='CTOBase64Form1' name='CTOBase64Form1'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOBase64Scripts.base64Crypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOBase64Scripts.base64Crypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOBase64Scripts.base64Crypt(\"decode\");'/></td><td>$lang_decrypt</td>
      		</tr>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='cleanorgtxt' id='cleanorgtxt' onclick='CTOBase64Scripts.base64Crypt(false)' checked='true'/></td><td>$lang_cleanspace</td>
      		</tr>



      		</table>
      	</div>
      </td>
    </tr>




<tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
</tr>



    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_ciphertext:</div>
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' wrap='hard' onkeyup='CTOBase64Scripts.base64Crypt(\"decode\");'></textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      	<table>
      		<tr>
      			<td colspan='2'></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='cleancodtxt' id='cleancodtxt' onclick='CTOBase64Scripts.base64Crypt(false)' checked='true'/></td><td>$lang_cleanspace</td>

      		</tr>
      	</table>
      	</div>
      </td>
    </tr>




    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'></td>
    </tr>
        <tr>
      <td valign='top'></td>
      <td colspan='2'>
      <div class='mobilrun' id='mobilrun'>
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOBase64Scripts.base64Crypt(false);'></td>
      </div>
    </tr>
    
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOBase64Scripts = new CTOBase64GuiAccess();
CTOBase64Scripts.base64Crypt(\"encode\");
//-->
</script>
";