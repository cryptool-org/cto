/*
CrypTool-Online JS-Code-Libray
//@author Christian Sieche
//@version 26.12.2008
*/
function CTOLib()
{
	//specifies the alphabet
	//@author: Christian Sieche
	//@version: 27.12.2008
	//@params: params(array):
	// 0=click(int), 1=uppercase(boolean), 2=blanks(boolean),
	// 3=digits(boolean), 4=punctuation marks(boolean), 5=lowercase(boolean),
	// 6=umlauts(boolean), 7=rot-13(boolean), 8=alphabet(string)
	this.setAlphabet = setAlphabet; //specify the alphabet
	function setAlphabet(params)
    {
        if (params[0] == 1) //uppercase
        {
            if (params[1] == true)
            {
                params[8] = params[8] + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				if (params[6]==true)
				{
					params[8] = params[8].replace("ÄÖÜ", "");
                	if (params[1]==true) params[8]=params[8]+"ÄÖÜ";
				}
            }
            else
            {
                params[8] = params[8].replace("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "");
				params[8] = params[8].replace("ÄÖÜ", "");
				if (params[5]==false)
				{
					params[6]=false;
				}
            }
        }

		if (params[0] == 2) //blanks
        {

            if (params[2] == true)
            {
                params[8] = params[8] + " ";
                params[2] = true;
            }
            else
            {
                params[8] = params[8].replace(" ", "");
                params[2] = false;
            }
        }

		if (params[0] == 3) //digits
        {

            if (params[3] == true)
            {
                params[8] = params[8] + "0123456789";
                params[3] = true;
            }
            else
            {
                params[8] = params[8].replace("0123456789", "");
                params[3] = false;
            }
        }

		if (params[0] == 4) //punctuationmarks
        {

            if (params[4] == true)
            {
                params[8] = params[8] + ".,:;!?()";
                params[4] = true;
            }
            else
            {
                params[8] = params[8].replace(".,:;!?()", "");
                params[4] = false;
            }
        }


		if (params[0] == 5) //lowercase
        {

            if (params[5] == true)
            {
                params[8] = params[8] + "abcdefghijklmnopqrstuvwxyz";
				if (params[6]==true)
				{
					params[8] = params[8].replace("äöüß", "");
                	if (params[1]==true) params[8]=params[8]+"äöüß";
				}
            }
            else
            {
                params[8] = params[8].replace("abcdefghijklmnopqrstuvwxyz", "");
				params[8] = params[8].replace("äöüß", "");
				if (params[1]==false)
				{
					params[6]=false;
				}
            }
        }

		if (params[0] == 6) //umlauts
        {
            if (params[6] == true)
            {

                if (params[5]==true) params[8]=params[8]+"äöüß";
                if (params[1]==true) params[8]=params[8]+"ÄÖÜ";
				if (params[5] == false && params[1] == false)
				{
					params[6] = false;
				}
            }
            else
            {
                params[8] = params[8].replace("äöüß", "");
				params[8] = params[8].replace("ÄÖÜ", "");
            }
        }

		if (params[0] == 7) //Rot-13
		{
			//rot13 checked
        	if (params[7] == true)
        	{
            	params[1] = true;
          	    params[2] = false;
            	params[3] = false;
            	params[4] = false;
            	params[5] = false;
            	params[6] = false;
            	params[8] = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        	}
		}

		if (params[8] != "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
			params[7] = false;



		return(params);
    }



	//splits a single string into a string array of a fixed size
	// http://kevin.vanzonneveld.net
    // @author original by: Martijn Wieringa
    // +     improved by: Brett Zamir
    // +     bugfixed by: Onno Marsman
	//@version 23.12.2008
	//@params:
	// input = the string to split
	// splitlength = length of the parts
    this.str_split = str_split;
    function str_split(input, splitlength)
    {
        input += '';

        if (splitlength > 0)
        {
            var output = [];
            while (input.length > splitlength)
            {
                output[output.length] = input.substring(0, splitlength);
                input = input.substring(splitlength);
            }
            output[output.length] = input;

            return output;
        }

        return false;
    }
 

	//Returns false if invalid signs are used (text<->alphabet)
    //@author Christian Sieche
	//@version 23.12.2008
	//@params: text(string), alphabet(string)
    this.inputString = inputString;
    function inputString(text, alphabet)
    {
        for (var i = 0; i < text.length; i++)
        {
            var charerror = true;
            for (var j = 0; j < alphabet.length; j++)
            {

                if (text.charAt(i) == alphabet.charAt(j))
                    charerror = false;
            }

            if (text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10) //ignore enter and space
                charerror = false;
            if (charerror == true)

                return (false);
        }

        return (true);
    }


	//deletes invalid signs and returns the cleaned text
    //@author Christian Sieche
	//@version 26.12.2008
	//@params: text(string), alphabet(string), ingore(boolean) -> ingores blanks and spaces
    this.cleanInputString = cleanInputString;
    function cleanInputString(text, alphabet, ignore)
    {
        for (var i = 0; i < text.length; i++)
        {
            var charerror = true;
            for (var j = 0; j < alphabet.length; j++)
            {

                if (text.charAt(i) == alphabet.charAt(j))
                    charerror = false;
            }

			if (ignore==true && (text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)) //ignore enter and space
                charerror = false;
                

            if (charerror == true)
			{
				text = text.replace(text.charAt(i), "");
				i--;
			}
        }  
        return (text);
    }



	//@author Christian Sieche
	//@version 27.12.2008
	//@params:
    this.increaseKey = increaseKey;
    function increaseKey(key, alphabet)
    {
        if (key == "")
            key = 0;
        key = parseInt(key);
        key++;

        if (key > alphabet.length - 1)
            key = 0;
        return(key);
    }


	//@author Christian Sieche
	//@version 27.12.2008
	//@params:
    this.decreaseKey = decreaseKey;
    function decreaseKey(key, alphabet)
    {
        if (key == "")
            key = 0;
        key = parseInt(key);
        key--;

        if (key < 0)
            key = alphabet.length - 1;
		if (key < 0)
			key = 0;
        return(key);
    }


	//@author Christian Sieche
	//@version 27.12.2008
	//@params:
    this.niceAlphabetOutput = niceAlphabetOutput ;
    function niceAlphabetOutput (alphabet)
    {
        if (alphabet.charAt(0)!='' && alphabet.charAt(0)!='A') alphabet = alphabet.replace("A", "<br>A");
		alphabet = alphabet.replace("Z", "Z<br>");
		if (alphabet.charAt(0)!='' && alphabet.charAt(0)!='a') alphabet = alphabet.replace("a", "<br>a");
		alphabet = alphabet.replace("z", "z<br>");
		alphabet = alphabet.replace("<br><br>", "<br>");

		return(alphabet);
    }

	var keychars = "abcdefghijklmnopqrstuvwxyz0123456789";


	//generated a random key
    //@author original by: http://crypto.dsplabs.com.au/
	//improved by: Christian Sieche
	//@version 29.12.2008
	//@params:
	// keychars (string) = chars for the random key
	this.genRandKey = genRandKey ;
	function genRandKey(keychars)
	{
		var chars = keychars.split("");
		ret = "";
		lim = chars.length
		for (i = 0; i < lim; i++)
		{
			index = Math.floor(chars.length * Math.random());
			ret += chars[index];
			chars.splice(index, 1);
		}
		return ret;
	}


	//check if all character are unique and used
	//@author Christian Sieche
	//@version 29.12.2008
	//@params:
	//          teststring (string) -> string to test
	//          alphabet (string) -> used alphabet
	this.uniqueTest = uniqueTest ;
	function uniqueTest(teststring, alphabet)
	{
		if (teststring.length!=alphabet.length) return(false);

		for (var i=0; i<alphabet.length; i++)
		{
			var found = 0;
			for (var j=0; j<teststring.length; j++)
			{
				if (alphabet.charAt(i)==teststring.charAt(j)) found++;
			}

			if (found != 1) return (false);

		}
		return (true);
	}


	//check if characters in a string are only used once and deletes multiple used chars
	//@author Christian Sieche
	//@version 29.12.2008
	//@params:
	//          teststring (string) -> string with chars to make unique
	this.makeUnique = makeUnique;
	function makeUnique(teststring)
	{
		for (var i=0; i<teststring.length; i++)
		{
			var tmp=teststring.lastIndexOf(teststring.charAt(i));
			if (tmp != i)
			{
				var a = teststring.substring(0,tmp);
				var b = teststring.substring(tmp+1,teststring.length);
				teststring=a+b;
			}

		}
		return teststring;
	}







}
