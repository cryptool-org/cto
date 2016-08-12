jQuery(document).ready(function(){
    //create object
    var CTOAjax = new CTOAjaxRequester();
    jQuery("input[type=submit]").live('click', function(){
	var button = jQuery(this)
    CTOAjax.getData(button);
	return false;
    });
});

//*******************************(gui-access-layer)
//*******************************
//*******************************
function CTOAjaxRequester()
{  
    this.getData = getData;
    function getData(button)
    {
	 var form = jQuery(button).parents("form").first().serialize();
     button = button.attr('name')+"="+button.attr('value');
     form += "&"+button;
	 var div_width = jQuery("#cto-tool-data").width();
	 var div_height = jQuery("#cto-tool-data").height();
	 var itemid = window.location.href.match(/Itemid=\d*/g)[0].replace(/Itemid=(\d*)/g, "$1");
	 jQuery("div#cto-tool-data").html('<div style="width:'+div_width+'px;height:'+div_height+'px"></div>');
	 jQuery("div#cto-tool-data").html(jQuery(".floatingCirclesG").css('display', 'block'));
	jQuery.post('index.php?option=com_cto&view=tool&tmpl=component&format=raw&ajax=1&Itemid='+itemid, form, function(data) {
	    jQuery("div#cto-tool-data").html(data);
	});
    }
}