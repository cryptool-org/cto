'use strict';

// create table DOM elements

let disables = {};
let disables_count = 0;

function resetDisables() {
	disables = {};
	disables_count = 0;
}

function addRound(round, $parent, $before, prefix, headerClasses, contentClasses) {
    if (! $parent) { return; }
	const $header = newTag('li', prefix + 'hdr', headerClasses);
	const $a = newTag('a', prefix + 'hdr-a', ['collapsed', 'flex-container']);
	const $label = setTxt(newTag('span', null, 'flex-grow'), '${{ enigmatic.ROUND }}$ ' + round);
	$a.append($label);
	$a.append(newTag('span', null, ['collapse', 'glyphicon', 'glyphicon-chevron-up']));
    $a.append(newTag('span', null, ['expand', 'glyphicon', 'glyphicon-chevron-down']));
	$header.append($a);
	$header.insertBefore($before);

	const $cell = newTag('li', prefix + 'cnt', contentClasses);
	$cell.insertBefore($before);
	const $div = newTag('div', null, 'card');
	const $container = newTag('ul');
	$div.append($container);
	$cell.append($div);
	$cell.insertBefore($before);

	$a.on('click', (evt) => {
		toggleDiv(prefix + 'hdr-a', prefix + 'cnt');
		if (evt) { evt.preventDefault(); }
	});

	return $container;
}

function addSubEntry(name, block, prefix, $container, key, colored) {
    if (! $container) { return; }
	const $li = setTxt(newTag('li'), name);
	let skip = false;
	if (key) {
		const $check = newTag('div', null, 'toggle');
		if (disables[key]) {
			skip = true;
		} else {
			dom.addClass($check, 'active');
		}
		appendChild($check, newTag('div', null, 'toggle-handle'));
		appendChild($li, $check);
		$check.on('click', (evt) => {
			if (disables[key]) {
				disables[key] = false;
				--disables_count;
			} else {
				disables[key] = true;
				++disables_count;
			}
			refresh();
			evt.preventDefault();
		});
	}
	$container.append($li);
	if (!skip) {
		const $entry = newTag('li', null, 'referable');
		writeBytes($entry, block, prefix, true, colored);
		$container.append($entry);
	}
}


// do encoding

function applyInput(block, state, prefix, prevPrefix, expandedKey) {
	_.each(block, (val, i) => {
		const idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + i]);
		if (prevPrefix === 'input-') {
			if (! disables['r-0-key']) {
				aes.addDependencies(idx, ['input-' + i, 'key-' + i, 'expanded-key-' + i]);
				aes.addCalculations(idx, [
					fb(val) + " = input[" + i + "] ⊕ key[" + i + "]"
				]);
			} else {
				aes.addDependencies(idx, 'input-' + i);
				aes.addCalculations(idx, fb(val) + " = input[" + i + "]");
			}
		} else if (prevPrefix === 'out-') {
			if (! disables['r-' + state.rounds + '-key']) {
				const j = state.rounds * block.length + i;
				aes.addDependencies(idx, ['out-' + i, 'key-' + i, 'expanded-key-' + i]);
				aes.addCalculations(idx, [
					"bs ← " + block.length,
					"rounds ← " + state.rounds,
					"i ← " + i,
					"j ← " + j + " = bs × round + i",
					fb(expandedKey[j]) + " = key[j]",
					fb(val) + " = out[i] ⊕ key[j]"
				]);
			} else {
				aes.addDependencies(idx, 'out-' + i);
				aes.addCalculations(idx, fb(val) + " = out[" + i + "]");
			}
		} else {
			aes.addCalculations(idx, "block[" + i + "]");
		}
	});	
	return block;	
}

function applySBox(block, sbox, prefix, prevPrefix) {
	return _.map(block, (val, i) => {
		const idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + i, 'sbox-' + val]);
		const res = sbox[val];
		aes.addCalculations(idx, fb(res) + " = S-Box[" + fb(val) + "]");
		return res;				
	});
}

