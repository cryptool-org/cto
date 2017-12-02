'use strict';

// do encoding

function add_state(prefix, name, $parent) {
	const html = jQuery.parseHTML("<div>" + name + "</div>");
	jQuery(html).appendTo($parent);
}

function c2i(ch) { return ch.codePointAt(0) - 'A'.codePointAt(0); }
function i2c(i) { return String.fromCodePoint((i + 3 * 26) % 26 + 'A'.codePointAt(0)); }

function encode_round(pos, ch, wheels, state) {
	const id = 'enc-' + pos;
	const header_template = "${{ enigmatic.ENCODING_INPUT_CHAR }}$";
	const header_text = header_template.replace(/\$1/, ch).replace(/\$3/, pos);
	const panel = jQuery.parseHTML(
        "<div class='panel panel-default'>" +
            "<div class='panel-heading' data-toggle='collapse' data-target='#" + id + "-panel'>" +
                "<h4 class='panel-title'></h4>" +
            "</div>" +
            "<div id='" + id + "-panel' class='panel-collapse collapse'>" +
                "<div class='panel-body'>" +
                "</div>" +
            "</div>" +
        "</div>"
	);
	jQuery(panel).appendTo(jQuery('#rounds'));

    const $panel = jQuery('#' + id + '-panel');
    const $container = $panel.find('.panel-body');
	const orig_wheels = wheels;
	for (let i = wheels.length - 1; i >= 0; --i) {
		wheels = wheels.substr(0, i) + i2c(c2i(wheels[i]) + 1) + wheels.substr(i + 1);
		if (state.wheels[i].overflow.indexOf(wheels[i]) < 0) { break; }
	}
    const wheel_advancement_template = "${{ enigmatic.WHEEL_ADVANCEMENT }}$";
	const wheel_advancement = wheel_advancement_template.replace(/\$1/, orig_wheels).replace(/\$2/, wheels);
	add_state(id + '-wheels', wheel_advancement, $container);

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
	add_state(id + '-forward', current, $container);

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
    add_state(id + '-backward', current, $container);

    state.output += ch;

    $panel.parent().find('.panel-title').text(header_text.replace(/\$2/, ch));
	return wheels;
}

function encode(input, wheels, state) {
	const $computation = jQuery('#rounds-panel').find('.panel-body');
    $computation.empty();

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
