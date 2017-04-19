<template>
  <div class="popup visible">
    <span v-show="warningLength" class='popuptext visible'>{{ $t('warningLength') }}</span>
  </div>
</template>
<style src="./popup.css" />
<script src="./warning.popup.js"></script>
