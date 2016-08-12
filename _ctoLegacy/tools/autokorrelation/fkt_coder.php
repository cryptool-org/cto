<?
defined('_JEXEC') or die('Restricted access');
########################################################
## Bibliothek für Kodier und Dekodieralgorithmen
########################################################
#$ksbVersion[]=array('Chiffren-Bibliothek','1.81','20060917','Marcel Brätz');

########################################################
## Enigma M3 v1.0 (beta)
########################################################
$cipherVersion[]=array('Enigma M3','1.0','20060601','Andreas Hauschild, Matthias Luttenberger');
#include "fkt_coder_enigma.php";

########################################################
## Spaltentausch-Chiffre v1.1
########################################################
$cipherVersion[]=array('Spaltentauschchiffre','1.1','20060501','Marcel Brätz');
function revers($tpv)
{ # dreht die Transpositionsvorschrift einfach um.
    foreach ($tpv as $key => $val)
    {
        $out[$val]=$key;
    }
    return $out;
}

function spacefill($text,$key)
{ # Diese Funktion fügt die für die Rücktransformation
  # notwendigen Leerzeichen wieder ein
    $tl=strlen($text);
    $kl=strlen($key);
    $r=$tl%$kl;
    $wert=transpVorschrift($key);
    if ($r>0)
    {
        $out=substr($text,0,$tl-$r);
        $n=count($wert);
        $i=0;
        for ($t=0;$t<$n;$t++)
        {
            if ($wert[$t]>=$r)
            {
                $out.=" ";
            }
            else
            {
                $out.=substr($text,$tl-$r+$i,1);
                $i++;
            }
        }
    }
    else
    {
        $out=$text;
    }
    return $out;
}

function transpVorschrift($key)
{ # erzeugt eine Tauschvorschrift aus einem Wort
  # die Buchstaben werden dabei einfach sortiert
  # aus BLA würde 201 --> A:pos 2, B:pos 0, L:pos 1
    $obj=str_split($key);
    $sub=array_unique($obj);

    sort($sub);

    for ($t=0;$t<count($sub);$t++)
    {
        $token=$sub[$t];
        if ($t==0)
        {
            $wert=array_keys($obj,$token);
        }else{
            $wert=array_merge($wert,array_keys($obj,$token));
        }
    }
    return $wert;
}

function stelleUmEnc($text,$vs)
{ # wendet die Transpositionsvorschrift blockweise an
    $num=count($vs);
    $l=strlen($text);
    $x=$num-($l%$num);
    $res="";
    for ($t=0;$t<$l;$t+=$num)
    {
        $token=substr($text,$t,$num);
        for ($i=0;$i<$num;$i++)
        {
            $c=substr($token,$vs[$i],1);
            $res.=$c;
        }
    }
    return $res;
}

