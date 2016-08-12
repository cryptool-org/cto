//*******************************
//*******************************
function CTOMorsecodeAlgorithm ()
{
    this.encrypt = encrypt;
    function encrypt(character) //starts encryption
    {
      var output="";
      switch (character)
			  {
    	             case "a": output+=".- ";
                   break;
                   case "b": output+="-... ";
                   break;

                   case "c": output+="-.-. ";
                   break;
                   case "d": output+="-.. ";
                   break;

                   case "e": output+=". ";
                   break;
                   case "f": output+="..-. ";
                   break;

                   case "g": output+="--. ";
                   break;
                   case "h": output+=".... ";
                   break;

                   case "i": output+=".. ";
                   break;
                   case "j": output+=".--- ";
                   break;
                   case "k": output+="-.- ";
                   break;

                   case "l": output+=".-.. ";
                   break;
                   case "m": output+="-- ";
                   break;

                   case "n": output+="-. ";
                   break;
                   case "o": output+="--- ";
                   break;

                   case "p": output+=".--. ";
                   break;
                   case "q": output+="--.- ";
                   break;

                   case "r": output+=".-. ";
                   break;
                   case "s": output+="... ";
                   break;

                   case "t": output+="- ";
                   break;
                   case "u": output+="..- ";
                   break;
                   case "v": output+="...- ";
                   break;

                   case "w": output+=".-- ";
                   break;
				           
                   case "x": output+="-..- ";
                   break;

                   case "y": output+="-.-- ";
                   break;

                   case "z": output+="--.. ";
                   break;
                   
                   case "1": output+=".---- ";
                   break;
                   case "2": output+="..--- ";
                   break;

                   case "3": output+="...-- ";
                   break;
                   case "4": output+="....- ";
                   break;
                   case "5": output+="..... ";
                   break;

                   case "6": output+="-.... ";
                   break;
				           
                   case "7": output+="--... ";
                   break;

                   case "8": output+="---.. ";
                   break;

                   case "9": output+="----. ";
                   break;
                   
                   case "0": output+="----- ";
                   break;
                   
                   
                   case " ": output+="/ ";
                   break;
                   
                   
                   case ".": output+=".-.-.- ";
                   break;
                   
                   case ",": output+="--..-- ";
                   break;
                   
                   case "?": output+="..--..  ";
                   break;
                   
                   case "'": output+=".----. ";
                   break;
                   
                   case "!": output+="-.-.-- ";
                   break;
                   
                   case "/": output+="-..-. ";
                   break;
                   
                   case "(": output+="-.--. ";
                   break;
                   
                   case ")": output+="-.--.- ";
                   break;
                   
                   case "&": output+=".-... ";
                   break;
                   
                   case "@": output+=".--.-. ";
                   break;
                   
                   case "$": output+="...-..- ";
                   break;
                   
                   case '"': output+=".-..-. ";
                   break;
                   case "_": output+="..--.- ";
                   break;

                   case "-": output+="-....- ";
                   break;
                   case "+": output+=".-.-. ";
                   break;
                   case "=": output+="-...- ";
                   break;

                   case ";": output+="-.-.-. ";
                   break;
				           
                   case ":": output+="---... ";
                   break;
                   
                   
                   case "ä": output+=".-.- ";
                   break;
                   case "ö": output+="---. ";
                   break;

                   case "ü": output+="..-- ";
                   break;
              }
          return (output);
     }

}








