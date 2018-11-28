# RSA-Implementierung in JavaScript

```
d{file: ../_ctoApps/rsa/rsa.js}
	window.addEventListener('load', () => {
		e{globals};
		e{setup rsa};
	});
x{file: ../_ctoApps/rsa/rsa.js}
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
	const f{refresh} = () => {
		e{refresh};
	};
	refresh();
x{setup rsa}
```
* Während des Refreshs werden alle zu berechnenden Felder neu berechnet

```
d{globals}
	const f{$} = id => {
		return document.getElementById(id);
	};
x{globals}
```
* Hilfsfunktion, um Element mit `id` zu ermitteln

```
a{globals}
	const $prime1 = f{$}('prime-1');
	const $prime2 = f{$}('prime-2');
	const $err_p_not_prime =
		f{$}('err-p-not-prime');
	const $err_q_not_prime =
		f{$}('err-q-not-prime');
	const $err_p_equal_q =
		f{$}('err-p-equal-q');
x{globals}
```
* In zwei Textfeldern werden die Primzahlen eingegeben
* Zusätzlich gibt es Panels mit Fehlermeldungen
* Diese sind aber versteckt, wenn der Fehler nicht aufgetreten ist
* Die Objekte werden in globalen Variablen abgelegt, um sie nicht jedes
  Mal suchen zu müssen

```
d{refresh}
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
x{refresh}
```
* Die beiden Primzahlen werden aus dem DOM-Modell gelesen
* Und in große Zahlen konvertiert
* Wenn sie vermutlich keine Primzahl oder gleich sind, wird die
  passende Fehlermeldung angezeigt
* Und andernfalls ausgeblendet

```
a{globals}
	const $public_key =
		f{$}('public-key');
	const $public_key_length =
		f{$}('public-key-length');
x{globals}
```
* In zwei Elementen wird der öffentliche Schlüssel und dessen Länge
  abgelegt

```
a{refresh}
	const public_key =
		prime1.multiply(prime2);
	$public_key.innerText =
		public_key.toString();
	$public_key_length.innerText =
		public_key.bitLength();
x{refresh}
```
* Der öffentliche Schlüssel ist das Produkt der beiden Primzahlen
* Die Länge des Schlüssels kann die Integer-Bibliothek direkt ermitteln

```
a{globals}
	const $max_msgs =
		document.getElementsByClassName(
			'max-msg'
		);
x{globals}
```
* Felder enthalten die größte mögliche Zahl für eine Nachricht

```
a{refresh}
	const one = f{bigInt}.one;
	const max_msg =
		public_key.subtract(one).toString();
	for (
		let i = 0; i < $max_msgs.length; ++i
	) {
		$max_msgs[i].innerText = max_msg;
	}
x{refresh}
```
* Die größte mögliche Nachrichtenzahl wird in Fehlermeldungen benötigt

```
a{globals}
	const $phi = f{$}('phi');
x{globals}
```
* Auch das Ergebnis der φ-Funktion wird auf der Webseite angezeigt

```
a{refresh}
	const phi = prime1.subtract(one).
		multiply(prime2.subtract(one));
	$phi.innerText = phi.toString();
x{refresh}
```
* Da davon ausgegangen wird, dass die beiden Primzahlen verschieden
  sind, ist das Produkt von deren Vorgänger der Wert der φ-Funktion
  des öffentlichen Schlüssels

```
a{globals}
	const f{gcd} = (a, b) => {
		e{gcd};
	};
x{globals}
```
* Das inverse Element kann mit dem Erweiterten Euklidischen Algorithmus
  berechnet werden
* Dieser wird weiter unten implementiert

```
a{globals}
	const $e = f{$}('base');
	const $gcd = f{$}('gcd');
	const $err_gcd_not_1 =
		f{$}('err-gcd-not-1');
x{globals}
```
* Der Wert `e` wird wie die Primzahlen aus einem Textfeld ausgelesen
* Der größte gemeinsame Teiler wird zur Kontrolle auch angezeigt
* Es gibt eine Fehlermeldung, wenn der größte gemeinsame Teiler nicht
  `1` ist

```
a{refresh}
	const e = bigInt($e.value);
	const gg = gcd(phi, e);
	$err_gcd_not_1.classList.toggle(
		'hidden', gg.a.equals(1)
	);
	$gcd.innerText = gg.a.toString();
x{refresh}
```
* Wenn `e` und der Wert der φ-Funktion nicht teilerfremd sind, wird
  eine entsprechende Fehlermeldung angezeigt

```
a{globals}
	const $private_key =
		f{$}('private-key');
x{globals}
```
* Der private Schlüssel wird auch auf der Webseite ausgegeben

```
a{refresh}
	let private_key = gg.v;
	if (private_key.lesser(0)) {
		private_key =
			private_key.add(phi);
	}
	$private_key.innerText =
		private_key.toString();
x{refresh}
```
* Der private Schlüssel ist das multiplikative Inverse modulo φ

```
a{globals}
	let encrypt = true;
x{globals}
```
* Der Algorithmus kann sowohl ver- als auch entschlüsseln
* Die Variable `encrypt` bestimmt, in welche Richtung der Algorithmus
  läuft

