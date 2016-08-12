<?php
defined('_JEXEC') or die('Restricted access');
function clean($text)
{   # ersetzt Umlaute durch die entsprechenden Bigramme

    $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/"); # suchen nach ...
    $replace = array ("AE","AE","OE","OE","UE","UE","SS");        # ersetzen durch ...
    $text = preg_replace($search, $replace, $text);
    return $text;

}
function check($in)
{
  $set    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß';
  $in     = clean($in);
  $buffer = str_split($in);
  foreach ($buffer as $key=>$value)
  {
     if(@eregi($value, $set))
     $out.=$value;
  }
  return $out;
}
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

?>