########################################################
## Playfair-Chiffre v1.0
########################################################
$cipherVersion[]=array('Playfair-Chiffre','1.0','20060213','Marcel Brätz');
function preKodPlayfair($orgtxt)
{
    $orgtxt2='';
    $codtxt='';
    for ($t=0;$t<strlen($orgtxt);$t++)
    {
        $str1=substr($orgtxt,$t,1);
        $str2=substr($orgtxt,$t+1,1);
        $fill='';
        if ($str1==$str2)
        {
            $fill='X';
        }
        $orgtxt2.=$str1.$fill;
    }
    if (strlen($orgtxt2)%2!=0) {$orgtxt2.='A';}
    return $orgtxt2;
}
function postDekPlayfair($orgtxt2)
{
    for ($t=0;$t<strlen($orgtxt2);$t++)
    {
        $str1=substr($orgtxt2,$t,1);
        $str2=substr($orgtxt2,$t+1,1);
        $str3=substr($orgtxt2,$t+2,1);
        if ($str1==$str3 && $str2=='X') {$t++;}
        $orgtxt.=$str1;
    }
    if(strlen($orgtxt2)%2==0 && substr($orgtxt2,strlen($orgtxt2)-1,1)=='A')
    {
        $orgtxt=substr($orgtxt,0,strlen($orgtxt)-1);
    }
    return $orgtxt;
}
function kodPlayfair($orgtxt2,$polyquad)
{
    for ($t=0;$t<strlen($orgtxt2);$t+=2)
    {
        $str1=substr($orgtxt2,$t,1);
        $str2=substr($orgtxt2,$t+1,1);
        $key1=array_search($str1,$polyquad);
        $key2=array_search($str2,$polyquad);
        $z1=substr($key1,0,1);
        $s1=substr($key1,1,1);
        $z2=substr($key2,0,1);
        $s2=substr($key2,1,1);
        if($z1<>$z2 && $s1<>$s2)
        {
            $codtxt.=$polyquad[$z1.$s2].$polyquad[$z2.$s1];
        }
        if ($z1==$z2)
        {
            if($s1<5){$S1=$s1+1;}else{$S1=1;}
            if($s2<5){$S2=$s2+1;}else{$S2=1;}
            $codtxt.=$polyquad[$z1.$S1].$polyquad[$z2.$S2];
        }
        if ($s1==$s2)
        {
            if($z1<5){$Z1=$z1+1;}else{$Z1=1;}
            if($z2<5){$Z2=$z2+1;}else{$Z2=1;}
            $codtxt.=$polyquad[$Z1.$s1].$polyquad[$Z2.$s2];
        }
    }
    return $codtxt;
}
function dekPlayfair($codtxt,$polyquad)
{
    for ($t=0;$t<strlen($codtxt);$t+=2)
    {
        $str1=substr($codtxt,$t,1);
        $str2=substr($codtxt,$t+1,1);
        $key1=array_search($str1,$polyquad);
        $key2=array_search($str2,$polyquad);
        $z1=substr($key1,0,1);
        $s1=substr($key1,1,1);
        $z2=substr($key2,0,1);
        $s2=substr($key2,1,1);
        if($z1<>$z2 && $s1<>$s2)
        {
            $orgtxt2.=$polyquad[$z1.$s2].$polyquad[$z2.$s1];
        }
        if ($z1==$z2)
        {
            if($s1>1){$S1=$s1-1;}else{$S1=5;}
            if($s2>1){$S2=$s2-1;}else{$S2=5;}
            $orgtxt2.=$polyquad[$z1.$S1].$polyquad[$z2.$S2];
        }
        if ($s1==$s2)
        {
            if($z1>1){$Z1=$z1-1;}else{$Z1=5;}
            if($z2>1){$Z2=$z2-1;}else{$Z2=5;}
            $orgtxt2.=$polyquad[$Z1.$s1].$polyquad[$Z2.$s2];
        }
    }
    return $orgtxt2;
}

########################################################
## Homophone Chiffre v1.0
########################################################
$cipherVersion[]=array('Homophone Chiffre','1.0','20041017','Marcel Brätz');
function kodhomo($orgtxt, $alfah, $alfa)
{
    $codtxt="";
    for ($t=0;$t<strlen($orgtxt);$t++)
    {
            $buch=$alfah[indexVonBuchstabe($alfa,substr($orgtxt,$t,1))];
            mt_srand();
            $codtxt.=$buch[round(mt_rand(0,count($buch)-1),0)];
    }
    return $codtxt;
}
function dekhomo($codtxt, $alfah, $alfa)
{
    $orgtxt="";
    for ($t=0;$t<strlen($codtxt);$t=$t+2)
    {
        for ($s=0;$s<sizeof($alfa);$s++)
        {
            $buch=$s;
            if (in_array(substr($codtxt,$t,2),$alfah[$s]))
            {
                break;
            }
        }
        $orgtxt.=buchstabeVonIndex($alfa,$buch);
    }
    return $orgtxt;
}

########################################################
## Porta-Chiffre v1.0
########################################################
$cipherVersion[]=array('Porta-Chiffre','1.0','20040303','Marcel Brätz');
function portaalfa($kb,$alfa)
{
    $basis=ceil(count($alfa)/2);
    for($tt=0;$tt<$basis;$tt++)
    {
        $text[]=$alfa[$tt];
    }
    for($tt=0;$tt<$basis;$tt++)
    {
        $text[]=$alfa[$basis+($tt-floor($kb/2)+$basis)%$basis];
    }
    return $text;
}
function enporta($orgtxt,$key,$alfa)
{
    $laengetxt=strlen($orgtxt);
    $laengekey=trim(strlen($key));
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $keytxt .= substr($key,($t%$laengekey),1);
    }
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $wertkey  = indexVonBuchstabe($alfa,substr($keytxt,$t,1));
        $codtxt   = $codtxt.substituiere(substr($orgtxt,$t,1),portaalfa($wertkey,$alfa),rotieren(portaalfa($wertkey,$alfa),count($alfa)/2));
    }
    return $codtxt;
}

