'use strict';

// create table DOM elements

var disables = {};
var disables_count = 0;

function resetDisables() {
	disables = {};
	disables_count = 0;
}

function addRound(round, $parent, $before, prefix, headerClasses, contentClasses) {
    if (! $parent) { return; }
	var $header = newTag('li', prefix + 'hdr', headerClasses);
	var $a = setTxt(newTag('a', prefix + 'hdr-a', 'collapsed'), 'Round ' + round);
	var $spn = newTag('span', null, 'icon');
	$a.appendChild($spn);
	$header.appendChild($a);
	$parent.insertBefore($header, $before);

	var $cell = newTag('li', prefix + 'cnt', contentClasses);
	$parent.insertBefore($cell, $before);
	var $div = newTag('div', null, 'card');
	var $container = newTag('ul');
	$div.appendChild($container);
	$cell.appendChild($div);
	$parent.insertBefore($cell, $before);

	$a.addEventListener('click', function(evt) {
		toggleDiv(prefix + 'hdr-a', prefix + 'cnt');
		if (evt) { evt.preventDefault(); }
	});

	return $container;
}

function addSubEntry(name, block, prefix, $container, key, colored) {
    if (! $container) { return; }
	var $li = setTxt(newTag('li'), name);
	var skip = false;
	if (key) {
		var $check = newTag('div', null, 'toggle');
		if (disables[key]) {
			skip = true;
		} else {
			dom.addClass($check, 'active');
		}
		appendChild($check, newTag('div', null, 'toggle-handle'));
		appendChild($li, $check);
		$check.addEventListener('click', function(evt) {
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
	$container.appendChild($li);
	if (!skip) {
		var $entry = newTag('li', null, 'referable');
		writeBytes($entry, block, prefix, true, colored);
		$container.appendChild($entry);
	}
}


// do encoding

function applyInput(block, state, prefix, prevPrefix, expandedKey) {
	_.each(block, function(val, i) {
		var idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + i]);
		if (prevPrefix == 'input-') {
			if (! disables['r-0-key']) {
				aes.addDependencies(idx, ['input-' + i, 'key-' + i, 'expanded-key-' + i]);
				aes.addCalculations(idx, [
					fb(val) + " = input[" + i + "] ⊕ key[" + i + "]"
				]);
			} else {
				aes.addDependencies(idx, 'input-' + i);
				aes.addCalculations(idx, fb(val) + " = input[" + i + "]");
			}
		} else if (prevPrefix == 'out-') {
			if (! disables['r-' + state.rounds + '-key']) {
				var j = state.rounds * block.length + i;
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
	return _.map(block, function(val, i) {
		var idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + i, 'sbox-' + val]);
		var res = sbox[val];
		aes.addCalculations(idx, fb(res) + " = S-Box[" + fb(val) + "]");
		return res;				
	});
}

function applyInvSBox(block, invsbox, prefix, prevPrefix) {
	return _.map(block, function(val, i) {
		var idx = prefix + i;
		var res = invsbox[val];
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
	return _.map(block, function(_, i) {
		var j = permute[i];
		var idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + j, 'permute-' + i]);
		aes.addCalculations(idx, [
			"i ← " + j + " = permute[" + i + "]",
			fb(block[j]) + " = block[i]"
		]);
		return block[j];
	});
}

function applyInvPermute(block, invpermute, prefix, prevPrefix) {
	return _.map(block, function(_, i) {
		var j = invpermute[i];
		var idx = prefix + i;
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
	if (f == 1) { return b; }
	var res = mult(f, b);
	aes.addCalculations(id, "s" + i + " ← " + fb(res) + " = " + fb(f) + " × " + fb(b));
	return res;
}

function singleMult(b0, b1, b2, b3, f0, f1, f2, f3, id) {
	var s0 = singleMultStep(b0, f0, 0, id);
	var s1 = singleMultStep(b1, f1, 1, id);
	var s2 = singleMultStep(b2, f2, 2, id);
	var s3 = singleMultStep(b3, f3, 3, id);

	var r0 = f0 == 1 ? fb(b0) : "s0";
	var r1 = f1 == 1 ? fb(b1) : "s1";
	var r2 = f2 == 1 ? fb(b2) : "s2";
	var r3 = f3 == 1 ? fb(b3) : "s3";

	var a = s0 ^ s1;
	var b = s2 ^ s3;
	var res = a ^ b;

	aes.addCalculations(id, [
		"a ← " + fb(a) + " = " + r0 + " ⊕ " + r1,
		"b ← " + fb(b) + " = " + r2 + " ⊕ " + r3,
		fb(res) + " = a ⊕ b"
	]);

	return res;
}

function applyMults(block, f0, f1, f2, f3, prefix, prevPrefix) {
	var l = block.length/4;
	for (var i = 0; i < l; ++i) {
		var j = 4 * i;
		var b0 = block[j];
		var b1 = block[j + 1];
		var b2 = block[j + 2];
		var b3 = block[j + 3];
		var m0 = singleMult(b0, b1, b2, b3, f0, f1, f2, f3, prefix + j);
		var m1 = singleMult(b0, b1, b2, b3, f3, f0, f1, f2, prefix + (j + 1));
		var m2 = singleMult(b0, b1, b2, b3, f2, f3, f0, f1, prefix + (j + 2));
		var m3 = singleMult(b0, b1, b2, b3, f1, f2, f3, f0, prefix + (j + 3));
		block[j] = m0;
		block[j + 1] = m1;
		block[j + 2] = m2;
		block[j + 3] = m3;
		var deps = _.map([j, j + 1, j + 2, j + 3], function(k) {
			return prevPrefix + k;
		});
		_.each(deps, function(_, k) { aes.addDependencies(prefix + (j + k), deps); });
	}
	return block;
}

function applySubkey(block, round, expandedKey, prefix, prevPrefix) {
	return _.map(block, function(_, i) {
		var idx = prefix + i;
		var j = block.length * round + i;
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
	return _.map(block, function(val, i) {
		var idx = prefix + i;
		aes.addDependencies(idx, [prevPrefix + i, keyPrefix + i]);
		var res = val ^ subkey[i];
		aes.addCalculations(idx, [
			fb(res) + " = " + fb(val) + " ⊕ " + fb(subkey[i])
		]);
		return res;
	});	
}

function encode(step, input, state, expandedKey) {
	var $computation = $('rounds');
	var $parent = $computation? $computation.parentNode : null;
    var $computation_end = $('rounds-end');

	if (! disables['s-' + step + '-r-0-key']) {
		var block = _.map(new Array(state.blockSize), function(_, i) {
			return input[i] ^ expandedKey[i];
		});
	} else {
		block = input;
	}
	var roundHeaderClasses;
	var roundContentClasses;
	if (dom.hasClass($('toggle-enc-rounds'), 'collapsed')) {
		roundHeaderClasses = 'hidden';
		roundContentClasses = ['hidden', 'hidden-2', 'sub'];
	} else {
		roundHeaderClasses = null;
		roundContentClasses = ['hidden', 'sub'];
	}

	var lastPrefix = 'input-';
	for (var round = 1; round <= state.rounds; ++round) {
		var rnd = 's-' + step + '-r-' + round;
		var $container = addRound(round, $parent, $computation_end, 's-' + step + '-r-enc-' + round + '-', roundHeaderClasses, roundContentClasses);

		var rndInput = rnd + '-input-';
		block = applyInput(block, state, rndInput, lastPrefix);
		addSubEntry('input to Round ' + round, block, rndInput, $container, null, state.colored);
		lastPrefix = rndInput;

		// sbox

		var sboxKey = rnd + '-sbox';
		if (! disables[sboxKey]) {
			var rndSBox = rnd + '-sbox-';
			block = applySBox(block, state.sbox, rndSBox, lastPrefix);
			lastPrefix = rndSBox;
		}
		addSubEntry('after S-Box:', block, rndSBox, $container, sboxKey, state.colored);

		// permute

		var permuteKey = rnd + '-permute';
		if (! disables[permuteKey]) {
			var rndPermute = rnd + '-permute-';
			block = applyPermute(block, state.permute, rndPermute, lastPrefix);
			lastPrefix = rndPermute;
		}
		addSubEntry('after permutation:', block, rndPermute, $container, permuteKey, state.colored);

		// mult

		if (round < state.rounds) {
			var multKey = rnd + '-mult';
			if (! disables[multKey]) {
				var rndMult = rnd + '-mult-';
				block = applyMults(block, 0x2, 0x3, 0x1, 0x1, rndMult, lastPrefix);
				lastPrefix = rndMult;
			}
			addSubEntry('after mult:', block, rndMult, $container, multKey, state.colored);
		}

		// mix key

		var rnd_subkey = rnd + '-subkey-';
		var key = applySubkey(block, round, expandedKey, rnd_subkey, lastPrefix);
		addSubEntry('used subkey:', key, rnd_subkey, $container, null, state.colored);

		var keyKey = rnd + '-key';
		if (! disables[keyKey]) {
			var rnd_key = rnd + '-key-';
			block = applyMixWithKey(block, key, rnd_key, lastPrefix, rnd_subkey);
			lastPrefix = rnd_key;
		}
		addSubEntry('after mix with key:', block, rnd_key, $container, keyKey, state.colored);
	}

	return block;
}


// do decoding

function decode(step, block, state, expandedKey) {
	var $computation = $('decode-rounds');
	var $computation_end = $('decode-rounds-end');
	var $parent = $computation ? $computation.parentNode : null;

	var dec = new Array(state.blockSize);

	var inv_permute = new Array(state.blockSize);
	var inv_sbox = new Array(256);

	_.each(state.permute, function(val, i) { inv_permute[val] = i; });
	_.each(state.sbox, function(val, i) { inv_sbox[val] = i; });

	if (! disables['s-' + step + '-r-' + state.rounds + '-key']) {
		dec = _.map(dec, function(_ ,i) {
			return block[i] ^ expandedKey[state.rounds * state.blockSize + i];
		});
	} else {
		dec = block;
	}
	var roundHeaderClasses;
	var roundContentClasses;
	if (dom.hasClass($('toggle-dec-rounds'), 'collapsed')) {
		roundHeaderClasses = 'hidden';
		roundContentClasses = ['hidden', 'hidden-2', 'sub'];
	} else {
		roundHeaderClasses = null;
		roundContentClasses = ['hidden', 'sub'];
	}
	var lastPrefix = 's-' + step + '-out-';
	for (var i = state.rounds - 1; i >= 0; --i) {
		var rnd = 's-' + step + '-d-' + (i + 1);
		var rrd = 's-' + step + '-r-' + (i + 1);
		var $container = addRound(i + 1, $parent, $computation_end, 's-' + step + '-r-dec-' + (i + 1) + '-', roundHeaderClasses, roundContentClasses);

		var rnd_input = rnd + '-input-';
		dec = applyInput(dec, state, rnd_input, lastPrefix, expandedKey);
		addSubEntry('input to Round ' + (i + 1), dec, rnd_input, $container, null, state.colored);
		lastPrefix = rnd_input;

		// permute

		var permuteKey = rrd + '-permute';
		if (! disables[permuteKey]) {
			var rnd_permute = rnd + '-permute-';
			dec = applyInvPermute(dec, inv_permute, rnd_permute, lastPrefix);
			lastPrefix = rnd_permute;
		}
		addSubEntry('after permute:', dec, rnd_permute, $container, permuteKey, state.colored);

		// sbox

		var sboxKey = rrd + '-sbox';
		if (! disables[sboxKey]) {
			var rnd_sbox = rnd + '-sbox-';
			dec = applyInvSBox(dec, inv_sbox, rnd_sbox, lastPrefix);
			lastPrefix = rnd_sbox;
		}
		addSubEntry('after S-Box:', dec, rnd_sbox, $container, sboxKey, state.colored);

		// mix with key

		var rnd_subkey = rnd + '-subkey-';
		var key = applySubkey(dec, i, expandedKey, rnd_subkey, lastPrefix);
		addSubEntry('used subkey:', key, rnd_subkey, $container, null, state.colored);

		var keyKey = 's-' + step + '-r-' + i + '-key';
		if (! disables[keyKey]) {
			var rnd_key = rnd + '-key-';
			dec = applyMixWithKey(dec, key, rnd_key, lastPrefix, rnd_subkey);
			lastPrefix = rnd_key;
		}
		addSubEntry('after mix with key:', dec, rnd_key, $container, keyKey, state.colored);

		// mult

		if (i > 0) {
			var multKey = 's-' + step + '-r-' + i + '-mult';
			if (! disables[multKey]) {
				var rndMult = rnd + '-mult-';
				dec = applyMults(dec, 0xe, 0xb, 0xd, 0x9, rndMult, lastPrefix);
				lastPrefix = rndMult;
			}
			addSubEntry('after mult:', dec, rndMult, $container, multKey, state.colored);
		}

	}

    return dec;
}

exports.encode = encode;
exports.decode = decode;
