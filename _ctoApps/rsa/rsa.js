
	"use strict";
	window.addEventListener(
		'load',
		() => {
			
	const $ = id => {
		return (
			document.getElementById(id)
		);
	};

	const $prime1 = $('prime-1');
	const $err_p_not_prime =
		$('err-p-not-prime');

	const $prime2 = $('prime-2');
	const $err_q_not_prime =
		$('err-q-not-prime');
	const $err_p_equal_q =
		$('err-p-equal-q');

	const $public_key = $('public-key');
	let public_key;
	const $public_key_length = $('public-key-length');

	const $e = $('base');
	const $err_gcd_not_1 = $('err-gcd-not-1');

	const $phi = $('phi');

	const gcd = (a, b) => {
		
	let ca = a;
	let cb = b;

	let u = bigInt.one;
	let v = bigInt.zero;
	let s = v;
	let t = u;

	while (! cb.isZero()) {
		
	const dd = ca.divmod(cb);
	const na = cb;
	const nb = dd.remainder;

	const nu = s;
	const nv = t;

	const ns = u.subtract(
		dd.quotient.multiply(s)
	);
	const nt = v.subtract(
		dd.quotient.multiply(t)
	);

	ca = na;
	cb = nb;

	u = nu;
	v = nv;
	s = ns;
	t = nt;
;
	}

	return {
		a: ca, u: u, v: v,
		s: s, t: t 
	};
;
	};
 {
	
	const eq = (a, b) => {
		if (! a.equals(b)) {
			console.error(
				`expected ${a}, got ${b}`
			);
		}
	};

	const g = gcd(
		bigInt(70), bigInt(4)
	);
	eq(g.a, bigInt(2));

	eq(g.u, bigInt(1));
	eq(g.v, bigInt(-17));

	eq(g.s, bigInt(-2));
	eq(g.t, bigInt(35));
;
} 
	const $gcd = $('gcd');

	const $private_key = $('private-key');

	const $max_msgs = document.getElementsByClassName('max-msg');
	const $max_msg_ns = document.getElementsByClassName('max-msg-n');

	const $private_message = $('private-message');
	const $public_message = $('public-message');
	const $err_public_msg_too_big = $('err-public-msg-too-big');
	const $err_public_msg_invalid = $('err-public-msg-invalid');
	const $err_private_msg_too_big = $('err-private-msg-too-big');
	const $err_private_msg_invalid = $('err-private-msg-invalid');

	let encrypt = true;

	const $direction = $('direction');

	let timer;

	const resetTimer = () => {
		timer = null;
	};

	const split_args = (str, $err) => {
		$err.classList.add('hidden');
		let result = [];
		let num = '';
		for (let c of str) {
			if (c >= '0' && c <= '9') {
				num += c;
			} else {
				if (c > ' ' && c != ',' && c != ';') {
					$err.classList.remove('hidden');
				}
				if (num.length) {
					result.push(bigInt(num));
					num = '';
				}
			}
		}
		if (num.length) {
			result.push(bigInt(num));
			num = '';
		}
		return result;
	};

	const chrs_per_num = () => {
		let chrs_per_num = 0;
		let mod = public_key;
		while (mod.greaterOrEquals(1000)) {
			mod = mod.divide(1000);
			++chrs_per_num;
		}
		if (mod.greaterOrEquals(255)) {
			++chrs_per_num;
		}
		return chrs_per_num;
	};
	const str2nums = str => {
		let utf8 = new TextEncoder('utf-8').encode(str);
		let result = [];
		const cpn = chrs_per_num();
		if (! cpn) { return result; };

		for (let i = 0; i < utf8.length; ) {
			let num = ''
			for (let j = 0; j < cpn && i < utf8.length; ++j, ++i) {
				const v = utf8[i] & 0xff;
				if (v < 10) { num += '0'; }
				if (v < 100) { num += '0'; }
				num += v;
			}
			result.push(bigInt(num));
		}
		return result;
	};

	const nums2str = nums => {
		let utf8 = []
		const cpn = chrs_per_num();
		if (! cpn) { return ''; }

		for (let num of nums) {
			const ns = num.toString();
			for (let i = 0; i < ns.length; i += 3) {
				let b = +ns.substr(i, 3);
				utf8.push(b);
			}
		}

		try {
			return new TextDecoder('utf-8', {'fatal': true}).decode(new Uint8Array(utf8));
		} catch (e) {
			return '';
		}
	}

	const $private_txt = $('private-txt');
	const $private_txt_row = $private_txt.parentElement;
;
			
	const queueRefresh = event => {
		event.preventDefault();
		
	let fn = refresh;
	if (! timer) {
		refresh();
		fn = resetTimer;
	} else {
		clearTimeout(timer);
		
	$public_key_length.innerText = '...';
	$public_key.innerText = '...';
	$phi.innerText = '...';
	$gcd.innerText = '...';
	$private_key.innerText = '...';

	if (encrypt) {
		$public_message.value = '...';
	} else {
		$private_message.value = '...';
	}
;
	}
	timer = setTimeout(fn, 500);
;
	};

	const doNothing = event => {
		event.preventDefault();
	};

	const refresh = () => {
		
	const prime1 =
		bigInt($prime1.value);

	$err_p_not_prime.classList.toggle(
		'hidden',
		prime1.isProbablePrime()
	);

	const prime2 =
		bigInt($prime2.value);

	$err_q_not_prime.classList.toggle(
		'hidden',
		prime2.isProbablePrime()
	);

	$err_p_equal_q.classList.toggle(
		'hidden',
		! prime1.equals(prime2)
	);

	public_key = prime1.multiply(prime2);
	$public_key.innerText = public_key.toString();
	$public_key_length.innerText = public_key.bitLength();

	const e = bigInt($e.value);

	const one = bigInt.one;
	const phi = prime1.subtract(one).multiply(prime2.subtract(one));
	$phi.innerText = phi.toString();

	const gcd_result = gcd(phi, e);
	$err_gcd_not_1.classList.toggle(
		'hidden', gcd_result.a.equals(one)
	);

	$gcd.innerText = gcd_result.a.toString();

	let private_key = gcd_result.v;
	const zero = bigInt.zero;
	if (private_key.lesser(zero)) {
		private_key =
			private_key.add(phi);
	}
	$private_key.innerText =
		private_key.toString();

	const max_msg = public_key.subtract(one).toString();

	for (let i = 0; i < $max_msgs.length; ++i) {
		$max_msgs[i].innerText = max_msg;
	}
	for (let i = 0; i < $max_msg_ns.length; ++i) {
		$max_msg_ns[i].innerText = public_key.toString();
	}

	if (encrypt) {
		
	let some_too_big = false;
	let result = ''; let sep = '';
	for (let num of split_args($private_message.value, $err_private_msg_invalid)) {
		if (num.greaterOrEquals(public_key)) {
			some_too_big = true;
		}
		const encrypted = num.modPow(
			e, public_key
		);
		result += sep + encrypted.toString();
		sep = ', ';
	}

	$err_public_msg_too_big.classList.add('hidden');
	$err_public_msg_invalid.classList.add('hidden');
	$err_private_msg_too_big.classList.toggle(
		'hidden', ! some_too_big
	);
	$public_message.value = result;
;
	} else {
		
	let some_too_big = false;
	let result = ''; let sep = '';

	for (let num of split_args($public_message.value, $err_public_msg_invalid)) {
		if (num.greaterOrEquals(public_key)) {
			some_too_big = true;
		}
		const decrypted = num.modPow(
			private_key, public_key
		);
		result += sep + decrypted.toString();
		sep = ', ';
	}

	$err_private_msg_too_big.classList.add('hidden');
	$err_private_msg_invalid.classList.add('hidden');
	$err_public_msg_too_big.classList.toggle(
		'hidden', ! some_too_big
	);
	$private_message.value = result;

	$private_txt.value =
		nums2str(split_args(result, $err_private_msg_invalid));
;
	}

	resetTimer();

	$private_txt_row.classList.toggle(
		'hidden',
		public_key.lesser(256)
	);
;
	};
	refresh();

	$('primes-form').addEventListener(
		'submit', doNothing
	);

	$prime1.addEventListener(
		'input', queueRefresh
	);

	$prime2.addEventListener(
		'input', queueRefresh
	);

	$('e-form').addEventListener(
		'submit', doNothing
	);

	$e.addEventListener('input', queueRefresh);

	$('crypt-boxes-form').addEventListener(
		'submit', doNothing
	);

	$private_message.addEventListener(
		'input',
		event => {
			setEncrypt(true);
			
	$private_txt.value =
		nums2str(split_args($private_message.value, $err_private_msg_invalid));
;
			queueRefresh(event);
		}
	);

	$public_message.addEventListener(
		'input',
		event => {
			setEncrypt(false);
			queueRefresh(event);
		}
	);

	const setEncrypt = new_encrypt => {
		if (encrypt === new_encrypt) {
			return;
		}
		encrypt = new_encrypt;
		if (encrypt) {
			
	$direction.classList.remove('flip');
	$direction.classList.add('flop');
;
		} else {
			
	$direction.classList.remove('flop');
	$direction.classList.add('flip');
;
		}
	};
	$direction.addEventListener('click', evt => {
		setEncrypt(! encrypt);
		evt.preventDefault();
	});

	$private_txt.addEventListener(
		'input',
		event => {
			setEncrypt(true);
			$private_message.value = str2nums($private_txt.value);
			queueRefresh(event);
		}
	);
;
		}
	);
