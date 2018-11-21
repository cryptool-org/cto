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
	k{const} f{refresh} = () => {
		e{refresh};
	};
	f{refresh}();
x{setup rsa}
```
* Während des Refreshs werden alle zu berechnenden Felder neu berechnet

```
d{globals}
	k{const} v{$prime1} = f{$}(s{'#prime-1'});
	k{const} v{$prime2} = f{$}(s{'#prime-2'});
	k{const} v{$errPNotPrime} =
		f{$}(s{'#err-p-not-prime'});
	k{const} v{$errQNotPrime} =
		f{$}(s{'#err-q-not-prime'});
	k{const} v{$errPEqualQ} =
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
	k{const} v{prime1} = f{bigInt}(v{$prime1}.f{val}());
	v{$errPNotPrime}.f{toggleClass}(
		s{'hidden'}, v{prime1}.f{isProbablePrime}()
	);
	k{const} v{prime2} = f{bigInt}(v{$prime2}.f{val}());
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
	k{const} v{$public_key} =
		f{$}(s{'#public-key'});
	k{const} v{$public_key_length} =
		f{$}(s{'#public-key-length'});
x{globals}
```
* In zwei Elementen wird der öffentliche Schlüssel und dessen Länge
  abgelegt

```
a{refresh}
	k{const} v{public_key} =
		v{prime1}.f{multiply}(v{prime2});
	v{$public_key}.f{text}(
		v{public_key}.f{toString}()
	);
	v{$public_key_length}.f{text}(
		v{public_key}.f{bitLength}()
	);
x{refresh}
```
* Der öffentliche Schlüssel ist das Produkt der beiden Primzahlen
* Die Länge des Schlüssels kann die Integer-Bibliothek direkt ermitteln

```
a{globals}
	k{const} v{$phi} = f{$}(s{'#phi'});
x{globals}
```
* Auch das Ergebnis der φ-Funktion wird auf der Webseite angezeigt

```
a{refresh}
	k{const} v{one} = f{bigInt}.v{one};
	k{const} v{phi} = v{prime1}.f{subtract}(v{one}).
		f{multiply}(v{prime2}.f{subtract}(v{one}));
	v{$phi}.f{text}(v{phi}.f{toString}());
x{refresh}
```
* Da davon ausgegangen wird, dass die beiden Primzahlen verschieden
  sind, ist das Produkt deren Vorgänger der Wert der φ-Funktion
  des öffentlichen Schlüssels

```
a{globals}
	k{const} f{gcd} = (v{a}, v{b}) => {
		e{gcd};
	};
x{globals}
```
* Das inverse Element kann mit dem Erweiterten Euklidischen Algorithmus
  berechnet werden
* Dieser wird weiter unten implementiert

```
a{globals}
	k{const} v{$e} = f{$}(s{'#base'});
	k{const} v{$gcd} = f{$}(s{'#gcd'});
	k{const} v{$errGcdNot1} =
		f{$}(s{'#err-gcd-not-1'});
x{globals}
```
* Der Wert `v{e}` wird wie die Primzahlen aus einem Textfeld ausgelesen
* Der größte gemeinsame Teiler wird zur Kontrolle auch angezeigt
* Es gibt eine Fehlermeldung, wenn der größte gemeinsame Teiler nicht
  `n{1}` ist

```
a{refresh}
	k{const} v{e} = f{bigInt}(v{$e}.f{val}());
	k{const} v{gg} = f{gcd}(v{phi}, v{e});
	v{$errGcdNot1}.f{toggleClass}(
		s{'hidden'}, v{gg}.v{a}.f{equals}(n{1})
	);
	v{$gcd}.f{text}(v{gg}.v{a}.f{toString}());
x{refresh}
```
* Wenn `v{e}` mit dem Wert der φ-Funktion nicht teilerfremd sind, wird
  eine entsprechende Fehlermeldung angezeigt

```
a{globals}
	k{const} v{$private_key} = f{$}(s{'#private-key'});
x{globals}
```
* Der private Schlüssel wird auch auf der Webseite ausgegeben

```
a{refresh}
	k{let} v{private_key} = v{gg}.v{v};
	k{if} (v{private_key}.f{lesser}(n{0})) {
		v{private_key} = v{private_key}.f{add}(v{phi});
	}
	v{$private_key}.f{text}(v{private_key}.f{toString}());
