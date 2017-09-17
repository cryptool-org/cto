'use strict';

// do encoding

function add_state(prefix, name, ch, wheels) {
	const html = jQuery.parseHTML(
		"<li id='" + prefix + "'>" +
			"" + name + "" +
			"; Input == " + ch +
			"; Wheels == " + wheels + "" +
		"</li>"
	);
	jQuery(html).insertBefore(jQuery('#rounds-end'));
}

function c2i(ch) { return ch.codePointAt(0) - 'A'.codePointAt(0); }
function i2c(i) { return String.fromCodePoint((i + 3 * 26) % 26 + 'A'.codePointAt(0)); }

function encode_round(pos, ch, wheels, state) {
	const id = 'enc-' + pos;
	const header = jQuery.parseHTML(
		"<li id='" + id + "-toggler'>" +
        	"<a class='flex-container' id='toggle-" + id + "' href='#'>" +
	    	    "<span class='flex-grow'>Encoding Input character " + pos + "</span>" +
    	    	"<span class='collapse glyphicon glyphicon-chevron-up'></span>" +
				"<span class='expand glyphicon glyphicon-chevron-down'></span>" +
        	"</a>" +
        "</li>"
	);
	jQuery(header).insertBefore(jQuery('#rounds-end'));
	add_state(id + '-entry', 'Entry State', ch, wheels);

	for (let i = wheels.length - 1; i >= 0; --i) {
		wheels = wheels.substr(0, i) + i2c(c2i(wheels[i]) + 1) + wheels.substr(i + 1);
		if (state.wheels[i].overflow.indexOf(wheels[i]) < 0) { break; }
	}

	add_state(id + '-after-advance', 'After Advancement', ch, wheels);

	ch = state.plugboard.mapping[ch];
	add_state(id + '-after-plugboard', 'After Plugboard', ch, wheels);

	for (let i = wheels.length - 1; i >= 0; --i) {
		const wheel = state.wheels[i];
		const delta = c2i(wheels[i]) - wheel.ring + 1;
		ch = i2c(c2i(wheel.mapping[i2c(c2i(ch) + delta)]) - delta);
		add_state(id + '-after-wheel-' + i, 'After Wheel ' + i, ch, wheels);
	}

	ch = state.reflector.mapping[ch];
	add_state(id + '-after-reflector', 'After Reflector', ch, wheels);

	for (let i = 0; i < wheels.length; ++i) {
		const wheel = state.wheels[i];
		const delta = c2i(wheels[i]) - wheel.ring + 1;
		ch = i2c(c2i(wheel.inv_mapping[i2c(c2i(ch) + delta)]) - delta);
		add_state(id + '-after-re-wheel-' + i, 'After Wheel ' + i, ch, wheels);
	}

    ch = state.plugboard.inv_mapping[ch];
    add_state(id + '-after-re-plugboard', 'After Plugboard', ch, wheels);

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
