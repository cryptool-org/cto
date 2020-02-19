<template>
  <div class='notown'>
      <label>{{ $t('plaintextabc') }}</label>
      <textarea v-if="!own" name='plaintextabc' id='plaintextabc' class='readonly' readonly="true" v-model="plaintextabc"></textarea>
      <textarea v-if="own" name='plaintextabc' id='plaintextabc' @keyup='setOwnAlphabet(true)' v-model="plaintextabc"></textarea>
      <textarea name='ciphertextabc' id='ciphertextabc' class='readonly' readonly="true" v-model="ciphertextabc"></textarea>
      <label>{{ $t('ciphertextabc') }}</label>
  </div>
</template>
<script src="./alphabet.js"></script>
