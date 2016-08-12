<?php
	require("barcode.inc.php");
	$encode=$_REQUEST['encode'];
	$bar= new BARCODE();
	
	if($bar==false)
		die($bar->error());
	// OR $bar= new BARCODE("I2O5");

	$barnumber=$_REQUEST['bdata'];
	//$barnumber="200780";
	//$barnumber="801221905";
	//$barnumber="A40146B";
	//$barnumber="Code 128";
	//$barnumber="TEST8052";
	//$barnumber="TEST93";
	
	$bar->setSymblogy($encode);
	$bar->setHeight($_REQUEST['height']);
	//$bar->setFont("arial");
	$bar->setScale($_REQUEST['scale']);
	$bar->setHexColor($_REQUEST['color'],$_REQUEST['bgcolor']);

	/*$bar->setSymblogy("UPC-E");
	$bar->setHeight(50);
	$bar->setFont("arial");
	$bar->setScale(2);
	$bar->setHexColor("#000000","#FFFFFF");*/

	//OR
	//$bar->setColor(255,255,255)   RGB Color
	//$bar->setBGColor(0,0,0)   RGB Color

  
  
  
  switch ($encode)
{
      case "UPC-A":
        $barnumber = substr($barnumber, 0, 12);
        break;
      case "EAN-13":
        $barnumber = substr($barnumber, 0, 13);
        break;
      case "EAN-8":
        $barnumber = substr($barnumber, 0, 8);
        break;
      case "UPC-E":
        $barnumber = substr($barnumber, 0, 10);
        break;
      case "POSTNET":
        $barnumber = substr($barnumber, 0, 11);
        break;
}
  
  
  
  
  
  
  
  
  	
	$return = $bar->genBarCode($barnumber,$_REQUEST['type'],$_REQUEST['file']);
	if($return==false)
		$bar->error(true);
	
?>