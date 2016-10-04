//jQuery(document).ready(function(){
document.addEventListener('DOMContentLoaded',function(){

    // first load translations
    jQuery.get(CTO_Globals.base + '_ctoApps/adfgvx/locale.json', function (locale) {

        // get the right translations
        var data = locale[CTO_Globals.lang];

        // then get the table template which we want to inject later
        jQuery.get(CTO_Globals.base + '_ctoApps/adfgvx/adf.template.html', function (tableTemplate) {

            // add the template to build handlebars data
            data.adf_template = tableTemplate;

            // then load the handlebars template
            jQuery.get(CTO_Globals.base + '_ctoApps/adfgvx/adfgvx.hbs', function (hbsTemplate) {
                // compile handlebars template
                var tmpl = Handlebars.compile(hbsTemplate);
                // inject translations & template
                jQuery("#adfgvx").html(tmpl(data));

                CTOAdfgvxScripts.genKeysquare('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
                CTOAdfgvxScripts.setAlphabet(1);
                CTOAdfgvxScripts.adfgvxCrypt(false); //Encrypt default text
                jQuery('a.toggler').click(function(){
                    jQuery(this).toggleClass('off');
                });

            }, 'html');
        }, 'html');
    });
});