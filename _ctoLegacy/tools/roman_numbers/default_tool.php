<?php
// no direct access
defined('_JEXEC') or die('Restricted access');
$this->max_roman_number = 4000;
//require_once (JPATH_COMPONENT . DS . 'tools' . DS . 'jsjtext.php');
JText::script_sprintf('COM_CTO_ROMAN_ENTER_VALID_ROMAN_NUMBER', $this->max_roman_number-1);
JText::script_sprintf('COM_CTO_ROMAN_ENTER_VALID_NUMBER', $this->max_roman_number-1);
//JText::load();
$max_roman_number = $this->max_roman_number;
?>
<form id='CTOVorlageForm1' name='CTOVorlageForm1' action='#'>
<table>
  <tbody>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td>
       <div id='orgtxtdesc'><?php echo JText::_('COM_CTO_ROMAN_ROMAN_NUMBER');?>:</div>
        <textarea name='orgtxt' id='orgtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' cols='63' rows='5' onkeyup='CTORomanNumbersScripts.encrypt();' wrap='physical'>MCMLXXXIV</textarea>      </td>
      <td valign='left' id='orgtxtmsg'>
	  
      </td>
    </tr>
    <tr>
      <td valign='top'>&nbsp;&nbsp;</td>
      <td><div id='codtxtdesc'><?php echo JText::_('COM_CTO_ROMAN_DECIMAL');?>:</div>
        <textarea name='codtxt' id='codtxt' class='ctoformcss-txtinput-style ctoformcss-default-input-size' cols='63' rows='5' onkeyup='CTORomanNumbersScripts.decrypt();' wrap='physical'></textarea>      </td>
      <td valign='left' id='codtxtmsg'>
      </td>
    </tr>

    <tr>
      <td valign='top'>&nbsp;</td>
      <td colspan='2'>&nbsp;</td>
    </tr>
  </tbody>
</table>
</form>
<script language='JavaScript'>
<!--
CTORomanNumbersScripts.setMaxNumber(<?php echo $max_roman_number?>);
CTORomanNumbersScripts.encrypt(); //Encrypt default text
//-->
</script>