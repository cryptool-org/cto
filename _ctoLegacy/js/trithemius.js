//*******************************(service-layer)
//*******************************
//*******************************

function CTOTrithemiusAlgorithm(alpha)
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

function CTOTrithemiusGuiAccess ()
{
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var cryptoclass = new CTOTrithemiusAlgorithm(alphabet);
	var ctolib = new CTOLib();





	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
	// type = "encode" or "decode"

    this.trithemiusCrypt = trithemiusCrypt;
    function trithemiusCrypt(type) //starts encryption
    {

        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOTrithemiusForm1.code[0].checked = true;
            document.CTOTrithemiusForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOTrithemiusForm1.code[0].checked = false;
            document.CTOTrithemiusForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOTrithemiusForm1.code.length; i++)

            if (document.CTOTrithemiusForm1.code[i].checked)
                type = document.CTOTrithemiusForm1.code[i].value;
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
                output = cryptoclass.crypt("ABCDEFGHIJKLMNOPQRSTUVWXYZ", orgtext, "encrypt", "ignore");
            }
            else
                output = cryptoclass.crypt("ABCDEFGHIJKLMNOPQRSTUVWXYZ", orgtext, "encrypt", "remove");

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
                output = cryptoclass.crypt("ABCDEFGHIJKLMNOPQRSTUVWXYZ", codtext, "decrypt", "ignore");
            }
            else
                output = cryptoclass.crypt("ABCDEFGHIJKLMNOPQRSTUVWXYZ", codtext, "decrypt", "remove");
            document.getElementById("orgtxt").value = output;
     }   
    }


}





//create trithemius object with alphabet and start necessary scripts
var CTOTrithemiusScripts = new CTOTrithemiusGuiAccess();