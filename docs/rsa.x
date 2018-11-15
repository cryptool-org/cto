# RSA Implementierung in JavaScript

```
d{file: rsa.js}
	f{jQuery}((f{$}) => {
		e{globals};
		e{setup rsa};
	});
x{file: rsa.js}
```
* Der gesamte Code wird abgearbeitet, nachdem die Webseite vollständig
  geladen wurde
* Durch das Scoping in einer eigenen Funktion wird der globale
  Namensraum nicht verschmutzt
* Dieses Projekt verwendet `jQuery`

# Refresh
* Neben den wenigen Aktionen findet die Hauptarbeit während des Refreshs
  statt

```
d{setup rsa}
	t{const} f{refresh} = () => {
		e{refresh};
	};
	f{refresh}();
x{setup rsa}
```
* Während des Refreshs werden alle zu berechnenden Felder neu berechnet

```
d{globals}
	t{const} v{$prime1} = f{$}(s{'#prime-1'});
	t{const} v{$prime2} = f{$}(s{'#prime-2'});
	t{const} v{$errPNotPrime} =
		f{$}(s{'#err-p-not-prime'});
	t{const} v{$errQNotPrime} =
		f{$}(s{'#err-q-not-prime'});
	t{const} v{$errPEqualQ} =
		f{$}(s{'#err-p-equal-q'});
x{globals}
```
* In zwei Textfeldern werden die Primzahlen eingegeben
* Zusätzlich gibt es Panels mit Fehlermeldungen
* Diese sind aber versteckt, wenn der Fehler nicht aufgetreten ist
* Die Objekte werden in globalen Variablen abgelegt, um sie nicht jedes
  Mal suchen zu müssen

```
d{refresh}
	t{const} v{prime1} = f{bigInt}(v{$prime1}.f{val}());
	v{$errPNotPrime}.f{toggleClass}(
		s{'hidden'}, v{prime1}.f{isProbablePrime}()
	);
	t{const} v{prime2} = f{bigInt}(v{$prime2}.f{val}());
	v{$errQNotPrime}.f{toggleClass}(
		s{'hidden'}, v{prime2}.f{isProbablePrime}()
	);
	v{$errPEqualQ}.f{toggleClass}(
		s{'hidden'}, ! v{prime1}.f{equals}(v{prime2})
	);
x{refresh}
```
* Die beiden Primzahlen werden aus dem DOM-Modell gelesen
* Und in große Zahlen konvertiert
* Wenn sie vermutlich keine Primzahl oder gleich sind, wird die
  passende Fehlermeldung angezeigt
* Und andernfalls ausgeblendet

```
a{globals}
	t{const} v{$public_key} =
		f{$}(s{'#public-key'});
	t{const} v{$public_key_length} =
		f{$}(s{'#public-key-length'});
x{globals}
```
* In zwei Elementen wird der öffentliche Schlüssel und dessen Länge
  abgelegt

```
a{refresh}
	const public_key =
		prime1.multiply(prime2);
	$public_key.text(
		public_key.toString()
	);
	$public_key_length.text(
		public_key.bitLength()
	);
x{refresh}
```
* Der öffentliche Schlüssel ist das Produkt der beiden Primzahlen
* Die Länge des Schlüssels kann die Integer-Bibliothek direkt ermitteln

```
a{globals}
	const $phi = $('#phi');
x{globals}
```
* Auch das Ergebnis der φ-Funktion wird auf der Webseite angezeigt

```
a{refresh}
	const one = bigInt.one;
	const phi = prime1.subtract(one).
		multiply(prime2.subtract(one));
	$phi.text(phi.toString());
x{refresh}
```
* Da davon ausgegangen wird, dass die beiden Primzahlen verschieden
  sind, ist das Produkt deren Vorgänger der Wert der φ-Funktion
  des öffentlichen Schlüssels

```
a{globals}
	const gcd = (a, b) => {
		e{gcd};
	};
x{globals}
```
* Das inverse Element kann mit dem Erweiterten Euklidischen Algorithmus
  berechnet werden
* Dieser wird weiter unten implementiert

```
a{globals}
	const $e = $('#base');
	const $gcd = $('#gcd');
x{globals}
```
* Der Wert `e` wird wie die Primzahlen aus einem Textfeld ausgelesen
* Der kleinste gemeinsame Teiler wird zur Kontrolle auch angezeigt

```
a{refresh}
	const e = bigInt($e.val());
	const gg = gcd(phi, e);
	$errGcdNot1.toggleClass(
		'hidden', gg.a.equals(1)
	);
	$gcd.text(gg.a.toString());
x{refresh}
```
* Wenn `e` mit dem Wert der φ-Funktion nicht teilerfremd sind, wird
  eine entsprechende Fehlermeldung angezeigt

