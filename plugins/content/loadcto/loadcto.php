<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Content.loadcto
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Plug-in to enable loading modules into content (e.g. articles)
 * This uses the {loadcto} syntax
 *
 * @since  1.5
 */
class PlgContentLoadcto extends JPlugin
{
	protected static $modules = array();

	protected static $mods = array();

	/**
	 * Plugin that loads CTO tools within content
	 *
	 * @param   string   $context   The context of the content being passed to the plugin.
	 * @param   object   &$article  The article object.  Note $article->text is also available
	 * @param   mixed    &$params   The article params
	 * @param   integer  $page      The 'page' number
	 *
	 * @return  mixed   true if there is an error. Void otherwise.
	 *
	 * @since   1.6
	 */
	public function onContentPrepare($context, &$article, &$params, $page = 0)
	{
		JLog::addLogger(
			array('text_file' => 'loadCto.log'),
			JLog::ALL,
			array('loadcto')
		);
		//JLog::add(JText::_('cto cto'), JLog::WARNING, 'jerror');
		JLog::add(JText::_('onContentPrepare'), JLog::WARNING, 'loadcto');

		// Don't run this plugin when the content is being indexed
		if ($context == 'com_finder.indexer')
		{
			return true;
		}

		// Simple performance check to determine whether bot should process further
		if (strpos($article->text, 'loadCtoApp') === false && strpos($article->text, 'loadcto') === false)
		{
			return true;
		}

		// Expression to search for (CtoTool)
		$regex = '/{loadCtoApp\s(.*?)}/i';
		$style = $this->params->def('style', 'none');



		// Find all instances of plugin and put in $matches for loadCtoTool
		// $matches[0] is full pattern match, $matches[1] is the tool name
		preg_match_all($regex, $article->text, $matches, PREG_SET_ORDER);

		// No matches, skip this
		if ($matches)
		{
			foreach ($matches as $match)
			{
				$matcheslist = explode(',', $match[1]);

				// We may not have a module style so fall back to the plugin default.
				if (!array_key_exists(1, $matcheslist))
				{
					$matcheslist[1] = $style;
				}

				$toolName = trim($matcheslist[0]);
				$style    = trim($matcheslist[1]);

				$output = $this->_load($toolName, $style);

				// We should replace only first occurrence in order to allow positions with the same name to regenerate their content:
				$article->text = preg_replace("|$match[0]|", addcslashes($output, '\\$'), $article->text, 1);
				$style = $this->params->def('style', 'none');
			}
		}


	}

	/**
	 * Loads and renders the CTO tool stuff
	 *
	 * @param   string  $toolName  The name of the CTO tool
	 * @param   string  $style     The style assigned to the tool
	 *
	 * @return  mixed
	 *
	 * @since   1.6
	 */
	protected function _load($toolName, $style = 'none')
	{

        // try to read configuration

        $appLocation = '_ctoApps/' . $toolName . '/';
        $configFile =  JPATH_BASE . '/' . $appLocation . 'cto.config.json';
        $json = file_get_contents( $configFile);
        if (!$json){
            JLog::add(JText::_('JSON FILE not found (' . $configFile . ')'), JLog::WARNING, 'loadcto');
            return;
        }

        // try to decode json configuration

        $config = json_decode($json);
        if (!$config) {
            JLog::add(JText::_('JSON FILE is invalid (' . $configFile . ')'), JLog::WARNING, 'loadcto');
            return;
        }

        JLog::add(JText::_('Config:' . print_r($config,true) ), JLog::WARNING, 'loadcto');

        $this->injectFiles($config, $appLocation);

		return '<' . $config->tag . '></' . $config->tag . '>' . 'This is the CTO Algorithm ' . $toolName . ' - thats fun - and style ' . $style;
	}

	private function injectFiles($config, $appLocation){

        $document = JFactory::getDocument();

	    foreach ($config->styles as $style){
	        //echo $style . '<br>';
            $document->addStyleSheet(JURI::base() . $appLocation . $style);
        }

        foreach ($config->scripts as $script){
            //echo JURI::base() . $appLocation . $script . '<br>';

            $document->addScript(JURI::base() . $appLocation . $script);
        }

        $document->addScriptDeclaration(
            // 'System.baseURL = \'' . JURI::base() . $appLocation . '\';' .
            $config->init
        );

    }


}
