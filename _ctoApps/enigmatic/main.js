'use strict';

let refresh;

jQuery(function () {

	const state = {
		'sbox': defaults.sbox.slice(),
		'permute': defaults.permute.slice(),
		'key': testcases[0].key.slice(),
		'input': testcases[0].input.slice(),
		'rounds': testcases[0].rounds,
		'blockSize': defaults.blockSize,
		'chaining': testcases[0].chaining,
        'iv': testcases[0].iv ? testcases[0].iv.slice() : null
	};

// handle state

	let is_rijndael = false;
	let is_aes128 = false;
	let is_aes192 = false;
	let is_aes256 = false;
	let usedTestcase = null;

	function checkForKnownConfigurations() {
		is_rijndael = false;
		is_aes128 = false;
		is_aes192 = false;
		is_aes256 = false;
		usedTestcase = null;

		if (disables_count === 0 && _.equals(state.sbox, defaults.sbox) && _.equals(state.permute, defaults.permute)) {
			switch (state.key.length) {
				case 16:
					if (state.rounds >= std_rounds.minRijndael16 && state.rounds <= std_rounds.maxRijndael) {
						is_rijndael = true;
						is_aes128 = (state.rounds === std_rounds.aes128);
					}
					break;
				case 20:
					if (state.rounds >= std_rounds.minRijndael20 && state.rounds <= std_rounds.maxRijndael) {
						is_rijndael = true;
					}
					break;
				case 24:
					if (state.rounds >= std_rounds.minRijndael24 && state.rounds <= std_rounds.maxRijndael) {
						is_rijndael = true;
						is_aes192 = (state.rounds === std_rounds.aes192);
					}
					break;
				case 28:
					if (state.rounds >= std_rounds.minRijndael28 && state.rounds <= std_rounds.maxRijndael) {
						is_rijndael = true;
					}
					break;
				case 32:
					if (state.rounds === std_rounds.aes256) {
						is_rijndael = true;
						is_aes256 = true;

					}
					break;
			}

			if (is_aes256 || is_aes192 || is_aes128) {
				for (let i = 0; i < testcases.length; ++i) {
					const tc = testcases[i];
					const isTestcaseKey = _.equals(state.key, tc.key);
					const isTestcaseInput = _.equals(state.input, tc.input);
                    const isTestcaseChaining = state.chaining === tc.chaining;
                    const currentIV = state.iv ? state.iv : new Array(state.blockSize);
                    const testcaseIV = tc.iv ? tc.iv : new Array(state.blockSize);
                    const isTestcaseIV = _.equals(currentIV, testcaseIV);
					if (state.rounds === tc.rounds && isTestcaseKey && isTestcaseInput && isTestcaseChaining && isTestcaseIV) {
						usedTestcase = tc;
					}
				}
			}
		}		
		const $badge = jQuery('#badge');
		dom.setClass($badge, 'badge-aes256', is_aes256);
		dom.setClass($badge, 'badge-aes192', is_aes192);
		dom.setClass($badge, 'badge-aes128', is_aes128);
		dom.setClass($badge, 'badge-rijndael', is_rijndael && !(is_aes256 || is_aes192 || is_aes128));
		dom.setClass($badge, 'badge-unknown', !is_rijndael);
	}

	function refreshState() {
		setTxt(jQuery('#rounds-label'), state.rounds);
		dom.setClass(jQuery('#dec-rounds'), 'disabled', state.rounds <= 1);

		writeBytes(jQuery('#sbox'), state.sbox, 'sbox-', false, state.colored);
		writeBytes(jQuery('#permute'), state.permute, 'permute-', false, state.colored);
        if (! state.iv) { state.iv = new Array(state.blockSize); }
        writeBytes(jQuery('#iv'), state.iv, 'iv-', false, state.colored);
		writeBytes(jQuery('#key'), state.key, 'key-', false, state.colored);
		writeBytes(jQuery('#input'), state.input, 'input-', false, state.colored);

		checkForKnownConfigurations();

		dom.setClass(jQuery('#reference'), 'hidden', usedTestcase === null);
		const referenceBytes = jQuery('#reference-bytes');
		dom.setClass(referenceBytes, 'hidden', usedTestcase === null);
		if (usedTestcase) {
			writeBytes(referenceBytes, usedTestcase.encoded, false, state.colored);
		}

        dom.setClass(jQuery('#chaining-none'), 'active', state.chaining === Chaining.None);
        dom.setClass(jQuery('#chaining-cbc'), 'active', state.chaining === Chaining.CBC);
        dom.setClass(jQuery('#chaining-ecb'), 'active', state.chaining === Chaining.ECB);
	}


// test vector handling

	function updateTestvectors() {
		const $container = jQuery('#testvectors-container');
		removeChilds($container);
		_.each(testcases, (testcase) => {
			const $li = newTag('li');
			const $a = newTag('a');
			setTxt($a, testcase.name);
			$li.append($a);
			$container.append(jQuery($li));
			$a.on('click', (evt) => {
				state.sbox = defaults.sbox.slice();
				state.permute = defaults.permute.slice();
				state.key = testcase.key.slice();
				state.input = testcase.input.slice();
				state.rounds = testcase.rounds;
				state.blockSize = defaults.blockSize;
				state.colored = testcase.colored;
				state.chaining = testcase.chaining;
                state.iv = testcase.iv ? testcase.iv.slice() : null;
				resetDisables();
				refresh();
				evt.preventDefault();
			});
		});
	}




// recalculate fields

	refresh = function() {
		aes.resetDependencies();
		aes.relayout();
		refreshState();
		updateTestvectors();
		const expandedKey = expandKey(state);
		writeBytes(jQuery('#expanded-key'), expandedKey, 'expanded-key-', true, state.colored);
		const encoded = encode_chain(state, expandedKey);
		decode_chain(encoded, state, expandedKey);
		updateCollapseState();
		aes.refreshTappedCell();
	};

	refresh();


// toggle collapse/expand


	function addToggleDiv(a, divs) {
		jQuery('#' + a).on('click', (evt) => {
            toggleDiv(a, divs);
			if (evt) { evt.preventDefault(); }
		});
	}

	addToggleDiv('toggle-configuration', [
		'testvectors-toggler', 'testvectors', 'rounds-toggler', 'sbox-toggler', 'sbox', 'permute-toggler', 'permute', 'chain-selector', 'iv-toggler', 'iv'
	]);
	addToggleDiv('toggle-testvectors', ['testvectors']);
	addToggleDiv('toggle-sbox', ['sbox']);
	addToggleDiv('toggle-permute', ['permute']);
    addToggleDiv('toggle-iv', ['iv']);

	addToggleDiv('toggle-key', ['key', 'expanded-key-toggler', 'expanded-key']);
	addToggleDiv('toggle-expanded-key', ['expanded-key']);

	addToggleDiv('toggle-input', ['input']);

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
		});
	}

	setRoundsToggle('toggle-enc-rounds', 'r-enc-');
	setRoundsToggle('toggle-dec-rounds', 'r-dec-');

	addToggleDiv('toggle-encoded', ['output']);
	addToggleDiv('toggle-reference', ['reference-bytes']);
	addToggleDiv('toggle-decoded', ['decoded']);