x{refresh}
```
* Der private Schlüssel ist das multiplikative Inverse Modulo φ

```
a{globals}
	k{let} v{encrypt} = k{true};
x{globals}
```
* Der Algorithmus kann sowohl Ver- als auch Entschlüsseln
* Diese Variable bestimmt, in welche Richtung der Algorithmus läuft

```
a{refresh}
	k{if} (v{encrypt}) {
		e{encrypt};
	} k{else} {
		e{decrypt};
	}
x{refresh}
```
* Je nachdem, in welche Richtung der Algorithmus arbeiten soll, wird
  entweder der Klartext verschlüsselt
* Oder der Geheimtext entschlüsselt

```
a{globals}
	k{const} v{$private_message} =
		f{$}(s{'#private-message'});
	k{const} v{$public_message} =
		f{$}(s{'#public-message'});
	k{const} v{$errPublicMsgTooBig} =
		f{$}(s{'#err-public-msg-too-big'});
	k{const} v{$errPrivateMsgTooBig} =
		f{$}(s{'#err-private-msg-too-big'});
x{globals}
```
* Es gibt ein Textfeld für den Klartext und den Geheimtext
* Zu jedem Feld gibt es eine Fehlermeldung, wenn die eingegebene Zahl zu
  groß ist

```
d{encrypt}
	k{const} v{source} =
		f{bigInt}(v{$private_message}.f{val}());
	v{$errPublicMsgTooBig}.f{toggleClass}(
		s{'hidden'},
		v{source}.f{lesser}(v{public_key})
	);
	v{$errPrivateMsgTooBig}.f{addClass}(
		s{'hidden'}
	);
x{encrypt}
```
* Beim Verschlüsseln wird geprüft, ob der Klartext zu groß ist
* Dann wird eine Fehlermeldung angezeigt
* Die passende Fehlermeldung für den Geheimtext kann immer ausgeblendet
  werden

```
a{encrypt}
	k{const} v{encrypted} = v{source}.f{modPow}(
		v{e}, v{public_key}
	);
	v{$public_message}.f{val}(
		v{encrypted}.f{toString}()
	);
x{encrypt}
```
* Das Verschlüsseln besteht nur aus einer Exponentiation mit Modulo

```
d{decrypt}
	k{const} v{source} =
		f{bigInt}(v{$public_message}.f{val}());
	v{$errPublicMsgTooBig}.f{addClass}(
		s{'hidden'}
	);
	v{$errPrivateMsgTooBig}.f{toggleClass}(
		s{'hidden'},
		v{source}.f{lesser}(v{public_key})
	);
x{decrypt}
```
* Beim Entschlüsseln wird der Geheimtext als Grundlage verwendet
* Auch hier wird eine Fehlermeldung ausgegeben, wenn die Zahl zu groß
  ist
* Die passende Meldung vom Klartext kann stets ausgeblendet werden

```
a{decrypt}
	k{const} v{decrypted} = v{source}.f{modPow}(
		v{private_key}, v{public_key}
	);
	v{$private_message}.f{val}(
		v{decrypted}.f{toString}()
	);
x{decrypt}
```
* Auch das Entschlüsseln besteht aus einer einzigen Potentiation mit
  Modulo

# Größter gemeinsamer Teiler
* Leider bietet die verwendete Mathe-Bibliothek keinen Algorithmus um
  das Inverse Element zu einer Restklasse zu bestimmen
* Daher wird der Erweiterte Euklidische Algorithmus hier direkt
  implementiert

```
d{gcd}
	k{let} v{ca} = v{a};
	k{let} v{cb} = v{b};
x{gcd}
```
* Die aktuellen Werte von `v{a}` und `v{b}` werden in `v{ca}` und
  `v{cb}` gespeichert
* Solange `v{cb}` nicht `n{0}` ist, gilt stets dass der größte
  gemeinsame Teiler von `v{a}` und `v{b}` auch der größte gemeinsame
  Teiler von `v{ca}` und `v{cb}` ist
* Der Euklidische Algorithmus reduziert `v{ca}` und `v{cb}`, bis
  `v{cb}` gleich `n{0}` wird

```
a{gcd}
	k{let} v{u} = f{bigInt}.v{one};
	k{let} v{v} = f{bigInt}.v{zero};
	k{let} v{s} = v{v};
	k{let} v{t} = v{u};
