<?php
/**
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

//--------------------------------------
//------ADJUST THESE VALUES-------------
//--------------------------------------
//--------------------------------------

//Module-Author
$CTOAuthor="Florian Haker, Sven Radelof, Christian Sieche";

//Module-Name
//For example: mod_cto_caesar
//Your folder has to be equal to the module name!
$CTOModuleName="mod_cto_pollux";

//File which includes the JS algorithm
//leave it blank if no JavaScript file is needed.
$CTOJSname="";

//File which includes further PHP-Code
//leave it blank if no further PHP-Code is needed.
$CTOPHPname="prog.pollux.php";

//File which includes the Style Sheet
//leave it blank if no further Style Sheet is needed.
$CTOStylesheetname="";

//Do you need a warning if JavaScript is disabled?
$CTOJavaScriptWarning=FALSE;

//-------------------------------------
//-------------------------------------
//no need to change something here-----
//-------------------------------------

// no direct access
defined('_JEXEC') or die('Restricted access');
// set module name
$CTOModuleName=strtolower($CTOModuleName);
// Execute Algorithm / CSS
$mypath = JURI::base(true) . '/' . 'modules' . '/' . $CTOModuleName . '/';
$doc =& JFactory::getDocument();
if ($CTOJSname!="") $doc->addCustomTag('<script type="text/javascript" src="'.$mypath.$CTOJSname.'"></script>');
if ($CTOStylesheetname!="") $doc->addCustomTag('<link rel="stylesheet" href="'.$mypath.$CTOStylesheetname.'" type="text/css"/>');
// set variable for path
$formpath = JModuleHelper::getLayoutPath($CTOModuleName);
//NOSCRIPT-WARNING
if ($CTOJavaScriptWarning==TRUE)
{
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
}
if ($CTOPHPname!="") require (dirname(__FILE__).DS.$CTOPHPname);

//add author information
$ctolang_author=JTEXT::_('CTOAUTHOR');
echo "<p><table>
      <tr>
       <td><hr><font size='1'>$ctolang_author: $CTOAuthor</font></td>
      </tr>
      </table>";
?>