<?php @ob_start();
$height="50";
$scale="2";
$bgcolor="#FFFFFF";
$color="#000000";
$file="barcode";
$type="png";
$encode="CODE39";
$bdata="CRYPTOOL";

$lang_typ=JTEXT::_('TYP');
$lang_data=JTEXT::_('DATA');
$lang_encode=JTEXT::_('ENCODE');

if(isset($_POST['Genrate']) || isset($_POST['encode']))
{
	$encode=$_POST['encode'];
	$bdata=$_POST['bdata'];
	$height=$_POST['height'];
	$scale=$_POST['scale'];
	$bgcolor=$_POST['bgcolor'];
	$color=$_POST['color'];
	$file=$_POST['file'];
	$type=$_POST['type'];
}

if ($encode!="") $description=JTEXT::_($encode);

      
      
      


?>








<TABLE>
<TR>
	
	<TD>
	<form action='' method='POST' name='form1'>
	<TABLE border=0 width="550">
	
	<TR>
		<TD width="91"><B><?php echo $lang_typ; ?></B></TD>
		<TD width="3"></TD>
		<TD><SELECT NAME="encode" class="ctoformcss-default-button" id='code' onchange='document.form1.submit();'>
		<OPTION value='UPC-A' <?=$encode=='UPC-A'?'selected':''?>>UPC-A</OPTION>
		<OPTION value='EAN-13' <?=$encode=='EAN-13'?'selected':''?>>EAN-13</OPTION>
		<OPTION value='EAN-8' <?=$encode=='EAN-8'?'selected':''?>>EAN-8</OPTION>
		<OPTION value='UPC-E' <?=$encode=='UPC-E'?'selected':''?>>UPC-E</OPTION>
		<OPTION value='S205' <?=$encode=='S205'?'selected':''?>>STANDARD 2 OF 5</OPTION>
		<OPTION value='I2O5' <?=$encode=='I2O5'?'selected':''?>>INDUSTRIAL 2 OF 5</OPTION>
		<OPTION value='I25' <?=$encode=='I25'?'selected':''?>>INTERLEAVED</OPTION>
		<OPTION value='POSTNET' <?=$encode=='POSTNET'?'selected':''?>>POSTNET</OPTION>
		<OPTION value='CODABAR' <?=$encode=='CODABAR'?'selected':''?>>CODABAR</OPTION>
		<OPTION value='CODE128' <?=$encode=='CODE128'?'selected':''?>>CODE128</OPTION>
		<OPTION value='CODE39' <?=$encode=='CODE39'?'selected':''?>>CODE39</OPTION>
		<OPTION value='CODE93' <?=$encode=='CODE93'?'selected':''?>>CODE93</OPTION>
		</SELECT></TD>
		<TD></TD>
	</TR>
	
	<TR>
	<td colspan=4><br><?php echo $description ?><br></td>
	</TR>
	
	
	<TR>
		<TD><B><?php echo $lang_data; ?></B></TD>
		<TD></TD>
		<TD><input name='bdata' value='<?=$bdata?>' id='bdata' class='ctoformcss-txtinput-style' onkeyup='checkInput();'></TD>
		<TD></TD>
	</TR>
	
	<TR>
		<TD></TD>
		<TD></TD>
		<TD><input type='hidden' name='file' size=9 value='barcode'>
		<input  type='hidden' name='type' size=9 value='png'>
		<input type='hidden' name='bgcolor' value='#FFFFFF'>
		<input type='hidden' name='color' value='#000000'>
		<input type='hidden' name='height' value='50'>
		<input type='hidden' name='scale' value='2'>
		</TD>
		<TD></TD>
	</TR>
	<TR>
		<TD>&nbsp;</TD>
		<TD>&nbsp;</TD>
		<TD>&nbsp;</TD>
    <TD>&nbsp;</TD>
		
	</TR>
	<TR>
		<TD colspan=4>
		<div class='directlink' id='directlink'>
    <?php
		echo "<input type='submit' name='Genrate' id='Genrate' value='$lang_encode' class='ctoformcss-default-button-m'>";
		?>
		</div>
		<div class='mobilrun' id='mobilrun'>
    <?php
		echo "<input type='submit' name='GenrateM' id='GenrateM' value='$lang_encode' class='ctoformcss-default-button-m'>";
		?>
		</div>
		</TD>
	</TR>
	</form>
	</TABLE>
	</TD>
</TR>
</TABLE>	
<?php
if(isset($_POST['Genrate'])||isset($_POST['GenrateM']))
      {  
?>
<p>
<br>	
	<TABLE>
	<TR>
		<TD align='center'>
		<?php
      
        include("barcode.php");
        echo "<img src='/barcodepng/".$_POST['file'].".".$_POST['type']."'>";
		?>
		</TD>
	</TR>
	</TABLE>
<?
}
?>
<script>
niceData();
</script>
