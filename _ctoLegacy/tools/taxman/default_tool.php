<?php // no direct access

defined('_JEXEC') or die('Restricted access');
$mypath = JURI::base(true) . "components/com_cto/tools/".$this->tool->template . "/";

//Language Variables
$lang_PLAYERNAME=JTEXT::_('PLAYERNAME');
$lang_GAMESIZE=JTEXT::_('GAMESIZE');
$lang_ADJUST=JTEXT::_('ADJUST');
$lang_YOURSCORE=JTEXT::_('YOURSCORE');
$lang_TAXMANSCORE=JTEXT::_('TAXMANSCORE');
$lang_SHOWTAXMAN=JTEXT::_('SHOWTAXMAN');
$lang_AUTOGIVEUP=JTEXT::_('AUTOGIVEUP');
$lang_GIVEUP=JTEXT::_('GIVEUP');
$lang_RESTART=JTEXT::_('RESTART');
$lang_YOURSELECTION=JTEXT::_('YOURSELECTION');
$lang_HIGHSCORETEXT=JTEXT::_('HIGHSCORETEXT');
$lang_HIGHSCOREAD=JTEXT::_('HIGHSCOREAD');

//********
echo '
<table>
<tr>
<td>'.$lang_PLAYERNAME.':</td>
<td><input type="text" name="playername" id="playername" class="ctoformcss-txtinput-style" size=47 value="anonym" maxlength="25" onclick="if (this.value==\'anonym\') this.value=\'\';"/></td>
</tr>
<tr>
<td>'.$lang_GAMESIZE.':</td>
<td><form onsubmit="restart(); return false;"><input type=text title="Board Size" id=newsize value=20 class="ctoformcss-txtinput-style ctoformcss-foursign-input-size">&nbsp;<input type=submit value="'.$lang_ADJUST.'" class="ctoformcss-default-button-l"></form></td>
<tr>
<td>'.$lang_YOURSCORE.':</td>
<td> <input type=text title="Board Size" id=taxscore value=0 class="ctoformcss-txtoutput-style ctoformcss-foursign-input-size" readonly="true"></td>
</tr>
<tr>
<td>'.$lang_TAXMANSCORE.':</td>
<td> <input type=text title="Board Size" id=tax value=0 class="ctoformcss-txtoutput-style ctoformcss-foursign-input-size" readonly="true"></td>
</tr>

<tr>
<td>&nbsp;</td>
<td><input type=hidden title="path" id=modulpath value="'.$mypath.'" readonly="true" onload="restart(); return false;">
</td>
</tr>

<tr>
<td colspan=2><input type="checkbox" name="showmove" id="showmove" checked="true"/>
&nbsp;'.$lang_SHOWTAXMAN.'</td>
</tr>
<tr>
<td colspan=2><input type="checkbox" name="autoend" id="autoend" checked="true"/>
&nbsp;'.$lang_AUTOGIVEUP.'</td>
</tr>



</tr>


</table>
<table>
  <tr>
  <td></td><td>
  <input type=button value="'.$lang_GIVEUP.'" onclick=done() class="ctoformcss-default-button-m">
  <input type=button value="'.$lang_RESTART.'" onclick="restart(); return false;" id="restartbutton" class="ctoformcss-default-button-m">
 </td>
</tr>
</table>
<p>
<div id="highscore" style="visibility: hidden; color: red;">'.$lang_HIGHSCOREAD.'<br></div>
<script>
document.write("<style>" + taxstyle() + "</style>");
game = newgame(20);
document.write(board(game.size));
</script>
<br>
<table>
<tr>
<td>'.$lang_YOURSELECTION.'</td>
<td></td>
<tr>
<td colspan=2><textarea name="choices" id="choices" class="ctoformcss-txtoutput-style" wrap="hard" readonly="true" cols="71" rows="2"></textarea></td>
</tr>
</table>
<p>
<br>
<h1>Highscore Top 10</h1>
<p><br>
<div id=highscorelist></div>

'.$lang_HIGHSCORETEXT.' <span id="highsize">20</span>]
<script>
readfirsthighscore("'.$mypath.'");
</script>';
?>