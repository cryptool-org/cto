# RSA-Implementierung in JavaScript
* Dieses Dokument beschreibt eine vollständige Implementierung des
  RSA-Algorithmus als Web-App
* Sowohl der JavaScript-Code, als auch HTML und CSS können aus diesem
  Dokument mit dem Hex-Toolkit (https://github.com/itmm/hex/) generiert
  werden

# 1. Datei-Struktur
* Dieser Abschnitt beschreibt die Dateien die benötigt werden
* Und wie sie aufgebaut werden

```
d{file: index-de.html}
	<doctype html>
	<html>
		<head>
			E{header}
		</head>
		<body>
			E{rsa de}
			E{scripts}
		</body>
	</html>
x{file: index-de.html}
```
* Die Datei `index-de.html` enthält die RSA-Steuerung in Deutsch
* Header- und Script-Fragmente werden mit der englischen Version geteilt
* Das Fragment `{rsa de}` wird für unsere Webseite in eine eigene Datei
  zusätzlich ausgelagert

```
d{file: index-en.html}
	<doctype html>
	<html>
		<head>
			E{header}
		</head>
		<body>
			E{rsa en}
			E{scripts}
		</body>
	</html>
x{file: index-en.html}
```
* Die englische Webseite unterscheidet verwendet statt der deutschen
  Version das Fragment `{rsa en}`
* Der Rest ist identisch

```
d{file: ../_ctoApps/rsa/rsa-de.html}
	E{rsa de}
x{file: ../_ctoApps/rsa/rsa-de.html}
```
* Die Datei `rsa-de.html` enthält die deutsche GUI ohne Webseiten-Rahmen
* Diese Datei wird direkt im Ziel-Ordner erzeugt

```
d{file: ../_ctoApps/rsa/rsa-en.html}
	E{rsa en}
x{file: ../_ctoApps/rsa/rsa-en.html}
```
* Die Datei `rsa-en.html` enthält die englische GUI ohne Webseiten-Rahmen

```
d{header}
	<title>RSA-js</title>
	<meta charset="utf-8">
	e{bootstrap stylesheets}
	<link rel="stylesheet"
		href="../_ctoApps/rsa/rsa.css"
	>
x{header}
```
* Im HTML-Header wird die Zeichen-Kodierung auf UTF-8 gestellt
* Die Bootstrap-Stylesheets werden eingebunden
* Das app-spezifische Stylesheet `rsa.css` wird eingebunden

```
d{file: ../_ctoApps/rsa/rsa.css}
	e{css}
x{file: ../_ctoApps/rsa/rsa.css}
```
* Das Stylesheet enthält ein Fragment `{css}`
* Wenn neue HTML-Elemente eine CSS-Anpassung benötigen, werden diese
  hier eingepflegt

```
d{scripts}
	<script
		src=s{"../_ctoApps/rsa/}b{}s{BigInteger.min.js"}
	></script>
	<script
		src="../_ctoApps/rsa/rsa.js"
	></script>
x{scripts}
```
* Neben dem spezifischen JavaScript wird noch eine Bibliothek für das
  Rechnen mit großen Zahlen eingebunden

```
d{file: ../_ctoApps/rsa/rsa.js}
	"use strict";
	window.addEventListener(
		'load',
		() => {
			g{globals};
			e{setup rsa};
		}
	);
x{file: ../_ctoApps/rsa/rsa.js}
```
* Das Skript `rsa.js` wird mit strenger Typ-Prüfung ausgeführt
* Der gesamte Code wird abgearbeitet, nachdem die Webseite vollständig
  geladen wurde
* Der gesamte Code wird innerhalb einer JavaScript Funktion definiert
* Dadurch entstehen keine neuen globalen Objekte

```
d{rsa de}
	<div id="rsa-container"
		class="container">
		e{container de}
	</div>
x{rsa de}
```
* Alle HTML-Elemente des RSA-Algorithmus sind in einem eigenen
  `<div>`-Tag gekapselt
* Dadurch können Stylesheet-Anpassungen auf RSA-Elemente beschränkt
  werden

```
d{rsa en}
	<div id="rsa-container"
		class="container">
		e{container en}
	</div>
x{rsa en}
```
* Die englische Variante bindet ein anderes Fragment ein

```
d{container de}
	<p>
		s{Dieses Modul demonstriert}
		s{schrittweise die Ver- und}
		s{Entschlüsselung mit dem}
		s{RSA-Verfahren. Der Sender}
		s{verwendet dabei zum Verschlüsseln}
		s{den öffentlichen Schlüssel des}
		s{Empfängers; der Empfänger}
		s{verwendet zum Entschlüsseln}
		s{seinen zugehörigen privaten}
		s{Schlüssel.}
	</p>
x{container de}
```
* Die Seite beginnt mit einer kurzen Beschreibung

```
d{container en}
	<p>
		s{This module demonstrates}
		s{step-by-step encryption and}
		s{decryption with the RSA method.}
		s{The sender uses the public key of}
		s{the recipient for encryption;}
		s{the recipient uses his associated}
		s{private key to decrypt.}
	</p>
x{container en}
```
* Die englische Seite beginnt mit der gleichen Beschreibung

```
d{css}
	#rsa-container p {
		margin: 0 0 10px 0;
	}
x{css}
```
* Für Absätze wird der Abstand auf `0` Pixel gesetzt
* Nur der untere Abstand wird auf `10` Pixel gesetzt

# 2. Primfaktoren eingeben
* Dieser Abschnitt beschreibt, wie die Primzahlen eingegeben und geändert
  werden können

```
a{container de}
	<h2>s{Primzahlen}</h2>
x{container de}
```
* Die HTML-Seite beginnt mit dem Kapitel über Primzahlen

```
a{container de}
	<p>
		s{Die Sicherheit von RSA basiert}
		s{darauf, dass es zwar einfach ist,}
		s{das Produkt }<i>n</i>s{ zweier großer}
		s{Primzahlen }<i>p</i>s{ und }<i>q</i>
		s{zu berechnen. Es ist jedoch sehr}
		s{schwer, nur aus dem Produkt}
		<i>n</i>s{ die beiden Primzahlen zu}
		s{bestimmen, die das Produkt}
		s{ergeben. Dieses Zerlegen nennt man}
		s{auch das Faktorisieren von}
		<i>n</i>s{.}
	</p>
x{container de}
```
* Die Seite beschreibt, warum bei RSA mit Primzahlen gerechnet wird
* Mathematische Variablen werden mit dem `<i>`-Tag kursiv gesetzt


```
a{container de}
	<p>
		s{Als Ausgangspunkt für RSA wählt}
		s{man zwei Primzahlen }<i>p</i>s{ und}
		<i>q</i>s{.}
	</p>
x{container de}
```
* Die Beschreibung erwähnt die Variablen-Namen der Primzahlen

```
a{container en}
	<h2>Primes</h2>
x{container en}
```
* Die englische Seite enthält ebenfalls eine Überschrift

```
a{container en}
	<p>
		s{The security of RSA is based on}
		s{the fact that it is easy to}
		s{calculate the product }<i>n</i>
		s{of two large primes }<i>p</i>s{ and}
		<i>q</i>s{. However, it is very}
		s{difficult to determine only from}
		s{the product }<i>n</i>s{ the two}
		s{primes that yield the product.}
		s{This decomposition is also called}
		s{the factorization of} <i>n</i>.
	</p>
x{container en}
```
* Die englische Seite enthält die Übersetzung des ersten Absatzes

```
a{container en}
	<p>
		s{As a starting point for RSA choose}
		s{two primes }<i>p</i>s{ and }<i>q</i>s{.}
	</p>
x{container en}
```
* Die englische Seite enthält die Übersetzung des zweiten Absatzes

```
a{css}
	#rsa-container h2 {
		margin-top: 2em;
	}
x{css}
```
* Überschriften bekommen etwas mehr Abstand

```
a{container de}
	<form class="form-horizontal">
		e{primes de}
	</form>
x{container de}
```
* Die Eingabe-Elemente werden in einem Formular (dem `<form>`-Element)
  gekapselt

```
a{container en}
	<form class="form-horizontal">
		e{primes en}
	</form>
x{container en}
```
* Die englische Version unterscheidet sich nur in dem übersetzten
  Inhalt

```
d{primes de}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="prime-1">s{1. Primzahl}
			<i>p</i>s{ =}
		</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-1" value="11"></div>
	</div>
x{primes de}
```
* Die Formatierung des Eingabefeldes für die erste Primzahl mit Label
  wird von Bootstrap-Klassen erledigt
* Dieses Feld wird mit der kleinen Primzahl `11` initialisiert

```
a{primes de}
	<div id="err-p-not-prime"
		class=s{"row alert alert-danger }b{}s{hidden"}
	><i>p</i> s{ist keine Primzahl!}</div>
x{primes de}
```
* Zusätzlich gibt es eine Fehlermeldung,
* die aber anfangs nicht sichtbar ist

```
a{css}
	.hidden {
		display: none;
	}
x{css}
```
* Mit der `hidden`-Klasse können Elemente ausgeblendet werden

```
d{primes en}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="prime-1">s{1st prime}
			<i>p</i>s{ =}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-1" value="11"></div>
	</div>
x{primes en}
```
* Die englische Version hat ein andere Beschriftung

```
a{primes en}
	<div id="err-p-not-prime"
		class=s{"row alert alert-danger}b{}s{ hidden"}
	><i>p</i> s{is not prime!}</div>
x{primes en}
```
* und eine übersetzte Fehlermeldung

```
d{setup rsa}
	const f{queueRefresh} = event => {
		event.preventDefault();
		e{queue refresh};
	};
x{setup rsa}
```
* Wenn sich Textfelder ändern, muss der RSA-Algorithmus neu
  durchgeführt werden
* Dazu wird die Funktion `queueRefresh` verwendet
* Diese sorgt dafür, dass die Neuberechnung nicht zu häufig
  aufgerufen wird

```
a{setup rsa}
	const f{refresh} = () => {
		e{refresh};
	};
	refresh();
x{setup rsa}
```
* Wenn sich die Primzahl (oder andere Felder) ändern, muss der
  RSA-Algorithmus neu ausgeführt werden
* Beim Starten wird die Funktion aufgerufen, um alle Felder zu
  initialisieren

```
d{queue refresh}
	refresh();
x{queue refresh}
```
* In einer ersten Implementierung wird einfach nur die Funktion
  `refresh` aufgerufen
* Dieser Funktionsaufruf wird später durch eine aufwändigere
  Implementierung mit Timern ersetzt

```
D{globals}
	const f{$} = id => {
		return
			document.getElementById(id);
	};
x{globals}
```
* Hilfsfunktion, um ein Element im HTML Document Object Model (DOM) mit
  `id` zu ermitteln
* Der Name wurde von jQuery übernommen
* Es können jedoch nur Elemente nach ihrer ID aufgelöst werden

```
A{globals}
	const $prime1 = f{$}('prime-1');
	const $err_p_not_prime =
		f{$}('err-p-not-prime');
x{globals}
```
* Referenzen auf das Textfeld mit der ID `prime-1` und auf die dazu
  gehörende Fehlermeldung werden zwischengespeichert

```
a{setup rsa}
	$prime1.addEventListener(
		'input', f{queueRefresh}
	);
x{setup rsa}
```
* Wenn sich die Primzahl ändert, wird eine Neuberechnung angestoßen

```
d{refresh}
	const prime1 =
		bigInt($prime1.value);

	$err_p_not_prime.classList.toggle(
		'hidden',
		prime1.isProbablePrime()
	);
x{refresh}
```
* Der erste Primfaktor wird als Zeichenkette aus dem DOM-Modell gelesen
* Und in große Zahlen konvertiert
* Die Fehlermeldung wird sichtbar, wenn es sich vermutlich nicht um eine
  Primzahl handelt
* Die Entscheidung ist nicht sicher, aber dafür sehr schnell
* Wirkliche Auswirkungen hat es nicht, da trotzdem weiter gerechnet wird

```
a{primes de}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="prime-2">s{2.  Primzahl}
			<i>q</i>s{ =}
		</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-2" value="13"></div>
	</div>
x{primes de}
```
* Eingabefeld für die zweite Primzahl
* Auch diese wird mit einer kleinen Primzahl (`13`) initialisiert

```
a{primes de}
	<div id="err-q-not-prime"
		class=s{"row alert alert-danger}b{}s{ hidden"}
	><i>q</i>s{ ist keine Primzahl!}</div>
	<div id="err-p-equal-q"
		class=s{"row alert alert-danger}b{}s{ hidden"}
	><i>p</i>s{und} <i>q</i>
		s{sind nicht verschieden!}</div>
x{primes de}
```
* Für die zweite Primzahl gibt es nicht nur eine Fehlermeldung,
* denn die beiden Primzahlen dürfen nicht gleich sein

```
a{primes en}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="prime-2">s{2nd prime}
			<i>q</i>s{ =}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-2" value="13"></div>
	</div>
x{primes en}
```
* In der englischen Version wird eine andere Beschriftung verwendet

```
a{primes en}
	<div id="err-q-not-prime"
		class=s{"row alert alert-danger}b{}s{ hidden"}
	><i>q</i>s{ is not prime!}</div>
	<div id="err-p-equal-q"
		class=s{"row alert alert-danger}b{}s{ hidden"}
	><i>p</i>s{ and }<i>q</i>s{ are not}
		s{different!}</div>
x{primes en}
```
* Die Fehlermeldungen gibt es auch in der englischen Version

```
A{globals}
	const $prime2 = f{$}('prime-2');
	const $err_q_not_prime =
		f{$}('err-q-not-prime');
	const $err_p_equal_q =
		f{$}('err-p-equal-q');
x{globals}
```
* Referenzen auf die zweite Primzahl und die Fehlermeldungen werden
  gespeichert

```
a{setup rsa}
	$prime2.addEventListener(
		'input', f{queueRefresh}
	);
x{setup rsa}
```
* Bei einer Änderung der zweiten Primzahl wird ebenfalls eine
  Neuberechnung angestoßen

```
a{refresh}
	const prime2 =
		bigInt($prime2.value);

	$err_q_not_prime.classList.toggle(
		'hidden',
		prime2.isProbablePrime()
	);
x{refresh}
```
* Auch de zweite Primzahl wird ausgelesen
* Deren Fehlermeldung wird sichtbar, wenn es sich vermutlich nicht um
  eine Primzahl handelt

```
a{refresh}
	$err_p_equal_q.classList.toggle(
		'hidden',
		! prime1.equals(prime2)
	);
x{refresh}
```
* Eine dritte Fehlermeldung wird sichtbar, wenn die Primzahlen
  gleich sind

```
a{container de}
	<p>
		s{Damit der Algorithmus}
		s{funktioniert, müssen die beiden}
		s{Primzahlen verschieden sein.}
	</p>
x{container de}
```
* Es wird beschrieben, dass die Primzahlen verschieden sein müssen

```
a{container en}
	<p>
		s{For the algorithm to work, the two}
		s{primes must be different.}
	</p>
x{container en}
```
* Diese Beschreibung gibt es auch in der englischen Version

# 3. Öffentlicher Schlüssel
* Im zweiten Abschnitt der Seite wird zusätzlich der Exponent abgefragt

```
a{container de}
	<h2>s{Öffentlicher Schlüssel}</h2>
	<p>
		s{Das Produkt }<i>n</i>s{ wird im}
		s{RSA-Verfahren auch Modul genannt.}
	</p>
x{container de}
```
* Zuerst kommt eine allgemeine Beschreibung in der deutschen Version

```
a{container en}
	<h2>s{Public key}</h2>
	<p>
		s{The product }<i>n</i>s{ is also}
		s{called module in the RSA method.}
	</p>
x{container en}
```
* Und ebenso in der englischen Version

```
d{definition of n}
	<form class="form-horizontal">
		<div class="form-group">
			e{n elements}
		</div>
	</form>
x{definition of n}
```
* `n` ist das Produkt der beiden Primfaktoren
* Die Anzeige ist in der deutschen und englischen Version identisch
* Daher wird ein eigenes Fragment definiert

```
d{n elements}
	<label
		class="col-sm-3 control-label"
		v{for}="public-key"><i>n</i>s{ =}
			<i>p</i>s{ × }<i>q</i>s{ =}
	</label>
	<div class="col-sm-9"><p
		class="form-control-static"
		><span id="public-key"></span>
		s{(}<span id="public-key-length"
		></span> s{Bit)}</p></div>
x{n elements}
```
* Die Felder bilden ein eigenes Fragment
* um den Code übersichtlicher zu
  formatieren

```
a{container de}
	E{definition of n}
x{container de}
```
* Das Fragment wird in der deutschen Version verwendet

```
a{container en}
	E{definition of n}
x{container en}
```
* Und das Fragment wird in der englischen Version verwendet

```
A{globals}
	const $public_key =
		f{$}('public-key');
	const $public_key_length =
		f{$}('public-key-length');
x{globals}
```
* Referenzen auf den öffentlichen Schlüssel im DOM und dessen Länge
  werden im Code abgelegt

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
* Die Länge des Schlüssels kann die Integer-Bibliothek direkt liefern

```
a{container de}
	<p>
		s{Zur Demonstration beginnen wir mit}
		s{kleinen Primzahlen. Um die}
		s{Faktorisierung schwierig zu}
		s{gestalten, müssen die Primzahlen}
		s{viel größer gewählt werden.}
		s{Aktuell werden für eine sichere}
		s{Kommunikation Werte von }<i>n</i>
		s{mit mehreren tausend Binärstellen}
		s{verwendet.}
	</p>
x{container de}
```
* Auch wenn mit kleinen Primzahlen begonnen wird, müssen für ernste
  Anwendungen die Primzahlen groß sein

```
a{container en}
	<p>
		s{For demonstration we start with}
		s{small primes. To make the}
		s{factorization difficult, the}
		s{primes must be much larger.}
		s{Currently, values of }<i>n</i>s{ with}
		s{several thousand binary digits}
		s{are used for secure communication.}
	</p>
x{container en}
```
* Diesen Hinweis gibt es auch in der englischen Version.

```
a{container de}
	<p>
		s{Der öffentliche Schlüssel besteht}
		s{neben dem Modul} <i>n</i> s{noch aus}
		s{einem Exponenten} <i>e</i>s{.}
	</p>
x{container de}
```
* Auch der Exponent ist teil des öffentlichen Schlüssels

```
a{container en}
	<p>
		s{The public key consists of the}
		s{module} <i>n</i> s{and}
		s{an exponent} <i>e</i>s{.}
	</p>
x{container en}
```
* Das wird auch in der englischen Version beschrieben.

```
a{container de}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				v{for}="base"><i>e</i>s{ =}</label>
			<div class="col-sm-9"><input
				class="form-control" id="base"
				value="23"></div>
		</div>
		<div id="err-gcd-not-1"
			class="row alert alert-danger"
		><i>e</i> s{und} <i>φ(n)</i> s{sind nicht}
			s{teilerfremd.}</div>
	</form>
x{container de}
```
* In einem Textfeld kann das `e` geändert werden
* Zusätzlich gibt es eine Fehlermeldung, wenn das eingegebene `e` nicht
  teilerfremd zu `φ(n)` ist

```
a{container en}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				v{for}="base"><i>e</i>s{ =}</label>
			<div class="col-sm-9"><input
				class="form-control" id="base"
				value="23"></div>
		</div>
		<div id="err-gcd-not-1"
			class="row alert alert-danger"
		><i>e</i> s{and} <i>φ(n)</i> s{have a common}
			s{divisor, they are not coprime.}</div>
	</form>
x{container en}
```
* Das Textfeld gibt es ebenfalls in der englischen Version
* Ebenfalls mit der zugehörigen Fehlermeldung

```
A{globals}
	const $e = f{$}('base');
	const $err_gcd_not_1 =
		f{$}('err-gcd-not-1');
x{globals}
```
* In der Variable `$e` wird eine Referenz des Textfelds gespeichert
* Ebenso wird eine Referenz der Fehlermeldung gespeichert
* Ob die Fehlermeldung angezeigt wird kann erst entschieden werden,
  wenn `φ(n)` berechnet wurde

```
a{setup rsa}
	$e.addEventListener(
		'input', f{queueRefresh}
	);
x{setup rsa}
```
* Werden die Primzahlen oder der Exponent geändert, wird die
  Neuberechnung getriggert

```
a{refresh}
	const e = bigInt($e.value);
x{refresh}
```
* Liest den Wert von `e` aus dem DOM

```
a{container de}
	<p>
		s{Dieses} <i>e</i> s{kann sogar vorab}
		s{gewählt werden und für alle}
		s{Teilnehmer gleich sein.}
	</p>
x{container de}
```
* Ein Hinweis, dass `e` öffentlich gewählt werden kann, wird
  ausgegeben

```
a{container en}
	<p>
		s{This} <i>e</i> s{may even be}
		s{pre-selected and the same}
		s{for all participants.}
	</p>
x{container en}
```
* Auch in der englischen Version

# 4. Geheimer Schlüssel
* Beschreibt den nächsten Abschnitt in der HTML-Ausgabe
* und wie der geheime Schlüssel berechnet wird

```
a{container de}
	<h2>s{Geheimer Schlüssel}</h2>
	<p>
		s{RSA benutzt für die Berechnung des}
		s{geheimen Schlüssels die Eulersche}
		s{φ-Funktion von} <i>n</i>s{.}
		s{Diese ist definiert als}
	</p>
x{container de}
```
* Erklärt in der deutschen Version, wie der geheime Schlüssel berechnet
  wird

```
a{container en}
	<h2>s{Secret key}</h2>
	<p>
		s{RSA uses the Euler φ function}
		s{of} <i>n</i> s{to calculate the}
		s{secret key. This is defined as}
	</p>
x{container en}
```
* Das gleiche wird in der englischen Version ausgegeben

```
d{phi label}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				v{for}="phi">s{φ(}<i>n</i>s{) =}
				s{(}<i>p</i>s{ − 1) ×}
				s{(}<i>q</i>s{ − 1) =}</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="phi"></p></div>
		</div>
	</form>
x{phi label}
```
* Die Berechnung von φ enthält keinen deutschen oder englischen Text
* und kann daher für beide Lokalisierungen verwendet werden

```
a{container de}
	E{phi label}
x{container de}
```
* φ in der deutschen Version definieren

```
a{container en}
	E{phi label}
x{container en}
```
* φ in der englischen Version definieren

```
A{globals}
	const $phi = f{$}('phi');
x{globals}
```
* Eine Referenz auf den Wert der φ-Funktion wird im Code abgelegt

```
a{refresh}
	const one = f{bigInt}.one;
	const phi = prime1.subtract(one).
		multiply(prime2.subtract(one));
	$phi.innerText = phi.toString();
x{refresh}
```
* Nur wenn die Primzahlen verschieden sind, gilt diese Rechenvorschrift

```
A{globals}
	const f{gcd} = (a, b) => {
		g{gcd};
	};
x{globals}
```
* Um festzustellen, ob `e` und  `φ(n)` teilerfremd sind, wird der
  Erweiterte Euklidische Algorithmus verwendet
* Dieser liefert gleichzeitig noch das inverse Element `d`, das für den
  geheimen Schlüssel benötigt wird

```
i{gcd.x}
```
* Der Erweiterte Euklidische Algorithmus wird in einer eigenen Datei
  implementiert


```
a{refresh}
	const gcd_result = gcd(phi, e);
	$err_gcd_not_1.classList.toggle(
		'hidden', gcd_result.a.equals(one)
	);
x{refresh}
```
* Wenn `e` und der Wert der φ-Funktion nicht teilerfremd sind, wird
  eine entsprechende Fehlermeldung angezeigt
* Das Attribut `a` im `gcd_result` enthält den kleinsten gemeinsamen
  Teiler
* Dieser muss eins sein

```
a{container de}
	<p>
		s{Hier wird ausgenutzt, dass} <i>p</i> s{und}
		<i>q</i> s{verschieden sind. Andernfalls}
		s{würde sich die} s{φ-Funktion anders}
		s{berechnen.}
	</p><p>
		s{Wichtig ist für RSA, dass der Wert der}
		s{φ-Funktion teilerfremd zu} <i>e</i>
		s{ist (der größte gemeinsame Teiler also}
		s{1 ist).}
	</p>
x{container de}
```
* Einschränkungen bei der Berechnung von φ werden auf der deutschen
  Seite ausgegeben

```
a{container en}
	<p>
		s{The prerequisit here is that }<i>p</i>
		s{and} <i>q</i> s{are different. }
		s{Otherwise, the φ function would be}
		s{calculate d differently.}
	</p><p>
		s{It is important for RSA that the}
		s{value of the φ function is}
		s{coprime to} <i>e</i> s{(the largest}
		s{common divisor must be 1).}
	</p>
x{container en}
```
* Und auf der englischen Seite

```
a{container de}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				v{for}="gcd">s{ggT(}<i>e</i>s{,}
				s{φ(}<i>n</i>s{)) =}</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="gcd"></p></div>
		</div>
	</form>
x{container de}
```
* Der größte gemeinsame Teiler wird auf der deutschen Seite
  ausgegeben

```
a{container en}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				v{for}="gcd">s{gcd(}<i>e</i>s{,}
				s{φ(}<i>n</i>s{)) =}</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="gcd"></p></div>
		</div>
	</form>
x{container en}
```
* Und auf der englischen Seite

```
A{globals}
	const $gcd = f{$}('gcd');
x{globals}
```
* Eine Referenz auf das DOM-Element wird gesichert

```
a{refresh}
	$gcd.innerText =
		gcd_result.a.toString();
x{refresh}
```
* Und im `refresh` wird das Feld aktualisiert

```
a{container de}
	<p>
		s{Um den Wert von φ(}<i>n</i>s{) zu}
		s{bestimmen, reicht es nicht aus}
		<i>n</i> s{zu kennen. Nur mit der}
		s{Kenntnis von} <i>p</i> s{und} <i>q</i>
		s{kann man φ(}<i>n</i>s{) effizient}
		s{bestimmen.}
	</p><p>
		s{Der geheime Schlüssel besteht}
		s{aus einem }<i>d</i>s{ mit der}
		s{Eigenschaft, dass}
		<i>e</i>s{ × }<i>d</i>s{ − 1 ein Vielfaches}
		s{von φ(}<i>n</i>s{) ist.}
	</p>
x{container de}
```
* Es wird beschrieben wie der geheime Schlüssel berechnet wird

```
a{container de}
	<p>
		s{In Formeln ausgedrückt, muss gelten:}
	</p><p class="form">
		<i>e</i>s{ × }<i>d</i>s{ = 1}
		s{(mod φ(}<i>n</i>s{))}
	</p><p>
		s{Dabei ist mit dem mod-Ausdruck die}
		s{Gleichheit bezüglich einer Restklasse}
		s{gemeint. Es ist genau dann }<i>x</i>s{ =}
		<i>y</i>s{ (mod }<i>z</i>s{), wenn es ein}
		s{ganzzahliges }<i>a</i>s{ gibt mit}
		<i>x</i>s{ − }<i>y</i>s{ = }<i>z</i>
		s{× }<i>a</i>s{.}
	</p>
x{container de}
```
* Und wieso damit die Entschlüsselung funktioniert

```
a{container de}
	<p>
		s{Für die gewählten Werte von }<i>p</i>,
		<i>q</i>s{ und }<i>e</i>s{ ergibt sich}
		<i>d</i>s{ als:}
	</p>
x{container de}
```
* Dann wird der geheime Schlüssel ausgegeben

```
a{container en}
	<p>
		s{To determine the value of}
		s{φ(}<i>n</i>s{), it is not enough}
		s{to know} <i>n</i>s{. Only with the}
		s{knowledge of} <i>p</i> s{and} <i>q</i>
		s{we can efficiently determine}
		s{φ(}<i>n</i>s{).}
	</p><p>
		s{The secret key also consists of}
		s{a }<i>d</i>s{ with the}
		s{property that }<i>e</i>s{ ×}
		<i>d</i>s{ − 1 is a multiple of}
		s{φ(}<i>n</i>s{).}
	</p>
x{container en}
```
* Auch auf der englischen Seite wird beschrieben, wie der geheime
  Schlüssel berechnet wird

```
a{container en}
	<p>
		s{Expressed in formulas, the}
		s{following must apply:}
	</p><p class="form">
		<i>e</i>s{ × }<i>d</i>s{ = 1}
		s{(mod φ(}<i>n</i>s{))}
	</p>
x{container en}
```
* Ebenfalls mit der Formel-Darstellung

```
a{container en}
	<p>
		s{In this case, the mod expression means}
		s{equality with regard to a residual}
		s{class. It is }<i>x</i>s{ = }<i>y</i>s{ (mod}
		<i>z</i>s{) if and only if there is an}
		s{integer a with }<i>x</i>s{ −}
		<i>y</i>s{ = }<i>z</i>s{ × }<i>a</i>s{.}
	</p><p>
		s{For the chosen values of }<i>p</i>s{,}
		<i>q</i>s{, and }<i>e</i>s{, we get}
		<i>d</i>s{ as:}
	</p>
x{container en}
```
* Und warum das Ganze funktioniert
* Hier wird auf das nächste Ergebnis hingearbeitet

```
a{css}
	#rsa-container p.form {
		margin-left: 32px;
	}
x{css}
```
* Formeln werden etwas eingerückt

```
d{private key}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				v{for}="private-key"><i>d</i>
				s{=}
			</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="private-key"></div>
		</div>
	</form>
x{private key}
```
* Das Feld mit der Ausgabe des geheimen Schlüssels kann in der
  deutschen und englischen Version gemeinsam verwendet werden

```
a{container de}
	E{private key}
x{container de}
```
* Den geheimen Schlüssel in der deutschen Version ausgeben


```
a{container en}
	E{private key}
x{container en}
```
* Den geheimen Schlüssel in der englischen Version ausgeben

```
A{globals}
	const $private_key =
		f{$}('private-key');
x{globals}
```
* Die Referenz auf den geheimen Schlüssel wird in der Anwendung
  gespeichert

```
a{refresh}
	let private_key = gcd_result.v;
	const zero = f{bigInt}.zero;
	if (private_key.lesser(zero)) {
		private_key =
			private_key.add(phi);
	}
	$private_key.innerText =
		private_key.toString();
x{refresh}
```
* Der private Schlüssel ist das multiplikative Inverse modulo `φ(n)`
* Falls der Schlüssel negative ist, wird der Wert von `φ(n)` hinzu
  addiert

```
a{container de}
	<p>
		s{Dieses} <i>d</i> s{kann immer bestimmt}
		s{werden, wenn} <i>e</i> s{mit der oben}
		s{beschriebenen Einschränkung gewählt}
		s{wurde – bspw. mit dem Erweiterten}
		s{Euklidischen Algorithmus.}
	</p>
x{container de}
```
* Es wird beschrieben, wie der geheime Schlüssel gewählt wird

```
a{container en}
	<p>
		s{This} <i>d</i> s{can always be determined}
		s{(if} <i>e</i> s{was chosen with the}
		s{restriction described above)—for}
		s{example with the extended Euclidean}
		s{algorithm.}
	</p>
x{container en}
```
* Auch auf der englischen Seite wird die Beschreibung ausgegeben

# 5. Ver- und Entschlüsseln
* Endlich kommt die eigentliche Ver- und Entschlüsselung
* Durch die Vorarbeiten bleibt aber nicht mehr viel zu tun

```
a{container de}
	<h2>s{Ver- und Entschlüsseln}</h2>
	<p>
		s{Grundsätzlich werden bei diesem}
		s{Verfahren keine Texte, sondern nur}
		s{Zahlen ver- und entschlüsselt, die}
		s{zwischen 0 und }<i>n</i>s{ − 1 liegen.}
	</p>
x{container de}
```
* Hier wird beschrieben, was für Nachrichten verschlüsselt werden können

```
a{container de}
	<p>
		s{Um eine Nachricht} <i>m</i> s{mit dem}
		s{öffentlichen Schlüssel} (<i>n</i>,
		<i>e</i>) s{zu verschlüsseln, wird}
	</p><p class="form">
		<i>m&#39;</i>s{ :=}
			<i>m</i><sup><i>e</i></sup>
			s{(mod }<i>n</i>s{)}
	</p><p>
		s{berechnet.}
	</p>
x{container de}
```
* Das Verschlüsseln besteht aus einer Exponentiation
* Die Striche an den Variablen-Namen der Nachrichten werden durch
  HTML-Entitäten realisiert, um den Source Code Parser nicht
  durcheinander zu bringen

```
a{container de}
	<p>
		s{Das Entschlüsseln mit dem privaten}
		s{Schlüssel (}<i>n</i>s{, }<i>d</i>s{)}
		s{erfolgt analog mit}
	</p><p class="form">
		<i>m&#39;&#39;</i>s{ :=}
			s{(}<i>m&#39;</i>s{)}<sup><i>d</i></sup>
			s{(mod }<i>n</i>s{).}
	</p>
x{container de}
```
* Auch das Entschlüsseln ist eine Exponentiation

```
a{container de}
	<p>
		s{Damit ist}
	</p><p class="form">
		<i>m&#39;&#39;</i>s{ =}
			<i>m</i><sup><i>e</i>s{ ×}
			<i>d</i></sup>
			s{(mod }<i>n</i>s{).}
	</p>
x{container de}
```
* `m`-Strich wird durch `m` hoch `e` ersetzt

```
a{container de}
	<p>
		s{RSA nutzt die Eigenschaft aus, dass}
	</p><p class="form">
		<i>x</i><sup><i>a</i></sup>s{ =}
			<i>x</i><sup><i>b</i></sup>
			s{(mod }<i>n</i>s{)}
	</p><p>
		s{wenn}
	</p><p class="form">
		<i>a</i>s{ =}
			<i>b</i>s{ (mod φ(}<i>n</i>s{))}
	</p>
x{container de}
```
* Es wird kurz beschrieben, wann bei der Exponentiation das gleiche
  Ergebnis herauskommt

```
a{container de}
	<p>
		<i>e</i> s{und} <i>d</i> s{wurden passend}
		s{gewählt, dass}
	</p><p class="form">
		<i>m&#39;&#39;</i>s{ = }<i>m</i>s{.}
	</p><p>
		s{Die Reihenfolge spielt keine Rolle.}
		s{Man könnte auch erst eine Nachricht}
		s{mit dem privaten Schlüssel}
		s{potenzieren, und das Ergebnis dann}
		s{mit dem öffentlichen Schlüssel}
		s{potenzieren – das verwendet man}
		s{bei RSA-Signaturen.}
	</p>
x{container de}
```
* Damit kann die Entschlüsselung erklärt werden
* Es wird darauf hingewiesen, dass die Reihenfolge keine Rolle spielt

```
a{container en}
	<h2>s{Encryption and decryption}</h2>
	<p>
		s{Internally, this method works only with}
		s{numbers (no text), which are between 0}
		s{and} <i>n</i>s{ − 1.}
	</p><p>
		s{A message }<i>m</i>s{ (number) is}
		s{encrypted with the public key (}
		<i>n</i>s{,} <i>e</i>s{) by calculating:}
	</p><p class="form">
		<i>m&#39;</i>s{ :=}
			<i>m</i><sup><i>e</i></sup>
			s{(mod }<i>n</i>s{)}
	</p>
x{container en}
```
* Auch in der englischen Version wird beschrieben, wie die
  Verschlüsselung funktioniert

```
a{container en}
	<p>
		s{Decrypting with the private key}
		s{(}<i>n</i>s{, }<i>d</i>s{) is done}
		s{analogously with}
	</p><p class="form">
		<i>m&#39;&#39;</i>s{ :=}
			s{(}<i>m&#39;</i>s{)}<sup><i>d</i></sup>
			s{(mod }<i>n</i>s{).}
	</p><p>
		s{This is}
	</p><p class="form">
		<i>m&#39;&#39;</i>s{ =}
			<i>m</i><sup><i>e</i>s{ ×}
			<i>d</i></sup>s{ (mod }<i>n</i>s{).}
	</p>
x{container en}
```
* Und es wird beschrieben, wie die Entschlüsselung funktioniert

```
a{container en}
	<p>
		s{RSA exploits the property that}
	</p><p class="form">
		<i>x</i><sup><i>a</i></sup>s{ =}
			<i>x</i><sup><i>b</i></sup>
			s{(mod }<i>n</i>s{)}
	</p><p>
		s{if}
	</p><p class="form">
		<i>a</i>s{ =}
			<i>b</i>s{ (mod φ(}<i>n</i>s{))}
	</p>
x{container en}
```
* Ebenso wird beschrieben, wann die Exponentiation das gleiche
  Ergebnis liefern

```
a{container en}
	<p>
		s{As }<i>e</i>s{ and }<i>d</i>s{ were chosen}
		s{appropriately, it is}
	</p><p class="form">
		<i>m&#39;&#39;</i>s{ = }<i>m</i>s{.}
	</p><p>
		s{The order does not matter. You could}
		s{also first raise a message with the}
		s{private key, and then power up the}
		s{result with the public key—this}
		s{is what you use with RSA signatures.}
	</p>
x{container en}
```
* Und warum RSA damit funktioniert

# 6. Nachrichten
* In dieser Sektion wird beschrieben, wie de Nachrichten angezeigt
  und verarbeitet werden

```
a{container de}
	<h2>s{Nachrichten}</h2>
	<p>
		s{In den folgenden zwei Textboxen}
		s{können Sie sehen, wie das Ver-}
		s{und Entschlüsseln für konkrete}
		s{Eingaben (Zahlen) funktioniert.}
	</p>
	<form class="form-horizontal">
		e{crypt boxes de}
	</form>
x{container de}
```
* Hier werden die Nachrichten-Boxen erklärt

```
a{container en}
	<h2>s{Messages}</h2>
	<p>
		s{In the following two text boxes, you}
		s{can see how encryption and}
		s{decryption work for concrete inputs}
		s{(numbers).}
	</p>
	<form class="form-horizontal">
		e{crypt boxes en}
	</form>
x{container en}
```
* Auch in der englischen Version werden die Nachrichten-Boxen erklärt

```
d{crypt boxes de}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="public-key">s{Klartext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-message"
			value="7"></input></div>
	</div>
x{crypt boxes de}
```
* Die deutsche Geheimtext-Boxen besteht aus einem Textfeld mit dem
  Klartext

```
a{crypt boxes de}
	<div id="err-public-msg-too-big"
		class="row alert alert-danger">
		s{Die Klartextzahl ist zu groß.}
		s{Der maximale Wert ist}
		<span class="max-msg"></span>.
		s{Bitte wählen Sie größere Primzahlen.}
	</div>
x{crypt boxes de}
```
* Und es gibt eine Fehlermeldung, wenn die eingegebene Nachricht zu
  groß ist

```
a{crypt boxes de}
	E{crypt arrow}
x{crypt boxes de}
```
* Ein Pfeil zeigt die Richtung an, in die der Algorithmus gerade
  arbeitet
* Die Richtung kann durch Eingabe in die passenden Textfelder
  umgedreht werden

```
a{crypt boxes de}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="private-key"
		>s{Geheimtext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="public-message"
		></input></div>
	</div>
x{crypt boxes de}
```
* Ein weiteres Textfeld enthält den Geheimtext

```
a{crypt boxes de}
	<div id="err-private-msg-too-big"
		class="row alert alert-danger"
	>s{Die Geheimtextzahl ist zu groß.}
		s{Der maximale Wert ist}
		<span class="max-msg"></span>.
		s{Bitte wählen Sie größere}
		s{Primzahlen.}
	</div>
x{crypt boxes de}
```
* Auch hier gibt es eine Fehlermeldung, falls die eingegebene Zahl
  zu groß ist

```
d{crypt boxes en}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="public-key"
		>s{Plaintext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-message"
			value="7"></input></div>
	</div>
x{crypt boxes en}
```
* Auch in der englischen Version gibt es ein Textfeld mit dem Klartext

```
a{crypt boxes en}
	<div id="err-public-msg-too-big"
		class="row alert alert-danger"
	>s{Plaintext number too big. The}
		s{maximum value is}
		<span class="max-msg"></span>s{.}
		s{Please choose bigger}
		s{primes.}</div>
x{crypt boxes en}
```
* Und eine Fehlermeldung, wenn der Klartext zu groß ist

```
a{crypt boxes en}
	E{crypt arrow}
x{crypt boxes en}
```
* In beiden Sprachen kann der gleiche Pfeil verwendet werden, der die
  Richtung des Algorithmus anzeigt

```
a{crypt boxes en}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			v{for}="private-key"
		>s{Ciphertext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="public-message"
		></input></div>
	</div>
x{crypt boxes en}
```
* Auch gibt es wieder ein Feld mit dem Geheimtext

```
a{crypt boxes en}
	<div id="err-private-msg-too-big"
		class="row alert alert-danger"
	>s{Ciphertext number too big. The}
		s{maximum value is}
		<span class="max-msg"></span>s{.}
		s{Please choose bigger}
		s{primes.}</div>
x{crypt boxes en}
```
* Und eine Fehlermeldung, falls der Geheimtext zu groß ist

```
d{crypt arrow}
	<div class="row">
		<div id="direction">
			<svg viewbox="0 0 50 50"
				width="50" height="50">
				<polyline points=s{"0,20}b{}s{ 15,20 15,0 35,0 35,20 50,20 25,50"}
				></polyline>
			</svg>
		</div>
	</div>
x{crypt arrow}
```
* Der Pfeil ist eine einfache SVG-Grafik
* Durch CSS-Klassen kann er rotiert werden

```
a{css}
	#direction svg {
		display: block;
		margin: 1em auto 2em auto;
	}
x{css}
```
* Der Pfeil wird als eigener Block angezeigt
* Er wird mittig positioniert und bekommt oben und unten feste Abstände

```
a{css}
	#direction svg polyline {
		fill: #888;
	}
x{css}
```
* Die Füllfarbe des Pfeils wird auch im CSS gesetzt

```
A{globals}
	const $max_msgs =
		document.getElementsByClassName(
			'max-msg'
		);
x{globals}
```
* In den Fehlermeldungen gibt es Elemente, die die größte mögliche
  Nachricht anzeigen
* Sie sind mit der Klasse `max-msg` markiert
* Alle diese Elemente werden in der Variable `$max_msgs` gesammelt

```
a{refresh}
	const max_msg =
		public_key.subtract(one).toString();
x{refresh}
```
* Die größte mögliche Nachricht ist um eins kleiner als der öffentliche
  Schlüssel

```
a{refresh}
	for (
		let i = 0; i < $max_msgs.length; ++i
	) {
		$max_msgs[i].innerText = max_msg;
	}
x{refresh}
```
* Die Felder in den Fehlermeldungen werden beim `refresh` auf den
  korrekten Wert gesetzt

```
A{globals}
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
* Die Referenzen auf DOM-Elemente für Klartext und Geheimtext werden in
  Variablen abgelegt
* Ebenso die Referenzen auf die Fehlermeldungen

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
* Wenn der Klartext oder der Geheimtext geändert wird, wird zusätzlich
  die Richtung des Algorithmus angepasst

```
A{globals}
	let encrypt = true;
x{globals}
```
* Der Algorithmus kann sowohl ver- als auch entschlüsseln
* Die Variable `encrypt` bestimmt die Richtung in die der Algorithmus
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
* Je nach Richtung in die der Algorithmus arbeiten soll, wird
  entweder der Klartext verschlüsselt
* oder der Geheimtext entschlüsselt

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
* Beim Entschlüsseln gibt es eine analoge Fehlermeldung, die beim
  Verschlüsseln immer ausgeblendet ist

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
  modulo `n` (dem öffentlichen Schlüssel)

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
  Entschlüsseln immer ausgeblendet ist

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

# 7. Richtung des Algorithmus anzeigen
* Es gibt ein Element auf der Web-Seite, das die Ablaufrichtung des
  Algorithmus anzeigt
* Also, ob der Algorithmus ver- oder entschlüsselt

```
A{globals}
	const $direction =
		f{$}('direction');
x{globals}
```
* Dieses Element zeigt die Richtung an, in der der Algorithmus läuft
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

```
a{css}
	@keyframes flip {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(180deg);
		}
	}
