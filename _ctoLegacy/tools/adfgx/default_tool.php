<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JText::_('COM_CTO_ADFGX_PLAINTEXT');
$lang_ciphertext=JText::_('COM_CTO_ADFGX_CIPHERTEXT');
$lang_plaintextabc=JText::_('COM_CTO_ADFGX_PLAINTEXT-ABC');
$lang_ciphertextabc=JText::_('COM_CTO_ADFGX_CIPHERTEXT-ABC');
$lang_key=JText::_('COM_CTO_ADFGX_KEY');
$lang_encrypt=JText::_('COM_CTO_ADFGX_ENCRYPT');
$lang_decrypt=JText::_('COM_CTO_ADFGX_DECRYPT');
$lang_signstext=JText::_('COM_CTO_ADFGX_SIGNSTEXT');
$lang_cleanspace=JText::_('COM_CTO_ADFGX_CLEANSPACE');
$lang_alphabet=JText::_('COM_CTO_ADFGX_ALPHABET');
$lang_uppercase=JText::_('COM_CTO_ADFGX_UPPERCASE');

$lang_sings=JText::_('COM_CTO_ADFGX_SIGNS');

$lang_substitution=JText::_('COM_CTO_ADFGX_SUBSTITUTION');
$lang_substitution_options=JText::_('COM_CTO_ADFGX_SUBSTITUTION_OPTIONS');
$lang_accept=JText::_('COM_CTO_ADFGX_ACCEPT');
$lang_substitution_matrix=JText::_('COM_CTO_ADFGX_SUBSTITUTION_MATRIX');
$lang_random_matrix=JText::_('COM_CTO_ADFGX_RANDOM_MATRIX');
$lang_standard_matrix=JText::_('COM_CTO_ADFGX_STANDARD_MATRIX');
$lang_specify_matrix=JText::_('COM_CTO_ADFGX_SPECIFY_MATRIX');
$lang_columns=JText::_('COM_CTO_ADFGX_COLUMNS');


$lang_alpha_uppercase=JText::_('COM_CTO_ADFGX_ALPHA_UPPERCASE');
$lang_alpha_blanks=JText::_('COM_CTO_ADFGX_ALPHA_BLANKS');
$lang_alpha_digits=JText::_('COM_CTO_ADFGX_ALPHA_DIGITS');
$lang_alpha_puctuationmarks=JText::_('COM_CTO_ADFGX_ALPHA_PUNCTUATIONMARKS');
$lang_alpha_lowercase=JText::_('COM_CTO_ADFGX_ALPHA_LOWERCASE');
$lang_alpha_umlauts=JText::_('COM_CTO_ADFGX_ALPHA_UMLAUTS');
$lang_run=JText::_('COM_CTO_ADFGX_RUN');
$default_text=JText::_('COM_CTO_ADFGX_DEFAULTTEXT');

ob_start();
?>
<table>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><strong>A</strong></td>
    <td>&nbsp;</td>
    <td><strong>D</strong></td>
    <td>&nbsp;</td>
    <td><strong>F</strong></td>
    <td>&nbsp;</td>
    <td><strong>G</strong></td>
    <td>&nbsp;</td>
    <td><strong>X</strong></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><strong>A</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><label>
      <input name='AA' type='text' id='AA'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/>
    </label></td>
    <td>&nbsp;</td>
    <td><input name='AD' type='text' id='AD'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='AF' type='text' id='AF'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='AG' type='text' id='AG'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='AX' type='text' id='AX'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
  </tr>
  <tr>
    <td><strong>D</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><input name='DA' type='text' id='DA'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='DD' type='text' id='DD'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='DF' type='text' id='DF'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='DG' type='text' id='DG'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='DX' type='text' id='DX'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
  </tr>
  <tr>
    <td><strong>F</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><input name='FA' type='text' id='FA'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='FD' type='text' id='FD'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='FF' type='text' id='FF'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='FG' type='text' id='FG'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='FX' type='text' id='FX'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
  </tr>
  <tr>
    <td><strong>G</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><input name='GA' type='text' id='GA'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='GD' type='text' id='GD'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='GF' type='text' id='GF'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='GG' type='text' id='GG'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='GX' type='text' id='GX'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
  </tr>
  <tr>
    <td><strong>X</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><input name='XA' type='text' id='XA'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='XD' type='text' id='XD'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='XF' type='text' id='XF'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='XG' type='text' id='XG'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='XX' type='text' id='XX'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
  </tr>