function CTOMorsecodeGuiAccess ()
{
	var ctolib = new CTOLib();
	var morsealgo = new CTOMorsecodeAlgorithm();
	
	
	
	  //plaintext keypress
	  this.keyPress = keyPress;
    function keyPress(code) //starts encryption
    {
      //does the user wants the sound to be played?
      if (document.getElementById("directplay").checked==true)
      {
          var charcode = String.fromCharCode(code);
          charcode=charcode.toLowerCase();
          //is it a valid sign
          if (ctolib.inputString(charcode, "1234567890abcdefghijklmnopqrstuvwxyz äöü \.\,\?\!\/\(\)\&\:\;\=\+\-\_\$\@\"") == true)
          {
            //get morse code
            charcode=morsealgo.encrypt(charcode);
            //play morse code
            morsechar(charcode);   
          }
      }  
	  }
	  
	  //ciphertext keypress
	  this.keyPress2 = keyPress2;
    function keyPress2(code) //starts encryption
    {
      //does the user wants the sound to be played?
      if (document.getElementById("directplay2").checked==true)
      {
          var charcode = String.fromCharCode(code);
          if (charcode==".") morsechar("0");
          if (charcode=="-") morsechar("1"); 
      }  
	  }
	  
	  
	   
	
	  //@author Christian Sieche
	  //@version 23.12.2008
	  //@params:
	  this.checkSpeed = checkSpeed;
    function checkSpeed() //starts encryption
    {
      var speed = document.getElementById("speed").value;
  		var valid = "0123456789"
  
  		speed = ctolib.cleanInputString(speed,valid, true)
  
  		if (speed != "")
          {
              speed = parseInt(speed);
  
              if (speed < 0)
                  speed = 0;
  
              if (speed > 1000)
                  speed = 1000;
              document.getElementById("speed").value = speed;
          }
          else
          {
              document.getElementById("speed").value = "";
          }
	  }
	
	
	
	
	  this.morseSoundStop = morseSoundStop;
    function morseSoundStop() //starts encryption
    {
      document.getElementById("playcode").value=document.getElementById("b1").value;   
    }
	
	  this.morsechar = morsechar;
    function morsechar(ciphertext) //starts encryption
    {
        ciphertext = ciphertext.replace(/\./g, "0");
        ciphertext = ciphertext.replace(/\-/g, "1");
        ciphertext = ciphertext.replace(/ /g, "2");
        ciphertext = ciphertext.replace(/\//g, "3");
	      document.Morse.startit(ciphertext,35,true);
    }
	
	
	  this.morseall = morseall;
    function morseall() //starts encryption
    {
      var ciphertext = document.getElementById("codtxt").value;
      var speed =  document.getElementById("speed").value;
      if (speed=="")
      {
        document.getElementById("speed").value = "60";
        speed=60;
      }
      if (speed<20) 
      {
        speed=20;
        document.getElementById("speed").value = "20";
      }
      speed = parseInt(speed);
      ciphertext = ctolib.cleanInputString(ciphertext, ".-/ ", false);
      ciphertext = ciphertext.replace(/\./g, "0");
      ciphertext = ciphertext.replace(/\-/g, "1");
      ciphertext = ciphertext.replace(/ /g, "2");
      ciphertext = ciphertext.replace(/\//g, "3");
      //button 1 verstecken
      //button 2 sichtbar machen
      document.getElementById("playcode").value=document.getElementById("b2").value;   
      
      
	    document.Morse.startit(ciphertext,speed,false);
    }
	
	

	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.morsecodeCrypt = morsecodeCrypt;
    function morsecodeCrypt(type) //starts encryption
    {
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOMorsecodeForm1.code[0].checked = true;
            document.CTOMorsecodeForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOMorsecodeForm1.code[0].checked = false;
            document.CTOMorsecodeForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOMorsecodeForm1.code.length; i++)
			if (document.CTOMorsecodeForm1.code[i].checked)
                type = document.CTOMorsecodeForm1.code[i].value;

        if (type == "encode")
        {
			var plaintext = document.getElementById("orgtxt").value;
			//remove blanks

        	//check if its valid
        	plaintext=plaintext.toLowerCase();
        	if (ctolib.inputString(plaintext, "1234567890abcdefghijklmnopqrstuvwxyz äöü \.\,\?\'\!\/\(\)\&\:\;\=\+\-\_\$\@\"") == false)
        	{
        		document.getElementById("orgtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
        	}
        	else document.getElementById("orgtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
        	document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';

        	//encode
        	var arr=plaintext.split("");
        	var output="";
    			for (var i=0; i<arr.length; i++)
    			{
			      var tmp=arr[i];
			      output+=morsealgo.encrypt(tmp);
		      }
            document.getElementById("codtxt").value=output;

        }


        if (type == "decode")
        {
        	var ciphertext = document.getElementById("codtxt").value;
        	//remove blanks

        	//check if length and alphabet are valid
        	if (ctolib.inputString(ciphertext, ".- /") == false)
        	{
        		document.getElementById("codtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
        	}
        	else document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
        	document.getElementById("orgtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';


        	//split into blocks
			var arr=ciphertext.split(' ');
			var output="";
			var error=false;
			for (var i=0; i<arr.length; i++)
			{
			  var tmp=arr[i];
			  switch (tmp)
			  {
    	             case ".-": output+="A";
                   break;
                   case "-...": output+="B";
                   break;

                   case "-.-.": output+="C";
                   break;
                   case "-..": output+="D";
                   break;

                   case ".": output+="E";
                   break;
                   case "..-.": output+="F";
                   break;

                   case "--.": output+="G";
                   break;
                   case "....": output+="H";
                   break;

                   case "..": output+="I";
                   break;
                   
                   case ".---": output+="J";
                   break;
                   
                   case "-.-": output+="K";
                   break;

                   case ".-..": output+="L";
                   break;
                   case "--": output+="M";
                   break;

                   case "-.": output+="N";
                   break;
                   case "---": output+="O";
                   break;

                   case ".--.": output+="P";
                   break;
                   case "--.-": output+="Q";
                   break;

                   case ".-.": output+="R";
                   break;
                   case "...": output+="S";
                   break;

                   case "-": output+="T";
                   break;
                   
                   case "..-": output+="U";
                   break;
                   
                   case "...-": output+="V";
                   break;

                   case ".--": output+="W";
                   break;
				           
                   case "-..-": output+="X";
                   break;

                   case "-.--": output+="Y";
                   break;

                   case "--..": output+="Z";
                   break;
                   
                   case "-----": output+="0";
                   break;
                   case ".----": output+="1";
                   break;

                   case "..---": output+="2";
                   break;
                   case "...--": output+="3";
                   break;

                   case "....-": output+="4";
                   break;
                   case ".....": output+="5";
                   break;

                   case "-....": output+="6";
                   break;
                   
                   case "--...": output+="7";
                   break;
                   
                   case "---..": output+="8";
                   break;

                   case "----.": output+="9";
                   break;
                   
                   case "/": output+=" ";
                   break;
                   
                   case ".-.-.-": output+=".";
                   break;
                   case "--..--": output+=",";
                   break;

                   case "..--..": output+="?";
                   break;
                   case ".----.": output+="'";
                   break;

                   case "-.-.--": output+="!";
                   break;
                   case "-..-.": output+="/";
                   break;

                   case "-.--.": output+="(";
                   break;
                   
                   case "-.--.-": output+=")";
                   break;
                   
                   case ".-...": output+="&";
                   break;

                   case "---...": output+=":";
                   break;
                   
                   case "-.-.-.": output+=";";
                   break;
                   case "-...-": output+="=";
                   break;

                   case ".-.-.": output+="+";
                   break;
                   case "-....-": output+="-";
                   break;

                   case "..--.-": output+="_";
                   break;
                   case ".-..-.": output+='"';
                   break;

                   case "...-..-": output+="$";
                   break;
                   
                   case ".--.-.": output+="@";
                   break;
                   
                   case "---..": output+="8";
                   break;

                   case ".-.-": output+="Ä";
                   break;
                   
                   case "---.": output+="Ö";
                   break;

                   case "..--": output+="Ü";
                   break;
                   
                   case "": break;
                   
                   default:
                   error=true;
                   break;
              }
              if (error==true) document.getElementById("codtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
			}
			document.getElementById("orgtxt").value=output;

        }

    }


}



//create adfgvx object with alphabet and start necessary scripts
var CTOMorsecodeScripts = new CTOMorsecodeGuiAccess();