// change round count

	function addChangeRounds(a, delta) {
		jQuery('#' + a).on('click', (evt) => {
			const newRounds = state.rounds + delta;
			if (newRounds > 0) {
				state.rounds = newRounds;
				refresh();
			}
			evt.preventDefault();
		});
	}

	addChangeRounds('inc-rounds', 1);
	addChangeRounds('dec-rounds', -1);


// update parameters

	function updateBytes(message, bytes, validator) {
		let current = '';
		_.each(bytes, (byte) => {
			current += formatByte(byte);			
		});
		txt.show(message, bytes, (result) => {
			if (validator(result, bytes)) {
				while (bytes.length > result.length) { bytes.pop(); }
				for (let i = 0; i < bytes.length; ++i) { bytes[i] = result[i]; }
				for (let i = bytes.length; i < result.length; ++i) { bytes.push(result[i]); }
				refresh();
				return true;
			} else {
				alert("${{ enigmatic.INVALID_BYTE_SEQUENCE }}$");
				return false;
			}
		});
	}

	function addUpdateBytes(elm, message, bytes, validator) {
		jQuery('#' + elm).on('click', (evt) => {
			updateBytes(message, state[bytes], validator);
			evt.preventDefault();
		});
	}

	function validKeyLength(newArray) {
		return newArray.length >= 4;
	}

	addUpdateBytes('key', '${{ enigmatic.CHANGE_KEY }}$', 'key', validKeyLength);

	function sameLength(newArray, oldArray) { return newArray.length === oldArray.length; }

    function validInputLength(newArray) {
        if (state.chaining === Chaining.None) {
            return newArray.length === state.blockSize;
        } else {
            return true;
        }
    }

	addUpdateBytes('sbox', '${{ enigmatic.CHANGE_SBOX }}$', 'sbox', sameLength);
	addUpdateBytes('permute', '${{ enigmatic.CHANGE_PERMUTATION }}$', 'permute', sameLength);
    addUpdateBytes('iv', '${{ enigmatic.CHANGE_IV }}$', 'iv', sameLength);
	addUpdateBytes('input', '${{ enigmatic.CHANGE_INPUT }}$', 'input', validInputLength);

    jQuery('#chaining-none').on('click', (evt) => {
        if (state.blockSize !== state.input.length) {
            alert("${{ enigmatic.INPUT_WRONG_LEN }}$".replace("##", state.blockSize))
            return;
        }
        state.chaining = Chaining.None;
        refresh();
        evt.preventDefault();
    });
    jQuery('#chaining-cbc').on('click', (evt) => {
        state.chaining = Chaining.CBC;
        refresh();
        evt.preventDefault();
    });
    jQuery('#chaining-ecb').on('click', (evt) => {
        state.chaining = Chaining.ECB;
        refresh();
        evt.preventDefault();
    });
});