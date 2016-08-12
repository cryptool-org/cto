<?php
defined('_JEXEC') or die('Restricted access');
@dl('PHP_PDO');
@dl('PHP_PDO_SQLITE');
$conn = new PDO('sqlite:./navajo.sqlite');
$sql  = 'SELECT englisch, navajo, bedeutung FROM data';

print "<center><style>td{font-size:11px;}.fett{font-weight:bold;text-decoration: underline overline;}</style>";
print "<table>";
$y=0;
foreach ($conn->query($sql) as $row)
{
    if ($y%20==0)
    {
       print "<tr><td class=fett>ENGLISCH</td><td class=fett>NAVAJO</td><td class=fett>BEDEUTUNG</td></tr>";
    }
    print "<tr><td valign=top>".$row['ENGLISCH']."</td><td valign=top>".$row['NAVAJO']."</td><td valign=top>".$row['BEDEUTUNG']."</td></tr>";
    $y++;
}
print "</table>";
print "www.kryptographiespielplatz.de</center>";

?>