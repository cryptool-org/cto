# RSA-Implementierung in JavaScript

# Datei-Struktur

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
* Es gibt eine HTML-Datei, welche die RSA-Steuerung in Deutsch
  enthält
* Header- und Script-Fragmente werden mit der englischen Version
  geteilt
* Der Content-Teil wird für unsere Webseite in eine eigene Datei
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
* Die englische Webseite unterscheidet sich nur im Content-Teil von der
  deutschen Version

```
d{file: ../_ctoApps/rsa/rsa-de.html}
	E{rsa de}
x{file: ../_ctoApps/rsa/rsa-de.html}
```
* Es gibt eine Datei mit der deutschen GUI ohne Webseiten-Rahmen
* Die Datei wird direkt im Ziel-Ordner erzeugt

```
d{file: ../_ctoApps/rsa/rsa-en.html}
	E{rsa en}
x{file: ../_ctoApps/rsa/rsa-en.html}
```
* Und es gibt eine Datei mit der englischen GUI ohne Webseiten-Rahmen

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
* Im Header wird die Zeichen-Kodierung auf UTF-8 gestellt
* Die Bootstrap-Stylesheets werden eingebunden
* Und das spezifische Stylesheet wird eingebunden

```
d{file: ../_ctoApps/rsa/rsa.css}
	e{css}
x{file: ../_ctoApps/rsa/rsa.css}
```
* Die Stylesheet enthält ein Fragment, in welchem im Laufe des Dokuments
  neue Definitionen eingepflegt werden

```
d{scripts}
	<script
		src="../_ctoApps/rsa/BigInteger.min.js"
	></script>
	<script
		src="../_ctoApps/rsa/rsa.js"></script>
x{scripts}
```
* Neben dem spezifischen JavaScript wird noch eine Bibliothek für das
  Rechnen mit großen Zahlen eingebunden

```
d{file: ../_ctoApps/rsa/rsa.js}
	"use strict";
	window.addEventListener('load', () => {
		e{globals};
		e{setup rsa};
	});
x{file: ../_ctoApps/rsa/rsa.js}
```
* Das Skript wird mit strenger Typ-Prüfung ausgeführt
* Der gesamte Code wird abgearbeitet, nachdem die Webseite vollständig
  geladen wurde
* Durch das Scoping in einer eigenen Funktion wird der globale
  Namensraum nicht verschmutzt

```
d{rsa de}
	<div id="rsa-container"
		class="container">
		e{container de}
	</div>
x{rsa de}
```
* Der Inhalts-Block ist in einem eigenen `<div>` gekapselt
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
		s{Dieses Modul demonstriert schrittweise}
		s{die Ver- und Entschlüsselung mit dem}
		s{RSA-Verfahren. Der Sender verwendet}
		s{dabei zum Verschlüsseln den}
		s{öffentlichen Schlüssel des Empfängers;}
		s{der Empfänger verwendet zum}
		s{Entschlüsseln seinen zugehörigen}
		s{privaten Schlüssel.}
	</p>
x{container de}
```
* Am Anfang gibt es eine kurze Beschreibung

```
d{container en}
	<p>
		s{This module demonstrates step-by-step}
		s{encryption or decryption with the RSA}
		s{method. The sender uses the public}
		s{key of the recipient for encryption;}
		s{the recipient uses his associated}
		s{private key to decrypt.}
	</p>
x{container en}
```
* Die englische Version enthält die Übersetzung

```
d{css}
	#rsa-container p {
		margin: 0 0 10px;
	}
