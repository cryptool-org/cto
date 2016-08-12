<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_encrypt=JTEXT::_('ENCRYPT');
$lang_decrypt=JTEXT::_('DECRYPT');
$lang_directplay=JTEXT::_('DIRECTPLAY');
$default_text=JTEXT::_('DEFAULTTEXT');
$lang_speed=JTEXT::_('SPEED');
$lang_sound=JTEXT::_('SOUND');
$lang_sound2=JTEXT::_('SOUNDSTOP');
$lang_run=JTEXT::_('RUN');

global $mypath;

//********
echo "
<form id='CTOMorsecodeForm1' name='CTOMorsecodeForm1' onSubmit='return false;'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOMorsecodeScripts.morsecodeCrypt(\"encode\");' wrap='physical' onkeypress='var keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
CTOMorsecodeScripts.keyPress(keyCode);'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOMorsecodeScripts.morsecodeCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOMorsecodeScripts.morsecodeCrypt(\"decode\");'/></td><td>$lang_decrypt</td>
      		</tr>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='directplay' id='directplay' onclick='' checked='true'/></td><td>$lang_directplay</td>
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
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' wrap='hard' onkeyup='CTOMorsecodeScripts.morsecodeCrypt(\"decode\");' onkeyup='CTOMorsecodeScripts.morsecodeCrypt(\"encode\");' wrap='physical' onkeypress='var keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
CTOMorsecodeScripts.keyPress2(keyCode);'></textarea>      </td>
      <td valign='left'>
      <div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='directplay2' id='directplay2' onclick='' checked='true'/></td><td>$lang_directplay</td>
      		</tr>



      		</table>
      	</div>
      </td>
    </tr>



    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      
      <input type='button' class='ctoformcss-default-button-l' name='playcode' id='playcode' value='$lang_sound' onclick='CTOMorsecodeScripts.morseall();'/>
      
      
      &nbsp;&nbsp;<input name='speed' type='text' class='ctoformcss-txtinput-style ctoformcss-morsecode-speed' id='speed' value='60' onkeyup='CTOMorsecodeScripts.checkSpeed();'/>&nbsp;$lang_speed.
      <input type='hidden' name='b1' id='b1' value='$lang_sound'/>
      <input type='hidden' name='b2' id='b2' value='$lang_sound2'/>
      
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
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOMorsecodeScripts.morsecodeCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOMorsecodeScripts = new CTOMorsecodeGuiAccess();
CTOMorsecodeScripts.morsecodeCrypt(\"encode\");
//-->
</script>
<applet
				CODEBASE= '$mypath'
				code	  = 'Morse.class'
        name    = 'Morse'
				width	  = '10'
				height	= '10'
				>
</applet>
";