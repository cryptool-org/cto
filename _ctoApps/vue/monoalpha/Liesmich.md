## Entwicklung CTO-Apps mit dem Vue-Framework

### Start (NPM)
1. Voraussetzung für die Entwicklung ist NPM <https://www.npmjs.com/>
2. In der package.json werden alle benötigten Pakete angegeben
  - In der Konsole unter dem Verzeichnis werden die Pakete mit 'npm install' installiert
    - Bspw. sollten enthalten sein: vue, watchify, http-server, cross-env, npm-run-all
    - Es empfiehlt sich die package.json aus der maS-App anzuschauen
  - Mit 'npm run commandName' können unter scripts konfigurierte Services gestartet werden
3. Eine index.html, in der die komprimierten Dateien (durch cross-env) eingebunden sind, muss ebenfalls im App-Verzeichnis vorhanden sein

### Basics (ES2015/16 - ES5/ES6)
1. Objekt orientierte Programmierung
2. Expliziter Export eines Objektes durch 'export default Object';

### Vue-Framework-Basics
1. Lifehooks
  - beforeCreate() beschreibt, wie der Name schon sagt, den Zustand bevor das Objekt erzeugt wird
  - created() eben, das Objekt erzeugt wurde
2. Variable/Attribute werden unter data() { return {} } angegeben
3. Funktionen werden in einem Skript unter methods: {} angegeben
4. Komponenten müssen im Eltern-Objekt importiert und unter components: {} angegeben werden
5. Beobachter werden unter watch: {} angegeben
  - Vorsicht, dass keine 'Ketten' entstehen
6. Mixins können Funktionen oder Daten seien, die von anderen Komponenten/Objekten mehrfach verwendet werden
  - diese werden unter mixins: [] einmal injiziert und instanziiert
  - sollten Mixins/Komponenten dieselben Variablen oder gleich benannten Funktionen beinhalten,
    werden diese zu einem Objekt zusammengefügt, Ausnahme created

### Vue-Framework-Templating
1. Möglicher Entwurf in .vue Datei oder (Teilweise-)Auslagerung in Dateien .vue, .html, .css, .js
  - Best practise: Min. Aufteilung in .vue und .js  
2. Template innerhalb von <template></template> Tag
  - Platzhalter für Komponenten ebenfalls mit Tag-Namen z.B. <accordion></accordion>, aber Angabe auch als id möglich
  - In der .js Datei wird durch Vue.component('KomponenteName', {...}) der Zugriff auf das Element gewährt
  - Bei mehreren Abschnitten sollte immer ein umschließendes div existieren
  - Einfache Daten-Bindung durch zwei geschweifte Klammern {{ attribute }}
3. Übersetzung erfolgt z.B durch das VueI18n-Plugin aus einer locale.json Datei
  - im Template anzugeben in {{ $t('dasVerlinkteWort') }}
4. Direktiven
  - v-if => Durch einen wahren Ausdruck wird das Element gerendert; Kombinationen/Fälle auch mit v-else, v-else-if
  - v-show => Fast identisch zu v-if, Optimalerweise um ein Element zum togglen durch einen Wahrheitswert zu bringen, basiert auf CSS-Toggling
  - v-model => Erstellt für eine Variable eine Zwei-Wege-Bindung für Input bzw. Output v-model='inputTextArea'
  - v-bind: => Bindet eine Angabe/Variable an einen Ausdruck, Kurzschreibweise :value='meineVariable'
  - v-on: => Hört auf DOM-Events bspw. einen Mausklick, Kurzschreibweise @click='tueDies'

### Am Beispiel Monoalphabetische Substitution
1. In main.js befindet sich das Hauptobjekt und enthält Plugin-Konfigurationen wie VueI18n für die Mehrsprachigkeit
  - Verweis zur App-Klasse die gerendert werden soll
2. Das App-Objekt Prime besteht aus 3 Dateien:
  - prime.vue für das/die Template/Source-Angaben (Verweise: .html, .css, .js)
  - prime.html für das Template
  - prime.js erbt von Vue und
    - unter mixins werden benötigte Module injected
    - Komponenten, die im Template vorkommen, müssen importiert werden (Angabe unter components)
    - erstellt als Erstes eine neue Vue-Instanz, die als Event-Bus dient
      - Vue-Instanz und Event-Listener werden in beforeCreated() angelegt
      - Hört an ansprechenden Events und ruft daraufhin die entsprechenden Funktionen am Modell(Algorithmus) auf
    - beobachtet, unter watch, Änderungen an Variablen/Attributen und sendet entsprechende Events
3. Das EventBus-Objekt enthält einen Algorithmus der nach dem erstelltem Bus-Objekt von der obersten Klasse (Prime) sucht
    und dieses zurückgibt
  - Jede Komponente, die den EventBus injiziert erhält dadurch den Kommunikationskanal für die App
  - Zur Vereinheitlichung der Event-Namen wurde ein Konstanten-Objekt EventNames angelegt
4. AppData aus dem Verzeichnis config,
  - besitzt die Variablen/Daten, die so nicht mehrfach in einzelnen Komponenten angegeben werden müssen
  - außerdem erhalten alle Komponenten die gleichen Voraussetzungen für den Start
    => folglich Startkonfiguration an zentraler Stelle
5. ComponentConfig enthält zusätzliche Informationen welche Komponenten aktiviert/deaktiviert werden sollen
    => nützlich bei Algorithmen, die sich ähneln und fast die gleichen Komponenten nutzen, ohne große Änderungen an Komponenten/Template vorzunehmen
    => z.B. kann maS mit Keywords (KeywordBox) genutzt werden, die bei Caesar nicht vorgesehen sind
6. Komponenten liegen "auf gleicher Höhe" oder stehen in einer sogenannten Eltern-Kind-Beziehung
  - Die Eltern-Komponente importiert die Kind-Komponente (Beispiel: KeyBox & Rot13) und die ComponentenConfig
  - Event-Listener werden in created() angelegt

### Styling CSS (Vorschlag)
1. Aufteilung der CSS-Informationen
  - basic.style.css enthält CSS-Informationen, die Framework übergreifend zutreffen
  - prime.css enthält entsprechend für Vue-Apps die allgemeinen Styling Anweisungen
  - appName.css für Anpassungen/Abweichungen der einzelnen App
  - effektName.css die nur auf eine Komponente zutreffen, z.B. für das Accordion oder Popup

### Veröffentlichen für CTO
1. Mit cross-env einen Build für die Produktion machen 
2. In der cto.config.json sollte die gepackte build.css aus dem dist-Verzeichnis (Standardvorlage) unter 'styles'
    sowie die build.js unter 'body' stehen. Des weiteren werden drei scripts nach Reihenfolge benötigt:
    "../../vendor/jquery-3.1.1.min.js",
    {"file": "env.js", "type": "text/javascript"},
    {"file": "../../loaders/vueLoader.js", "type": "text/javascript"}
    - env.js muss einen Pfad nach folgendem Schema enthalten: var appDir = '\_ctoApps/vue/appDirName/';


  Referenzen:
    <https://vuejs.org/v2/guide/>
    <https://vuejs.org/v2/api/>
    <https://babeljs.io/learn-es2015/>
