<template>
  <div class="buttonBox">
    <input class="btn btn" v-show="!toggle" @click="toggle = !toggle" type='button' name='v_toggle' id='v_toggle' :value="$t('alphabet')" >
    <input class="btn btn" v-show="toggle" @click="toggle = !toggle" type='button' name='v_toggle' id='v_toggle' :value="$t('alphabetClose')" >
    <input class="btn btn" v-show="!own" type='button' :value="$t('ownButton')" @click="ownOption()">
    <input class="btn btn" v-show="own" type='button' :value="$t('ownButtonClose')" @click="ownOption()">
  </div>
</template>
<script src="./buttonbox.js"></script>
