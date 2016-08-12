//*******************************(service-layer)
//*******************************
//*******************************

function CTOTranspositionAlgorithm(alpha)
{

    var alphabet=alpha;


	//transposition (decrypt)
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         chipertext (string), keysquare (string), key (string)
	this.decodePartA=decodePartA;
    function decodePartA(ciphertext, key)
	{
		var keybackup=key;
    	klen = key.length;
 		var cols;
 		cols = new Array(klen);

    	var newcols = new Array(klen);
		var transposition="";
    	chars=alphabet;
		j=0;
		i=0;

		//get transposition sequence
    	while(j<klen)
		{
        	t=key.indexOf(chars.charAt(i));
        		if(t >= 0)
				{
            		newcols[t] = cols[j++];
            		arrkw = key.split("");
					arrkw[t] = "_";
					key = arrkw.join("");
					if (transposition != "")
					{
						transposition = transposition + "-" + t;
					}
					else
					{
						transposition = "" + t;
					}
        		}
				else i++;

    	}

    	var chars = ciphertext.length;
    	//how many extra cols are needed because text is not dividable by key
    	var extracols = chars % klen;
    	//write transposition sequence to array
    	var transparray = transposition.split("-");
    	//get the array position of the needed extra cols
    	var indizesarray = new Array(extracols);
    	var o;
    	for (o=0; o<extracols; o++)
    	{
    		//int to str
    		var helper;
    		helper = o + "";
    		indizesarray[o]=transparray.indexOf(helper);
    		indizesarray[o]=transparray.indexOf(helper);
    	}

		
        var colLength = ciphertext.length / klen;
        //must be int!
        colLength=parseInt(colLength)
		var extra=0;
		//transposition
   		for(i=0; i < klen; i++)
   		{
   			var helper;
    		helper = i + "";
   			if (indizesarray.indexOf(i)==-1) cols[i] = ciphertext.substr((i*colLength)+extra,colLength);
   			//if this col got more signs
   			else
   			{
   				cols[i] = ciphertext.substr((i*colLength)+extra,colLength+1);
   				extra+=1;
   			}
   		}
	    	
		
   		outputarray = new Array(klen);

		//write cols in correct sequence to an output array
		for (i=0; i<klen; i++)
		{
			var helper;
    		helper = i + "";
    		outputarray[i] = cols[transparray.indexOf(helper)];
    	}
    	

    	

    	//read outbut array by rows not columns
    	plaintext1 = "";
    	var tmpcolLength=colLength;
    	if (extracols>0) tmpcolLength++;
    	for(i=0; i < tmpcolLength; i++)
		{
        	for(j=0; j < klen; j++) plaintext1 += outputarray[j].charAt(i);
    	}
    	


    	//add tranposition information and return
		endarrayint = new Array(transparray.length);
		endarraystring = new Array(transparray.length);
		for (var i=0; i<transparray.length; i++)
		{
			endarrayint[transparray[i]]=i+1;
			endarraystring[i]=keybackup.charAt(transparray[i]);
		}
		var endoutput1=endarrayint.join("-");
		var endoutput2=endarraystring.join("");
		var endoutput3=endoutput1+" ("+endoutput2+")";
		outputarray = new Array(plaintext1,endoutput3);
		return(outputarray);
	}

	//transposition (encrypt) column by column
	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	//         substitutiontext (string), key (string)
	this.encodePartB = encodePartB;
	function encodePartB (substitutiontext, key)
	{
			var output="";
			var keybackup=key;
    		var colLength = substitutiontext.length / key.length;
			var transposition="";
    		ciphertext = "";
			k=0;
    		for(i=0; i < key.length; i++)
			{
        		while(k<alphabet.length)
				{
            		t = key.indexOf(alphabet.charAt(k));
            		arrkw = key.split("");
					arrkw[t] = "_";
					key = arrkw.join("");
            		if(t >= 0) break;
            		else k++;
        		}
		    if (transposition != "")
			{
				transposition = transposition + "-" + t;
			}
			else
			{
				transposition = "" + t;
			}
        	for(j=0; j < colLength; j++) output += substitutiontext.charAt(j*key.length + t);
    		}
			var transparray = transposition.split("-");
			endarrayint = new Array(transparray.length);
			endarraystring = new Array(transparray.length);
			for (var i=0; i<transparray.length; i++)
			{
				endarrayint[transparray[i]]=i+1;
				endarraystring[i]=keybackup.charAt(transparray[i]);
			}
			var endoutput1=endarrayint.join("-");
			var endoutput2=endarraystring.join("");
			var endoutput3=endoutput1+" ("+endoutput2+")";
			outputarray = new Array(output,endoutput3);
			return(outputarray);
    }

}