x{css}
```
* Für Absätze wird ein der Abstand auf `0` gesetzt
* Nur der untere Abstand wird auf `10` Pixel gesetzt

# Primzahlen eingeben
* Dieser Abschnitt beschreibt, wie die Primzahlen geändert werden
  können

```
a{container de}
	<h2>s{Primfaktoren}</h2>
	<p>
		s{Die Sicherheit von RSA basiert darauf,}
		s{dass es zwar einfach ist, das Produkt}
		<i>n</i> s{zweier großer Primzahlen}
		<i>p</i> s{und} <i>q</i> s{zu berechnen. Es}
		s{ist jedoch sehr schwer, nur aus dem}
		s{Produkt} <i>n</i> s{die beiden Primzahlen}
		s{zu bestimmen, die das Produkt ergeben.}
		s{Dieses Zerlegen nennt man auch das}
		s{Faktorisieren von} <i>n</i>s{.}
	</p><p>
		s{Als Ausgangspunkt für RSA wählt man}
		s{zwei Primzahlen} <i>p</i> s{und} <i>q</i>s{.}
	</p>
x{container de}
```
* Auf der HTML-Seite wird nach der Überschrift eine kurze Erklärung
  ausgegeben

```
a{container en}
	<h2>Prime factors</h2>
	<p>
		s{The security of RSA is based on the}
		s{fact that it is easy to calculate the}
		s{product} <i>n</i> s{of two large primes}
		<i>p</i> s{and} <i>q</i>. s{However, it is}
		s{very difficult to determine only from}
		s{the product} <i>n</i> s{the two primes}
		s{that yield the product.  This}
		s{decomposition is also called the}
		s{factorization of} <i>n</i>.
	</p><p>
		s{As a starting point for RSA choose}
		s{two primes} <i>p</i> s{and} <i>q</i>.
	</p>
x{container en}
```
* Auch auf der englischen Seite wird die Erklärung eingebaut

```
a{container de}
	<form class="form-horizontal">
		e{primes de}
	</form>
x{container de}
```
* Die Eingabe-Elemente werden in einem Formular gekapselt

```
a{container en}
	<form class="form-horizontal">
		e{primes en}
	</form>
x{container en}
```
* Die englische Version enthält ein anderes Fragment als Inhalt

```
d{primes de}
	<div class="form-group">
		<label class="col-sm-3 control-label"
			for="prime-1">s{1.  Primzahl} <i>p</i>
		</label>
		<div class="col-sm-9"><input
			class="form-control" id="prime-1"
			value="11"></div>
	</div>
	<div id="err-p-not-prime"
		class="row alert alert-danger hidden"
	><i>p</i> s{ist keine Primzahl!}</div>
x{primes de}
```
* Formatierung des Eingabefeldes für die erste Primzahl mit Label
  wird von Bootstrap-Klassen erledigt
* Das Feld wird mit der kleinen Primzahl `11` initialisiert
* Zusätzlich gibt es eine Fehlermeldung
* Die aber anfangs nicht sichtbar ist

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
			for="prime-1">s{1st prime}
			<i>p</i></label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-1" value="11"></div>
	</div>
	<div id="err-p-not-prime"
		class="row alert alert-danger hidden"
	><i>p</i> s{is not prime!}</div>
x{primes en}
```
* Die englische Version hat ein anderes Label
* Und eine übersetzte Fehlermeldung

```
d{setup rsa}
	const f{queueRefresh} = event => {
		event.preventDefault();
		e{queue refresh};
	}
x{setup rsa}
```
* Wenn sich Textfelder ändern, muss der RSA-Algorithmus neu
  durchgeführt werden
* Dazu wird die Funktion `f{queueRefresh}` verwendet
* Diese sorgt dafür, dass die Neuberechnung nicht zu häufig
  aufgerufen wird
* Sie wird später beschrieben

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
	const $err_p_not_prime =
		f{$}('err-p-not-prime');
x{globals}
```
* Das Textfeld und die Fehlermeldung werden zwischengespeichert

```
a{setup rsa}
	$prime1.addEventListener(
		'input', f{queueRefresh}
	);
x{setup rsa}
```
* Wenn sich die Primzahl ändert, wird eine Neuberechnung angestoßen

```
a{primes de}
	<div class="form-group">
		<label class="col-sm-3 control-label"
			for="prime-2">s{2.  Primzahl} <i>q</i>
		</label>
		<div class="col-sm-9"><input
			class="form-control" id="prime-2"
			value="13"></div>
	</div>
