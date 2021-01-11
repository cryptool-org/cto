# RSA-Implementierung in JavaScript
* Dieses Dokument beschreibt eine vollständige Implementierung des
  RSA-Algorithmus als Web-App
* Sowohl der JavaScript-Code, als auch HTML und CSS können aus diesem
  Dokument mit dem Hex-Toolkit (https://github.com/itmm/hex/) generiert
  werden

# 1. Datei-Struktur
* Dieser Abschnitt beschreibt die Dateien, die benötigt werden
* Und wie sie aufgebaut werden

```
@def(file: index-de.html)
	<!doctype html>
	<html>
		<head>
			@mul(header)
		</head>
		<body>
			@mul(rsa de)
			@mul(scripts)
		</body>
	</html>
@end(file: index-de.html)
```
* Die Datei `index-de.html` enthält die RSA-Steuerung in Deutsch
* Header- und Script-Fragmente werden mit der englischen Version geteilt
* Das Fragment `@s(rsa de)` wird für unsere Webseite in eine eigene Datei
  zusätzlich ausgelagert

```
@def(file: index-en.html)
	<!doctype html>
	<html>
		<head>
			@mul(header)
		</head>
		<body>
			@mul(rsa en)
			@mul(scripts)
		</body>
	</html>
@end(file: index-en.html)
```
* Die englische Webseite verwendet statt der deutschen Version das
  Fragment `@s(rsa en)`
* Der Rest ist identisch

```
@def(file: ../_ctoApps/rsa/rsa-de.html)
	@mul(rsa de)
@end(file: ../_ctoApps/rsa/rsa-de.html)
```
* Die Datei `rsa-de.html` enthält die deutsche GUI ohne Webseiten-Rahmen
* Diese Datei wird direkt im Ziel-Ordner erzeugt

```
@def(file: ../_ctoApps/rsa/rsa-en.html)
	@mul(rsa en)
@end(file: ../_ctoApps/rsa/rsa-en.html)
```
* Die Datei `rsa-en.html` enthält die englische GUI ohne Webseiten-Rahmen

```
@def(header)
	<title>RSA-js</title>
	<meta charset="utf-8">
	@put(bootstrap stylesheets)
	<link rel="stylesheet"
		href="../_ctoApps/rsa/rsa.css"
	>
@end(header)
```
* Im HTML-Header wird die Zeichen-Kodierung auf UTF-8 gestellt
* Die Bootstrap-Stylesheets werden eingebunden
* Das App-spezifische Stylesheet `@s(rsa.css)` wird eingebunden

```
@def(file: ../_ctoApps/rsa/rsa.css)
	@put(css)
@end(file: ../_ctoApps/rsa/rsa.css)
```
* Das Stylesheet enthält ein Fragment `@s(css)`
* Wenn neue HTML-Elemente eine CSS-Anpassung benötigen, werden diese
  hier eingepflegt

```
@def(scripts)
	<script
		src=@s("../_ctoApps/rsa/)@b()
			@s(BigInteger.min.js")
	></script>
	<script
		src="../_ctoApps/rsa/rsa.js"
	></script>
@end(scripts)
```
* Neben dem spezifischen JavaScript wird noch eine Bibliothek für das
  Rechnen mit großen Zahlen eingebunden

```
@def(file: ../_ctoApps/rsa/rsa.js)
	"use strict";
	window.addEventListener(
		'load',
		() => {
			@Put(globals);
			@put(setup rsa);
		}
	);
@end(file: ../_ctoApps/rsa/rsa.js)
```
* Das Skript `@s(rsa.js)` wird mit strenger Typ-Prüfung ausgeführt
* Der gesamte Code wird abgearbeitet, nachdem die Webseite vollständig
  geladen wurde
* Der gesamte Code wird innerhalb einer JavaScript-Funktion definiert
* Dadurch entstehen keine neuen globalen Objekte

```
@def(rsa de)
	<div id="rsa-container"
		class="container">
		@put(container de)
	</div>
@end(rsa de)
```
* Alle HTML-Elemente des RSA-Algorithmus sind in einem eigenen
  `<div>`-Tag gekapselt
* Dadurch können Stylesheet-Anpassungen auf RSA-Elemente beschränkt
  werden

```
@def(rsa en)
	<div id="rsa-container"
		class="container">
		@put(container en)
	</div>
@end(rsa en)
```
* Die englische Variante bindet ein anderes Fragment ein

```
@def(container de)
	<p>
		@s(Dieses Modul demonstriert)
		@s(schrittweise die Ver- und)
		@s(Entschlüsselung mit dem)
		@s(RSA-Verfahren. Der Sender)
		@s(verwendet dabei zum Verschlüsseln)
		@s(den öffentlichen Schlüssel des)
		@s(Empfängers; der Empfänger)
		@s(verwendet zum Entschlüsseln)
		@s(seinen zugehörigen privaten)
		@s(Schlüssel.)
	</p>
@end(container de)
```
* Die Seite beginnt mit einer kurzen Beschreibung

```
@def(container en)
	<p>
		@s(This module demonstrates)
		@s(step-by-step encryption and)
		@s(decryption with the RSA method.)
		@s(The sender uses the public key of)
		@s(the recipient for encryption;)
		@s(the recipient uses his associated)
		@s(private key to decrypt.)
	</p>
@end(container en)
```
* Die englische Seite beginnt mit der gleichen Beschreibung

```
@def(css)
	#rsa-container p {
		margin: 0 0 10px 0;
	}
@end(css)
```
* Für Absätze wird der Abstand auf `0` Pixel gesetzt
* Nur der untere Abstand wird auf `10` Pixel gesetzt

# 2. Primfaktoren eingeben
* Dieser Abschnitt beschreibt, wie die Primzahlen eingegeben und geändert
  werden können

```
@add(container de)
	<h2>@s(Primzahlen)</h2>
@end(container de)
```
* Die HTML-Seite beginnt mit dem Kapitel über Primzahlen

```
@add(container de)
	<p>
		@s(Die Sicherheit von RSA basiert)
		@s(darauf, dass es zwar einfach ist,)
		@s(das Produkt )<i>n</i>@s( zweier großer)
		@s(Primzahlen )<i>p</i>@s( und )<i>q</i>
		@s(zu berechnen. Es ist jedoch sehr)
		@s(schwer, nur aus dem Produkt)
		<i>n</i>@s( die beiden Primzahlen zu)
		@s(bestimmen, die das Produkt)
		@s(ergeben. Dieses Zerlegen nennt man)
		@s(auch das Faktorisieren von)
		<i>n</i>@s(.)
	</p>
@end(container de)
```
* Die Seite beschreibt, warum bei RSA mit Primzahlen gerechnet wird
* Mathematische Variablen werden mit dem `<i>`-Tag kursiv gesetzt


```
@add(container de)
	<p>
		@s(Als Ausgangspunkt für RSA wählt)
		@s(man zwei Primzahlen )<i>p</i>@s( und)
		<i>q</i>@s(.)
	</p>
@end(container de)
```
* Die Beschreibung erwähnt die Variablen-Namen der Primzahlen

```
@add(container en)
	<h2>Primes</h2>
@end(container en)
```
* Die englische Seite enthält ebenfalls eine Überschrift

```
@add(container en)
	<p>
		@s(The security of RSA is based on)
		@s(the fact that it is easy to)
		@s(calculate the product )<i>n</i>
		@s(of two large primes )<i>p</i>@s( and)
		<i>q</i>@s(. However, it is very)
		@s(difficult to determine only from)
		@s(the product )<i>n</i>@s( the two)
		@s(primes that yield the product.)
		@s(This decomposition is also called)
		@s(the factorization of) <i>n</i>.
	</p>
@end(container en)
```
* Die englische Seite enthält die Übersetzung des ersten Absatzes

```
@add(container en)
	<p>
		@s(As a starting point for RSA choose)
		@s(two primes )<i>p</i>@s( and )<i>q</i>@s(.)
	</p>
@end(container en)
```
* Die englische Seite enthält die Übersetzung des zweiten Absatzes

```
@add(css)
	#rsa-container h2 {
		margin-top: 2em;
	}
@end(css)
```
* Überschriften bekommen etwas mehr Abstand

```
@add(container de)
	<form class="form-horizontal">
		@put(primes de)
	</form>
@end(container de)
```
* Die Eingabe-Elemente werden in einem Formular (dem `<form>`-Element)
  gekapselt

```
@add(container en)
	<form class="form-horizontal">
		@put(primes en)
	</form>
@end(container en)
```
* Die englische Version unterscheidet sich nur in dem übersetzten
  Inhalt

```
@def(primes de)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="prime-1">@s(1. Primzahl)
			<i>p</i>@s( =)
		</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-1" value="11"></div>
	</div>
@end(primes de)
```
* Die Formatierung des Eingabefeldes für die erste Primzahl mit Label
  wird von Bootstrap-Klassen erledigt
* Dieses Feld wird mit der kleinen Primzahl `11` initialisiert

```
@add(primes de)
	<div id="err-p-not-prime"
		class=@s("row alert alert-danger )@b()
			@s(hidden")
	><i>p</i> @s(ist keine Primzahl!)</div>
@end(primes de)
```
* Zusätzlich gibt es eine Fehlermeldung,
* die aber anfangs nicht sichtbar ist

```
@add(css)
	.hidden {
		display: none;
	}
@end(css)
```
* Mit der `hidden`-Klasse können Elemente ausgeblendet werden

```
@def(primes en)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="prime-1">@s(1st prime)
			<i>p</i>@s( =)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-1" value="11"></div>
	</div>
@end(primes en)
```
* Die englische Version hat eine andere Beschriftung

```
@add(primes en)
	<div id="err-p-not-prime"
		class=@s("row alert alert-danger )@b()
			@s(hidden")
	><i>p</i> @s(is not prime!)</div>
@end(primes en)
```
* und eine übersetzte Fehlermeldung

```
@def(setup rsa)
	const @f(queueRefresh) = event => {
		event.preventDefault();
		@put(queue refresh);
	};
@end(setup rsa)
```
* Wenn sich Textfelder ändern, muss der RSA-Algorithmus neu
  ausgeführt werden
* Dazu wird die Funktion `queueRefresh` verwendet
* Diese sorgt dafür, dass die Neuberechnung nicht zu häufig
  aufgerufen wird

```
@add(setup rsa)
	const @f(refresh) = () => {
		@put(refresh);
	};
	refresh();
@end(setup rsa)
```
* Wenn sich die Primzahl (oder andere Felder) ändern, muss der
  RSA-Algorithmus neu ausgeführt werden
* Beim Starten wird die Funktion `@f(refresh)` aufgerufen, um alle Felder
  zu initialisieren

```
@def(queue refresh)
	refresh();
@end(queue refresh)
```
* In einer ersten Implementierung wird einfach nur die Funktion
  `refresh` aufgerufen
* Dieser Funktionsaufruf wird später durch eine aufwändigere
  Implementierung mit Timern ersetzt

```
@Def(globals)
	const @f($) = id => {
		return (
			document.getElementById(id)
		);
	};
@end(globals)
```
* Hilfsfunktion, um ein Element im HTML Document Object Model (DOM) mit
  `id` zu ermitteln
* Der Name wurde von jQuery übernommen
* Elemente können nur nach ihrer ID aufgelöst werden, nicht nach anderen
  XPath-Ausdrücken, die jQuery anbietet

```
@Add(globals)
	const $prime1 = @f($)('prime-1');
	const $err_p_not_prime =
		@f($)('err-p-not-prime');
@end(globals)
```
* Referenzen auf das Textfeld mit der ID `@v(prime-1)` und auf die dazu
  gehörende Fehlermeldung werden zwischengespeichert

```
@add(setup rsa)
	$prime1.addEventListener(
		'input', @f(queueRefresh)
	);
@end(setup rsa)
```
* Wenn sich die Primzahl ändert, wird eine Neuberechnung angestoßen

```
@def(refresh)
	const prime1 =
		bigInt($prime1.value);

	$err_p_not_prime.classList.toggle(
		'hidden',
		prime1.isProbablePrime()
	);
@end(refresh)
```
* Der erste Primfaktor wird als Zeichenkette aus dem DOM-Modell gelesen
* und in große Zahlen konvertiert
* Die Fehlermeldung wird sichtbar, wenn es sich vermutlich nicht um eine
  Primzahl handelt
* Die Entscheidung ist nicht sicher, aber dafür sehr schnell
* Wirkliche Auswirkungen hat es nicht, da trotzdem weiter gerechnet wird

```
@add(primes de)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="prime-2">@s(2.  Primzahl)
			<i>q</i>@s( =)
		</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-2" value="13"></div>
	</div>
@end(primes de)
```
* Eingabefeld für die zweite Primzahl
* Auch diese wird mit einer kleinen Primzahl (`13`) initialisiert

```
@add(primes de)
	<div id="err-q-not-prime"
		class=@s("row alert alert-danger )@b()
			@s(hidden")
	><i>q</i> @s( ist keine Primzahl!)</div>
	<div id="err-p-equal-q"
		class=@s("row alert alert-danger )@b()
			@s(hidden")
	><i>p</i>@s(und) <i>q</i>
		@s(sind nicht verschieden!)</div>
@end(primes de)
```
* Für die zweite Primzahl gibt es nicht nur eine Fehlermeldung,
* denn die beiden Primzahlen dürfen nicht gleich sein

```
@add(primes en)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="prime-2">@s(2nd prime)
			<i>q</i>@s( =)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-2" value="13"></div>
	</div>
@end(primes en)
```
* In der englischen Version wird eine andere Beschriftung verwendet

```
@add(primes en)
	<div id="err-q-not-prime"
		class=@s("row alert alert-danger )@b()
			@s(hidden")
	><i>q</i>@s( is not prime!)</div>
	<div id="err-p-equal-q"
		class=@s("row alert alert-danger )@b()
			@s(hidden")
	><i>p</i>@s( and )<i>q</i>@s( are not)
		@s(different!)</div>
@end(primes en)
```
* Die Fehlermeldungen gibt es auch in der englischen Version

```
@Add(globals)
	const $prime2 = @f($)('prime-2');
	const $err_q_not_prime =
		@f($)('err-q-not-prime');
	const $err_p_equal_q =
		@f($)('err-p-equal-q');
@end(globals)
```
* Referenzen auf die zweite Primzahl und die Fehlermeldungen werden
  gespeichert

```
@add(setup rsa)
	$prime2.addEventListener(
		'input', @f(queueRefresh)
	);
@end(setup rsa)
```
* Bei einer Änderung der zweiten Primzahl wird ebenfalls eine
  Neuberechnung angestoßen

```
@add(refresh)
	const prime2 =
		bigInt($prime2.value);

	$err_q_not_prime.classList.toggle(
		'hidden',
		prime2.isProbablePrime()
	);
@end(refresh)
```
* Auch die zweite Primzahl wird ausgelesen
* Deren Fehlermeldung wird sichtbar, wenn es sich vermutlich nicht um
  eine Primzahl handelt

```
@add(refresh)
	$err_p_equal_q.classList.toggle(
		'hidden',
		! prime1.equals(prime2)
	);
@end(refresh)
```
* Eine dritte Fehlermeldung wird sichtbar, wenn die Primzahlen
  gleich sind

```
@add(container de)
	<p>
		@s(Damit der Algorithmus)
		@s(funktioniert, müssen die beiden)
		@s(Primzahlen verschieden sein.)
	</p>
@end(container de)
```
* Es wird beschrieben, dass die Primzahlen verschieden sein müssen

```
@add(container en)
	<p>
		@s(For the algorithm to work, the two)
		@s(primes must be different.)
	</p>
@end(container en)
```
* Diese Beschreibung gibt es auch in der englischen Version

# 3. Öffentlicher Schlüssel
* Im zweiten Abschnitt der Seite wird zusätzlich der Exponent abgefragt

```
@add(container de)
	<h2>@s(Öffentlicher Schlüssel)</h2>
	<p>
		@s(Das Produkt )<i>n</i>@s( wird im)
		@s(RSA-Verfahren auch Modul genannt.)
	</p>
@end(container de)
```
* Zuerst kommt eine allgemeine Beschreibung in der deutschen Version

```
@add(container en)
	<h2>@s(Public key)</h2>
	<p>
		@s(The product )<i>n</i>@s( is also)
		@s(called module in the RSA method.)
	</p>
@end(container en)
```
* Und ebenso in der englischen Version

```
@def(definition of n)
	<form class="form-horizontal">
		<div class="form-group">
			@put(n elements)
		</div>
	</form>
@end(definition of n)
```
* `n` ist das Produkt der beiden Primfaktoren
* Die Anzeige ist in der deutschen und englischen Version identisch
* Daher wird ein eigenes Fragment definiert

```
@def(n elements)
	<label
		class="col-sm-3 control-label"
		@v(for)="public-key"><i>n</i>@s( =)
			<i>p</i>@s( × )<i>q</i>@s( =)
	</label>
	<div class="col-sm-9"><p
		class="form-control-static"
		><span id="public-key"></span>
		@s(()<span id="public-key-length"
		></span> @s(Bit@))</p></div>
@end(n elements)
```
* Die Felder bilden ein eigenes Fragment,
* um den Code übersichtlicher zu
  formatieren

```
@add(container de)
	@mul(definition of n)
@end(container de)
```
* Das Fragment wird in der deutschen Version verwendet

```
@add(container en)
	@mul(definition of n)
@end(container en)
```
* Und das Fragment wird in der englischen Version verwendet

```
@Add(globals)
	const $public_key =
		@f($)('public-key');
	let public_key;
	const $public_key_length =
		@f($)('public-key-length');
@end(globals)
```
* Referenzen auf den öffentlichen Schlüssel im DOM und dessen Länge
  werden im Code abgelegt

```
@add(refresh)
	public_key =
		prime1.multiply(prime2);
	$public_key.innerText =
		public_key.toString();
	$public_key_length.innerText =
		public_key.bitLength();
@end(refresh)
```
* Der öffentliche Schlüssel ist das Produkt der beiden Primzahlen
* Die Länge des Schlüssels kann die Integer-Bibliothek direkt liefern

```
@add(container de)
	<p>
		@s(Zur Demonstration beginnen wir mit)
		@s(kleinen Primzahlen. Um die)
		@s(Faktorisierung schwierig zu)
		@s(gestalten, müssen die Primzahlen)
		@s(viel größer gewählt werden.)
		@s(Aktuell werden für eine sichere)
		@s(Kommunikation Werte von )<i>n</i>
		@s(mit mehreren tausend Binärstellen)
		@s(verwendet.)
	</p>
@end(container de)
```
* Auch wenn mit kleinen Primzahlen begonnen wird, müssen für ernste
  Anwendungen die Primzahlen groß sein

```
@add(container en)
	<p>
		@s(For demonstration we start with)
		@s(small primes. To make the)
		@s(factorization difficult, the)
		@s(primes must be much larger.)
		@s(Currently, values of )<i>n</i>@s( with)
		@s(several thousand binary digits)
		@s(are used for secure communication.)
	</p>
@end(container en)
```
* Diesen Hinweis gibt es auch in der englischen Version.

```
@add(container de)
	<p>
		@s(Der öffentliche Schlüssel besteht)
		@s(neben dem Modul) <i>n</i> @s(noch aus)
		@s(einem Exponenten) <i>e</i>@s(.)
	</p>
@end(container de)
```
* Auch der Exponent `e` ist Teil des öffentlichen Schlüssels

```
@add(container en)
	<p>
		@s(The public key consists of the)
		@s(module) <i>n</i> @s(and)
		@s(an exponent) <i>e</i>@s(.)
	</p>
@end(container en)
```
* Das wird auch in der englischen Version beschrieben.

```
@add(container de)
	<form class="form-horizontal">
		<div class="form-group">
			@mul(e group)
		</div>
		<div id="err-gcd-not-1"
			class="row alert alert-danger"
		><i>e</i> @s(und) <i>@f(φ)(n)</i>
			@s(sind nicht)
			@s(teilerfremd.)</div>
	</form>
@end(container de)
```
* In einem Textfeld kann das `e` geändert werden
* Zusätzlich gibt es eine Fehlermeldung, wenn das eingegebene `e` nicht
  teilerfremd zu `@f(φ)(n)` ist

```
@def(e group)
	<label
		class="col-sm-3 control-label"
		@v(for)="base"><i>e</i>
		@s(=)</label>
	<div class="col-sm-9"><input
		class="form-control"
		id="base" value="23"></div>
@end(e group)
```
* Die Felder enthalten keinen deutschen oder englischen Text
* und können für beide Sprachen verwendet werden

```
@add(container en)
	<form class="form-horizontal">
		<div class="form-group">
			@mul(e group)
		</div>
		<div id="err-gcd-not-1"
			class="row alert alert-danger"
		><i>e</i>@s( and )<i>@f(φ)(n)</i>
			@s(have a common divisor,)
			@s(they are not coprime.)</div>
	</form>
@end(container en)
```
* Das Textfeld gibt es ebenfalls in der englischen Version
* Ebenfalls mit der zugehörigen Fehlermeldung

```
@Add(globals)
	const $e = @f($)('base');
	const $err_gcd_not_1 =
		@f($)('err-gcd-not-1');
@end(globals)
```
* In der Variable `$e` wird eine Referenz des Textfelds gespeichert
* Ebenso wird eine Referenz der Fehlermeldung gespeichert
* Ob die Fehlermeldung angezeigt wird, kann erst entschieden werden,
  wenn `@f(φ)(n)` berechnet wurde

```
@add(setup rsa)
	$e.addEventListener(
		'input', @f(queueRefresh)
	);
@end(setup rsa)
```
* Werden die Primzahlen oder der Exponent `e` geändert, wird die
  Neuberechnung getriggert

```
@add(refresh)
	const e = bigInt($e.value);
@end(refresh)
```
* Liest den Wert von `e` aus dem DOM

```
@add(container de)
	<p>
		@s(Dieses) <i>e</i> @s(kann sogar vorab)
		@s(gewählt werden und für alle)
		@s(Teilnehmer gleich sein.)
	</p>
@end(container de)
```
* Ein Hinweis, dass `e` öffentlich gewählt werden kann, wird
  ausgegeben

```
@add(container en)
	<p>
		@s(This) <i>e</i> @s(may even be)
		@s(pre-selected and the same)
		@s(for all participants.)
	</p>
@end(container en)
```
* Auch in der englischen Version

# 4. Geheimer Schlüssel
* Beschreibt den nächsten Abschnitt in der HTML-Ausgabe
* und wie der geheime Schlüssel berechnet wird

```
@add(container de)
	<h2>@s(Geheimer Schlüssel)</h2>
	<p>
		@s(RSA benutzt für die Berechnung des)
		@s(geheimen Schlüssels die Eulersche)
		@f(φ)@s(-Funktion von) <i>n</i>@s(.)
		@s(Diese ist definiert als)
	</p>
@end(container de)
```
* Erklärt in der deutschen Version, wie der geheime Schlüssel berechnet
  wird

```
@add(container en)
	<h2>@s(Secret key)</h2>
	<p>
		@s(RSA uses the Euler )@f(φ)@s( function)
		@s(of) <i>n</i> @s(to calculate the)
		@s(secret key. This is defined as)
	</p>
@end(container en)
```
* Das gleiche wird in der englischen Version ausgegeben

```
@def(phi label group)
	<form class="form-horizontal">
		<div class="form-group">
			@put(phi label)
		</div>
	</form>
@end(phi label group)
```
* Die Berechnung von `@f(φ)` enthält keinen deutschen oder englischen Text
* und kann daher für beide Lokalisierungen verwendet werden

```
@def(phi label)
	<label
		class="col-sm-3 control-label"
		@v(for)="phi">@f(φ)@s(()<i>n</i>@s(@) =)
		@s(()<i>p</i>@s( − 1@) ×)
		@s(()<i>q</i>@s( − 1@) =)</label>
	<div class="col-sm-9"><p
		class="form-control-static"
		id="phi"></p></div>
@end(phi label)
```

```
@add(container de)
	@mul(phi label group)
@end(container de)
```
* `@f(φ)` in der deutschen Version definieren

```
@add(container en)
	@mul(phi label group)
@end(container en)
```
* `@f(φ)` in der englischen Version definieren

```
@Add(globals)
	const $phi = $('phi');
@end(globals)
```
* Eine Referenz auf den Wert der `@f(φ)`-Funktion wird im Code abgelegt

```
@add(refresh)
	const one = @f(bigInt).one;
	const phi = prime1.subtract(one).
		multiply(prime2.subtract(one));
	$phi.innerText = phi.toString();
@end(refresh)
```
* Nur wenn die Primzahlen verschieden sind, gilt diese Rechenvorschrift

```
@Add(globals)
	const @f(gcd) = (a, b) => {
		@Put(gcd);
	};
@end(globals)
```
* Um festzustellen, ob `e` und  `@f(φ)(n)` teilerfremd sind, wird der
  Erweiterte Euklidische Algorithmus verwendet
* Dieser liefert gleichzeitig noch das inverse Element `d`, das für den
  geheimen Schlüssel benötigt wird

```
@inc(gcd.md)
```
* Der Erweiterte Euklidische Algorithmus wird in einer eigenen Datei
  implementiert


```
@add(refresh)
	const gcd_result = gcd(phi, e);
	$err_gcd_not_1.classList.toggle(
		'hidden', gcd_result.a.equals(one)
	);
@end(refresh)
```
* Wenn `e` und der Wert der `@f(φ)`-Funktion nicht teilerfremd sind, wird
  eine entsprechende Fehlermeldung angezeigt
* Das Attribut `a` im `gcd_result` enthält den kleinsten gemeinsamen
  Teiler
* Dieser muss `1` sein

```
@add(container de)
	<p>
		@s(Hier wird ausgenutzt, dass) <i>p</i>
		@s(und )<i>q</i>@s( verschieden sind.)
		@s(Andernfalls würde sich die )
		@f(φ)@s(-Funktion anders berechnen.)
	</p><p>
		@s(Wichtig ist für RSA, dass der Wert)
		@s(der )@f(φ)@s(-Funktion teilerfremd zu)
		<i>e</i>@s( ist (der größte)
		@s(gemeinsame Teiler also )1@s( ist@).)
	</p>
@end(container de)
```
* Einschränkungen bei der Berechnung von `@f(φ)` werden auf der deutschen
  Seite ausgegeben

```
@add(container en)
	<p>
		@s(The prerequisit here is that)
		<i>p</i>@s( and )<i>q</i>@s( are)
		@s(different. Otherwise, the )@f(φ)
		@s(function would be calculated)
		@s(differently.)
	</p><p>
		@s(It is important for RSA that the)
		@s(value of the )@f(φ)@s( function is)
		@s(coprime to )<i>e</i>@s( (the largest)
		@s(common divisor must be )1@s(@).)
	</p>
@end(container en)
```
* Ebenso auf der englischen Seite

```
@add(container de)
	<form class="form-horizontal">
		<div class="form-group">
			@put(ggt de)
		</div>
	</form>
@end(container de)
```
* Der größte gemeinsame Teiler wird auf der deutschen Seite
  ausgegeben

```
@def(ggt de)
	<label
		class="col-sm-3 control-label"
		@v(for)="gcd">@f(ggT)@s(()<i>e</i>@s(,)
		@f(φ)@s(()<i>n</i>@s(@)@) =)</label>
	<div class="col-sm-9"><p
		class="form-control-static"
		id="gcd"></p></div>
@end(ggt de)
```
* Die lange `class`-Definition erzwingt
  ein eigenes Fragment für das Label

```
@add(container en)
	<form class="form-horizontal">
		<div class="form-group">
			@put(ggt en)
		</div>
	</form>
@end(container en)
```
* Und auf der englischen Seite

```
@def(ggt en)
	<label
		class="col-sm-3 control-label"
		@v(for)="gcd">@s(gcd()<i>e</i>@s(,)
		@f(φ)@s(()<i>n</i>@s(@)@) =)</label>
	<div class="col-sm-9"><p
		class="form-control-static"
		id="gcd"></p></div>
@end(ggt en)
```
* Auch die englische Version hat eine lange `class`-Definition

```
@Add(globals)
	const $gcd = @f($)('gcd');
@end(globals)
```
* Eine Referenz auf das DOM-Element wird gesichert

```
@add(refresh)
	$gcd.innerText =
		gcd_result.a.toString();
@end(refresh)
```
* Und im `refresh` wird das Feld aktualisiert

```
@add(container de)
	<p>
		@s(Um den Wert von )@f(φ)@s(()<i>n</i>@s(@) zu)
		@s(bestimmen, reicht es nicht aus)
		<i>n</i>@s( zu kennen. Nur mit der)
		@s(Kenntnis von )<i>p</i>@s( und )<i>q</i>
		@s(kann man )@f(φ)@s(()<i>n</i>@s(@) effizient)
		@s(bestimmen.)
	</p>
@end(container de)
```
* Es wird beschrieben, warum der geheime Schlüssel nicht leicht erraten
  werden kann

```
@add(container de)
	<p>
		@s(Der geheime Schlüssel besteht)
		@s(aus einem )<i>d</i>@s( mit der)
		@s(Eigenschaft, dass)
		<i>e</i>@s( × )<i>d</i>@s( − )1@s( ein)
		@s(Vielfaches von )@f(φ)@s(()<i>n</i>@s(@) ist.)
	</p>
@end(container de)
```
* Es wird beschrieben, wie der geheime Schlüssel berechnet wird

```
@add(container de)
	<p>
		@s(In Formeln ausgedrückt, muss)
		@s(gelten:)
	</p><p class="form">
		<i>e</i>@s( × )<i>d</i>@s( = )1
		@s((mod )@f(φ)@s(()<i>n</i>@s(@)@))
	</p>
@end(container de)
```
* Das gleiche wird als Formel ausgedrückt

```
@add(container de)
	<p>
		@s(Dabei ist mit dem mod-Ausdruck)
		@s(die Gleichheit bezüglich einer)
		@s(Restklasse gemeint. Es ist genau)
		@s(dann )<i>x</i>@s( =)<i>y</i>
		@s((mod )<i>z</i>@s(@), wenn es ein)
		@s(ganzzahliges )<i>a</i>@s( gibt mit)
		<i>x</i>@s( − )<i>y</i>@s( = )<i>z</i>
		@s(× )<i>a</i>@s(.)
	</p>
@end(container de)
```
* Und wieso damit die Entschlüsselung funktioniert

```
@add(container de)
	<p>
		@s(Für die gewählten Werte von)
		<i>p</i>@s(, )<i>q</i>@s( und )
		<i>e</i>@s( ergibt sich) <i>d</i>
		@s( als:)
	</p>
@end(container de)
```
* Dann wird der geheime Schlüssel ausgegeben

```
@add(container en)
	<p>
		@s(To determine the value of)
		@f(φ)@s(()<i>n</i>@s(@), it is not enough)
		@s(to know) <i>n</i>@s(. Only with the)
		@s(knowledge of) <i>p</i> @s(and) <i>q</i>
		@s(we can efficiently determine)
		@f(φ)@s(()<i>n</i>@s(@).)
	</p>
@end(container en)
```
* Auch auf der englischen Seite wird beschrieben, warum der geheime
  Schlüssel nur schwer erraten werden kann

```
@add(container en)
	<p>
		@s(The secret key also consists of)
		@s(a )<i>d</i>@s( with the)
		@s(property that )<i>e</i>@s( ×)
		<i>d</i>@s( − )1@s( is a multiple of)
		@f(φ)@s(()<i>n</i>@s(@).)
	</p>
@end(container en)
```
* Und wie der geheime Schlüssel berechnet wird

```
@add(container en)
	<p>
		@s(Expressed in formulas, the)
		@s(following must apply:)
	</p><p class="form">
		<i>e</i>@s( × )<i>d</i>@s( = 1)
		@s((mod φ()<i>n</i>@s(@)@))
	</p>
@end(container en)
```
* Ebenfalls mit der Formel-Darstellung

```
@add(container en)
	<p>
		@s(In this case, the mod expression)
		@s(means equality with regard to a)
		@s(residual class. It is )<i>x</i>@s( =)
		<i>y</i>@s( (mod )<i>z</i>@s(@) if and)
		@s(only if there is an integer a)
		@s(with )<i>x</i>@s( − )<i>y</i>@s( =)
		<i>z</i>@s( × )<i>a</i>@s(.)
	</p>
@end(container en)
```
* Und warum das Ganze funktioniert

```
@add(container en)
	<p>
		@s(For the chosen values of )<i>p</i>@s(,)
		<i>q</i>@s(, and )<i>e</i>@s(, we get)
		<i>d</i>@s( as:)
	</p>
@end(container en)
```
* Hier wird auf das nächste Ergebnis hingearbeitet

```
@add(css)
	#rsa-container p.form {
		margin-left: 32px;
	}
@end(css)
```
* Formeln werden etwas eingerückt

```
@def(private key group)
	<form class="form-horizontal">
		<div class="form-group">
			@put(private key)
		</div>
	</form>
@end(private key group)
```
* Das Feld mit der Ausgabe des geheimen Schlüssels kann in der
  deutschen und englischen Version gemeinsam verwendet werden

```
@def(private key)
	<label
		class="col-sm-3 control-label"
		@v(for)="private-key"><i>d</i>@s( =)
	</label>
	<div class="col-sm-9"><p
		class="form-control-static"
		id="private-key"></div>
@end(private key)
```
* Wegen der langen `class`-Definition werden die Felder in einem eigenen
  Fragment definiert

```
@add(container de)
	@mul(private key group)
@end(container de)
```
* Den geheimen Schlüssel in der deutschen Version ausgeben


```
@add(container en)
	@mul(private key group)
@end(container en)
```
* Den geheimen Schlüssel in der englischen Version ausgeben

```
@Add(globals)
	const $private_key =
		@f($)('private-key');
@end(globals)
```
* Die Referenz auf den geheimen Schlüssel wird in der Anwendung
  gespeichert

```
@add(refresh)
	let private_key = gcd_result.v;
	const zero = @f(bigInt).zero;
	if (private_key.lesser(zero)) {
		private_key =
			private_key.add(phi);
	}
	$private_key.innerText =
		private_key.toString();
@end(refresh)
```
* Der private Schlüssel ist das multiplikative Inverse modulo `@f(φ)(n)`
* Falls der Schlüssel negativ ist, wird der Wert von `@f(φ)(n)` hinzu
  addiert

```
@add(container de)
	<p>
		@s(Dieses )<i>d</i>@s( kann immer)
		@s(bestimmt werden, wenn )<i>e</i>
		@s(mit der oben beschriebenen)
		@s(Einschränkung gewählt wurde –)
		@s(bspw. mit dem Erweiterten)
		@s(Euklidischen Algorithmus.)
	</p>
@end(container de)
```
* Es wird beschrieben, wie der geheime Schlüssel gewählt wird

```
@add(container en)
	<p>
		@s(This )<i>d</i>@s( can always be)
		@s(determined (if )<i>e</i>@s( was)
		@s(chosen with the restriction)
		@s(described above@) — for example)
		@s(with the extended Euclidean)
		@s(algorithm.)
	</p>
@end(container en)
```
* Auch auf der englischen Seite wird die Beschreibung ausgegeben

# 5. Ver- und Entschlüsseln
* Endlich kommt die eigentliche Ver- und Entschlüsselung
* Durch die Vorarbeiten bleibt aber nicht mehr viel zu tun

```
@add(container de)
	<h2>@s(Ver- und Entschlüsseln)</h2>
	<p>
		@s(Grundsätzlich werden bei diesem)
		@s(Verfahren keine Texte, sondern)
		@s(nur Zahlen ver- und entschlüsselt,)
		@s(die zwischen )0@s( und )<i>n</i>@s( − )1
		@s(liegen.)
	</p>
@end(container de)
```
* Hier wird beschrieben, was für Nachrichten verschlüsselt werden können

```
@add(container de)
	<p>
		@s(Um eine Nachricht )<i>m</i>@s( mit)
		@s(dem öffentlichen Schlüssel)
		@s(()<i>n</i>@s(, )<i>e</i>@s(@) zu)
		@s(verschlüsseln, wird)
	</p><p class="form">
		<i>@v(m')</i>@s( :=)
			<i>m</i><sup><i>e</i></sup>
			@s((mod )<i>n</i>@s(@))
	</p><p>
		@s(berechnet.)
	</p>
@end(container de)
```
* Das Verschlüsseln besteht aus einer Exponentiation

```
@add(container de)
	<p>
		@s(Das Entschlüsseln mit dem privaten)
		@s(Schlüssel ()<i>n</i>@s(, )<i>d</i>@s(@))
		@s(erfolgt analog mit)
	</p><p class="form">
		<i>@v(m'')</i>@s( :=)
			@s(()<i>@v(m')</i>@s(@))<sup><i>d</i></sup>
			@s((mod )<i>n</i>@s(@).)
	</p>
@end(container de)
```
* Auch das Entschlüsseln ist eine Exponentiation

```
@add(container de)
	<p>
		@s(Damit ist)
	</p><p class="form">
		<i>@v(m'')</i>@s( =)
			<i>m</i><sup><i>e</i>@s( ×)
			<i>d</i></sup>
			@s((mod )<i>n</i>@s(@).)
	</p>
@end(container de)
```
* `@v(m')` wird durch `m` hoch `e` ersetzt

```
@add(container de)
	<p>
		@s(RSA nutzt die Eigenschaft aus,)
		@s(dass)
	</p><p class="form">
		<i>x</i><sup><i>a</i></sup>@s( =)
			<i>x</i><sup><i>b</i></sup>
			@s((mod )<i>n</i>@s(@))
	</p>
@end(container de)
```
* Es wird kurz beschrieben, wann bei der Exponentiation das gleiche
  Ergebnis herauskommt

```
@add(container de)
	<p>
		@s(wenn)
	</p><p class="form">
		<i>a</i>@s( =)
			<i>b</i>@s( (mod )@f(φ)@s(()<i>n</i>@s(@)@))
	</p>
@end(container de)
```
* Die notwendige Einschränkung wird mit ausgegeben

```
@add(container de)
	<p>
		<i>e</i>@s( und )<i>d</i>@s( wurden)
		@s(passend gewählt, dass)
	</p><p class="form">
		<i>@v(m'')</i>@s( = )<i>m</i>@s(.)
	</p>
@end(container de)
```
* Damit kann die Entschlüsselung erklärt werden

```
@add(container de)
	<p>
		@s(Die Reihenfolge spielt keine)
		@s(Rolle. Man könnte auch erst eine)
		@s(Nachricht mit dem privaten)
		@s(Schlüssel potenzieren, und das)
		@s(Ergebnis dann mit dem öffentlichen)
		@s(Schlüssel potenzieren – das)
		@s(verwendet man bei RSA-Signaturen.)
	</p>
@end(container de)
```
* Es wird darauf hingewiesen, dass die Reihenfolge keine Rolle spielt

```
@add(container en)
	<h2>@s(Encryption and decryption)</h2>
	<p>
		@s(Internally, this method works only)
		@s(with numbers (no text@), which are)
		@s(between )0@s( and )<i>n</i>@s( − )1@s(.)
	</p>
@end(container en)
```
* Auch in der englischen Version wird beschrieben, wie die
  Nachrichten dargestellt werden

```
@add(container en)
	<p>
		@s(A message )<i>m</i>@s( (number@) is)
		@s(encrypted with the public key ()
		<i>n</i>@s(,) <i>e</i>@s(@) by)
		@s(calculating:)
	</p><p class="form">
		<i>@v(m')</i>@s( :=)
			<i>m</i><sup><i>e</i></sup>
			@s((mod )<i>n</i>@s(@))
	</p>
@end(container en)
```
* Und wie die Verschlüsselung funktioniert

```
@add(container en)
	<p>
		@s(Decrypting with the private key)
		@s(()<i>n</i>@s(, )<i>d</i>@s(@) is done)
		@s(analogously with)
	</p><p class="form">
		<i>@v(m'')</i>@s( :=)
			@s(()<i>@v(m')</i>@s(@))<sup><i>d</i></sup>
			@s((mod )<i>n</i>@s(@).)
	</p>
@end(container en)
```
* Und es wird beschrieben, wie die Entschlüsselung funktioniert

```
@add(container en)
	<p>
		@s(This is)
	</p><p class="form">
		<i>@v(m'')</i>@s( =)
			<i>m</i><sup><i>e</i>@s( ×)
			<i>d</i></sup>@s( (mod )<i>n</i>@s(@).)
	</p>
@end(container en)
```
* Und wie das Ergebnis umgeformt werden kann

```
@add(container en)
	<p>
		@s(RSA exploits the property that)
	</p><p class="form">
		<i>x</i><sup><i>a</i></sup>@s( =)
			<i>x</i><sup><i>b</i></sup>
			@s((mod )<i>n</i>@s(@))
	</p><p>
		@s(if)
	</p><p class="form">
		<i>a</i>@s( =)
			<i>b</i>@s( (mod )@f(φ)@s(()<i>n</i>@s(@)@))
	</p>
@end(container en)
```
* Ebenso wird beschrieben, wann die Exponentiation das gleiche
  Ergebnis liefern

```
@add(container en)
	<p>
		@s(As )<i>e</i>@s( and )<i>d</i>@s( were)
		@s(chosen appropriately, it is)
	</p><p class="form">
		<i>@v(m'')</i>@s( = )<i>m</i>@s(.)
	</p>
@end(container en)
```
* Und warum RSA damit funktioniert

```
@add(container en)
	<p>
		@s(The order does not matter. You)
		@s(could also first raise a message)
		@s(with the private key, and then)
		@s(power up the result with the)
		@s(public key — this is what you use)
		@s(with RSA signatures.)
	</p>
@end(container en)
```
* Es wird beschrieben, dass die Reihenfolge keine Rolle spielt

# 6. Nachrichten
* In diesem Abschnitt wird beschrieben, wie de Nachrichten angezeigt
  und verarbeitet werden

```
@add(container de)
	<h2>@s(Nachrichten)</h2>
	<p>
		@s(In den folgenden zwei Textboxen)
		@s(können Sie sehen, wie das Ver-)
		@s(und Entschlüsseln für konkrete)
		@s(Eingaben (Zahlen@) )@s(funktioniert.)
	</p>
	<form class="form-horizontal">
		@put(crypt boxes de)
	</form>
@end(container de)
```
* Hier werden die Nachrichten-Boxen erklärt

```
@add(container en)
	<h2>@s(Messages)</h2>
	<p>
		@s(In the following two text boxes,)
		@s(you can see how encryption and)
		@s(decryption work for concrete)
		@s(inputs (numbers@).)
	</p>
	<form class="form-horizontal">
		@put(crypt boxes en)
	</form>
@end(container en)
```
* Auch in der englischen Version werden die Nachrichten-Boxen erklärt

```
@def(crypt boxes de)
	@put(text box de)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="private-message"
		>@s(Klartext)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-message"
			value="7"></input></div>
	</div>
@end(crypt boxes de)
```
* Die deutsche Klartext-Box besteht aus einem Textfeld mit dem Klartext

```
@add(crypt boxes de)
	<div id="err-public-msg-too-big"
		class="row alert alert-danger">
		@s(Die Klartextzahl ist zu groß.)
		@s(Der maximale Wert ist)
		<span class="max-msg"></span>.
		@s(Bitte wählen Sie größere)
		@s(Primzahlen.)
	</div>
@end(crypt boxes de)
```
* Und es gibt eine Fehlermeldung, wenn die eingegebene Nachricht zu
  groß ist

```
@add(crypt boxes de)
	@mul(crypt arrow)
@end(crypt boxes de)
```
* Ein Pfeil zeigt die Richtung an, in die der Algorithmus gerade
  arbeitet
* Die Richtung kann durch Eingabe in die passenden Textfelder
  umgedreht werden

```
@add(crypt boxes de)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="public-message"
		>@s(Geheimtext)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="public-message"
		></input></div>
	</div>
@end(crypt boxes de)
```
* Ein weiteres Textfeld enthält den Geheimtext

```
@add(crypt boxes de)
	<div id="err-private-msg-too-big"
		class="row alert alert-danger"
	>@s(Die Geheimtextzahl ist zu groß.)
		@s(Der maximale Wert ist)
		<span class="max-msg"></span>.
		@s(Bitte wählen Sie größere)
		@s(Primzahlen.)
	</div>
@end(crypt boxes de)
```
* Auch hier gibt es eine Fehlermeldung, falls die eingegebene Zahl
  zu groß ist

```
@def(crypt boxes en)
	@put(text box en)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="private-message"
		>@s(Plaintext)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-message"
			value="7"></input></div>
	</div>
@end(crypt boxes en)
```
* Auch in der englischen Version gibt es ein Textfeld mit dem Klartext

```
@add(crypt boxes en)
	<div id="err-public-msg-too-big"
		class="row alert alert-danger"
	>@s(Plaintext number too big. The)
		@s(maximum value is)
		<span class="max-msg"></span>@s(.)
		@s(Please choose bigger)
		@s(primes.)</div>
@end(crypt boxes en)
```
* Und eine Fehlermeldung, wenn der Klartext zu groß ist

```
@add(crypt boxes en)
	@mul(crypt arrow)
@end(crypt boxes en)
```
* In beiden Sprachen kann der gleiche Pfeil verwendet werden, der die
  Richtung des Algorithmus anzeigt

```
@add(crypt boxes en)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="public-message"
		>@s(Ciphertext)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="public-message"
		></input></div>
	</div>
@end(crypt boxes en)
```
* Auch gibt es wieder ein Feld mit dem Geheimtext

```
@add(crypt boxes en)
	<div id="err-private-msg-too-big"
		class="row alert alert-danger"
	>@s(Ciphertext number too big. The)
		@s(maximum value is)
		<span class="max-msg"></span>@s(.)
		@s(Please choose bigger)
		@s(primes.)</div>
@end(crypt boxes en)
```
* Und eine Fehlermeldung, falls der Geheimtext zu groß ist

```
@def(crypt arrow)
	<div class="row">
		<div id="direction">
			<svg viewbox="0 0 50 50"
				width="50" height="50">
				<polyline points=@s("0,20 )@b()
					@s(15,20 15,0 35,0 35, )@b()
					@s(20 50,20 25,50")
				></polyline>
			</svg>
		</div>
	</div>
@end(crypt arrow)
```
* Der Pfeil ist eine einfache SVG-Grafik
* Durch CSS-Klassen kann er rotiert werden

```
@add(css)
	#direction svg {
		display: block;
		margin: 1em auto 2em auto;
	}
@end(css)
```
* Der Pfeil wird als eigener Block angezeigt
* Er wird mittig positioniert und bekommt oben und unten feste Abstände

```
@add(css)
	#direction svg polyline {
		fill: #888;
	}
@end(css)
```
* Die Füllfarbe des Pfeils wird auch im CSS gesetzt

```
@Add(globals)
	const $max_msgs =
		document.getElementsByClassName(
			'max-msg'
		);
@end(globals)
```
* In den Fehlermeldungen gibt es Elemente, die die größte mögliche
  Nachricht anzeigen
* Sie sind mit der Klasse `@v(max-msg)` markiert
* Alle diese Elemente werden in der Variable `$max_msgs` gesammelt

```
@add(refresh)
	const max_msg = public_key.
		subtract(one).toString();
@end(refresh)
```
* Die größte mögliche Nachricht ist um eins kleiner als der öffentliche
  Schlüssel

```
@add(refresh)
	for (
		let i = 0;
		i < $max_msgs.length;
		++i
	) {
		$max_msgs[i].innerText =
			max_msg;
	}
@end(refresh)
```
* Die Felder in den Fehlermeldungen werden beim `refresh` auf den
  korrekten Wert gesetzt

```
@Add(globals)
	const $private_message =
		@f($)('private-message');
	const $public_message =
		@f($)('public-message');
	const $err_public_msg_too_big =
		@f($)('err-public-msg-too-big');
	const $err_private_msg_too_big =
		@f($)('err-private-msg-too-big');
@end(globals)
```
* Die Referenzen auf DOM-Elemente für Klartext und Geheimtext werden in
  Variablen abgelegt
* Ebenso die Referenzen auf die Fehlermeldungen

```
@add(setup rsa)
	$private_message.addEventListener(
		'input',
		event => {
			setEncrypt(true);
			@put(update text field);
			queueRefresh(event);
		}
	);
@end(setup rsa)
```
* Wenn der Klartext geändert wird, wird zusätzlich die Richtung des
  Algorithmus angepasst

```
@add(setup rsa)
	$public_message.addEventListener(
		'input',
		event => {
			setEncrypt(false);
			queueRefresh(event);
		}
	);
@end(setup rsa)
```
* Wenn der Geheimtext geändert wird, wird zusätzlich die Richtung des
  Algorithmus angepasst

```
@Add(globals)
	let encrypt = true;
@end(globals)
```
* Der Algorithmus kann sowohl ver- als auch entschlüsseln
* Die Variable `encrypt` bestimmt die Richtung in die der Algorithmus
  läuft

```
@add(refresh)
	if (encrypt) {
		@put(encrypt);
	} else {
		@put(decrypt);
	}
@end(refresh)
```
* Je nach Richtung, in die der Algorithmus arbeiten soll, wird
  entweder der Klartext verschlüsselt
* oder der Geheimtext entschlüsselt

```
@def(encrypt)
	const source =
		bigInt($private_message.value);
	$err_public_msg_too_big.
		classList.toggle(
			'hidden',
			source.lesser(public_key)
		);
	$err_private_msg_too_big.
		classList.add('hidden');
@end(encrypt)
```
* Beim Verschlüsseln wird geprüft, ob der Klartext zu groß ist
* Dann wird eine Fehlermeldung angezeigt
* Beim Entschlüsseln gibt es eine analoge Fehlermeldung, die beim
  Verschlüsseln immer ausgeblendet ist

```
@add(encrypt)
	const encrypted =
		source.modPow(
			e, public_key
		);
	$public_message.value =
		encrypted.toString();
@end(encrypt)
```
* Das Verschlüsseln besteht nur aus einer Exponentiation mit `e`
  modulo `n` (dem öffentlichen Schlüssel)

```
@def(decrypt)
	const source =
		bigInt($public_message.value);
	$err_public_msg_too_big.
		classList.add('hidden');
	$err_private_msg_too_big.
		classList.toggle(
			'hidden',
			source.lesser(public_key)
		);
@end(decrypt)
```
* Beim Entschlüsseln wird der Geheimtext als Eingabe verwendet
* Auch hier wird eine Fehlermeldung ausgegeben, wenn die Zahl zu groß
  ist
* Beim Verschlüsseln gibt es eine anloge Fehlermeldung, die beim
  Entschlüsseln immer ausgeblendet ist

```
@add(decrypt)
	const decrypted = source.modPow(
		private_key, public_key
	);
	$private_message.value =
		decrypted.toString();
@end(decrypt)
```
* Auch das Entschlüsseln besteht aus einer einzigen Exponentiation mit
  dem geheimen Schlüssel `d` modulo `N`

# 7. Richtung des Algorithmus anzeigen
* Es gibt ein Element auf der Web-Seite, das die Ablaufrichtung des
  Algorithmus anzeigt
* Also, ob der Algorithmus ver- oder entschlüsselt

```
@Add(globals)
	const $direction =
		@f($)('direction');
@end(globals)
```
* Dieses Element zeigt die Richtung an, in der der Algorithmus läuft
* Die Richtung wird durch CSS-Klassen visualisiert

```
@add(setup rsa)
	const @f(setEncrypt) = new_encrypt => {
		if (encrypt === new_encrypt) {
			return;
		}
		encrypt = new_encrypt;
		if (encrypt) {
			@put(set encrypt css);
		} else {
			@put(set decrypt css);
		}
	};
@end(setup rsa)
```
* Durch CSS-Animationen wird der Pfeil hin- und hergedreht
* Wenn keine Klasse oder die Klasse `@s(flop)` gesetzt ist, dann zeigt
  der Pfeil in die Verschlüsselungsrichtung
* Wenn die Klasse `@s(flip)` gesetzt ist, zeigt er in die
  Entschlüsselungsrichtung
* `@s(flop)` ist notwendig, um den Wechsel zu animieren

```
@def(set encrypt css)
	$direction.classList.remove('flip');
	$direction.classList.add('flop');
@end(set encrypt css)
```
* Die Klasse `@s(flop)` wird gesetzt
* Die Klasse `@s(flip)` wird entfernt

```
@def(set decrypt css)
	$direction.classList.remove('flop');
	$direction.classList.add('flip');
@end(set decrypt css)
```
* Die Klasse `@s(flip)` wird gesetzt
* Die Klasse `@s(flop)` wird entfernt

```
@add(css)
	@keyframes flip {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(180deg);
		}
	}
@end(css)
```
* Die `flip`-Animation dreht den Pfeil um 180 Grad

```
@add(css)
	#direction.flip svg {
		animation-name: flip;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
@end(css)
```
* Wird die `flip`-Klasse auf dem `direction`-Element gesetzt, dann
  startet die `flip`-Animation auf dem Pfeil

```
@add(css)
	@keyframes flop {
		from {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(0deg);
		}
	}
@end(css)
```
* Die `flop`-Animation dreht den Pfeil zurück

```
@add(css)
	#direction.flop svg {
		animation-name: flop;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}
@end(css)
```
* Wenn die `flop`-Klasse auf dem `direction`-Element gesetzt wird,
  wird die `flop`-Animation auf dem Pfeil gestartet

# 8. Timer
* Das Berechnen von RSA kann bei sehr großen Zahlen etwas dauern
* Daher wird nicht mit jeder Änderung eine neue Berechnung gestartet
* Nur wenn nach der letzten Änderung ein gewisses Zeitintervall
  verstrichen ist, wird die Berechnung gestartet

```
@Add(globals)
	let timer;
@end(globals)
```
* Der Timer wird global vorgehalten

```
@Add(globals)
	const @f(resetTimer) = () => {
		timer = null;
	};
@end(globals)
```
* Eine spezielle Funktion setzt nur den Timer zurück
* Dieser Callback wird verwendet, wenn kein `@f(refresh)` nach dem
  Ablauf des Timers getriggert werden muss

```
@rep(queue refresh)
	let @f(fn) = @f(refresh);
	if (! timer) {
		refresh();
		@f(fn) = @f(resetTimer);
	} else {
		clearTimeout(timer);
		@put(set fields to pending);
	}
	timer = setTimeout(@f(fn), 500);
@end(queue refresh)
```
* Wenn es noch keine Änderung gab, wird die Änderung sofort
  durchgeführt
* Und nach Ablauf des Timers wird keine Neuberechnung durchgeführt
* Ansonsten werden die Felder mit Platzhaltern befüllt und der
  bestehende Timer gelöscht
* Dann wird ein neuer Timer gestartet, der die Berechnung triggert
* Der Timeout beträgt eine halbe Sekunde

```
@add(refresh)
	resetTimer();
@end(refresh)
```
* Nach der Neuberechnung wird der Timer zurückgesetzt

```
@def(set fields to pending)
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
@end(set fields to pending)
```
* Alle berechneten Felder werden mit Platzhaltern befüllt

# 9. Schlussbemerkung
* Ein paar Kleinigkeiten gibt es noch, um die Web-App fertig
  zu stellen

```
@add(container de)
	<h2>@s(Verwendete Bibliothek)</h2>
	<p>
		@s(Diese Seite verwendet für die)
		@s(Rechnung mit großen Zahlen die)
		@s(Bibliothek)
		<a href=@s("https://peterolson.)@b()
			@s(github.com/BigInteger.js/")
		>@s(BigInteger.js)</a>.
	</p>
@end(container de)
```
* In der deutschen Version werden die verwendete Bibliothek
  erwähnt

```
@add(container de)
	<p>
		@s(Dadurch kann man auch in)
		@s(JavaScript mit beliebig großen)
		@s(Zahlen rechnen, also auch solchen,)
		@s(die real bei RSA-Anwendungen)
		@s(verwendet werden.)
	</p>
@end(container de)
```
* und was mit ihr berechnet wird

```
@add(container en)
	<h2>@s(Used library)</h2>
	<p>
		@s(This page uses the library)
		<a href=@s("https://peterolson.)@b()
			@s(github.com/BigInteger.js/")
			>BigInteger.js</a>
		@s(to work with big numbers.)
	</p>
@end(container en)
```
* Das Gleiche gibt es auch für die englische Version

```
@add(container en)
	<p>
		@s(As a result, you can calculate)
		@s(arbitrarily large numbers in)
		@s(JavaScript, even those that are)
		@s(actually used in RSA)
		@s(applications.)
	</p>
@end(container en)
```
* Es wird beschrieben, warum diese Bibliothek benötigt wird

```
@add(container de)
	<div id="authors"><em>@s(CTOAUTHORS:)
		@s(Timm Knape (Dank an)
		@s(Bernhard Esslinger für das)
		@s(Review@))</em></div>
@end(container de)
```
* Die Seite endet mit dem Autor-Tag

```
@add(container en)
	<div id="authors"><em>@s(CTOAUTHORS:)
		@s(Timm Knape (thanks to)
		@s(Bernhard Esslinger for the)
		@s(review@))</em></div>
@end(container en)
```
* Auch in der englischen Version gibt es das Autor-Tag

```
@add(css)
	#authors {
		margin-top: 40px;
	}
@end(css)
```
* Das Autor-Tag wird etwas vom restlichen Text abgesetzt

```
@def(bootstrap stylesheets)
	<link 
		rel="stylesheet"
		href=@s("https://maxcdn.bootstrapcd)@b()
			@s(n.com/bootstrap/3.3.7/css/)@b()
			@s(bootstrap.min.css")
		integrity=@s("sha384-BVYiiSIFeK1dGm)@b()
			@s(JRAkycuHAHRg32OmUcww7on3RY)@b()
			@s(dg4Va+PmSTsz/K68vbdEjh4u")
		crossorigin="anonymous"
	>
@end(bootstrap stylesheets)
```
* Die Bootstrap-CSSs werden direkt von einem Content Delivery Network
  eingebunden
* Dies wird nur für den Test verwendet und nicht für die produktive
  Version

```
@add(bootstrap stylesheets)
	<link
		rel="stylesheet"
		href=@s("https://maxcdn.bootstrapcd)@b()
			@s(n.com/bootstrap/3.3.7/css/)@b()
			@s(bootstrap-theme.min.css")
		integrity=@s("sha384-rHyoN1iRsVXV4n)@b()
			@s(D0JutlnGaslCJuC7uwjduW9S)@b()
			@s(VrLvRYooPp2bWYgmgJQIXwl/Sp")
		crossorigin="anonymous"
	>
@end(bootstrap stylesheets)
```
* Auch das Bootstrap-Thema wird von einem Content Delivery Network
  eingebunden
* Auch dies wird nur für die lokale und nicht für die produktive Version
  verwendet

## Mehrere Zahlen auf einmal ver- und entschlüsseln

```
@Add(globals)
	const split_args = str => {
		let result = [];
		let num = '';
		for (let c of str) {
			if (c >= '0' && c <= '9') {
				num += c;
			} else {
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
@End(globals)
```

```
@rep(encrypt)
	let some_too_big = false;
	let result = ''; let sep = '';
	for (let num of split_args($private_message.value)) {
		if (num.greaterOrEquals(public_key)) {
			some_too_big = true;
		}
		const encrypted = num.modPow(
			e, public_key
		);
		result += sep + encrypted.toString();
		sep = ', ';
	}
@end(encrypt)
```

```
@add(encrypt)
	$err_private_msg_too_big.
		classList.add('hidden');
	$err_public_msg_too_big.
		classList.toggle(
			'hidden',
			! some_too_big
		);
	$public_message.value = result;
@end(encrypt)
```

```
@rep(decrypt)
	let some_too_big = false;
	let result = ''; let sep = '';

	for (let num of split_args($public_message.value)) {
		if (num.greaterOrEquals(public_key)) {
			some_too_big = true;
		}
		const decrypted = num.modPow(
			private_key, public_key
		);
		result += sep + decrypted.toString();
		sep = ', ';
	}
@end(decrypt)
```

```
@add(decrypt)
	$err_public_msg_too_big.
		classList.add('hidden');
	$err_private_msg_too_big.
		classList.toggle(
			'hidden',
			! some_too_big
		);
	$private_message.value =
		result;
@end(decrypt)
```

## Text direkt verschlüsseln

```
@Add(globals)
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
@End(globals)
```

```
@Add(globals)
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
@End(globals)
```

```
@def(text box de)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="private-txt"
		>@s(Texteingabe)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-txt"
			value=""></input></div>
	</div>
@end(text box de)
```

```
@def(text box en)
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			@v(for)="private-txt"
		>@s(text entry)</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-txt"
			value=""></input></div>
	</div>
@end(text box en)
```

```
@Add(globals)
	const $private_txt =
		@f($)('private-txt');
	const $private_txt_row =
		$private_txt.parentElement.parentElement;
@end(globals)
```

```
@add(refresh)
	$private_txt_row.classList.toggle(
		'hidden',
		public_key.lesser(1000)
	);
@end(refresh)
```

```
@add(setup rsa)
	$private_txt.addEventListener(
		'input',
		event => {
			setEncrypt(true);
			$private_message.value =
				str2nums($private_txt.value);
				
			queueRefresh(event);
		}
	);
@end(setup rsa)
```

```
@def(update text field)
	$private_txt.value =
		nums2str(split_args($private_message.value));
@end(update text field)
```

```
@add(decrypt)
	$private_txt.value =
		nums2str(split_args(result));
@end(decrypt)
```

