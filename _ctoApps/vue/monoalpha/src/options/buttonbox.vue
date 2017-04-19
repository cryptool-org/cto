<template>
  <div class="buttonBox">
    <input v-show="!toggle" @click="toggle = !toggle" type='button' name='v_toggle' id='v_toggle' :value="$t('alphabet')" >
    <input v-show="toggle" @click="toggle = !toggle" type='button' name='v_toggle' id='v_toggle' :value="$t('alphabetClose')" >
    <input v-show="!own" type='button' :value="$t('ownButton')" @click="ownOption()">
    <input v-show="own" type='button' :value="$t('ownButtonClose')" @click="ownOption()">
  </div>
</template>
<script src="./buttonbox.js"></script>