########################################################
## Autokey-Chiffre v1.0, baut auf Vigenère-Chiffre auf
########################################################
$cipherVersion[]=array('Autokey-Chiffre','1.0','20040502','Marcel Brätz');
function kodAutokey($orgtxt, $key, $alfa)
{
    $key2 = $key.$orgtxt;
    $codtxt= kodieren($orgtxt, $key2, $alfa);
    return $codtxt;
}
function dekAutokey($codtxt, $key, $alfa)
{
    $offset=strlen($key);
    $orgtxt=dekodieren(substr($codtxt,0,$offset), $key, $alfa);
    for ($t=$offset;$t<(strlen($codtxt));$t++)
    {
        $orgtxt.=dekodieren(substr($codtxt,$t,1), substr($orgtxt,$t-$offset,1), $alfa);
    }
    return $orgtxt;
}

########################################################
## Vigenère-Chiffre v1.0
########################################################
$cipherVersion[]=array('Vigenère-Chiffre','1.0','20040501','Marcel Brätz');
function kodieren($orgtxt,$key,$alfa)
{
    // Buchstabenweise Verchiebekodierung
    // monoalfabetisch bei Schlüssellänge 1
    // sonst polyalphabetisch
    $laengetxt=strlen($orgtxt);
    $laengekey=trim(strlen($key));
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $keytxt .= substr($key,($t%$laengekey),1);
    }
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $wertbuch = indexVonBuchstabe($alfa,substr($orgtxt,$t,1));
        $wertkey  = indexVonBuchstabe($alfa,substr($keytxt,$t,1));
        $codtxt   = $codtxt.buchstabeVonIndex($alfa,($wertbuch+$wertkey)%sizeof($alfa));
    }
    return $codtxt;
}
function dekodieren($codtxt,$key,$alfa)
{
    // siehe kodieren
    $laengetxt=strlen($codtxt);
    $laengekey=strlen($key);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $keytxt .= substr($key,($t%$laengekey),1);
    }
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $wertbuch = indexVonBuchstabe($alfa,substr($codtxt,$t,1));
        $wertkey  = indexVonBuchstabe($alfa,substr($keytxt,$t,1));
        if ($wertbuch<$wertkey)
        {
            $wertbuch=$wertbuch+sizeof($alfa);
        }
        $orgtxt   = $orgtxt.buchstabeVonIndex($alfa,($wertbuch-$wertkey)%sizeof($alfa));
    }
    return $orgtxt;
}

########################################################
## Beaufort-Chiffre v1.0
########################################################
$cipherVersion[]=array('Beaufort-Chiffre','1.0','20040511','Marcel Brätz');
function enbeaufort($orgtxt,$key,$alfa)
{
    // Buchstabenweise Verchiebekodierung
    // monoalfabetisch bei Schlüssellänge 1
    // sonst polyalphabetisch
    $laengetxt=strlen($orgtxt);
    $laengekey=strlen($key);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $keytxt .= substr($key,($t%$laengekey),1);
    }
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $wertbuch = indexVonBuchstabe($alfa,substr($orgtxt,$t,1));
        $wertkey  = indexVonBuchstabe($alfa,substr($keytxt,$t,1));
        $codtxt   = $codtxt.buchstabeVonIndex($alfa,($wertkey-$wertbuch+sizeof($alfa))%sizeof($alfa));
    }
    return $codtxt;
}
function debeaufort($codtxt,$key,$alfa)
{
    // siehe kodieren
    $laengetxt=strlen($codtxt);
    $laengekey=strlen($key);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $keytxt .= substr($key,($t%$laengekey),1);
    }
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $wertbuch = indexVonBuchstabe($alfa,substr($codtxt,$t,1));
        $wertkey  = indexVonBuchstabe($alfa,substr($keytxt,$t,1));
        if ($wertbuch<$wertkey)
        {
            $wertbuch=$wertbuch+sizeof($alfa);
        }
        $orgtxt   = $orgtxt.buchstabeVonIndex($alfa,($wertkey-($wertbuch-sizeof($alfa)))%sizeof($alfa));
    }
    return $orgtxt;
}

########################################################
## Bacon-Kodierung
########################################################
$cipherVersion[]=array('Bacon-Kodierung','1.2','20060521','Marcel Brätz');
function libsex_encode($orgtxt,$alfa)
{
    $alfalib=$alfa;
    $orgtxt=str_replace(' ','',$orgtxt);
    $laengetxt=strlen($orgtxt);
    for ($t=0;$t<$laengetxt;$t++)
    {
         $num=decbin(indexVonBuchstabe($alfalib,substr($orgtxt,$t,1)));
         $num=str_repeat('0',(5-strlen($num))).$num;
         $codtxt .= $num;
    }

    return $codtxt;
}
function libsex_decode($codtxt,$alfa)
{
    $alfalib=$alfa;
    $codtxt=str_replace(' ','',strtolower($codtxt));
    $laengetxt=strlen($codtxt);
    for($t=0;$t<$laengetxt;$t=$t+5)
    {
        $orgtxt = $orgtxt.buchstabeVonIndex($alfalib,(bindec(substr($codtxt,$t,5))));
    }
    return $orgtxt;
}

