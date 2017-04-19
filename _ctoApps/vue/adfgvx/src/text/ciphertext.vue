<template>
  <div id='cipher'>
        <label>{{ $t('ciphertext') }}:</label>
        <textarea name='codtxt' id='codtxt' cols='63' rows='5' @keypress='keyPress($event.keyCode, "decode");'
                  @keyup='crypt("decode");' wrap='physical' v-model='codtxt'></textarea>
        <div id='displayOptions'>
          <radioGroups></radioGroups>
        </div>
    </div>
</template>
<script src="./ciphertext.js"></script>