function applyInvSBox(block, invsbox, prefix, prevPrefix) {
	return _.map(block, (val, i) => {
		const idx = prefix + i;
		const res = invsbox[val];
		aes.addDependencies(idx, [prevPrefix + i, 'sbox-' + res]);
		aes.addCalculations(idx, [
			fb(val) + " = S-Box[i]",
			"⇒ i = " + fb(res),
			"i"
		]);
		return res;				
	});
}

function applyPermute(block, permute, prefix, prevPrefix) {
	return _.map(block, (_, i) => {
		const j = permute[i];
		const idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + j, 'permute-' + i]);
		aes.addCalculations(idx, [
			"i ← " + j + " = permute[" + i + "]",
			fb(block[j]) + " = block[i]"
		]);
		return block[j];
	});
}

function applyInvPermute(block, invpermute, prefix, prevPrefix) {
	return _.map(block, (_, i) => {
		const j = invpermute[i];
		const idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + j, 'permute-' + j]);
		aes.addCalculations(idx, [
			i + " = permute[i]",
			"⇒ i = " + j,
			fb(block[j]) + " = block[i]"
		]);
		return block[j];
	});
}

function singleMultStep(b, f, i, id) {
	if (f === 1) { return b; }
	const res = mult(f, b);
	aes.addCalculations(id, "s" + i + " ← " + fb(res) + " = " + fb(f) + " × " + fb(b));
	return res;
}

function singleMult(b0, b1, b2, b3, f0, f1, f2, f3, id) {
	const s0 = singleMultStep(b0, f0, 0, id);
	const s1 = singleMultStep(b1, f1, 1, id);
	const s2 = singleMultStep(b2, f2, 2, id);
	const s3 = singleMultStep(b3, f3, 3, id);

	const r0 = f0 === 1 ? fb(b0) : "s0";
	const r1 = f1 === 1 ? fb(b1) : "s1";
	const r2 = f2 === 1 ? fb(b2) : "s2";
	const r3 = f3 === 1 ? fb(b3) : "s3";

	const a = s0 ^ s1;
	const b = s2 ^ s3;
	const res = a ^ b;

	aes.addCalculations(id, [
		"a ← " + fb(a) + " = " + r0 + " ⊕ " + r1,
		"b ← " + fb(b) + " = " + r2 + " ⊕ " + r3,
		fb(res) + " = a ⊕ b"
	]);

	return res;
}

function applyMults(block, f0, f1, f2, f3, prefix, prevPrefix) {
	const l = block.length/4;
	for (let i = 0; i < l; ++i) {
		const j = 4 * i;
		const b0 = block[j];
		const b1 = block[j + 1];
		const b2 = block[j + 2];
		const b3 = block[j + 3];
		const m0 = singleMult(b0, b1, b2, b3, f0, f1, f2, f3, prefix + j);
		const m1 = singleMult(b0, b1, b2, b3, f3, f0, f1, f2, prefix + (j + 1));
		const m2 = singleMult(b0, b1, b2, b3, f2, f3, f0, f1, prefix + (j + 2));
		const m3 = singleMult(b0, b1, b2, b3, f1, f2, f3, f0, prefix + (j + 3));
		block[j] = m0;
		block[j + 1] = m1;
		block[j + 2] = m2;
		block[j + 3] = m3;
		const deps = _.map([j, j + 1, j + 2, j + 3], (k) => {
			return prevPrefix + k;
		});
		_.each(deps, (_, k) => { aes.addDependencies(prefix + (j + k), deps); });
	}
	return block;
}

function applySubkey(block, round, expandedKey, prefix, prevPrefix) {
	return _.map(block, (_, i) => {
		const idx = prefix + i;
		const j = block.length * round + i;
		aes.addDependencies(idx, 'expanded-key-' + j, prevPrefix + i);
		aes.addCalculations(idx, [
			"bs ← " + block.length,
			"round ← " + round,
			"i ← " + i,
			"j ← " + j + " = bs × round + i",
			fb(expandedKey[j]) + " = key[j]"
		]);
		return expandedKey[j];
	});
}

function applyMixWithKey(block, subkey, prefix, prevPrefix, keyPrefix) {
	return _.map(block, (val, i) => {
		const idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + i, keyPrefix + i]);
		const res = val ^ subkey[i];
		aes.addCalculations(idx, [
			fb(res) + " = " + fb(val) + " ⊕ " + fb(subkey[i])
		]);
		return res;
	});	
}

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