########################################################
## Morsen v1.1
########################################################
$cipherVersion[]=array('Morse-Code','1.1','20040602','Marcel Brätz');
function toMorse($orgtxt)
{
    $orgtxt=trim($orgtxt);
    global $morse;
    for($t=0;$t<sizeof($morse[0]);$t=$t+1)
    {
        $malfa[] = ord($morse[0][$t]);
    }
    $laengetxt=strlen($orgtxt);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $test     =  array_search(ord(strtoupper(substr($orgtxt,$t,1))),$malfa);
        $codtxt   = $codtxt.$morse[1][ $test ].' ';
    }
    return $codtxt;
}
function fromMorse($codtxt)
{
    $codtxt=explode(' ',trim($codtxt));
    global $morse;
    $laengetxt=sizeof($codtxt);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $test     =  array_search($codtxt[$t],$morse[1]);
        $orgtxt   =  $orgtxt.$morse[0][ $test ];
    }
    return $orgtxt;
}
########################################################
## Binärkodierung v1.0
########################################################
$cipherVersion[]=array('ISO 8859-1 ASCII','1.0','20030210','Marcel Brätz');
function tobin($orgtxt)
{
    $laengetxt=strlen($orgtxt);
    for($t=0;$t<$laengetxt;$t=$t+1){
        $codtxt   = $codtxt.bincod(ord(substr($orgtxt,$t,1))).' ';
    }
    return $codtxt;
}

function bincod($zahl)
{
    $cod=decbin($zahl);
    $l=strlen($cod);
    if ($l<8)
    {
        $cod = str_repeat('0',(8-$l)).$cod;
    }
    return $cod;
}
function frobin($codtxt)
{
    $codtxt=str_replace(' ','',$codtxt);
    $laengetxt=strlen($codtxt);
    for($t=0;$t<$laengetxt;$t=$t+8)
    {
        $orgtxt = $orgtxt.chr(bindec(substr($codtxt,$t,8)));
    }
    return $orgtxt;
}
########################################################
## Monoalphabetische Ersetzung
########################################################
$cipherVersion[]=array('Monoalphabetische Ersetzung','1.0','20040324','Marcel Brätz');
function substituiere($text, $alfa1, $alfa2)
{
    // Algorithmus zur Umsetzung eines Textes aus einem Alfabet in ein anderes
    // dies ist eine Ersetzung des Zeichen aus alfa1 durch das Zeichen an der selben Stelle in alfa2
    $laengetxt=strlen($text);
    for($t=0;$t<$laengetxt;$t=$t+1)
    {
        $buchstabe = buchstabeVonIndex($alfa2, indexVonBuchstabe($alfa1,substr($text,$t,1)));
        $codtext   = $codtext.$buchstabe;
    }
    return $codtext;
}
########################################################
## Transponier-Algorithmus (Skytale, Caesarquadrat)
########################################################
$cipherVersion[]=array('Transponieralgorithmus','1.0','20040412','Marcel Brätz');
function transponiere($text, $key, $fill)
{
    // Algorithmus für Skytale
    if (strlen($text)>0)
    {
        $länge=strlen($text);
        $key2=(ceil(strlen($text)/$key));
        if($fill>0)
        {
            // dieser Teil füllt die Matrix um so viele Zeichen auf,
            // bis man die Buchstaben genau in ein Rechteck anordnen kann. ($key*$key2)
            // dies ist beim dekodieren nötig, da man den unteren Teil des Algorithmus
            // wegschmeissen kann, aber so ist der Code wiederverwendbar.
            $rows=abs($länge-($key*$key2));
            $txt='';
            for($t=1;$t<=$rows;$t++)
            {
                $part=substr($text,$länge-($t*($key-1)),$key-1);
                $txt=$part.' '.$txt;
            }
            for($n=($key2-$rows-1);$n>=0;$n--)
            {
                $part=substr($text,($n*$key),$key);
                $txt=$part.$txt;
            }
            $text=$txt;
            unset($txt);
        }
        // ab hier beginnt der eigentliche Skytale-Algorithmus
        $n=0;
        for($t=0;$t<$länge;$t=$t+$key)
        {
            $txt[$n]=substr($text,$t,$key);
            $n++;
        }
        for($n=0;$n<$key;$n++)
        {
            for($t=0;$t<$key2;$t++)
            {
                $buchstabe=substr($txt[$t],$n,1);
                $text2.=$buchstabe;
            }
        }
    }
    return $text2;
}
########################################################
## Hex-Kodierung
########################################################
$cipherVersion[]=array('Hex-Kodierung','1.0','20040412','Marcel Brätz');
function txt2hex($txt)
{
   $ln=strlen($txt);
   for ($t=0;$t<$ln;$t++)
   {
       $num=ord(substr($txt,$t,1));
       $thing = dechex($num);
       $txt2.= $thing;
   }
   return strtoupper($txt2);

}

