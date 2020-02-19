<template>
  <div>
    <div id='plain'>
      <label>{{ $t('plaintext') }}:</label>
      <textarea name='orgtxt' id='orgtxt' cols='63' rows='5' wrap='physical' v-model='orgtxt'
          @keypress='keyPress($event.keyCode, "encode")' @keyup='crypt("encode")'></textarea>
    </div>

    <div class='image'>
      <img v-show="code === 'encode'" :src="down">
      <img v-show="code === 'decode'" :src="up">
    </div>
  </div>
</template>
<script src="./plaintext.js"></script>
