<?php
/**
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

//--------------------------------------
//------CHANGE THIS VALUES--------------
//--------------------------------------
//--------------------------------------



//***SET MODULE-INFORMATION HERE
$CTOAuthor="Martin Moeller, Jens Mueller, Christian Sieche";

//***SET THE PLUGIN-NAME HERE
//For example: mod_cto_caesar
//Your folder has to be equal to the plugin name!
$CTOPluginName="mod_cto_freimaurer_php";


//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------


// no direct access
defined('_JEXEC') or die('Restricted access');
// set plugin name
$CTOPluginName=strtolower($CTOPluginName);
//NOSCRIPT-WARNING
$ctolang_noscript=JTEXT::_('CTONOSCRIPT');
echo "<noscript>
		<table>
			<tr>
				<td>
				</td>
				<td class='ctoformcss-noscript'>
					$ctolang_noscript
				</td>
			</tr>
			<tr>
				<td>
				</td>
				<td>
				</td>
			</tr>
		</table>
     </noscript>";
//require_once (dirname(__FILE__).DS.'helper.php');
require (dirname(__FILE__).DS.'frei'.DS.'prog.freimaurer.php');
//add author information
$ctolang_author=JTEXT::_('CTOAUTHOR');
echo "<p><br><table>
      <tr>
       <td><hr><font size='1'>$ctolang_author: $CTOAuthor</font></td>
      </tr>
      </table>";
?>