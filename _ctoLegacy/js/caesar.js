//*******************************(service-layer)
//*******************************
//*******************************
function CTOCaesarAlgorithm(alpha)
{
    var alphabet = alpha;
    this.getAlphabet = getAlphabet;
    function getAlphabet()
    {
        return alphabet;
    }


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
	// key = key(int)
	// text = plaintext/chipertext(string)
	// type = "decrypt" / "encrypt" (string)
	// handle = "ignore"->ignore invalid signs / else->remove invalid signs (string)
	this.crypt = crypt;
    function crypt(key, text, type, handle)
    {
        var alphaLen = alphabet.length;
        var i, n = 0;
        var chiffre = "";

        if (type == "decrypt")
            key = alphaLen - key;
        key = key % alphaLen;
        for (i = 0; i < text.length; i++)
        {
            n = alphabet.indexOf(text.charAt(i));

            if (n >= 0)
                chiffre = chiffre + alphabet.charAt((n + key) % alphaLen);
            else

                if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                    chiffre = chiffre + text.charAt(i);
        }

        return chiffre;
    }
}

//*******************************(gui-access-layer)
//*******************************
//*******************************
function CTOCaesarGuiAccess()
{
    var alphabet = ""; //alphabet to start with
    var cryptoclass = new CTOCaesarAlgorithm(alphabet);
    var ctolib = new CTOLib()
    var global_plaintextabc="";
    var global_ciphertextabc="";


	//@author Christian Sieche
	//@version 27.12.2008
	//@params: click(int) item which has been clicked. 1=uppercase, 2=blanks, 3=digits,
	//                                                 4=punctuation marks, 5=lowercase, 6=umlauts
	this.setAlphabet = setAlphabet; //specify the alphabet
	function setAlphabet(click)
	{
		// 0=click(int), 1=uppercase(boolean), 2=blanks(boolean),
		// 3=digits(boolean), 4=punctuation marks(boolean), 5=lowercase(boolean),
		// 6=umlauts(boolean), 7=rot-13(boolean), 8=alphabet(string)

			//ROT-13
			if (click==7 && document.getElementById("rot13").checked==true)
			{
				document.getElementById("key").value=13;
			}
			//ROT-13


		params = new Array(     click,
							   	document.getElementById("uppercase").checked,
								document.getElementById("blanks").checked,
								document.getElementById("digits").checked,
								document.getElementById("punctuationmarks").checked,
								document.getElementById("lowercase").checked,
								document.getElementById("umlauts").checked,
								document.getElementById("rot13").checked,
								alphabet);

		params = ctolib.setAlphabet(params);

		document.getElementById("uppercase").checked = params[1];
		document.getElementById("blanks").checked = params[2];
		document.getElementById("digits").checked = params[3];
		document.getElementById("punctuationmarks").checked = params[4];
		document.getElementById("lowercase").checked = params[5];
		document.getElementById("umlauts").checked = params[6];
		document.getElementById("rot13").checked = params[7];
		alphabet = params[8];

		document.getElementById("plaintextabc").innerHTML = alphabet;
		document.getElementById("alphalength").value = alphabet.length;
		parseAlphabet();
		cryptoclass = new CTOCaesarAlgorithm(alphabet);
		caesarCrypt(false);
	}




	//if a key is pressed highlight the key in the shown alphabet
	//@author Christian Sieche
	//@version 23.12.2008
	//@params: key(int) (char code of key)
	//         type (string)  "encode" or "decode"
    this.keyPress = keyPress;
    function keyPress(key, type) //check the key
    {
	  if (key != 15)
	  {
	   var plaintextalphabet=global_plaintextabc;
	   var ciphertextalphabet=global_ciphertextabc;
	   var char = String.fromCharCode(key);
	   
	   //upper / lower-case check
	   	var up = document.getElementById("uppercase").checked;
	   	var lo = document.getElementById("lowercase").checked;
	   	var sen = document.getElementById("casesensitiv").checked;
	   	if(!sen && ((up && !lo) || (!up && lo)))
	   	{
	   		if (up) char = char.toUpperCase();
	   		else char = char.toLowerCase();
		}


    	if (type=="encode")
		{
			plaintextalphabet = plaintextalphabet.replace(char, "<span class=\"ctoformcss-alphabethighlight-style\">"+char+"</span>");
			var cipherchar= cryptoclass.crypt(document.getElementById("key").value, char, "encrypt", "ignore");
			ciphertextalphabet = ciphertextalphabet.replace(cipherchar, "<span class=\"ctoformcss-alphabethighlight-style\">"+cipherchar+"</span>");

		}
		else
		{
			ciphertextalphabet = ciphertextalphabet.replace(char, "<span class=\"ctoformcss-alphabethighlight-style\">"+char+"</span>");
			var plainchar = cryptoclass.crypt(document.getElementById("key").value, char, "decrypt", "ignore");
			plaintextalphabet = plaintextalphabet.replace(plainchar, "<span class=\"ctoformcss-alphabethighlight-style\">"+plainchar+"</span>");
		}
		document.getElementById("plaintextabc").innerHTML = plaintextalphabet;
		document.getElementById("ciphertextabc").innerHTML = ciphertextalphabet;
      }
    }



    //@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.checkKey = checkKey;
    function checkKey(nocrypt) //check the key
    {
		var key = document.getElementById("key").value;
		var valid = "0123456789"

		key = ctolib.cleanInputString(key,valid, true)

		if (key != "")
        {
            key = parseInt(key);

            if (key < 0)
                key = 0;

            if (key > alphabet.length - 1)
                key = alphabet.length - 1;
            document.getElementById("key").value = key;
            if (nocrypt!=true) parseAlphabet();
        }
        else
        {
            document.getElementById("key").value = "0";
            parseAlphabet();
            document.getElementById("key").value = "";
        }
    }


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
	//@version 23.12.2008
	//@params:
    this.increaseKey = increaseKey;
    function increaseKey()
    {
        var key = document.getElementById("key").value;
        key=ctolib.increaseKey(key, alphabet);
        document.getElementById("key").value = key;
        parseAlphabet();
    }


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.decreaseKey = decreaseKey;
    function decreaseKey()
    {
        var key = document.getElementById("key").value;
        key=ctolib.decreaseKey(key, alphabet);
        document.getElementById("key").value = key;
        parseAlphabet();
    }

	//parses the alphabet to the key
	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.parseAlphabet = parseAlphabet;
    function parseAlphabet()
    {
        var key = document.getElementById("key").value;

        if (key == "")
            key = 0;
        key = parseInt(key);
        var out1 = '';
        var out2 = '';
        var i = 0;
        var alphaLen = alphabet.length;

		if (key > alphaLen)
		{
			key = alphaLen-1;
			if (key < 0) key = 0;
			document.getElementById("key").value = key;
		}

        for (i = 0; i < alphaLen; i++)
        {
            out1 = out1 + alphabet.charAt(i);
        }
        for (i = 0; i < alphaLen; i++)
        {
            out2 = out2 + alphabet.charAt((i + key) % alphaLen);
        }
        document.getElementById("plaintextabc").innerHTML = out1;
        document.getElementById("ciphertextabc").innerHTML = out2;
        global_plaintextabc=out1;
        global_ciphertextabc=out2;

        if (key != 13)
            document.getElementById("rot13").checked = false;
		document.getElementById("alphalength").value=alphaLen;
        caesarCrypt(false);
    }



	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
	// type = "encode" or "decode" (string)

    this.caesarCrypt = caesarCrypt;
    function caesarCrypt(type) //starts encryption
    {

        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOCaesarForm1.code[0].checked = true;
            document.CTOCaesarForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOCaesarForm1.code[0].checked = false;
            document.CTOCaesarForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOCaesarForm1.code.length; i++)

            if (document.CTOCaesarForm1.code[i].checked)
                type = document.CTOCaesarForm1.code[i].value;
        var codtxtlayout = $('codtxt');
        var orgtxtlayout = $('orgtxt');
        
        checkKey(true);

        if (type == "encode")
        {
			document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var orgtext = document.CTOCaesarForm1.orgtxt.value;

            if (document.getElementById("uppercase").checked == true && document.getElementById("lowercase").checked == false && document.getElementById("casesensitiv").checked == false)
                orgtext = orgtext.toUpperCase();

            if (document.getElementById("uppercase").checked == false && document.getElementById("lowercase").checked == true && document.getElementById("casesensitiv").checked == false)
                orgtext = orgtext.toLowerCase();
            var isInputOK = isInputOK = ctolib.inputString(orgtext, alphabet);

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
                output = cryptoclass.crypt(document.getElementById("key").value, orgtext, "encrypt", "ignore");
            }
            else
                output = cryptoclass.crypt(document.getElementById("key").value, orgtext, "encrypt", "remove");

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
            var isInputOK = isInputOK = ctolib.inputString(codtext,alphabet);

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
                output = cryptoclass.crypt(document.getElementById("key").value, codtext, "decrypt", "ignore");
            }
            else
                output = cryptoclass.crypt(document.getElementById("key").value, codtext, "decrypt", "remove");
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





//create caesar object with alphabet and start necessary scripts
var CTOCaesarScripts = new CTOCaesarGuiAccess();