function hex2txt($txt)
{
   $ln=strlen($txt);
   for ($t=0;$t<$ln;$t=$t+2)
   {
       $num=substr($txt,$t,2);
       $num2=hexdec(strtoupper($num));
       $thing = chr($num2);
       $txt2.= $thing;
   }
   return $txt2;

}
########################################################
## Wolseley, Kamasutra
########################################################
function makereflexive($alfa)
{   # macht aus array(a,b,c,d)
    # array(array(a,b),array(d,c))

    $a[0]=array_slice($alfa,0,count($alfa)/2);
    $a[1]=array_reverse(array_slice($alfa,count($alfa)/2,count($alfa)/2));
    return $a;
}
function ukw($eingabe,$a)
{
    $w[0]=array_search($eingabe,$a[0]);
    $w[1]=array_search($eingabe,$a[1]);
    if (is_int($w[0])) $tmp=$a[1][$w[0]];
    if (is_int($w[1])) $tmp=$a[0][$w[1]];
    return $tmp;
}
########################################################
## Pollux-Chiffre
########################################################
$cipherVersion[]=array('Pollux-Chiffre','2.0','20060609','Florian Haker, Sven Radelof');
function encPollux($morse,$eingabe)
{
    $alles=str_split($morse);
    foreach($alles as $zeichen)
    {
        switch($zeichen)
        {
            case ' ':
                        $out.=$eingabe[0][rand(0,count($eingabe[0])-1)];
                        break;
            case '-':
                        $out.=$eingabe[1][rand(0,count($eingabe[1])-1)];
                        break;
            case '.':
                        $out.=$eingabe[2][rand(0,count($eingabe[2])-1)];
                        break;
        }
    }
    return $out;
}

