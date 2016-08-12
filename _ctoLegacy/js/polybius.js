//*******************************(service-layer)
//*******************************
//*******************************

function CTOPolybiusAlgorithm()
{

	//substitution (encrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         plaintext (string), keysquare (string), key (string)
	this.encodePartA=encodePartA;
    function encodePartA(plaintext, keysquare)
	{
		var adfgvx = "12345";
		var codtxt = "";
		keysquare = keysquare.toLowerCase();
		plaintext = plaintext.toLowerCase();
		plaintext = plaintext.replace(/j/g, "i");
		plaintext = plaintext.replace(/[^a-z]/g, "");
		for (var i = 0; i < plaintext.length; i++)
		{
			var index = keysquare.indexOf(plaintext.charAt(i));
			codtxt += adfgvx.charAt(index / 5) + adfgvx.charAt(index % 5);
		}
		return(codtxt);
	}

	
	//substitution (decrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         substitutiontext (string), keysquare (string)
	this.decodePartB=decodePartB;
    function decodePartB(substitutiontext, keysquare)
	{
		substitutiontext=substitutiontext.toUpperCase();
			adfgvx = "12345";
			plaintext = "";
			if (substitutiontext.length % 2 == 0)
			{
    			for (i = 0; i < substitutiontext.length; i += 2)
				{
					keyindex = adfgvx.indexOf(substitutiontext.charAt(i)) * 5 + adfgvx.indexOf(substitutiontext.charAt(i + 1));
					plaintext += keysquare.charAt(keyindex);
				}
			}
			else
			{
    			for (i = 0; i < substitutiontext.length-1; i += 2)
				{
					keyindex = adfgvx.indexOf(substitutiontext.charAt(i)) * 5 + adfgvx.indexOf(substitutiontext.charAt(i + 1));
					plaintext += keysquare.charAt(keyindex);
				}
			}
			return(plaintext);

    }

}


//*******************************(gui-access-layer)
//*******************************
//*******************************

