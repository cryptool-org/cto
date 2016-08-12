<?
################################################################################
##
##  Analyseklassen
##
################################################################################
$cipherVersion[]=array('Klasse für Analyse-O-Matik','0.94','20061011','Marco Dohnke, Marcel Brätz');

###############################
# ToDo
###############################
# Die Vorverarbeitungsoptionen in die Profile für die Sprachen einarbeiten.
# damit bei Base64 auch kleine Buchstaben möglich sind
#
# Anzahl der Treffer bei der N-Grammsuche bei Details ausgeben
#
# Refenzierung von Arrays spezifizieren

class analyse
{
    var $alfa;
    var $text;
    var $report;
    var $sprache;
    var $search;
    var $replace;
    var $verteilung;
    var $data;
    var $time;

    function __destruct() {  }

    function analyse($sprache="de")
    {
        global $alphabet, $search, $replace, $verteilung, $satzname;

        $this->sprache    = $sprache;

        $this->alfa       = str_split($alphabet[$this->sprache],1);
        $_SESSION['alfa']   = $this->alfa;
        $this->data['alfasize'] = count($this->alfa);

        $this->search     = $search[$this->sprache];
        $this->replace    = $replace[$this->sprache];
        $this->verteilung = $verteilung[$this->sprache];

        $this->report     = "Analysereport\n\n";
        $this->report    .= "Einstellungen für den gewählten Zeichensatz laden ($satzname[$sprache])...\n";
    }

    function ladeText($text)
    {
        $a=$this->getmstime();

        $this->data['orgLaenge'] = strlen($text);
        $this->text            = $text;

        $this->time['loadtext'] = $this->getmstime() - $a;

        $this->report         .= "Text laden...\n";
    }
    function beschneideText($laenge=5000, $start=0)
    {
        $text = $this->text;

        $text = substr($text,$start,$laenge);

        $this->text = $text;

        $this->data['cutLaenge'] = strlen($text);

        $this->time['cuttext'] = $this->getmstime() - $a;

        $this->report         .= "Text beschneiden ($start, $laenge) ...\n";
    }

    function ladeAlfa($alfa)
    {
        $this->alfa = str_split($alfa,1);
        $this->data['alfasize'] = count($this->alfa);
    }

    function ladeErsetzungsregeln($search,$replace)
    {
        $this->search  = $search;
        $this->replace = $replace;
    }

    function ladeVerteilung($vert)      { $this->verteilung = $vert; }

    function holeText()                 { return $this->text; }

    function holeTextLaenge()           { return strlen($this->text);    }

    function holeReport()               { return $this->report; }

    function holeDaten()                { return $this->data; }

    function standardVorverarbeitung()
    {
        $this->replaceSpecialChar();
        $this->normalisiere();
        $this->grossbuchstaben();
        $this->data['neuLaenge'] = $this->holeTextLaenge();
    }

    function replaceSpecialChar()
    {
        $a = $this->getmstime();

        $sprache       = $this->sprache;
        $search        = $this->search;
        $replace       = $this->replace;
        $text          = $this->text;
        $text          = preg_replace($search, $replace, $text);
        $this->text    = $text;

        $this->time['replaceletters'] = $this->getmstime() - $a;

        $this->report .= "Sonderzeichen ersetzen...\n";
    }

    function normalisiere()
    {

        $aaa = $this->getmstime();

        $alfa    = $this->alfa;
        $text    = $this->text;
        $size    = strlen($text);

        if (strlen($alfa)>0)
        {
            for ($t=0;$t<$size;$t++)
            {
                $token=substr($text,$t,1);
                $a=in_array(strtolower($token),$alfa); # prüft Zeichen als Kleinbuchstaben
                $b=in_array(strtoupper($token),$alfa); # prüft Zeichen als Großbuchstaben
                if (!$a && !$b)
                {
                    $token=''; # sind sie nicht erhalten, werden sie entfernt.
                }
                $newtext.=$token;
            }
            $this->text = $newtext;

            $this->time['normalizetext'] = $this->getmstime() - $aaa;

            $this->report .= "Entfernen aller Zeichen, die nicht im Alphabet sind...\n";
        }
    }