function decPollux($code,$eingabe)
{
    $alles=str_split($code);
    foreach($alles as $zeichen)
    {
        $a1=array_search($zeichen,$eingabe[0]);
        $a2=array_search($zeichen,$eingabe[1]);
        $a3=array_search($zeichen,$eingabe[2]);
        if(is_int($a1)) $out.=' ';
        if(is_int($a2)) $out.='-';
        if(is_int($a3)) $out.='.';
    }
    return $out;
}
########################################################
## Polybios
########################################################
$cipherVersion[]=array('Polybios','1.0','20060209','Marcel Brätz');
function decodePolybios($codtxt,$polyquad)
{
    for ($t=0;$t<strlen($codtxt);$t+=2)
    {
        $orgtxt.=$polyquad[substr($codtxt,$t,2)];
    }
    return $orgtxt;
}
function encodePolybios($orgtxt,$polyquad)
{
    for ($t=0;$t<strlen($orgtxt);$t++)
    {
        $codtxt.=array_search(substr($orgtxt,$t,1),$polyquad);
    }
    return $codtxt;
}
function createPolybiosSquare($kkey,$alfa25,$mode)
{
    if (strlen(trim($kkey))>0)
    {
        $alfa2=array_merge(array_unique(str_split($kkey)),array_diff($alfa25[$mode],str_split($kkey)));
    }
    else
    {
        $alfa2=$alfa25[$mode];
    }
    $polyquad=array_combine($alfa25[index],$alfa2);
    return $polyquad;
}
########################################################
## Gronsfeld-Chiffre, abgewandelte Vigenère-Chiffre
########################################################
$cipherVersion[]=array('Gronsfeld-Chiffre','2.0','20060602','Frank Lange, Sebastian Rehberg');
function engronsfeld($orgtxt,$key,$alfa)
{
  // Verschluesselt Texte mit Zahlenschluessel
  // Verschiebt Schluesselalphabet um Wert der Ziffer nach links
  if(strlen($key)==0) $key=0;
  $laengetxt=strlen($orgtxt);
  $laengekey=strlen($key);
  for($t=0;$t<$laengetxt;$t=$t+1)
  {
    $keyt=substr($key,($t%$laengekey),1);
    // Nur reine Zahlenschluessel werden zugelassen, sonst Abbruch
    if($keyt > '-1' && $keyt < '10')
    {
      $keytxt.=$keyt;
    }
    else{
      return -1;
    }
  }
  for($t=0;$t<$laengetxt;$t++)
  {
    $wertbuch = indexVonBuchstabe($alfa,substr($orgtxt,$t,1));
    $wertkey  = substr($keytxt,$t,1);
    $codtxt   = $codtxt.buchstabeVonIndex($alfa,($wertbuch+$wertkey)%sizeof($alfa));
  }
  return $codtxt;
}
function degronsfeld($codtxt,$key,$alfa)
{
  // siehe kogronsfeld
  if(strlen($key)==0) $key=0;
  $laengetxt=strlen($codtxt);
  $laengekey=strlen($key);
  for($t=0;$t<$laengetxt;$t=$t+1)
  {
    $keyt= substr($key,($t%$laengekey),1);
    if($keyt > '-1' && $keyt < '10')
    {
      $keytxt.=$keyt;
    }
    else{
      return -1;
    }
  }
  for($t=0; $t<$laengetxt; $t++)
  {
    $wertbuch = indexVonBuchstabe($alfa,substr($codtxt,$t,1));
    $wertkey  = substr($keytxt,$t,1);
    if ($wertbuch<$wertkey)
    {
      $wertbuch = $wertbuch+sizeof($alfa);
    }
    $orgtxt = $orgtxt.buchstabeVonIndex($alfa,($wertbuch-$wertkey)%sizeof($alfa));
  }
  return $orgtxt;
}
########################################################
## Larrabee-Chiffre basiert auf Vigenère-Chiffre
########################################################
$cipherVersion[]=array('Larrabee-Chiffre','1.2','20060602','Frank Lange, Sebastian Rehberg, Marcel Brätz');
function enlarrabee($text,$alfa,$alfanum)
{   # Sucht Zahlen in einem String und wendet Larrabee-Chiffre fuer Zahlen an:
    # Anfang wird mit "Q" makiert
    # Laenge Zahl und Ziffern werden als Buchstaben codiert: 1..9,0 -> A..I,J
    $arr=str_split($text.'A');
    $n=count($arr);
    $zahl=false;

    for ($t=0;$t<$n;$t++)
    {
        $c1=$arr[$t];
        $int1=array_search($c1,$alfanum);
        $buch1=array_search($c1,$alfa);
        if ($i>=10)
        {
            $out.=$alfa[$i-1];
            $out.=$tmp;
            $zahl=false;
            unset($tmp);
        }
        if ($zahl)
        {
            if(is_int($int1))
            {
                $i++;
                $tmp.=$alfa[$int1];
            }
            else
            {
                $out.=$alfa[$i-1];
                $out.=$tmp;
                $zahl=false;
                $out.=$c1;
            }
        }
        else
        {
            if(is_int($int1))
            {
                $zahl=true;
                $i=1;
                $out.="Q";
                $tmp=$alfa[$int1];
            }
            else
            {
                $out.=$c1;
            }
        }
    }
    $out=substr($out,0,strlen($out)-1);
    return $out;
}
function delarrabee($textl,$alfa,$alfanum)
{   # Sucht "Q" in Strings, ist Nachfolger (A..J)-> codierte Zahl
    # Laenge der Zahl bestimmen und Ziffer decodieren: A..I,J -> 1..9,0
    $n=strlen($textl);
    for($t=0;$t<$n;$t++)
    {
        $c=substr($textl,$t,1);
        $c2=substr($textl,$t+1,1);
        $i=IndexVonBuchstabe($alfa,$c2);
        if($c==Q && $i>=0 && $i<=9)
        {
            $t=$t+2;
            for($h=0;$h<=$i;$h++)
            {   # Buchstabe -> Ziffer; Modulo auf hoehere Instanz da J = 0
                $orgtxt.=(IndexVonBuchstabe($alfa,substr($textl,$t,1))+11)%10;
                $t++;
            }
            $t--;
        }
        //Markierung "Q" entfernen
        if($c!==Q || $c==Q && $i>9) $orgtxt.=$c;
    }
    return $orgtxt;
}
###################################################
# XOR - Chiffre (ohne Vorverarbeitung)
###################################################
$cipherVersion[]=array('XOR-Chiffre','1.1','20060327','Marcel Brätz');
function enxor($text,$key)
{
    $a=strlen($text);
    $b=strlen($key);
    if ($a>=$b)
    {
        for ($t=0;$t<$a;$t++)
        {
            $sa=substr($text,$t,1);
            $sb=substr($key,$t,1);
            $sc=($sa+$sb)%2;
            $out.=$sc;
        }
    }
    return $out;
}
########################################################
## ADFGX/ADFGVX
########################################################
$cipherVersion[]=array('ADFGX/ADFGVX','1.4','20060602','Steffen Manzke, Tom Jeschke');
# Substitution des Klartextes
function chiffADFGXADFGVX($orgtxt,$alf1,$alf2)
{
        # $alf1 = Normalalphabet
        # $alf2 = Codealphabet
        $i=strlen($orgtxt);
        for ($t=0;$t<$i;$t++)
        {
            # Klartextbuchstabe wird durch den
            # Geheimtextbuchstaben ersetzt
            $tmp=substr($orgtxt,$t,1);
            $codtxt.=$alf2[array_search($tmp,$alf1)];
        }
        return $codtxt;
}

