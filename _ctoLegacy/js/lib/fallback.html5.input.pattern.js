/**
*	@name							Patternfallback
*	@descripton						Makes HTML5 input pattern attribute available in older browsers
*	@version						0.0.1
*	@requires						Jquery 1.3.2
*
*	@author							Florian Ruechel
*	@author-email					florian.ruechel@gmail.com
*
*	@licens							GPL
*
*/

(function($){
    $.fn.html5Validity = function() {
        var BrowserSupportsInput = {
            
            myInput     : false,
            
            createInput : function() {
                if(!BrowserSupportsInput.myInput) {
                    BrowserSupportsInput.myInput = document.createElement('input');
                }
                
            },
            
            _           : function(attr) {
                BrowserSupportsInput.createInput();
                return (attr in BrowserSupportsInput.myInput);
            }
        };
        
        var ValidityHelper = {
            inElements : function(candidates, element) {
                element = jQuery(element);
                var element_name = element.attr('name');
                var element_id = element.attr('id');
                var is_in = false;
                var candidates_jquery = jQuery();
                for(var i=0;i<candidates.length;i++) {
                    candidates_jquery.add(candidates[i]);
                }
                //alert(candidates_jquery.size())
                candidates_jquery.each(function(){
                   /**
                    * check for the name first
                    * if no name is set or name is used more than once
                    * this is not standard compliant but we catch it here
                    * 
                    **/
                   var candidate_name = jQuery(this).attr('name');
                   //alert(element_name + " " + candidate_name + " " + candidates_jquery.find("[name='"+candidate_name+"']").size())
                   //alert("Candidate name: " + candidate_name + " Element name: " + element_name);
                   if(element_name == candidate_name && candidates_jquery.find("[name='"+candidate_name+"']").size() < 2)
                       is_in = true;
                   
                   /**
                    * If it was not possible to identify it by name, we try the ID
                    **/
                   var candidate_id = jQuery(this).attr('id');
                   if(element_id == candidate_id && candidates_jquery.find("#"+candidate_id).size() < 2)
                       is_in = true;
                   
                   /**
                    * More could be added later, ideas welcome
                    **/
                });
                return is_in;
            }
        };
        
        function ValidityState() {
            this.valueMissing       = false;
            this.typeMismatch       = false;
            this.patternMismatch    = false;
            this.tooLong            = false;
            this.rangeUnderflow     = false;
            this.rangeOverflow      = false;
            this.stepMismatch       = false;
            this.customError        = false;
            this.valid              = true;
        }
        
        var checkValidity = function() {
            var candidates = jQuery(this).parents("form:first").get(0).elements;
            var element = this;
            var valid = true;
            if (ValidityHelper.inElements(candidates, element)) {
                console.log("Element", element, " is a candidate for validation, checking it");
                //Suffering from being missing 
                console.log("Element ", element, " with value ", element.value, " and required set to ", element.required, " will be checked");
                if(!BrowserSupportsInput._('required') && !element.value && element.required) {
                    this.validity.valueMissing = true;
                    valid = false;
                }
                    
                // TODO: missing: support for type mismatch
                if(!element.pattern && jQuery(element).attr('pattern'))
                    element.pattern = jQuery(element).attr('pattern');
                //alert(element.pattern);
                console.log("Element ", element, " with pattern ", element.pattern, " will be checked. jQuery says pattern is: " + jQuery(element).attr('pattern'));
                if(!BrowserSupportsInput._('pattern') && element.pattern) {
                    var pattern = "^" + element.pattern + "$";
                    var regex = new RegExp(pattern);
                    //alert(pattern);
                    console.log("regex: ", regex, " Value: ", element.value);
                    if(!element.value.match(regex)) {
                        this.validity.patternMismatch = true;
                        valid = false;
                    }
                        
                }
                
                if(!BrowserSupportsInput._('maxlength') && element.maxlength) {
                    var maxlength = element.maxlength;
                    if(element.value.length > maxlength) {
                        this.validity.tooLong = true;
                        valid = false;
                    }
                }
            
                //TODO: Check standard for fields where this attr is allowed
                if(!BrowserSupportsInput._('min') && element.min) {
                    var min = element.min;
                    if(parseFloat(element.value) < min) {
                        this.validity.rangeUnderflow = true;
                        valid = false;
                    }
                }
                
                //TODO: Check standard for fields where this attr is allowed
                if(!BrowserSupportsInput._('max') && element.max) {
                    var max = element.max;
                    if(parseFloat(element.value) > max) {
                        this.validity.rangeOverflow = true;
                        valid = false;
                    }
                }
                
                //TODO: Check standard for fields where this attr is allowed
                //TODO: finish
                if(!BrowserSupportsInput._('step')) {
                    if(element.step) {
                        if(element.step.toLowerCase() != "any") {
                            
                        }
                    }
                    
                }
                
                if(!BrowserSupportsInput._('validationMessage') && element.validationMessage) {
                    this.validity.customError = true;
                    valid = false;
                }
                

            } else {
                //alert("Nope...");
                console.log("Element", element, " is not a candidate. It is not in ", candidates)
            }
                
            
            if(this.originalCheckValidity)
                var originalValid = this.originalCheckValidity();
            if(!originalValid)
                originalValid = true;
            this.validity.valid = valid && originalValid;
            if(!this.validity.valid && !jQuery(this).hasClass("invalid"))
                jQuery(this).addClass("invalid");
            else if(this.validity.valid && jQuery(this).hasClass("invalid"))
                jQuery(this).removeClass("invalid");
            return this.validity.valid;
        };
        
        var setCustomValidity = function(message) {
            message = message.toString();
            if(message == undefined)
                message = "";
            this.validationMessage = message;
        };
        
        return this.each(function() {
            if($(this).data('patterned')){
                return false;
            }
            var input =	$(this);
            input.data('patterned', true);
            this.validity = new ValidityState();
            if(this.checkValidity)
                this.originalCheckValidity = this.checkValidity;
            this.checkValidity = checkValidity;
            
            $(this).bind('change.html5Validity', this.checkValidity);
            
            return true;
        });
    };     
})(jQuery);
/*
$.fn.extend({
         patternFallback: function(callback) {
            
            return this.each(function(index, element) {
				
				// Executing Pattern Fallback twice on an element will lead to trouble
				if($(this).data('patterned')){
					return false;
				}
				
				var input				=	$(this),
                /* From the standard: 
                 * This implies that the regular expression language used for this attribute 
                 * is the same as that used in JavaScript, except that the pattern attribute 
                 * is matched against the entire value, not just any subset (somewhat as if 
                 * it implied a ^(?: at the start of the pattern and a )$ at the end).
                 */
				/*	pattern     		=	"^:?" + input.attr('pattern') + ")$",
                    value               =   input.val(),
                    regex               =   new RegExp(pattern);
				
				input.data('patterned', true);
                
                //set own check function
                input.get(0).checkValidity = function() {
                    var input = jQuery(this),
                        pattern = input.attr('pattern'),
                        value = input.val(),
                        regex = new RegExp(pattern),
                        valid = Boolean(value.match(regex))
                        if(input.get(0).validity == undefined)
                            input.get(0).validity = {};
                        input.get(0).validity.valid = valid;
                    if(valid) {
                        if(input.hasClass("invalid"))
                            input.removeClass("invalid");
                        return true;
                    } else {
                        if(!input.hasClass("invalid"))
                            input.addClass("invalid");
                        return false;
                    }
                };
                console.log("checkValidity Attribute set", input.get(0).checkValidity, input.get(0).validity);
				
            });
        }
    });*/