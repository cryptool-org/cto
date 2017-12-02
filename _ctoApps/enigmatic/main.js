'use strict';

let refresh;
let main_ids = [];

jQuery(function ($) {

    const err = ($base, msg) => {
        const $alert = $base.find('.alert');
        $alert.toggleClass('hidden', !msg);
        $alert.text(msg);
    };

    const wheel_from_reflector = (str, $base) => {
        const result = { mapping: {}, inv_mapping: {}, ring: 1, overflow: '' };
        let last_ch = undefined;
        for (let i = 0; i < str.length; ++i) {
            const ch = str[i].toUpperCase();
            if (ch >= 'A' && ch <= 'Z') {
                if (last_ch) {
                    result.mapping[ch] = last_ch;
                    result.mapping[last_ch] = ch;
                    result.inv_mapping[ch] = last_ch;
                    result.inv_mapping[last_ch] = ch;
                    last_ch = undefined;
                } else {
                    last_ch = ch;
                }
            }
        }
        if (last_ch) { err($base, "pending char"); return null; }
        result.pretty_from = "ABCDE FGHIJ KLMNO PQRST UVWXY Z";
        result.pretty_to = "";
        for (let i = 0; i < result.pretty_from.length; ++i) {
            const key = result.pretty_from[i].toUpperCase();
            if (key >= 'A' && key <= 'Z') {
                if (! result.mapping[key]) {
                	result.mapping[key] = key;
                	result.inv_mapping[key] = key;
                }
                result.pretty_to += result.mapping[key];
            } else {
                result.pretty_to += key;
            }
        }
        return result;
    };

    const wheel_from_to = (str, $base) => {
        const result = { mapping: {}, inv_mapping: {}, ring: 1, overflow: '' };
        result.pretty_from = "ABCDE FGHIJ KLMNO PQRST UVWXY Z";
        result.pretty_to = "";
        str = str.toUpperCase();
        let j = 0;
        for (let i = 0; i < result.pretty_from.length; ++i) {
            const key = result.pretty_from[i];
            if (key >= 'A' && key <= 'Z') {
            	while (j < str.length && (str[j] < 'A' || str[j] > 'Z')) { ++j; }
            	if (j >= str.length) { err($base, "too short"); return null; }
            	const val = str[j];
            	if (result.inv_mapping[val]) { err($base, "key used twice"); return null; }
            	result.mapping[key] = val;
            	result.inv_mapping[val] = key;
                result.pretty_to += val;
                ++j;
            } else {
                result.pretty_to += key;
            }
        }
        return result;
    };

	const state = {
		'reflector': null,
		'plugboard': null,
		'wheels': []
	};

// recalculate fields

    const isDefaultConfiguration = () => { 
        const wheels = state.wheels;
        if (state.wheels.length !== 3) { return false; }
        let wheels_found = {};
        for (let i = state.wheels.length - 1; i >= 0; --i) {
            const pretty_to = wheels[i].pretty_to;
            const overflows = wheels[i].overflow;
            if ((pretty_to === std_wheels['I']) && (overflows == std_overflows['I']) && ! wheels_found['I']) { 
                wheels_found['I'] = true; 
            } else if ((pretty_to === std_wheels['II']) && (overflows == std_overflows['II']) && ! wheels_found['II']) {
                wheels_found['II'] = true;
            } else if ((pretty_to === std_wheels['III']) && (overflows == std_overflows['III']) && ! wheels_found['III']) {
                wheels_found['III'] = true;
            } else if ((pretty_to === std_wheels['IV']) && (overflows == std_overflows['IV']) && ! wheels_found['IV']) {
                wheels_found['IV'] = true;
            } else if ((pretty_to === std_wheels['V']) && (overflows == std_overflows['V']) && ! wheels_found['V']) {
                wheels_found['V'] = true;
            } else { return false; }
        }

        const ref_pretty_to = state.reflector.pretty_to;
        if ((ref_pretty_to !== wheel_from_reflector(std_reflectors['A']).pretty_to)
            && (ref_pretty_to !== wheel_from_reflector(std_reflectors['B']).pretty_to)
            && (ref_pretty_to !== wheel_from_reflector(std_reflectors['C'])).pretty_to
        ) {
            return false;
        }
        return true;
    };

    const checkForDefaultConfiguration = () => {
        $('#non-standard-warning').toggleClass('hidden', isDefaultConfiguration());
    };

	refresh = () => {
        checkForDefaultConfiguration();
		const wheels = jQuery('#key').find('input').val();
		const input = jQuery('#input').find('input').val();
		encode(input, wheels, state);
	};

	refresh();


// toggle collapse/expand


	function addToggleDiv(a, divs) {
		jQuery('#' + a).on('click', (evt) => {
            toggleDiv(a, divs);
			if (evt) { evt.preventDefault(); }
		});
	}

	const configurationDivs = [
		'configuration-intro',
        'wheels-toggler', 'wheels-intro', 'add-wheel',
        'reflector-toggler', 'reflector-intro', 'reflector-presets', 'reflector-mapping', 'reflector-wheel',
        'plugboard-toggler', 'plugboard-intro', 'plugboard-mapping', 'plugboard-wheel'
	];

	addToggleDiv('toggle-configuration', configurationDivs);
	addToggleDiv('toggle-reflector', ['reflector-intro', 'reflector-presets', 'reflector-mapping', 'reflector-wheel']);

	const $reflector_mapping_input = $('#reflector-mapping').find('input');
	const $reflector_wheel = $('#reflector-wheel');
    const $reflector_wheel_from = $reflector_wheel.find('.from');
    const $reflector_wheel_to = $reflector_wheel.find('.to');

	const setReflector = (str, id) => {
		const wheel = wheel_from_reflector(str, $('#reflector-mapping'));
		if (! wheel) { return; }
		err($('#reflector-mapping'));
		state.reflector = wheel;
		$reflector_mapping_input.val(str);
		$reflector_wheel_from.text(wheel.pretty_from);
		$reflector_wheel_to.val(wheel.pretty_to);
        $('#ukw-a').toggleClass('active', id === 'ukw-a');
        $('#ukw-b').toggleClass('active', id === 'ukw-b');
		$('#ukw-c').toggleClass('active', id === 'ukw-c');
		refresh();
	};
    $('#ukw-a').on('click', (event) => {
        event.preventDefault();
        setReflector(std_reflectors['A'], 'ukw-a'); }
    );
    $('#ukw-b').on('click', (event) => {
        event.preventDefault();
        setReflector(std_reflectors['B'], 'ukw-b'); }
    );
	$('#ukw-c').on('click', (event) => {
		event.preventDefault();
		setReflector(std_reflectors['C'], 'ukw-c'); }
	);
	setReflector(std_reflectors['B'], 'ukw-b');

	const reflector_from_wheel = (wheel, $base) => {
		if (! wheel) { return null; }
		const mapping = $.extend({}, wheel.mapping);
		let result = '';
		for (let i = 0; i < wheel.pretty_from.length; ++i) {
			const key = wheel.pretty_from[i];
			if (key in mapping) {
				const val = mapping[key];
				if (mapping[val] !== key) { err($base, 'not reflectable: ' + key + ', ' + val); return null;}
				if (key !== val) {
                    if (result.length) {
                        result += ' ';
                    }
                    result += key;
                    result += val;
                    delete mapping[val];
                }
                delete mapping[key];
			}
		}
		return result;
	};
	const wheel_equals_reflector = (wheel, str) => {
		const other = wheel_from_reflector(str, null);
		return wheel && other && wheel.pretty_to === other.pretty_to;
	};

	$reflector_mapping_input.on('change', (event) => {
		event.preventDefault();
		const $mapping = $('#reflector-mapping');
		const wheel = wheel_from_reflector($reflector_mapping_input.val(), $mapping);
		if (wheel) {
		    err($mapping);
			state.reflector = wheel;
            $reflector_wheel_from.text(wheel.pretty_from);
            $reflector_wheel_to.val(wheel.pretty_to);
            $('#ukw-a').toggleClass('active', wheel_equals_reflector(wheel, std_reflectors['A']));
            $('#ukw-b').toggleClass('active', wheel_equals_reflector(wheel, std_reflectors['B']));
            $('#ukw-c').toggleClass('active', wheel_equals_reflector(wheel, std_reflectors['C']));
		}
		$reflector_mapping_input.val(reflector_from_wheel(state.reflector, $mapping));
		refresh();
	});

	$reflector_wheel_to.on('change', (event) => {
		event.preventDefault();
		const $wheel = $('#reflector-wheel');
		const wheel = wheel_from_to($reflector_wheel_to.val(), $wheel);
		if (wheel) {
			const reflector_str = reflector_from_wheel(wheel, $wheel);
			if (reflector_str) {
			    err($wheel);
				state.reflector = wheel;
				$reflector_mapping_input.val(reflector_str);
                $reflector_wheel_from.text(wheel.pretty_from);
			}
		}
        $reflector_wheel_to.val(state.reflector.pretty_to);
		refresh();
	});

	const wheelDivs = ['wheels-intro', 'add-wheel'];

    const setWheel = (pos, mapping) => {
        const $wheel = $('#wheel-' + pos + '-wheel');
        const wheel = wheel_from_to(mapping, $wheel);
        if (wheel) {
            err($wheel);
            wheel.ring = state.wheels[pos].ring;
            wheel.overflow = state.wheels[pos].overflow;
            state.wheels[pos] = wheel;
        }
        $wheel.find('.from').text(state.wheels[pos].pretty_from);
        $wheel.find('.to').val(state.wheels[pos].pretty_to);
        $('#wheel-' + pos + '-ring').find('input').val(state.wheels[pos].ring);
        $('#wheel-' + pos + '-i').toggleClass('active', wheel.pretty_to === std_wheels['I'] && wheel.overflow === std_overflows['I']);
        $('#wheel-' + pos + '-ii').toggleClass('active', wheel.pretty_to === std_wheels['II'] && wheel.overflow === std_overflows['II']);
        $('#wheel-' + pos + '-iii').toggleClass('active', wheel.pretty_to === std_wheels['III'] && wheel.overflow === std_overflows['III']);
        $('#wheel-' + pos + '-iv').toggleClass('active', wheel.pretty_to === std_wheels['IV'] && wheel.overflow === std_overflows['IV']);
        $('#wheel-' + pos + '-v').toggleClass('active', wheel.pretty_to === std_wheels['V'] && wheel.overflow === std_overflows['V']);
    };

    const setWheelRing = (pos, value) => {
        const wheel = state.wheels[pos];
        wheel.ring = (value + 25) % 26 + 1;
        $('#wheel-' + pos + '-ring').find('input').val(wheel.ring);
    };

    const setWheelOverflows = (pos, value) => {
    	const wheel = state.wheels[pos];
    	wheel.overflow = value;
    	$('#wheel-' + pos + '-overflows').find('input').val(wheel.overflow);
	};

	const addWheel = () => {
		const wheel = wheel_from_to(std_wheels['I'], null);
		state.wheels.push(wheel);
		const pos = state.wheels.length - 1;
		const id = 'wheel-' + pos;
		const wheel_pattern = "${{ enigmatic.WHEEL }}$";
		const expanded_wheel_pattern = wheel_pattern.replace(/\$\$/, state.wheels.length);
		const $wheel = $.parseHTML(
            "<div class='panel panel-default'>" +
                "<div class='panel-heading' data-toggle='collapse' data-target='#" + id + "-panel'>" +
                    "<h4 class='panel-title'>" + expanded_wheel_pattern + "</h4>" +
                "</div>" +
                "<div id='" + id + "-panel' class='panel-collapse collapse in'>" +
                    "<div class='panel-body'>" +
                        "<div id='" + id + "-presets'>" +
                            "<div class='form-group'>" +
                            "<label for='"+ id + "-presets' class='col-lg-3'>${{ enigmatic.WHEEL_PRESET }}$</label>" +
                            "<div class='btn-group btn-group-sm col-lg-9' role='group'>" +
                                "<button type='button' class='btn btn-default' id='" + id + "-i' href='#'>I</button>" +
                                "<button type='button' class='btn btn-default' id='" + id + "-ii' href='#'>II</button>" +
                                "<button type='button' class='btn btn-default' id='" + id + "-iii' href='#'>III</button>" +
                                "<button type='button' class='btn btn-default' id='" + id + "-iv' href='#'>IV</button>" +
                                "<button type='button' class='btn btn-default' id='" + id + "-v' href='#'>V</button>" +
                            "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div id='" + id + "-wheel' class='wheel'>" +
                            "<div class='form-group'>" + 
                            "<label for='" + id + "-wheel' class='col-lg-3'>${{ enigmatic.WHEEL_PERMUTATION }}$</label>" +
                            "<div class='col-lg-9'>" +
                                "<div class='from referable'></div>" +
                                "<div class='alert alert-danger hidden'></div>" +
                                "<input class='to enigmatic-editable form-control'>" +
                            "</div>" +
                            "</div>" + 
                        "</div>" +
                        "<div id='" + id + "-overflows'>" +
                            "<div class='form-group'>" +
                            "<label for='" + id + "-overflows' class='col-lg-3'>${{ enigmatic.WHEEL_OVERFLOWS }}$</label>" +
                            "<div class='col-lg-9'>" +
                            "<input class='form-control enigmatic-editable'>" +
                            "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div id='" + id + "-ring'>" +
                            "<div class='form-group'>" + 
                            "<label for='"+ id + "-ring' class='col-lg-3'>${{ enigmatic.WHEEL_OFFSET }}$</label>" +
                            "<div class='col-lg-9'>" + 
                            "<div class='alert alert-danger hidden'></div>" +
                            "<input class='form-control enigmatic-editable'>" +
                            "</div>" + 
                            "</div>" + 
                        "</div>" +
                        "<div id='" + id + "-delete'>" +
                            "<div class='form-group'>" +
                            "<div class='col-lg-9 col-lg-offset-3'>" +
                            "<button class='btn btn-danger'>${{ enigmatic.WHEEL_DELETE }}$</button>" +
                            "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>"
		);

		$($wheel).insertBefore($('#add-wheel'));

		if (pos >= 1) {
            $('#wheel-' + (pos - 1) + '-delete').addClass('unavailable');
        }
        addToggleDiv('toggle-' + id, [id + '-presets', id + '-wheel', id + '-ring', id + '-overflows', id + '-delete']);
        configurationDivs.push(id + '-toggler', id + '-presets', id + '-wheel', id + '-ring', id + '-overflows', id + '-delete');
        wheelDivs.push(id + '-toggler', id + '-presets', id + '-wheel', id + '-ring', id + '-overflows', id + '-delete');

        $('#' + id + '-delete button').on('click', (event) => {
            event.preventDefault();
            if (pos > 1) {
                $('#wheel-' + (pos - 1) + '-delete').removeClass('unavailable');
            }
            $('#' + id + '-panel').parent().remove();
            state.wheels.pop();
            const $input = $('#key').find('input');
            if ($input.val().length > pos) { $input.val($input.val().substring(0, pos)); }

            refresh();
        });
        const $to_mapping = $('#' + id + '-wheel').find('.to');
        $to_mapping.on('change', (event) => {
            event.preventDefault();
            setWheel(pos, $to_mapping.val());
            refresh();
        });
        const $ring = $('#' + id + '-ring').find('input');
        $ring.on('change', (event) => {
            event.preventDefault();
            setWheelRing(pos, parseInt($ring.val()));
            refresh();
        });
        const $overflows = $('#' + id + '-overflows').find('input');
        $overflows.on('change', (event) => {
        	event.preventDefault();
        	setWheelOverflows(pos, $overflows.val());
		});
        $('#' + id + '-i').on('click', (event) => {
        	event.preventDefault();
        	setWheelOverflows(pos, std_overflows['I']);
        	setWheel(pos, std_wheels['I']);
        	refresh();
		});
        $('#' + id + '-ii').on('click', (event) => {
        	event.preventDefault();
        	setWheelOverflows(pos, std_overflows['II']);
        	setWheel(pos, std_wheels['II']);
        	refresh();
		});
		$('#' + id + '-iii').on('click', (event) => {
			event.preventDefault();
			setWheelOverflows(pos, std_overflows['III']);
			setWheel(pos, std_wheels['III']);
			refresh();
		});
		$('#' + id + '-iv').on('click', (event) => {
			event.preventDefault();
			setWheelOverflows(pos, std_overflows['IV']);
			setWheel(pos, std_wheels['IV']);
			refresh();
		});
		$('#' + id + '-v').on('click', (event) => {
			event.preventDefault();
			setWheelOverflows(pos, std_overflows['V']);
			setWheel(pos, std_wheels['V']);
			refresh();
		});
	};

	addToggleDiv('toggle-wheels', wheelDivs);

	addWheel(); setWheelOverflows(0, std_overflows['I']); setWheel(0, std_wheels['I']); setWheelRing(0, 16);
	addWheel(); setWheelOverflows(1, std_overflows['IV']); setWheel(1, std_wheels['IV']); setWheelRing(1, 26);
	addWheel(); setWheelOverflows(2, std_overflows['III']); setWheel(2, std_wheels['III']); setWheelRing(2, 8);

    $('#add-wheel').find('button').on('click', (event) => {
        event.preventDefault();
        const wheel_num = state.wheels.length;
        addWheel();

        let possible_wheels = { 'I': true, 'II': true, 'III': true, 'IV': true, 'V': true };
        for (let i = 0; i < state.wheels.length; ++i) {
            let pretty_to = state.wheels[i].pretty_to;
            let overflow = state.wheels[i].overflow;
            let keys = Object.keys(possible_wheels);
            for (var j = 0; j < keys.length; ++j) {
                if (std_overflows[keys[j]] === overflow && std_wheels[keys[j]] === pretty_to) {
                    delete possible_wheels[keys[j]];
                }
            }
        }
        let something = false;
        for (let key in possible_wheels) {
            setWheelOverflows(wheel_num, std_overflows[key]);
            setWheel(wheel_num, std_wheels[key]);
            something = true;
            break;
        }
        if (! something) {
            setWheelOverflows(wheel_num, std_overflows['I']);
            setWheel(wheel_num, std_wheels['I']);
        }
        setWheelRing(wheel_num, 1);
        const $input = $('#key').find('input');
        while ($input.val().length <= wheel_num) { $input.val($input.val() + 'A'); }
        refresh();
    });

    addToggleDiv('toggle-plugboard', ['plugboard-intro', 'plugboard-mapping', 'plugboard-wheel']);

    const $plugboard_mapping_input = $('#plugboard-mapping').find('input');
    const $plugboard_wheel = $('#plugboard-wheel');
    const $plugboard_wheel_from = $plugboard_wheel.find('.from');
    const $plugboard_wheel_to = $plugboard_wheel.find('.to');

    const setPlugboardReflector = (str) => {
        const $mapping = $('#plugboard-mapping');
    	const wheel = wheel_from_reflector(str, $mapping);
    	if (wheel) {
    	    err($mapping);
    		state.plugboard = wheel;
    		$plugboard_wheel_from.text(wheel.pretty_from);
    		$plugboard_wheel_to.val(wheel.pretty_to);
		}
		$plugboard_mapping_input.val(reflector_from_wheel(state.plugboard, $mapping));
    	refresh();
	};
    setPlugboardReflector('AD CN ET FL GI JV KZ PU QY WX');
    $plugboard_mapping_input.on('change', (event) => {
    	event.preventDefault();
    	setPlugboardReflector($plugboard_mapping_input.val());
	});
    $plugboard_wheel_to.on('change', (event) => {
    	event.preventDefault();
    	const wheel = wheel_from_to($plugboard_wheel_to.val(), $('#plugboard-wheel'));
    	if (wheel) {
    		const reflected = reflector_from_wheel(wheel);
    		if (reflected) {
    			state.plugboard = wheel;
    			$plugboard_mapping_input.val(reflected);
    			$plugboard_wheel_from.text(wheel.pretty_from);
			}
		}
    	$plugboard_wheel_to.val(state.plugboard.pretty_to);
	});

	addToggleDiv('toggle-key', ['key']);

	let $keyInput = $('#key').find('input');
	$keyInput.val('QWE');
	$keyInput.on('change', refresh);

	addToggleDiv('toggle-input', ['input']);

	let $inputInput = $('#input').find('input');
	$inputInput.val('RTZ');
	$inputInput.on('input', refresh);

	addToggleDiv('toggle-enc-rounds', main_ids);
	addToggleDiv('toggle-encoded', ['output']);

    refresh();
});