# Geheimtext wird Rueck-Substituiert
function dechiffADFGXADFGVX($codtxt,$alf1,$alf2)
{
        # $alf1 = Normalalphabet
        # $alf2 = Codealphabet
        $i=strlen($codtxt);

        for ($t=0;$t<$i;$t+=2)
        {
                # jeweils zwei Buchstaben des Geheimtextes
                # werden wieder in den Klartextbuchstaben
                # substituiert
            $tmp=substr($codtxt,$t,2);
            $orgtxt.=$alf1[array_search($tmp,$alf2)];
        }
        return $orgtxt;
}

# Geheimtextalfabet wird hier erstellt
function Gausgabe($alfabet,$ind)
{    #Parameter für den Schleifendurchlauf
     $n=sqrt(count($alfabet));

     for($t=0;$t<$n;$t++)
     {
       for($s=0;$s<$n;$s++)
       {
          $out.=$ind[$t].$ind[$s];
       }
     }
     return $out;
}

########################################################
## Huffman-Kodierer
########################################################
$cipherVersion[]=array('Huffman-Kodierer','1.1','20060917','Marcel Brätz');
function huffmanEncode($txt, $v)
{
    $r=array_flip($v);
    foreach($txt as $c)
    {
        $tmp=array_search(ord($c),$r);
        $out.=$tmp." ";
    }
    return $out;
}

