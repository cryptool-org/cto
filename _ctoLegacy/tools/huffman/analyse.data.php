<?php
$cipherVersion[]=array('Zeichensätze für Analyse-O-Matik','1.0','20060731','Marcel Brätz');
#####################################################
## Deutsch, de
#####################################################
$satzname['de']   = "deutsch_az";
$alphabet['de']   = strtoupper("abcdefghijklmnopqrstuvwxyz");
$search['de']     = array ("/ä/","/Ä/","/ö/","/Ö/","/ü/","/Ü/","/ß/");
$replace['de']    = array ("ae" , "Ae", "oe", "Oe", "ue", "Ue", "ss");
$verteilung['de'] = array( 0.0647, 0.0193, 0.0268, 0.0483, 0.1748, 0.0165, 0.0306, 0.0423, 0.0773, 0.0027,
                         0.0146, 0.0349, 0.0258, 0.0984, 0.0298, 0.0096, 0.0002, 0.0754, 0.0683, 0.0613,
                         0.0417, 0.0094, 0.0149, 0.0004, 0.0008, 0.0114 );

#####################################################
## Englisch, en
#####################################################
$satzname['en']   = "englisch_az";
$alphabet['en']   = strtoupper("abcdefghijklmnopqrstuvwxyz");
$search['en']     = array ("/a/");
$replace['en']    = array ("a" );
$verteilung['en'] = array( 0.0781, 0.0128, 0.0293, 0.0411, 0.1305, 0.0288, 0.0139, 0.0585, 0.0677, 0.0023,
                         0.0042, 0.0360, 0.0262, 0.0728, 0.0821, 0.0215, 0.0014, 0.0664, 0.0646, 0.0902,
                         0.0277, 0.0100, 0.0149, 0.0030, 0.0151, 0.0009 );

#####################################################
## Base64, uue
#####################################################
$satzname['uue']   = "base64";
$alphabet['uue']   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
$search['uue']     = array ("/a/");
$replace['uue']    = array ("a");
$verteilung['uue'] = array( 0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0);

#####################################################
## Binär, bin
#####################################################
#$satzname['bin']   = "binär_01";
#$alphabet['bin']  = "01";
#$search['bin']    = array ("/a/");
#$replace['bin']   = array ("a");
#$verteilung['bin']= array( 0.5, 0.5 );

#####################################################
## Binär mit Buchstaben, bin2
#####################################################
$satzname['bin2']   = "binär_ab";
$alphabet['bin2']  = strtoupper("ab");
$search['bin2']    = array ("/0/","/1/");
$replace['bin2']   = array ("a","b");
$verteilung['bin2']= array( 0.5, 0.5 );

?>