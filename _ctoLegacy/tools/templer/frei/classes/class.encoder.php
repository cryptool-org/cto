<?php
################################################
#                                              #
#   Klasse:  Futurama Alienschrift Kodierer    #
#   Version: 1.0                               #
#   Autor:   Jens Mueller u. Martin Moeller    #
#   Stand:   24.05.2008                        #
#                                              #
################################################
class encoder{

  private $text;
  private $cou;
  private $aus;
  private $tearray = array();
  private $str;
  private $pfad;
  private $or;
	
	 public function __construct(){}
   public function __destruct() {}
   
    #Einlesen, ueberpfuefen und aufsplitten des Textes.
	  public function getText($ina)
    {
      $inb = strtoupper($ina);
      $inc = $this->strfix($inb);
      $this->text = str_split($inc);
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
    
    #Umwandlung der eingegebenen Buchstaben in die entsprechenen Bilder
    public function vera()
    {	
    	
    	 
      $this->cou = count($this->text);
       
          for($i=0;$i<$this->cou;$i++){
            $a = $this->text[$i];
              switch($a){
                 case "A":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/a.jpg" 
                                         width="30" height="30">';
                            break;
                 case "B":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/b.jpg"        
                                         width="30" height="30">';
                            break;
                 case "C":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/c.jpg"        
                                         width="30" height="30">';
                            break;
                 case "D":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/d.jpg"        
                                         width="30" height="30">';
                            break;
                 case "E":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/e.jpg"        
                                         width="30" height="30">';
                            break;
                 case "F":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/f.jpg"        
                                         width="30" height="30">';
                            break;
                 case "G":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/g.jpg"        
                                         width="30" height="30">';
                            break;
                 case "H":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/h.jpg"        
                                         width="30" height="30">';
                            break;
                 case "I":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/i.jpg"        
                                         width="30" height="30">';
                            break;
                 case "J":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/i.jpg"        
                                         width="30" height="30">';
                            break;
                 case "K":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/k.jpg"        
                                         width="30" height="30">';
                            break;
                 case "L":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/l.jpg"        
                                         width="30" height="30">';
                            break;
                 case "M":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/m.jpg"        
                                         width="30" height="30">';
                            break;
                 case "N":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/n.jpg"        
                                         width="30" height="30">';
                            break;
                 case "O":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/o.jpg"        
                                         width="30" height="30">';
                            break;
                 case "P":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/p.jpg"        
                                         width="30" height="30">';
                            break;
                 case "Q":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/q.jpg"        
                                         width="30" height="30">';
                            break;          
                 case "R":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/r.jpg"        
                                         width="30" height="30">';
                            break; 
                 case "S":  $this->aus = '<img border="0"     
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/s.jpg"        
                                         width="30" height="30">';
                            break;
                 case "T":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/t.jpg"        
                                         width="30" height="30">';
                            break;
                 case "U":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/u.jpg"        
                                         width="30" height="30">';
                            break;
                 case "V":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/v.jpg"        
                                         width="30" height="30">';
                            break;
                 case "W":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/w.jpg"        
                                         width="30" height="30">';
                            break;
                 case "X":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/x.jpg"        
                                         width="30" height="30">';
                            break;
                 case "Y":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/y.jpg"        
                                         width="30" height="30">';
                            break;
                 case "Z":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/'.$this->or.'/z.jpg"        
                                         width="30" height="30">';
                            break;
                 case " ":  $this->aus = '<img border="0" 
                                         src="'.$this->pfad.'/symbole/lr.gif"        
                                         width="30" height="30">';
                 
                }#switsch
              array_push($this->tearray,$this->aus); 
             }# for
           
          
         return $this->tearray;
        }
      
    
    
    
    #Wandelt das Array in eine Zeienkette um
    
    public function getString()
    {
    
      for($i = 0; $i < count($this->tearray);$i++)
      {
      
        $this->str .= $this->tearray[$i];
      
      }
    return $this->str;
    
    }

    private function strfix($text)
    { 
      
       # ersetzt Umlaute durch die entsprechenden Bigramme
       $search  = array("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/","/Ì/",
                        "/1/","/2/","/3/","/4/","/5/","/6/","/7/","/8/","/9/","/0/");   #suchen nach ...
                 
       $replace = array("AE","AE","OE","OE","UE","UE","SS","UE",
                        "EINS","ZWEI","DREI","VIER","FUENF","SECHS","SIEBEN","ACHT","NEUN","NULL");# ersetzen durch ...      
                  
       $text = preg_replace($search, $replace, $text);
       return $text;
      }
                      
      
}
    

?>