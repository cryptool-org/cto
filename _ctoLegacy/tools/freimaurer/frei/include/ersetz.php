<?php
defined('_JEXEC') or die('Restricted access');
if($userri[4] != '')
{
$form = str_replace('{-u1-}','Von: '.$userri[4].' Am: '.$dateri[4].' Um: '.$timeri[4], $form );
$form = str_replace('{-1-}', 'sagt: '.$boxri[4], $form );
}
else
{
$form = str_replace('{-u1-}','', $form );
$form = str_replace('{-1-}', '', $form );
}

if($userri[3] != '')
{
$form = str_replace('{-u2-}','Von: '.$userri[3].' Am: '.$dateri[3].' Um: '.$timeri[3], $form );
$form = str_replace('{-2-}', 'Sagt: '.$boxri[3], $form );
}
else
{
$form = str_replace('{-u2-}','', $form );
$form = str_replace('{-2-}', '', $form );
}
if($userri[2] != '')
{
$form = str_replace('{-u3-}','Von: '.$userri[2].' Am: '.$dateri[2].' Um: '.$timeri[2], $form );
$form = str_replace('{-3-}', 'Sagt: '.$boxri[2], $form );
}
else
{
$form = str_replace('{-u3-}','', $form );
$form = str_replace('{-3-}', '', $form );
}
if($userri[1] != '')
{
$form = str_replace('{-u4-}','Von: '.$userri[1].' Am: '.$dateri[1].' Um: '.$timeri[1], $form );
$form = str_replace('{-4-}', 'Sagt: '.$boxri[1], $form );
}
else
{
$form = str_replace('{-u4-}','', $form );
$form = str_replace('{-4-}', '', $form );
}
if($userri[0] != '')
{
$form = str_replace('{-u5-}','Von: '.$userri[0].' Am: '.$dateri[0].' Um: '.$timeri[0], $form );
$form = str_replace('{-5-}', 'Sagt: '.$boxri[0], $form );
}
else
{
$form = str_replace('{-u5-}','', $form );
$form = str_replace('{-5-}', '', $form );
}
?>