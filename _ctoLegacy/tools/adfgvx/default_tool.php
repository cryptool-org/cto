<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JTEXT::_('COM_CTO_ADFGVX_PLAINTEXT');
$lang_ciphertext=JTEXT::_('COM_CTO_ADFGVX_CIPHERTEXT');
$lang_plaintextabc=JTEXT::_('COM_CTO_ADFGVX_PLAINTEXT-ABC');
$lang_ciphertextabc=JTEXT::_('COM_CTO_ADFGVX_CIPHERTEXT-ABC');
$lang_key=JTEXT::_('COM_CTO_ADFGVX_KEY');
$lang_encrypt=JTEXT::_('COM_CTO_ADFGVX_ENCRYPT');
$lang_decrypt=JTEXT::_('COM_CTO_ADFGVX_DECRYPT');
$lang_signstext=JTEXT::_('COM_CTO_ADFGVX_SIGNSTEXT');
$lang_cleanspace=JTEXT::_('COM_CTO_ADFGVX_CLEANSPACE');
$lang_alphabet=JTEXT::_('COM_CTO_ADFGVX_ALPHABET');
$lang_uppercase=JTEXT::_('COM_CTO_ADFGVX_UPPERCASE');

$lang_sings=JTEXT::_('COM_CTO_ADFGVX_SIGNS');

$lang_substitution=JTEXT::_('COM_CTO_ADFGVX_SUBSTITUTION');
$lang_substitution_options=JTEXT::_('COM_CTO_ADFGVX_SUBSTITUTION_OPTIONS');
$lang_accept=JTEXT::_('COM_CTO_ADFGVX_ACCEPT');
$lang_substitution_matrix=JTEXT::_('COM_CTO_ADFGVX_SUBSTITUTION_MATRIX');
$lang_random_matrix=JTEXT::_('COM_CTO_ADFGVX_RANDOM_MATRIX');
$lang_standard_matrix=JTEXT::_('COM_CTO_ADFGVX_STANDARD_MATRIX');
$lang_specify_matrix=JTEXT::_('COM_CTO_ADFGVX_SPECIFY_MATRIX');
$lang_columns=JTEXT::_('COM_CTO_ADFGVX_COLUMNS');


$lang_alpha_uppercase=JTEXT::_('COM_CTO_ADFGVX_ALPHA_UPPERCASE');
$lang_alpha_blanks=JTEXT::_('COM_CTO_ADFGVX_ALPHA_BLANKS');
$lang_alpha_digits=JTEXT::_('COM_CTO_ADFGVX_ALPHA_DIGITS');
$lang_alpha_puctuationmarks=JTEXT::_('COM_CTO_ADFGVX_ALPHA_PUNCTUATIONMARKS');
$lang_alpha_lowercase=JTEXT::_('COM_CTO_ADFGVX_ALPHA_LOWERCASE');
$lang_alpha_umlauts=JTEXT::_('COM_CTO_ADFGVX_ALPHA_UMLAUTS');
$lang_run=JTEXT::_('COM_CTO_ADFGVX_RUN');
$default_text=JTEXT::_('COM_CTO_ADFGVX_DEFAULTTEXT');

ob_start();
?>
<table class="table">
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
    <td><strong>V</strong></td>
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
    <td><input name='AV' type='text' id='AV'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
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
    <td><input name='DV' type='text' id='DV'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
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
    <td><input name='FV' type='text' id='FV'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
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
    <td><input name='GV' type='text' id='GV'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='GX' type='text' id='GX'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
  </tr>
  <tr>
    <td><strong>V</strong></td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><input name='VA' type='text' id='VA'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='VD' type='text' id='VD'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='VF' type='text' id='VF'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='VG' type='text' id='VG'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='VV' type='text' id='VV'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
    <td>&nbsp;</td>
    <td><input name='VX' type='text' id='VX'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
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
    <td><input name='XV' type='text' id='XV'  size='1' maxlength='1' class='ctoformcss-default-alphabet-length-output-style'/></td>
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
<form id='CTOAdfgvxForm1' name='CTOAdfgvxForm1' class="form-horizontal">
    <div class="form-group">

            <label for="orgtxt"><?php echo $lang_plaintext?></label>
            <textarea style="width:100%" name='orgtxt' id='orgtxt' onkeyup='CTOAdfgvxScripts.adfgvxCrypt("encode");' ><?php echo $default_text?></textarea>
            <label for="orgtxt"  class="checkbox-inline">
                <input name='code' id='code' type='checkbox' value='encode' checked='checked' onclick='CTOAdfgvxScripts.adfgvxCrypt(false)'/><?php echo $lang_encrypt?>
            </label>
        </div>
    </div>

    </div>

