//*******************************
//*******************************

function CTOPassgenGuiAccess ()
{

    var ctolib = new CTOLib();
    var counter;
    
   //sets the new alphabet 
   //@author Christian Sieche
	//@version 30.12.2008
	//@params:
    this.countAlpha = countAlpha;
    function countAlpha() //starts encryption
    {
		//specify alphabet
    var lowercase = document.getElementById("lowercase").checked;
		var uppercase = document.getElementById("uppercase").checked;
		var numbers = document.getElementById("numbers").checked;
		var special = document.getElementById("special").checked;
		var signs = "";
		if (lowercase) signs+="abcdefghijklmnopqrstuvwxyz";
		if (uppercase) signs+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (numbers) signs+="0123456789";
		if (special) signs+="^°!§$%&/()=?´ß?\*+'#;,:._-<>@";
		if (special) signs+='"';
		//calculate signs
		counter=signs.length;
		document.getElementById("counter").innerHTML=counter;
		return (signs);
    }

   
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
    this.createPass = createPass;
    function createPass() //starts encryption
    {
		  var alpha=countAlpha();
		  var plength=parseInt(document.getElementById("length2").value);
		  //check key
		  if (plength<=0 || ctolib.inputString(document.getElementById("length2").value, "0123456789")==false) plength=16;
		  if (plength>128) plength=128;
		  //set key
		  document.getElementById("length2").value=plength;
		  
		  //get random char from alphabet
		  var temp="";
		  for (i=0;i<plength;i++)
		  {
		    temp+=alpha.charAt(Math.floor(Math.random()*alpha.length))
		  }
		  var tmp2 = ctolib.str_split(temp, 40);
		  temp = tmp2.join("\n");
		  //html encode the output
		  temp = temp.replace(/</g, "&lt;");
		  temp = temp.replace(/>/g, "&gt;");  
		  document.getElementById("passoutput").value=temp; 
		  
    }


}



//create adfgvx object with alphabet and start necessary scripts
var CTOPassgenScripts = new CTOPassgenGuiAccess();