x{primes de}
```
* Eingabefeld für die zweite Primzahl
* Auch diese wird initialisiert

```
a{primes de}
	<div id="err-q-not-prime"
		class="row alert alert-danger hidden"
	><i>q</i>s{ist keine Primzahl!}</div>
	<div id="err-p-equal-q"
		class="row alert alert-danger hidden"
	><i>p</i>s{und} <i>q</i>
		s{sind nicht verschieden!}</div>
x{primes de}
```
* Für die zweite Primzahl gibt es noch eine zusätzliche Fehlermeldung
* Denn beide Primzahlen dürfen nicht gleich sein

```
a{primes en}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			for="prime-2">s{2nd prime}
			<i>q</i></label>
		<div class="col-sm-9"><input
			class="form-control"
			id="prime-2" value="13"></div>
	</div>
x{primes en}
```
* In der englischen Version wird ein anderes Label verwendet

```
a{primes en}
	<div id="err-q-not-prime"
		class="row alert alert-danger hidden"
	><i>q</i> s{is not prime!}</div>
	<div id="err-p-equal-q"
		class="row alert alert-danger hidden"
	><i>p</i> s{and} <i>q</i> s{are not}
		s{different!}</div>
x{primes en}
```
* Die Fehlermeldungen sind in der englischen Version lokalisiert

```
a{globals}
	const $prime2 = f{$}('prime-2');
	const $err_q_not_prime =
		f{$}('err-q-not-prime');
	const $err_p_equal_q =
		f{$}('err-p-equal-q');
x{globals}
```
* Speichert Zugriff auf zweite Primzahl und die Fehlermeldungen

```
a{setup rsa}
	$prime2.addEventListener(
		'input', f{queueRefresh}
	);
x{setup rsa}
```
* Bei einer Änderung wird ebenfalls eine Neuberechnung angestoßen




```
a{css}
	#direction svg {
		display: block;
		margin: 1em auto 2em auto;
	}
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

```
a{css}
	#direction.flip svg {
    	animation-name: flip;
    	animation-duration: 1s;
    	animation-fill-mode: forwards;
	}
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

```
a{css}
	#direction.flop svg {
    	animation-name: flop;
    	animation-duration: 1s;
    	animation-fill-mode: forwards;
	}
	#direction svg polyline {
    	fill: #888;
	}
	#rsa-container h2 {
		margin-top: 2em;
	}
x{css}
```

```
a{css}
	#authors {
		margin-top: 40px;
	}
x{css}
```

```
a{container de}
	<p>
		s{Damit der Algorithmus funktioniert,}
		s{müssen die beiden Primzahlen}
		s{verschieden sein.}
	</p><p>
		s{Zur Demonstration beginnen wir mit}
		s{kleinen Primzahlen. Um die}
		s{Faktorisierung schwierig zu gestalten,}
		s{müssen die Primzahlen möglichst groß}
		s{gewählt werden.  Aktuell werden für}
		s{eine sichere Kommunikation Werte von}
		<i>n</i> s{mit mehreren tausend}
		s{Binärstellen verwendet.}
	</p>
x{container de}
```

```
a{container de}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="public-key"><i>n</i> =
					<i>p</i> &times; <i>q</i>
			</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				><span id="public-key"></span>
				s{(}<span
				id="public-key-length"></span>
				s{Bit)}</p></div>
		</div>
	</form>
x{container de}
```

```
a{container de}
	<h2>s{Öffentlicher Schlüssel}</h2>
	<p>
		s{Das Produkt} <i>n</i> s{wird im}
		s{RSA-Verfahren auch Modul genannt.}
		s{Der öffentliche Schlüssel besteht}
		s{neben dem Modul} <i>n</i> s{noch aus}
		s{einem Exponenten} <i>e</i>s{.}
	</p>
