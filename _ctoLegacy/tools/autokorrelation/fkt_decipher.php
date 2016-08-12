<?
defined('_JEXEC') or die('Restricted access');
########################################################
##
## Bibliothek f�r Analysealgorithmen
## Version 1.6, Marcel Br�tz, 26.03.2006
##
########################################################
$ksbVersion[]=array('Analyse-Bibliothek','1.7','20060610', 'Marcel Br�tz');

function strfix($text)
{   # ersetzt Umlaute durch die entsprechenden Bigramme

    $search  = array ("/Ä/","/ä/","/Ö/","/ö/","/Ü/","/ü/","/ß/"); # suchen nach ...
    $replace = array ("AE","AE","OE","OE","UE","UE","SS");        # ersetzen durch ...
    $text = preg_replace($search, $replace, $text);
    return $text;

}

function normalisiere($text,$alfa)
{   # pr�ft, ob die Zeichen des Textes im Zeichensatz enthalten sind.

    $text=strfix($text); # Ersetzen der Umlaute
    $size=strlen($text);
    $newtext="";
    for ($t=0;$t<$size;$t++)
    {
        $token=substr($text,$t,1);
        $a=in_array(strtolower($token),$alfa); # pr�ft Zeichen als Kleinbuchstaben
        $b=in_array(strtoupper($token),$alfa); # pr�ft Zeichen als Gro�buchstaben
        if (!$a && !$b)
        {
            $token=''; # sind sie nicht erhalten, werden sie entfernt.
        }
        $newtext.=$token;
    }
    return $newtext;
}

function getmstime(){
    return (substr(microtime(),11,10)+substr(microtime(),0,10));
}

function Zahlenformat($zahl)
{   # Formatierung von Zahlen (Tausendertrennzeichen)
    return number_format($zahl, 0, ',', '.');
}


function koinzidenzIndex($text)
{   # wahrscheinlichste Keyl�nge aus H�ufigkeiten der Buchstaben im deutschen Text, nach Friedman
    $kappa=0;
    $n=strlen($text);
    $hauf = hauf($text);
    for ($t=0;$t<count($hauf);$t++)
    {
        $kappa = ( $kappa + ( $hauf[$t] * ( $hauf[$t] - 1 ) ) );
    }
    if($n!=0)
    {
        $kappa = ( $kappa / ( $n * ( $n - 1 ) ) );
    }
    $ki = ( .0377 * $n / ( ($n-1) * $kappa - .0385 * $n + .0762 ) );
    return $ki;
}

function str_splitt($text)
{   # einen String zeichenweise in ein Array aufsplitten, war n�tig bei PHP4
    # entspricht der PHP5-Funktion str_split

    for($t=0;$t<strlen($text);$t++)
    {
        $arr[$t]=substr($text, $t, 1);
    }
    return $arr;
}

function array_flipp($arr)
{   # Array r�ckw�rts ausgeben
    $i=sizeof($arr);
    for($t=0;$t<$i;$t++)
    {
        $arr2[]=$arr[$i-$t-1];
    }
    return $arr2;
}

function akt($text)
{   # Autokorellation liefert Mustertreffer

    global $ungefiltert;   # true/false f�r farbliche Kennzeichnung signifikanter Werte

    $arr1=str_splitt($text);
    $sa1=sizeof($arr1);
    $arr2=@array_fill(0,($sa1/2),0);
    $sa2=sizeof($arr2);

    for($t=0;$t<($sa1/2);$t++)
    {
        $summe=0;
        for($u=0;$u<($sa1/2);$u++)
        {
            if( $arr1[$u]==$arr1[($u+$t)%($sa1)] )
            {
                $summe++;
            }
        }
        $arr2[$t]=$summe;
    }
    $am=@array_sum($arr2)/$sa2;
    for($t=0;$t<$sa1;$t++)
    {
        if($arr2[$t]>3*$am && !$ungefiltert) $arr2[$t]=4*$am;
    }
    return $arr2;
}