    function grossbuchstaben()
    {
        $a = $this->getmstime();

        $this->text = strtoupper($this->text);
        $this->report .= "Text in Großbuchstaben umwandeln...\n";

        $this->time['capitalletters'] = $this->getmstime() - $a;
    }

    function Haeufigkeit()
    {
        $a= $this->getmstime();

        $text = $this->text;
        $alfa = $this->alfa;
        $num  = $this->data['alfasize'];
        $anz  = $this->holeTextLaenge();
        $res  = count_chars($text,1);

        foreach($alfa as $val)
        {
            $erg1[$val] = 0;
            $erg2[$val] = 0;
        }
        foreach($res as $key => $val)
        {
            $erg1[$alfa[array_search(chr($key),$alfa)]] =  $val+0;
            $erg2[$alfa[array_search(chr($key),$alfa)]] =  $val/$anz;
        }
        $this->data['absHauf'] = $erg1;
        $this->data['relHauf'] = $erg2;

        $this->time['frequency'] = $this->getmstime() - $a;

        $this->report .= "Häufigkeiten ermitteln...\n";
    }

    function koinzidenz()
    {
        $a = $this->getmstime();

        $text = $this->text;
        if (!is_array($this->data['absHauf'])) $this->Haeufigkeit();

        $num  = count($this->data['absHauf']);

        foreach($this->data['absHauf'] as $val)
        {
            $summe+=$val*($val-1);
            $ges+=$val;
        }
        $this->data['koinzidenz'] = $summe/($ges*($ges-1));

        $this->time['coincidence'] = $this->getmstime() - $a;

        $this->report .= "Koinzidenzindex ermitteln...\n";
    }

    function entropie()
    {   # binärer Informationsgehalt, bezogen Eingabezeichensatz

        $a = $this->getmstime();

        if (!is_array($this->data['relHauf'])) $this->Haeufigkeit();

        $hauf = $this->data['relHauf'];
        $ent=0;
        $inf=0;

        foreach($hauf as $p)
        {
            if($p>0)
            {
                $z=$p*log($p)/log(2);
                $i=log($p)/log(2);
            }
            else
            {
                $z=0;
                $i=0;
            }
            $ent-=$z;
            $inf-=$i;
        }

        $this->data['entropie']=$ent;
        $this->data['information']=$inf;

        $this->time['entropy'] = $this->getmstime() - $a;

        $this->report .= "Entropie & Informationsgehalt ermitteln...\n";
    }

    function autokorrelation($len = 0)
    {   # Autokorellation liefert Mustertreffer

        $a = $this->getmstime();

        $text=$this->text;
        $arr1=str_split($text.$text);
        $sa1=count($arr1);
        $sa2=floor($sa1/2);
        if ($len==0) $len=$sa2;
        if ($len>strlen($text)) $len=$sa2;

        for($t=0;$t<$len;$t++)
        {
            $summe=0;
            for($u=0;$u<$sa2;$u++)
            {
                if( $arr1[$u]==$arr1[($u+$t)%($sa2)] )
                {
                    $summe++;
                }
            }
            $arr2[$t]=$summe;
        }
        $this->data['akMittelwert'] = $this->mittelwert($arr2);
        $arr2[0] = $this->data['akMittelwert'];
        $this->data['akVarianz'] = $this->varianz($arr2);
        $this->data['akStdabwe'] = sqrt($this->data['akVarianz']);
        $this->data['akMinIndex'] = array_search(min($arr2),$arr2);
        $this->data['akMaxIndex'] = array_search(max($arr2),$arr2);
        $this->data['akMinimum'] = min($arr2);
        $this->data['akMaximum'] = max($arr2);
        $this->data['autokorr'] = $arr2;

        $this->time['autocorrelation'] = $this->getmstime() - $a;

        $this->report .= "Autokorrelation ($len) ermitteln...\n";
    }

