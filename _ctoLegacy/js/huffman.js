jQuery(document).ready(function(){
    //create object
    var CTOHuffmanScripts = new CTOHuffmanGuiAccess();
    jQuery("#huffman-submit").click(function(){
	console.log(CTOHuffmanScripts);
	CTOHuffmanScripts.getData();
	return false;
    });
});

function CTOHuffmanAlgorithm()
{
    
}

//*******************************(gui-access-layer)
//*******************************
//*******************************
function CTOHuffmanGuiAccess()
{
    var cryptoclass = new CTOHuffmanAlgorithm();  
    this.getData = getData;
    function getData()
    {
	 var form = jQuery("#huffman-form").serialize();
	 var div_width = jQuery("#huffman-data").width();
	 var div_height = jQuery("#huffman-data").height();
	 console.log(div_width, div_height, jQuery("#huffman-data").height(), jQuery("#huffman-data").width());
	 var itemid = window.location.href.match(/Itemid=\d*/g)[0].replace(/Itemid=(\d*)/g, "$1");
	 jQuery("div#huffman-data").html('<div style="width:'+div_width+'px;height:'+div_height+'px"></div>');
	 console.log(jQuery(".floatingCirclesG"));
	 jQuery("div#huffman-data>div").html(jQuery(".floatingCirclesG").css('display', 'block'));
	jQuery.post('index.php?tmpl=component&format=raw&ajax=1&Itemid='+itemid, form, function(data) {
	    jQuery("div#huffman-data").html(data);
	});
    }
}