function ak_akt($text, $siz)
{   # Autokorrelation f�r Autokeychiffre

    $n=strlen($text)/$siz;
    for ($t=0;$t<$n;$t++)
    {
        $z=($t*$siz);
        $txt=substr($text, $z, $siz);
        $arr_tmp=akt($txt);
        $sat=sizeof($arr_tmp);

        if(is_array($arr2))
        {
             for ($x=0;$x<$sat;$x++)
             {
                 $arr2[$x]=$arr2[$x]+$arr_tmp[$x];
             }
        }
        else
        {
            $arr2=$arr_tmp;
        }
    }
    $am=@array_sum($arr2)/@sizeof($arr2);
    $sa2=sizeof($arr2);
    for($t=0;$t<$sa2;$t++)
    {
        if($arr2[$t]>3*$am && !$ungefiltert) $arr2[$t]=4*$am;
    }
    return $arr2;
}

function filterakt($arr2)
{   # gute Werte filtern, f�r Ausgabe auf 0 oder 100


	global $schw1;
    global $schw2;
    
    $am=@(@array_sum($arr2)/@sizeof($arr2));
    $sa2=sizeof($arr2);

    for($t=0;$t<$sa2;$t++)
    {
             switch((($arr2[$t]-$am*$schw1))>=$schw2)
             {
                 case 1:
                             $wert=100;
                             break;
                 default:
                             $wert=0;
                             break;
             }
             $arr[]=$wert;
    }
    return $arr;
}

function showakt($arr2,$height,$part,$width,$space,$ab)
{   # Trefferspektrum anzeigen
    # showakt($alfahier,50,1,5,3,0);

	$pfad = JURI::base(true) . "components/com_cto/tools/autokorrelation";
	//$pfad = JURI::base(true) . '/' . 'modules' . '/' . $CTOPluginName;

	global $schw1;
    global $schw2;

    $out.='<table border=0 cellspacing=0 cellpadding=0>';
    $out.= '<tr><td valign=bottom>';

    $am=@(@array_sum($arr2)/@sizeof($arr2));

    for($t=0;$t<sizeof($arr2)/$part;$t++)
    {   # nur die H�lfte des spektrums n�tig... weil Spiegelsymmetrisch $part=2;

        if($t>=$ab)
        {
             if(($arr2[$t]-$schw2)>($am*$schw1))
             {
                 $out.= '<img src='.$pfad.'/image/bar2.gif width='.$width.' height=';
                 $out.= @round($arr2[$t]/max(array_slice($arr2,0,sizeof($arr2)))*$height,0).'>';
             }
             else
             {
                 $out.= '<img src='.$pfad.'/image/bar.gif width='.$width.' height=';
                 $out.= @round($arr2[$t]/max(array_slice($arr2,0,sizeof($arr2)))*$height,0).'>';
             }
             if($space>0)
             {
                 $out.= '<img src='.$pfad.'/image/bar.gif width='.$space.' height=0>';
             }
        }
    }
    $out.= '</td></tr>';
    $out.= '<tr><td valign=bottom>';
    $out.= '</td></tr>';
    $out.= '</table>';
    return $out;
}

function keylen($arr)
{   # Keyl�nge ermitteln (h�ufigster Abstand der Maxima im Spektrum, Modus)

    $pos=0;
    for($t=0;$t<sizeof($arr)/2;$t++)
    {
        if($arr[$t]>0)
        {
            $tmp[$t-$pos]++;
            $pos=$t;
        }
    }
    $arr2=@array_fill(0,sizeof($tmp),0);
    return (@array_search(@max($tmp),$tmp));
}

function trennen($text, $num)
{   # Codetext in monoalfabetischen Buchstabenmengen aufteilen

    $txt=str_splitt($text);
    for($t=0;$t<sizeof($txt);$t++)
    {
        $strngs[$t%$num]=$strngs[$t%$num].$txt[$t];
    }
    return $strngs;
}

function findrot($text)
{   # Alfabetverschiebung finden

    global $AP;
    global $alfa;

    $VX=varianz($AP[de]);
    $SX=sqrt(varianz($AP[de]));
    $sp=hauf($text);
    $sps=array_sum($sp);

    for ($t=0;$t<sizeof($sp);$t++)
    {
        $sp[$t]=@round($sp[$t]/$sps*100,2);
    }
    for ($t=0;$t<sizeof($sp);$t++)
    {
        for ($u=0;$u<sizeof($sp);$u++)
        {
            $sp2[$u]=$sp[($t+$u)%sizeof($sp)];
        }
        $VY=varianz($sp2);
        $SY=sqrt(varianz($sp2));
        $cov=covarianz($AP[de], $sp2);
        $r[$t]=@abs($cov/sqrt($VX*$VY));
    }
    $b=array_search(max($r),$r);
    return $b;
}