    function filterAK($sw=10)
    {
        $a = $this->getmstime();

        if(!is_array($this->data['autokorr'])) $this->autokorrelation();
        $arr = $this->data['autokorr'];
        $mw  = $this->data['akMittelwert'];
        $mak = $this->data['akMaximum'];
        if (($mak-$mw*$sw)<=1) $sw=($mak+2*$mw)/3/$mw;

        foreach($arr as $val)
        {
            if (($val-$mw*$sw)>1)
            {
                $wert=1;
                $tmp[$t-$pos]++;
                $pos=$t;
            }
            else
            {
                $wert=0;
            }
            $t++;
            $this->data['akfiltered'][] = $wert;
        }
        $this->data['akfa']=$tmp;
        $this->data['akschw']=$sw*$mw;
        $this->data['akfamax'] = array_search(max($tmp),$tmp);
        $this->data['akfamax_supp'] = max($tmp)/array_sum($tmp);


        $this->time['akfiltered'] = $this->getmstime() - $a;

        $this->report .= "Autokorrelationsergebnis ($sw) filtern...\n";
    }

    function autokovarianz($n=0)
    {
        $a = $this->getmstime();

        $arr=$this->text2int();
        if($n==0) $n = floor(count($arr)/2);
        $va = $this->varianz($arr);
        for ($t=1;$t<$n;$t++)
        {
            $wert=$this->covarianz($arr,$arr,$t);
            $tmp[]=$wert;
        }
        $this->data['autokovar'] = $tmp;

        $this->time['autocovariance'] = $this->getmstime() - $a;

        $this->report .= "Autokovarianz ($n) ermitteln...\n";
    }

    function durchschnitt($n=0, $block = 26, $flow=1)
    {
        $a = $this->getmstime();

        $text=$this->text;
        if ($n==0) $n=strlen($text);

        for ($t=0;$t<($n-$block);$t+=$flow)
        {
            $sample = substr($text,$t,$block);
            $tmp[]  = count(count_chars($sample,1));
        }
        $this->data['durchschnitte'] = $tmp;
        $this->data['durchschnitt'] = $this->mittelwert($tmp);
        $this->data['avgminimum'] = min($tmp);
        $this->data['avgmaximum'] = max($tmp);
        $this->data['avgvarianz'] = $this->varianz($tmp);
        $this->data['avgstdabwe'] = sqrt($this->data['avgvarianz']);

        $this->time['durchschnitt']  = $this->getmstime() - $a;

        $this->report .= "Durchschnitte ($block) ermitteln...\n";
    }

    function runlenred($level=2)
    {
        $a = $this->getmstime();

        $text=$this->text;
        $n=strlen($text);
        for ($t=0;$t<=($n-$level);$t+=1)
        {
            $tmp=substr($text,$t,$level);
            if($tmp<>$rem)
            {
                $out.=$tmp;
                $rem=$tmp;
            }
        }
        $this->data['runlenred']=strlen($out)/$n/$level;;

        $this->time['runlenred'] = $this->getmstime() - $a;

        $this->report .= "Lauflängenreduzierung ($level) ermitteln...\n";
    }

    function compressratio($level=1)
    {
        $a = $this->getmstime();

        $text=$this->text;
        $n=strlen($text);
        $this->data['compression']=strlen(gzcompress($text,$level))/$n;;

        $this->time['compression'] = $this->getmstime() - $a;

        $this->report .= "Komprimierbarkeit ($level) ermitteln...\n";
    }

    function statistik()
    {
        $a = $this->getmstime();

        if(!is_array($this->data['absHauf'])) $this->Haeufigkeit();

        $data = $this->data['relHauf'];
        $this->data['RHmittelwert'] = $this->mittelwert($data);
        $this->data['RHminimum'] = min($data);
        $this->data['RHmaximum'] = max($data);
        $this->data['RHvarianz'] = $this->varianz($data);
        $this->data['RHstdabwe'] = sqrt($this->data['RHvarianz']);

        $this->time[statistics] = $this->getmstime() - $a;

        $this->report .= "Statistische Eckdaten ermitteln...\n";
    }

    function text2int()
    {
        $alfa=$this->alfa;
        $text = str_split($this->text);
        foreach($text as $b)
        {
            $s=array_search($b,$alfa);
            $arr[]=$s;
        }
        $this->report .= "Char-2-Int...\n";
        return $arr;
    }

    function fak($n)
    {   # einfache Implementierung der Fakultätsfunktion

        $fak=1;
        for ($t=$n;$t>0;$t--)
        {
            $fak=$fak*$t;
        }
        return $fak;
    }