x{css}
```
* Die `flip`-Animation dreht den Pfeil um 180 Grad

```
a{css}
	#direction.flip svg {
		animation-name: flip;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
x{css}
```
* Wird die `flip`-Klasse auf dem `direction`-Element gesetzt, dann
  startet die `flip`-Animation auf dem Pfeil

```
a{css}
	@keyframes flop {
		from {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(0deg);
		}
	}
x{css}
```
* Die `flop`-Animation dreht den Pfeil zurück

```
a{css}
	#direction.flop svg {
		animation-name: flop;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
x{css}
```
* Wenn die `flop`-Klasse auf dem `direction`-Element gesetzt wird,
  wird die `flop`-Animation auf dem Pfeil gestartet

# 8. Timer
* Das Berechnen von RSA kann bei sehr großen Zahlen etwas dauern
* Daher wird nicht mit jeder Änderung eine neue Berechnung gestartet
* Nur wenn nach der letzten Änderung ein gewisses Zeitintervall
  verstrichen ist, wird die Berechnung gestartet

```
A{globals}
	let timer;
x{globals}
```
* Der Timer wird global vorgehalten

```
A{globals}
	const f{resetTimer} = () => {
		timer = null;
	};
x{globals}
```

```
r{queue refresh}
	let f{fn} = f{refresh};
	if (! timer) {
		refresh();
		f{fn} = f{resetTimer};
	} else {
		clearTimeout(timer);
		e{set fields to pending};
	}
	timer = setTimeout(f{fn}, 500);
