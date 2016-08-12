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
$CTOAuthor="Marcel Br&auml;tz, Christian Sieche";

//***SET THE PLUGIN-NAME HERE
//For example: mod_cto_caesar
//Your folder has to be equal to the plugin name!
$CTOPluginName="mod_cto_navajo_php";


//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------

// no direct access
defined('_JEXEC') or die('Restricted access');
// set plugin name
$CTOPluginName=strtolower($CTOPluginName);
//require_once (dirname(__FILE__).DS.'helper.php');
require (dirname(__FILE__).DS.'prog.navajo.php');
//add author information
$ctolang_author=JTEXT::_('CTOAUTHOR');
echo "<p><br><table>
      <tr>
       <td><hr><font size='1'>$ctolang_author: $CTOAuthor</font></td>
      </tr>
      </table>";
?>