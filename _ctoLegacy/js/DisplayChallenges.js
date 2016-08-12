var old_form_content = [];
jQuery(document).ready(function() {
        initialize();
	jQuery(".jquery_toggle").click(function() {
		var challenge_id = jQuery(this).attr('challenge_id');
		var type = jQuery(this).attr('type');
		if(jQuery(this).hasClass('toggle_icon')) {
			jQuery(this).toggleClass('icon_monochrome');
			jQuery(this).toggleClass('icon_color');
		} else if(type == 'challenge_pdf') {
			jQuery("#pdf_icon_"+challenge_id).toggleClass('icon_monochrome');
			jQuery("#pdf_icon_"+challenge_id).toggleClass('icon_color');
		} else if(type == 'challenge_hof') {
			jQuery("#hof_icon_"+challenge_id).toggleClass('icon_monochrome');
			jQuery("#hof_icon_"+challenge_id).toggleClass('icon_color');
		}
		
		if(type == 'challenge_pdf' && jQuery("#"+type+"_"+challenge_id).css('display') == 'none') {
			loadGooglePDF(challenge_id);
		}
		
		jQuery("#"+type+"_"+challenge_id).slideToggle('slow');
		
	});
        
        jQuery("form.solution_submit").live('submit', function(){
            var challenge_id = jQuery(this).children("input[name=challenge_id]").attr('value');
            jQuery(this).children("input[type=submit]").attr('disabled', 'disabled'); //disable button to prevent accidental multiple submit
            jQuery.post('index.php', jQuery(this).serialize(),function(data){ //send the entered secret
                jQuery('#submission_container_'+challenge_id).fadeOut('slow', function(){ //when data arrives, fadeOut the old form
                    try {
                        data = unserialize(data);
                    }
                    catch(err) {
                        err_win = window.open();
                        err_win.document.write(data);
                    }
                    old_form_content[challenge_id] = jQuery('#submission_container_'+challenge_id+" td.form_container").html(); //save the old form
                    jQuery('#submission_container_'+challenge_id+" td.form_container").html(data["return_text"]); //put returned data into table cell
                    jQuery('#submission_container_'+challenge_id+" td div").first().removeClass('submit_img'); //remove current img
                    if(data["solved"]) {
                        jQuery('#submission_container_'+challenge_id+" td div").first().addClass('true_img'); //add new img
                    } else {
                        jQuery('#submission_container_'+challenge_id+" td div").first().addClass('false_img'); //add new img
                    }
                    jQuery('#submission_container_'+challenge_id).fadeIn('slow'); //slowly fade in the returned data
                });
            });
            return false;
        });
    
        jQuery(".try_again_button").live('click', function(){
            var challenge_id = jQuery(this).attr('challenge_id');
            jQuery("#submission_container_"+challenge_id).fadeOut('slow',function(){
                jQuery('#submission_container_'+challenge_id+" td.form_container").html(old_form_content[challenge_id]); //put returned data into table cell
                jQuery('#submission_container_'+challenge_id+" td.form_container form input[type=submit]").removeAttr('disabled'); //enable again for subsequent submission
                jQuery('#submission_container_'+challenge_id+" td.form_container form input[type=text]").attr('value', ""); //empty the text field to for another submission
                jQuery('#submission_container_'+challenge_id+" td div").first().removeClass('false_img'); //remove old icon
                jQuery('#submission_container_'+challenge_id+" td div").first().addClass('submit_img'); //set new icon
                jQuery('#submission_container_'+challenge_id+" td.form_container").html(); //put returned data into table cell
            });
            jQuery("#submission_container_"+challenge_id).fadeIn('slow');
        });
        
        jQuery(".solved_collapse").click(function(){
                challenge_id = jQuery(this).attr('challenge_id');
                if(jQuery(this).attr('type') == 'congrats_row') {
                    jQuery('#challenge_wrapper_'+challenge_id).fadeToggle(function() {
                        jQuery('#collapser_'+challenge_id).fadeToggle();
                    });
                } else {
                    jQuery('#collapser_'+challenge_id).fadeToggle(function() {
                        jQuery('#challenge_wrapper_'+challenge_id).fadeToggle();
                    });
                }
                
        });
});

