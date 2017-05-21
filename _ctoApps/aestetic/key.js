'use strict';

function mult(a, b) {
	var result = 0;
	while (a != 0) {
		//noinspection JSBitwiseOperatorUsage
		if (a & 0x01) { result ^= b; }
		a >>= 1;
		//noinspection JSBitwiseOperatorUsage
		b = (b << 1) ^ (b & 0x80? 0x1b: 0x00);
	}
	return result & 0xff;
}


function expandKey(state) {
	var expandedKey = new Array((state.rounds + 1) * state.blockSize);

	_.each(state.key, function(key, i) {
		expandedKey[i] = key;
		var idx = 'expanded-key-' + i;
		aes.addDependencies(idx, 'key-' + i);
		aes.addCalculations(idx, "key[" + i + "]");
	});		

	var rcon = 1;
	var rconExp = 0;

	for (var i = state.key.length; i < expandedKey.length; i += 4) {
		for (var j = 0; j < 4; ++j) {
			var old = i - 4 + j;
			expandedKey[i + j] = expandedKey[old];
			var idx = 'expanded-key-' + (i + j);
			aes.addDependencies(idx, 'expanded-key-' + old);
			aes.addCalculations(idx,
				"cur ← " + fb(expandedKey[old]) + " = key[" + old + "]"
			);
		}

		if (i % state.key.length == 0) {
			var tempKey = expandedKey[i];
			for (j = 0; j < 3; ++j) {
				expandedKey[i + j] = expandedKey[i + j + 1]; 
			}
			expandedKey[i + 3] = tempKey;
			aes.rotateDependencies('expanded-key-', i, i + 4);
			for (j = 0; j < 4; ++j) {
				idx = i + j;
				var jdx = 'expanded-key-' + idx;
				aes.addDependencies(jdx, 'sbox-' + expandedKey[idx]);
				expandedKey[idx] = state.sbox[expandedKey[idx]]; 
				aes.addCalculations(jdx,
					"cur ← " + fb(expandedKey[idx]) + " = S-Box[cur]"
				);
			}

			aes.addCalculations('expanded-key-' + i,
				"rcon ← " + fb(rcon) + " = 0x02 ^ " + rconExp
			);
			expandedKey[i] ^= rcon;
			aes.addCalculations('expanded-key-' + i,
				"cur ← " + fb(expandedKey[i]) + " = cur ⊕ rcon"
			);
			rcon = mult(rcon, 2);
			++rconExp;
		} else if (state.key.length > 24 && i % state.key.length == 16) {
			for (j = 0; j < 4; ++j) {
				idx = i + j;
				jdx = 'expanded-key-' + idx;
				aes.addDependencies(jdx, 'sbox-' + expandedKey[idx]);
				expandedKey[idx] = state.sbox[expandedKey[idx]]; 
				aes.addCalculations(jdx,
					"cur ← " + fb(expandedKey[idx]) + " = S-Box[cur]"
				);
			}
		}

		for (j = 0; j < 4; ++j) {
			idx = i + j;
			old = idx - state.key.length;
			jdx = 'expanded-key-' + idx;
			expandedKey[idx] ^= expandedKey[old];
			aes.addDependencies(jdx, 'expanded-key-' + old);
			aes.addCalculations(jdx, [
				"old ← " + fb(expandedKey[old]) + " = key[" + old + "]",
				fb(expandedKey[idx]) + " = cur ⊕ old"
			]);
		}
	}

	return expandedKey;
}

exports.mult = mult;
exports.expandKey = expandKey;
