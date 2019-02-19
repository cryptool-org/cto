# Implementierung des Erweiterten Euklidischen Algorithmus
* Leider bietet die verwendete Mathe-Bibliothek keinen Algorithmus, um
  das Inverse Element zu einer Restklasse zu bestimmen
* Daher wird der Erweiterte Euklidische Algorithmus hier direkt
  implementiert

```
@Def(gcd)
	let ca = a;
	let cb = b;
@end(gcd)
```
* Die aktuellen Werte von `a` und `b` werden in `ca` und
  `cb` gespeichert
* Solange `cb` nicht `0` ist gilt stets, dass der größte
  gemeinsame Teiler von `a` und `b` auch der größte gemeinsame
  Teiler von `ca` und `cb` ist
* Der Euklidische Algorithmus reduziert `ca` und `cb`, bis
  `cb` gleich `0` wird

```
A{gcd}
	let u = f{bigInt}.one;
	let v = f{bigInt}.zero;
	let s = v;
	let t = u;
@end(gcd)
```
* Der Erweiterte Euklidische Algorithmus enthält vier weitere Parameter
  `u`, `v`, `s` und `t`
* Es gilt stets, dass `ca = u × a + v × b`
* Und `cb = s × a + t × b`

```
A{gcd}
	while (! cb.isZero()) {
		@put(gcd loop);
	}
@end(gcd)
```
* Solange `cb` nicht `0` ist, wird die Schleife ausgeführt

```
@def(gcd loop)
	const dd = ca.divmod(cb);
	const na = cb;
	const nb = dd.remainder;
@end(gcd loop)
```
* `ca` wird durch `cb` geteilt
* Der neue Wert von `ca` (`na`) wird auf `cb` gesetzt
* Der neue Wert von `cb` (`nb`) ist der Rest aus der Division
* Der größte gemeinsame Teiler von `ca` und `cb` ist auch der
  größte gemeinsame Teiler von `na` und `nb`

```
@add(gcd loop)
	const nu = s;
	const nv = t;
@end(gcd loop)
```
* Dadurch, dass `cb` nach `na` kopiert wurde, können die
  Koeffizienten `s` und `t` nach `nu` und `nv` kopiert
  werden

```
@add(gcd loop)
	const ns = u.subtract(
		dd.quotient.multiply(s)
	);
	const nt = v.subtract(
		dd.quotient.multiply(t)
	);
@end(gcd loop)
```
* Aus den aktuellen `u` und `v` können die neuen `s` und
  `t` bestimmt werden

```
@add(gcd loop)
	ca = na;
	cb = nb;
@end(gcd loop)
```
* Die neuen Werte werden zu den aktuellen Werten

```
@add(gcd loop)
	u = nu;
	v = nv;
	s = ns;
	t = nt;
@end(gcd loop)
```
* Die neuen Werte werden zu den aktuellen Werten

```
A{gcd}
	return {
		s{a}: ca, s{u}: u, s{v}: v,
		s{s}: s, s{t}: t 
	};
@end(gcd)
```
* Zurück liefert die Funktion den größten gemeinsamen Teiler `a`
* Und die Koeffizienten

## Unit-Test

```
A{globals} {
	@put(unit test);
} @end(globals)
```
* Unit-Test wird in einem eigenen Block bei jedem Start ausgeführt

```
@def(unit test)
	const f{eq} = (a, b) => {
		if (! a.equals(b)) {
			console.error(
				s{`expected }${a}s{, got }${b}s{`}
			);
		}
	};
@end(unit test)
```
* Die Funktion prüft, ob zwei große Zahlen gleich sind

```
@add(unit test)
	const g = gcd(
		bigInt(70), bigInt(4)
	);
	eq(g.a, bigInt(2));
@end(unit test)
```
* Der größte gemeinsame Teiler muss `2` sein

```
@add(unit test)
	eq(g.u, bigInt(1));
	eq(g.v, bigInt(-17));
@end(unit test)
```
* Die Koeffizienten `g.u` und `g.v` liefern
  eine Linearkombination für den größten gemeinsamen Teiler

```
@add(unit test)
	eq(g.s, bigInt(-2));
	eq(g.t, bigInt(35));
@end(unit test)
```
* Die Koeffizienten `g.s` und `g.t` liefern nicht-triviale
  Linearkombination von `0`
* Also `g.s × 70 + g.t × 4 == 0` wobei `g.s` und
  `g.t` nicht `0` sind

