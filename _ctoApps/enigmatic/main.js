'use strict';

let refresh;

jQuery(function ($) {

    const wheel_from_reflector = (str) => {
        const result = { mapping: {}, inv_mapping: {}, ring: 1 };
        let last_ch = undefined;
        for (let i = 0; i < str.length; ++i) {
            const ch = str[i];
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
        if (last_ch) { console.log("pending char"); return null; }
        result.pretty_from = "ABCDE FGHIJ KLMNO PQRST UVWXY Z";
        result.pretty_to = "";
        for (let i = 0; i < result.pretty_from.length; ++i) {
            const key = result.pretty_from[i];
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

    const wheel_from_to = (str) => {
        const result = { mapping: {}, inv_mapping: {}, ring: 1 };
        result.pretty_from = "ABCDE FGHIJ KLMNO PQRST UVWXY Z";
        result.pretty_to = "";
        let j = 0;
        for (let i = 0; i < result.pretty_from.length; ++i) {
            const key = result.pretty_from[i];
            if (key >= 'A' && key <= 'Z') {
            	while (j < str.length && (str[j] < 'A' || str[j] > 'Z')) { ++j; }
            	if (j >= str.length) { console.log("too short"); return null; }
            	const val = str[j];
            	if (result.inv_mapping[val]) { console.log("key used twice"); return null; }
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
		'wheels': [],
		'key': testcases[0].key.slice(),
		'input': testcases[0].input.slice()
	};

// recalculate fields

	refresh = function() {
		//aes.resetDependencies();
		//aes.relayout();
		const wheels = jQuery('#key').find('input').val();
		const input = jQuery('#input').find('input').val();
		encode(input, wheels, state);
		//const encoded = encode_chain(state, expandedKey);
		//decode_chain(encoded, state, expandedKey);
		//aes.refreshTappedCell();
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
        'reflector-toggler', 'reflector-presets', 'reflector-mapping', 'reflector-wheel',
		'wheels-toggler',
        'plugboard-toggler', 'plugboard-mapping', 'plugboard-wheel'
	];

	addToggleDiv('toggle-configuration', configurationDivs);
	addToggleDiv('toggle-reflector', ['reflector-presets', 'reflector-mapping', 'reflector-wheel']);

	const $reflector_mapping_input = $('#reflector-mapping').find('input');
	const $reflector_wheel = $('#reflector-wheel');
    const $reflector_wheel_from = $reflector_wheel.find('.from');
    const $reflector_wheel_to = $reflector_wheel.find('.to');

	const setReflector = (str, id) => {
		const wheel = wheel_from_reflector(str);
		if (! wheel) { return; }
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

	const reflector_from_wheel = (wheel) => {
		if (! wheel) { return null; }
		const mapping = $.extend({}, wheel.mapping);
		let result = '';
		for (let i = 0; i < wheel.pretty_from.length; ++i) {
			const key = wheel.pretty_from[i];
			if (key in mapping) {
				const val = mapping[key];
				if (mapping[val] !== key) { console.log('not reflectable: ' + key + ', ' + val); return null;}
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
		const other = wheel_from_reflector(str);
		return wheel && other && wheel.pretty_to === other.pretty_to;
	};

	$reflector_mapping_input.on('change', (event) => {
		event.preventDefault();
		const wheel = wheel_from_reflector($reflector_mapping_input.val());
		if (wheel) {
			state.reflector = wheel;
            $reflector_wheel_from.text(wheel.pretty_from);
            $reflector_wheel_to.val(wheel.pretty_to);
            $('#ukw-a').toggleClass('active', wheel_equals_reflector(wheel, std_reflectors['A']));
            $('#ukw-b').toggleClass('active', wheel_equals_reflector(wheel, std_reflectors['B']));
            $('#ukw-c').toggleClass('active', wheel_equals_reflector(wheel, std_reflectors['C']));
		}
		$reflector_mapping_input.val(reflector_from_wheel(state.reflector));
		refresh();
	});

	$reflector_wheel_to.on('change', (event) => {
		event.preventDefault();
		const wheel = wheel_from_to($reflector_wheel_to.val());
		if (wheel) {
			const reflector_str = reflector_from_wheel(wheel);
			if (reflector_str) {
				state.reflector = wheel;
				$reflector_mapping_input.val(reflector_str);
                $reflector_wheel_from.text(wheel.pretty_from);
			}
		}
        $reflector_wheel_to.val(state.reflector.pretty_to);
		refresh();
	});

	const wheelDivs = [];

    const setWheel = (pos, mapping) => {
        const wheel = wheel_from_to(mapping);
        if (wheel) {
            wheel.ring = state.wheels[pos].ring;
            state.wheels[pos] = wheel;
        }
        const $wheel = $('#wheel-' + pos + '-wheel');
        $wheel.find('.from').text(state.wheels[pos].pretty_from);
        $wheel.find('.to').val(state.wheels[pos].pretty_to);
        $('#wheel-' + pos + '-ring').find('input').val(state.wheels[pos].ring);
        $('#wheel-' + pos + '-i').toggleClass('active', wheel.pretty_to === std_wheels['I']);
        $('#wheel-' + pos + '-ii').toggleClass('active', wheel.pretty_to === std_wheels['II']);
        $('#wheel-' + pos + '-iii').toggleClass('active', wheel.pretty_to === std_wheels['III']);
        $('#wheel-' + pos + '-iv').toggleClass('active', wheel.pretty_to === std_wheels['IV']);
        $('#wheel-' + pos + '-v').toggleClass('active', wheel.pretty_to === std_wheels['V']);
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
		const wheel = wheel_from_to(std_wheels['I']);
		state.wheels.push(wheel);
		const pos = state.wheels.length - 1;
		const id = 'wheel-' + pos;
		const $wheel = $.parseHTML(
			"<li id='" + id + "-toggler'>" +
            	"<a class='flex-container' id='toggle-" + id + "' href='#'>" +
            		"<span class='flex-grow'>Walze " + (state.wheels.length - 1) + "</span>" +
                    "<span class='collapse glyphicon glyphicon-chevron-up'></span>" +
            		"<span class='expand glyphicon glyphicon-chevron-down'></span>" +
				"</a>" +
            "</li>" +
            	"<li id='" + id + "-presets'>" +
            		"<div class='btn-group btn-group-sm' role='group'>" +
            			"<button type='button' class='btn btn-default' id='" + id + "-i' href='#'>I</button>" +
            			"<button type='button' class='btn btn-default' id='" + id + "-ii' href='#'>II</button>" +
            			"<button type='button' class='btn btn-default' id='" + id + "-iii' href='#'>III</button>" +
            			"<button type='button' class='btn btn-default' id='" + id + "-iv' href='#'>IV</button>" +
            			"<button type='button' class='btn btn-default' id='" + id + "-v' href='#'>V</button>" +
					"</div>" +
            	"</li>" +
            	"<li id='" + id + "-wheel' class='flex-container wheel'>" +
            		"<span>Wheel</span>" +
					"<div class='flex-grow'>" +
						"<div class='from referable'></div>" +
						"<input class='to enigmatic-editable'>" +
					"</div>" +
            	"</li>" +
            	"<li id='" + id + "-overflows' class='flex-container'>" +
            		"<span>Overflows</span>" +
            		"<input class='flex-grow enigmatic-editable'>" +
            	"</li>" +
            	"<li id='" + id + "-ring' class='flex-container'>" +
            		"<span>Ring Position</span>" +
           			"<input class='flex-grow enigmatic-editable'>" +
            	"</li>"
		);

		$($wheel).insertBefore($('#plugboard-toggler'));

        addToggleDiv('toggle-' + id, id + '-presets', id + '-wheel', id + '-ring', id + '-overflows');
        configurationDivs.push(id + '-toggler', id + '-presets', id + '-wheel', id + '-ring', id + '-overflows');
        wheelDivs.push(id + '-toggler', id + '-presets', id + '-wheel', id + '-ring', id + '-overflows');

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
        	setWheel(pos, std_wheels['I']);
        	setWheelOverflows(pos, std_overflows['I']);
        	refresh();
		});
        $('#' + id + '-ii').on('click', (event) => {
        	event.preventDefault();
        	setWheel(pos, std_wheels['II']);
        	setWheelOverflows(pos, std_overflows['II']);
        	refresh();
		});
		$('#' + id + '-iii').on('click', (event) => {
			event.preventDefault();
			setWheel(pos, std_wheels['III']);
			setWheelOverflows(pos, std_overflows['III']);
			refresh();
		});
		$('#' + id + '-iv').on('click', (event) => {
			event.preventDefault();
			setWheel(pos, std_wheels['IV']);
			setWheelOverflows(pos, std_overflows['IV']);
			refresh();
		});
		$('#' + id + '-v').on('click', (event) => {
			event.preventDefault();
			setWheel(pos, std_wheels['V']);
			setWheelOverflows(pos, std_overflows['V']);
			refresh();
		});
	};

	addToggleDiv('toggle-wheels', wheelDivs);

	addWheel(); setWheel(0, std_wheels['I']); setWheelOverflows(0, std_overflows['I']); setWheelRing(0, 16);
	addWheel(); setWheel(1, std_wheels['IV']); setWheelOverflows(1, std_overflows['IV']); setWheelRing(1, 26);
	addWheel(); setWheel(2, std_wheels['III']); setWheelOverflows(2, std_overflows['III']); setWheelRing(2, 8);

    addToggleDiv('toggle-plugboard', ['plugboard-mapping', 'plugboard-wheel']);

    const $plugboard_mapping_input = $('#plugboard-mapping').find('input');
    const $plugboard_wheel = $('#plugboard-wheel');
    const $plugboard_wheel_from = $plugboard_wheel.find('.from');
    const $plugboard_wheel_to = $plugboard_wheel.find('.to');

    const setPlugboardReflector = (str) => {
    	const wheel = wheel_from_reflector(str);
    	if (wheel) {
    		state.plugboard = wheel;
    		$plugboard_wheel_from.text(wheel.pretty_from);
    		$plugboard_wheel_to.val(wheel.pretty_to);
		}
		$plugboard_mapping_input.val(reflector_from_wheel(state.plugboard));
    	refresh();
	};
    setPlugboardReflector('AD CN ET FL GI JV KZ PU QY WX');
    $plugboard_mapping_input.on('change', (event) => {
    	event.preventDefault();
    	setPlugboardReflector($plugboard_mapping_input.val());
	});
    $plugboard_wheel_to.on('change', (event) => {
    	event.preventDefault();
    	const wheel = wheel_from_to($plugboard_wheel_to.val());
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

	$('#key').find('input').val('QWE');
	$('#key').find('input').on('change', refresh);

	addToggleDiv('toggle-input', ['input']);

	$('#input').find('input').val('RTZ');
	$('#input').find('input').on('change', refresh);

	function setRoundsToggle(a, prefix) {
		const $a = jQuery('#' + a);
		$a.on('click', (evt) => {
            const divs = [];
            const steps = state.chaining === Chaining.None ? 1 : state.input.length / state.blockSize + 1;
            for (let j = 0; j < steps; ++j) {
                for (let i = 1; i <= state.rounds; ++i) {
                    divs.push('s-' + j + '-' + prefix + i + '-hdr');
                    divs.push('s-' + j + '-' + prefix + i + '-cnt');
                }
            }
            toggleDiv(a, divs);
			if (evt) { evt.preventDefault(); }
			refresh();
		});
	}

	setRoundsToggle('toggle-enc-rounds', 'r-enc-');
	setRoundsToggle('toggle-dec-rounds', 'r-dec-');

	addToggleDiv('toggle-encoded', ['output']);
	addToggleDiv('toggle-decoded', ['decoded']);

    refresh();
});