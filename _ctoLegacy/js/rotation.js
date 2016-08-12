//*******************************
//*******************************

function CTORotationGuiAccess ()
{
	var ctolib = new CTOLib();

	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.rotateE90 = rotateE90;
    function rotateE90(plaintext, blocksize) //starts encryption
    {
      var array = ctolib.str_split(plaintext, blocksize);
      var arraylength=array.length;
      var output="";
      for (var j=0; j<blocksize; j++)
      {
        for (var i=(arraylength-1); i>=0; i--)
        {
          output+=array[i].charAt(j);
        }
      }
      
      return output;
    }
    

  
    //@author Christian Sieche
	  //@version 30.12.2008
	  //@params:
	  // type = "encode" or "decode"
    this.rotateD90 = rotateD90;
    function rotateD90(text, blocksize) //starts encryption
    {
      var textlength=text.length;
      
      //oversize
      var ueber=textlength % blocksize;
      //array size
      var arraysize=parseInt(textlength / blocksize);
      //create array
      var outarray = new Array(arraysize+1);

      var output="";
      var i; 
      
      for (i=0; i<=arraysize; i++)
      {
        outarray[i]="";
      }
      
      var j=0;
      while (j<textlength)
      {      
        for (i=arraysize; i>=0; i--)
        {
            //oversize
            if (i==arraysize)
            {
              if (ueber>0)
              {
                outarray[i]+=text.charAt(j);
                ueber--;
              }
              else j--;
            }
            else outarray[i]+=text.charAt(j);
            j++;
        }   
      }
      output=outarray.join("");
      return output;
    }

    
    //@author Christian Sieche
	  //@version 30.12.2008
	  //@params:
	  // type = "encode" or "decode"
    this.rotate180 = rotate180;
    function rotate180(text) //starts encryption
    {
      var textlength=text.length;
      var output="";
      for (var i=textlength; i>=0; i--) output+=text.charAt(i);
      return output;
    }
      


	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.rotationCrypt = rotationCrypt;
    function rotationCrypt(type) //starts encryption
    {
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTORotationForm1.code[0].checked = true;
            document.CTORotationForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTORotationForm1.code[0].checked = false;
            document.CTORotationForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTORotationForm1.code.length; i++)
			if (document.CTORotationForm1.code[i].checked)
                type = document.CTORotationForm1.code[i].value;
        
        //check for valid input
        var blocksize = document.getElementById("blocksize").value;
			  var rotation = document.getElementById("rotation").value;
			  blocksize = ctolib.cleanInputString(blocksize,"0123456789", false);
			  if (blocksize=="0") blocksize="";
			  if (blocksize>100) blocksize=100;
			  document.getElementById("blocksize").value=blocksize;		

        if (type == "encode" && blocksize!=0)
        {
			    var plaintext = document.getElementById("orgtxt").value;
			    var output="";
          if (rotation=="90")  output = rotateE90(plaintext, blocksize);
          if (rotation=="180") output = rotate180(plaintext);
          if (rotation=="270")
          {
            var output = rotateE90(plaintext, blocksize);
        	  var output = rotate180(output);
          }
            document.getElementById("codtxt").value=output;
        }


        if (type == "decode" && blocksize!=0)
        {
          var ciphertext = document.getElementById("codtxt").value;
          
          var output="";
          if (rotation=="90")  output = rotateD90(ciphertext, blocksize);
          if (rotation=="180") output = rotate180(ciphertext);
          if (rotation=="270") 
          {
            output = rotate180(ciphertext);
            output = rotateD90(output, blocksize);
          }
     			document.getElementById("orgtxt").value=output;
        }

    }


}



//create adfgvx object with alphabet and start necessary scripts
var CTORotationScripts = new CTORotationGuiAccess();