function CTOPolybiusGuiAccess ()
{
	var alphabet = "";
    var cryptoclass = new CTOPolybiusAlgorithm();
	var ctolib = new CTOLib();


    //@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.ChangeParseAlphabetTextB = ChangeParseAlphabetTextB;
    function ChangeParseAlphabetTextB()
    {
    	//get latest status
    	var status=document.getElementById("vertical_statusB").innerHTML;
    	var alphtext;
    	//if its closed...
    	if (status=="close")
    	{
    		betaSlide.slideIn();
    		alphtext = document.getElementById("v_toggleB").value;
    		alphtext = alphtext.replace(/>>/g, "<<");
    	}
    	else
    	{
    		betaSlide.slideOut();
    		alphtext = document.getElementById("v_toggleB").value;
    		alphtext = alphtext.replace(/<</g, ">>");
    	}
    	document.getElementById("v_toggleB").value = alphtext;
    }




	//generates random keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.genRandomKeysquare = genRandomKeysquare;
	function genRandomKeysquare()
	{
		genKeysquare(ctolib.genRandKey("ABCDEFGHIKLMNOPQRSTUVWXYZ"));
		polybiusCrypt(false);
	}

	//generates standard keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.genStandardKeysquare = genStandardKeysquare;
	function genStandardKeysquare()
	{
		genKeysquare("ABCDEFGHIKLMNOPQRSTUVWXYZ");
		polybiusCrypt(false);
	}

	//generates custom keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.genMyKeysquare = genMyKeysquare;
	function genMyKeysquare(nocrypt)
	{
		var keysquare = document.getElementById("mymatrix").value;
		var result=false;
		var allowedkeys="ABCDEFGHIKLMNOPQRSTUVWXYZ"
		//check if character is allowed
		keysquare=keysquare.toUpperCase();
		keysquare=ctolib.cleanInputString(keysquare, allowedkeys, false);
		//check if the key got 25 characters
		if (keysquare.length<25) result=false;
		//check if all character are used unique
        else result = ctolib.uniqueTest(keysquare, allowedkeys);
		//output
		if (result==true)
		{
			genKeysquare(keysquare);
			if (nocrypt!=true) polybiusCrypt(false);
		}
		else
		{
			document.getElementById('mymatrix').className = 'ctoformcss-invalid-style ctoformcss-adfgvx-matrix-input-size';
			if (document.CTOPolybiusForm1.code[0].checked == true)
			{
				document.getElementById("codtxt").value = "";
				document.getElementById("substitutiontxt").value = "";
			}
			else
			{
				document.getElementById("orgtxt").value = "";
				document.getElementById("substitutiontxt").value = "";
			}
		}
		document.getElementById("mymatrix").value=keysquare;
	}


	//returns keysquare or false if keysquare is invalid
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	this.getKeysquare = getKeysquare;
	function getKeysquare()
	{
		var keysquare = document.getElementById("mymatrix").value;
		var result=false;
		var allowedkeys="ABCDEFGHIKLMNOPQRSTUVWXYZ"
		//check if character is allowed
		keysquare=keysquare.toUpperCase();
		keysquare=ctolib.cleanInputString(keysquare, allowedkeys, false);
		//check if the key got 25 characters
		if (keysquare.length<25) return(false);
		//check if all character are used unique
        if (ctolib.uniqueTest(keysquare, allowedkeys)==false) return(false);
		//output
		genKeysquare(keysquare);
		document.getElementById('mymatrix').className = 'ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size';
		document.getElementById("mymatrix").value=keysquare;
		return(keysquare);
	}



	//generates/formates keysquare for substitution
	//@author Christian Sieche
	//@version 30.12.2008
	//@params: keysquare (string)
	this.genKeysquare = genKeysquare; //generate keysquare for substitution
	function genKeysquare(keysquare)
	{
		document.getElementById("AA").value=keysquare.charAt(0);
		document.getElementById("AD").value=keysquare.charAt(1);
		document.getElementById("AF").value=keysquare.charAt(2);
		document.getElementById("AG").value=keysquare.charAt(3);
		document.getElementById("AV").value=keysquare.charAt(4);

		document.getElementById("DA").value=keysquare.charAt(5);
		document.getElementById("DD").value=keysquare.charAt(6);
		document.getElementById("DF").value=keysquare.charAt(7);
		document.getElementById("DG").value=keysquare.charAt(8);
		document.getElementById("DV").value=keysquare.charAt(9);

		document.getElementById("FA").value=keysquare.charAt(10);
		document.getElementById("FD").value=keysquare.charAt(11);
		document.getElementById("FF").value=keysquare.charAt(12);
		document.getElementById("FG").value=keysquare.charAt(13);
		document.getElementById("FV").value=keysquare.charAt(14);

		document.getElementById("GA").value=keysquare.charAt(15);
		document.getElementById("GD").value=keysquare.charAt(16);
		document.getElementById("GF").value=keysquare.charAt(17);
		document.getElementById("GG").value=keysquare.charAt(18);
		document.getElementById("GV").value=keysquare.charAt(19);

		document.getElementById("VA").value=keysquare.charAt(20);
		document.getElementById("VD").value=keysquare.charAt(21);
		document.getElementById("VF").value=keysquare.charAt(22);
		document.getElementById("VG").value=keysquare.charAt(23);
		document.getElementById("VV").value=keysquare.charAt(24);

		document.getElementById("mymatrix").value=keysquare;
		document.getElementById('mymatrix').className = 'ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size';
	}


	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.polybiusCrypt = polybiusCrypt;
    function polybiusCrypt(type) //starts encryption
    {
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOPolybiusForm1.code[0].checked = true;
            document.CTOPolybiusForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOPolybiusForm1.code[0].checked = false;
            document.CTOPolybiusForm1.code[1].checked = true;
        }
        
        genMyKeysquare(true);
        
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOPolybiusForm1.code.length; i++)
			if (document.CTOPolybiusForm1.code[i].checked)
                type = document.CTOPolybiusForm1.code[i].value;

        if (type == "encode")
        {
        	var allowedinput="abcdefghijklmnopqrstuvwxyz";
            var orgtext = document.getElementById("orgtxt").value;

            var isInputOK = ctolib.inputString(orgtext.toLowerCase(), allowedinput);

            if (isInputOK == false)
            {
                document.getElementById('orgtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else
            {
                document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }

				// substitution
				var outputsubstitution;
				var keysquare = getKeysquare();
				if (keysquare == false)
				{
					document.getElementById("substitutiontxt").value = "";
					return;
				}
				outputsubstitution = cryptoclass.encodePartA(orgtext, keysquare);
				var tmp;

				if (document.getElementById("cleansubstitution").checked == false)
				{
					tmp = ctolib.str_split(outputsubstitution, 45);
				}
				else
					tmp = ctolib.str_split(outputsubstitution, 2);
				tmp = tmp.join(" ");
				document.getElementById("substitutiontxt").value = tmp;

                /*
				// transposition
				outputarray = cryptoclass.encodePartB(outputsubstitution, key);
				var output = outputarray[0];

				var tmp2;

				if (document.getElementById("clean").checked == false)
				{
					tmp = ctolib.str_split(output, 45);
				}
				else
					tmp = ctolib.str_split(output, 2);
				tmp = tmp.join(" ");
				document.getElementById("codtxt").value = tmp;
				document.getElementById("columns").value = outputarray[1];*/
        }
 

        if (type == "decode")
        {
        	var allowedinput="123456";
        	var tmp;
			document.getElementById('substitutiontxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
			var outputsubstitution = document.getElementById("substitutiontxt").value;
			
			var isInputOK = ctolib.inputString(outputsubstitution.toLowerCase(), allowedinput);

            if (isInputOK == false)
            {
                document.getElementById('substitutiontxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else
            {
                document.getElementById('substitutiontxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }

			var keysquare = getKeysquare();
			if (keysquare == false)
			{
				document.getElementById("orgtxt").value = "";
				document.getElementById("substitutiontxt").value = "";
				return;
			}
			//remove blanks and enter
			outputsubstitution=outputsubstitution.replace(/ /g, "");
			outputsubstitution=outputsubstitution.replace(/\r/g, "");
			outputsubstitution=outputsubstitution.replace(/\n/g, "");

			outputsubstitutione = outputsubstitution.toUpperCase();
			tmp = ctolib.str_split(cryptoclass.decodePartB(outputsubstitution, keysquare), 45);
			tmp = tmp.join(" ");
			document.getElementById("orgtxt").value = tmp;
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
	this.betaSlide = new Fx.Slide('substitution');
	// When Vertical Slide ends its transition, we check for its status
	// note that complete will not affect 'hide' and 'show' methods
	betaSlide.addEvent('complete', function() {
		$('vertical_statusB').set('html', status[betaSlide.open]);
	});

});


//create adfgvx object with alphabet and start necessary scripts
var CTOPolybiusScripts = new CTOPolybiusGuiAccess();