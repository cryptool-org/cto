<template>
  <div>
  <div class="infobox visible">
    <div v-show="open" class='infoboxtext visible'>
      <span @click="open=!open" class="close">&times;</span>
      <h4>{{ $t('infoTitle') }}</h4>
      <p>{{infoAlgorithm}}</p>
      <p><strong>{{currentLength}}</strong></p>
      <div v-if="lang == 'de'">{{hint}}
        <p>
          Der Suchraum kann begrenzt werden, um die Suchzeit zu reduzieren.
          Um dies zu tun, geben Sie bekannte Teile des Schlüssels in hexadezimaler Notation (0123456789ABCDEF) und unbekannte als * ein.
        </p>
        <h5>Beispiel:</h5>
        <p>
          Geben Sie 00 ** BB ** ... ** ein, um alle Schlüssel beginnend mit Null-Byte zu durchsuchen,
          gefolgt von einem unbekannten Byte, das Byte BB und einem unbekannten Ende.
        </p>
        <h5>Hinweis:</h5>
        <p>
          Die Suchzeit wird in der Reihenfolge von Minuten bis Stunden liegen, wenn Sie 5 oder mehr Sternchen verwenden (einen 20-Bit-Suchraum verlassen).
        </p>
      </div>
      <div v-else>{{hint}}
        <p>
        The search space can be limited in order to reduce the search time.
        To do this, enter known parts of the key in hexadecimal notation (0123456789ABCDEF), unknown as * .
        </p>
        <h5>Example:</h5>
        <p>
        Enter 00 ** BB ** ... **, to search all keys starting with zero byte,
        followed by an unknown byte, the byte BB, and an unknown tail.
        </p>
        <h5>Hint:</h5>
        <p>
        The search time will be in the order of minutes to hours if you use 5 or more asterisks (leaving a 20-bit search space).
        </p>
      </div>
    </div>
  </div>
  </div>
</template>
<style src="./infobox.css" />
<script src="./infobox.js"></script>