function findmul($text)
{   # Alfabetmultiplikator finden

    global $AP;
    global $alfa;

    $mulzahl = teilerfremde(sizeof($alfa));
    $VX=varianz($AP[de]);
    $SX=sqrt(varianz($AP[de]));
    $sp=hauf($text);
    $sps=array_sum($sp);

    for ($t=0;$t<sizeof($sp);$t++)
    {
        $sp[$t]=@round($sp[$t]/$sps*100,2);
    }
    for ($t=0;$t<sizeof($mulzahl);$t++)
    {
        for ($u=0;$u<sizeof($sp);$u++)
        {
            $sp2[$u]=$sp[($mulzahl[$t]*$u)%sizeof($sp)];
        }
        $VY=varianz($sp2);
        $SY=sqrt(varianz($sp2));
        $cov=covarianz($AP[de], $sp2);
        $r[$t]=@abs($cov/sqrt($VX*$VY));
    }
    $b=array_search(max($r),$r);
    return $mulzahl[$b];
}

function findpw($text, $pwl)
{   # Passwort ermitteln f�r Vigen�re

    global $alfa;

    $texte = trennen($text, $pwl);

    for($t=0;$t<sizeof($texte);$t++)
    {
        $rot[$t]=findrot($texte[$t]);
        $pass=$pass.buchstabeVonIndex($alfa, $rot[$t]);
    }
    return $pass;
}

function findpw_ak($text, $pwl)
{   # Passwort ermitteln f�r Autokey

    global $alfa;
    global $AP;

    $texte = trennen($text, $pwl);
    for($t=0;$t<sizeof($texte);$t++)
    {
        unset($arr);
        for ($u=0;$u<sizeof($alfa);$u++)
        {
            $arr[]=koinzidenzIndex(dekAutokey($texte[$t],$alfa[$u],$alfa));
        }
        #echo '<br>';
        $y[$t][0]=array_search(min($arr),$arr);
        #echo $alfa[$y[$t][0]].$y[$t][0]." ";
        $arr2=array_merge(array_slice($arr, 0, $y[$t][0]-1), array_slice($arr, $y[$t][0]+1, sizeof($arr)));
        $y[$t][1]=array_search(min($arr2),$arr2);
        if($y[$t][1]>=$y[$t][0])
        {
            $y[$t][1]++;
            $y[$t][1]++;
        }
        #echo $alfa[$y[$t][1]].$y[$t][1];
        $rot1=abs(13-findrot(dekAutokey($texte[$t],$alfa[$y[$t][0]],$alfa)));
        $rot2=abs(13-findrot(dekAutokey($texte[$t],$alfa[$y[$t][1]],$alfa)));
        #echo ' '.$rot1.' '.$rot2;
        if($rot1==13){
             $letter=$alfa[$y[$t][0]];
        }
        if($rot2==13) {
             $letter=$alfa[$y[$t][1]];
        }
        $pass=$pass.$letter;
    }
    return $pass;
}

function ngramme($codtxt, $n)
{   # N-Gramme suchen

    global $alfa36;   # A-Z, 0-9

    switch($n){
        default :
        case 1:    for($a=0;$a<sizeof($alfa36);$a++)
                   {
                       $needle=$alfa36[$a];
                       $wert=substr_count($codtxt, $needle);
                       if ($wert>0) $res[$needle]=$wert;
                   }
                   break;
        case 2:    for($a=0;$a<sizeof($alfa36);$a++)
                   {
                       for($b=0;$b<sizeof($alfa36);$b++)
                       {
                           $needle=$alfa36[$a].$alfa36[$b];
                           $wert=substr_count($codtxt, $needle);
                           if ($wert>0) $res[$needle]=$wert;
                       }
                   }
                   break;
        case 3:    for($a=0;$a<sizeof($alfa36);$a++)
                   {
                       for($b=0;$b<sizeof($alfa36);$b++)
                       {
                           for($c=0;$c<sizeof($alfa36);$c++)
                           {
                               $needle=$alfa36[$a].$alfa36[$b].$alfa36[$c];
                               $wert=substr_count($codtxt, $needle);
                               if ($wert>0) $res[$needle]=$wert;
                           }
                       }
                   }
                   break;
        case 4:    for($a=0;$a<sizeof($alfa36);$a++)
                   {
                       for($b=0;$b<sizeof($alfa36);$b++)
                       {
                           for($c=0;$c<sizeof($alfa36);$c++)
                           {
                               for($d=0;$d<sizeof($alfa36);$d++)
                               {
                                   $needle=$alfa36[$a].$alfa36[$b].$alfa36[$c].$alfa36[$d];
                                   $wert=substr_count($codtxt, $needle);
                                   if ($wert>0) $res[$needle]=$wert;
                               }
                           }
                       }
                   }
                   break;
    }

    array_multisort($res,SORT_NUMERIC, SORT_DESC);
    return $res;
}