// do decoding

function decode(step, block, state, expandedKey) {
	const $computation = jQuery('#decode-rounds');
	const $computation_end = jQuery('#decode-rounds-end');
	const $parent = $computation ? $computation.parent() : null;

	let dec = new Array(state.blockSize);

	const inv_permute = new Array(state.blockSize);
	const inv_sbox = new Array(256);

	_.each(state.permute, (val, i) => { inv_permute[val] = i; });
	_.each(state.sbox, (val, i) => { inv_sbox[val] = i; });

	if (! disables['s-' + step + '-r-' + state.rounds + '-key']) {
		dec = _.map(dec, (_, i) => {
			return block[i] ^ expandedKey[state.rounds * state.blockSize + i];
		});
	} else {
		dec = block;
	}
	let roundHeaderClasses;
	let roundContentClasses;
	if (dom.hasClass(jQuery('#toggle-dec-rounds'), 'collapsed')) {
		roundHeaderClasses = 'hidden';
		roundContentClasses = ['hidden', 'hidden-2', 'sub'];
	} else {
		roundHeaderClasses = null;
		roundContentClasses = ['hidden', 'sub'];
	}
	let lastPrefix = 's-' + step + '-out-';
	for (let i = state.rounds - 1; i >= 0; --i) {
		const rnd = 's-' + step + '-d-' + (i + 1);
		const rrd = 's-' + step + '-r-' + (i + 1);
		const $container = addRound(i + 1, $parent, $computation_end, 's-' + step + '-r-dec-' + (i + 1) + '-', roundHeaderClasses, roundContentClasses);

		const rnd_input = rnd + '-input-';
		dec = applyInput(dec, state, rnd_input, lastPrefix, expandedKey);
		addSubEntry('${{ enigmatic.INPUT_TO_ROUND }}$ ' + (i + 1), dec, rnd_input, $container, null, state.colored);
		lastPrefix = rnd_input;

		// permute

		const permuteKey = rrd + '-permute';
        const rnd_permute = rnd + '-permute-';
		if (! disables[permuteKey]) {
			dec = applyInvPermute(dec, inv_permute, rnd_permute, lastPrefix);
			lastPrefix = rnd_permute;
		}
		addSubEntry('${{ enigmatic.AFTER_PERMUTATION }}$', dec, rnd_permute, $container, permuteKey, state.colored);

		// sbox

		const sboxKey = rrd + '-sbox';
        const rnd_sbox = rnd + '-sbox-';
		if (! disables[sboxKey]) {
			dec = applyInvSBox(dec, inv_sbox, rnd_sbox, lastPrefix);
			lastPrefix = rnd_sbox;
		}
		addSubEntry('${{ enigmatic.AFTER_SBOX }}$', dec, rnd_sbox, $container, sboxKey, state.colored);

		// mix with key

		const rnd_subkey = rnd + '-subkey-';
		const key = applySubkey(dec, i, expandedKey, rnd_subkey, lastPrefix);
		addSubEntry('${{ enigmatic.USED_SUBKEY }}$', key, rnd_subkey, $container, null, state.colored);

		const keyKey = 's-' + step + '-r-' + i + '-key';
        const rnd_key = rnd + '-key-';
		if (! disables[keyKey]) {
			dec = applyMixWithKey(dec, key, rnd_key, lastPrefix, rnd_subkey);
			lastPrefix = rnd_key;
		}
		addSubEntry('${{ enigmatic.AFTER_MIX_WITH_KEY }}$', dec, rnd_key, $container, keyKey, state.colored);

		// mult

		if (i > 0) {
			const multKey = 's-' + step + '-r-' + i + '-mult';
            const rndMult = rnd + '-mult-';
			if (! disables[multKey]) {
				dec = applyMults(dec, 0xe, 0xb, 0xd, 0x9, rndMult, lastPrefix);
				lastPrefix = rndMult;
			}
			addSubEntry('${{ enigmatic.AFTER_MULT }}$', dec, rndMult, $container, multKey, state.colored);
		}

	}

    return dec;
}

exports.encode = encode;
exports.decode = decode;
