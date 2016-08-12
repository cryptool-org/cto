<?php
/*	
*	jsJText Helper for Joomla 1.5
*
*	Author: 	Robert Gerald Porter <rob@weeverapps.com>
*	Version: 	0.1.1
*   Date:		January 22, 2012
*	License: 	GPL v3.0
*
*	This code is free software: you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation, either version 3 of the License, or
*	(at your option) any later version.
*
*	This code is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU General Public License for more details <http://www.gnu.org/licenses/>.
*
*/
class jsJText extends JText
{

	protected static $strings=array();

	/**
	 * Translate a string into the current language and stores it in the JavaScript language store.
	 *
	 * @param	string	The JText key.
	 * @since	1.6
	 * 
	 * Backport for Joomla 1.5
	 * Example use: 
	 *
	 * //use this method call for each string you will be needing in javascript
	 * jsJText::script("MY_FIRST_COMPONENT_STRING_NEEDED_IN_JS");
	 * jsJText::script("MY_NTH_COMPONENT_STRING_NEEDED_IN_JS");  
	 * // and so on…
	 * // you must then call load(), as below:
	 * jsJText::load();
	 *
	 * in the JS files, load localization via:
	 *
	 * //String is loaded in javascript via Joomla.JText._() method
	 * alert( Joomla.JText._('MY_FIRST_COMPONENT_STRING_NEEDED_IN_JS') );
	 * 				
	 */
	 
	public static function script($string = null, $jsSafe = false)
	{

		// Add the string to the array if not null.
		if ($string !== null) {
			// Normalize the key and translate the string.
			self::$strings[strtoupper($string)] = JFactory::getLanguage()->_($string, $jsSafe);
		}

		return self::$strings;
	}
    
    public static function script_sprintf($string = null)
    {        
            $args = func_get_args();
            if ($string !== null) {
                self::$strings[strtoupper($string)] = JText::_($args[0]);
                $args[0] = self::$strings[strtoupper($string)];
                self::$strings[strtoupper($string)] = call_user_func_array('sprintf', $args);
            }
            return self::$strings;
    }
	
	/**
	 * Load strings translated for Javascript into JS environment. To be called after all jsJText::script() calls have been made.
	 *
	 */
	
	public static function load()
	{
	
		
		$document = &JFactory::getDocument();
		
		$document->addCustomTag (
			'<script type="text/javascript">var strings = '.
			json_encode(jsJText::script()).
			';
			
			if (typeof(Joomla) === "undefined") {
				var Joomla = {};
			}
			
			Joomla.JText = {
				strings: {},
				"_": function(key, def) {
					return typeof this.strings[key.toUpperCase()] !== "undefined" ? this.strings[key.toUpperCase()] : def;
				},
				load: function(object) {
					for (var key in object) {
						this.strings[key.toUpperCase()] = object[key];
					}
					return this;
				}
			};
			
			Joomla.JText.load(strings); </script>');
		
	
	}

}