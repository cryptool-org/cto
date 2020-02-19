<template>
  <div>
  <div class="popup visible">
    <div v-show="warningLength" id='messages' class='popuptext visible'><h4>Socket messages</h4></div>
    <!--span v-show="warningLength" class='popuptext visible'>{{ $t('warningLength') }}</span-->
  </div>
  </div>
</template>
<style src="./popup.css" />
<script src="./popup.js"></script>