    function varianz($arr)
    {   # Varianz

        $summe=0;

        $x=$this->mittelwert($arr);
        $i=count($arr);
        foreach($arr as $val) { $tmp[] = $val; }

        for ($t=0;$t<$i;$t++)
        {
            $n=$tmp[$t];
            $m=(($n-$x))*(($n-$x));
            $summe=$summe + $m;
        }
        return ($summe/$i);
    }

    function covarianz($arr, $arr2, $rot=0)
    {   # Co-Varianz

        if (sizeof($arr)!=sizeof($arr))
        {
            return 'error';
        }
        else
        {
            $summe=0;
            $x=$this->mittelwert($arr);
            $y=$this->mittelwert($arr2);
            $n=sizeof($arr);
            foreach($arr  as $val) { $tmp1[] = $val; }
            foreach($arr2 as $val) { $tmp2[] = $val; }

            for ($t=0;$t<$n;$t++)
            {
                $summe+=($tmp1[$t]-$x)*($tmp2[($t+$rot)%$n]-$y);
            }
            return $summe/$n;
        }
    }

    function mittelwert($arr)
    {   #Mittelwert
        $summe=0;
        foreach($arr as $val)
        {
            $summe+=$val;
        }
        return $summe/sizeof($arr);
    }

    function n_gramme($text,$n)
    {  //N-Gramme eines Strings in ein Array
       $a = $this->getmstime();
       for ($i=0;$i<$n;$i++)
       {
           if(is_array($ngr))
           {
               $ngr = array_merge($ngr,str_split($text,$n));
           }
           else
           {
               $ngr = str_split($text,$n);
           }
           $text = substr($text,1);
       }
       $l=count($ngr);
       for($i=0;$i<$l;$i++)
       {
           if(strlen($ngr[$i])<$n)
           {
               unset($ngr[$i]);
           }
       }
       sort($ngr,SORT_STRING);
       $this->time["ngramm$n"] = $this->getmstime() - $a;
       return $ngr;
    }

    function ngrman()
    {
        foreach(array(1,2,3,4,5,6,7,8,9) as $t)
        {
            $tmp = array_count_values($this->n_gramme($this->text,$t));
            arsort($tmp);
            $erg=ceil($this->data[alfasize] / $t*1.5);
            if ($erg<5) $erg=5;
            $tmp = array_slice($tmp,0,$erg);
            $this->data['ngramme'][$t]=$tmp;
            $this->report .= "n-Gramme($t) suchen...\n";
        }
    }

    function ngrsearch_all($n=20)
    {
        foreach(array(1,2,3,4,5,6,7,8,9) as $t)
        {
            $this->ngrsearch($t,$n);
            $this->report .= "n-Gramm-Positionen ($t) suchen...\n";
        }
    }

    function ngrsearch($t=3, $n=20)
    {

        $text=$this->text;
        $tmp=$this->data['ngramme'][$t];

        foreach($tmp as $needle=>$val)
        {
            $haystack=$text;
            unset($diffs);
            unset($poses);
            do
            {
                $pos      = strripos($haystack, $needle);
                if(is_int($pos)) $poses[]  = $pos;
                $haystack = substr($haystack,0,$pos);
            } while($pos>0 && count($poses)<$n);

            sort($poses);
            $i=count($poses);
            for ($s=1;$s<$i;$s++)
            {
                $diff=$poses[$s]-$poses[$s-1];
                $diffs[]=$diff;
                $zahl=new zahl($diff);
                $teiler=$zahl->gzt();
                foreach ($teiler as $te)
                {
                    $this->data['nachz'][$te]++;
                }
                $zahl->__destruct();
            }

            $this->data['ngrammpos'][$t][$needle]=$poses;
            $this->data['ngrammdif'][$needle]=$diffs;
        }
        $mw=$this->mittelwert($this->data['nachz']);
        arsort($this->data['nachz']);
        foreach($this->data['nachz'] as $kk=>$test)
        {
            if ($i<15) $nachz[$kk]=round($test-($max/$kk),3);
            $i++;
        }
        $this->data['nachz']=$nachz;
    }

    function getmstime()
    {
        return (substr(microtime(),11,10)+substr(microtime(),0,10));
    }
}


?>