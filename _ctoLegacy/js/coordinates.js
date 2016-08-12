jQuery(document).ready(function(){
   // jQuery(' [placeholder] ').defaultValue();
    jQuery(' [pattern] ').html5Validity();
    CoordinateCalculator.init();
});

var CoordinateCalculator = {

    DEBUG: false,
    
    coords: {
        latitude: {
            degree: 0,
            minutes: 0,
            seconds: 0
        },
        longitude: {
            degree: 0,
            minutes: 0,
            seconds: 0
        }
    },
    
    precision: 6,
    

    init: function() {
        CoordinateCalculator.bindEvents();
    },
    
    bindEvents: function() {
        jQuery("input[type=text]").off("change");
        jQuery("input[type=text]").change(CoordinateCalculator.onChange);
        
        jQuery("input[type=text]").off("keydown");
        jQuery("input[type=text]").keydown(function(e) {
            switch(e.keyCode) {
                case 13:
                    (CoordinateCalculator.DEBUG) ? console.log("13 pressed!") : null;
                    jQuery("input:focus").change();
                    return false;
                    break;
                default:
                    return true;
            }
        });
        
        jQuery("button#gps-reset").off("click");
        jQuery("button#gps-reset").click(CoordinateCalculator.reset);
    },
    
    onChange: function() {
        var changed_element = jQuery(this);
        (CoordinateCalculator.DEBUG) ? console.log("onChange():") : null;;
        if(changed_element.hasClass("gps-single")) {
            if(!CoordinateCalculator.toCoordinates(changed_element)) {
                console.log("Converting coordinates failed!");
                return false;
            }
                
        }
    
        
        var coords_elem = changed_element.parents("fieldset:first").find("input.gps-all:first");
        if(changed_element.hasClass("dms")) {
            CoordinateCalculator.coords = CoordinateCalculator.loadCoordsDMS(coords_elem);
            //CoordinateCalculator.convertDMS(changed_element);
        } else if (changed_element.hasClass("dmds")) {
            CoordinateCalculator.coords = CoordinateCalculator.loadCoordsDMS(coords_elem);
        } else if (changed_element.hasClass("ddm")) {
            CoordinateCalculator.coords = CoordinateCalculator.loadCoordsDDM(coords_elem);
        } else if (changed_element.hasClass("dd")) {
            CoordinateCalculator.coords = CoordinateCalculator.loadCoordsDD(coords_elem);
        } else {
            console.log("An unknown input field changed. This should not happen and should be checked!", changed_element);
        }
        
        CoordinateCalculator.refresh();
        
        return true;
    },
    
    loadCoordsDMS: function(elem) {
        (CoordinateCalculator.DEBUG) ? console.log("loadCoordsDMS():") : null;;
        var elem_str = elem.val();
        var coords = elem_str.split(" ");
        //console.log("Coords: ", coords);
        //console.log("Parsing: ", parseInt(coords[0].replace(/[+\-NS]/, "")), parseInt(coords[1]) / 60, parseInt(coords[2]) / 3600);
        
        //the degree needs special treamment, because it can be represented as +,-,N and S
        var lat_deg = parseInt(coords[0].replace(/[+\-NS]/, ""));
        var long_deg = parseInt(coords[3].replace(/[EW]/, ""));
        if(coords[0].match(/^[S\-]/))
            lat_deg = -lat_deg;
        if(coords[3].match(/^[W]/))
            long_deg = -long_deg;
        
        var lat_min = parseInt(coords[1]);
        if(isNaN(lat_min))
            lat_min = 0;
        
        var lat_sec = parseFloat(coords[2])
        if(isNaN(lat_sec))
            lat_sec = 0;
        
        var long_min = parseInt(coords[4]);
        if(isNaN(long_min))
            long_min = 0;
        
        var long_sec = parseFloat(coords[5]);
        if(isNaN(long_sec))
            long_sec = 0;
        
        var coord_array = {
            latitude: {
                degree: lat_deg,
                minutes: lat_min,
                seconds: lat_sec
            },
            
            longitude: {
                degree: long_deg,
                minutes: long_min,
                seconds: long_sec
            }
        };
        CoordinateCalculator.coords = coord_array;
        return CoordinateCalculator.coords;
    },
    
    loadCoordsDDM: function(elem) {
        (CoordinateCalculator.DEBUG) ? console.log("loadCoordsDMS():") : null;;
        var elem_str = elem.val();
        var coords = elem_str.split(" ");
        var lat_deg = parseInt(coords[0].replace(/[+\-NS]/, ""));
        var long_deg = parseInt(coords[2].replace(/[EW]/, ""));
        if(coords[0].match(/^[S\-]/))
            lat_deg = -lat_deg;
        if(coords[2].match(/^[W]/))
            long_deg = -long_deg;
        
        var lat_min = parseFloat(coords[1]);
        if(isNaN(lat_min))
            lat_min = 0;
        var lat_sec = (lat_min - Math.floor(lat_min)) * 60
        
        var long_min = parseFloat(coords[3]);
        if(isNaN(long_min))
            long_min = 0;
        
        var long_sec = (long_min - Math.floor(long_min)) * 60
        
        var coord_array = {
            latitude: {
                degree: lat_deg,
                minutes: lat_min,
                seconds: lat_sec
            },
            
            longitude: {
                degree: long_deg,
                minutes: long_min,
                seconds: long_sec
            }
        };
        CoordinateCalculator.coords = coord_array;
        return CoordinateCalculator.coords;
    },
    
    loadCoordsDD: function(elem) {
        (CoordinateCalculator.DEBUG) ? console.log("loadCoordsDD():") : null;;
        var elem_str = elem.val();
        var coords = elem_str.split(" ");
        var lat_deg = parseFloat(coords[0].replace(/[+\-NS]/, ""));
        var long_deg = parseFloat(coords[1].replace(/[EW]/, ""));
        if(coords[0].match(/^[S\-]/))
            lat_deg = -lat_deg;
        if(coords[1].match(/^[W]/))
            long_deg = -long_deg;
        
        var lat_min = (lat_deg - Math.floor(lat_deg)) * 60
        var lat_sec = (lat_min - Math.floor(lat_min)) * 60
        
        var long_min = (long_deg - Math.floor(long_deg)) * 60
        var long_sec = (long_min - Math.floor(long_min)) * 60
        
        var coord_array = {
            latitude: {
                degree: lat_deg,
                minutes: lat_min,
                seconds: lat_sec
            },
            
            longitude: {
                degree: long_deg,
                minutes: long_min,
                seconds: long_sec
            }
        };
        CoordinateCalculator.coords = coord_array;
        return CoordinateCalculator.coords;
    },
    
    setDMS: function(lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds) {
        (CoordinateCalculator.DEBUG) ? console.log("setDMS():") : null;;
                
        if(lat_degree >= 0)
            lat_degree = "N" + Math.floor(lat_degree).toString();
        else
            lat_degree = "S" + Math.floor(-lat_degree).toString();
        
        if(long_degree >= 0)
            long_degree = "E" + Math.floor(long_degree).toString();
        else
            long_degree = "W" + Math.floor(-long_degree).toString();
        //console.log("setDMS(): ",lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds);    
        jQuery("#dms-d-input-lat").val(lat_degree);
        jQuery("#dms-m-input-lat").val(Math.floor(lat_minutes));
        jQuery("#dms-s-input-lat").val(Math.floor(lat_seconds));
        
        jQuery("#dms-d-input-long").val(long_degree);
        jQuery("#dms-m-input-long").val(Math.floor(long_minutes));
        jQuery("#dms-s-input-long").val(Math.floor(long_seconds));
        
        CoordinateCalculator.toCoordinates(jQuery("#dms-d-input-lat"));
    },
    
    setDMDS: function(lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds) {
        (CoordinateCalculator.DEBUG) ? console.log("setDMDS():") : null;;
        
        var precision = CoordinateCalculator.getPrecision();
        
        if(lat_degree >= 0)
            lat_degree = "N" + Math.floor(lat_degree).toString();
        else
            lat_degree = "S" + Math.floor(-lat_degree).toString();
        
        if(long_degree >= 0)
            long_degree = "E" + Math.floor(long_degree).toString();
        else
            long_degree = "W" + Math.floor(-long_degree).toString();
        //console.log("setDMDS(): ", lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds);
        jQuery("#dmds-d-input-lat").val(lat_degree);
        jQuery("#dmds-m-input-lat").val(Math.floor(lat_minutes));
        jQuery("#dmds-ds-input-lat").val(Math.round(lat_seconds*precision)/precision);
        
        jQuery("#dmds-d-input-long").val(long_degree);
        jQuery("#dmds-m-input-long").val(Math.floor(long_minutes));
        jQuery("#dmds-ds-input-long").val(Math.round(long_seconds*precision)/precision);
        
        CoordinateCalculator.toCoordinates(jQuery("#dmds-d-input-lat"));
    },
    
    setDDM: function(lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds) {
        (CoordinateCalculator.DEBUG) ? console.log("setDDM():") : null;;
        
        var precision = CoordinateCalculator.getPrecision();
        
        if(lat_degree >= 0)
            lat_degree = "N" + Math.floor(lat_degree).toString();
        else
            lat_degree = "S" + Math.floor(-lat_degree).toString();
        
        if(long_degree >= 0)
            long_degree = "E" + Math.floor(long_degree).toString();
        else
            long_degree = "W" + Math.floor(-long_degree).toString();
        
        jQuery("#ddm-d-input-lat").val(lat_degree);
        jQuery("#ddm-dm-input-lat").val(Math.round((Math.floor(lat_minutes) + lat_seconds / 60)*precision)/precision);
        
        jQuery("#ddm-d-input-long").val(long_degree);
        jQuery("#ddm-dm-input-long").val(Math.round((Math.floor(long_minutes) + long_seconds / 60)*precision)/precision);
        
        CoordinateCalculator.toCoordinates(jQuery("#ddm-d-input-lat"));
    },
    
    setDD: function(lat_degree, lat_minutes, long_degree, long_minutes) {
        (CoordinateCalculator.DEBUG) ? console.log("setDD():") : null;;
        
        var precision = CoordinateCalculator.getPrecision();
        
        lat_degree = Math.round((Math.floor(lat_degree) + lat_minutes / 60)*precision)/precision;
        long_degree = Math.round((Math.floor(long_degree) + long_minutes / 60)*precision)/precision;
        if(lat_degree >= 0)
            lat_degree = "N" + lat_degree.toString();
        else
            lat_degree = "S" + lat_degree.toString();
        
        if(long_degree >= 0)
            long_degree = "E" + long_degree.toString();
        else
            long_degree = "W" + long_degree.toString();
        jQuery("#dd-dd-input-lat").val(lat_degree);
        jQuery("#dd-dd-input-long").val(long_degree);
        
        CoordinateCalculator.toCoordinates(jQuery("#dd-dd-input-lat"));
    },
    
    refresh: function(){
        (CoordinateCalculator.DEBUG) ? console.log("refresh():") : null;;
        var lat_degree = CoordinateCalculator.coords.latitude.degree;
        var lat_minutes = CoordinateCalculator.coords.latitude.minutes;
        var lat_seconds = CoordinateCalculator.coords.latitude.seconds;
        var long_degree = CoordinateCalculator.coords.longitude.degree;
        var long_minutes = CoordinateCalculator.coords.longitude.minutes;
        var long_seconds = CoordinateCalculator.coords.longitude.seconds;
        jQuery("input[type=text]").off('change');
        CoordinateCalculator.setDMS(lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds);
        CoordinateCalculator.setDMDS(lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds);
        CoordinateCalculator.setDDM(lat_degree, lat_minutes, lat_seconds, long_degree, long_minutes, long_seconds);
        CoordinateCalculator.setDD(lat_degree, lat_minutes, long_degree, long_minutes);
        CoordinateCalculator.bindEvents();
    },
    
    toCoordinates: function(changed_element) {
        (CoordinateCalculator.DEBUG) ? console.log("toCoordinates():") : null;;
        var single_elements = changed_element.parents("fieldset:first").find("input.gps-single")
        var all_element = changed_element.parents("fieldset:first").find("input.gps-all")
        var all_string = "";
        
        //hide message for this row
        changed_element.parents("div:first").find("div.message").hide();
        
        //when there are invalid elements, just do nothing
        var valid = true;
        if(changed_element.parents("fieldset:first").find("input").each(function(){
            if(!jQuery(this).get(0).checkValidity() || !jQuery(this).get(0).validity.valid) {
                valid = false;
            }
                
        }))
        if(!valid) {
            //changed_element.get(0).setCustomValidity("You did not enter a correcter value here!");
            return false;
        }
        
        //check whether all elements are set
        var all_set = true;
        single_elements.each(function(){
            if(!jQuery(this).val())
                all_set=false;
        });
        if(!all_set)
            return false;
            
            
        
        //console.log("All Elements: ", single_elements);
        all_string = CoordinateCalculator.getCoordStr(single_elements);
        if(!all_string)
            return false;
        //console.log("Resulting String: ", all_string);
        //set the all value
        all_element.val(all_string);
        return true;
    },
    
    reset: function() {
        (CoordinateCalculator.DEBUG) ? console.log("reset():") : null;;
        jQuery("form#coordinate-calculator input").each(function(){
            jQuery(this).val("");
        });
        return false;
    },
    
    getCoordStr: function(elements) {
        (CoordinateCalculator.DEBUG) ? console.log("getCoordStr():") : null;;
        var lat_elements = new Array(elements.size()/2);
        var long_elements = new Array(elements.size()/2);
        for(var i=0; i<elements.size()/2;i++) {
            lat_elements[i] = elements.eq(i);
            long_elements[i] = elements.eq(i+elements.size()/2);
        }
        //console.log("Latitude Elements:", lat_elements, "Longitude Elements: ", long_elements);
        var latitude_str = CoordinateCalculator.getLatStr(lat_elements);
        var longitude_str = CoordinateCalculator.getLongStr(long_elements);
        if(!latitude_str || !longitude_str)
            return false;
        return latitude_str + " " + longitude_str;
    },
    
    getLatStr: function(elements) {
        (CoordinateCalculator.DEBUG) ? console.log("getLatStr():") : null;;
        var degree = elements[0].val();
        if(elements.length > 1)
            var minutes = elements[1].val();
        if(elements.length > 2)
            var seconds = elements[2].val();
        
        //if degree is set with +/- replace it with the more compliant N/S
        degree = degree.replace("-", "S").replace("+", "N");
        if(!degree.match(/^[NS\-+]/))
            degree = "N" + degree;
        
        if(degree.match(/^[NS]90/) && (parseInt(minutes) || parseInt(seconds))) {
            CoordinateCalculator.setMessage(elements[0], "If the degrees are set to 90° you cannot enter more than 0 into minutes and seconds!")
            return false;
        }
        
        return CoordinateCalculator.buildCoordStr(degree, minutes, seconds);
    },
    
    getLongStr: function(elements) {
        (CoordinateCalculator.DEBUG) ? console.log("getLongStr():") : null;;
        var degree = elements[0].val();
        if(elements.length > 1)
            var minutes = elements[1].val();
        if(elements.length > 2)
            var seconds = elements[2].val();
        
        if(!degree.match(/^[EW]/))
            degree = "E" + degree;
        
        //if the degree value is 90, then no other value maybe set
        if(degree.match(/^[EW]180/) && (parseInt(minutes) || parseInt(seconds))) {
            CoordinateCalculator.setMessage(elements[0], "If the degrees are set to 180° you cannot enter more than 0 into minutes and seconds!")
            return false;
        }
        
        
        return CoordinateCalculator.buildCoordStr(degree, minutes, seconds);
    },
    
    buildCoordStr: function(degree, minutes, seconds) {
        (CoordinateCalculator.DEBUG) ? console.log("buildCoordStr():") : null;;
        if(!degree)
            return false;
        var str = degree + "°";
        if(minutes)
            str += " " + minutes + "'";
        if(seconds)
            str += " " + seconds + '"';
        return str;
    },
    
    getPrecision: function() {
        return Math.pow(10, CoordinateCalculator.precision);
    },

    setMessage: function(element, message) {
        var message_div = element.parents("div:first").find("div.message");
        message_div.text(message);
        message_div.show();
        console.log("For element", element, ": ", message)
    }
};