function ngrshow($mo,$bi,$tr,$qu,$num,$max)
{   # Ausgabe f�r die N-Gramme

    $text = '<table border=1 cellspacing=0 cellpadding=0>';

    $text.= '<tr>';
    $text.= '<td align=right><b>Nr.</td>';
    if ( is_array($mo) )
    {
        $text.= '<td width=150 colspan=3 align=center><b>Histogramm</td>';
    }
    if ( is_array($bi) )
    {
        $text.= '<td width=150 colspan=3 align=center><b>2-Gramme</td>';
    }
    if ( is_array($tr) )
    {
        $text.= '<td width=150 colspan=3 align=center><b>3-Gramme</td>';
    }
    if ( is_array($qu) )
    {
        $text.= '<td width=150 colspan=3 align=center><b>4-Gramme</td>';
    }
    $text.= '</tr>';

    for ($t=0;$t<$num;$t++)
    {
        if ($mo[$t][1]>0||$bi[$t][1]>0||$tr[$t][1]>0)
        {
            $text.= '<tr>';
            $text.= '<td align=right><b> '.(1+$t).'.</b></td>';
            if ( is_array($mo) )
            {
                if ($mo[$t][1]>0)
                {
                    $text.= '<td width=50 align=center><b>'.$mo[$t][0].'</td>';
                    $text.= '<td width=50 align=center>'.$mo[$t][1].'</td>';
                    $text.= '<td width=50 align=center>'.@round(100*($mo[$t][1]/$max),2).'%</td>';
                }
                else
                {
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                }
            }
            if ( is_array($bi) )
            {
                if ($bi[$t][1]>0)
                {
                    $text.= '<td width=50 align=center><b>'.$bi[$t][0].'</td>';
                    $text.= '<td width=50 align=center>'.$bi[$t][1].'</td>';
                    $text.= '<td width=50 align=center>'.@round(100*($bi[$t][1]/$max),2).'%</td>';
                }
                else
                {
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                }
            }
            if ( is_array($tr) )
            {
                if ($tr[$t][1]>0)
                {
                    $text.= '<td width=50 align=center><b>'.$tr[$t][0].'</td>';
                    $text.= '<td width=50 align=center>'.$tr[$t][1].'</td>';
                    $text.= '<td width=50 align=center>'.@round(100*($tr[$t][1]/$max),2).'%</td>';
                }
                else
                {
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                }
            }
            if ( is_array($qu) )
            {
                if ($qu[$t][1]>0)
                {
                    $text.= '<td width=50 align=center><b>'.$qu[$t][0].'</td>';
                    $text.= '<td width=50 align=center>'.$qu[$t][1].'</td>';
                    $text.= '<td width=50 align=center>'.@round(100*($qu[$t][1]/$max),2).'%</td>';
                }
                else
                {
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                    $text.='<td width=50 align=center><b>&nbsp;</td>';
                }
            }
            $text.= '</tr>';
        }
        else
        {
            break;
        }
    }
    $text.= '</table><br>';
    return $text;
}

function abstaende($text, $needle)
{   # Abst�nde zwischen Zeichenketten

    global $alfa;

    $text=strtoupper($text);
    $t=true;
    do
    {
       $text = substr($text, $pos+strlen($needle));
       $pos = strpos ($text, $needle);
       if ($pos === false)
       {
           break;
       }
       $pt=$pt+$pos+strlen($needle);
       $poss[]=$pt;
    }while($t);

    for($t=0;$t<sizeof($poss)-1;$t++)
    {
       $wert = ($poss[$t+1] - $poss[$t]);
       $abb[] = $wert;
    }

    return $abb;
}


?>