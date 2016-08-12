//*******************************(service-layer)
//*******************************
//*******************************

function CTOGronsfeldAlgorithm(alpha)
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
    	  //translate the key to vigenere cipher START
    	  var keyarray = key.split("");
    	  key="";	  
    	  for (i=0; i < keyarray.length; i++)
    	  {
    	       switch (keyarray[i]) {
                   case "0": key+="A";
                   break;
                   case "1": key+="B";
                   break;
                   case "2": key+="C";
                   break;
                   case "3": key+="D";
                   break;
                   case "4": key+="E";
                   break;
                   case "5": key+="F";
                   break;
                   case "6": key+="G";
                   break;
                   case "7": key+="H";
                   break;
                   case "8": key+="I";
                   break;
                   case "9": key+="J";
                   break;
                   default:
                   break;
            }
    	  }  	   
    	  //translate the key to vigenere cipher END
    	
    	
     	  for (i=0; i < text.length; i++)
     	  {
          	 zp = alphabet.indexOf(text.charAt(i));
          	 if (zp >= 0)
          	 {
             	 kp      = alphabet.indexOf(key.charAt(j));
                 if (type=="encrypt") chiffre = chiffre + alphabet.charAt((zp+kp) % alphaLen);
                 else                 chiffre = chiffre + alphabet.charAt((alphaLen+(zp-kp)) % alphaLen);
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

function CTOGronsfeldGuiAccess ()
{
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var cryptoclass = new CTOGronsfeldAlgorithm(alphabet);
	var ctolib = new CTOLib();


	//@author Christian Sieche
	//@version 26.12.2008
	//@params: click(int) item which has been clicked. 1=uppercase, 2=blanks, 3=digits,
	//                                                 4=punctuation marks, 5=lowercase, 6=umlauts

	
	//@author Christian Sieche
	//@version 26.12.2008
	//@params:
    this.checkKey = checkKey;
    function checkKey(nocrypt) //check the key
    {
            var key=document.getElementById("key").value;

			document.getElementById("key").value=ctolib.cleanInputString(key, "0123456789", false);
			if (nocrypt!=true) gronsfeldCrypt(false);
    }


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
	// type = "encode" or "decode"

    this.gronsfeldCrypt = gronsfeldCrypt;
    function gronsfeldCrypt(type) //starts encryption
    {
        checkKey(true);
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOGronsfeldForm1.code[0].checked = true;
            document.CTOGronsfeldForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOGronsfeldForm1.code[0].checked = false;
            document.CTOGronsfeldForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOGronsfeldForm1.code.length; i++)

            if (document.CTOGronsfeldForm1.code[i].checked)
                type = document.CTOGronsfeldForm1.code[i].value;
        var codtxtlayout = $('codtxt')
        var orgtxtlayout = $('orgtxt')

        if (type == "encode")
        {
			document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            
            var orgtext = document.getElementById("orgtxt").value;
            orgtext = orgtext.toUpperCase();

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

           
                codtext = codtext.toUpperCase();

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
                output = cryptoclass.crypt(document.getElementById("key").value, codtext, "decrypt", "ignore");
            }
            else
                output = cryptoclass.crypt(document.getElementById("key").value, codtext, "decrypt", "remove");
            document.getElementById("orgtxt").value = output;
        }
    }


}


//create gronsfeld object with alphabet and start necessary scripts
var CTOGronsfeldScripts = new CTOGronsfeldGuiAccess();