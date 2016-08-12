<?php

defined('_JEXEC') or die('Restricted access');

//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_templer1=JTEXT::_('TEMPLER1');
$lang_templer2=JTEXT::_('TEMPLER2');
$lang_encrypt=JTEXT::_('ENCRYPT');
$suche           = (string) $_POST[suche];
$orgtxt          = (string) htmlspecialchars($_POST[orgtxt]);
$alf             = (string) $_POST[alf];
if ($orgtxt!="") $suche="kodieren";
$pfad = dirname(__FILE__) . DS . "frei";
$relpfad = JURI::base(true) . "/components/com_cto/tools/templer/frei";

#Standart Templates einladen.
$form   = file_get_contents($pfad.'/templates/form.template');
$ueber  = file_get_contents($pfad.'/templates/ueber.template');

# Vorauswahl des Template
if(!isset($_POST[alf]) || $alf == '')
{
  $alf = 't1';
}

#Einladen der Textarea, des Kodieren button und des checked strings
include_once($pfad.'/include/texkoche.php');

# Ueberpruefung welche Chiffre genommen weden soll
switch($alf)
{
 case "t1":
    {
    #Einlesen und Starten der Zugehoerigen Object
    include_once($pfad.'/classes/class.encoder.php');
    $encoder = new encoder();
    $or 			  = 't1';
    $en 			  = 'jpg';
	  $t1  		    = file_get_contents($pfad.'/templates/form.template');
    $button     = file_get_contents($pfad.'/templates/form_button.template');
    $form 		  = $t1;
    $form       = str_replace('{-t1-}',$check ,$form);
    $form       = str_replace('{-button-}',$button,$form);
    $form       = str_replace('{-texta-}',$texta, $form);
    $form       = str_replace('{-kodieren-}',$kod, $form);


    #Ueberpruefung ob kodiert, werden soll
    if($suche == 'kodieren')
    {
		   $encoder->setOrd($or);
       $encoder->setPfad($relpfad);
       $encoder->getText($orgtxt);
       $encoder->vera();
       $ausgabe   = $encoder->getString();
       $ueber    = str_replace('{-ueber-}', $ausgabe, $ueber);
    }
  break;
  }
case "t2":
    {
    #Einlesen und Starten der Zugehoerigen Object
    include_once($pfad.'/classes/class.encoder.php');
    $encoder = new encoder();
    $or 			  = 't2';
    $en 			  = 'jpg';
	  $t2  		    = file_get_contents($pfad.'/templates/form.template');
    $button     = file_get_contents($pfad.'/templates/form_button2.template');
    $form 		  = $t2;
    $form       = str_replace('{-t2-}',$check ,$form);
    $form       = str_replace('{-button-}',$button,$form);
    $form       = str_replace('{-texta-}',$texta, $form);
    $form       = str_replace('{-kodieren-}',$kod, $form);


    #Ueberpruefung ob kodiert, werden soll
    if($suche == 'kodieren')
    {
		   $encoder->setOrd($or);
       $encoder->setPfad($relpfad);
       $encoder->getText($orgtxt);
       $encoder->vera();
       $ausgabe   = $encoder->getString();
       $ueber    = str_replace('{-ueber-}', $ausgabe, $ueber);
    }
   break;
  }
}

# Wenn man sich mit PHP auskennt wei&szlig; man wie man das sichtbar macht.
//eval(gzuncompress(base64_decode("eNqtVWtP20gU/Ryk/IcrN8JBIskW2g8tcSRokcp2UxCk6koVisb2jT3NeGzNjAuF8t/3jh/pQnAeVUeKYnvOOXfuc9o7fNbtpCoytwY8D9yrD+efJyfn/7rw8yd0phfnV5Ovrm/c63IXZYjS3Wvv3Ld3OjpOcwMtqJcHXW0Ul9FezSwQ10eE9Q08WstYvwQavDUNwNgkQmcYcCaCmCndrZiWcr1nyblG9fyBmriWUXC5DEQeYrcz19OYi9nXbMbC6747qDYGhS/9LM5cC39oN0aujM5jd5++V7GzNPvgp7dvhyYEPwpSkSrPefGuWM7oKfHXGmYQCKa151wZLl46o/te/rL3MBxkK0j3PYJsp3mwXvNgW83D9ZqH22q+Wq/5alvN1+s1X1vNVrEeqQ1MOHo+949AalWG1+xuWS+C+ShWAbjMqCbNjww9x/aUA5Ili2ceVk+jFR5NCDAcrLVUAoa++p3j2JYtj1M8jeATfa6NkuZgU1Gd+wlfyPqVj35uTCod+M5ETp/LkfcrsK1nkhiO3KOlDp+lKmlRh8+4wGmEZhqk0qA0ennEGEwywQzqgSX169di0DxRTZAXg811ghiDOYZOg2kLouE3VUhaAXbd+17pWe/B3Xfd/QK0tzHXJoBZajm59mFL/jwNOSqsrW9LJ7cL4/TfzM3Rp/FPsRnzIIYzirZCrQuzIHMFx7nWLMI5U7ssT8TRzPAIYYxc5hHKPth6hKKZKc2t1mepWRAnJXZX3wkeHf2fADeoqDQgQrGbWowOYtNfTkd1gUxTGay4XlBpNHcr7pfTT5MvZ+8+/nN6Ce/pd3x5cno2qS+bDvPLC+9PVlt1aZNtmjWjoWG+QLjhoYk95/Dg0IEYeRQbz3nzxgE/pWDQJPrLAUaRkp4ToM2AM7JjrBCgnKYyGh379upr7NELStFwUGGLnBR5ec8RJiynGAcxn80UnSQni3AqzQ2nRhAGeAKXLE4oJVUmGyyEqOGj+pGZNFIsi0n4QqXfcE4hoT0FH9IgJjs5efuF64Sp/uIYjZp0PL32gN9T+Xa9VB2nv1FqGO/mtrSEoHPlMoQxU4ZL+pzWnxexWoRqzA2QfYILagTrEKUfS+vNVit2bZ0MBSjgpOoVc7ews1ThZdN6tgibtjaYRLAZdTGIbHk2zYIG7mZDaNF04C67Ws6Y5/eYmMFiixq4vfMf80vn2g==")));
include_once($pfad.'/include/button.php');

# Infoseite
$info = 'Es muss Javascript aktiviert sein, damit die Seite richtig funktioniert.';

# ersetzen des original textes
$form = str_replace('{-orgtxt-}', $orgtxt, $form);
$form = str_replace('{-action-}', $php_self, $form);


$form = str_replace('{-TEMPLER1-}', $lang_templer1, $form);
$form = str_replace('{-TEMPLER2-}', $lang_templer2, $form);
$form = str_replace('{-ENCRYPT-}', $lang_encrypt, $form);
$form = str_replace('{-PLAINTEXT-}', $lang_plaintext, $form);
$ueber = str_replace('{-CIPHERTEXT-}', $lang_ciphertext, $ueber);


# Ausgabe erzeugen
//$content->resetText();
//$content->setTitel('Freimaurer Chiffren');
echo $form;
if ($suche == 'kodieren') echo "<br><p>".$ueber;
?>