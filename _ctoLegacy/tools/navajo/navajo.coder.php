<?php
defined('_JEXEC') or die('Restricted access');

function getData($dba, $sql)
{
    $dump = $dba->prepare($sql);
    $dump->execute();
    while ($row = $dump->fetch(PDO::FETCH_ASSOC))
    {
        if(is_array($row))
        {
            $data[] = $row;
        }
    }
    return $data;
}

function kodieren($in)
{
     global $ks_hilf;
     $conn = new PDO('sqlite:'.$ks_hilf[pfad].'/navajo.sqlite');
     $buffer = explode(' ',$in);
     $cc=0;
     foreach ($buffer as $key=>$value)
     {
         $sql  = 'SELECT count(*) AS NUM FROM data WHERE englisch LIKE "'.$value.'" ORDER BY RANDOM() LIMIT 1';
         $data = getData($conn, $sql);
         $temp = $data[0][NUM];
         $cc++;

         if ($temp == 0)
         {
             $bst=str_split($value);
             foreach ($bst as $key1=>$value1)
             {
                 $sql ='SELECT * FROM data WHERE englisch LIKE "'.$value1.'" ORDER BY RANDOM() LIMIT 1';
                 $data=getData($conn, $sql);
                 $out.= $data[0][NAVAJO]." ";
             }
         }
         else
         {
             $sql ='SELECT * FROM data WHERE englisch LIKE "'.$value.'" ORDER BY RANDOM() LIMIT 1';
             $data=getData($conn, $sql);
             $out.= $data[0][NAVAJO]." ";
         }
         if ($cc!=count($buffer))
         {
            $sql ='SELECT * FROM data WHERE englisch LIKE "SPACE" ORDER BY RANDOM() LIMIT 1';
            $data=getData($conn, $sql);
            $out.= $data[0][NAVAJO]." ";
         }
     }
     return trim($out);
}

function dekodieren($in)
{
     global $ks_hilf;
     $conn = new PDO('sqlite:'.$ks_hilf[pfad].'/navajo.sqlite');
     $buffer = explode(' ',trim($in));
     $cc=0;
     foreach ($buffer as $key=>$value)
     {
         $sql  = 'SELECT count(*) AS NUM FROM data WHERE NAVAJO LIKE "'.$value.'" ORDER BY RANDOM() LIMIT 1';
         $data = getData($conn, $sql);
         $temp = $data[0][NUM];
         $cc++;

         if ($temp == 0)
         {
             $out.= '['.$value.']';
         }
         else
         {
             $sql ='SELECT * FROM data WHERE NAVAJO = "'.$value.'" ORDER BY RANDOM() LIMIT 1';
             $data=getData($conn, $sql);
             $tmp= $data[0][ENGLISCH];
             if ($tmp=="SPACE") $tmp=" ";
             $out.=$tmp;
         }
     }
     return trim($out);
}
function clean($text)
{   # ersetzt Umlaute durch die entsprechenden Bigramme

    $search  = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/"); # suchen nach ...
    $replace = array ("AE","AE","OE","OE","UE","UE","SS");        # ersetzen durch ...
    $text = preg_replace($search, $replace, $text);
    return $text;

}

?>