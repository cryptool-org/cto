<?php
defined('_JEXEC') or die('Restricted access');
################################################
#                                              #
#   Klasse:  Freimaurer-Chiffren Kodierer      #
#   Version: 1.0                               #
#   Autor:   Jens Mueller u. Martin Moeller    #
#   Stand:   24.05.2008                        #
#                                              #
################################################
class encoder
{
  private $text;
  private $cou;
  private $aus;
  private $freiarray = array();
  private $str;
  private $pfad;
  private $or;
  private $en;

	  public function __construct(){}
    public function __destruct() {}

    #Einlesen, ueberpfuefen und aufsplitten des Textes.
	  public function setText($in)
    {
      $in = strtoupper($in);
      $in = $this->strfix($in);
      $this->text = str_split($in);

    }

    #Setzen des Ordners
	 public function setOrd($ordner)
	 {
	 	$this->or = $ordner;
	 }

  	 #Setzen des Pfades
    public function setPfad($pf)
    {
    	$this->pfad = $pf;
    }

    #Setzen der Endung
    public function setEndung($endung)
    {
    	$this->en = $endung;
    }

    #Umwandlung der eingegebenen Buchstaben in die entsprechenen Bilder
    public function vera()
    {


      $this->cou = count($this->text);

       for($i=0;$i<$this->cou;$i++){
           $a = $this->text[$i];
              switch($a){
                 case "A":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/a.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "B":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/b.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "C":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/c.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "D":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/d.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "E":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/e.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "F":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/f.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "G":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/g.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "H":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/h.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "I":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/i.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "J":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/j.'.$this->en.'"

                                         width="30" height="30">';
                            break;
                 case "K":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/k.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "L":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/l.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "M":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/m.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "N":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/n.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "O":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/o.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "P":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/p.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "Q":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/q.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "R":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/r.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "S":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/s.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "T":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/t.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "U":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/u.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "V":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/v.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "W":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/w.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "X":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/x.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "Y":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/y.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case "Z":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/z.'.$this->en.'"
                                         width="30" height="30">';
                            break;
                 case " ":  $this->aus = '<img border="0"
                                         src="'.$this->pfad.'/symbole/lr.gif"
                                         width="30" height="30">';
                            break;
                 case "":   $this->aus = 'Bitte Eingabe in Textfeld t&auml;tigen';
                            break;
                 case ",":  $this->aus  = '';
                 			break;
                 case ".":  $this->aus  = '';
                 			break;
                 case "-":  $this->aus  = '';
                 			break;
                 case "_":  $this->aus  = '';
                 			break;

          }
          array_push($this->freiarray,$this->aus);
        }
      return $this->freiarray;
    }


    #Wandelt das Array in eine Zeienkette um
    public function getString()
    {

      for($i = 0; $i < count($this->freiarray);$i++)
      {

        $this->str .= $this->freiarray[$i];

      }
     return $this->str;

    }


    private function strfix($text)
    {

      switch($this->or)
      {
        case "nf": {
    	             # ersetzt Umlaute durch die entsprechenden Bigramme
                   $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/","/Ì/",
                                     "/0/","/1/","/2/","/3/","/4/","/5/","/6/","/7/","/8/","/9/");
                                     #suchen nach ...
                   $replace = array ("AE","AE","OE","OE","UE","UE","SS","UE",
                                     "NULL","EINS","ZWEI","DREI","VIER","FUENF","SECHS","SIEBEN",
									 "ACHT","NEUN");
                                     # ersetzen durch ...
                   $text = preg_replace($search, $replace, $text);
                   return $text;
                   break;
      				 }

        case "ns": {
        				 # ersetzt Umlaute durch die entsprechenden Bigramme
                   $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/","/Ì/","/J/","/W/","/X/","/Y/",
                                     "/0/","/1/","/2/","/3/","/4/","/5/","/6/","/7/","/8/","/9/");
                                     #suchen nach ...
                   $replace = array ("AE","AE","OE","OE","UE","UE","SS","UE","I","VV","","",
                                     "NULL","EINS","ZWEI","DREI","VIER","FUENF","SECHS","SIEBEN","ACHT","NEUN");
                                     # ersetzen durch ...
                   $text = preg_replace($search, $replace, $text);
                   return $text;
                   break;
                   }

        case "co": {

                   $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/","/Ì/","/W/",
                                     "/0/","/1/","/2/","/3/","/4/","/5/","/6/","/7/","/8/","/9/");
                                     #suchen nach ...
                   $replace = array ("AE","AE","OE","OE","UE","UE","SS","UE","VV",
                                     "NULL","EINS","ZWEI","DREI","VIER","FUENF","SECHS","SIEBEN","ACHT","NEUN");
                                     # ersetzen durch ...
                   $text = preg_replace($search, $replace, $text);
                   return $text;
                   break;
                   }

        case "vs": {
        				 # ersetzt Umlaute durch die entsprechenden Bigramme
                   $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/","/Ì/",
                                     "/0/","/1/","/2/","/3/","/4/","/5/","/6/","/7/","/8/","/9/");
                                     #suchen nach ...
                   $replace = array ("AE","AE","OE","OE","UE","UE","SS","UE",
                                     "NULL","EINS","ZWEI","DREI","VIER","FUENF","SECHS","SIEBEN","ACHT","NEUN");
                                     # ersetzen durch ...
                   $text = preg_replace($search, $replace, $text);
                   return $text;
                   break;
                   }

        case "oe": {
        				 # ersetzt Umlaute durch die entsprechenden Bigramme
                   $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/","/Ì/",
                                     "/0/","/1/","/2/","/3/","/4/","/5/","/6/","/7/","/8/","/9/");
                                     #suchen nach ...
                   $replace = array ("AE","AE","OE","OE","UE","UE","SS","UE",
                                     "NULL","EINS","ZWEI","DREI","VIER","FUENF","SECHS","SIEBEN","ACHT","NEUN");
                                     # ersetzen durch ...
                   $text = preg_replace($search, $replace, $text);
                   return $text;
                   break;
                   }

      }
    }

}
?>