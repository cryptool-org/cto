'use strict';

var refresh;

window.addEventListener('load', function () {

	var state = {
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

	var is_rijndael = false;
	var is_aes128 = false;
	var is_aes192 = false;
	var is_aes256 = false;
	var usedTestcase = null;

	function checkForKnownConfigurations() {
		is_rijndael = false;
		is_aes128 = false;
		is_aes192 = false;
		is_aes256 = false;
		usedTestcase = null;

		if (disables_count == 0 && _.equals(state.sbox, defaults.sbox) && _.equals(state.permute, defaults.permute)) {
			switch (state.key.length) {
				case 16:
					if (state.rounds >= std_rounds.minRijndael16 && state.rounds <= std_rounds.maxRijndael) {
						is_rijndael = true;
						is_aes128 = (state.rounds == std_rounds.aes128);
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
						is_aes192 = (state.rounds == std_rounds.aes192);
					}
					break;
				case 28:
					if (state.rounds >= std_rounds.minRijndael28 && state.rounds <= std_rounds.maxRijndael) {
						is_rijndael = true;
					}
					break;
				case 32:
					if (state.rounds == std_rounds.aes256) {
						is_rijndael = true;
						is_aes256 = true;

					}
					break;
			}

			if (is_aes256 || is_aes192 || is_aes128) {
				for (var i = 0; i < testcases.length; ++i) {
					var tc = testcases[i];
					var isTestcaseKey = _.equals(state.key, tc.key);
					var isTestcaseInput = _.equals(state.input, tc.input);
                    var isTestcaseChaining = state.chaining == tc.chaining;
                    var currentIV = state.iv ? state.iv : new Array(state.blockSize);
                    var testcaseIV = tc.iv ? tc.iv : new Array(state.blockSize);
                    var isTestcaseIV = _.equals(currentIV, testcaseIV);
					if (state.rounds == tc.rounds && isTestcaseKey && isTestcaseInput && isTestcaseChaining && isTestcaseIV) {
						usedTestcase = tc;
					}
				}
			}
		}		
		var $badge = $('badge');
		dom.setClass($badge, 'badge-aes256', is_aes256);
		dom.setClass($badge, 'badge-aes192', is_aes192);
		dom.setClass($badge, 'badge-aes128', is_aes128);
		dom.setClass($badge, 'badge-rijndael', is_rijndael && !(is_aes256 || is_aes192 || is_aes128));
		dom.setClass($badge, 'badge-unknown', !is_rijndael);
	}

	function refreshState() {
		setTxt($('rounds-label'), state.rounds);
		dom.setClass($('dec-rounds'), 'disabled', state.rounds <= 1);

		writeBytes($('sbox'), state.sbox, 'sbox-', false, state.colored);
		writeBytes($('permute'), state.permute, 'permute-', false, state.colored);
        if (! state.iv) { state.iv = new Array(state.blockSize); }
        writeBytes($('iv'), state.iv, 'iv-', false, state.colored);
		writeBytes($('key'), state.key, 'key-', false, state.colored);
		writeBytes($('input'), state.input, 'input-', false, state.colored);

		checkForKnownConfigurations();

		dom.setClass($('reference'), 'hidden', usedTestcase == null);
		var referenceBytes = $('reference-bytes');
		dom.setClass(referenceBytes, 'hidden', usedTestcase == null);
		if (usedTestcase) {
			writeBytes(referenceBytes, usedTestcase.encoded, false, state.colored);
		}

        dom.setClass($('chaining-none'), 'active', state.chaining == Chaining.None);
        dom.setClass($('chaining-cbc'), 'active', state.chaining == Chaining.CBC);
        dom.setClass($('chaining-ecb'), 'active', state.chaining == Chaining.ECB);
	}


// test vector handling

	function updateTestvectors() {
		var $container = $('testvectors-container');
		removeChilds($container);
		_.each(testcases, function(testcase) {
			var $li = newTag('li');
			var $a = newTag('a');
			setTxt($a, testcase.name);
			$li.appendChild($a);
			$container.appendChild($li);
			$a.addEventListener('click', function(evt) {
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
		var expandedKey = expandKey(state);
		writeBytes($('expanded-key'), expandedKey, 'expanded-key-', true, state.colored);
		var encoded = encode_chain(state, expandedKey);
		decode_chain(encoded, state, expandedKey);
		updateCollapseState();
		aes.refreshTappedCell();
	};

	refresh();


// toggle collapse/expand


	function addToggleDiv(a, divs) {
		$(a).addEventListener('click', function(evt) {
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
		var $a = $(a);
		$a.addEventListener('click', function(evt) {
            var divs = [];
            var steps = state.chaining == Chaining.None ? 1 : state.input.length / state.blockSize + 1;
            for (var j = 0; j < steps; ++j) {
                for (var i = 1; i <= state.rounds; ++i) {
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
		$(a).addEventListener('click', function(evt) {
			var newRounds = state.rounds + delta;
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
		var current = '';
		_.each(bytes, function(byte) {
			current += formatByte(byte);			
		});
		txt.show(message, bytes, function(result) {
			if (validator(result, bytes)) {
				while (bytes.length > result.length) { bytes.pop(); }
				for (var i = 0; i < bytes.length; ++i) { bytes[i] = result[i]; }
				for (i = bytes.length; i < result.length; ++i) { bytes.push(result[i]); }
				refresh();
				return true;
			} else {
				alert("invalid byte sequence entered");
				return false;
			}
		});
	}

	function addUpdateBytes(elm, message, bytes, validator) {
		$(elm).addEventListener('click', function(evt) {
			updateBytes(message, state[bytes], validator);
			evt.preventDefault();
		});
	}

	function validKeyLength(newArray) {
		return newArray.length >= 4;
	}

	addUpdateBytes('key', 'change key', 'key', validKeyLength);

	function sameLength(newArray, oldArray) { return newArray.length == oldArray.length; }

    function validInputLength(newArray) {
        if (state.chaining == Chaining.None) {
            return newArray.length == state.blockSize;
        } else {
            return true;
        }
    }

	addUpdateBytes('sbox', 'change S-Box', 'sbox', sameLength);
	addUpdateBytes('permute', 'change permutation', 'permute', sameLength);
    addUpdateBytes('iv', 'change initial vector', 'iv', sameLength);
	addUpdateBytes('input', 'change input', 'input', validInputLength);

    $('chaining-none').addEventListener('click', function(evt) {
        if (state.blockSize != state.input.length) {
            alert("input must be " + state.blockSize + " bytes long");
            return;
        }
        state.chaining = Chaining.None;
        refresh();
        evt.preventDefault();
    });
    $('chaining-cbc').addEventListener('click', function(evt) {
        state.chaining = Chaining.CBC;
        refresh();
        evt.preventDefault();
    });
    $('chaining-ecb').addEventListener('click', function(evt) {
        state.chaining = Chaining.ECB;
        refresh();
        evt.preventDefault();
    });
});