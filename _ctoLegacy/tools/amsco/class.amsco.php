<?php
defined('_JEXEC') or die('Restricted access');
$pfad = dirname(__FILE__);
$relpfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;

/**
 *
 * Projekt:								Kryptographie-Projekt
 * Thema:									Spaltentausch-Chiffre (AMSCO)
 * Leitung:								Prof. Dr. Clewe / Marcel Braetz
 * Autor: 								Marcel Braetz
 * Anpassung / Erweitert: Christian Woehler
 * Ort:										Hochschule Wismar
 * Letze Aenderung: 			20.06.08
 *
 **/

class amsco_cipher{
	/**
	 * Die Klasse dient der Ver- und Entschlüsselung von Texten mit der Spaltentausch-
	 * Chiffe AMSCO.
	 **/

	/**
	 * Klassenvariablen
	 **/
	private $text;
  private $key;
  private $alfa;
  private $clean;

	/**
	 * Konstruktor / Destruktor
	 **/
  public function __construct(){}
  public function __destruct (){}

	/**
	 * Zugriffsmethoden
	 **/
  public function setText($in){
  	$in = strtoupper($in);
    $in = $this->strfix($in);
    $this->text = str_split($in);
  }
  public function setKey($in)  { $this->key = $in; }
  public function setAlfa($in) { $this->alfa = str_split(strtoupper($in)); }

	public function getText()    { return implode('',$this->text); }
  public function getKey()     { return $this->key; }
  public function getAlfa()    { return implode($this->alfa); }

	/**
	 * Ersetzen von Sonderzeichen
	 **/
  private function strfix($text){
	  $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/","/Ì/"); # suchen nach ...
    $replace = array ("AE","AE","OE","OE","UE","UE","SS","UE" );        # ersetzen durch ...
    $text = preg_replace($search, $replace, $text);
    return $text;
  }

	public function setCleanflag() { $this->clean = 'checked'; }

	/**
	 * Verschluesselung
	 **/
	public function encode(){
  	# Matrixbildung
		$matrix  = array();											# Matrix
  	$blength = strlen($this->key);					# Blocklänge

  	$text = '';															# String statt Array
		foreach($this->text as $e){
  		$text .= trim($e);
  	}

		$colnr = 1;															# Spaltennr.-variable
		$rownr = 1;															# Zeilennr.-variable
		$n = 1;
		while(strlen($text) != 0){							# Abarbeiten der Zeichenkette (Klartext)
			$sub_text = '';												# Variable zum Zwischenspeichern der Buchstaben (einer/zwei))

			$anz = 1 + ($n % 2);									# Anzahl der Buchstaben
			$sub_text = substr($text, 0, $anz);		# Erste / ersten beiden Zeichen speichern
			$text = substr($text, $anz);					#	Erste / ersten beiden Zeichen entfernen

			$matrix[$rownr][$colnr] = $sub_text;	# Speichern der Buchstaben in der Matrix
			if($colnr == $blength){								#	Spaltennr. == Keylänge -> neue Zeile
				$colnr = 1; 												# Spaltennummervariable zurücksetzen (neue Zeile)
				$rownr++;														# Zeilennummervariable erhöhen
			} else {
				$colnr++;														# Spaltennummervariable erhöhen
			}
			$n++;
		}
		$matrix = $this->sortArray($matrix);

		# Ausgabenaufbereitung
  	for($col = 1; $col <= $blength; $col++){
			for($row = 1; $row <= $rownr; $row++){
				$out[] = $matrix[$row][$col];
			}
		}

		#Blockbildung
		$tmp = implode('', $out);
    $tmp = str_split($tmp, 5);
    $tmp = implode(' ', $tmp);
    $out = str_split($tmp);

		$this->text = $out;
	}

	/**
	 * Entschluesselung
	 **/
	public function decode(){
		#Bilden der Hilfsmatrix
		$matrix  = array();											# Matrix
  	$blength = strlen($this->key);					# Blocklänge
  	$skey = (string) $this->key;

  	$text = '';															# String statt Array
		foreach($this->text as $e){
  		$text .= trim($e);
  	}
  	$cypher = $text;

  	$colnr = 1;															# Spaltennr.-variable
		$rownr = 1;															# Zeilennr.-variable
		$n = 1;
		while(strlen($text) != 0){							# Abarbeiten der Zeichenkette (Klartext)
			$sub_text = '';												# Variable zum Zwischenspeichern der Buchstaben (einer/zwei))

			$anz = 1 + ($n % 2);									# Anzahl der Buchstaben
			$sub_text = substr($text, 0, $anz);		# Erste / ersten beiden Zeichen speichern
			$text = substr($text, $anz);					#	Erste / ersten beiden Zeichen entfernen

			$matrix[$rownr][$colnr] = $sub_text;	# Speichern der Buchstaben in der Matrix
			if($colnr == $blength){								#	Spaltennr. == Keylänge -> neue Zeile
				$colnr = 1; 												# Spaltennummervariable zurücksetzen (neue Zeile)
				$rownr++;														# Zeilennummervariable erhöhen
			} else {
				$colnr++;														# Spaltennummervariable erhöhen
			}
			$n++;
		}

		# Dekodierung
		$rows = 0;
		foreach($matrix as $zeile){
			$rows++;
		}
		for($col = 1; $col <= $blength; $col++){
			for($row = 1; $row <= $rows; $row++){
				$len = strlen($matrix[$row][$this->getPos($col)+1]);
				$newMatrix[$row][$this->getPos($col)+1] = substr($cypher, 0, $len);
				$cypher = substr($cypher, $len);
			}
		}

		# Ausgabenaufbereitung
		for($row = 1; $row <= $rownr; $row++){
			for($col = 1; $col <= $blength; $col++){
				$out[] = $newMatrix[$row][$col];
			}
		}

  	# Blockbildung
		$tmp = implode('', $out);
    $tmp = str_split($tmp, 5);
    $tmp = implode(' ', $tmp);
    $out = str_split($tmp);

		$this->text = $out;
  }

  /**
   * Sortiert ein Array
   **/
	private function sortArray($in){
		$out = array();
		$col = 0;
		$row = 1;
		$str_key = (string)$this->key;
		foreach($in as $temp){
			$col = 0;
			foreach($temp as $value){
				$col++;
				$out[$row][$str_key[$col-1]] = $value;
			}
			$row++;
		}
		return $out;
	}

	/**
	 * isOdd - Pruefung ob Parameter gerade ist
	 * in = Zahl
	 **/
	private function isOdd($in){
		return ($in % 2 == 0);
	}

	/**
	 * Position der Spaltennummer im Schluessel
	 **/
	private function getPos($in){
		$a=0;
		$skey = (string) $this->key;
		while($a < strlen($this->key)){
			if($in == $skey[$a]){
				return $a;
				break;
			} else {
				$a++;
			}
		}
	}
}

?>