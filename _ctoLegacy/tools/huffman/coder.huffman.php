<?php

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
## Huffmanbaum
########################################################
$cipherVersion[]=array('Klasse für Huffmanbaum','1.0','20060601','Marcel Brätz');
class baumkeimling
{   #Baumklasse mit ein bissle Zusatzplunder für Entropieencoder
    var $w;     # Wurzelwert
    var $l;     # Linker Nachfolger (Index im $tree-Array)
    var $r;     # Linker Nachfolger (Index im $tree-Array)
    var $k;     # Key der Blätter, im Urarray
    var $e;     # Kontextinfo, hier der Buchstabe
    var $p;     # Vaterelement, damit das auch als Blätterbaum funzt

    function addParrent   ($elem) { $this->p = $elem;  }
    function addBuchstabe ($elem) { $this->e = $elem;  }
    function addKey       ($elem) { $this->k = $elem;  }
    function addItemLeft  ($elem) { $this->l = $elem;  }
    function addItemRight ($elem) { $this->r = $elem;  }

    function getParrent   ()      { return $this->p;   }
    function getBuchstabe ()      { return $this->e;   }
    function getKey       ()      { return $this->k;   }
    function getLeft      ()      { return $this->l;   }
    function getRight     ()      { return $this->r;   }
    function getValue     ()      { return $this->w;   }

    function baumkeimling ($elem)
    {
        $this->w = $elem;
        $this->l = NULL;
        $this->r = NULL;
    }
}

?>