x{container de}
```

```
a{container de}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="base"><i>e</i></label>
			<div class="col-sm-9"><input
				class="form-control" id="base"
				value="23"></div>
		</div>
		<div id="err-gcd-not-1"
			class="row alert alert-danger"
		><i>e</i> s{und} <i>n</i> s{sind nicht}
			s{teilerfremd.}</div>
	</form>
x{container de}
```

```
a{container de}
	<p>
		s{Dieses} <i>e</i> s{kann sogar vorab}
		s{gewählt werden und für alle}
		s{Teilnehmer gleich sein.}
	</p>
x{container de}
```

```
a{container de}
	<h2>s{Geheimer Schlüssel}</h2>
	<p>
		s{RSA benutzt für die Berechnung des}
		s{geheimen Schlüssels die Eulersche}
		&phi;s{-Funktion von} <i>n</i>s{.}
		s{Diese ist definiert als}
	</p>
x{container de}
```

```
a{container de}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="phi">&phi;s{(}<i>n</i>s{) =}
				s{(}<i>p</i> &minus; s{1)} &times;
				s{(}<i>q</i> &minus; s{1})</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="phi"></p></div>
		</div>
	</form>
x{container de}
```

```
a{container de}
	<p>
		s{Hier wird ausgenutzt, dass} <i>p</i> s{und}
		<i>q</i> s{verschieden sind. Andernfalls}
		s{würde sich die} &phi;s{-Funktion anders}
		s{berechnen.}
	</p><p>
		s{Wichtig ist für RSA, dass der Wert der}
		&phi;s{-Funktion teilerfremd zu} <i>e</i>
		s{ist (der größte gemeinsame Teiler also}
		s{1 ist).}
	</p>
x{container de}
```

```
a{container de}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="gcd">s{ggT(}<i>e</i>,
				&phi;s{(}<i>n</i>s{))}</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="gcd"></p></div>
		</div>
	</form>
x{container de}
```

```
a{container de}
	<p>
		s{Um den Wert von} &phi;(<i>n</i>) s{zu}
		s{bestimmen, reicht es nicht aus}
		<i>n</i> s{zu kennen. Nur mit der}
		s{Kenntnis von} <i>p</i> s{und} <i>q</i>
		s{kann man} &phi;(<i>n</i>) s{effizient}
		s{bestimmen.}
	</p><p>
		s{Der geheime Schlüssel besteht ebenfalls}
		s{aus} <i>n</i> s{und einem} <i>d</i> s{mit der}
		s{Eigenschaft, dass} <i>e</i> &times;
		<i>d</i> s{ein Vielfaches von}
		&phi;(<i>n</i>) s{plus eins ist.}
	</p>
x{container de}
```

```
a{container de}
	<p>
		s{In Formeln ausgedrückt, muss gelten:}
	</p><p>
		<i>e</i> &times; <i>d</i> = 1
		(mod &phi;(<i>n</i>))
	</p><p>
		s{Dabei ist mit dem mod-Ausdruck die}
		s{Gleichheit bezüglich einer Restklasse}
		s{gemeint. Es ist genau dann} <i>x</i> =
		<i>y</i> (mod <i>z</i>), s{wenn es ein}
		s{ganzzahliges} <i>a</i> s{gibt mit}
		<i>x</i> &minus; <i>y</i> = <i>z</i>
		&times; <i>a</i>.
	</p>
x{container de}
```

```
a{container de}
	<p>
		Für die gewählten Werte von <i>p</i>,
		<i>q</i> und <i>e</i> ergibt sich
		<i>d</i> als:
	</p>
x{container de}
```

```
a{container de}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="private-key"><i>d</i>
			</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="private-key"></div>
		</div>
	</form>
x{container de}
```

```
a{container de}
	<p>
		s{Dieses} <i>d</i> s{kann immer bestimmt}
		s{werden, wenn} <i>e</i> s{mit der oben}
		s{beschriebenen Einschränkung gewählt}
		s{wurde} &ndash; s{bspw. mit dem}
		s{erweiterten Euklidischen Algorithmus.}
	</p>
