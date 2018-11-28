
	"use strict";
	window.addEventListener('load', () => {
		
	const $ = id => {
		return document.getElementById(id);
	};

	const $prime1 = $('prime-1');
	const $err_p_not_prime =
		$('err-p-not-prime');

	const $prime2 = $('prime-2');
	const $err_q_not_prime =
		$('err-q-not-prime');
	const $err_p_equal_q =
		$('err-p-equal-q');

	const $public_key =
		$('public-key');
	const $public_key_length =
		$('public-key-length');

	const $max_msgs =
		document.getElementsByClassName(
			'max-msg'
		);

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

	const $e = $('base');
	const $gcd = $('gcd');
	const $err_gcd_not_1 =
		$('err-gcd-not-1');

	const $private_key =
		$('private-key');

	let encrypt = true;

	const $private_message =
		$('private-message');
	const $public_message =
		$('public-message');
	const $err_public_msg_too_big =
		$('err-public-msg-too-big');
	const $err_private_msg_too_big =
		$('err-private-msg-too-big');
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
	const $direction =
		$('direction');

	let timer;

	const resetTimer = () => {
		timer = null;
	};
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
	}

	$prime1.addEventListener(
		'input', queueRefresh
	);

	$prime2.addEventListener(
		'input', queueRefresh
	);

	const refresh = () => {
		
	const prime1 = bigInt($prime1.value);
	$err_p_not_prime.classList.toggle(
		'hidden', prime1.isProbablePrime()
	);
	const prime2 = bigInt($prime2.value);
	$err_q_not_prime.classList.toggle(
		'hidden', prime2.isProbablePrime()
	);
	$err_p_equal_q.classList.toggle(
		'hidden', ! prime1.equals(prime2)
	);

	const public_key =
		prime1.multiply(prime2);
	$public_key.innerText =
		public_key.toString();
	$public_key_length.innerText =
		public_key.bitLength();

	const one = bigInt.one;
	const max_msg =
		public_key.subtract(one).toString();
	for (
		let i = 0; i < $max_msgs.length; ++i
	) {
		$max_msgs[i].innerText = max_msg;
	}

	const phi = prime1.subtract(one).
		multiply(prime2.subtract(one));
	$phi.innerText = phi.toString();

	const e = bigInt($e.value);
	const gg = gcd(phi, e);
	$err_gcd_not_1.classList.toggle(
		'hidden', gg.a.equals(1)
	);
	$gcd.innerText = gg.a.toString();

	let private_key = gg.v;
	if (private_key.lesser(0)) {
		private_key =
			private_key.add(phi);
	}
	$private_key.innerText =
		private_key.toString();

	if (encrypt) {
		
	const source =
		bigInt($private_message.value);
	$err_public_msg_too_big.
		classList.toggle(
			'hidden',
			source.lesser(public_key)
		);
	$err_private_msg_too_big.
		classList.add('hidden');

	const encrypted =
		source.modPow(
			e, public_key
		);
	$public_message.value =
		encrypted.toString();
;
	} else {
		
	const source =
		bigInt($public_message.value);
	$err_public_msg_too_big.
		classList.add('hidden');
	$err_private_msg_too_big.
		classList.toggle(
			'hidden',
			source.lesser(public_key)
		);

	const decrypted = source.modPow(
		private_key, public_key
	);
	$private_message.value =
		decrypted.toString();
;
	}

	resetTimer();
;
	};
	refresh();

	const setEncrypt = new_encrypt => {
		if (encrypt === new_encrypt) {
			return;
		}
		encrypt = new_encrypt;
		if (encrypt) {
			$direction.classList.remove('flip');
			$direction.classList.add('flop');
		} else {
			$direction.classList.remove('flop');
			$direction.classList.add('flip');
		}
	};

	$e.addEventListener(
		'input', queueRefresh
	);

	$private_message.
		addEventListener('input', event => {
			setEncrypt(true);
			queueRefresh(event);
		});
	$public_message.
		addEventListener('input', event => {
			setEncrypt(false);
			queueRefresh(event);
		});
;
	});