function loadGooglePDF(challenge_id)
{
	url = encodeURI(jQuery("#challenge_file_"+challenge_id).attr('href'));
	if(!document.getElementById('challenge_pdf_container_'+challenge_id).innerHTML) {
		document.getElementById('challenge_pdf_container_'+challenge_id).innerHTML = '<iframe width="870" scrolling="no" height="600" frameborder="0" name="Challenge" src="http://docs.google.com/viewer?url='+url+'&amp;embedded=true">&lt;p&gt;I\'m sorry. Your browser does not support frames.&lt;/p&gt;</iframe>';
	}
}

function initialize()
{
    jQuery("input[type=submit]").removeAttr('disabled');
}

function unserialize (data) {
    // http://kevin.vanzonneveld.net
    // +     original by: Arpad Ray (mailto:arpad@php.net)
    // +     improved by: Pedro Tainha (http://www.pedrotainha.com)
    // +     bugfixed by: dptr1988
    // +      revised by: d3x
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +        input by: Brett Zamir (http://brett-zamir.me)
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: Chris
    // +     improved by: James
    // +        input by: Martin (http://www.erlenwiese.de/)
    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: Le Torbi
    // +     input by: kilops
    // +     bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -      depends on: utf8_decode
    // %            note: We feel the main purpose of this function should be to ease the transport of data between php & js
    // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays
    // *       example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    // *       returns 1: ['Kevin', 'van', 'Zonneveld']
    // *       example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
    // *       returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}
    var that = this;
    var utf8Overhead = function (chr) {
        // http://phpjs.org/functions/unserialize:571#comment_95906
        var code = chr.charCodeAt(0);
        if (code < 0x0080) {
            return 0;
        }
        if (code < 0x0800) {
            return 1;
        }
        return 2;
    };


    var error = function (type, msg, filename, line) {
        throw new that.window[type](msg, filename, line);
    };
    var read_until = function (data, offset, stopchr) {
        var buf = [];
        var chr = data.slice(offset, offset + 1);
        var i = 2;
        while (chr != stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1), offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    var read_chrs = function (data, offset, length) {
        var buf;

        buf = [];
        for (var i = 0; i < length; i++) {
            var chr = data.slice(offset + (i - 1), offset + i);
            buf.push(chr);
            length -= utf8Overhead(chr);
        }
        return [buf.length, buf.join('')];
    };
    var _unserialize = function (data, offset) {
        var readdata;
        var readData;
        var chrs = 0;
        var ccount;
        var stringlength;
        var keyandchrs;
        var keys;

        if (!offset) {
            offset = 0;
        }
        var dtype = (data.slice(offset, offset + 1)).toLowerCase();

        var dataoffset = offset + 2;
        var typeconvert = function (x) {
            return x;
        };

        switch (dtype) {
        case 'i':
            typeconvert = function (x) {
                return parseInt(x, 10);
            };
            readData = read_until(data, dataoffset, ';');
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 1;
            break;
        case 'b':
            typeconvert = function (x) {
                return parseInt(x, 10) !== 0;
            };
            readData = read_until(data, dataoffset, ';');
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 1;
            break;
        case 'd':
            typeconvert = function (x) {
                return parseFloat(x);
            };
            readData = read_until(data, dataoffset, ';');
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 1;
            break;
        case 'n':
            readdata = null;
            break;
        case 's':
            ccount = read_until(data, dataoffset, ':');
            chrs = ccount[0];
            stringlength = ccount[1];
            dataoffset += chrs + 2;

            readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
            chrs = readData[0];
            readdata = readData[1];
            dataoffset += chrs + 2;
            if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
                error('SyntaxError', 'String length mismatch');
            }

            // Length was calculated on an utf-8 encoded string
            // so wait with decoding
            readdata = that.utf8_decode(readdata);
            break;
        case 'a':
            readdata = {};

            keyandchrs = read_until(data, dataoffset, ':');
            chrs = keyandchrs[0];
            keys = keyandchrs[1];
            dataoffset += chrs + 2;

            for (var i = 0; i < parseInt(keys, 10); i++) {
                var kprops = _unserialize(data, dataoffset);
                var kchrs = kprops[1];
                var key = kprops[2];
                dataoffset += kchrs;

                var vprops = _unserialize(data, dataoffset);
                var vchrs = vprops[1];
                var value = vprops[2];
                dataoffset += vchrs;

                readdata[key] = value;
            }

            dataoffset += 1;
            break;
        default:
            error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
            break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    };

    return _unserialize((data + ''), 0)[2];
}

function utf8_decode (str_data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
}
