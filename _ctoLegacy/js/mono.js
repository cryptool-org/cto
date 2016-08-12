//*******************************(service-layer)
//*******************************
//*******************************
function CTOMonoAlgorithm()
{
	//@author Christian Sieche
	//@version 19.05.2010
	//@params:
	// key = key(int)
	// text = plaintext/chipertext(string)
	// type = "decrypt" / "encrypt" (string)
	// handle = "ignore"->ignore invalid signs / else->remove invalid signs (string)
	this.crypt = crypt;
    function crypt(plaintextabc, ciphertextabc, sensetiv, text, type, handle)
    {
        if (sensetiv==false)
        {
          plaintextabc=plaintextabc.toLowerCase();
          ciphertextabc=ciphertextabc.toLowerCase();
          plaintextabc+=plaintextabc.toUpperCase();
          ciphertextabc+=ciphertextabc.toUpperCase();
        }
         
         
       if (type=="encrypt")
       {   
        var alphaLen = plaintextabc.length;
        var i, n = 0;
        var chiffre = "";

        for (i = 0; i < text.length; i++)
        {
            n = plaintextabc.indexOf(text.charAt(i));

            if (n >= 0)
                chiffre = chiffre + ciphertextabc.charAt(n);
            else
                if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                    chiffre = chiffre + text.charAt(i);
        }
       }
       
       else
       {   
        var alphaLen = ciphertextabc.length;
        var i, n = 0;
        var chiffre = "";

        for (i = 0; i < text.length; i++)
        {
            n = ciphertextabc.indexOf(text.charAt(i));

            if (n >= 0)
                chiffre = chiffre + plaintextabc.charAt(n);
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
function CTOMonoGuiAccess()
{
    var ctolib = new CTOLib()
    var global_plaintextabc= "abcdefghijklmnopqrstuvwxyz";
    var global_ciphertextabc="qwertz*/&pas§$%hjklyxcvbnm";
    var cryptoclass = new CTOMonoAlgorithm();
    
  
    //@author Christian Sieche
	  //@version 19.05.2010
	  //@params:
	  // type = "encode" or "decode" (string)
    this.checkAlphabet = checkAlphabet;
    function checkAlphabet() //checks lenght, and multiple use of a sign
    {
        global_plaintextabc=document.CTOMonoForm1.plaintextabc.value;
        global_ciphertextabc=document.CTOMonoForm1.ciphertextabc.value;
        
        if (global_plaintextabc!="ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase() || global_ciphertextabc!="ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase())
          document.getElementById("atbash").checked = false;
        else if (global_plaintextabc=="ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase() && global_ciphertextabc=="ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase())
          document.getElementById("atbash").checked = true;
          
        global_plaintextabc_length=global_plaintextabc.length;
        global_ciphertextabc_length=global_ciphertextabc.length;
        document.getElementById("alphalength").value = global_plaintextabc_length;
        document.getElementById("alphaBlength").value = global_ciphertextabc_length;  
        var ok=true;
        if (global_plaintextabc_length != global_ciphertextabc_length) ok=false;
        if (uniqueTest(global_plaintextabc) == false) ok=false;
        if (uniqueTest(global_ciphertextabc) == false) ok=false;
        
        if (ok==false)
        {
          document.getElementById('plaintextabc').className = 'ctomonocss-invalid-style';
          document.getElementById('ciphertextabc').className = 'ctomonocss-invalid-style';
        }
        else
        {
          document.getElementById('plaintextabc').className = 'ctomonocss-txtsyncinput-style';
          document.getElementById('ciphertextabc').className = 'ctomonocss-txtsyncinput-style';
        }

        return ok;
    }


  //check if all signs are unique
	//@author Christian Sieche
	//@version 19.05.2010
	//@params:
	//          teststring (string) -> string to test
  this.uniqueTest = uniqueTest ;
	function uniqueTest(teststring)
	{
    var casesensitiv = document.getElementById("casesensitiv").checked;
    if (casesensitiv==false) teststring=teststring.toLowerCase();
    
    
		for (var i=0; i<teststring.length; i++)
		{
			var found = false;
			for (var j=i+1; j<teststring.length && found==false; j++)
			{
				if (teststring.charAt(i)==teststring.charAt(j)) found=true;
			}

			if (found == true) return (false);
		}
		return (true);
	}
	
	
	//sets atbash cipher
	//@author Christian Sieche
	//@version 27.05.2010
	//@params:
  this.Atbash = Atbash ;
	function Atbash()
	{
     if (document.getElementById("atbash").checked == true)
     {
        document.CTOMonoForm1.plaintextabc.value="ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
        global_plaintextabc="ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
        document.CTOMonoForm1.ciphertextabc.value="ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase();
        global_ciphertextabc="ZYXWVUTSRQPONMLKJIHGFEDCBA".toLowerCase();
        monoCrypt("none");
     } 
	}


	//@author Christian Sieche
	//@version 19.05.2010
	//@params:
	// type = "encode" or "decode" (string)

    this.monoCrypt = monoCrypt;
    function monoCrypt(type) //starts encryption
    {
        checkAlphabet();
        
        if (type == "none")
        {
            if (document.CTOMonoForm1.code[0].checked==true) type="encode";
            else type = "decode";
        }
        
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOMonoForm1.code[0].checked = true;
            document.CTOMonoForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOMonoForm1.code[0].checked = false;
            document.CTOMonoForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOMonoForm1.code.length; i++)

            if (document.CTOMonoForm1.code[i].checked)
                type = document.CTOMonoForm1.code[i].value;
        var codtxtlayout = $('codtxt')
        var orgtxtlayout = $('orgtxt')

        if (type == "encode")
        {
			      document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var orgtext = document.CTOMonoForm1.orgtxt.value;
            var casesensitiv = document.getElementById("casesensitiv").checked;
            var isInputOK = false;
            if (casesensitiv == true)
              isInputOK = ctolib.inputString(orgtext, global_plaintextabc);
            else //not case sensitiv
            {
              var tempabc=global_plaintextabc.toUpperCase();
              tempabc+=global_plaintextabc.toLowerCase();
              isInputOK = ctolib.inputString(orgtext, tempabc);
            }
            if (isInputOK == false)
            {
                document.getElementById('orgtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else
            {
                document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }
            var output;
            var handle = "straight";
            if (document.getElementById("signs").checked==true) handle = "ignore";
            output = cryptoclass.crypt(global_plaintextabc, global_ciphertextabc, casesensitiv, orgtext, "encrypt", handle);
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
            var codtext = document.CTOMonoForm1.codtxt.value;
            var casesensitiv = document.getElementById("casesensitiv").checked;
            var isInputOK=false;
            
            if (casesensitiv == true)
              isInputOK = ctolib.inputString(codtext, global_ciphertextabc);
            else //not case sensitiv
            {
              var tempabc=global_ciphertextabc.toUpperCase();
              tempabc+=global_ciphertextabc.toLowerCase();
              isInputOK = ctolib.inputString(codtext, tempabc);
            }
            //alert(casesensitiv);
            if (isInputOK == false)
            {
                document.getElementById('codtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else
            {
                document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }
            var output;
            
            var handle = "straight";
            if (document.getElementById("signs").checked==true) handle = "ignore";
            output = cryptoclass.crypt(global_plaintextabc, global_ciphertextabc, casesensitiv, codtext, "decrypt", handle);
            document.getElementById("orgtxt").value = output;
        }
    }


}


//create mono object with alphabet and start necessary scripts
var CTOMonoScripts = new CTOMonoGuiAccess();