x{queue refresh}
```
* Wenn es noch keine Änderung gab, wird die Änderung sofort
  durchgeführt
* Und nach Ablauf des Timers wird keine Neuberechnung durchgeführt
* Ansonsten werden die Felder mit Platzhaltern befüllt und der
  bestehende Timer gelöscht
* Dann wird ein neuer Timer gestartet, der die Berechnung triggert
* Der Timeout beträgt eine halbe Sekunde

```
a{refresh}
	resetTimer();
x{refresh}
```
* Nach der Neuberechnung wird der Timer zurückgesetzt

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

# 9. Schlussbemerkung
* Ein paar Kleinigkeiten gibt es noch, um die Web-App fertig
  zu stellen

```
a{container de}
	<h2>s{Verwendete Bibliothek}</h2>
	<p>
		s{Diese Seite verwendet für die}
		s{Rechnung mit großen Zahlen die}
		s{Bibliothek}
		<a href=s{"https://peterolson.github.}b{}s{com/BigInteger.js/"}
		>s{BigInteger.js}</a>.
	</p>
x{container de}
```
* In der deutschen Version werden die verwendete Bibliothek
  erwähnt

```
a{container de}
	<p>
		s{Dadurch kann man auch in JavaScript}
		s{mit beliebig großen Zahlen rechnen,}
		s{also auch solchen, die real bei}
		s{RSA-Anwendungen verwendet werden.}
	</p>
