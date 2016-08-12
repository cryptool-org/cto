<?php
defined('_JEXEC') or die('Restricted access');
$doc = JFactory::getDocument();
$mypath = JURI::base(true) . "components/com_cto/tools/".$this->tool->template;
$doc->addCustomTag('<!--[if lt IE 7]><link href="'.$mypath.'css/ie.css" rel="stylesheet" type="text/css" /><![endif]-->');


//Language Variables
$lang_TESTPW=JTEXT::_('TESTPW');
$lang_MINIMUM=JTEXT::_('MINIMUM');
$lang_PASSWORD=JTEXT::_('PASSWORD');
$lang_HIDE=JTEXT::_('HIDE');
$lang_SCORE=JTEXT::_('SCORE');
$lang_COMPL=JTEXT::_('COMPL');
$lang_ADDITIONS=JTEXT::_('ADDITIONS');
$lang_TYPE=JTEXT::_('TYPE');
$lang_RATE=JTEXT::_('RATE');
$lang_COUNT=JTEXT::_('COUNT');
$lang_BONUS=JTEXT::_('BONUS');
$lang_DEDUCTIONS=JTEXT::_('DEDUCTIONS');
$lang_LEGEND=JTEXT::_('LEGEND');
$lang_EXCEPT=JTEXT::_('EXCEPT');
$lang_SUFFI=JTEXT::_('SUFFI');
$lang_WARNING=JTEXT::_('WARNING');
$lang_FAIL=JTEXT::_('FAIL');
$lang_EXCEPTTEXT=JTEXT::_('EXCEPTTEXT');
$lang_SUFFITEXT=JTEXT::_('SUFFITEXT');
$lang_WARNINGTEXT=JTEXT::_('WARNINGTEXT');
$lang_FAILTEXT=JTEXT::_('FAILTEXT');
$lang_CHARNUM=JTEXT::_('CHARNUM');
$lang_UPPERCASE=JTEXT::_('UPPERCASE');
$lang_LOWERCASE=JTEXT::_('LOWERCASE');
$lang_NUMBERS=JTEXT::_('NUMBERS');
$lang_SYMBOLS=JTEXT::_('SYMBOLS');
$lang_MIDDLE=JTEXT::_('MIDDLE');
$lang_REQUIRE=JTEXT::_('REQUIRE');
$lang_LETTERSONLY=JTEXT::_('LETTERSONLY');
$lang_NUMBERSONLY=JTEXT::_('NUMBERSONLY');
$lang_REPEAT=JTEXT::_('REPEAT');
$lang_CONSUPPER=JTEXT::_('CONSUPPER');
$lang_CONSLOWER=JTEXT::_('CONSLOWER');
$lang_CONSNUM=JTEXT::_('CONSNUM');
$lang_SEQLET=JTEXT::_('SEQLET');
$lang_SQENUM=JTEXT::_('SQENUM');
$lang_FLAT=JTEXT::_('FLAT');
$lang_INCR=JTEXT::_('INCR');
$lang_COND=JTEXT::_('COND');
$lang_LEN=JTEXT::_('LEN');
$lang_MINIMUM8=JTEXT::_('MINIMUM8');
$lang_CONTAINS=JTEXT::_('CONTAINS');
$lang_run=JTEXT::_('RUN');