//*******************************(gui-access-layer)
//*******************************
//*******************************

function CTOTranspositionGuiAccess ()
{
	var alphabet = "";
    var cryptoclass = new CTOTranspositionAlgorithm(alphabet);
	var ctolib = new CTOLib();


	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.ChangeParseAlphabetTextA = ChangeParseAlphabetTextA;
    function ChangeParseAlphabetTextA()
    {
    	//get latest status
    	var status=document.getElementById("vertical_statusA").innerHTML;
    	var alphtext;
    	//if its closed...
    	if (status=="close")
    	{
    		alphabetSlide.slideIn();
    		alphtext = document.getElementById("v_toggleA").value;
    		alphtext = alphtext.replace(/>>/g, "<<");
    	}
    	else
    	{
    		alphabetSlide.slideOut();
    		alphtext = document.getElementById("v_toggleA").value;
    		alphtext = alphtext.replace(/<</g, ">>");
    	}
    	document.getElementById("v_toggleA").value = alphtext;
    }




	//@author Christian Sieche
	//@version 26.12.2008
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

		document.getElementById("plaintextabc").innerHTML = ctolib.niceAlphabetOutput(alphabet);
		document.getElementById("alphalength").value = alphabet.length;
		cryptoclass = new CTOTranspositionAlgorithm(alphabet);
		checkKey(); //starts encryption too
	}



	//@author Christian Sieche
	//@version 26.12.2008
	//@params:
    this.checkKey = checkKey;
    function checkKey() //check the key
    {
      var key=document.getElementById("key").value;
      var copy = key;
            if (document.getElementById("uppercase").checked == true && document.getElementById("lowercase").checked == false)
                key = key.toUpperCase();

            if (document.getElementById("uppercase").checked  == false && document.getElementById("lowercase").checked == true)
                key = key.toLowerCase();
      
			key=ctolib.cleanInputString(key, alphabet, false);
			if (copy!=key) document.getElementById("key").value=key;
			transpositionCrypt(false);
    }


	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.transpositionCrypt = transpositionCrypt;
    function transpositionCrypt(type) //starts encryption
    {

        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOTranspositionForm1.code[0].checked = true;
            document.CTOTranspositionForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOTranspositionForm1.code[0].checked = false;
            document.CTOTranspositionForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOTranspositionForm1.code.length; i++)
			if (document.CTOTranspositionForm1.code[i].checked)
                type = document.CTOTranspositionForm1.code[i].value;
                
   //start check key
			var key = document.getElementById("key").value;
			var allowedkeys=alphabet;
      key = ctolib.cleanInputString(key, allowedkeys, false);
      document.getElementById("key").value=key;
   //end check key

        if (type == "encode")
        {
    		    document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            var orgtext = document.getElementById("orgtxt").value;

			     if (key != "")
			     {
								// transposition
				        outputarray = cryptoclass.encodePartB(orgtext, key);
               
				      document.getElementById("codtxt").value = outputarray[0];
			        document.getElementById("columns").value = outputarray[1];
		    	}
			    else
			    {
				     document.getElementById("key").value = key;
				     document.getElementById("codtxt").value = "";
				     document.getElementById("columns").value = "";
			    }
        }

        if (type == "decode")
        {
			if (document.getElementById('clean').checked==true) document.getElementById('clean').checked=false;
			var codtext = document.getElementById("codtxt").value

			// transposition
   		if(key.length <= 0){ return; }
			outputarray = cryptoclass.decodePartA(codtext, key);

			document.getElementById("columns").value = outputarray[1];
			document.getElementById("orgtxt").value = outputarray[0];
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

	$('vertical_statusA').set('html', status[alphabetSlide.open]);
	// When Vertical Slide ends its transition, we check for its status
	// note that complete will not affect 'hide' and 'show' methods
	alphabetSlide.addEvent('complete', function() {
		$('vertical_statusA').set('html', status[alphabetSlide.open]);
	});

});

//create transposition object with alphabet and start necessary scripts
var CTOTranspositionScripts = new CTOTranspositionGuiAccess();