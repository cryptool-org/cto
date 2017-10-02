'use strict';

// do encoding

function add_state(prefix, name, ch, wheels) {
	const html = jQuery.parseHTML(
		"<li id='" + prefix + "'>" +
			"" + name + "" +
			"; ${{ enigmatic.INPUT }}$ == " + ch +
			"; ${{ enigmatic.WHEELS }}$ == " + wheels + "" +
		"</li>"
	);
	jQuery(html).insertBefore(jQuery('#rounds-end'));
}

function c2i(ch) { return ch.codePointAt(0) - 'A'.codePointAt(0); }
function i2c(i) { return String.fromCodePoint((i + 3 * 26) % 26 + 'A'.codePointAt(0)); }

function encode_round(pos, ch, wheels, state) {
	const id = 'enc-' + pos;
	const template = "${{ enigmatic.ENCODING_INPUT_CHAR }}$";
	const filled = template.replace(/\$\$/, pos);
	const header = jQuery.parseHTML(
		"<li id='" + id + "-toggler'>" +
        	"<a class='flex-container' id='toggle-" + id + "' href='#'>" +
	    	    "<span class='flex-grow'>" + filled + "</span>" +
    	    	"<span class='collapse glyphicon glyphicon-chevron-up'></span>" +
				"<span class='expand glyphicon glyphicon-chevron-down'></span>" +
        	"</a>" +
        "</li>"
	);
	jQuery(header).insertBefore(jQuery('#rounds-end'));
	add_state(id + '-entry', '${{ enigmatic.ENTRY_STATE }}$', ch, wheels);

	for (let i = wheels.length - 1; i >= 0; --i) {
		wheels = wheels.substr(0, i) + i2c(c2i(wheels[i]) + 1) + wheels.substr(i + 1);
		if (state.wheels[i].overflow.indexOf(wheels[i]) < 0) { break; }
	}

	add_state(id + '-after-advance', '${{ enigmatic.AFTER_ADVANCEMENT }}$', ch, wheels);

	ch = state.plugboard.mapping[ch];
	add_state(id + '-after-plugboard', '${{ enigmatic.AFTER_PLUGBOARD }}$', ch, wheels);

	for (let i = wheels.length - 1; i >= 0; --i) {
		const wheel = state.wheels[i];
		const delta = c2i(wheels[i]) - wheel.ring + 1;
		ch = i2c(c2i(wheel.mapping[i2c(c2i(ch) + delta)]) - delta);
		const template = '${{ enigmatic.AFTER_WHEEL }}$';
		const filled = template.replace(/\$\$/, '' + i);
		add_state(id + '-after-wheel-' + i, filled, ch, wheels);
	}

	ch = state.reflector.mapping[ch];
	add_state(id + '-after-reflector', '${{ enigmatic.AFTER_REFLECTOR }}$', ch, wheels);

	for (let i = 0; i < wheels.length; ++i) {
		const wheel = state.wheels[i];
		const delta = c2i(wheels[i]) - wheel.ring + 1;
		ch = i2c(c2i(wheel.inv_mapping[i2c(c2i(ch) + delta)]) - delta);
		const template = '${{ enigmatic.AFTER_WHEEL }}$';
		const filled = template.replace(/\$\$/, '' + i);
		add_state(id + '-after-re-wheel-' + i, filled, ch, wheels);
	}

    ch = state.plugboard.inv_mapping[ch];
    add_state(id + '-after-re-plugboard', '${{ enigmatic.AFTER_PLUGBOARD }}$', ch, wheels);

    state.output += ch;

	return wheels;
}

function encode(input, wheels, state) {
	const $computation = jQuery('#rounds');
    while ($computation.next().attr('id') !== 'rounds-end') { $computation.next().remove(); }

    state.output = '';
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
