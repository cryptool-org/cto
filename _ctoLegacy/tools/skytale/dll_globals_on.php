<?php
defined('_JEXEC') or die('Restricted access');
if (!ini_get("register_globals")){
   foreach ($_REQUEST as $k=>$v){
       if (!isset($GLOBALS[$k])){
           ${$k}=$v;
       }
   }
}
?>