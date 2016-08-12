//*******************************(service-layer)
//*******************************
//*******************************
function CTOJaegerAlgorithm()
{

	//@author Christian Sieche // Marc Renault
	//@version 21.05.2010
	//@params:
	// text = plaintext/chipertext(string)
	// type = "decrypt" / "encrypt" (string)
	// rails = key
	this.crypt = crypt;
    function crypt(text, type, depth, offset)
    {
       var result="";
         
       if (type=="encrypt")
       {   
        
          var plaintext, ciphertext, xs

          plaintext = text;
          plaintext = plaintext.replace(/\W/g, "")
          ciphertext = ""
      
          n = 2*(depth) - 2     // this is the period of the "wave"
      
          if (offset > 0) { offset = offset % n }
          if (offset < 0) { offset = (offset % n) + n }
      
          xs = ""
          for (i = 1; i <= offset; i++) { xs = xs + "#" }
          plaintext = xs + plaintext

          var railfenceoutput="";

          for (d = 0; d <= n/2; d++) {
              for (j = 0; j < plaintext.length; j++) {
                  if (j%n == d || j%n == n-d) {
                      ciphertext = ciphertext + plaintext.charAt(j);
                      railfenceoutput+=plaintext.charAt(j);
                  }
                  else railfenceoutput+=" ";
              }
              railfenceoutput+="\n";
          }
          ciphertext = ciphertext.replace(/#/g, "")
          result = ciphertext;
          document.getElementById("railfence").value = railfenceoutput;

       }
       
       else
       {   


        var plaintext, ciphertext, blocklen, increment, a, off, xs

        ciphertext = text;
        ciphertext = ciphertext.replace(/\W/g, "")
        plaintext = ""
    
        n = 2*(depth) - 2     // this is the period of the "wave"
    
        offset = offset % n
        if (offset < 0) { offset = offset + n }
    
        k = ciphertext.length + offset
    
        off = new Array()
        off[0] = Math.ceil(offset/n)
        for (i = 1; i < n/2; i++) {
            off[i] = Math.ceil( (offset-i)/n ) + Math.floor( (offset+i-1)/n )
        }
        off[n/2] = Math.ceil( (offset - n/2)/n )
    
        xs = new Array()
        for (i = 0; i <= n/2; i++) {
            if (off[i] == 0) { xs[i] = "" }
            if (off[i] == 1) { xs[i] = "X" }
            if (off[i] == 2) { xs[i] = "XX" }
        }
    
        a = new Array()
        ciphertext = xs[0] + ciphertext
        a[0] = ciphertext.slice(0, Math.ceil(k/n) ).split("")
        ciphertext = xs[1] + ciphertext.slice(Math.ceil(k/n))  // slices to end
        for (i = 1; i < n/2; i++) {
            blocklen = Math.ceil( (k-i)/n ) + Math.floor( (k+i-1)/n )
            a[i] = ciphertext.slice(0, blocklen).split("")
            ciphertext = xs[i+1] + ciphertext.slice(blocklen)
        }
        a[n/2] = ciphertext.split("")
    
        i = 0
        while (a[i].length > 0) {
            plaintext = plaintext + a[i].shift()
            if (i == 0) { increment = 1 }
            if (i == n/2) { increment = -1 }
            i = i + increment
        } 
    
        plaintext = plaintext.replace(/X/g, "")
        result = plaintext;

        //railfenceoutput
        crypt(plaintext, "encrypt", depth, offset);


       }


        return result;
    }
}

//*******************************(gui-access-layer)
//*******************************
//*******************************
function CTOJaegerGuiAccess()
{
    var ctolib = new CTOLib()
    var global_plaintextabc= "abcdefghijklmnopqrstuvwxyz";
    var global_ciphertextabc="qwertzuiopasdfghjklyxcvbnm";
    var cryptoclass = new CTOJaegerAlgorithm();
    
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
	
	
	//@author Christian Sieche
	//@version 21.05.2010
	//@params:
    this.checkOffset = checkOffset;
    function checkOffset(nocrypt) //check the offset
    {
		var offset = document.getElementById("offset").value;
		var valid = "0123456789"

		offset = ctolib.cleanInputString(offset,valid, true)

		if (offset != "")
        {
            offset = parseInt(offset);

            if (offset < 0)
                offset = 0;
            if (offset>=((document.getElementById("key").value)*2)-3) 
                offset=((document.getElementById("key").value)*2)-3;

            document.getElementById("offset").value = offset;
        }
        else
        {
            document.getElementById("offset").value = "";
        }
     
     if (document.getElementById("offset").value != "" && document.getElementById("key").value != "" && nocrypt!=true) jaegerCrypt("none");
    }
    
  //@author Christian Sieche
	//@version 21.02.2010
	//@params:
    this.increaseOffset = increaseOffset;
    function increaseOffset()
    {
        var offset = document.getElementById("offset").value;
        if (offset < ((document.getElementById("key").value)*2)-3) offset++;
        document.getElementById("offset").value = offset;
        if (document.getElementById("offset").value != "") jaegerCrypt("none");
    }


	//@author Christian Sieche
	//@version 21.02.2010
	//@params:
    this.decreaseOffset = decreaseOffset;
    function decreaseOffset()
    {
        var offset = document.getElementById("offset").value;
        if (offset>=1) offset--;
        document.getElementById("offset").value = offset;
        if (document.getElementById("offset").value != "") jaegerCrypt("none");
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

            if (key < 2)
                key = 2;

            document.getElementById("key").value = key;
        }
        else
        {
            document.getElementById("key").value = "";
        }
     
     checkOffset(nocrypt);
    }
    
  //@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.increaseKey = increaseKey;
    function increaseKey()
    {
        var key = document.getElementById("key").value;
        key++;
        document.getElementById("key").value = key;
        checkOffset();
    }


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.decreaseKey = decreaseKey;
    function decreaseKey()
    {
        var key = document.getElementById("key").value;
        if (key>=3) key--;
        document.getElementById("key").value = key;
        checkOffset();
    }

	//@author Christian Sieche
	//@version 19.05.2010
	//@params:
	// type = "encode" or "decode" (string)

    this.jaegerCrypt = jaegerCrypt;
    function jaegerCrypt(type) //starts encryption
    {
       
        if (type == "none")
        {
            if (document.CTOJaegerForm1.code[0].checked==true) type="encode";
            else type = "decode";
        }
        
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOJaegerForm1.code[0].checked = true;
            document.CTOJaegerForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOJaegerForm1.code[0].checked = false;
            document.CTOJaegerForm1.code[1].checked = true;
        }
        //get value of radiogroup
        
        checkKey(true);
        
        var type;
        for (var i = 0; i < document.CTOJaegerForm1.code.length; i++)

            if (document.CTOJaegerForm1.code[i].checked)
                type = document.CTOJaegerForm1.code[i].value;


        var key=document.getElementById("key").value;
        var offset=document.getElementById("offset").value;
        var output;

        if (type == "encode")
        {
			      document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var orgtext = document.CTOJaegerForm1.orgtxt.value;
            var orgtext2 = orgtext.replace(/#/g, "");
            if (orgtext2!=orgtext) 
            {
              orgtext=orgtext2;
              document.getElementById("orgtxt").value = orgtext;
            }
              
            output = cryptoclass.crypt(orgtext, "encrypt", key, offset);
            document.getElementById("codtxt").value = output;
        }

        if (type == "decode")
        {
			      document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var codtext = document.CTOJaegerForm1.codtxt.value;
            output = cryptoclass.crypt(codtext, "decrypt", key, offset);
            document.getElementById("orgtxt").value = output;
        }
    }


}


//create jaeger object with alphabet and start necessary scripts
var CTOJaegerScripts = new CTOJaegerGuiAccess();