```
a{refresh}
	if (encrypt) {
		e{encrypt};
	} else {
		e{decrypt};
	}
x{refresh}
```
* Je nachdem, in welche Richtung der Algorithmus arbeiten soll, wird
  entweder der Klartext verschlüsselt
* Oder der Geheimtext entschlüsselt

```
a{globals}
	const $private_message =
		f{$}('private-message');
	const $public_message =
		f{$}('public-message');
	const $err_public_msg_too_big =
		f{$}('err-public-msg-too-big');
	const $err_private_msg_too_big =
		f{$}('err-private-msg-too-big');
x{globals}
```
* Es gibt ein Textfeld für den Klartext und den Geheimtext
* Zu jedem Feld gibt es eine Fehlermeldung, wenn die eingegebene Zahl zu
  groß ist

```
d{encrypt}
	const source =
		bigInt($private_message.value);
	$err_public_msg_too_big.
		classList.toggle(
			'hidden',
			source.lesser(public_key)
		);
	$err_private_msg_too_big.
		classList.add('hidden');
x{encrypt}
```
* Beim Verschlüsseln wird geprüft, ob der Klartext zu groß ist
* Dann wird eine Fehlermeldung angezeigt
* Beim Entschlüsseln gibt es eine anloge Fehlermeldung, die beim
  Verschlüsseln immer ausgeblendet wird

```
a{encrypt}
	const encrypted =
		source.modPow(
			e, public_key
		);
	$public_message.value =
		encrypted.toString();
x{encrypt}
```
* Das Verschlüsseln besteht nur aus einer Exponentiation mit `e`
  modulo `N` (dem öffentlichen Schlüssel)

```
d{decrypt}
	const source =
		bigInt($public_message.value);
	$err_public_msg_too_big.
		classList.add('hidden');
	$err_private_msg_too_big.
		classList.toggle(
			'hidden',
			source.lesser(public_key)
		);
x{decrypt}
```
* Beim Entschlüsseln wird der Geheimtext als Eingabe verwendet
* Auch hier wird eine Fehlermeldung ausgegeben, wenn die Zahl zu groß
  ist
* Beim Verschlüsseln gibt es eine anloge Fehlermeldung, die beim
  Entschlüsseln immer ausgeblendet wird

```
a{decrypt}
	const decrypted = source.modPow(
		private_key, public_key
	);
	$private_message.value =
		decrypted.toString();
x{decrypt}
```
* Auch das Entschlüsseln besteht aus einer einzigen Exponentiation mit
  dem geheimen Schlüssel `d` modulo `N`

# Größter gemeinsamer Teiler (ggT)
* Leider bietet die verwendete Mathe-Bibliothek keinen Algorithmus, um
  das Inverse Element zu einer Restklasse zu bestimmen
* Daher wird der Erweiterte Euklidische Algorithmus hier direkt
  implementiert

```
d{gcd}
	let ca = a;
	let cb = b;
x{gcd}
```
* Die aktuellen Werte von `a` und `b` werden in `ca` und
  `cb` gespeichert
* Solange `cb` nicht `0` ist gilt stets, dass der größte
  gemeinsame Teiler von `a` und `b` auch der größte gemeinsame
  Teiler von `ca` und `cb` ist
* Der Euklidische Algorithmus reduziert `ca` und `cb`, bis
  `cb` gleich `0` wird

```
a{gcd}
	let u = f{bigInt}.one;
	let v = f{bigInt}.zero;
	let s = v;
	let t = u;
x{gcd}
```
* Der Erweiterte Euklidische Algorithmus enthält vier weitere Parameter
  `u`, `v`, `s` und `t`
* Es gilt stets, dass `ca = u * a + v * b`
* Und `cb = s * a + t * b`

```
a{gcd}
	while (! cb.isZero()) {
		e{gcd loop};
	}
x{gcd}
```
* Solange `cb` nicht `0` ist, wird die Schleife ausgeführt

```
d{gcd loop}
	const dd = ca.divmod(cb);
	const na = cb;
	const nb = dd.remainder;
x{gcd loop}
```
* `ca` wird durch `cb` geteilt
* Der neue Wert von `ca` (`na`) wird auf `cb` gesetzt
* Der neue Wert von `cb` (`nb`) ist der Rest aus der Division
* Der größte gemeinsame Teiler von `ca` und `cb` ist auch der
  größte gemeinsame Teiler von `na` und `nb`

```
a{gcd loop}
	const nu = s;
	const nv = t;
x{gcd loop}
```
* Dadurch, dass `cb` nach `na` kopiert wurde, können die
  Koeffizienten `s` und `t` nach `nu` und `nv` kopiert
  werden

```
a{gcd loop}
	const ns = u.subtract(
		dd.quotient.multiply(s)
	);
	const nt = v.subtract(
		dd.quotient.multiply(t)
	);
x{gcd loop}
```
* Aus den aktuellen `u` und `v` können die neuen `s` und
  `t` bestimmt werden