x{container de}
```

```
a{container de}
	<h2>s{Ver- und Entschlüsseln}</h2>
	<p>
		s{Grundsätzlich werden bei diesem}
		s{Verfahren keine Texte, sondern nur}
		s{Zahlen ver- und entschlüsselt, die}
		s{zwischen} 0 s{und} <i>n</i> s{liegen.}
	</p>
x{container de}
```

```
a{container de}
	<p>
		s{Um eine Nachricht} <i>m</i> s{mit dem}
		s{öffentlichen Schlüssel} (<i>n</i>,
		<i>e</i>) s{zu verschlüsseln, wird}
	</p><p>
		<i>m&#39;</i> :=
			<i>m</i><sup><i>e</i></sup>
			(mod <i>n</i>)
	</p><p>
		s{berechnet.}
	</p>
x{container de}
```

```
a{container de}
	<p>
		s{Das Entschlüsseln mit dem privaten}
		s{Schlüssel} (<i>n</i>, <i>d</i>)
		s{erfolgt analog mit}
	</p><p>
		<i>m&#39;&#39;</i> :=
			<i>m&#39;</i><sup><i>d</i></sup>
			(mod <i>n</i>).
	</p>
x{container de}
```

```
a{container de}
	<p>
		s{Damit ist}
	</p>
		<i>m&#39;&#39;</i> =
			<i>m</i><sup><i>e</i> &times;
			<i>d</i></sup>
			(mod <i>n</i>).
	</p>
x{container de}
```

```
a{container de}
	<p>
		s{RSA nutzt nun die Eigenschaft aus,}
		s{dass}
	</p><p>
		<i>x</i><sup><i>a</i></sup> =
			<i>x</i><sup><i>b</i></sup>
			(mod <i>n</i>)
	</p><p>
		s{wenn}
	</p><p>
		<i>a</i> =
			<i>b</i> (mod &phi;(<i>n</i>))
	</p>
x{container de}
```

```
a{container de}
	<p>
		<i>e</i> s{und} <i>d</i> s{wurden passend}
		s{gewählt damit}
	</p><p>
		<i>m&#39;&#39;</i> = <i>m</i>.
	</p><p>
		s{Die Reihenfolge spielt keine Rolle.}
		s{Man könnte auch erst eine Nachricht}
		s{mit dem privaten Schlüssel}
		s{potenzieren, und das Ergebnis dann}
		s{mit dem öffentlichen Schlüssel}
		s{potenzieren} &ndash; s{das verwendet}
		s{man bei RSA-Signaturen.}
	</p>
