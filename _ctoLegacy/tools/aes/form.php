<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_encrypt=JTEXT::_('ENCRYPT');
$lang_decrypt=JTEXT::_('DECRYPT');
$lang_show=JTEXT::_('SHOW');
$lang_hide=JTEXT::_('HIDE');
$lang_encoding=JTEXT::_('ENCODING');
$lang_mode=JTEXT::_('MODE');
$default_text=JTEXT::_('DEFAULTTEXT');
$lang_hex=JTEXT::_('HEX');
$lang_cod=JTEXT::_('COD');

//********
echo "
<form id='CTOAesForm1' name='CTOAesForm1'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td colspan='2'>
       <div id='orgtxtdesc'>$lang_plaintext:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-aes-input-size' wrap='physical'>$default_text</textarea>      </td>
    </tr>




<tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
</tr>



    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td colspan='2'>
       <div id='ciphertxtdesc'>$lang_ciphertext:</div>
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-aes-input-size' wrap='hard'></textarea>      </td>
    </tr>

        <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'></td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>
      	<table>

      	<tr>
      		<td>$lang_mode:</td>
      		<td>
      		    <select name='modus' id='modus' class='ctoformcss-default-button-l'>
 				     <option value='CBC'>CBC</option>
                     <option value='ECB'>ECB</option>
                </select>
            </td>
      	<tr>


      	<tr>
      		<td>$lang_encoding:</td>
      		<td><select name='encoding' id='encoding' class='ctoformcss-default-button-l'>
 				     <option value='1'>$lang_cod</option>
             <option value='2'>$lang_hex</option>
             <option value='3'>Base64</option>
                </select>
        </td>
      	<tr>



      	<tr>
      		<td>$lang_key Key:</td>
      		<td>
      		<input name='key' type='text' class='ctoformcss-txtinput-style ctoformcss-aes-keylength' id='key' maxlength='32' value='Password'/ onkeyup=''>
      		</td>
      	<tr>
      	<tr>
      		<td>&nbsp;</td>
      		<td>&nbsp;</td>
      	<tr>
      	<tr>
      		<td>&nbsp;</td>
      		<td>
      		<input type='button' name='encrypt' id='encrypt' value='".$lang_encrypt."' class='ctoformcss-default-button-m' onclick='Encrypt_text();'>
      		&nbsp;&nbsp;
      		<input type='button' name='decrypt' id='decrypt' value='".$lang_decrypt."' class='ctoformcss-default-button-m' onclick='Decrypt_text();'>
      		</td>
      	<tr>

        </table>

      </td>
    </tr>

    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'></td>
    </tr>
  </tbody>
</table>

<b>
<script>
if (navigator.appName.indexOf(\"Internet Explorer\") == -1) Encrypt_text();
</script>
</p>
</form>
";