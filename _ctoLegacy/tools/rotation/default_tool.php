<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_encrypt=JTEXT::_('ENCRYPT');
$lang_decrypt=JTEXT::_('DECRYPT');
$lang_cleanspace=JTEXT::_('CLEANSPACE');
$default_text=JTEXT::_('DEFAULTTEXT');
$lang_blocksize=JTEXT::_('BLOCKSIZE');
$lang_run=JTEXT::_('RUN');

//********
echo "
<form id='CTORotationForm1' name='CTORotationForm1' onSubmit='return false;'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTORotationScripts.rotationCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTORotationScripts.rotationCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTORotationScripts.rotationCrypt(\"decode\");'/></td><td>$lang_decrypt</td>
      		</tr>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td></td>
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
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' wrap='hard' onkeyup='CTORotationScripts.rotationCrypt(\"decode\");'></textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      	<table>
      		<tr>
      			<td colspan='2'></td>
      		</tr>
      		<tr>
      			<td></td>

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
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>Rotation: <SELECT NAME='rotation' class='ctoformcss-default-button' id='rotation' onchange='CTORotationScripts.rotationCrypt(false);'>
<OPTION value='90'>90°</OPTION>
<OPTION value='180'>180°</OPTION>
<OPTION value='270'>270°</OPTION>
		</SELECT>
&nbsp;&nbsp;&nbsp;&nbsp;".$lang_blocksize.": 	<input name='blocksize' type='text' class='ctoformcss-txtinput-style ctoformcss-twosign-input-size' id='blocksize' value='5' onkeyup='CTORotationScripts.rotationCrypt(false);'/>	

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
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTORotationScripts.rotationCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTORotationScripts = new CTORotationGuiAccess();
CTORotationScripts.rotationCrypt(\"encode\");
//-->
</script>
";