<?php

class main{

	private $ab1= array();
	private $ab2= array();
	private $ab3= array();
	private $ab4= array();
	private $eingabe="";
	private $zeichensatz=array();

	function main(){
		$this->zeichensatz=array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z');
		$this->setZeichensatz($this->zeichensatz);

	}
 
	function ausgabe($arr){

		for($i=0;$i<sizeof($arr);$i++){

			for($k=0;$k<sizeof($arr);$k++){
				echo $arr[$i][$k]."   ";
					
			}
			echo"<br>";
		}
	}

	function setKey1Austausch($key){
		$zeile=0;
		$spalte=0;
		$count=0;
		$tmp = str_split($key);
		$tmp = array_unique($tmp);
		$size= sizeof($this->ab2);
		#print_r($tmp);
		foreach ($tmp as $value) {
			$count++;
			#$this->ausgabe($this->ab2);
			#  echo "sad:".sizeof($this->ab2);
			$xy=$this->getXY($value,$this->ab2);
			#echo $value;
			#echo "Durchlauf: $count--Zeile:$zeile  Spalte : $spalte Tausch mit: Zeile:$xy[1]  Spalte : $xy[0] ";
			$hilf=$this->ab2[$zeile][$spalte];
			$this->ab2[$xy[1]][$xy[0]]=$hilf;
			$this->ab2[$zeile][$spalte]=$value;
			#echo "<br>TMP[i]:$value HILF: $hilf######".$this->ab2[$zeile][$spalte]."Modulo".(5%$count)."<br>";
			#echo "######<br>";
			$spalte++;
			if(($count%$size)==0){
				$zeile++;
				$spalte=0;
			}
		}
		#print_r($this->ab2);
	}

	function setKey2Austausch($key){

		$zeile=0;
		$spalte=0;
		$count=0;
		$tmp = str_split($key);
		$tmp = array_unique($tmp);
		$size= sizeof($this->ab3);
		foreach ($tmp as $value) {
			$count++;

			$xy=$this->getXY($value,$this->ab3);
			$hilf=$this->ab3[$zeile][$spalte];
			$this->ab3[$xy[1]][$xy[0]]=$hilf;
			$this->ab3[$zeile][$spalte]=$value;

			$spalte++;
			if(($count%$size)==0){
				$zeile++;
				$spalte=0;
			}


		}

	}


	function setKey1Einschub($string){
		$this->ab2=array();
		$size = sqrt(sizeof($this->zeichensatz));

		$count=0;
		$merge= array_unique(array_merge(str_split($string),$this->zeichensatz));
	
		$tmp= array();

		foreach ($merge as $value) {

			array_push($tmp,$value);
			
			$count++;
			if($count>0){
				if(($count%$size)==0){
					array_push($this->ab2,$tmp);

					$tmp=array();
				}
			}

		}

	}

	function setKey2Einschub($string){
		$this->ab3=array();
		$size = sqrt(sizeof($this->zeichensatz));

		$count=0;
		$merge= array_unique(array_merge(str_split($string),$this->zeichensatz));

		$tmp= array();

		foreach ($merge as $value) {

			array_push($tmp,$value);
		
			$count++;
			if($count>0){
				if(($count%$size)==0){
					array_push($this->ab3,$tmp);
						
					$tmp=array();
				}
			}

		}

	}


	function getCrypt($string){
		$this->setEingabe($string);
		$tmp = str_split($this->eingabe);
		$ergebnis="";
		for($i=0;$i<sizeof($tmp);$i+=2){
			$xy1=$this->getXY($tmp[$i],$this->ab1);
			$xy2=$this->getXY($tmp[$i+1],$this->ab1);


		 $ergebnis.=$this->ab2[$xy1[1]][$xy2[0]];

		 $ergebnis.=$this->ab3[$xy2[1]][$xy1[0]];

		}
		return $ergebnis;
	}

	function getEnCrypt($string){
		$this->setEingabe($string);
		$tmp = str_split($this->eingabe);
	
		$ergebnis="";
		
		for($i=0;$i<sizeof($tmp);$i+=2){
			$xy1=$this->getXY($tmp[$i],$this->ab2);
			$xy2=$this->getXY($tmp[$i+1],$this->ab3);
	
	
	


		 $ergebnis.=$this->ab1[$xy1[1]][$xy2[0]];

		 $ergebnis.=$this->ab1[$xy2[1]][$xy1[0]];

		}
		return $ergebnis;
	}




	function setEingabe($string){
    
    $verbot = array(" ", ".", "!", "?", "_", ",", "+", "-", "/", "(",")");
    $string = str_replace($verbot, "", $string);
    
    
    
		if(strlen($string)%2==0){
			$this->eingabe=$string;
		}
		else{
			$this->eingabe=$string.'y';
		}
	}

	function getXY($char,$array){
		$size=sizeof($array);
		for($i=0;$i<$size;$i++){

			for($k=0;$k<$size;$k++){
				if($array[$i][$k]==$char){
					$x=$k;
					$y=$i;
					#gefunden also beenden
					$i=$size;
				}
			}

		}
		if(isset($x)){
			return  array($x,$y);
		}
		else{
			return false;
		}
	}


	function setZeichensatz($zeichensatz){
		$size = sqrt(sizeof($zeichensatz));
		$count=0;
		$tmp= array();
		for($i=0;$i<sizeof($zeichensatz);$i++){
			array_push($tmp,$zeichensatz[$i]);
			if($i>0){
				if(($i+1)%$size==0){
					array_push($this->ab1,$tmp);
					$tmp=array();
					$count++;
				}
			}
		}
		$this->ab2=$this->ab3=$this->ab4=$this->ab1;
	}

	function getAB1(){
		return $this->ab1;
	}
	function getAB2(){
		return $this->ab2;
	}
	function getAB3(){
		return $this->ab3;
	}
	function getAB4(){
		return $this->ab4;
	}



}

?>