x{container de}
```

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

```
d{crypt boxes de}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			for="public-key">s{Klartext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-message"
			value="7"></input></div>
	</div>
x{crypt boxes de}
```

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

```
a{crypt boxes de}
	E{crypt arrow}
x{crypt boxes de}
```

```
d{crypt arrow}
	<div class="row">
		<div id="direction">
			<svg viewbox="0 0 50 50"
				width="50" height="50">
				<polyline points=s{"0,20 15,20}b{}s{ 15,0 35,0 35,20 50,20 25,50"}
				></polyline>
			</svg>
		</div>
	</div>
x{crypt arrow}
```

```
a{crypt boxes de}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			for="private-key"
		>s{Geheimtext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="public-message"
		></input></div>
	</div>
x{crypt boxes de}
```

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

```
a{container de}
	<div id="authors"><em>s{CTOAUTHORS:}
		s{Timm Knape (Dank an Bernhard Esslinger}
			s{für das Review)}</em></div>
x{container de}
```

```
a{container en}
	<p>
		s{For the algorithm to work, the two}
		s{primes must be different.}
	</p><p>
		s{For demonstration we start with}
		s{small primes. To make the}
		s{factorization difficult, the}
		s{primes must be much larger.}
		s{Currently, values of} <i>n</i> s{with}
		s{several thousand binary digits}
		s{are used for secure communication.}
	</p>
x{container en}
```

```
a{container en}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="public-key"><i>n</i> =
					<i>p</i> &times; <i>q</i>
			</label>
			<div class="col-sm-9"><p
				class="form-control-static"
			><span
				id="public-key"></span>s{(}<span
				id="public-key-length"></span>
				s{Bit)}</p></div>
		</div>
	</form>
x{container en}
```

```
a{container en}
	<h2>s{Public key}</h2>
	<p>
		s{The product <i>n</i> is also called}
		s{module in the RSA method. The public}
		s{key consists of the module} <i>n</i>
		s{and an exponent} <i>e</i>.
	</p>
x{container en}
```

```
a{container en}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="base"><i>e</i></label>
			<div class="col-sm-9"><input
				class="form-control" id="base"
				value="23"></div>
		</div>
		<div id="err-gcd-not-1"
			class="row alert alert-danger"
		><i>e</i> s{and} <i>n</i> s{have a common}
			s{divisor.}</div>
	</form>
x{container en}
```

```
a{container en}
	<p>
		s{This} <i>e</i> s{may even be}
		s{pre-selected and the same}
		s{for all participants.}
	</p>
x{container en}
```

```
a{container en}
	<h2>s{Secret key}</h2>
	<p>
		s{RSA uses the Euler} &phi; s{function}
		s{of} <i>n</i> s{to calculate the}
		s{secret key. This is defined as}
	</p>
x{container en}
```

```
a{container en}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="phi">&phi;(<i>n</i>) =
				(<i>p</i> &minus; 1) &times;
				(<i>q</i> &minus; 1)</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="phi"></p></div>
		</div>
	</form>
x{container en}
```

```
a{container en}
	<p>
		s{Here it is used that} <i>p</i> s{and}
		<i>q</i> s{are different. Otherwise,}
		s{the} &phi; s{function would calculate}
		s{differently.}
	</p><p>
		s{It is important for RSA that the}
		s{value of the} &phi; s{function is}
		s{coprime to} <i>e</i> s{(the largest}
		s{common divisor must be 1).}
	</p>
x{container en}
```

```
a{container en}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="gcd">gcd(<i>e</i>,
				&phi;(<i>n</i>))</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="gcd"></p></div>
		</div>
	</form>
x{container en}
```

```
a{container en}
	<p>
		s{To determine the value of}
		&phi;(<i>n</i>)s{, it is not enough}
		s{to know} <i>n</i>s{. Only with the}
		s{knowledge of} <i>p</i> s{and} <i>q</i>
		s{we can efficiently determine}
		&phi;(<i>n</i>)s{.}
	</p><p>
		s{The secret key also consists of}
		<i>n</i> s{and a} <i>d</i> s{with the}
		s{property that} <i>e</i> &times;
		<i>d</i> s{is a multiple of}
		&phi;(<i>n</i>) s{plus one.}
	</p>
x{container en}
```

```
a{container en}
	<p>
		s{Expressed in formulas, the following}
		s{must apply:}
	</p><p>
		e &times; d = 1 (mod &phi;(<i>n</i>))
	</p>
x{container en}
```

```
a{container en}
	<p>
		s{In this case, the mod expression means}
		s{equality with regard to a residual}
		s{class. It is} <i>x</i> = <i>y</i> (mod
		<i>z</i>) s{if and only if there is an}
		s{integer a with} <i>x</i> &minus;
		<i>y</i> = <i>z</i> &times; <i>a</i>.
	</p><p>
		s{For the chosen values of} <i>p</i>,
		<i>q</i>s{, and} <i>e</i>s{, we get}
		<i>d</i> s{as:}
	</p>
x{container en}
```

```
a{container en}
	<form class="form-horizontal">
		<div class="form-group">
			<label
				class="col-sm-3 control-label"
				for="private-key"><i>d</i>
			</label>
			<div class="col-sm-9"><p
				class="form-control-static"
				id="private-key"></div>
		</div>
	</form>
x{container en}
```

```
a{container en}
	<p>
		s{This} <i>d</i> s{can always be determined}
		s{(if} <i>e</i> s{was chosen with the}
		s{restriction described above)}&mdash;s{for}
		s{example with the extended Euclidean}
		s{algorithm.}
	</p>
x{container en}
```

```
a{container en}
	<h2>s{Encryption and decryption}</h2>
	<p>
		s{Internally, this method works only with}
		s{numbers (no text), which are between} 0
		s{and} <i>n</i>s{.}
	</p><p>
		s{Encrypting a message} <i>m</i> s{(number)}
		s{with the public key} (<i>n</i>,
		<i>e</i>s) s{is calculated:}
	</p><p>
		<i>m&#39;</i> :=
			<i>m</i><sup><i>e</i></sup>
			(mod <i>n</i>)
	</p>
x{container en}
```

```
a{container en}
	<p>
		s{Decrypting with the private key}
		(<i>n</i>, <i>d</i>) s{is done}
		s{analogously with}
	</p><p>
		<i>m&#39;&#39;</i> :=
			<i>m&#39;</i><sup><i>d</i></sup>
			(mod <i>n</i>).
	</p><p>
		s{This is}
	</p><p>
		<i>m&#39;&#39;</i> =
			<i>m</i><sup><i>e</i> &times;
			<i>d</i></sup> (mod <i>n</i>).
	</p>
x{container en}
```

```
a{container en}
	<p>
		s{RSA now exploits the property that}
	</p><p>
		<i>x</i><sup><i>a</i></sup> =
			<i>x</i><sup><i>b</i></sup>
			(mod <i>n</i>)
	</p><p>
		s{if}
	</p><p>
		<i>a</i> =
			<i>b</i> (mod &phi;(<i>n</i>))
	</p>
x{container en}
```

```
a{container en}
	<p>
		s{As} <i>e</i> s{and} <i>d</i> s{were chosen}
		s{appropriately, it is}
	</p><p>
		<i>m&#39;&#39;</i> = <i>m</i>.
	</p><p>
		s{The order does not matter. You could}
		s{also first raise a message with the}
		s{private key, and then power up the}
		s{result with the public key}&mdash;s{this}
		s{is what you use with RSA signatures.}
	</p>
x{container en}
```

```
a{container en}
	<h2>s{Messages}</h2>
	<p>
		s{In the following two text boxes, you}
		s{can see how the encryption and}
		s{decryption works for concrete input}
		s{(numbers).}
	</p>
	<form class="form-horizontal">
		e{crypt boxes en}
	</form>
x{container en}
```

```
d{crypt boxes en}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			for="public-key"
		>s{plaintext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="private-message"
			value="7"></input></div>
	</div>
x{crypt boxes en}
```

```
a{crypt boxes en}
	<div id="err-public-msg-too-big"
		class="row alert alert-danger"
	>s{Plaintext number too big. The}
		s{maximum value is}
		<span class="max-msg"></span>.
		s{Please choose bigger}
		s{primes.}</div>
x{crypt boxes en}
```

```
a{crypt boxes en}
	E{crypt arrow}
x{crypt boxes en}
```

```
a{crypt boxes en}
	<div class="form-group">
		<label
			class="col-sm-3 control-label"
			for="private-key"
		>s{ciphertext}</label>
		<div class="col-sm-9"><input
			class="form-control"
			id="public-message"
		></input></div>
	</div>
x{crypt boxes en}
```

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

```
a{container en}
	<div id="authors"><em>s{CTOAUTHORS: Timm}
		s{Knape (thanks to Bernhard Esslinger}
		s{for the review)}</em></div>
x{container en}
```

# Refresh
* Neben den wenigen Aktionen findet die Hauptarbeit während des Refreshs
  statt

```
a{setup rsa}
	const f{refresh} = () => {
		e{refresh};
	};
	refresh();
x{setup rsa}
```
* Wenn sich die Primzahl (und andere Felder ändern), muss der
  RSA-Algorithmus neu ausgeführt werden
* Beim Starten wird die Funktion aufgerufen, um alle Felder zu
  synchronisieren


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
d{queue refresh}
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
