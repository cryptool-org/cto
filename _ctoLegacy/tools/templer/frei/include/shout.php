<?php
defined('_JEXEC') or die('Restricted access');
$boxrow = array();
$boxri = array();
$daterow = array();
$userrow = array();
$dateri = array();
$userri = array();
$timerow = array();
$timeri = array();

# Datenbank aufruf
$datasource = new PDO('sqlite:'.$ks_conf['sqlite']);

# Ueberpruefung ob die Tabelle existiert. Wenn nicht erstellen der Tablle
if($datasource->query("SELECT * FROM frei") == '')
{
  $datasource->query("CREATE TABLE frei (box varchar(500), date date, user varchar(20), time
                      time)");
}


# Erstellen des Datums
$date = getdate();
$jahr = $date['year'];
$monat = $date['mon'];
$tag = $date['mday'];
$stunde = $date['hours'];
$minute = $date['minutes'];
$sekunde = $date['seconds'];

# Erstellung des Datums
if($monat < 10)
{
$datum = $jahr.'-'.'0'.$monat.'-'.$tag;
}
else
{
$datum = $jahr.'-'.$monat.'-'.$tag;
}
#Erstellung der Zeit
$zeit  = $stunde.':'.$minute.':'.$sekunde;


# Ueberpruefung ob die Sende schaltflaeche betaetigt wurde und der Wert Senden ist.
if (isset($_POST['bt']) && $_POST['bt'] == 'Senden')
{ # Ueberpruefung werte uebertragen werden
	if($text != '' && $user != '')
	{ # Uebergabe der Werte an die Datenbank
		$datasource->query("INSERT INTO frei(box, date, user,time) VALUES ('$text','$datum',
                        '$user', '$zeit')");
	}

}

# Auslesen allerwerte aus der Datenbank
foreach($datasource->query("SELECT box, date, user, time FROM frei") as $row)
{
  array_push($boxrow, $row[box]);
  array_push($daterow, $row[date]);
  array_push($userrow, $row[user]);
  array_push($timerow, $row[time]);
}


$count = count($boxrow); # zaehlen der Werte im Array
$num = $count-5; # von der Anzahl der Werte 5 abziehen

# Die letzen 5 Werte werden umgeschrien
for($i = $count -1; $i >= $num; $i--)
{
	array_push($boxri, $boxrow[$i]);
	array_push($dateri, $daterow[$i]);
	array_push($userri, $userrow[$i]);
	array_push($timeri, $timerow[$i]);
}

?>
