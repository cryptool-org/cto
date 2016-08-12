//*******************************(service-layer)
//*******************************
//*******************************
function CTOMultiplikativeAlgorithm(alpha, cipheralpha)
{
    var alphabet = alpha;
    var cipheralpha = cipheralpha;
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
        {
        			for (i = 0; i < text.length; i++)
        			{
            			n = cipheralpha.indexOf(text.charAt(i));

            			if (n >= 0)
           			 	{

                           chiffre += alphabet.charAt(n);

        				}
        				else
							if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                    			chiffre = chiffre + text.charAt(i);
           			}


        }
		else //encrypt
		{
        for (i = 0; i < text.length; i++)
        {
            n = alphabet.indexOf(text.charAt(i));

            if (n >= 0)
            {

           		var pos;
				pos = n * key;
           		while (pos>alphaLen) pos-=alphaLen;

           		chiffre = chiffre + alphabet.charAt(pos);

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
function CTOMultiplikativeGuiAccess()
{
    var alphabet = ""; //alphabet to start with
    var cryptoclass = new CTOMultiplikativeAlgorithm(alphabet, global_ciphertextabc);
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

		document.getElementById("plaintextabc").innerHTML = alphabet;
		document.getElementById("alphalength").value = alphabet.length;



		var output="";
		output+="<select name='key' id='key' class='ctoformcss-default-button-m' onclick='CTOMultiplikativeScripts.parseAlphabet();'>";


		//get coprims euklid algorithm
		for (i=1; i<alphabet.length; i++)
		{
			var a=i;
			var b=alphabet.length;
			while (a!=b)
			{
				if      (a>b) a=a-b;
				else if (a<b) b=b-a;
			}
			if (a==1) output+="<option value="+i+">"+i+"</option>";
		}

		output+="</select>";


		document.getElementById("keys").innerHTML=output;
		parseAlphabet();
		cryptoclass = new CTOMultiplikativeAlgorithm(alphabet, global_ciphertextabc);
		multiplikativeCrypt(false);
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



	//parses the alphabet to the key
	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.parseAlphabet = parseAlphabet;
    function parseAlphabet()
    {
        var key = document.getElementById("key").value;
        key = parseInt(key);
        var out1 = '';
        var out2 = '';
        var i = 0;
        var alphaLen = alphabet.length;


        for (i = 0; i < alphaLen; i++)
        {
            out1 = out1 + alphabet.charAt(i);
        }
        for (i = 0; i < alphaLen; i++)
        {
           var pos = i * key;
           while (pos>alphaLen) pos-=alphaLen;
           out2 = out2 + alphabet.charAt(pos);
        }
        document.getElementById("plaintextabc").innerHTML = out1;
        document.getElementById("ciphertextabc").innerHTML = out2;
        global_plaintextabc=out1;
        global_ciphertextabc=out2;
		document.getElementById("alphalength").value=alphaLen;
		cryptoclass = new CTOMultiplikativeAlgorithm(alphabet, global_ciphertextabc);
        multiplikativeCrypt(false);
    }



	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
	// type = "encode" or "decode" (string)

    this.multiplikativeCrypt = multiplikativeCrypt;
    function multiplikativeCrypt(type) //starts encryption
    {

        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOMultiplikativeForm1.code[0].checked = true;
            document.CTOMultiplikativeForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOMultiplikativeForm1.code[0].checked = false;
            document.CTOMultiplikativeForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOMultiplikativeForm1.code.length; i++)

            if (document.CTOMultiplikativeForm1.code[i].checked)
                type = document.CTOMultiplikativeForm1.code[i].value;
        var codtxtlayout = $('codtxt')
        var orgtxtlayout = $('orgtxt')

        if (type == "encode")
        {
			document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var orgtext = document.CTOMultiplikativeForm1.orgtxt.value;

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





//create multiplikative object with alphabet and start necessary scripts
var CTOMultiplikativeScripts = new CTOMultiplikativeGuiAccess();