echo '
	<div id="contenti">
        <form id="formPassword" name="formPassword">
            <table id="tablePwdCheck" cellpadding="5" cellspacing="1" border="0">
            	<tr>
                	<th colspan="2" class="txtCenter">'.$lang_TESTPW.'</th>
                    <th class="txtCenter">'.$lang_MINIMUM.'</th>
               </tr>
               <tr>
                    <th><span id="langu">'.$lang_PASSWORD.'</span>:</th>
                    <td>
                    	<input type="password" id="passwordPwd" name="passwordPwd" maxlength="16" autocomplete="off" onkeyup="chkPass(this.value);" />
						<input type="text" id="passwordTxt" name="passwordTxt" maxlength="16" autocomplete="off" onkeyup="chkPass(this.value);" class="hide" />
                    </td>
                    <td rowspan="4">
                        <ul id="minimum">
                            <li>'.$lang_MINIMUM8.'</li>
                            <li>'.$lang_CONTAINS.':<br />
                                - '.$lang_UPPERCASE.'<br />
                                - '.$lang_LOWERCASE.'<br />
                                - '.$lang_NUMBERS.'<br />
                                - '.$lang_SYMBOLS.'<br />
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>'.$lang_HIDE.':</th>
                    <td><input type="checkbox" id="mask" name="mask" value="1" checked="checked" onclick="togPwdMask();" /></td>
                </tr>
                <tr>
                    <th>'.$lang_SCORE.':</th>
                    <td>
                        <div id="scorebarBorder">
                        <div id="score">0%</div>
                        <div id="scorebar">&nbsp;</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>'.$lang_COMPL.':</th>
                    <td><div id="complexity">&nbsp;</div></td>
                </tr>
            </table>
            
            
      <div class="mobilrun" id="mobilrun">
      &nbsp;&nbsp;<input type="button" class="ctoformcss-default-button-m" name="run" id="run" value='.$lang_run.' onclick="chkPass(document.getElementById(\'passwordPwd\').value);">
      <br><p>
      </div>
 
            
            <table id="tablePwdStatus" cellpadding="5" cellspacing="1" border="0">
                <tr>
                    <th colspan="2">'.$lang_ADDITIONS.'</th>
                    <th class="txtCenter">'.$lang_RATE.'</th>
                    <th class="txtCenter">'.$lang_COUNT.'</th>
                    <th class="txtCenter">'.$lang_BONUS.'</th>
                </tr>
                <tr>
                    <td width="1%"><div id="div_nLength" class="fail">&nbsp;</div></td>
                    <td width="95%">'.$lang_CHARNUM.'</td>
                    <td width="1%" class="txtCenter italic">+(n*4)</td>
                    <td width="1%"><div id="nLength" class="box">&nbsp;</div></td>
                    <td width="1%"><div id="nLengthBonus" class="boxPlus">&nbsp;</div></td>
                </tr>
                <tr>
                    <td><div id="div_nAlphaUC" class="fail">&nbsp;</div></td>
                    <td>'.$lang_UPPERCASE.'</td>
                    <td nowrap="nowrap" class="txtCenter italic">+((len-n)*2)</td>
                   <td><div id="nAlphaUC" class="box">&nbsp;</div></td>
                    <td><div id="nAlphaUCBonus" class="boxPlus">&nbsp;</div></td>
                </tr>
                <tr>
                    <td><div id="div_nAlphaLC" class="fail">&nbsp;</div></td>
                    <td>'.$lang_LOWERCASE.'</td>
                    <td class="txtCenter italic">+((len-n)*2)</td>
                    <td><div id="nAlphaLC" class="box">&nbsp;</div></td>
                    <td><div id="nAlphaLCBonus" class="boxPlus">&nbsp;</div></td>
                </tr>
                <tr>
                    <td><div id="div_nNumber" class="fail">&nbsp;</div></td>
                    <td>'.$lang_NUMBERS.'</td>
                    <td class="txtCenter italic">+(n*4)</td>
                    <td><div id="nNumber" class="box">&nbsp;</div></td>
                    <td><div id="nNumberBonus" class="boxPlus">&nbsp;</div></td>
               </tr>
                <tr>
                    <td><div id="div_nSymbol" class="fail">&nbsp;</div></td>
                    <td>'.$lang_SYMBOLS.'</td>
                    <td class="txtCenter italic">+(n*6)</td>
                    <td><div id="nSymbol" class="box">&nbsp;</div></td>
                    <td><div id="nSymbolBonus" class="boxPlus">&nbsp;</div></td>
               </tr>
                <tr>
                    <td><div id="div_nMidChar" class="fail">&nbsp;</div></td>
                    <td>'.$lang_MIDDLE.'</td>
                    <td class="txtCenter italic">+(n*2)</td>
                    <td><div id="nMidChar" class="box">&nbsp;</div></td>
                    <td><div id="nMidCharBonus" class="boxPlus">&nbsp;</div></td>
               </tr>
                <tr>
                    <td><div id="div_nRequirements" class="fail">&nbsp;</div></td>
                    <td>'.$lang_REQUIRE.'</td>
                    <td class="txtCenter italic">+(n*2)</td>
                    <td><div id="nRequirements" class="box">&nbsp;</div></td>
                    <td><div id="nRequirementsBonus" class="boxPlus">&nbsp;</div></td>
               </tr>
                <tr>
                    <th colspan="5">'.$lang_DEDUCTIONS.'</th>
                </tr>
				<tr>
                    <td width="1%"><div id="div_nAlphasOnly" class="pass">&nbsp;</div></td>
                    <td width="95%">'.$lang_LETTERSONLY.'</td>
                    <td width="1%" class="txtCenter italic">-n</td>
                    <td width="1%"><div id="nAlphasOnly" class="box">&nbsp;</div></td>
                    <td width="1%"><div id="nAlphasOnlyBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
				<tr>
                    <td><div id="div_nNumbersOnly" class="pass">&nbsp;</div></td>
                    <td>'.$lang_NUMBERSONLY.'</td>
                    <td class="txtCenter italic">-n</td>
                    <td><div id="nNumbersOnly" class="box">&nbsp;</div></td>
                    <td><div id="nNumbersOnlyBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
				<tr>
                    <td><div id="div_nRepChar" class="pass">&nbsp;</div></td>
                    <td>'.$lang_REPEAT.'</td>
                    <td nowrap="nowrap" class="txtCenter italic">-(n*3)</td>
                    <td><div id="nRepChar" class="box">&nbsp;</div></td>
                    <td><div id="nRepCharBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
				<tr>
                    <td><div id="div_nConsecAlphaUC" class="pass">&nbsp;</div></td>
                    <td>'.$lang_CONSUPPER.'</td>
                    <td class="txtCenter italic">-(n*2)</td>
                    <td><div id="nConsecAlphaUC" class="box">&nbsp;</div></td>
                    <td><div id="nConsecAlphaUCBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
				<tr>
                    <td><div id="div_nConsecAlphaLC" class="pass">&nbsp;</div></td>
                    <td>'.$lang_CONSLOWER.'</td>
                    <td class="txtCenter italic">-(n*2)</td>
                    <td><div id="nConsecAlphaLC" class="box">&nbsp;</div></td>
                    <td><div id="nConsecAlphaLCBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
				<tr>
                    <td><div id="div_nConsecNumber" class="pass">&nbsp;</div></td>
                    <td>'.$lang_CONSNUM.'</td>
                    <td class="txtCenter italic">-(n*2)</td>
                    <td><div id="nConsecNumber" class="box">&nbsp;</div></td>
                    <td><div id="nConsecNumberBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
				<tr>
                    <td><div id="div_nSeqAlpha" class="pass">&nbsp;</div></td>
                    <td>'.$lang_SEQLET.' (3+)</td>
                    <td class="txtCenter italic">-(n*3)</td>
                    <td><div id="nSeqAlpha" class="box">&nbsp;</div></td>
                    <td><div id="nSeqAlphaBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
				<tr>
                    <td><div id="div_nSeqNumber" class="pass">&nbsp;</div></td>
                    <td>'.$lang_SQENUM.' (3+)</td>
                    <td class="txtCenter italic">-(n*3)</td>
                    <td><div id="nSeqNumber" class="box">&nbsp;</div></td>
                    <td><div id="nSeqNumberBonus" class="boxMinus">&nbsp;</div></td>
				</tr>
                <tr>
                    <th colspan="5">'.$lang_LEGEND.'</th>
                </tr>
                <tr>
                    <td colspan="5">
                        <ul id="listLegend">
                            <li><div class="exceed imgLegend">&nbsp;</div> <span class="bold">'.$lang_EXCEPT.':</span> '.$lang_EXCEPTTEXT.'</li>
                            <li><div class="pass imgLegend">&nbsp;</div> <span class="bold">'.$lang_SUFFI.':</span> '.$lang_SUFFITEXT.'</li>
                            <li><div class="warn imgLegend">&nbsp;</div> <span class="bold">'.$lang_WARNING.':</span> '.$lang_WARNINGTEXT.'</li>
                            <li><div class="fail imgLegend">&nbsp;</div> <span class="bold">'.$lang_FAIL.':</span> '.$lang_FAILTEXT.'</li>
                        </ul>
                    </td>
                </tr>
			</table>

       </form>
		<div class="xtend">&nbsp;</div>
	</div>
';
?>