</table>
<?php
$adf = ob_get_contents();
ob_end_clean();
?>
<div id='vertical_statusA' style='visibility: hidden;'>open</div>
<div id='vertical_statusB' style='visibility: hidden;'>open</div>
<form id='CTOAdfgxForm1' name='CTOAdfgxForm1'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
        <div id='orgtxtdesc'><?php echo $lang_plaintext?>:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOAdfgxScripts.adfgxCrypt("encode");' wrap='physical'><?php echo $default_text;?></textarea>
      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOAdfgxScripts.adfgxCrypt(false)'/></td><td><?php echo $lang_encrypt?></td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOAdfgxScripts.adfgxCrypt(false)'/></td><td><?php echo $lang_decrypt?></td>
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
      <div id='substitution' class='ctoformcss-border ctoformcss-substitution'>
      <table>
      <tr>
      	<td></td>
      	<td colspan='2'><strong><?php echo $lang_substitution_matrix?></strong></td>
      </tr>
      <tr>
      	<td></td>
      	<td><div id='matrix' class='ctoformcss-adfgx-matrix'><?php echo $adf?></div></td>
      	<td>
      		<p>&nbsp;<input type='button' class='ctoformcss-default-button-l' name='key1' value='<?php echo $lang_random_matrix?>' onclick='CTOAdfgxScripts.genRandomKeysquare();'></p>
      		&nbsp;<input type='button' class='ctoformcss-default-button-l' name='key2' value='<?php echo $lang_standard_matrix?>' onclick='CTOAdfgxScripts.genStandardKeysquare();'>
      	</td>

      </tr>
      <tr>
      	<td></td>
        <td colspan='2'></td>
      </tr>
      <tr>
      	<td></td>
      	<td colspan='2'><?php echo $lang_specify_matrix?></td>
      </tr>
      <tr>
      	<td></td>
      	<td colspan='2'><input name='mymatrix' type='text' class='ctoformcss-txtinput-style ctoformcss-adfgx-matrix-input-size' id='mymatrix' value='' maxlength='36' onkeyup='CTOAdfgxScripts.genMyKeysquare();'/>
      	</td>
      </tr>
      <tr>
      	<td></td>
      	<td colspan='2'>
      	</td>
      </tr>
      </table>



      <div>
      </td>
    </tr>


    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>

      <input type='button' class='ctoformcss-default-button-xl' name='v_toggleB' id='v_toggleB' value='<?php echo $lang_substitution_options?>' onclick='CTOAdfgxScripts.ChangeParseAlphabetTextB();'>

      </td>
    </tr>

    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'><?php echo $lang_substitution?></div>
        <textarea name='substitutiontxt' id='substitutiontxt' class='ctoformcss-txtoutput-style ctoformcss-default-input-size' wrap='hard' readonly='true' ></textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      	<table>
      		<tr>
      			<td colspan='2'></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='cleansubstitution' id='cleansubstitution' onclick='CTOAdfgxScripts.adfgxCrypt(false)' checked='true'/></td><td><?php echo $lang_cleanspace?></td>
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
      <td valign='top'>&nbsp;&nbsp;</td>
      <td><div id='codtxtdesc'><?php echo $lang_ciphertext?>:</div>
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOAdfgxScripts.adfgxCrypt("decode");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='clean' id='clean' onclick='CTOAdfgxScripts.adfgxCrypt(false)' checked='true'/></td><td><?php echo $lang_cleanspace?></td>
      		</tr>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		</table>
      	</div>
   

    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><?php echo $lang_key?>:</td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
        <input name='key' type='text' class='ctoformcss-txtinput-style ctoformcss-keylength-full' id='key' value='CODE' onkeyup='CTOAdfgxScripts.checkKey();'/>
        <div
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><?php echo $lang_columns?></td>
    </tr>
	<tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      <textarea name='columns' id='columns' class='ctoformcss-txtoutput-style ctoformcss-default-small' readonly='true' wrap='physical'></textarea>
      </td>
    </tr>
   
     <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      <div id='alphabet-options' class='ctoformcss-default-alphabet-options'>
      			<table>
      			<tr>
      				<td><input name='uppercase' type='checkbox' id='uppercase' checked='checked' onclick='CTOAdfgxScripts.setAlphabet(1);'/></td> <td><?php echo $lang_alpha_uppercase?></td>
      			</tr>
      			<tr>
      				<td><input name='blanks' type='checkbox' id='blanks' onclick='CTOAdfgxScripts.setAlphabet(2);'/></td> <td><?php echo $lang_alpha_blanks?></td>
      			</tr>
      			<tr>
      				<td><input name='digits' type='checkbox' id='digits' onclick='CTOAdfgxScripts.setAlphabet(3);'/></td> <td><?php echo $lang_alpha_digits?></td>
      			</tr>
      			<tr>
      				<td><input name='punctuationmarks' type='checkbox' id='punctuationmarks' onclick='CTOAdfgxScripts.setAlphabet(4);'/></td> <td><?php echo $lang_alpha_puctuationmarks?></td>
      			</tr>
      			<tr>
      				<td><input name='lowercase' type='checkbox' id='lowercase' onclick='CTOAdfgxScripts.setAlphabet(5);'/></td> <td><?php echo $lang_alpha_lowercase?></td>
      			</tr>
      			<tr>
      				<td><input name='umlauts' type='checkbox' id='umlauts' onclick='CTOAdfgxScripts.setAlphabet(6);'/></td> <td><?php echo $lang_alpha_umlauts?></td>
      			</tr>
      			</table>
      			<div id='plaintextabc' class='ctoformcss-default-alphabet-output-style'></div>
      	</div>
      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      <input type='button' class='ctoformcss-default-button-xl' name='v_toggleA' id='v_toggleA' value='<?php echo $lang_alphabet?>' onclick='CTOAdfgxScripts.ChangeParseAlphabetTextA();'>&nbsp;
      <input name='alphalength' type='text' class='ctoformcss-default-alphabet-length-output-style' id='alphalength' size='1' maxlength='2' readonly='true'/> <?php echo $lang_sings?>
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
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='<?php echo $lang_run?>' onclick='CTOAdfgxScripts.adfgxCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOAdfgxScripts.genKeysquare('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
CTOAdfgxScripts.setAlphabet(1);
CTOAdfgxScripts.adfgxCrypt(false); //Encrypt default text
//-->
</script>