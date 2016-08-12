//*******************************(service-layer)
//*******************************
//*******************************
function CTORomanNumbersAlgorithm()
{
    
    this.DEBUG = false;
    
    this.max_number = 0;
    
    //for enconding
    this.roman_map = new Array();
    this.roman_map["I"] = 1;
    this.roman_map["V"] = 5;
    this.roman_map["X"] = 10;
    this.roman_map["L"] = 50;
    this.roman_map["C"] = 100;
    this.roman_map["D"] = 500;
    this.roman_map["M"] = 1000;
    
    //for decoding
    this.roman_numbers = new Array();
    this.roman_numbers[0] = ["I", 1];
    this.roman_numbers[1] = ["IV", 4];
    this.roman_numbers[2] = ["V", 5];
    this.roman_numbers[3] = ["IX", 9];
    this.roman_numbers[4] = ["X", 10];
    this.roman_numbers[5] = ["XL", 40];
    this.roman_numbers[6] = ["L", 50];
    this.roman_numbers[7] = ["XC", 90];
    this.roman_numbers[8] = ["C", 100];
    this.roman_numbers[9] = ["CD", 400];
    this.roman_numbers[10] = ["D", 500];
    this.roman_numbers[11] = ["CM", 900];
    this.roman_numbers[12] = ["M", 1000];
    
    //@author Florian Ruechel
    //@version 03.05.2012
    //@params:
    this.encrypt = encrypt;
    function encrypt(text) //starts encryption
    {
	var result = 0;
	var letters = text.split("");
	var last_letter = "";
	var limit = 1000;
	for(var i = 0;i<letters.length;i++)
	{
	    var letter = letters[i];
	    var next_letter = "";
	    var current_number = this.roman_map[letter];
	    if(i != letters.legnth-1) 
		next_letter = letters[i+1];
	    (this.DEBUG) ? console.log("Current Number:"+current_number.toString(), "Last Letter:"+last_letter, "Next Letter:"+next_letter) : null;
	    if(current_number < limit && !(next_letter == last_letter)) {
		(this.DEBUG) ? console.log("Setting new limit to " + current_number.toString()) : null;
		limit = current_number;
	    }
	    if(this.roman_map[next_letter] > current_number && last_letter != letter) {
		(this.DEBUG) ? console.log("The next number is greater than the current so we substract " + current_number.toString()) : null;
		result = result - current_number
	    }
	    else {
		(this.DEBUG) ? console.log("Regular Case: Adding " + current_number.toString()) : null;
		result = result + current_number;
	    }
	    last_letter = letter;
	}
	if(isNaN(result) || result >= this.max_number)
	    return false;
    return result;
    }
    
    //@author Florian Ruechel
    //@version 03.05.2012
    //@params:
    this.decrypt = decrypt;
    function decrypt(number) //starts decryption
    {
    	var result = "";
	var counter = 0;
    if(number >= this.max_number)
        return false;
	for(;;)
	{
	    for(var i=this.roman_numbers.length-1;i>=0;i--)
	    {
		if(this.roman_numbers[i][1] <= number)
		{
		    number = number - this.roman_numbers[i][1];
		    result = result + this.roman_numbers[i][0];
		    (this.DEBUG) ? console.log("Appending " + this.roman_numbers[i][0]) : null;
		    break;
		}
	    }
	    if(number == 0)
		return result;
	    counter++;
	    if(counter > 100) {
		console.log("A valid number needs to be entered");
		return false;
	    }
	}
    }
}

//*******************************(gui-access-layer)
//*******************************
//*******************************
function CTORomanNumbersGuiAccess()
{
    var cryptoclass = new CTORomanNumbersAlgorithm();
    //cryptoclass.max_number = roman_max_number;
	
	//@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.encrypt = encrypt;
    function encrypt() //starts encryption
    {
    	var plaintext = document.getElementById("orgtxt").value.toString().toUpperCase();
    	var ciphertext = cryptoclass.encrypt(plaintext);
	if(!ciphertext)
	{
	    ciphertext = "";
	    document.getElementById("orgtxtmsg").textContent = Joomla.JText._('COM_CTO_ROMAN_ENTER_VALID_ROMAN_NUMBER');
	} else
	    document.getElementById("orgtxtmsg").textContent = "";
	    document.getElementById("codtxt").value = ciphertext;
	
    }
    
    //@author Christian Sieche
	//@version 23.12.2008
	//@params:
    this.decrypt = decrypt;
    function decrypt() //starts decryption
    {
    	var ciphertext = document.getElementById("codtxt").value;
    	var plaintext = cryptoclass.decrypt(ciphertext);
	if(!plaintext)
	{
	    plaintext = "";
	    document.getElementById('codtxtmsg').textContent = Joomla.JText._('COM_CTO_ROMAN_ENTER_VALID_NUMBER');
	} else
	    document.getElementById('codtxtmsg').textContent = "";
    	document.getElementById("orgtxt").value = plaintext;
    }
    
    this.setMaxNumber = setMaxNumber;
    function setMaxNumber(number)
    {
        cryptoclass.max_number = number;
    }
}

//create object
CTORomanNumbersScripts = new CTORomanNumbersGuiAccess();