<template>
  <div id='alphabet'>
      <warningPopup></warningPopup>
      <label>{{ $t('plaintextabc') }}</label>
      <textarea v-if="!own" name='plaintextabc' id='plaintextabc' class='readonly' readonly="true" v-model="plaintextabc"></textarea>
      <textarea v-if="own" name='plaintextabc' id='plaintextabc' @keyup='setOwnAlphabet(true)' v-model="plaintextabc"></textarea>
      <textarea v-if="!own" name='ciphertextabc' id='ciphertextabc' class='readonly' readonly="true"
                v-model="ciphertextabc"></textarea>
      <textarea v-if="own" name='ciphertextabc' id='ciphertextabc' @keyup='setOwnAlphabet(false)'
                v-model="ciphertextabc"></textarea>
      <label>
          {{ $t('ciphertextabc') }}
          <cipherOptions v-if="useCipherOptions"></cipherOptions>
      </label>
  </div>
</template>
<script src="./alphabet.js"></script>
