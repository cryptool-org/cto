<?php
defined('_JEXEC') or die('Restricted access');

class encode
{

    private $pw1;               //Passwort 1
    private $pw2;               //Passwort 2
    private $from;              //das zu ersetzende zeichen $from
    private $to;                //wird durch $to ersetzt
    public  $inputstr;          //zu verschlüsselnde Nachricht
    private $alphabet;          //
    private $matrix1;           //
    private $code;              //
	  private $clean;

    
    //Konstruktor mit vordefinierten daten
    

    function __construct($pw1="",$pw2="",$inputstr="",$from="",$to="",$alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    {
        $this->pw1      = $pw1;
        $this->pw2      = $pw2;
        $this->inputstr = $inputstr;
        $this->from     = $from;
        $this->to       = $to;
        $this->alphabet = $alphabet;
		
    }
  
    
      function setAlpha($in){ $this->alphabet=strtoupper($in); 	}	#Alphabet
    	function setPW1($in)	{ $this->pw1=strtoupper($in); 		}	#Passwort1
    	function setPW2($in)	{ $this->pw2=strtoupper($in);		}	#Passwort2
    	function setText($in)	{ $this->inputstr=$in;				}	#Eingabetext
    	function setFrom($in)	{ $this->from=$in;					}
	    function setTo($in)		{ $this->to=$in;					}
    	
    	function getAlpha()		{ return $this->alphabet; 			}	# Alphabet
    	function getPW1()		  { return $this->pw1; 				}	#Passwort1
    	function getPW2()		  { return $this->pw2; 				}	#Passwort2
    	function getText()		{ return $this->inputstr;		}	#Eingabetext
		  function getFrom()		{ return $this->from;				}
		  function getTo()		  { return $this->to;					}
      function getMatrix()  { return $this->hilf01;     }  
      
        
    function vorverarb()
    { 
     // $this->zeichen=this->entfZeichen()
      $this->pw1=$this->Reinige($this->pw1,$this->alphabet);    // alle Sonderzeichen werden entfernt + ersetzt Umlaute durch die entsprechenden Bigramme
      $this->pw1=$this->DoppeltRaus($this->pw1);
      $this->pw1=$this->entferneZeichen($from,$this->pw1);
      $this->pw2=$this->Reinige($this->pw2,$this->alphabet);
      $this->pw2=$this->DoppeltRaus($this->pw2);
      $this->inputstr=$this->Reinige($this->inputstr,$this->alphabet);
      $this->inputstr=$this->ersetzeZeichen($this->from,$this->to,$this->inputstr);
      $this->alphabet=$this->entferneZeichen($this->from,$this->alphabet);
  
    }
    
    function crypt()
    {
      $this->matrix1=$this->matrix($this->pw1,$this->alphabet); // erzeugt ersetzung und verschl Matrix
      $re=$this->getErsetzung();                                // nur bedingt nützlich
      $ergarray1=$this->ersetzeHin($this->inputstr);
      $ergarray2=$this->ersetzeHin($this->pw2);
      $erg=$this->addArrays($ergarray1,$ergarray2);   //Addieren der beiden Arrays
	    $code = $this->arrayToString($erg);
      return $code;
    }
    
    
    function entferneZeichen($from,$menge)
    {
      $menge=str_replace($from,"",$menge);
      return $menge;
    }
    
    
    function ersetzeZeichen($from,$to,$menge)
    {
      $menge=str_replace($from,$to,$menge);
      return $menge;
    }
    
   
    
    function DoppeltRaus($inp)
    {               
       $inp=str_split($inp,1);    //Konvertiert den Input-String in ein Array
       $inp=array_unique($inp);   //Entfernt doppelte Werte aus einem Array
       $inp=implode("", $inp);    //Verbindet Array-Elemente zu einem String
       return $inp;
    }
    
                                            
    function Reinige($string,$alphabet)     //alle Zeichen, die nicht in $alphabet enthalten sind, entfallen
    {                  
      $string=$this->EntUml($string);       //Umlaute werden durch entspr. Bigramme ersetzt
      for($i=0;$i!=strlen($string);$i++)    
      {                 
        $zeichen = substr($string,$i,1);    //übergibt jeweils 1 zeichen an stelle $i
        if (eregi($zeichen, $alphabet))     //prüft, ob $zeichen in $alphabet enthalten ist
        {
            $return.=$zeichen;              //bei Übereinstimmung wird $zeichen an $return angehängt
        }
      }
      return $return;  
    }
    
                                                          
    function EntUml($string)                              // ersetzt Umlaute durch die entsprechenden Bigramme
    {                             
      $string=strtoupper($string);                        // aus Kleinbuchstaben werden Großbuchstaben
      $search  = array ("/Ä/","/Ö/","/Ü/","/ß/");         // Umlaute, die ersetzt werden sollen
      $replace = array ("AE","OE","UE","SS");             // zu Bigrammen
      $return  = preg_replace($search, $replace, $string);// $search=Suchmuster, $replace=Ersatz, $string= Zeichenkette 
      return $return;                                     // gereinigte Zeichenkette wird zurückgegeben
    }
    
    
                                              
    function matrix($pass,$alphabet)            //Aufbau der Matrix, $pass soll das Passwort enthalten
    {   
       $pass=str_split(strtoupper($pass));      //Konvertiert Eingabe-String in ein Array        
       $alphabet=str_split($alphabet);          //Konvertiert Alphabet in ein Array       
       $alphabet=array_diff($alphabet,$pass);   //alle Werte die in $pass enth. sind werden aus $alphabet entfernt
       if(implode("",$pass)!="")
          {
          $out = array_merge($pass,$alphabet);   //Beide Arrays werden zusammengeführt
          }
        else ($out=$alphabet);
        
         $this->hilf01=$out;
       
       $n=0;
       foreach($out as $b)
       {
          $x=$n%5;          
          $y=floor($n/5);
          $ma[$y][$x]=$b;       
          $alf[$b]=($y+1).($x+1);
          $n++;
       }       
       $this->ersetzung = $alf;
       $this->matrix1=$ma;
      
      
       return $ma;  
     
      }  
      

    
    function getErsetzung()
    {           
      return $this->ersetzung;
    }
    
    function ersetzeHin($string)
    {//$string ist der zu Übersetzende String, $ uebarray ist das Übersetzungsarray
      if($string=="")
	       { 
         return $out=""; 
         }
	  else
	   {
		  $er=$this->ersetzung;
	    $msg=str_split($string);  //Konvertiert Alphabet in ein Array
	    foreach($msg as $b)
	         {
	         $out[]=$er[$b];			
           }
	  	}
      return $out;
     }   
    
           
    
    function arrayToString($arr)
    {
      for($i=0;$i!=count($arr);$i++)
      {
        $result.=$arr[$i];
        if($i!=(count($arr)-1))
        {
           $result.=",";
        }  
      }
      return $result;
    }
    
    
    function addArrays($arr1,$arr2)
    {
      $len=count($arr2);$j=0;
      for($i=0;$i!=count($arr1);$i++)
      {
          $wert=($arr1[$i]+$arr2[$j]);
          if($wert>=100)
          {
             $wert-=100;
          }
          $result[$i]=$wert;    
          $j++;
          if($len==$j)
          {
              $j=0;
          }
      }  
      return $result;
    }
	
	 public function setCleanflag() { $this->clean = 'checked';}

}
?>
