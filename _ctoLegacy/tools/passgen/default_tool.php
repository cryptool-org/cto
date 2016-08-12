<?php // no direct access

defined('_JEXEC') or die('Restricted access');


//Language Variables
$lang_ALLOWEDSIGNS=JTEXT::_('ALLOWEDSIGNS');
$lang_LOWERCASE=JTEXT::_('LOWERCASE');
$lang_UPPERCASE=JTEXT::_('UPPERCASE');
$lang_NUMBERS=JTEXT::_('NUMBERS');
$lang_SPECIAL=JTEXT::_('SPECIAL');
$lang_COUNT=JTEXT::_('COUNT');
$lang_LENGTH=JTEXT::_('LENGTH');
$lang_GENERATE=JTEXT::_('GENERATE');

//********
echo '
<table width="602" border="0">
  <tr>
    <td width="177"><div align="left">'.$lang_ALLOWEDSIGNS.'</div></td>
    <td width="309">&nbsp;</td>
  </tr>
  <tr>
    <td><strong>'.$lang_LOWERCASE.'</strong></td>
    <td><label>
      <input name="lowercase" type="checkbox" id="lowercase" checked="checked" onclick="CTOPassgenScripts.countAlpha();" />
    </label></td>
  </tr>
  <tr>
    <td><strong>'.$lang_UPPERCASE.'</strong></td>
    <td><label>
      <input name="uppercase" type="checkbox" id="uppercase" checked="checked" onclick="CTOPassgenScripts.countAlpha();"/>
    </label></td>
  </tr>
  <tr>
    <td><strong>'.$lang_NUMBERS.'</strong></td>
    <td><label>
      <input name="numbers" type="checkbox" id="numbers" checked="checked" onclick="CTOPassgenScripts.countAlpha();"/>
    </label></td>
  </tr>
  <tr>
    <td><strong>'.$lang_SPECIAL.'</strong></td>
    <td><label>
      <input name="special" type="checkbox" id="special" checked="checked" onclick="CTOPassgenScripts.countAlpha();"/>
    </label></td>
  </tr>
  <tr>
    <td colspan="2">'.$lang_COUNT.' &nbsp;&nbsp;<span id="counter"></span></td>
  </tr>
  <tr>
    <td>&nbsp; </td>
    <td>&nbsp; </td>
  </tr>
  <tr>
    <td><strong>'.$lang_LENGTH.'</strong></td>
    <td><label>
      <input type="text" name="length2" maxlength="3" value="16" id="length2" class="ctoformcss-txtinput-style  ctoformcss-twosign-input-size" />
    </label></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td valign="top"><label>

        <input type="button" name="create" id="create" value="'.$lang_GENERATE.'" class="ctoformcss-default-button-l" onclick="CTOPassgenScripts.createPass();" />

    </label></td>
    <td><textarea name="passoutput" id="passoutput" cols="40" rows="3" wrap="hard" class="ctoformcss-passgen-outputstyle"></textarea></td>
  </tr>
    <tr>
    <td><label>
    </label></td>
    <td></td>
  </tr>



</table>
<script language=\'JavaScript\'>
<!--
CTOPassgenScripts = new CTOPassgenGuiAccess();
CTOPassgenScripts.createPass();
//-->
</script>
';