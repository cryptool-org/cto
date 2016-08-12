<?php

defined('_JEXEC') or die('Restricted access');

//Language Variables
$lang_plaintext=JTEXT::_('PLAINTEXT');
$lang_ciphertext=JTEXT::_('CIPHERTEXT');
$lang_freimaurer1=JTEXT::_('FREIMAURER1');
$lang_freimaurer2=JTEXT::_('FREIMAURER2');
$lang_freimaurer3=JTEXT::_('FREIMAURER3');
$lang_encrypt=JTEXT::_('ENCRYPT');
$lang_freimaurer4=JTEXT::_('FREIMAURER4');
$lang_freimaurer5=JTEXT::_('FREIMAURER5');

$suche           = (string) $_POST[suche];
$orgtxt          = (string) htmlspecialchars($_POST[orgtxt]);
$alf             = (string) $_POST[alf];
if ($orgtxt!="") $suche="kodieren";
$pfad = dirname(__FILE__) . "/frei";
$relpfad = JURI::base(true) . "components/com_cto/tools/freimaurer/frei";

#Standart Templates einladen.
$form   = file_get_contents($pfad.'/templates/form.template');
$ueber  = file_get_contents($pfad.'/templates/ueber.template');

# Vorauswahl des Template
if(!isset($_POST[alf]) && $_POST[suche] != 'kodieren')
{
  $alf  = 'nf';
}

#Einladen der Textarea, des Kodieren button und des checked strings
include_once($pfad.'/include/texkoche.php');

