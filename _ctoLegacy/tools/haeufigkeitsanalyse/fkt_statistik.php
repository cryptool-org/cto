<?
defined('_JEXEC') or die('Restricted access');
########################################################
##
## Bibliothek für Statistik-Funktionen
##
########################################################
$ksbVersion[]=array('Statistik-Bibliothek','1.0','20060610', 'Marcel Brätz');

function gvmass($text, $alfa)
{   # Gleichverteilungsmaß des Textes über dem Zeichensatz

    $wert=sizeof($alfa);
    return pow(2,entropie($text))/$wert;
}

function gvmass2($codtxt, $alfa)
{   # wie Gleichverteilungsmaß, aber nur bezogen auf die enthaltenen Zeichen

    $i=sizeof($alfa);
    for($t=0;$t<$i;$t++)
    {
        if($alfa[$t]>0) $alfa2[]=$alfa[$t];
    }
    $wert=sizeof($alfa2);
    if ($wert!=0) $wert=@pow(2,@entropie($codtxt))/$wert;
    return $wert;
}
function entropie2($text,$alfa)
{   # binärer Informationsgehalt, bezogen Eingabezeichensatz

    $hauf = haufigk($text,$alfa);

    for ($t=0;$t<count($hauf);$t++)
    {
        $p=prob($hauf[$t],strlen($text));
        if($p>0)
        {
            $z=$p*log($p)/log(2);
        }
        else
        {
            $z=0;
        }
        $ent=($ent+$z);
    }
    $ent=(-$ent);
    return $ent;
}
function entropie($text)
{   # binärer Informationsgehalt, bezogen auf den Standardzeichensatz

    global $alfa;

    $hauf = hauf($text);

    for ($t=0;$t<count($hauf);$t++)
    {
        $p=prob($hauf[$t],strlen($text));
        if($p>0)
        {
            $z=$p*log($p)/log(2);
        }
        else
        {
            $z=0;
        }
        $ent=($ent+$z);
    }
    $ent=(-$ent);
    return $ent;
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

function keys($num, $sizalfa)
{   # sieht aus wie eine Berechnung zur Anzahl der Permutationen ohne Wiederholung

    return fak($sizalfa)/fak($sizalfa-$num);
}

function prob($x,$y)
{   # rel Häufgkeit; x zu y

    if($y==0) $y=-1;
    return ($x/$y);
}

function hauf($text)
{   # absolute Häufigkeiten der Buchstaben, bezogen auf den Standardzeichensatz
    # veraltet

    global $alfa;

    $hauf=@array_fill(0,sizeof($alfa),0);

    for ($t=0;$t<strlen($text);$t++)
    {
        $zeichen        = substr($text,$t,1);
        $index          = indexVonBuchstabe($alfa,$zeichen);
        $hauf[$index]   = ($hauf[$index]+1);
    }
    return $hauf;
}

function haufigk($text, $alfa)
{   # absolute Häufigkeiten der Buchstaben aus dem Alphabet

    $hauf=@array_fill(0,sizeof($alfa),0);

    for ($t=0;$t<strlen($text);$t++)
    {
        $zeichen        = substr($text,$t,1);
        $index          = indexVonBuchstabe($alfa,$zeichen);
        $hauf[$index]   = ($hauf[$index]+1);
    }
    return $hauf;
}

function varianz($arr)
{   # Varianz

    $x=mittelwert($arr);
    for ($t=0;$t<sizeof($arr);$t++)
    {
        $n=$arr[$t];
        $m=(($n-$x))*(($n-$x));
        $summe=$summe + $m;
    }
    return ($summe/sizeof($arr));
}

function covarianz($arr, $arr2)
{   # Co-Varianz

    if (sizeof($arr)!=sizeof($arr))
    {
        return 'error';
    }
    else
    {
        $x=mittelwert($arr);
        $y=mittelwert($arr2);
        for ($t=0;$t<sizeof($arr);$t++)
        {
            $summe=$summe+($arr[$t]-$x)*($arr2[$t]-$y);
        }
        return $summe/sizeof($arr);
    }
}

function mittelwert($arr)
{   #Mittelwert

    for ($t=0;$t<sizeof($arr);$t++)
    {
        $summe=$summe+$arr[$t];
    }
    return $summe/sizeof($arr);
}

function teilerfremde($zahl)
{
    $teiler=gzt($zahl);
    for ($t=1;$t<sizeof($teiler);$t++)
    {
        for($s=1;$s<=ceil($zahl/$teiler[$t]);$s++)
        {
            $teiler2[]=$s*$teiler[$t];
        }
    }
    $teiler=array_unique($teiler2);
    for($s=1;$s<=$zahl;$s++)
    {
        if (!in_array($s,$teiler))
        {
            $mulzahl[]=$s;
        }
    }
    return $mulzahl;
}

function gzt($n)
{   # Alle ganzzahligen Teiler von $n

    $t=1;
    $i=0;
    while($t<=$n)
    {
        if(($n%$t)==0)
        {
            $liste[] = $t;
            $i++;
        }
        $t++;
    }
    return $liste;
}

function autokorrelation($text)
{   # Autokorellation liefert Mustertreffer

    $arr1=str_split($text.$text);
    $sa1=count($arr1);
    $sa2=floor($sa1/2);

    for($t=0;$t<$sa2;$t++)
    {
        $summe=0;
        for($u=0;$u<$sa2;$u++)
        {
            if( $arr1[$u]==$arr1[($u+$t)%($sa1)] )
            {
                $summe++;
            }
        }
        $arr2[$t]=$summe;
    }
    return $arr2;
}
?>