<template>
  <div id='keyBox'>
    <p>{{ $t('key') }}:
    <button type='button' name='keyvalue' id='minus' @click='decreaseKey()'><img :src="left"></button>
    <input name='key' type='text' id='key' size='2' maxlength='2' @keyup='checkKey()' v-model="keyValue" />
    <button type='button' name='keyvalue' id='plus' @click='increaseKey()'><img :src="right"></button>
      <span>{{ $t('moveCipherAlphabet') }}</span>
      <rot13 v-if="rot13"></rot13>
    </p>
  </div>
</template>
<script src="./keybox.js"></script>