function huffmanVorschrift($in)
{
    foreach ($in as $data)
    {
        $out[ord($data[0])] = $data[2];
    }
    return $out;
}
function huffmanKodierer($text)
{
    $alfa=str_split(count_chars($text,3));
    $tmp=count_chars($text,1);
    if (count($tmp)>1)
    {
        foreach($tmp as $val)
        {
            $daten[]=$val;
        }
        # sortieren, abwaerts mit index beibehalten
        arsort($daten);
        # die Buchstaben in die selbe Ordnung bringen
        foreach($daten as $key => $val)
        {
            $alfo[]=$alfa[$key];
        }
        # Blaetter anlegen
        $i=0;
        foreach($daten as $key => $val)
        {
            $tree[$i] = new baumkeimling($val);
            $tree[$i]->addKey($key);
            $tree[$i]->addBuchstabe($alfo[$i]);
            $wert[] = $val;
            $keys[] = $key;
            $id[]   = $i;
            $i++;
        }
        # Baum von den Blaettern zur Wurzel aufbauen. (Indizes zuordnen)
        # immer die Elemente mit dem kleinesten Summenwert werden zusammengefasst
        while(count($wert)>1)
        {
            $wertL=array_pop($wert);         $wertR=array_pop($wert);
            $keyL=array_pop($keys);          $keyR=array_pop($keys);
            $idL=array_pop($id);             $idR=array_pop($id);
            $tree[$idL]->addParrent($i);     if(is_int($wertR)) $tree[$idR]->addParrent($i);
            $val=($wertL+$wertR);
            $tree[$i] = new baumkeimling($val);
            $tree[$i]->addItemLeft($idL);
            $tree[$i]->addItemRight($idR);
            $wert[] = $val;
            $id[]   = $i;
            $daten=array_combine($id,$wert);
            arsort($daten);
            unset ($id);  unset ($wert);
            foreach( $daten as $key => $val)
            {
                $id[]=$key;
                $wert[]=$val;
            }
            $i++;
        }
        # die Blaetter identifizieren
        foreach( $tree as $tre)
        {
            $tmp=$tre->getKey();
            if (is_int($tmp)) $kk[]=$tmp;
        }
        # von jedem Blatt den Pfad laufen und je nach dem ob es links oder rechts eingeordnet ist
        # und mit 0 oder 1 kodieren
        foreach( $kk as $key)
        {
            $ob=$key;
            $val=$tree[$ob]->getValue();
            $alf=$tree[$ob]->getBuchstabe();
            while($key=$tree[$key]->getParrent())
            {
                $lef=$tree[$key]->getLeft();
                $rig=$tree[$key]->getRight();
                if($ob==$lef) $out="0".$out;
                if($ob==$rig) $out="1".$out;
                $ob=$key;
            }
            $kode[]=array($alf,$val,$out);
            unset($out);
        }
    }
    return $kode;
}
########################################################
## Rotorchiffre - simple rotor (threefold)
########################################################
$cipherVersion[]=array('SimpleRotor','0.7b','20060611','Marcel Brätz');
function simplerotor($text,$alfa,$keys)
{
    $a=makereflexive($alfa);
    $mul=$keys;
    $t=0;
    $n=count($alfa);
    foreach(str_split($text) as $var)
    {
            $out=$var;
            foreach($mul as $s)
            {
                $out=kodieren($out,$alfa[($t*$s)%$n],$alfa);
            }
            $l=count($a[1]);
            $b[0]=$a[0];
            for ($i=0;$i<$l;$i++)
            {
                $b[1][($t+$i)%$l]=$a[1][$i];
            }
            $t++;
            $out2.=ukw($out,$b);
    }
    return $out2;
}
########################################################
## Funktionen zur Erzeugung neuer Alfabete
########################################################
function makehomoalfa($subst,$cod)
{
        global $homo;
        global $alfa;
        $r=0;
        for ($t=0;$t<count($homo[$cod]);$t++)
        {
            for($s=0;$s<$homo[$cod][$t];$s++)
            {
                $alfah[$t][]=$subst[$r];
                $r++;
            }
        }
        return $alfah;
}
function createMulAlfa($alfa, $key)
{
    // erzeugt ein Alfabet auf für eine Multiplikative Chiffre
    for($t=0;$t<sizeof($alfa);$t++)
    {
        $alfa2[$t]=buchstabeVonIndex($alfa,(indexVonBuchstabe($alfa,$alfa[$t])*$key)%sizeof($alfa));
    }
    return $alfa2;
}
function rotieren($alfa, $key)
{
    // Rotiert ein Alfabet
    for($t=0;$t<sizeof($alfa);$t++)
    {
        $alfa2[$t]=buchstabeVonIndex($alfa,(indexVonBuchstabe($alfa,$alfa[$t])+$key)%sizeof($alfa));
    }
    return $alfa2;
}

########################################################
## Hilfsfunktionen
########################################################
function indexVonBuchstabe($alfa,$letter)
{
    // liefert den Index des Buchstaben aus dem verwendeten Alphabet
    // A..Z --> 0..25
    for ($t=0;$t<sizeof($alfa);$t=$t+1)
    {
        if($letter==$alfa[$t])
        {
            return $t;
            break;
        }
    }
}
function buchstabeVonIndex($alfa,$index)
{
    // liefert den Buchstaben aus dem verwendeten Alphabet
    // 0..25 --> A..Z
    return $alfa[$index];
}
function spacing($text, $zeichen)
{
    if($zeichen<=1)
    {
        $zeichen=1;
    }
    for ($t=0;$t<strlen($text);$t++)
    {
        $text2.=substr($text,$t,1);
        if(($t+1)%$zeichen==0 && $t>0)
        {
            $text2.=" ";
        }
    }
    return $text2;
}
function displayhomo($subst)
{
    global $homo;
    global $alfa;
    $r=0;
    $text='<table><tr>';
    for ($t=0;$t<count($alfa);$t++)
    {
        $text.='<td align=center>'.$alfa[$t].'</td>';
    }
    $text.='</tr>';
    $text.='<tr>';
    for ($t=0;$t<count($homo[de]);$t++)
    {
        $text.='<td valign=top class=text9>';
        for($s=0;$s<$homo[de][$t];$s++)
        {
            $text.=$subst[$r].'<br>';
            $r++;
        }
        $text.='</td>';
    }
    $text.='</tr>';
    $text.='</table>';
    return $text;
}

?>