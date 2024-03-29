'use strict';

let refresh;
let main_ids = [];

jQuery(function ($) {

    const err = ($base, msg) => {
        const $alert = $base.find('.alert');
        $alert.toggleClass('hidden', !msg);
        $alert.text(msg);
    };

	const state = {
		'reflector': null,
		'plugboard': null,
		'wheels': []
	};

// recalculate fields

	const getStdWheelName = (pretty_to) => {
		for (let key in std_wheels) {
			if (std_wheels.hasOwnProperty(key)) {
				if (pretty_to === std_wheels[key]) { return key; }
			}
		}
		return null;
	};

    const getNonDefaultReason = () => { 
        const wheels = state.wheels;
        if (wheels.length !== 3) {
			return "${{enigmatic.NOT_THREE_WHEELS}}$".replace("##", wheels.length);
		}
        let wheels_found = {};
        for (let i = wheels.length - 1; i >= 0; --i) {
			const wheel = wheels[i];
            const pretty_to = wheel.pretty_to;
            const overflows = wheel.overflow;
			const std_wheel = getStdWheelName(pretty_to);
			if (! std_wheel) {
				return "${{enigmatic.NOT_STD_WHEEL}}$".replace("##", i + 1);
			}
			if (overflows !== std_overflows[std_wheel]) {
				return "${{enigmatic.NOT_STD_OVERFLOW}}$".replace("##", i + 1);
			}
			if (wheels_found[std_wheel]) {
				return "${{enigmatic.MULTIPLE_USE_OF_STD_WHEEL}}$".replace("##", std_wheel);
			}
			wheels_found[std_wheel] = true;
			if (i > 1 && wheel.anomal) {
				return "${{enigmatic.ANOMAL_WHEEL}}$".replace("##", i + 1);
			}
			if (i === 1 && ! wheel.anomal) {
				return "${{enigmatic.NOT_ANOMAL_WHEEL}}$".replace("##", i + 1);
			}
        }

        const ref_pretty_to = state.reflector.pretty_to;
        if ((ref_pretty_to !== wheel_from_reflector(std_reflectors['A']).pretty_to)
            && (ref_pretty_to !== wheel_from_reflector(std_reflectors['B']).pretty_to)
            && (ref_pretty_to !== wheel_from_reflector(std_reflectors['C'])).pretty_to
        ) {
            return "${{enigmatic.NOT_STD_REFLECTOR}}$";
        }
        return null;
    };

    const checkForDefaultConfiguration = () => {
		const non_default_reason = getNonDefaultReason();
        const $warning = $('#non-standard-warning');
		$warning.find('span').text(non_default_reason ? non_default_reason : '');
		$warning.toggleClass('hidden', ! non_default_reason);
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
			wheel.anomal = state.wheels[pos].anomal;
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

	const addWheel = (anomal) => {
		const wheel = wheel_from_to(std_wheels['I'], null);
		wheel.anomal = !! anomal;
		state.wheels.push(wheel);
		const pos = state.wheels.length - 1;
		const id = 'wheel-' + pos;
		const wheel_pattern = "${{ enigmatic.WHEEL }}$";
		const expanded_wheel_pattern = wheel_pattern.replace(/\$\$/, state.wheels.length);
		const $wheel = $.parseHTML(

			'<div class="card">' +
				'<div class="card-header" id="' + id + '-card-header">' +
					'<button class="btn btn-link btn-block text-left text-body" type="button" data-toggle="collapse" data-target="#' + id + '-card-collapse" aria-expanded="true" aria-controls="' + id + '-card-collapse">' +
						expanded_wheel_pattern +
					'</button>' +
				'</div>' +
				'<div id="' + id + '-card-collapse" class="collapse show" aria-labelledby="' + id + '-card-header">' +
					'<div class="card-body">' +
						
						'<div id="' + id + '-presets">' +
							'<div class="form-group form-inline">' +
								'<label for="' + id + '-presets" class="col-lg-3">${{ enigmatic.WHEEL_PRESET }}$</label>' +
								'<div class="btn-group btn-group-sm col-lg-9" role="group">' +
									'<button type="button" class="btn btn-outline-dark" id="' + id + '-i" href="#">I</button>' +
									'<button type="button" class="btn btn-outline-dark" id="' + id + '-ii" href="#">II</button>' +
									'<button type="button" class="btn btn-outline-dark" id="' + id + '-iii" href="#">III</button>' +
									'<button type="button" class="btn btn-outline-dark" id="' + id + '-iv" href="#">IV</button>' +
									'<button type="button" class="btn btn-outline-dark" id="' + id + '-v" href="#">V</button>' +
								'</div>' +
							'</div>' +
						'</div>' +

						'<div id="' + id + '-wheel" class="wheel">' +
							'<div class="form-group form-inline">' + 
								'<label for="' + id + '-wheel" class="col-lg-3">${{ enigmatic.WHEEL_PERMUTATION }}$</label>' +
								'<div class="col-lg-9">' +
									'<div class="from referable"></div>' +
									'<div class="alert alert-danger hidden"></div>' +
									'<input class="to enigmatic-editable form-control w-100">' +
								'</div>' +
							'</div>' + 
						'</div>' +

						'<div id="' + id + '-overflows">' +
							'<div class="form-group form-inline">' +
								'<label for="' + id + '-overflows" class="col-lg-3">${{ enigmatic.WHEEL_OVERFLOWS }}$</label>' +
								'<div class="col-lg-9">' +
									'<input class="form-control enigmatic-editable w-100">' +
								'</div>' +
							'</div>' +
						'</div>' +

						'<div id="' + id + '-ring">' +
							'<div class="form-group form-inline">' + 
								'<label for="' + id + '-ring" class="col-lg-3">${{ enigmatic.WHEEL_OFFSET }}$</label>' +
								'<div class="col-lg-9">' + 
									'<div class="alert alert-danger hidden"></div>' +
									'<input class="form-control enigmatic-editable w-100">' +
								'</div>' + 
							'</div>' + 
						'</div>' +

						'<div id="' + id + '-anomal">' +
							'<div class="form-group form-inline">' +
								'<div class="col-lg-3">&nbsp;</div>' +
								'<div class="col-lg-9 custom-control custom-checkbox">' +
									'<input type="checkbox" class="custom-control-input" id="' + id + '-anomal-input" ' + (anomal ? ' checked' : '') + '>' +
									'<label class="custom-control-label" for="' + id + '-anomal-input">${{ enigmatic.WHEEL_ANOMAL }}$</label>' +
								'</div>' +
							'</div>' + 
						'</div>' +

						'<div id="' + id + '-delete">' +
							'<div class="form-group form-inline mb-0">' +
								'<div class="col-lg-9 col-lg-offset-3">' +
									'<button class="btn btn-danger"><i class="fa fa-trash mr-1"></i>${{ enigmatic.WHEEL_DELETE }}$</button>' +
								'</div>' +
							'</div>' +
						'</div>' +

					'</div>' +
				'</div>' +
			'</div>'
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
            $('#' + id + '-card-collapse').parent().remove();
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
			refresh();
		});
		const $anomal = $('#' + id + '-anomal').find('input');
		$anomal.on('click', (event) => {
			const wheel = state.wheels[pos];
			wheel.anomal = $anomal.is(':checked');
			refresh();
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
	addWheel(true); setWheelOverflows(1, std_overflows['IV']); setWheel(1, std_wheels['IV']); setWheelRing(1, 26);
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