```
a{globals}
	const $private_key = $('#private-key');
x{globals}
```
* Der private Schlüssel wird auch auf der Webseite ausgegeben

```
a{refresh}
	let private_key = gg.v;
	if (private_key.lesser(0)) {
		private_key = private_key.add(phi);
	}
	$private_key.text(private_key.toString());
x{refresh}
```
* Der private Schlüssel ist das multiplikative Inverse Modulo φ

```
a{globals}
	let encrypt = true;
x{globals}
```
* Der Algorithmus kann sowohl Ver- als auch Entschlüsseln
* Diese Variable bestimmt, in welche Richtung der Algorithmus läuft

```
a{refresh}
	if (encrypt) {
		e{encrypt};
	} else {
		e{decrypt};
	}

	timer = null;
x{refresh}
```

```
d{encrypt}
	const source =
		bigInt($private_message.val());
	$errPublicMsgTooBig.toggleClass(
		'hidden', source.lesser(public_key)
	);
	$errPrivateMsgTooBig.toggleClass(
		'hidden', true
	);
	const encrypted = source.modPow(
		e, public_key
	);
	$public_message.val(
		encrypted.toString()
	);
x{encrypt}
```

```
d{decrypt}
	const source =
		bigInt($public_message.val());
	$errPublicMsgTooBig.toggleClass(
		'hidden', true
	);
	$errPrivateMsgTooBig.toggleClass(
		'hidden', source.lesser(public_key)
	);
	const decrypted = source.modPow(
		private_key, public_key
	);
	$private_message.val(
		decrypted.toString()
	);
x{decrypt}
```

# Größter gemeinsamer Teiler

```
d{gcd}
	let ca = a;
	let cb = b;

	let u = bigInt.one;
	let s = bigInt.zero;
	let v = s;
	let t = u;
x{gcd}
```

```
a{gcd}
	while (! cb.isZero()) {
		e{gcd loop};
	}
x{gcd}
```

```
d{gcd loop}
	const dd = ca.divmod(cb);
	const na = cb;

	const nb = dd.remainder;
	const nu = s;
	const nv = t;
	const ns =
		u.subtract(dd.quotient.multiply(s));
	const nt =
		v.subtract(dd.quotient.multiply(t));
x{gcd loop}
```

```
a{gcd loop}
	ca = na;
	cb = nb;
	u = nu;
	v = nv;
	s = ns;
	t = nt;
x{gcd loop}
```

```
a{gcd}
	return {
		a: ca, u: u, v: v,
		s: s, t: t 
	};
x{gcd}
```

# Interaktion

```
a{globals}
	const $private_message =
		$('#private-message');
	const $public_message =
		$('#public-message');
	const $direction =
		$('#direction');
	const $errGcdNot1 =
		$('#err-gcd-not-1');
	const $errPublicMsgTooBig =
		$('#err-public-msg-too-big');
	const $errPrivateMsgTooBig =
		$('#err-private-msg-too-big');
	let timer;
x{globals}
```

```
a{setup rsa}
	const setEncrypt = (new_encrypt) => {
		if (encrypt === new_encrypt) { return; }
		encrypt = new_encrypt;
		if (encrypt) {
			$direction.removeClass('flip');
			$direction.addClass('flop');
		} else {
			$direction.removeClass('flop');
			$direction.addClass('flip');
		}
	};
x{setup rsa}
```

```
a{setup rsa}
	const queueRefresh = (event) => {
		event.preventDefault();
		if (! timer) {
			refresh();
		} else {
			clearTimeout(timer);
			e{set fields to pending};
		}
		timer = setTimeout(refresh, 500);
	}
x{setup rsa}
```

```
d{set fields to pending}
	$public_key_length.text('...');
	$public_key.text('...');
	$phi.text('...');
	$gcd.text('...');
	$private_key.text('...');

	if (encrypt) {
		$public_message.val('...');
	} else {
		$private_message.val('...');
	}
x{set fields to pending}
```

```
a{setup rsa}
	$prime1.on('input', queueRefresh);
	$prime2.on('input', queueRefresh);
	$e.on('input', queueRefresh);
	$private_message.on('input', event => {
		setEncrypt(true);
		queueRefresh(event);
	});
	$public_message.on('input', event => {
		setEncrypt(false);
		queueRefresh(event);
	});
x{setup rsa}
```

```
a{refresh}
	timer = null;
x{refresh}
```

