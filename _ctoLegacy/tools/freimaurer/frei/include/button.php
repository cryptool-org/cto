<?php
defined('_JEXEC') or die('Restricted access');
$pfad=$relpfad;
echo $pfad;
if($alf == 'nf' || $alf == 'oe' || $alf == 'vs' || $alf == 'ns' || $alf == 'co')
{
	$zeichensatz=str_split("abcdefghijklmnopqrstuvwxyz ");
	$ersetzstr="<button type=button title=\"%s\" OnClick='form.orgtxt.value += \"%s\"'><img src=\"".$pfad."/symbole/%s/%s.jpg\"></button>";
	foreach($zeichensatz as $button)
	{
		$knopf=sprintf($ersetzstr,strtoupper($button),strtoupper($button),$alf,$button);
		$form = str_replace(sprintf("{-%s-}",$button),$knopf, $form);
	}
	$knopf=sprintf($ersetzstr,"Space",strtoupper($button),$alf,"lr");
	$form = str_replace(sprintf("{-%s-}","lr"),$knopf, $form);
}

?>