```
a{gcd loop}
	ca = na;
	cb = nb;
x{gcd loop}
```
* Die neuen Werte werden zu den aktuellen Werten

```
a{gcd loop}
	u = nu;
	v = nv;
	s = ns;
	t = nt;
x{gcd loop}
```
* Die neuen Werte werden zu den aktuellen Werten

```
a{gcd}
	return {
		s{a}: ca, s{u}: u, s{v}: v,
		s{s}: s, s{t}: t 
	};
x{gcd}
```
* Zurück liefert die Funktion den größten gemeinsamen Teiler `a`
* Und die Koeffizienten

## Unit-Test

```
a{globals} {
	e{unit test};
} x{globals}
```
* Unit-Test wird in einem eigenen Block bei jedem Start ausgeführt

```
d{unit test}
	const f{eq} = (a, b) => {
		if (! a.equals(b)) {
			console.error(
				`expected ${a}, got ${b}`
			);
		}
	};
x{unit test}
```
* Die Funktion prüft, ob zwei große Zahlen gleich sind

```
a{unit test}
	const g = gcd(
		bigInt(70), bigInt(4)
	);
	eq(g.a, bigInt(2));
x{unit test}
```
* Der größte gemeinsame Teiler muss `2` sein

```
a{unit test}
	eq(g.u, bigInt(1));
	eq(g.v, bigInt(-17));
x{unit test}
```
* Die Koeffizienten `g.u` und `g.v` liefern
  eine Linearkombination für den größten gemeinsamen Teiler

```
a{unit test}
	eq(g.s, bigInt(-2));
	eq(g.t, bigInt(35));
x{unit test}
```
* Die Koeffizienten `g.s` und `g.t` liefern nicht-triviale
  Linearkombination von `0`
* Also `g.s * 70 + g.t * 4 == 0` wobei `g.s` und
  `g.t` nicht `0` sind

# Richtung des Algorithmus anzeigen
* Es gibt ein Element auf der Web-Seite, das die Ablaufrichtung des
  Algorithmus anzeigt
* Ob er ver- oder entschlüsselt

```
a{globals}
	const $direction =
		f{$}('direction');
x{globals}
```
* Dieses Element zeigt die Richtung an, in welcher der Algorithmus
  läuft
* Die Richtung wird durch CSS-Klassen visualisiert

```
a{setup rsa}
	const f{setEncrypt} = new_encrypt => {
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
x{setup rsa}
```
* Durch CSS-Animationen wird der Pfeil hin- und hergedreht
* Wenn keine Klasse oder die Klasse `s{flop}` gesetzt ist, dann zeigt
  der Pfeil in die Verschlüsselungsrichtung
* Wenn die Klasse `s{flip}` gesetzt ist, zeigt er in die
  Entschlüsselungsrichtung
* `s{flop}` ist notwendig, um den Wechsel zu animieren

# Timer
* Das Berechnen von RSA kann bei sehr großen Zahlen etwas dauern
* Daher wird nicht mit jeder Änderung eine neue Berechnung gestartet
* Nur wenn nach der letzten Änderung ein gewisses Zeitintervall
  verstrichen ist, wird die Berechnung gestartet

```
a{globals}
	let timer;
x{globals}
```
* Der Timer wird global vorgehalten

```
a{globals}
	const f{resetTimer} = () => {
		timer = null;
	};
x{globals}
```

```
a{setup rsa}
	const f{queueRefresh} = event => {
		event.preventDefault();
		let f{fn} = f{refresh};
		if (! timer) {
			refresh();
			f{fn} = f{resetTimer};
		} else {
			clearTimeout(timer);
			e{set fields to pending};
		}
		timer = setTimeout(f{fn}, 500);
	}
x{setup rsa}
```
* Wenn es noch keine Änderung gab, wird die Änderung sofort
  durchgeführt
* Und nach Ablauf des Timers wird keine Neuberechnung durchgeführt
* Ansonsten werden die Felder mit Platzhaltern befüllt und der
  bestehende Timer gelöscht
* Dann wird eine neuer Timer gestartet, der die Berechnung triggert
* Der Timeout beträgt eine halbe Sekunde

```
a{refresh}
	resetTimer();
x{refresh}
```
* Nach der Neuberechnung wird der Timer gelöscht

```
d{set fields to pending}
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
x{set fields to pending}
```
* Alle berechneten Felder werden mit Platzhaltern befüllt

# Aktionen hinterlegen
* Zum Schluss werden die definierten Funktionen als Event-Handler
  registriert

```
a{setup rsa}
	$prime1.addEventListener(
		'input', f{queueRefresh}
	);
	$prime2.addEventListener(
		'input', f{queueRefresh}
	);
	$e.addEventListener(
		'input', f{queueRefresh}
	);
x{setup rsa}
```
* Werden die Primzahlen oder die Basis geändert, wird die Neuberechnung
  getriggert

```
a{setup rsa}
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
x{setup rsa}
```
* Wenn der Klartext oder Geheimtext geändert wird, wird zusätzlich die
  Richtung des Algorithmus angepasst