<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'><?php echo $lang_plaintext?>:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOAdfgvxScripts.adfgvxCrypt("encode");' wrap='physical'><?php echo $default_text?></textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOAdfgvxScripts.adfgvxCrypt(false)'/></td><td><?php echo $lang_encrypt?></td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOAdfgvxScripts.adfgvxCrypt(false)'/></td><td><?php echo $lang_decrypt?></td>
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
      	<td><div id='matrix' class='ctoformcss-adfgvx-matrix'><?php echo $adf?></div></td>
      	<td>
      		<p>
                <input type='button' class='ctoformcss-default-button-l' name='key1' value='<?php echo $lang_random_matrix?>' onclick='CTOAdfgvxScripts.genRandomKeysquare();'>
      		    <input type='button' class='ctoformcss-default-button-l' name='key2' value='<?php echo $lang_standard_matrix?>' onclick='CTOAdfgvxScripts.genStandardKeysquare();'>
            </p>
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
      	<td colspan='2'><input name='mymatrix' type='text' class='ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size' id='mymatrix' value='' maxlength='36' onkeyup='CTOAdfgvxScripts.genMyKeysquare();'/>
      	</td>
      </tr>
      <tr>
      	<td></td>
      	<td colspan='2'>
      	</td>
      </tr>
      </table>



      </div>
      </td>
    </tr>


    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>

      <input type='button' class='ctoformcss-default-button-xl' name='v_toggleB' id='v_toggleB' value='<?php echo $lang_substitution_options?>' onclick='CTOAdfgvxScripts.ChangeParseAlphabetTextB();'>

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
      			<td><input type='checkbox' name='cleansubstitution' id='cleansubstitution' onclick='CTOAdfgvxScripts.adfgvxCrypt(false)' checked='true'/></td><td><?php echo $lang_cleanspace?></td>
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
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOAdfgvxScripts.adfgvxCrypt("decode");' wrap='physical'></textarea>      </td>
      <td valign='left'>
      	<div id='options2' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='clean' id='clean' onclick='CTOAdfgvxScripts.adfgvxCrypt(false)' checked='true'/></td><td><?php echo $lang_cleanspace?></td>
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
        <input name='key' type='text' class='ctoformcss-txtinput-style ctoformcss-keylength-full' id='key' value='CODE' onkeyup='CTOAdfgvxScripts.checkKey();'/>
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
      				<td><input name='uppercase' type='checkbox' id='uppercase' checked='checked' onclick='CTOAdfgvxScripts.setAlphabet(1);'/></td> <td><?php echo $lang_alpha_uppercase?></td>
      			</tr>
      			<tr>
      				<td><input name='blanks' type='checkbox' id='blanks' onclick='CTOAdfgvxScripts.setAlphabet(2);'/></td> <td><?php echo $lang_alpha_blanks?></td>
      			</tr>
      			<tr>
      				<td><input name='digits' type='checkbox' id='digits' onclick='CTOAdfgvxScripts.setAlphabet(3);'/></td> <td><?php echo $lang_alpha_digits?></td>
      			</tr>
      			<tr>
      				<td><input name='punctuationmarks' type='checkbox' id='punctuationmarks' onclick='CTOAdfgvxScripts.setAlphabet(4);'/></td> <td><?php echo $lang_alpha_puctuationmarks?></td>
      			</tr>
      			<tr>
      				<td><input name='lowercase' type='checkbox' id='lowercase' onclick='CTOAdfgvxScripts.setAlphabet(5);'/></td> <td><?php echo $lang_alpha_lowercase?></td>
      			</tr>
      			<tr>
      				<td><input name='umlauts' type='checkbox' id='umlauts' onclick='CTOAdfgvxScripts.setAlphabet(6);'/></td> <td><?php echo $lang_alpha_umlauts?></td>
      			</tr>
      			</table>
      			<div id='plaintextabc' class='ctoformcss-default-alphabet-output-style'></div>
      	</div>
      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      <input type='button' class='ctoformcss-default-button-xl' name='v_toggleA' id='v_toggleA' value='<?php echo $lang_alphabet?>' onclick='CTOAdfgvxScripts.ChangeParseAlphabetTextA();'>&nbsp;
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
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='<?php echo $lang_run?>' onclick='CTOAdfgvxScripts.adfgvxCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
jQuery(document).ready(function(){
    CTOAdfgvxScripts.genKeysquare('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    CTOAdfgvxScripts.setAlphabet(1);
    CTOAdfgvxScripts.adfgvxCrypt(false); //Encrypt default text
});
//-->
</script>