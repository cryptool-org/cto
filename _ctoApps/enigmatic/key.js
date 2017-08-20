'use strict';

function mult(a, b) {
	let result = 0;
	while (a !== 0) {
		//noinspection JSBitwiseOperatorUsage
		if (a & 0x01) { result ^= b; }
		a >>= 1;
		//noinspection JSBitwiseOperatorUsage
		b = (b << 1) ^ (b & 0x80? 0x1b: 0x00);
	}
	return result & 0xff;
}


function expandKey(state) {
	const expandedKey = new Array((state.rounds + 1) * state.blockSize);

	_.each(state.key, (key, i) => {
		expandedKey[i] = key;
		const idx = '#expanded-key-' + i;
		aes.addDependencies(idx, '#key-' + i);
		aes.addCalculations(idx, "key[" + i + "]");
	});		

	let rcon = 1;
	let rconExp = 0;

	for (let i = state.key.length; i < expandedKey.length; i += 4) {
		for (let j = 0; j < 4; ++j) {
			const old = i - 4 + j;
			expandedKey[i + j] = expandedKey[old];
			const idx = '#expanded-key-' + (i + j);
			aes.addDependencies(idx, '#expanded-key-' + old);
			aes.addCalculations(idx,
				"cur ← " + fb(expandedKey[old]) + " = key[" + old + "]"
			);
		}

		if (i % state.key.length === 0) {
			const tempKey = expandedKey[i];
			for (let j = 0; j < 3; ++j) {
				expandedKey[i + j] = expandedKey[i + j + 1]; 
			}
			expandedKey[i + 3] = tempKey;
			aes.rotateDependencies('#expanded-key-', i, i + 4);
			for (let j = 0; j < 4; ++j) {
				const idx = i + j;
				const jdx = '#expanded-key-' + idx;
				aes.addDependencies(jdx, 'sbox-' + expandedKey[idx]);
				expandedKey[idx] = state.sbox[expandedKey[idx]]; 
				aes.addCalculations(jdx,
					"cur ← " + fb(expandedKey[idx]) + " = S-Box[cur]"
				);
			}

			aes.addCalculations('#expanded-key-' + i,
				"rcon ← " + fb(rcon) + " = 0x02 ^ " + rconExp
			);
			expandedKey[i] ^= rcon;
			aes.addCalculations('#expanded-key-' + i,
				"cur ← " + fb(expandedKey[i]) + " = cur ⊕ rcon"
			);
			rcon = mult(rcon, 2);
			++rconExp;
		} else if (state.key.length > 24 && i % state.key.length === 16) {
			for (let j = 0; j < 4; ++j) {
				const idx = i + j;
				const jdx = '#expanded-key-' + idx;
				aes.addDependencies(jdx, 'sbox-' + expandedKey[idx]);
				expandedKey[idx] = state.sbox[expandedKey[idx]]; 
				aes.addCalculations(jdx,
					"cur ← " + fb(expandedKey[idx]) + " = S-Box[cur]"
				);
			}
		}

		for (let j = 0; j < 4; ++j) {
			const idx = i + j;
			const old = idx - state.key.length;
			const jdx = '#expanded-key-' + idx;
			expandedKey[idx] ^= expandedKey[old];
			aes.addDependencies(jdx, '#expanded-key-' + old);
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