x{gcd}
```
* Der Erweiterte Euklidische Algorithmus hält vier weitere Parameter
  `v{u}`, `v{v}`, `v{s}` und `v{t}`
* Es gilt stets, dass `v{ca} = v{u} * v{a} + v{v} * v{b}`
* Und `v{cb} = v{s} * v{a} + v{t} * v{b}`

```
a{gcd}
	k{while} (! v{cb}.f{isZero}()) {
		e{gcd loop};
	}
x{gcd}
```
* Solange `v{cb}` nicht `n{0}` ist, wird die Schleife ausgeführt

```
d{gcd loop}
	k{const} v{dd} = v{ca}.f{divmod}(v{cb});
	k{const} v{na} = v{cb};
	k{const} v{nb} = v{dd}.v{remainder};
x{gcd loop}
```
* `v{ca}` wird durch `v{cb}` geteilt
* Der neue Wert von `v{ca}` (`v{na}`) wird auf `v{cb}` gesetzt
* Der neue Wert von `v{cb}` (`v{nb}`) ist der Rest aus der Division
* Der größte gemeinsame Teiler von `v{ca}` und `v{cb}` ist auch der
  größte gemeinsame Teiler von `v{na}` und `v{nb}`

```
a{gcd loop}
	k{const} v{nu} = v{s};
	k{const} v{nv} = v{t};
x{gcd loop}
```
* Dadurch, dass `v{cb}` nach `v{na}` kopiert wurde, können die
  Koeffizienten `v{s}` und `v{t}` nach `v{nu}` und `v{nv}` kopiert
  werden

```
a{gcd loop}
	k{const} v{ns} =
		v{u}.f{subtract}(v{dd}.v{quotient}.f{multiply}(v{s}));
	k{const} v{nt} =
		v{v}.f{subtract}(v{dd}.v{quotient}.f{multiply}(v{t}));
x{gcd loop}
```
* Aus den aktuellen `v{u}` und `v{v}` können die neuen `v{s}` und
  `v{t}` bestimmt werden

```
a{gcd loop}
	v{ca} = v{na};
	v{cb} = v{nb};
x{gcd loop}
```
* Die neuen Werte werden zu den aktuellen Werten

```
a{gcd loop}
	v{u} = v{nu};
	v{v} = v{nv};
	v{s} = v{ns};
	v{t} = v{nt};
x{gcd loop}
```
* Die neuen Werte werden zu den aktuellen Werten

```
a{gcd}
	k{return} {
		s{a}: v{ca}, s{u}: v{u}, s{v}: v{v},
		s{s}: v{s}, s{t}: v{t} 
	};
