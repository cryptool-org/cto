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
     * @param   string $context The context of the content being passed to the plugin.
     * @param   object &$article The article object.  Note $article->text is also available
     * @param   mixed &$params The article params
     * @param   integer $page The 'page' number
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
        if ($context == 'com_finder.indexer') {
            return true;
        }

        // Simple performance check to determine whether bot should process further
        if (strpos($article->text, 'loadCtoApp') === false && strpos($article->text, 'loadcto') === false) {
            JLog::add('skip', JLog::WARNING, 'loadcto');
            return true;
        }

        // get language - NOTE only the third array element is usefull for all languages
        $this->lang = explode('_', JFactory::getLanguage()->getLocale()[2])[0];

        JLog::add('Language is ' . $this->lang, JLog::WARNING, 'loadcto');
        //JLog::add('Language is ' . print_r(JFactory::getLanguage()->getLocale(), true), JLog::WARNING, 'loadcto');


        JLog::add('process', JLog::WARNING, 'loadcto');

        // Expression to search for (CtoTool)
        $regex = '/{loadCtoApp\s(.*?)}/i';
        $style = $this->params->def('style', 'none');


        // Find all instances of plugin and put in $matches for loadCtoTool
        // $matches[0] is full pattern match, $matches[1] is the tool name
        preg_match_all($regex, $article->text, $matches, PREG_SET_ORDER);

        // No matches, skip this
        if ($matches) {
            foreach ($matches as $match) {
                $matcheslist = explode(',', $match[1]);

                // We may not have a module style so fall back to the plugin default.
                if (!array_key_exists(1, $matcheslist)) {
                    $matcheslist[1] = $style;
                }

                $toolName = trim($matcheslist[0]);
                $style = trim($matcheslist[1]);
                JLog::add('try to inject (name/style): ' . $toolName . ' / ' . $style , JLog::WARNING, 'loadcto');

                $output = $this->inject($toolName, $style);

                // We should replace only first occurrence in order to allow positions with the same name to regenerate their content:
                $article->text = preg_replace("|$match[0]|", addcslashes($output, '\\$'), $article->text, 1);

                //$style = $this->params->def('style', 'none');
            }

            // finaly inject globals
            JFactory::getDocument()->addScriptDeclaration(
                "var CTO_Globals = {}; CTO_Globals.lang='" . $this->lang . "'; CTO_Globals.base='" . JURI::base() . "';"
            );
        }


    }

    /**
     * Injects and renders the CTO tool stuff
     *
     * @param   string $toolName The name of the CTO tool
     * @param   string $style The style assigned to the tool
     *
     * @return  mixed
     *
     * @since   1.6
     */
    protected function inject($toolName, $style = 'none')
    {

        // try to read configuration
        $appLocation = '_ctoApps/' . $toolName . '/';
        $config = $this->getConfig($appLocation);

        if ($config) {

            if (!$config->name) $config->name = $toolName;

            $this->injectFiles($config, $appLocation);

            $html = $this->buildHtml($config, $style);

            return $html;
        }

        return 'CTO Algorithm ' . $toolName . ' - and style ' . $style . ' failed to load';
    }

    private function getConfig($appLocation)
    {


        $configFile = JPATH_BASE . '/' . $appLocation . 'cto.config.json';
        $json = file_get_contents($configFile);
        if (!$json) {
            JLog::add(JText::_('JSON FILE not found (' . $configFile . ')'), JLog::WARNING, 'loadcto');
            return null;
        }

        // try to decode json configuration

        $config = json_decode($json);
        if (!$config) {
            JLog::add(JText::_('JSON FILE is invalid (' . $configFile . ')'), JLog::WARNING, 'loadcto');
            return null;
        }

        JLog::add(JText::_('Config:' . print_r($config, true)), JLog::WARNING, 'loadcto');

        return $config;
    }


    private function buildHtml($config, $style)
    {

        if (is_object($config->tag)) {
            $tagName = $config->tag->name;
            $tag = $config->tag;

        } else {
            $tagName = $config->tag;
        }

        JLog::add('Style : ' . $style, JLog::WARNING, 'loadcto');

        $html = '';
        switch ($style) {

            case 'none':
            case 'embedded':
                $html = $this->getTag($tagName);
                break;

            case 'overlay':
                jimport('joomla.html.html.bootstrap');
                $modal_params = array();
                $modal_params['height'] = 400;
                $modal_params['width']  = "100%";
                $modal_params['title'] = $this->__($tag->ovlTitle);
                //$modal_params['backdrop'] = "false";
                $modal_params['footer'] = '<p>' . $this->__($tag->ovlFooter) . '</p>';

                $lnk = '<a href="#modal' . $config->name . '" class="btn" data-toggle="modal">'
                    . ($tag && $tag->btnText ? $this->__($tag->btnText) : $config->name)
                    . '</a>';

                $html = $this->getTag($tagName);
                $html =  $lnk . JHTML::_('bootstrap.renderModal', 'modal' . $config->name, $modal_params, $html);

                break;

            case 'accordion':
                $accordion = JHtml::_('bootstrap.startTabSet',
                        ($tag && $tag->accGroup ? $tag->accGroup : $config->name) . '_Group',
                        array())

                    . JHtml::_('bootstrap.addTab',
                        ($tag && $tag->accGroup ? $tag->accGroup : $config->name) . '_Group',
                        $config->name . '_id', ($tag && $tag->accTitle ? $this->__($tag->accTitle) : $config->name))

                    . $this->getTag($tagName)

                    . JHtml::_('bootstrap.endTab')
                    . JHtml::_('bootstrap.endTabSet');

                $html = $accordion;
                break;

            default:
                JLog::add('!!! no valid style found: [' . $style . ']', JLog::WARNING, 'loadcto');


        }
        JLog::add('Used HTML: ' . $html, JLog::WARNING, 'loadcto');

        return $html;
    }

    private function __($txt)
    {

        if (is_string($txt)) return $txt;

        if (isset($txt->{$this->lang})) return $txt->{$this->lang};

        return $txt->en ? $txt->en : '';

    }

    private function getTag($tagName)
    {
        JLog::add('TagName: ' . $tagName, JLog::WARNING, 'loadcto');

        switch ($tagName[0]) {

            case '.' :
                $tag = '<div class="' . substr($tagName, 1) . '"></div>';
                break;
            case '#' :
                $tag = '<div id="' . substr($tagName, 1) . '"></div>';
                break;
            default:
                $tag = '<' . $tagName . '></' . $tagName . '>';

        }

        JLog::add('Used Tag: ' . $tag, JLog::WARNING, 'loadcto');

        return $tag;
    }

    private function injectFiles($config, $appLocation)
    {

        $document = JFactory::getDocument();

        // inject all styles

        foreach ($config->styles as $style) {
            //echo $style . '<br>';
            if (substr($style, 0, 4) === 'http')
                $document->addStyleSheet($style);
            else
                $document->addStyleSheet(JURI::base() . $appLocation . $style);
        }

        // inject all scripts

        foreach ($config->scripts as $script) {
            //echo JURI::base() . $appLocation . $script . '<br>';

            if (is_object($script)) {

                if (substr($script->file, 0, 4) === 'http')
                    $document->addScript($script->file, $script->type);
                else
                    $document->addScript(JURI::base() . $appLocation . $script->file, $script->type);

            } else {

                if (substr($script, 0, 4) === 'http')
                    $document->addScript($script);
                else
                    $document->addScript(JURI::base() . $appLocation . $script);
            }
        }

        // inject inline initialization script if specified

        if ($config->init)
            $document->addScriptDeclaration(
                $config->init
            );
    }
}
