'use strict';

// do encoding

function add_state(prefix, name) {
	const html = jQuery.parseHTML("<li id='" + prefix + "' class='hidden'>" + name + "</li>");
	jQuery(html).insertBefore(jQuery('#rounds-end'));
}

function c2i(ch) { return ch.codePointAt(0) - 'A'.codePointAt(0); }
function i2c(i) { return String.fromCodePoint((i + 3 * 26) % 26 + 'A'.codePointAt(0)); }

function encode_round(pos, ch, wheels, state) {
	const id = 'enc-' + pos;
	const header_template = "${{ enigmatic.ENCODING_INPUT_CHAR }}$";
	const header_text = header_template.replace(/\$1/, ch).replace(/\$3/, pos);
	const header = jQuery.parseHTML(
		"<li id='" + id + "-toggler'>" +
        	"<a class='flex-container collapsed' id='toggle-" + id + "' href='#'>" +
	    	    "<span class='flex-grow'></span>" +
    	    	"<span class='collapse glyphicon glyphicon-chevron-up'></span>" +
				"<span class='expand glyphicon glyphicon-chevron-down'></span>" +
        	"</a>" +
        "</li>"
	);
	jQuery(header).insertBefore(jQuery('#rounds-end'));

	const orig_wheels = wheels;
	for (let i = wheels.length - 1; i >= 0; --i) {
		wheels = wheels.substr(0, i) + i2c(c2i(wheels[i]) + 1) + wheels.substr(i + 1);
		if (state.wheels[i].overflow.indexOf(wheels[i]) < 0) { break; }
	}
    const wheel_advancement_template = "${{ enigmatic.WHEEL_ADVANCEMENT }}$";
	const wheel_advancement = wheel_advancement_template.replace(/\$1/, orig_wheels).replace(/\$2/, wheels);
	add_state(id + '-wheels', wheel_advancement, ch, wheels);

	let current = "${{ enigmatic.STEP_INPUT}}$".replace(/\$\$/, ch);
	ch = state.plugboard.mapping[ch];
	current += "${{ enigmatic.STEP_PLUGBOARD }}$".replace(/\$\$/, ch);

	for (let i = wheels.length - 1; i >= 0; --i) {
		const wheel = state.wheels[i];
		const delta = c2i(wheels[i]) - wheel.ring + 1;
		ch = i2c(c2i(wheel.mapping[i2c(c2i(ch) + delta)]) - delta);
		current += "${{ enigmatic.STEP_WHEEL }}$".replace(/\$1/, i + 1).replace(/\$2/, ch);
	}

    ch = state.reflector.mapping[ch];
	current += "${{ enigmatic.STEP_REFLECTOR }}$".replace(/\$\$/, ch);
	add_state(id + '-forward', current);

	current = "${{ enigmatic.STEP_BACKWARD }}$".replace(/\$\$/, ch);

	for (let i = 0; i < wheels.length; ++i) {
		const wheel = state.wheels[i];
		const delta = c2i(wheels[i]) - wheel.ring + 1;
		ch = i2c(c2i(wheel.inv_mapping[i2c(c2i(ch) + delta)]) - delta);
        current += "${{ enigmatic.STEP_WHEEL }}$".replace(/\$1/, i + 1).replace(/\$2/, ch);
	}

    ch = state.plugboard.inv_mapping[ch];
    current += "${{ enigmatic.STEP_PLUGBOARD }}$".replace(/\$\$/, ch);
    current += "${{ enigmatic.STEP_OUTPUT }}$";
    add_state(id + '-backward', current);

    state.output += ch;

    const $btn = jQuery('#toggle-' + id);
    $btn.find('.flex-grow').text(header_text.replace(/\$2/, ch));
    $btn.on('click', (evt) => {
        toggleDiv('toggle-' + id, [id + '-wheels', id + '-forward', id + '-backward']);
        if (evt) { evt.preventDefault(); }
    });
    main_ids.push(id + '-toggler', id + '-wheels', id + '-forward', id + '-backward');
	return wheels;
}

function encode(input, wheels, state) {
	const $computation = jQuery('#rounds');
    while ($computation.next().attr('id') !== 'rounds-end') { $computation.next().remove(); }

    state.output = '';
    input = input.toUpperCase();
    wheels = wheels.toUpperCase();
    for (let i = 0; i < input.length; ++i) {
    	if (input[i] < 'A' || input[i] > 'Z') {
    		state.output += input[i];
		} else {
    		wheels = encode_round(i, input[i], wheels, state);
    	}
	}
	jQuery('#output').text(state.output);
}

exports.encode = encode;