x{gcd}
```
* Zurück liefert die Funktion den größten gemeinsamen Teiler `v{a}`
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
	k{const} f{eq} = (v{a}, v{b}) => {
		k{if} (!v{a}.f{equals}(v{b})) {
			v{console}.f{error}(
				s{`expected }${v{a}}s{, got }${v{b}}s{`}
			);
		}
	};
x{unit test}
```
* Funktion prüft, ob zwei große Zahlen gleich sind

```
a{unit test}
	k{const} v{g} = f{gcd}(
		f{bigInt}(n{70}), f{bigInt}(n{4})
	);
	f{eq}(v{g}.v{a}, f{bigInt}(n{2}));
x{unit test}
```
* Der größte gemeinsame Teiler muss `n{2}` sein

```
a{unit test}
	f{eq}(v{g}.v{u}, f{bigInt}(n{1}));
	f{eq}(v{g}.v{v}, f{bigInt}(n{-17}));
x{unit test}
```
* Die Koeffizienten `v{g}.v{u}` und `v{g}.v{v}` liefern
  Linearkombination für den größten gemeinsamen Teiler

```
a{unit test}
	f{eq}(v{g}.v{s}, f{bigInt}(n{-2}));
	f{eq}(v{g}.v{t}, f{bigInt}(n{35}));
x{unit test}
```
* Die Koeffizienten `v{g}.v{s}` und `v{g}.v{t}` liefern nicht-triviale
  Linearkombination von `n{0}`

# Richtung des Algorithmus anzeigen
* Es gibt ein Element auf der Web-Seite, das die Ablaufrichtung des
  Algorithmus anzeigt
* Ob er ver- oder entschlüsselt

```
a{globals}
	k{const} v{$direction} =
		f{$}(s{'#direction'});
x{globals}
```
* Dieses Element zeigt die Richtung an, in welcher der Algorithmus
  läuft
* Die Richtung wird durch CSS-Klassen visualisiert

```
a{setup rsa}
	k{const} f{setEncrypt} = v{new_encrypt} => {
		k{if} (v{encrypt} === v{new_encrypt}) {
			k{return};
		}
		v{encrypt} = v{new_encrypt};
		k{if} (v{encrypt}) {
			v{$direction}.f{removeClass}(s{'flip'});
			v{$direction}.f{addClass}(s{'flop'});
		} else {
			v{$direction}.f{removeClass}(s{'flop'});
			v{$direction}.f{addClass}(s{'flip'});
		}
	};
x{setup rsa}
```
* Durch CSS-Animationen wird der Pfeil hin- und hergedreht
* Wenn keine Klasse oder die Klasse `s{flop}` gesetzt ist, dann zeigt
  der Pfeil in die Verschlüsselungsrichtung
* Wenn die Klasse `s{flip}` gesetzt ist, zeigt er in die
  Entschlüsselungsrichtung
* `s{flop}` ist notwendig um den Wechsel zu animieren

# Timer
* Das Berechnen von RSA kann bei sehr großen Zahlen etwas dauern
* Daher wird nicht mit jeder Änderung eine neue Berechnung gestartet
* Nur wenn nach der letzten Änderung ein gewisses Zeitintervall
  verstrichen ist, wird die Berechnung gestartet

```
a{globals}
	k{let} v{timer};
x{globals}
```
* Der Timer wird global vorgehalten

```
a{globals}
	k{const} f{resetTimer} = () => {
		v{timer} = v{null};
	};
x{globals}
```

```
a{setup rsa}
	k{const} f{queueRefresh} = v{event} => {
		v{event}.f{preventDefault}();
		k{let} f{fn} = f{refresh};
		k{if} (! v{timer}) {
			f{refresh}();
			f{fn} = f{resetTimer};
		} k{else} {
			f{clearTimeout}(v{timer});
			e{set fields to pending};
		}
		v{timer} = f{setTimeout}(f{fn}, n{500});
	}
x{setup rsa}
```
* Wenn es noch keine Änderung gab, wird die Änderung sofort
  durchgeführt
* Der Timer führt in diesem Fall keine Neuberechnung durch
* Ansonsten werden die Felder mit Platzhaltern befüllt und der
  bestehende Timer gelöscht
* Dann wird eine neuer Timer gestartet der die Berechnung triggert
* Der Timeout beträgt eine halbe Sekunde

```
a{refresh}
	f{resetTimer}();
x{refresh}
```
* Nach der Neuberechnung wird der Timer gelöscht

```
d{set fields to pending}
	v{$public_key_length}.f{text}(s{'...'});
	v{$public_key}.f{text}(s{'...'});
	v{$phi}.f{text}(s{'...'});
	v{$gcd}.f{text}(s{'...'});
	v{$private_key}.f{text}(s{'...'});

	k{if} (v{encrypt}) {
		v{$public_message}.f{val}(s{'...'});
	} k{else} {
		v{$private_message}.f{val}(s{'...'});
	}
x{set fields to pending}
```
* Alle berechneten Felder werden mit Platzhaltern befüllt

# Aktionen hinterlegen
* Zum Schluss werden die definierten Funktionen als Event-Handler
  registriert

```
a{setup rsa}
	v{$prime1}.f{on}(s{'input'}, f{queueRefresh});
	v{$prime2}.f{on}(s{'input'}, f{queueRefresh});
	v{$e}.f{on}(s{'input'}, f{queueRefresh});
x{setup rsa}
```
* Wenn die Primzahlen oder die Basis geändert wird, wird die
  Neuberechnung getriggert

```
a{setup rsa}
	v{$private_message}.f{on}(s{'input'}, v{event} => {
		f{setEncrypt}(k{true});
		f{queueRefresh}(v{event});
	});
	v{$public_message}.f{on}(s{'input'}, v{event} => {
		f{setEncrypt}(k{false});
		f{queueRefresh}(v{event});
	});
x{setup rsa}
```
* Wenn der Klartext oder Geheimtext geändert wird, wird zusätzlich die
  Richtung des Algorithmus angepasst
