<template>
  <div>
  <div class="buttonBox">
    <!--input @click="toggle = !toggle" type='button' name='button' id='toggle' :value="$t('alphabet')" -->
    <input class="btn btn-lg" v-show="groupType == 1" @click="computed" type='button' name='button' id='computed' :value="$t('buttonName')" :disabled="run || warning">
    <input class="btn btn-lg" v-show="groupType == 2" @click="distribute" type='button' name='button' id='distribute' :value="$t('disButtonName')" :disabled="run || !isSelectedRoom || warning">
    <!--input v-show="groupType == 3" @click="distribute" type='button' name='button' id='distribute' :value="$t('disButtonName')" :disabled="run || !isSelectedRoom"-->
  </div>
  </div>
</template>
<script src="./buttonbox.js"></script>