x{container de}
```
* und was mit ihr berechnet wird

```
a{container en}
	<h2>s{Used library}</h2>
	<p>
		s{This page uses the library}
		<a href=s{"https://peterolson.github.}b{}s{com/BigInteger.js/"}>BigInteger.js</a>
		s{to work with big numbers.}
	</p><p>
		s{As a result, you can calculate}
		s{arbitrarily large numbers in}
		s{JavaScript, even those that are}
		s{actually used in RSA}
		s{applications.}
	</p>
x{container en}
```
* Das Gleiche gibt es auch für die englische Version

```
a{container de}
	<div id="authors"><em>s{CTOAUTHORS:}
		s{Timm Knape (Dank an Bernhard Esslinger}
			s{für das Review)}</em></div>
x{container de}
```
* Die Seite endet mit dem Autor-Tag

```
a{container en}
	<div id="authors"><em>s{CTOAUTHORS: Timm}
		s{Knape (thanks to Bernhard Esslinger}
		s{for the review)}</em></div>
x{container en}
```
* Auch in der englischen Version gibt es das Autor-Tag

```
a{css}
	#authors {
		margin-top: 40px;
	}
x{css}
```
* Das Autor-Tag wird etwas vom restlichen Text abgesetzt

```
d{bootstrap stylesheets}
	<link 
		rel="stylesheet"
		href=s{"https://maxcdn.bootstrapcdn.com}b{}s{/bootstrap/3.3.7/css/bootstrap.min.css"}
		integrity=s{"sha384-BVYiiSIFeK1dGmJRAky}b{}s{cuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"}
		crossorigin="anonymous"
	>
x{bootstrap stylesheets}
```
* Die Bootstrap-CSSs werden direkt von einem Content Delivery Network
  eingebunden
* Dies wird nur für den Test verwendet und nicht für die produktive
  Version

```
a{bootstrap stylesheets}
	<link
		rel="stylesheet"
		href=s{"https://maxcdn.bootstrapcdn.com}b{}s{/bootstrap/3.3.7/css/bootstrap-theme.min.css"}
		integrity=s{"sha384-rHyoN1iRsVXV4nD0Jut}b{}s{lnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"}
		crossorigin="anonymous"
	>
x{bootstrap stylesheets}
```
* Auch das Bootstrap-Thema wird von einem Content Delivery Network
  eingebunden
* Auch dies wird nur für die lokale und nicht für die produktive Version
  verwendet

