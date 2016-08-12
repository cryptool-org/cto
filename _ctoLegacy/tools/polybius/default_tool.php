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

$lang_sings=JTEXT::_('SIGNS');

$lang_substitution=JTEXT::_('SUBSTITUTION');
$lang_substitution_options=JTEXT::_('SUBSTITUTION_OPTIONS');
$lang_accept=JTEXT::_('ACCEPT');
$lang_substitution_matrix=JTEXT::_('SUBSTITUTION_MATRIX');
$lang_random_matrix=JTEXT::_('RANDOM_MATRIX');
$lang_standard_matrix=JTEXT::_('STANDARD_MATRIX');
$lang_specify_matrix=JTEXT::_('SPECIFY_MATRIX');
$lang_columns=JTEXT::_('COLUMNS');


$lang_alpha_uppercase=JTEXT::_('ALPHA_UPPERCASE');
$lang_alpha_blanks=JTEXT::_('ALPHA_BLANKS');
$lang_alpha_digits=JTEXT::_('ALPHA_DIGITS');
$lang_alpha_puctuationmarks=JTEXT::_('ALPHA_PUNCTUATIONMARKS');
$lang_alpha_lowercase=JTEXT::_('ALPHA_LOWERCASE');
$lang_alpha_umlauts=JTEXT::_('ALPHA_UMLAUTS');

$default_text=JTEXT::_('DEFAULTTEXT');
$lang_run=JTEXT::_('RUN');

$adf="

<table>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><strong>1</strong></td>
    <td>&nbsp;</td>
    <td><strong>2</strong></td>
    <td>&nbsp;</td>
    <td><strong>3</strong></td>
    <td>&nbsp;</td>
    <td><strong>4</strong></td>
    <td>&nbsp;</td>
    <td><strong>5</strong></td>
    <td>&nbsp;</td>
    <td><strong>6</strong></td>
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
    <td><strong>1</strong></td>
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
    <td><strong>2</strong></td>
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
    <td><strong>3</strong></td>
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
    <td><strong>4</strong></td>
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
    <td><strong>5</strong></td>
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
    <td><strong>6</strong></td>
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

";




$adf5="

<table>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td><strong>1</strong></td>
    <td>&nbsp;</td>
    <td><strong>2</strong></td>
    <td>&nbsp;</td>
    <td><strong>3</strong></td>
    <td>&nbsp;</td>
    <td><strong>4</strong></td>
    <td>&nbsp;</td>
    <td><strong>5</strong></td>
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
    <td><strong>1</strong></td>
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
  </tr>
  <tr>
    <td><strong>2</strong></td>
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
  </tr>
  <tr>
    <td><strong>3</strong></td>
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
  </tr>
  <tr>
    <td><strong>4</strong></td>
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
  </tr>
  <tr>
    <td><strong>5</strong></td>
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
  </tr>
</table>

";

//********
echo "
<form id='CTOPolybiusForm1' name='CTOPolybiusForm1'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' onkeyup='CTOPolybiusScripts.polybiusCrypt(\"encode\");' wrap='physical'>$default_text</textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='code' id='code' type='radio' value='encode' checked='checked' onclick='CTOPolybiusScripts.polybiusCrypt(false)'/></td><td>$lang_encrypt</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='code' value='decode' onclick='CTOPolybiusScripts.polybiusCrypt(false)'/></td><td>$lang_decrypt</td>
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
      <td>
      <div id='substitution' class='ctoformcss-border ctoformcss-substitution'>
      <table>
      <tr>
      	<td></td>
      	<td colspan='2'><strong>$lang_substitution_matrix</strong></td>
      </tr>
      <tr>
      	<td></td>
      	<td><div' id='matrix' class='ctoformcss-adfgvx-matrix'>$adf5</div></td>
      	<td>
      		<p>&nbsp;<input type='button' class='ctoformcss-default-button-l' name='key1' value='$lang_random_matrix' onclick='CTOPolybiusScripts.genRandomKeysquare();'></p>
      		&nbsp;<input type='button' class='ctoformcss-default-button-l' name='key2' value='$lang_standard_matrix' onclick='CTOPolybiusScripts.genStandardKeysquare();'>
      	</td>

      </tr>
      <tr>
      	<td></td>
        <td colspan='2'></td>
      </tr>
      <tr>
      	<td></td>
      	<td colspan='2'>$lang_specify_matrix</td>
      </tr>
      <tr>
      	<td></td>
      	<td colspan='2'><input name='mymatrix' type='text' class='ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size' id='mymatrix' value='' maxlength='36' onkeyup='CTOPolybiusScripts.genMyKeysquare();'/>
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
      <td>







      </td>
    </tr>


<tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>

      <input type='button' class='ctoformcss-default-button-xl' name='v_toggleB' id='v_toggleB' value='$lang_substitution_options' onclick='CTOPolybiusScripts.ChangeParseAlphabetTextB();'>

      </td>
    </tr>



    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'>$lang_substitution</div>
        <textarea name='substitutiontxt' id='substitutiontxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' wrap='hard' onkeyup='CTOPolybiusScripts.polybiusCrypt(\"decode\");'></textarea>      </td>
      <td valign='left'>
      	<div id='options' class='ctoformcss-default-options'>
      	<table>
      		<tr>
      			<td colspan='2'></td>
      		</tr>
      		<tr>
      			<td><input type='checkbox' name='cleansubstitution' id='cleansubstitution' onclick='CTOPolybiusScripts.polybiusCrypt(false)' checked='true'/></td><td>$lang_cleanspace</td>

      		</tr>
      	</table>
      	</div>
      </td>
    </tr>




    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'><div id='vertical_statusA' style='visibility: hidden;'>open</div>
<div id='vertical_statusB' style='visibility: hidden;'>open</div></td>
    </tr>
    
    <tr>
      <td valign='top'></td>
      <td colspan='2'>
      <div class='mobilrun' id='mobilrun'>
      <input type='button' class='ctoformcss-default-button-m' name='run' id='run' value='$lang_run' onclick='CTOPolybiusScripts.polybiusCrypt(false);'></td>
      </div>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTOPolybiusScripts.genKeysquare('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
CTOPolybiusScripts.polybiusCrypt(\"encode\");
//-->
</script>
";

$tmp="      <div id='matrixsize' class='ctoformcss-default-options'>
      Matrix Größe
      		<table>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		<tr>
      			<td><input name='five' id='matrixsizevalue' type='radio' value='5'  onclick='CTOPolybiusScripts.polybiusCrypt(false)'/></td><td>5*5</td>
      		</tr>
      		<tr>
      			<td><input type='radio' name='code' id='matrixsizevalue' value='6' checked='checked' onclick='CTOPolybiusScripts.polybiusCrypt(false)'/></td><td>6*6</td>
      		</tr>
      		<tr>
      			<td></td><td></td>
      		</tr>
      		</table>
      	</div>";

?>