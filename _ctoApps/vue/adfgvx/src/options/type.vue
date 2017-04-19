<template>
  <div id="type">
    <input id="showC1" type="radio" name="ciphTyp" value="1" v-model='cipherType' @change='changeType()' />
    <label for="showC1">ADFGX</label>
    <input id="showC2" type="radio" name="ciphTyp" value="2" v-model='cipherType' @change='changeType()' />
    <label for="showC2">ADFGVX</label>
  </div>
</template>
<style src="./type.css"></style>
<script src="./type.js"></script>
