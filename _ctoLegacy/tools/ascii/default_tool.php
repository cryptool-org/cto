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
<form id='CTOAsciiForm1' name='CTOAsciiForm1'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOAsciiScripts.asciiCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOAsciiScripts.asciiCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOAsciiScripts.asciiCrypt(\"decode\");'/></td><td>$lang_decrypt</td>
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
      <td colspan='2'>&nbsp;</td>
</tr>



    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_ciphertext</div>
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' wrap='hard' onkeyup='CTOAsciiScripts.asciiCrypt(\"decode\");'></textarea>      </td>
      <td valign='left'>

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
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOAsciiScripts.asciiCrypt(false);'></td>
      </div>
    </tr>
    
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOAsciiScripts = new CTOAsciiGuiAccess();
CTOAsciiScripts.asciiCrypt(\"encode\");
//-->
</script>
";