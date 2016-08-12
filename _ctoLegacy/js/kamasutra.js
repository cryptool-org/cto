//*******************************(service-layer)
//*******************************
//*******************************

function CTOKamasutraAlgorithm(alpha)
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
		  if (key.length % 2 != 0) return "";
		  var half = key.length/2;
		  
      var output="";
      
      
        for (i = 0; i < text.length; i++)
        {
            var n = key.indexOf(text.charAt(i));
            var m;
            

            if (n >= 0)
            {
                if (n < half) m = n+half;
                else m= n-half;
                output = output + key.charAt(m);
            }
            else

                if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                    output = output + text.charAt(i);
        }
		  return output;
  }
}


//*******************************(gui-access-layer)
//*******************************
//*******************************

function CTOKamasutraGuiAccess ()
{
	var alphabet = "kjzqiglxubyfhvpnwreamscdot";
    var cryptoclass = new CTOKamasutraAlgorithm(alphabet);
	var ctolib = new CTOLib();
	var global_plaintextabc="kjzqiglxubyfh";
  var global_ciphertextabc="vpnwreamscdot";


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
      var valid=uniqueTest(key);
			if (valid==false) 
      { 
        document.getElementById('key').className = 'ctoformcss-invalid-style ctoformcss-keylength-full';
        document.getElementById("plaintextabc").innerHTML = "";
        document.getElementById("ciphertextabc").innerHTML = "";
      }
      else document.getElementById('key').className = 'ctoformcss-txtinput-style ctoformcss-keylength-full';
      
      global_plaintextabc=key.substr(0, key.length/2);
      global_ciphertextabc=key.substr(key.length/2); 
      document.getElementById("plaintextabc").innerHTML = global_plaintextabc;
      document.getElementById("ciphertextabc").innerHTML = global_ciphertextabc;     
      kamasutraCrypt("newkey");
    }


  //check if all character are unique and keylength mod 2 = 0
	//@author Christian Sieche
	//@version 29.12.2008
	//@params:
	//teststring (string) -> string to test
	this.uniqueTest = uniqueTest ;
	function uniqueTest(teststring)
	{
	  if (teststring.length % 2 != 0) return (false);
		for (var i=0; i<teststring.length; i++)
		{
			var found = 0;
			for (var j=i+1; j<teststring.length; j++)
			{
				if (teststring.charAt(i)==teststring.charAt(j)) found++;
			}

			if (found>0) return (false);
		}
		return (true);
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
     if (plaintextalphabet.indexOf(char)!=-1)
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
	//@version 26.09.2010
	//@params:

    this.CreateAlphabet = CreateAlphabet;
    function CreateAlphabet() //starts encryption
    {
      var valid=new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
    
    for (i=0;i<500;i++)
    {
        var r1=Math.floor(Math.random()*valid.length);
        var r2=Math.floor(Math.random()*valid.length);
        var temp=valid[r1];
        valid[r1]=valid[r2];
        valid[r2]=temp;
    }
    document.getElementById("key").value=output=valid.join('');
    checkKey();
    }

	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
	// type = "encode" or "decode"

    this.kamasutraCrypt = kamasutraCrypt;
    function kamasutraCrypt(type) //starts encryption
    {
        //if (type!="newkey") checkKey(true);
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOKamasutraForm1.code[0].checked = true;
            document.CTOKamasutraForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOKamasutraForm1.code[0].checked = false;
            document.CTOKamasutraForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOKamasutraForm1.code.length; i++)

            if (document.CTOKamasutraForm1.code[i].checked)
                type = document.CTOKamasutraForm1.code[i].value;
        var codtxtlayout = $('codtxt')
        var orgtxtlayout = $('orgtxt')
        var key=document.getElementById("key").value;

        if (type == "encode")
        {
			document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            
            var orgtext = document.getElementById("orgtxt").value;
            var isInputOK = ctolib.inputString(orgtext, key);

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

            var isInputOK = ctolib.inputString(codtext, key);

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


//create kamasutra object with alphabet and start necessary scripts
var CTOKamasutraScripts = new CTOKamasutraGuiAccess();