//*******************************(service-layer)
//*******************************
//*******************************

function CTOBeaufortAlgorithm(alpha)
{

    var alphabet=alpha;

    this.getAlphabet=getAlphabet;
    function getAlphabet()
    {
    	return alphabet;
    }

	this.crypt = crypt;
	function crypt (key, text, type, handle)
	{
		var alphaLen = alphabet.length;
    	var i, j = 0;
    	var zp, kp  = 0;
    	var chiffre = "";

    	if (key != "")
    	{
     	  for (i=0; i < text.length; i++)
     	  {
          	 zp = alphabet.indexOf(text.charAt(i));
          	 if (zp >= 0)
          	 {
             	 kp      = alphabet.indexOf(key.charAt(j));
                 if (type=="encrypt") chiffre = chiffre + alphabet.charAt((kp-zp+alphaLen) % alphaLen);
                 else                 chiffre = chiffre + alphabet.charAt((kp-(zp-alphaLen)) % alphaLen);
                 j = (j+1) % key.length;
             }
             else
			 	if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
					 chiffre = chiffre + text.charAt(i);
          }
         }
         return chiffre;
    }
}


//*******************************(gui-access-layer)
//*******************************
//*******************************

function CTOBeaufortGuiAccess ()
{
	var alphabet = "";
    var cryptoclass = new CTOBeaufortAlgorithm(alphabet);
	var ctolib = new CTOLib();


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.ChangeParseAlphabetText = ChangeParseAlphabetText;
    function ChangeParseAlphabetText()
    {
    	//get latest status
    	var status=document.getElementById("vertical_status").innerHTML;
    	var alphtext;
    	//if its closed...
    	if (status=="close")
    	{
    		alphabetSlide.slideIn();
    		alphtext = document.getElementById("v_toggle").value;
    		alphtext = alphtext.replace(/>>/g, "<<");
    	}
    	else
    	{
    		alphabetSlide.slideOut();
    		alphtext = document.getElementById("v_toggle").value;
    		alphtext = alphtext.replace(/<</g, ">>");
    	}
    	document.getElementById("v_toggle").value = alphtext;
    }



	//@author Christian Sieche
	//@version 26.12.2008
	//@params: click(int) item which has been clicked. 1=uppercase, 2=blanks, 3=digits,
	//                                                 4=punctuation marks, 5=lowercase, 6=umlauts

	this.setAlphabet = setAlphabet; //specify the alphabet
	function setAlphabet(click)
	{
		// 0=click(int), 1=uppercase(boolean), 2=blanks(boolean),
		// 3=digits(boolean), 4=punctuation marks(boolean), 5=lowercase(boolean),
		// 6=umlauts(boolean), 7=rot-13(boolean), 8=alphabet(string)
		params = new Array(     click,
							   	document.getElementById("uppercase").checked,
								document.getElementById("blanks").checked,
								document.getElementById("digits").checked,
								document.getElementById("punctuationmarks").checked,
								document.getElementById("lowercase").checked,
								document.getElementById("umlauts").checked,
								false,
								alphabet);

		params = ctolib.setAlphabet(params);

		document.getElementById("uppercase").checked = params[1];
		document.getElementById("blanks").checked = params[2];
		document.getElementById("digits").checked = params[3];
		document.getElementById("punctuationmarks").checked = params[4];
		document.getElementById("lowercase").checked = params[5];
		document.getElementById("umlauts").checked = params[6];
		alphabet = params[8];

		document.getElementById("plaintextabc").innerHTML = ctolib.niceAlphabetOutput(alphabet);
		document.getElementById("alphalength").value = alphabet.length;
		cryptoclass = new CTOBeaufortAlgorithm(alphabet);
		beaufortCrypt(false);
	}



	//@author Christian Sieche
	//@version 26.12.2008
	//@params:
    this.checkKey = checkKey;
    function checkKey() //check the key
    {
            var key=document.getElementById("key").value;
            if (document.getElementById("uppercase").checked == true && document.getElementById("lowercase").checked == false && document.getElementById("casesensitiv").checked == false)
                key = key.toUpperCase();

            if (document.getElementById("uppercase").checked  == false && document.getElementById("lowercase").checked == true && document.getElementById("casesensitiv").checked == false)
                key = key.toLowerCase();
			document.getElementById("key").value=ctolib.cleanInputString(key, alphabet, true);
			beaufortCrypt(false);
    }


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
	// type = "encode" or "decode"

    this.beaufortCrypt = beaufortCrypt;
    function beaufortCrypt(type) //starts encryption
    {

        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOBeaufortForm1.code[0].checked = true;
            document.CTOBeaufortForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOBeaufortForm1.code[0].checked = false;
            document.CTOBeaufortForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOBeaufortForm1.code.length; i++)

            if (document.CTOBeaufortForm1.code[i].checked)
                type = document.CTOBeaufortForm1.code[i].value;
        var codtxtlayout = $('codtxt')
        var orgtxtlayout = $('orgtxt')
        
      //start check key
			var key = document.getElementById("key").value;
			var allowedkeys=alphabet;
      key = ctolib.cleanInputString(key, allowedkeys, false);
      document.getElementById("key").value=key;
   //end check key

        if (type == "encode")
        {
			document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var orgtext = document.getElementById("orgtxt").value;

            if (document.getElementById("uppercase").checked == true && document.getElementById("lowercase").checked == false && document.getElementById("casesensitiv").checked == false)
                orgtext = orgtext.toUpperCase();

            if (document.getElementById("uppercase").checked == false && document.getElementById("lowercase").checked == true && document.getElementById("casesensitiv").checked == false)
                orgtext = orgtext.toLowerCase();
            var isInputOK = ctolib.inputString(orgtext, alphabet);

            if (isInputOK == false)
            {
                document.getElementById('orgtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else
            {
                document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }
            var output;

            if (document.getElementById('signs').checked == true)
            {
                output = cryptoclass.crypt(key, orgtext, "encrypt", "ignore");
            }
            else
                output = cryptoclass.crypt(key, orgtext, "encrypt", "remove");

            if (document.getElementById("clean").checked == true)
            {
                output = output.replace(/ /g, "");
                var tmp = ctolib.str_split(output, 5);
                output = tmp.join(" ");
            }
            document.getElementById("codtxt").value = output;
        }

        if (type == "decode")
        {
			document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var codtext = document.getElementById("codtxt").value;

            if (document.getElementById("uppercase").checked == true && document.getElementById("lowercase").checked == false && document.getElementById("casesensitiv").checked == false)
                codtext = codtext.toUpperCase();

            if (document.getElementById("uppercase").checked == false && document.getElementById("lowercase").checked == true && document.getElementById("casesensitiv").checked == false)
                codtext = codtext.toLowerCase();
            var isInputOK = ctolib.inputString(codtext, alphabet);

            if (isInputOK == false)
            {
                document.getElementById('codtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else
            {
                document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }
            var output;

            if (document.getElementById('signs').checked == true)
            {
                output = cryptoclass.crypt(key, codtext, "decrypt", "ignore");
            }
            else
                output = cryptoclass.crypt(key, codtext, "decrypt", "remove");
            document.getElementById("orgtxt").value = output;
        }
    }


}

//FX.Slide Effekt
var alphabetSlide;
window.addEvent('domready', function() {
	var status = {
		'true': 'open',
		'false': 'close'
	};
	//-vertical
	this.alphabetSlide = new Fx.Slide('alphabet-options');
	this.alphabetSlide.hide();
	$('vertical_status').set('html', status[alphabetSlide.open]);
	// When Vertical Slide ends its transition, we check for its status
	// note that complete will not affect 'hide' and 'show' methods
	alphabetSlide.addEvent('complete', function() {
		$('vertical_status').set('html', status[alphabetSlide.open]);
	});

});



//create beaufort object with alphabet and start necessary scripts
var CTOBeaufortScripts = new CTOBeaufortGuiAccess();