# Ueberpruefung welche Chiffre genommen weden soll
switch($alf)
{
 # Normale Freimauerer Chiffre
 case "nf":
 {  #Einlesen und Starten der Zugehoerigen Object
    include_once($pfad.'/classes/class.encoder.php');
    $encoder   = new encoder();
    $or 			 = 'nf';
    $en 			 = 'jpg';
    $nf   		 = file_get_contents($pfad.'/templates/form.template');
    $button = file_get_contents($pfad.'/templates/form_button_nf.template');
    $form 		 = $nf;
    $form      = str_replace('{-button-}',$button,$form);
    $form      = str_replace('{-texta-}',$texta, $form);
    $form      = str_replace('{-kodieren-}',$kod, $form);
    $form 		 = str_replace('{-nf-}', $check, $form);
    if($suche != 'kodieren')
	  {
	    $ueber  	 = '<img src="'.$relpfad.'/symbole/nf.jpg">';
    }
    else $ueberb  	 = '<img src="'.$relpfad.'/symbole/nf.jpg">';

    #Ueberpruefung ob kodiert,
    #dekodiert oder bereinigt werden soll
    if($suche == 'kodieren')
    {

			    $encoder->setPfad($relpfad);
      		$encoder->setOrd($or);
			    $encoder->setEndung($en);
			    $encoder->setText($orgtxt);
      		$encoder->vera();
      		$ausgabe  = $encoder->getString();
			    $ueber    = str_replace('{-ueber-}', $ausgabe, $ueber);

    }
  break;
  }

  #Noachitische Freimaurercodierung
  case "ns":
  {
    #Einlesen und Starten der Zugehoerigen Object
    include_once($pfad.'/classes/class.encoder.php');
    $encoder   = new encoder();
    $or 			 = 'ns';
    $en 			 = 'jpg';
    $ns   		 = file_get_contents($pfad.'/templates/form.template');
    $button    = file_get_contents($pfad.'/templates/form_button_ns.template');
    $form 		 = $ns;
    $form      = str_replace('{-button-}',$button,$form);
    $form      = str_replace('{-texta-}',$texta, $form);
    $form      = str_replace('{-kodieren-}',$kod, $form);
    $form 		 = str_replace('{-ns-}', $check, $form);
 	  if($suche != 'kodieren')
	  {
	    $ueber  	 = '<img src="'.$relpfad.'/symbole/ns.jpg">';
    }
    else $ueberb  	 = '<img src="'.$relpfad.'/symbole/ns.jpg">';

    #Ueberpruefung ob kodiert,
    #dekodiert oder bereinigt werden soll
    if($suche == 'kodieren')
    {

		      $encoder->setPfad($relpfad);
      		$encoder->setOrd($or);
			    $encoder->setEndung($en);
			    $encoder->setText($orgtxt);
      		$encoder->vera();
      		$ausgabe  = $encoder->getString();
			    $ueber    = str_replace('{-ueber-}', $ausgabe, $ueber);

     }

  break;
  }

  #Original Englische Freimaurercodierung
  case "oe":
  {
    #Einlesen und Starten der Zugehoerigen Object
    include_once($pfad.'/classes/class.encoder.php');
    $encoder    = new encoder();
    $or 			 = 'oe';
    $en 			 = 'jpg';
    $oe   		 = file_get_contents($pfad.'/templates/form.template');
    $button    = file_get_contents($pfad.'/templates/form_button_oe.template');
    $form 		 = $oe;
    $form      = str_replace('{-button-}',$button,$form);
    $form      = str_replace('{-texta-}',$texta, $form);
    $form      = str_replace('{-kodieren-}',$kod, $form);
    $form 		 = str_replace('{-oe-}', $check, $form);

    if($suche != 'kodieren')
	  {
	    $ueber  	 = '<img src="'.$relpfad.'/symbole/oe.jpg">';
    }
    else  $ueberb  	 = '<img src="'.$relpfad.'/symbole/oe.jpg">';

    #Ueberpruefung ob kodiert,
    #dekodiert oder bereinigt werden soll
    if($suche == 'kodieren')
    {

			    $encoder->setPfad($relpfad);
      		$encoder->setOrd($or);
			    $encoder->setEndung($en);
			    $encoder->setText($orgtxt);
      		$encoder->vera();
      		$ausgabe  = $encoder->getString();
			    $ueber    = str_replace('{-ueber-}', $ausgabe, $ueber);

    }

  break;
  }
  #Original Continentale Freimaurercodierung
  case "co":
  {
    #Einlesen und Starten der Zugehoerigen Object
    include_once($pfad.'/classes/class.encoder.php');
    $encoder   = new encoder();
    $or        = 'co';
    $en        = 'jpg';
    $co   	   = file_get_contents($pfad.'/templates/form.template');
    $button    = file_get_contents($pfad.'/templates/form_button_co.template');
    $form      = $co;
    $form      = str_replace('{-button-}',$button,$form);
    $form      = str_replace('{-texta-}',$texta, $form);
    $form      = str_replace('{-kodieren-}',$kod, $form);
    $form      = str_replace('{-co-}', $check, $form);
    if($suche != 'kodieren')
	 {
	 $ueber  	 = '<img src="'.$relpfad.'/symbole/co.jpg">';
    }
    else $ueberb  	 = '<img src="'.$relpfad.'/symbole/co.jpg">';

    #Ueberpruefung ob kodiert,
    #dekodiert oder bereinigt werden soll
    if($suche == 'kodieren')
    {

			    $encoder->setPfad($relpfad);
      		$encoder->setOrd($or);
			    $encoder->setEndung($en);
			    $encoder->setText($orgtxt);
      		$encoder->vera();
      		$ausgabe  = $encoder->getString();
			    $ueber    = str_replace('{-ueber-}', $ausgabe, $ueber);
    }


  break;
  }

  #USA Freimaurercodierung
  case "vs":
  {
    #Einlesen und Starten der Zugehoerigen Object
    include_once($pfad.'/classes/class.encoder.php');
    $encoder = new encoder();
    $or        = 'vs';
    $en        = 'jpg';
    $vs        = file_get_contents($pfad.'/templates/form.template');
    $button    = file_get_contents($pfad.'/templates/form_button_vs.template');
    $form      = $vs;
    $form      = str_replace('{-button-}',$button,$form);
    $form      = str_replace('{-texta-}',$texta, $form);
    $form      = str_replace('{-kodieren-}',$kod, $form);
    $form      = str_replace('{-vs-}', $check, $form);

    if($suche != 'kodieren')
	  {
	    $ueber  	 = '<img src="'.$relpfad.'/symbole/usa.jpg">';
    } else $ueberb  	 = '<img src="'.$relpfad.'/symbole/usa.jpg">';

    #Ueberpruefung ob kodiert,
    #dekodiert oder bereinigt werden soll

    if($suche == 'kodieren')
    {

			    $encoder->setPfad($relpfad);
      		$encoder->setOrd($or);
			    $encoder->setEndung($en);
			    $encoder->setText($orgtxt);
      		$encoder->vera();
     	    $ausgabe  = $encoder->getString();
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

if($suche != 'kodieren') $form = str_replace('{-bild-}', $ueber, $form);
else 				     $form = str_replace('{-bild-}', $ueberb, $form);



$form = str_replace('{-FREIMAURER1-}', $lang_freimaurer1, $form);
$form = str_replace('{-FREIMAURER2-}', $lang_freimaurer2, $form);
$form = str_replace('{-FREIMAURER3-}', $lang_freimaurer3, $form);
$form = str_replace('{-FREIMAURER4-}', $lang_freimaurer4, $form);
$form = str_replace('{-FREIMAURER5-}', $lang_freimaurer5, $form);
$form = str_replace('{-ENCRYPT-}', $lang_encrypt, $form);
$form = str_replace('{-PLAINTEXT-}', $lang_plaintext, $form);
$ueber = str_replace('{-CIPHERTEXT-}', $lang_ciphertext, $ueber);


# Ausgabe erzeugen
//$content->resetText();
//$content->setTitel('Freimaurer Chiffren');
echo $form;
if ($suche == 'kodieren') echo "<br><p>".$ueber;

?>