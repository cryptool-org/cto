"use strict";!function(e){e(function(){function t(e){var t=null,a=e+"";return e<1?a="less than a second":e<60?(t=Math.round(e),a=t+" second"):e<3600?(t=Math.round(e/60),a=t+" minute"):e<86400?(t=Math.round(e/3600),a=t+" hour"):e<2678400?(t=Math.round(e/86400),a=t+" day"):e<32140800?(t=Math.round(e/2678400),a=t+" month"):e<321408e4?(t=Math.round(e/32140800),a=t+" year"):a="centuries",null!=t&&1!=t&&(a+="s"),a}function a(e){return"de"===CTO_Globals.lang&&(e=e.replace("Use a few words, avoid common phrases","Benutzen Sie ein paar W&ouml;rter, vermeiden Sie h&auml;fige W&ouml;rter"),e=e.replace("No need for symbols, digits, or uppercase letters","Kein Bedarf an Symbolen, Zahlen oder Gro&szlig;buchstaben"),e=e.replace("Add another word or two. Uncommon words are better","F&uuml;gen Sie ein oder zwei W&ouml;rter hinzu. Seltene W&ouml;rter sind besser"),e=e.replace("Straight rows of keys are easy to guess","Tastaturfolgen sind leicht zu erraten"),e=e.replace("Short keyboard patterns are easy to guess","Kurze Tastaturmuster sind leicht zu erraten"),e=e.replace("Use a longer keyboard pattern with more turns","Verwenden Sie ein l&aouml;ngeres Tastaturmuster"),e=e.replace('Repeats like "aaa" are easy to guess','Wiederholungen wie "aaa" sind leicht zu erraten'),e=e.replace('Repeats like "abcabcabc" are only slightly harder to guess than "abc"','Wiederholungen wie "abcabcabc" sind nur etwas schwieriger zu erraten als "abc"'),e=e.replace("Avoid repeated words and characters","Vermeiden Sie wiederholte W&ouml;rter und Zeichen"),e=e.replace("Sequences like abc or 6543 are easy to guess","Sequenzen wie abc oder 6543 sind leicht zu erraten"),e=e.replace("Avoid sequences","Vermeiden Sie Sequenzen"),e=e.replace("Recent years are easy to guess","Jahreszahlen der letzten Jahre sind leicht zu erraten"),e=e.replace("Avoid recent years","Vermeiden Sie Jahreszahlen der letzten Jahre"),e=e.replace("Avoid years that are associated with you","Vermeiden Sie Jahreszahlen die einen Bezug zu Ihnen haben"),e=e.replace("Dates are often easy to guess","Ein Datum ist oft leicht zu erraten"),e=e.replace("Avoid dates and years that are associated with you","Vermeiden Sie Jahreszahlen und Daten die einen Bezug zu Ihnen haben"),e=e.replace("This is a top-10 common password","Dies ist eins der 10 h&auml;ufigsten Passw&ouml;rter"),e=e.replace("This is a top-100 common password","Dies ist eins der 100 h&auml;ufigsten Passw&ouml;rter"),e=e.replace("This is a very common password","Dies ist ein sehr h&auml;ufiges Passwort"),e=e.replace("This is similar to a commonly used password","Dies &auml;hnelt einem h&auml;ufig verwendeten Passwort"),e=e.replace("A word by itself is easy to guess","Ein Wort an sich ist leicht zu erraten"),e=e.replace("Names and surnames by themselves are easy to guess","Vor- und Nachnamen sind leicht zu erraten"),e=e.replace("Common names and surnames are easy to guess","H&auml;ufige Vor- und Nachnamen sind leicht zu erraten"),e=e.replace("Capitalization doesn't help very much","Gro&szlig;schreibung hilft nicht besonders viel"),e=e.replace("All-uppercase is almost as easy to guess as all-lowercase","Nur Gro&szlig;buchstaben sind fast so einfach zu erraten wie nur Kleinbuchstaben"),e=e.replace("Reversed words aren't much harder to guess","Umgekehrte W&ouml;rter sind nicht viel schwerer zu erraten"),e=e.replace("Predictable substitutions like '@' instead of 'a' don't help very much",'Vorhersehbare Substitutionen wie "@" anstelle von "a" helfen nicht sehr'),e=e.replace("less than a second","Weniger als eine Sekunde"),e=e.replace("seconds","Sekunden"),e=e.replace("second","Sekunde"),e=e.replace("minutes","Minuten"),e=e.replace("minute","Minute"),e=e.replace("hours","Stunden"),e=e.replace("hour","Stunde"),e=e.replace("days","Tage"),e=e.replace("day","Tag"),e=e.replace("months","Monate"),e=e.replace("month","Monat"),e=e.replace("years","Jahre"),e=e.replace("year","Jahr"),e=e.replace("centuries","Jahrhunderte"),e=e.replace("dictionary","W&ouml;rterbuch"),e=e.replace("sequence","Sequenz"),e=e.replace("repetition","Wiederholung"),e=e.replace("keyboard","Tastatur"),e=e.replace("date","Datum"),e=e.replace("leet","Leetspeak")),e}function s(t){var a="";e("#ps-wordlists").text(""),p.iterate(function(e,t){switch(e=e,a+="<tr>",e.status){case"used":a+='<td><input type="checkbox" data-wordlistkey="'+t+'" class="ps-use-wordlist" checked /></td>';break;case"unused":a+='<td><input type="checkbox" data-wordlistkey="'+t+'" class="ps-use-wordlist" /></td>';break;case"loading":a+='<td><div class="loader"></div></td>'}switch(a+="<td>"+t+"</td><td>"+e.length+"</td>",e.method){case"ajax":a+="<td></td>";break;case"file":a+='<td id="ps-delete-wordlist-'+t+'" class="ps-delete-wordlist">&#x1f5d1;</td>'}a+="</tr>"},function(){e("#ps-wordlists").html(a),t()})}function r(e){m=[{type:"keyboard",key:"qwerty",keyboard:Score.prototype.keyboards.QWERTY},{type:"keyboard",key:"qwertz",keyboard:Score.prototype.keyboards.QWERTZ},{type:"repetition"},{type:"sequences"},{type:"dates"}];var t={},a=function(){if("function"==typeof e){for(var a in t)if(!0!==t[a])return;e()}};p.iterate(function(e,a){t[a]=!1},function(){p.iterate(function(e,s){e=e,"used"==e.status?WordlistParser.loadFromBrowserStorage(h,s,function(e,r){m.push({type:"dictionary",leet:!0,key:s,dictionary:WordlistParser.convertToPasswordScoreFormat(r)}),t[s]=!0,a()}):t[s]=!0},a)})}function n(){return e("#password-input").val().replace(/ /g,"")}function o(t,a,s){e(t).find(".results-text").text(s);var r=e(t).find(".progress-bar");if(e(r).attr("aria-valuenow",a),e(r).css("width",a+"%"),""==n())return void e(r).attr("class","progress-bar");switch(a=Math.floor(a/25)){case 0:case 1:e(r).attr("class","progress-bar progress-bar-danger");break;case 2:e(r).attr("class","progress-bar progress-bar-warning");break;case 3:case 4:e(r).attr("class","progress-bar progress-bar-success");break;default:e(r).attr("class","progress-bar")}}function i(e){var t=new KeepassPasswordQualifier(e),a=new MozillaPasswordQualifier(e),s=new PgpPasswordQualifier(e),r=Array();r.push({resultSelector:"#results-keepass",passwordQualifier:t}),r.push({resultSelector:"#results-mozilla",passwordQualifier:a}),r.push({resultSelector:"#results-pgp",passwordQualifier:s});for(var n=0;n<r.length;n++){var i=r[n],c=i.passwordQualifier.getPasswordQuality(),l=c+"%";void 0!=i.passwordQualifier.getPasswordEntropy()&&(l+=" ("+i.passwordQualifier.getPasswordEntropy()+" Bits)"),g+=c*w,o(i.resultSelector,c,l)}}function c(t){var s=zxcvbn(t),r=25*s.score;g+=r*w,o("#results-zxcvbn",r,r+"%"),e("#zxcvbn-time-to-crack-online").text(a(s.crack_times_display.online_no_throttling_10_per_second)),e("#zxcvbn-time-to-crack-offline").text(a(s.crack_times_display.offline_slow_hashing_1e4_per_second));if(e("#zxcvbn-found-sequences").text(""),s.sequence.length>0)for(var n=0;n<s.sequence.length;n++){var i=s.sequence[n].token;i!=t&&e("#zxcvbn-found-sequences").append('<span class="label label-primary">'+i+"</span>")}""==e("#zxcvbn-found-sequences").text()&&e("#zxcvbn-found-sequences").text("-");e("#zxcvbn-warning").text("-"),""!=s.feedback.warning&&e("#zxcvbn-warning").html('<span class="label label-warning">'+a(s.feedback.warning)+"</span>");if(e("#zxcvbn-suggestion").text("-"),s.feedback.suggestions.length>0){e("#zxcvbn-suggestion").text("");for(var n=0;n<s.feedback.suggestions.length;n++)e("#zxcvbn-suggestion").append('<div><span class="badge">#'+n+"</span>"+a(s.feedback.suggestions[n])+"</div>")}}function l(s){var r,n=0;try{r=new Score(s),n=r.calculateEntropyScore(m),n=Math.floor(n)}catch(e){n=0}var i=100-100*Math.pow(Math.E,-.020117973905426252*n);i=n>=80?100:Math.floor(i),g+=i*w,o("#results-ps",i,i+"% ("+n+" Bits)");var c=t(r.calculateAverageTimeToCrack(n,6));e("#ps-cracktime").text(a(c));if(e("#ps-found-matches-list").html("<tr><td>-</td><td>-</td><td>-</td></tr>"),r.cache.minimumMatches&&r.cache.minimumMatches.length>0){e("#ps-found-matches-list").text("");for(var l=[],u=0;u<r.cache.minimumMatches.length;u++){var d=r.cache.minimumMatches[u].pattern,h=r.cache.minimumMatches[u].entropy.toFixed(2),p=r.cache.minimumMatches[u].type;-1==l.indexOf(d)&&(l.push(d),e("#ps-found-matches-list").append("<tr><td>"+d+"</td><td>"+h+"</td><td>"+a(p)+"</td></tr>"))}}}function u(){var t=n();e("#password-length-value").text(t.length),t.length>=80?e("#long-password-warning").css("display","block"):e("#long-password-warning").css("display",""),i(t),c(t),l(t),g=Math.floor(g),o("#results-total",g,g+"%"),g=0}function d(){s(function(){p.iterate(function(e,t){e=e;for(var a=0;a<f.length;a++)f[a].name==t&&"ajax"==e.method&&(f[a].loaded=!0)},function(){for(var e=0;e<f.length;e++)!function(e){if(1==f[e].loaded)return"continue";p.setItem(f[e].name,{method:"ajax",status:"loading",length:0},function(){s(function(){WordlistParser.loadViaAjax(CTO_Globals.base+CTO_Globals.pluginRootPath+f[e].name,function(t){WordlistParser.storeInBrowserStorage(h,f[e].name,t,function(){var a="unused";CTO_Globals.lang==f[e].langSuffix&&(a="used"),p.setItem(f[e].name,{method:"ajax",status:a,length:t.length},function(){r(function(){s(function(){u()})})})})})})})}(e)})})}var h=localforage.createInstance({name:"wordlistStorage"}),p=localforage.createInstance({name:"wordlistConfigStorage"}),f=[{name:"wordlists/english.txt",loaded:!1,langSuffix:"en"},{name:"wordlists/german.txt",loaded:!1,langSuffix:"de"}],m=[],g=0,w=.2;e("#show-password-checkbox").change(function(){e(this).is(":checked")?e("#password-input").attr("type","text"):e("#password-input").attr("type","password")}),e("#password-input").on("input",u),e("#show-wordlists-checkbox").change(function(){e(this).is(":checked")?(e("#wordlist-inputs").css("display","block"),d()):e("#wordlist-inputs").css("display","none")}),e(document).on("change","input.wordlist-input",function(){var e=this.files[0];e&&p.setItem(e.name,{method:"file",status:"loading",length:0},function(){s(function(){WordlistParser.loadFromFile(e,function(t){WordlistParser.storeInBrowserStorage(h,e.name,t,function(){p.setItem(e.name,{method:"file",status:"used",length:t.length},function(){r(function(){s(function(){u()})})})})})})})}),e(document).on("change",".ps-use-wordlist",function(){var t=e(this).attr("data-wordlistkey"),a="";a=e(this).is(":checked")?"used":"unused",p.getItem(t,function(e,n){var o={method:n.method,status:a,length:n.length};p.setItem(t,o,function(){r(function(){s(function(){u()})})})})}),e(document).on("click",".ps-delete-wordlist",function(){var t=e(this).attr("id");t=t.replace("ps-delete-wordlist-",""),p.setItem(t,{method:"file",status:"loading",length:0},function(){s(function(){WordlistParser.removeFromBrowserStorage(h,t,function(){p.removeItem(t,function(){r(function(){s(function(){u()})})})})})})}),function(t){e("#password-input").val(""),e("#show-password-checkbox").prop("checked",!0),e("#show-wordlists-checkbox").prop("checked",!1)}(),function(){var t=!0;File&&FileReader&&FileList||(t=!1),localforage.supports(localforage.INDEXEDDB)||(t=!1),0==t&&e("#compatibility-warning").css("display","block")}(),r()})}(jQuery);