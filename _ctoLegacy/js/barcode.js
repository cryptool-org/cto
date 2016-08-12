 var ctolib = new CTOLib()


    function invalide()
    {
      document.getElementById('bdata').className = 'ctoformcss-invalid-style';
      document.getElementById('Genrate').disabled=true;
      document.getElementById('Genrate').className='ctoformcss-invalid-button-m';
    }
    
    function valide()
    {
      document.getElementById('bdata').className = 'ctoformcss-txtinput-style';
      document.getElementById('Genrate').disabled=false;
      document.getElementById('Genrate').className='ctoformcss-default-button-m';
    }
    
    
    function niceData()
    {
    checkInput();
    var data = document.getElementById("bdata").value;
		var code = document.getElementById("code").value;
		if (data!="") return;
		if (code=="CODE39")
		{
		  data = "CRYPTOOL"; 
    }
    if (code=="CODE93")
		{
		  data = "CRYPTOOL"; 
    } 
    if (code=="CODE128")
		{
		  data = "CrypTool"; 
    } 
    if (code=="UPC-A")
    {
		  data = "01234567890"; 
    }
    if (code=="EAN-13")
    {
      data = "0123456789012";
    }
    if (code=="EAN-8")
    {
      data = "0123456";
    }
    if (code=="UPC-E")
    {
      data = "012345";   
    }
    if (code=="S205")
    {
      data = "0123456789";    
    }
    if (code=="I2O5")
    {
      data = "0123456789";
    }
    if (code=="I25")
    {
      data = "0123456789";
    }   
    if (code=="POSTNET")
    {
      data = "01234567890";
    }
    if (code=="CODABAR")
		{
		  data = "A92837B";
    }
    document.getElementById("bdata").value=data; 
    valide();   
    }
 
 function getCursorPos(input)
 {
    input.focus();
    
    //Internet Explorer
    if(typeof document.selection != 'undefined') 
    {
    
    }
    
    //Mozilla
    else if(typeof input.selectionStart != 'undefined')
    {
      return(input.selectionStart);
    }
    
    //Sonstige
    else
    {
    
    }
    
 }
 
    

  //checks whether the input is valid or not
  //@author Christian Sieche
	//@version 23.12.2008
	//@params: none
    function checkInput() //check the key
    {
		var data = document.getElementById("bdata").value;
		var code = document.getElementById("code").value;
		valide();
		
		var input = document.getElementById("bdata");
		var start=getCursorPos(input);
    /*input.focus();
    
    //*********************************
    //get cursor position
    var start = input.selectionStart;
    */
    //get data length and text
    var datalength=data.length;
    var datatext = data;
    //*********************************

		if (code=="CODE39")
		{
		  var valid = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%"
		  data = data.toUpperCase();
		  data = ctolib.cleanInputString(data,valid, false);
    }
    if (code=="CODE93")
		{
		  var valid = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		  valid += " !#$%&'()*+.,-/:;<=>?@[]^_`{}|~"; 
		  valid += "\\";
		  data = ctolib.cleanInputString(data,valid, false);
    } 
    if (code=="CODE128")
		{
		  var valid = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
		  valid += " !#$%&'()*+.,-/:;<=>?@[]^_`{}|~"; 
		  valid += "\\";
		  data = ctolib.cleanInputString(data,valid, false);
    } 
    if (code=="UPC-A")
    {
      var valid = "0123456789"
      data = ctolib.cleanInputString(data,valid, false);
      if (data.length != 11) invalide();
    }
    if (code=="EAN-13")
    {
      var valid = "0123456789"
      data = ctolib.cleanInputString(data,valid, false);
      if (data.length != 12 && data.length != 13) invalide();
    }
    if (code=="EAN-8")
    {
      var valid = "0123456789"
      data = ctolib.cleanInputString(data,valid, false);
      if (data.length != 7) invalide();
    }
    if (code=="UPC-E")
    {
      var valid = "0123456789"    
      data = ctolib.cleanInputString(data,valid, false);
      if (data.length != 6) invalide();
    }
    if (code=="S205")
    {
      var valid = "0123456789"    
      data = ctolib.cleanInputString(data,valid, false);
    }
    if (code=="I2O5")
    {
      var valid = "0123456789"
      data = ctolib.cleanInputString(data,valid, false);
    }
    if (code=="I25")
    {
      var valid = "0123456789"    
      data = ctolib.cleanInputString(data,valid, false);
    }   
    if (code=="POSTNET")
    {
      var valid = "0123456789"
      data = ctolib.cleanInputString(data,valid, false);
      if (data.length != 5 && data.length != 9 && data.length != 11) invalide();
    }
    if (code=="CODABAR")
		{
		  var valid = "0123456789-$:/.+ABCD"
		  data = data.toUpperCase();
		  data = ctolib.cleanInputString(data,valid, false);
		  if (data.charAt(0)!="A" && data.charAt(0)!="B" && data.charAt(0)!="C" && data.charAt(0)!="D" ) invalide();
		  if (data.charAt(data.length-1)!="A" &&  data.charAt(data.length-1)!="B" &&  data.charAt(data.length-1)!="C" &&  data.charAt(data.length-1)!="D") invalide();
    }
    
    if (data=="") invalide();
    document.getElementById("bdata").value=data;
    
    //***********************************
    //set cursor position
    if (datatext!=data)
    {
      if (datalength!=data.length)
      {
        input.selectionStart = start-1;
        input.selectionEnd = start-1;
      }
      else
      {
        input.selectionStart = start;
        input.selectionEnd = start;
      }
    }
    //***********************************
    
    }